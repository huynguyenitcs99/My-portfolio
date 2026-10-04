"use client";
import { ActionIcon } from "@/components/action-icon";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Nekomata } from "./marks";

const links = [
  { href: "/#work", label: "Selected work", number: "01" },
  { href: "/#playground", label: "Playground", number: "02" },
  { href: "/#about", label: "The person", number: "03" },
  { href: "/#contact", label: "Say hello", number: "04" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const first = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (!open) return;
    const el = dialog.current;
    const trigger = button.current;
    el?.showModal();
    first.current?.focus();
    const prior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      el?.close();
      document.body.style.overflow = prior;
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <noscript>
        <style>{`.menu-toggle,.study-controls{display:none}.site-header{gap:12px}.brand>span{padding-right:0}.header-links{display:flex!important;gap:12px;font-size:10px}`}</style>
      </noscript>
      <header className="site-header">
        <Link href="/" className="brand" aria-label="HN — Huy Nguyen home">
          <Nekomata size={50} />
          <span>Huy Nguyen</span>
        </Link>
        <nav className="header-links" aria-label="Primary navigation">
          <Link href="/#work">Work</Link>
          <Link href="/#playground">Play</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">
            Let’s talk <ActionIcon />
          </Link>
        </nav>
        <button
          ref={button}
          className="menu-toggle"
          aria-label="Open navigation"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span />
          <span />
        </button>
      </header>
      <dialog
        ref={dialog}
        className="nav-dialog"
        aria-label="Navigation"
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const targets = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>(
              "a[href], button:not([disabled])",
            ),
          );
          const firstTarget = targets[0],
            lastTarget = targets.at(-1);
          if (event.shiftKey && document.activeElement === firstTarget) {
            event.preventDefault();
            lastTarget?.focus();
          } else if (!event.shiftKey && document.activeElement === lastTarget) {
            event.preventDefault();
            firstTarget?.focus();
          }
        }}
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        <div className="nav-surface">
          <p className="menu-note">A little curiosity goes a long way.</p>
          <nav aria-label="All sections">
            {links.map((link, index) => (
              <Link
                ref={index === 0 ? first : undefined}
                className={`nav-bubble nav-bubble-${index}`}
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
                <span aria-hidden="true">
                  <ActionIcon />
                </span>
              </Link>
            ))}
          </nav>
          <div className="nav-bottom">
            <span>AI engineer × creative builder</span>
            <button
              className="text-button"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
            >
              Close <ActionIcon name="close" />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
