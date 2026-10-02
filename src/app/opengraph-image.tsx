import { ImageResponse } from "next/og";
export const alt = "Huy Nguyen — AI engineer × creative builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#F2EEE7",
        color: "#2E2723",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
      }}
    >
      <div style={{ fontSize: 17, letterSpacing: 4, marginBottom: 30 }}>
        AI ENGINEER AT VULCAN LABS
      </div>
      <div
        style={{
          fontSize: 108,
          fontWeight: 700,
          letterSpacing: -7,
          lineHeight: 1,
        }}
      >
        HUY NGUYEN
      </div>
      <div style={{ fontSize: 45, marginTop: 35, color: "#705461" }}>
        AI engineer. Creative builder.
      </div>
      <div style={{ fontSize: 21, marginTop: 55 }}>
        Agents / Generative design / Creative tools
      </div>
    </div>,
    size,
  );
}
