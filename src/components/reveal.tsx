"use client";
import { m } from "motion/react";
import { usePrefersReducedMotion } from "./use-media-query";
import type { ReactNode } from "react";

export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <m.div
      className={className}
      initial={false}
      whileInView={reduced ? undefined : { y: [18, 0] }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
