import Image from "next/image";
import type { CSSProperties } from "react";
export function MenuArtwork({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`asset-art menu-art ${compact ? "compact" : ""}`}
      aria-hidden="true"
    >
      <Image
        src="/images/story/creative.png"
        alt=""
        fill
        sizes={
          compact
            ? "(max-width: 600px) 105px, 320px"
            : "(max-width: 600px) 100vw, 800px"
        }
      />
    </div>
  );
}
export function AgentArtwork({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`asset-art agent-art ${compact ? "compact" : ""}`}
      aria-hidden="true"
    >
      <Image
        src="/images/story/daily.png"
        alt=""
        fill
        sizes={compact ? "(max-width: 600px) 90px, 320px" : "800px"}
      />
    </div>
  );
}
export function SlideArtwork({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`asset-art slide-art ${compact ? "compact" : ""}`}
      aria-hidden="true"
    >
      <Image
        src="/images/story/slide.png"
        alt=""
        fill
        sizes={
          compact
            ? "(max-width: 600px) 110px, 320px"
            : "(max-width: 600px) 100vw, 750px"
        }
      />
    </div>
  );
}
const tileDescriptions = [
  "Folded generative terrain in plum and sand",
  "Mountain landscape",
  "Faceted architecture at sunset",
  "Botanical paper study",
  "Creative editing timeline",
  "Sculptural concrete architecture",
];
export function AtlasTile({
  index,
  source = "atlas",
}: {
  index: number;
  source?: "atlas" | "engineering";
}) {
  const style = {
    "--atlas-columns": 3,
    "--atlas-rows": source === "atlas" ? 2 : 1,
    "--atlas-x": index % 3,
    "--atlas-y": Math.floor(index / 3),
  } as CSSProperties;
  return (
    <div className="atlas-tile" style={style}>
      <Image
        className="atlas-image"
        src={`/images/story/${source}.png`}
        alt={
          source === "atlas"
            ? `${tileDescriptions[index]} — personal concept artwork`
            : "Illustrative engineering cover"
        }
        fill
        sizes="1200px"
      />
    </div>
  );
}
