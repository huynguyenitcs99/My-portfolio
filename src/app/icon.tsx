import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
export const size = { width: 96, height: 96 };
export const contentType = "image/png";
export default async function Icon() {
  const logo = await readFile(
    join(process.cwd(), "public/images/brand/nekomata.png"),
  );
  // Metadata image rendering resizes the accepted artwork; it does not redraw the logo.
  return new ImageResponse(
    <div
      style={{
        width: 96,
        height: 96,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F2EEE7",
      }}
    >
      <img
        alt=""
        src={`data:image/png;base64,${logo.toString("base64")}`}
        width={96}
        height={88}
      />
    </div>,
    size,
  );
}
