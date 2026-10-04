import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  useCurrentFrame,
} from "remotion";
import type { CSSProperties } from "react";
import { ProjectArt } from "../components/cosmic/project-art";
import { CompactBrandStudy } from "./compact-study";

/** Shared by Studio and the embedded Player. No ambient timers or CSS timeline. */
export const STUDY_DURATION = 540;
export const STUDY_FPS = 30;
export const STUDY_WIDTH = 1000;
export const STUDY_HEIGHT = 620;

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
  easing: Easing.bezier(0.2, 0.8, 0.2, 1),
};

function WorkflowScene({
  slug,
  project,
  heading,
  role,
  contribution,
  mechanism,
}: {
  slug: string;
  project: string;
  heading: string;
  role: string;
  contribution: string;
  mechanism: string;
}) {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(frame, [0, 164, 179], [1, 1, 0.28], clamp),
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 40,
          right: 40,
          top: 90,
          translate: `0px ${interpolate(frame, [0, 22], [5, 0], clamp)}px`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 18,
            fontWeight: 650,
            lineHeight: 1.15,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#378bff",
              boxShadow: "0 0 14px #378bff55",
            }}
          />
          {project}
          <span
            style={{
              marginLeft: 12,
              fontSize: 16,
              fontWeight: 450,
              color: "#82b9ff",
              fontFamily: "var(--font-body), sans-serif",
            }}
          >
            {role}
          </span>
        </div>
        <h2
          style={{
            margin: "14px 0 12px",
            maxWidth: 900,
            fontSize: 34,
            lineHeight: 1.08,
            letterSpacing: "-.035em",
            fontWeight: 700,
            textWrap: "balance",
          }}
        >
          {heading}
        </h2>
        <p
          style={{
            margin: 0,
            maxWidth: 865,
            fontSize: 17,
            lineHeight: 1.4,
            color: "#c7cfd9",
            fontFamily: "var(--font-body), sans-serif",
          }}
        >
          {contribution}
        </p>
      </div>
      <div
        style={
          {
            "--overview": 0,
            position: "absolute",
            left: 40,
            top: 245,
            width: 920,
            height: 290,
            border: "1px solid #b5c3d16b",
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "0 14px 48px #00000035",
            translate: `0px ${interpolate(frame, [0, 26, 164, 179], [4, 0, 0, -4], clamp)}px`,
          } as CSSProperties
        }
      >
        <ProjectArt
          slug={slug}
          className="art-wide"
          progress={interpolate(frame, [20, 120], [0, 1], clamp)}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 40,
          bottom: 59,
          fontSize: 13,
          lineHeight: 1.2,
          fontFamily: "var(--font-body), sans-serif",
          color: "#aebdcc",
        }}
      >
        {mechanism}
      </div>
    </AbsoluteFill>
  );
}

/** Three useful mechanisms; a single object holds focus throughout each scene. */
export function BrandStudy({ compact = false }: { compact?: boolean }) {
  const frame = useCurrentFrame();
  const scene = Math.min(2, Math.floor(frame / 180));
  if (compact) return <CompactBrandStudy />;
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 75% 48%, #152b43 0, #0b141d 48%, #070d15 100%)",
        overflow: "hidden",
        color: "#edf3fc",
        fontFamily: "var(--font-display), sans-serif",
      }}
    >
      <svg
        viewBox="0 0 1000 620"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="study-path" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#488cff" stopOpacity="0" />
            <stop offset=".45" stopColor="#488cff" stopOpacity=".65" />
            <stop offset="1" stopColor="#a3c6ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M-100 484C165 605 367 110 695 232S1025 470 1110 289"
          fill="none"
          stroke="url(#study-path)"
          strokeWidth="1.25"
          style={{
            translate: `0px ${interpolate(frame, [0, STUDY_DURATION], [8, -8], clamp)}px`,
          }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 40,
          right: 40,
          top: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 15,
          borderBottom: "1px solid #7e9cb12b",
          fontSize: 17,
        }}
      >
        <span style={{ fontWeight: 700 }}>Huy Nguyen.</span>
        <span
          style={{
            fontSize: 13,
            fontFamily: "var(--font-body), sans-serif",
            color: "#bcc7d8",
          }}
        >
          AI engineering × creative systems
        </span>
      </div>
      <Sequence
        from={0}
        durationInFrames={180}
        name="Daily Smith: context to brief"
      >
        <WorkflowScene
          slug="daily-smith"
          project="Daily Smith"
          heading="Context becomes clarity."
          role="PIC · Released"
          contribution="I design the AI pipeline, data flow and LLM-agent layer."
          mechanism="Context → daily brief → follow-up conversation"
        />
      </Sequence>
      <Sequence
        from={180}
        durationInFrames={180}
        name="Creative Studio: reference to Visual DNA"
      >
        <WorkflowScene
          slug="creative-studio"
          project="Creative Studio"
          heading="One visual language, carried through."
          role="Contributor · Released"
          contribution="I adapted the poster pipeline for menus and researched reference-image Visual DNA descriptions in JSONL."
          mechanism="Coherent references → Visual DNA guidelines → menu"
        />
      </Sequence>
      <Sequence
        from={360}
        durationInFrames={180}
        name="Slide Design: image to editable"
      >
        <WorkflowScene
          slug="slide-design"
          project="Slide Design"
          heading="From an image to editable elements."
          role="Main PIC · In development"
          contribution="Image-to-editable conversion is one module of Slide Design."
          mechanism="A flat image → editable text, image and layout elements"
        />
      </Sequence>
      <div
        style={{
          position: "absolute",
          left: 40,
          right: 40,
          bottom: 20,
          display: "flex",
          gap: 20,
          fontFamily: "var(--font-body), sans-serif",
          fontSize: 12,
        }}
      >
        {[
          "01  Context → brief",
          "02  Reference → Visual DNA",
          "03  Image → editable",
        ].map((label, index) => (
          <div
            key={label}
            style={{ flex: 1, color: index === scene ? "#dceaff" : "#8797ac" }}
          >
            <div
              style={{
                position: "relative",
                height: 2,
                marginBottom: 10,
                background: "#4d638833",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: "#5c9cff",
                  width: `${interpolate(frame, [index * 180, (index + 1) * 180], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`,
                }}
              />
            </div>
            {label}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
}
