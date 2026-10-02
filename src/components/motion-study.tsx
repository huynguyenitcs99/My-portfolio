"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./use-media-query";

const StudyPlayer = dynamic(() => import("./study-player"), { ssr: false });

export function MotionStudy() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [manual, setManual] = useState(false);
  const [paused, setPaused] = useState(false);
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
  return (
    <div
      ref={root}
      className="motion-study"
      data-motion-study={active ? "playing" : "paused"}
    >
      <div className="study-canvas">
        {loaded && <StudyPlayer active={active} />}
      </div>
      <div className="study-controls">
        <div>
          <strong>Creative timelines.</strong>
          <span>Personal motion study · authored with Remotion</span>
        </div>
        <button
          className="text-button"
          onClick={() => {
            setManual(true);
            if (loaded) setPaused((p) => !p);
          }}
          aria-label={active ? "Pause motion study" : "Play motion study"}
        >
          {active ? "Pause Ⅱ" : "Play ▷"}
        </button>
      </div>
    </div>
  );
}
