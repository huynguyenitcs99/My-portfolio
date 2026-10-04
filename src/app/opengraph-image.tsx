import { ImageResponse } from "next/og";
export const alt = "Huy Nguyen — AI engineer × creative builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#09131b",
        color: "#f6f3eb",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
      }}
    >
      <div style={{ fontSize: 17, letterSpacing: 4, marginBottom: 30 }}>
        ENGINEERING × IMAGINATION
      </div>
      <div
        style={{
          fontSize: 108,
          fontWeight: 700,
          letterSpacing: -4,
          lineHeight: 1,
        }}
      >
        HUY NGUYEN
      </div>
      <div style={{ fontSize: 45, marginTop: 35, color: "#acd6ec" }}>
        AI engineer. Creative by instinct.
      </div>
      <div style={{ fontSize: 21, marginTop: 55 }}>
        Agents / Generative design / Creative tools
      </div>
    </div>,
    size,
  );
}
