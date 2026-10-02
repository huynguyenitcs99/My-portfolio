"use client";
import Link from "next/link";
import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { MenuArtwork, AgentArtwork, SlideArtwork } from "./artwork";
import { usePrefersReducedMotion } from "./use-media-query";
function OrbitLines() {
  return (
    <svg
      className="arrival-orbits"
      viewBox="0 0 600 600"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="#816957" strokeWidth="1">
        <ellipse
          cx="320"
          cy="265"
          rx="275"
          ry="130"
          transform="rotate(-28 320 265)"
        />
        <ellipse
          cx="330"
          cy="330"
          rx="255"
          ry="95"
          transform="rotate(15 330 330)"
        />
        <ellipse
          cx="310"
          cy="350"
          rx="270"
          ry="110"
          transform="rotate(-8 310 350)"
        />
      </g>
      <g fill="#705461">
        <circle cx="510" cy="102" r="5" />
        <circle cx="100" cy="305" r="5" />
        <circle cx="540" cy="398" r="5" />
      </g>
    </svg>
  );
}
export function Arrival() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 70]);
  return (
    <section
      ref={ref}
      id="identity"
      className="arrival-scene shell"
      aria-labelledby="hero-positioning"
    >
      <div className="arrival-paper" aria-hidden="true" />
      <div className="arrival-copy">
        <div className="arrival-name" aria-label="Huy Nguyen">
          <span>HUY</span>
          <span>NGUYEN</span>
        </div>
        <h1 id="hero-positioning">
          AI engineer. <span>Creative builder.</span>
        </h1>
        <p>
          Vulcan Labs <span>·</span>
          <br className="arrival-mobile-break" /> Ho Chi Minh City
        </p>
        <span className="handwritten arrival-hand" aria-hidden="true">
          Human
          <br />
          tech
          <br />
          creative
          <br />
          curiosity.
        </span>
      </div>
      <div className="arrival-portrait">
        <link
          rel="preload"
          as="image"
          type="image/avif"
          imageSrcSet="/images/story/portrait-384.avif 384w, /images/story/portrait-640.avif 640w, /images/story/portrait-1024.avif 1024w"
          imageSizes="(max-width: 600px) 78vw, (max-width: 1000px) 50vw, 680px"
          fetchPriority="high"
        />
        <picture>
          <source
            type="image/avif"
            srcSet="/images/story/portrait-384.avif 384w, /images/story/portrait-640.avif 640w, /images/story/portrait-1024.avif 1024w"
            sizes="(max-width: 600px) 78vw, (max-width: 1000px) 50vw, 680px"
          />
          {/* Pre-encoded responsive variants avoid cold image transformation for the LCP portrait. */}
          <img
            src="/images/story/portrait-1024.webp"
            srcSet="/images/story/portrait-384.webp 384w, /images/story/portrait-640.webp 640w, /images/story/portrait-1024.webp 1024w"
            sizes="(max-width: 600px) 78vw, (max-width: 1000px) 50vw, 680px"
            alt="Huy Nguyen"
            width="1122"
            height="1402"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>
      <m.div
        className="arrival-cards"
        style={reduced ? undefined : { rotate, y }}
      >
        <OrbitLines />
        <a className="arrival-card arrival-creative" href="#work">
          <MenuArtwork compact />
          <strong>
            Creative
            <br />
            Studio
          </strong>
          <small>Illustrative</small>
        </a>
        <a className="arrival-card arrival-daily" href="#daily-smith">
          <AgentArtwork compact />
          <strong>Daily Smith</strong>
        </a>
        <a className="arrival-card arrival-slide" href="#slide-design">
          <SlideArtwork compact />
          <strong>Slide Design</strong>
          <small>In development</small>
        </a>
        <span className="handwritten orbit-hand" aria-hidden="true">
          Three orbits.
          <br />
          One flow.
        </span>
      </m.div>
      <a className="arrival-scroll" href="#work">
        A complete overview. Just scroll. <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
export function OrbitShowcase() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [-9, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  return (
    <section
      id="work"
      ref={ref}
      className="story-scene creative-scene shell orbit-track"
      aria-labelledby="work-title"
    >
      <div className="creative-copy">
        <p className="scene-kicker">02 / Creative Studio — Chat Smith</p>
        <h2 id="work-title">
          Creative
          <br />
          Studio
        </h2>
        <p className="creative-lead">
          From references to
          <br />
          visual DNA.
        </p>
        <p className="creative-role">
          Menu pipeline + visual DNA research
          <br />
          <span>Contributor · Released</span>
        </p>
        <span className="concept-pill">Illustrative concept artwork</span>
        <Link className="creative-case-link" href="/work/creative-studio">
          Explore the method <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <m.div
        className="creative-collage orbit-primary"
        style={reduced ? undefined : { rotate, scale }}
      >
        <MenuArtwork />
        <span className="handwritten creative-hand" aria-hidden="true">
          Concept
          <br />
          artwork
          <br />
          (examples)
        </span>
      </m.div>
    </section>
  );
}
