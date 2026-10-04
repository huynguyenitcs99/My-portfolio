"""Integration checks use generated, nonfunctional credentials in disposable repos."""

from pathlib import Path
import subprocess
import sys
import tempfile
import unittest


CHECKER = Path(__file__).with_name("check_secrets.py")


def fake_credentials():
    return [
        "AI" + "za" + "q" * 35,
        "gh" + "p_" + "r" * 36,
        "github" + "_pat_" + "s" * 82,
        "sk" + "-proj-" + "t" * 80,
        "AK" + "IA" + "U" * 16,
        "-----BEGIN " + "RSA PRIVATE KEY-----",
    ]


class SecretGuardTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.repo = Path(self.temp.name)
        self.git("init", "-q")
        self.git("config", "user.name", "Guard test")
        self.git("config", "user.email", "guard@example.invalid")

    def git(self, *args):
        return subprocess.run(
            ["git", *args], cwd=self.repo, check=True,
            stdout=subprocess.PIPE, stderr=subprocess.PIPE,
        )

    def scan(self, *args):
        return subprocess.run(
            [sys.executable, str(CHECKER), *args], cwd=self.repo,
            capture_output=True, text=True,
        )

    def assert_redacted(self, result, credentials):
        for credential in credentials:
            self.assertNotIn(credential, result.stdout + result.stderr)

    def test_staged_secrets_block_commit_without_logging_values(self):
        credentials = fake_credentials()
        (self.repo / "capture.txt").write_text("\n".join(credentials))
        self.git("add", "capture.txt")
        result = self.scan()
        self.assertEqual(result.returncode, 1)
        self.assertIn("Google API key", result.stdout)
        self.assertIn("GitHub token", result.stdout)
        self.assertIn("OpenAI API key", result.stdout)
        self.assertIn("AWS access key ID", result.stdout)
        self.assertIn("Private key", result.stdout)
        self.assertIn('"line": 1', result.stdout)
        self.assert_redacted(result, credentials)

    def test_benign_staged_file_passes(self):
        (self.repo / "notes.md").write_text("Use transforms and opacity for animation.\n")
        self.git("add", "notes.md")
        result = self.scan()
        self.assertEqual(result.returncode, 0)
        self.assertIn("staged", result.stdout)

    def test_unstaged_content_is_not_read(self):
        (self.repo / "notes.md").write_text("Safe staged note\n")
        self.git("add", "notes.md")
        (self.repo / "notes.md").write_text(fake_credentials()[0])
        result = self.scan()
        self.assertEqual(result.returncode, 0)

    def test_history_detects_credential_removed_from_current_tree(self):
        credential = fake_credentials()[0]
        (self.repo / "capture.txt").write_text(credential)
        self.git("add", "capture.txt")
        self.git("commit", "-qm", "Add synthetic fixture")
        self.git("rm", "-q", "capture.txt")
        self.git("commit", "-qm", "Remove fixture")
        result = self.scan("--history")
        self.assertEqual(result.returncode, 1)
        self.assertIn("capture.txt", result.stdout)
        self.assert_redacted(result, [credential])

    def test_secret_in_filename_is_redacted(self):
        credential = fake_credentials()[0]
        filename = credential + ".txt"
        (self.repo / filename).write_text(credential)
        self.git("add", filename)
        result = self.scan()
        self.assertEqual(result.returncode, 1)
        self.assertIn("REDACTED", result.stdout)
        self.assert_redacted(result, [credential])

    def test_staged_deletion_passes(self):
        (self.repo / "notes.md").write_text("Safe\n")
        self.git("add", "notes.md")
        self.git("commit", "-qm", "Initial note")
        self.git("rm", "-q", "notes.md")
        self.assertEqual(self.scan().returncode, 0)


if __name__ == "__main__":
    unittest.main()
