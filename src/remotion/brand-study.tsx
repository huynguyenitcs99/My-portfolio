import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";

/** Personal creative timeline study; artwork is illustrative. */
export function BrandStudy() {
  const frame = useCurrentFrame();
  const x = 80 + (frame / 300) * 840;
  return (
    <AbsoluteFill style={{ background: "#211D1B", overflow: "hidden" }}>
      <Img
        src={staticFile("images/story/atlas-motion.jpg")}
        style={{
          position: "absolute",
          width: "300%",
          height: "200%",
          maxWidth: "none",
          left: "-100%",
          top: "-100%",
        }}
      />
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
        <line
          x1={x}
          x2={x}
          y1="35"
          y2="595"
          stroke="#F2EEE7"
          strokeWidth="2"
          opacity=".75"
        />
        <circle cx={x} cy="35" r="7" fill="#B7A07A" />
        <rect
          x={x - 32}
          y="575"
          width="64"
          height="22"
          rx="4"
          fill="#211D1B"
          opacity=".85"
        />
        <text
          x={x}
          y="590"
          fill="#F2EEE7"
          textAnchor="middle"
          fontFamily="Arial"
          fontSize="13"
        >
          {Math.floor(frame / 30)
            .toString()
            .padStart(2, "0")}
          :00
        </text>
      </svg>
    </AbsoluteFill>
  );
}
