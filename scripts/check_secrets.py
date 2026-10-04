#!/usr/bin/env python3
"""Scan Git blobs without printing credential values or reading runtime configs.

Default: staged blobs (pre-commit). --history: all blobs reachable from Git refs.
This is a targeted credential-format guard, not a provider validity check.
"""

import argparse
import json
import re
import subprocess
import sys


PATTERNS = (
    ("Google API key", rb"(?<![A-Za-z0-9_-])AIza[A-Za-z0-9_-]{35}(?![A-Za-z0-9_-])"),
    ("GitHub token", rb"(?<![A-Za-z0-9_])(?:gh[pousr]_[A-Za-z0-9]{36,255}|github_pat_[A-Za-z0-9_]{60,255})(?![A-Za-z0-9_])"),
    ("OpenAI API key", rb"(?<![A-Za-z0-9_-])sk-(?:(?:proj|svcacct)-)?[A-Za-z0-9_-]{32,255}(?![A-Za-z0-9_-])"),
    ("AWS access key ID", rb"(?<![A-Z0-9])(?:AKIA|ASIA)[A-Z0-9]{16}(?![A-Z0-9])"),
    ("Private key", rb"-----BEGIN (?:[A-Z0-9]+ )?PRIVATE KEY-----"),
)
CHECKS = tuple((name, re.compile(pattern)) for name, pattern in PATTERNS)


def git(*args, input_data=None):
    return subprocess.run(
        ["git", *args], input=input_data, stdout=subprocess.PIPE,
        stderr=subprocess.DEVNULL, check=True,
    ).stdout


def safe_path(path):
    value = path.encode("utf-8", "surrogateescape")
    for _, pattern in CHECKS:
        value = pattern.sub(b"[REDACTED]", value)
    return value.decode("utf-8", "replace")


def staged_blobs():
    changed = set(git("diff", "--cached", "--name-only", "--diff-filter=ACMR", "-z").split(b"\0"))
    blobs = {}
    for record in git("ls-files", "--stage", "-z").split(b"\0"):
        if not record:
            continue
        metadata, path = record.split(b"\t", 1)
        _, oid, stage = metadata.split()
        if path in changed and stage == b"0":
            blobs.setdefault(oid.decode("ascii"), path.decode("utf-8", "surrogateescape"))
    return blobs


def history_blobs():
    objects = {}
    for record in git("rev-list", "--objects", "--all").splitlines():
        oid, _, path = record.partition(b" ")
        objects[oid.decode("ascii")] = path.decode("utf-8", "surrogateescape") or "(Git blob)"
    if not objects:
        return {}
    object_input = "".join(oid + "\n" for oid in objects).encode("ascii")
    metadata = git("cat-file", "--batch-check=%(objectname) %(objecttype)", input_data=object_input)
    return {
        oid.decode("ascii"): objects[oid.decode("ascii")]
        for oid, kind in (line.split() for line in metadata.splitlines())
        if kind == b"blob"
    }


def scan(blobs, mode):
    findings = 0
    process = subprocess.Popen(
        ["git", "cat-file", "--batch"], stdin=subprocess.PIPE,
        stdout=subprocess.PIPE, stderr=subprocess.DEVNULL,
    )
    try:
        for oid, path in blobs.items():
            process.stdin.write((oid + "\n").encode("ascii"))
            process.stdin.flush()
            header = process.stdout.readline().split()
            if len(header) != 3 or header[1] != b"blob":
                raise ValueError("Cannot read Git blob")
            size = int(header[2])
            content = process.stdout.read(size)
            if len(content) != size or process.stdout.read(1) != b"\n":
                raise ValueError("Incomplete Git blob")
            for name, pattern in CHECKS:
                for match in pattern.finditer(content):
                    findings += 1
                    print(json.dumps({
                        "path": safe_path(path), "type": name,
                        "line": content.count(b"\n", 0, match.start()) + 1,
                    }, ensure_ascii=True))
        process.stdin.close()
        if process.wait() != 0:
            raise ValueError("Git blob reader failed")
    finally:
        if process.poll() is None:
            process.kill()
            process.wait()
        process.stdout.close()
        if not process.stdin.closed:
            process.stdin.close()
    print(f"Secret guard ({mode}): {len(blobs)} blobs scanned; {findings} credential-pattern findings.")
    return 1 if findings else 0


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    modes = parser.add_mutually_exclusive_group()
    modes.add_argument("--history", action="store_true", help="scan every blob reachable from Git refs")
    modes.add_argument("--staged", action="store_true", help="scan staged blobs (default)")
    args = parser.parse_args()
    try:
        blobs = history_blobs() if args.history else staged_blobs()
        return scan(blobs, "history" if args.history else "staged")
    except (OSError, ValueError, subprocess.CalledProcessError):
        print("Secret guard could not complete the Git scan; commit is blocked.", file=sys.stderr)
        return 2


if __name__ == "__main__":
    sys.exit(main())
