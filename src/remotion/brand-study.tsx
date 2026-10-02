import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

/** Illustrative personal brand study, not a company product demonstration. */
export function BrandStudy() {
  const frame = useCurrentFrame();
  const phase = (frame / 300) * Math.PI * 2;
  const morph = interpolate(
    frame,
    [0, 75, 110, 225, 270, 300],
    [0, 0, 1, 1, 0, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const angle = Math.sin(phase) * 22;
  const common: React.CSSProperties = {
    fontFamily: "Arial, sans-serif",
    color: "#F2EEE7",
  };
  return (
    <AbsoluteFill
      style={{ ...common, background: "#705461", overflow: "hidden" }}
    >
      <svg
        viewBox="0 0 1000 620"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <g
          transform={`rotate(${angle} 500 310)`}
          fill="none"
          stroke="#B7A07A"
          strokeWidth="1.5"
        >
          <ellipse cx="500" cy="310" rx="452" ry={160 + morph * 65} />
          <ellipse
            cx="500"
            cy="310"
            rx="420"
            ry="180"
            transform="rotate(32 500 310)"
          />
          <circle
            cx={500 + 452 * Math.cos(phase)}
            cy={310 + (160 + morph * 65) * Math.sin(phase)}
            r="9"
            fill="#B7A07A"
          />
          <circle
            cx={500 + 420 * Math.cos(phase + Math.PI)}
            cy={310 + 180 * Math.sin(phase + Math.PI)}
            r="9"
            fill="#F2EEE7"
          />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          left: 58,
          top: 40,
          fontSize: 13,
          letterSpacing: 3,
        }}
      >
        HUY NGUYEN / MOTION STUDY 001
      </div>
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 160,
          fontSize: 108,
          lineHeight: 0.99,
          letterSpacing: -6,
          fontWeight: 600,
          opacity: 1 - morph,
          transform: `translateY(${-morph * 24}px)`,
        }}
      >
        Two sides.
        <br />
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
          }}
        >
          One mind.
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 160,
          fontSize: 108,
          lineHeight: 0.99,
          letterSpacing: -6,
          fontWeight: 600,
          opacity: morph,
          transform: `translateY(${(1 - morph) * 24}px)`,
        }}
      >
        Engineering.
        <br />
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
          }}
        >
          Imagination.
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          right: 70,
          bottom: 70,
          fontSize: 17,
          letterSpacing: 2,
        }}
      >
        AI × CREATIVE
      </div>
      <div style={{ position: "absolute", left: 70, bottom: 70, fontSize: 15 }}>
        A little curiosity. A lot of making.
      </div>
    </AbsoluteFill>
  );
}
