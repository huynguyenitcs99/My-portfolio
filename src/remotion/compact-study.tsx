import { AbsoluteFill, CanvasImage, interpolate, staticFile, useCurrentFrame } from "remotion";
import type { CSSProperties } from "react";
import { STUDY_PHASES, studyPhaseAt } from "./study-content";

export const COMPACT_STUDY_WIDTH = 420;
export const COMPACT_STUDY_HEIGHT = 360;

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const card: CSSProperties = {
  position: "absolute",
  border: "1px solid #b5c3d180",
  borderRadius: 12,
  background: "#111c2b",
  boxShadow: "0 10px 25px #00000035",
  overflow: "hidden",
};

function CompactDaily({ progress }: { progress: number }) {
  return (
    <>
      <svg viewBox="0 0 388 238" width="100%" height="100%" style={{ position: "absolute" }}>
        <path d="M86 48Q86 67 190 81M302 48Q302 67 190 81" fill="none" stroke="#5c9cff" strokeWidth="2" strokeDasharray="150" strokeDashoffset={interpolate(progress, [0, .4], [150, 0], clamp)} />
      </svg>
      <div style={{ ...card, left: 8, top: 0, width: 156, padding: "10px 12px", fontSize: 22, opacity: interpolate(progress, [.15, .6], [1, .5], clamp) }}>Email</div>
      <div style={{ ...card, right: 8, top: 0, width: 156, padding: "10px 12px", fontSize: 22, opacity: interpolate(progress, [.15, .6], [1, .5], clamp) }}>Calendar</div>
      <div style={{ ...card, left: 49, top: 69, width: 290, padding: "12px 20px", opacity: interpolate(progress, [0, .3], [.15, 1], clamp), translate: `0px ${interpolate(progress, [0, .3], [15, 0], clamp)}px` }}>
        <strong style={{ display: "block", fontSize: 26, marginBottom: 8 }}>Daily brief</strong>
        <div style={{ fontSize: 20, lineHeight: 1.2, color: "#bdd3ee", opacity: interpolate(progress, [.25, .5], [0, 1], clamp) }}>01&nbsp; Priorities</div>
        <div style={{ fontSize: 20, lineHeight: 1.2, color: "#bdd3ee", marginTop: 5, opacity: interpolate(progress, [.4, .65], [0, 1], clamp) }}>02&nbsp; Follow-ups</div>
      </div>
      <div style={{ ...card, right: 14, bottom: 0, padding: "9px 15px", fontSize: 22, background: "#18375a", opacity: interpolate(progress, [.7, 1], [0, 1], clamp), translate: `0px ${interpolate(progress, [.7, 1], [8, 0], clamp)}px` }}>Continue the conversation</div>
    </>
  );
}

function CompactCreative({ progress }: { progress: number }) {
  return (
    <>
      <div style={{ ...card, left: 40, top: 4, width: 308, height: 224, opacity: interpolate(progress, [0, .32, .53], [1, 1, 0], clamp), scale: interpolate(progress, [.25, .55], [1, .93], clamp) }}>
        <CanvasImage src={staticFile("images/cosmic/reference-board-c.webp")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ ...card, left: 40, top: 4, width: 308, height: 224, padding: 24, background: "#e8e3d6", color: "#172535", opacity: interpolate(progress, [.23, .43, .67, .87], [0, 1, 1, 0], clamp), translate: `${interpolate(progress, [.23, .43], [26, 0], clamp)}px 0px` }}>
        <strong style={{ fontSize: 30 }}>Visual DNA</strong>
        <div style={{ display: "flex", gap: 10, margin: "22px 0 19px" }}>
          <span style={{ width: 68, height: 39, background: "#153454", borderRadius: 5 }} />
          <span style={{ width: 68, height: 39, background: "#769bc0", borderRadius: 5 }} />
          <span style={{ width: 68, height: 39, background: "#c6b58e", borderRadius: 5 }} />
        </div>
        <div style={{ fontSize: 23 }}>Color · image · layout</div>
        <div style={{ height: 7, width: "80%", marginTop: 17, background: "#17253533", borderRadius: 4 }} />
      </div>
      <div style={{ ...card, left: 40, top: 4, width: 308, height: 224, opacity: interpolate(progress, [.67, .92], [0, 1], clamp), rotate: `${interpolate(progress, [.67, .92], [-7, 0], clamp)}deg`, scale: interpolate(progress, [.67, .92], [.92, 1], clamp) }}>
        <CanvasImage src={staticFile("images/cosmic/menu-dna-cuisine.webp")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <strong style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "8px 15px", fontSize: 23, background: "#091019e8" }}>Menu concept</strong>
      </div>
    </>
  );
}

function CompactSlide({ progress }: { progress: number }) {
  return (
    <>
      <svg viewBox="0 0 388 238" width="100%" height="100%" style={{ position: "absolute", opacity: interpolate(progress, [.3, .65], [0, 1], clamp) }}>
        <path d="M173 116C208 116 187 47 218 47M173 116H218M173 116C208 116 187 188 218 188" fill="none" stroke="#5c9cff" strokeWidth="2" />
      </svg>
      <div style={{ ...card, left: 12, top: 55, width: 182, height: 128 }}>
        <CanvasImage src={staticFile("images/cosmic/slide-landscape-c.webp")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <strong style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "6px 10px", fontSize: 22, background: "#091019d9" }}>Source image</strong>
      </div>
      <div style={{ ...card, right: 12, top: 19, width: 154, padding: "12px 15px", fontSize: 25, opacity: interpolate(progress, [.12, .4], [0, 1], clamp), translate: `${interpolate(progress, [.12, .4], [-30, 0], clamp)}px 0px` }}>Text <span style={{ color: "#78b2ff" }}>|</span></div>
      <div style={{ ...card, right: 12, top: 91, width: 154, padding: "12px 15px", fontSize: 25, opacity: interpolate(progress, [.32, .62], [0, 1], clamp), translate: `${interpolate(progress, [.32, .62], [-30, 0], clamp)}px 0px` }}>Image</div>
      <div style={{ ...card, right: 12, top: 163, width: 154, padding: "12px 15px", fontSize: 25, opacity: interpolate(progress, [.52, .82], [0, 1], clamp), translate: `${interpolate(progress, [.52, .82], [-30, 0], clamp)}px 0px` }}>Layout</div>
    </>
  );
}

/** Compact choreography uses readable objects, not a scaled desktop scene. */
export function CompactBrandStudy() {
  const frame = useCurrentFrame();
  const phase = studyPhaseAt(frame);
  const localFrame = frame % 180;
  const progress = interpolate(localFrame, [20, 120], [0, 1], clamp);
  const content = STUDY_PHASES[phase];
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 75% 48%,#152b43,#091019 85%)", color: "#ebe9e6", fontFamily: "var(--font-body),sans-serif", lineHeight: 1.2, overflow: "hidden" }}>
      <h2 style={{ position: "absolute", left: 24, right: 24, top: 21, margin: 0, fontSize: 28, fontWeight: 750, lineHeight: 1.12, letterSpacing: "-.025em" }}>{content.compactHeading}</h2>
      <div style={{ position: "absolute", left: 16, right: 16, top: 80, height: 238, opacity: interpolate(localFrame, [0, 10, 166, 179], [.55, 1, 1, .55], clamp) }}>
        {phase === 0 && <CompactDaily progress={progress} />}
        {phase === 1 && <CompactCreative progress={progress} />}
        {phase === 2 && <CompactSlide progress={progress} />}
      </div>
      <div style={{ position: "absolute", left: 24, right: 24, bottom: 17, display: "flex", gap: 8 }}>
        {[0, 1, 2].map((index) => <div key={index} style={{ flex: 1, height: 3, background: "#50698855", overflow: "hidden" }}><div style={{ height: "100%", background: "#75adff", width: `${interpolate(frame, [index * 180, (index + 1) * 180], [0, 100], clamp)}%` }} /></div>)}
      </div>
    </AbsoluteFill>
  );
}
