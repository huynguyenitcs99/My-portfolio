"use client";
import { ActionIcon } from "./action-icon";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "./use-media-query";
import { ProjectArt } from "./cosmic/project-art";
import { STUDY_PHASES, type StudyPhase } from "@/remotion/study-content";
import styles from "./motion-study.module.css";

const StudyPlayer = dynamic(() => import("./study-player"), { ssr: false });

export function MotionStudy() {
  const root = useRef<HTMLDivElement>(null);
  const phaseId = useId();
  const reduced = usePrefersReducedMotion();
  const compact = useMediaQuery("(max-width: 700px)");
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(() => typeof document === "undefined" || !document.hidden);
  const [manual, setManual] = useState(false);
  const [paused, setPaused] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [phase, setPhase] = useState<StudyPhase>(0);
  const [seek, setSeek] = useState<{ frame: number; request: number } | null>(null);
  const onPlayerReady = useCallback(() => setPlayerReady(true), []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisible(entries[0].isIntersecting);
        if (entries[0].isIntersecting) setNear(true);
      },
      { threshold: 0.15 },
    );
    if (root.current) observer.observe(root.current);
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  const loaded = near && (manual || reduced === false);
  const active = loaded && visible && tabVisible && !paused;
  const content = STUDY_PHASES[loaded && playerReady ? phase : 1];
  return (
    <div
      ref={root}
      className="motion-study"
      data-motion-study={active ? "playing" : "paused"}
      data-study-layout={compact ? "compact" : "desktop"}
    >
      <div className={`study-canvas ${styles.canvas}`}>
        <div
          className="study-poster"
          hidden={loaded && playerReady}
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 72% 40%, #142941, #070e19 70%)",
            padding: "4%",
          }}
        >
          {compact && <figure className={styles.compactPoster}>
            <figcaption>One visual language.</figcaption>
            {/* Existing concept artwork; the contribution stays in page text. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/cosmic/reference-board-c.webp" alt="" />
          </figure>}
          {!compact && <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 12,
              color: "#edf3fc",
            }}
          >
            <strong style={{ fontSize: "clamp(16px, 2vw, 24px)" }}>
              Coherent references. Useful outputs.
            </strong>
            <span style={{ fontSize: 14, color: "#80b7ff" }}>Visual DNA</span>
          </div>}
          {!compact && <div
            style={{
              position: "absolute",
              left: "12%",
              right: "12%",
              top: "20%",
              aspectRatio: "1.48",
              border: "1px solid #6986a64d",
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            <ProjectArt slug="creative-studio" progress={1} />
          </div>}
        </div>
        {loaded && <StudyPlayer active={active} compact={compact} onPhaseChange={setPhase} onReady={onPlayerReady} seek={seek} />}
      </div>
      <section className={styles.phase} aria-label="Current illustrated workflow" id={phaseId} data-study-phase={content.slug}>
        <div className={styles.phaseContent}>
          {STUDY_PHASES.map(item => <div key={item.slug} className={styles.phasePanel} data-current={item.slug === content.slug} aria-hidden={item.slug !== content.slug}>
            <div className={styles.phaseHeader}><strong>{item.project}</strong><span>{item.role}</span></div>
            <p>{item.contribution}</p>
            <p className={styles.mechanism}>{item.mechanism}</p>
          </div>)}
        </div>
        <div className={styles.phaseButtons} aria-label="Choose an illustrated workflow">
          {STUDY_PHASES.map((item, index) => <button key={item.slug} type="button" aria-label={`Show ${item.project} workflow`} aria-controls={phaseId} aria-pressed={content.slug === item.slug} onClick={() => {
            setNear(true);
            setManual(true);
            setPaused(true);
            setPhase(index as StudyPhase);
            setSeek(previous => ({ frame: index * 180 + 120, request: (previous?.request ?? 0) + 1 }));
          }}>{["Daily", "Creative", "Slide"][index]}</button>)}
        </div>
      </section>
      <div className={`study-controls ${styles.controls}`}>
        <div>
          <strong>Three mechanisms. One visual language.</strong>
          <span>Illustrated workflows · Personal Remotion study</span>
        </div>
        <button
          type="button"
          className={`text-button ${styles.playButton}`}
          onClick={() => {
            setNear(true);
            setManual(true);
            if (loaded) setPaused((p) => !p);
            else setPaused(false);
          }}
          aria-label={active ? "Pause motion study" : "Play motion study"}
          aria-controls={phaseId}
        >
          {active ? "Pause" : "Play"}{" "}
          <ActionIcon name={active ? "pause" : "play"} />
        </button>
      </div>
    </div>
  );
}
