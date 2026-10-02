"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "./use-media-query";
import { SlideArtwork } from "./artwork";

export function SlideStudy() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const spread = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      ref={ref}
      className="slide-study scroll-layers"
      style={
        reduced ? undefined : ({ "--spread": spread } as React.CSSProperties)
      }
    >
      <SlideArtwork />
      <div className="slide-study-caption">
        <span>Main PIC</span>
        <span>Concept illustration · unreleased</span>
      </div>
    </motion.div>
  );
}
