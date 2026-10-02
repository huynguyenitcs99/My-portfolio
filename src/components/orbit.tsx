"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import Link from "next/link";
import { AgentArtwork, MenuArtwork, SlideArtwork } from "./artwork";
import { TwinPaths } from "./marks";
import { useMediaQuery, usePrefersReducedMotion } from "./use-media-query";

export function OrbitShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const wide = useMediaQuery("(min-width: 801px)");
  const [expanded, setExpanded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 110px", "end end"],
  });
  const width = useTransform(scrollYProgress, [0, 0.85], ["44%", "100%"]);
  const rotate = useTransform(scrollYProgress, [0, 0.7], [-7, 0]);
  const y = useTransform(scrollYProgress, [0, 0.85], [45, 0]);
  const leftX = useTransform(scrollYProgress, [0, 0.7], [0, -130]);
  const rightX = useTransform(scrollYProgress, [0, 0.7], [0, 130]);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  useMotionValueEvent(scrollYProgress, "change", (value) =>
    setExpanded(value >= 0.3),
  );
  const hidden = expanded && wide && !reduced;
  return (
    <section id="work" className="orbit-section" aria-labelledby="work-title">
      <div className="section-intro shell">
        <p className="eyebrow">01 — Selected work</p>
        <div>
          <h2 id="work-title">
            Ideas into <em>things.</em>
          </h2>
          <p>Agents, generative design and the engineering behind them.</p>
        </div>
        <span className="scroll-note">SCROLL TO BRING IT INTO FOCUS ↓</span>
      </div>
      <div ref={ref} className={`orbit-track ${reduced ? "is-static" : ""}`}>
        <div className="orbit-sticky shell">
          <TwinPaths className="project-orbits" />
          <div className="orbit-stage">
            <motion.a
              href="#daily-smith"
              className="orbit-card orbit-side orbit-daily"
              inert={hidden}
              aria-hidden={hidden || undefined}
              style={
                reduced ? undefined : { x: leftX, opacity: fade, rotate: 9 }
              }
            >
              <AgentArtwork compact />
              <div className="orbit-label">
                <span>Daily Smith</span>
                <small>AI pipeline PIC</small>
              </div>
            </motion.a>
            <motion.a
              href="#slide-design"
              className="orbit-card orbit-side orbit-slide"
              inert={hidden}
              aria-hidden={hidden || undefined}
              style={
                reduced ? undefined : { x: rightX, opacity: fade, rotate: -8 }
              }
            >
              <SlideArtwork compact />
              <div className="orbit-label">
                <span>Slide Design</span>
                <small>In development</small>
              </div>
            </motion.a>
            <motion.div
              className="orbit-card orbit-primary"
              style={reduced ? undefined : { width, rotate, y, x: "-50%" }}
            >
              <div className="creative-feature-art">
                <MenuArtwork />
              </div>
              <div className="creative-feature-copy">
                <p className="eyebrow">Chat Smith · Released</p>
                <h3>
                  Creative
                  <br />
                  <em>Studio.</em>
                </h3>
                <p>
                  From visual references
                  <br />
                  to generation guidelines.
                </p>
                <span className="feature-role">
                  Menu pipeline + visual DNA research
                </span>
                <Link
                  className="round-link"
                  href="/work/creative-studio"
                  aria-label="Read the Creative Studio case study"
                >
                  ↗
                </Link>
              </div>
              <span className="art-caption">
                Illustrative design study · not product output
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
