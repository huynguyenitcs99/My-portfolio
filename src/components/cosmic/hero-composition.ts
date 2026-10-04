import { clamp, ease } from "@/lib/orbit";

export type ReadingBox = { left: number; right: number; top: number; bottom: number; signature?: boolean };
export type HeroFrame = { width: number; height: number; span: number; offset: number; rotation: number; text: ReadingBox[] };
export type HeroGeometry = {
  compact: boolean;
  width: number;
  height: number;
  limit: number;
  readingLimit: number;
  cycle: number;
  frames: HeroFrame[];
  reading: ReadingBox[];
};

/** Local text ink bounds after the card's rotation, shared by initial fit and travel. */
export function heroTextEnvelopes(frame: Pick<HeroFrame, "width" | "height" | "text">, rotation: number) {
  const angle = rotation * Math.PI / 180;
  return frame.text.map((box) => {
    const corners = [[box.left, box.top], [box.right, box.top], [box.left, box.bottom], [box.right, box.bottom]];
    const vertical = corners.map(([x, y]) => (x - frame.width / 2) * Math.sin(angle) + (y - frame.height / 2) * Math.cos(angle) + frame.height / 2);
    return { top: Math.min(...vertical), bottom: Math.max(...vertical) };
  });
}

/** All frames share one ordered track; wrapping occurs outside its visible window.
 * Only the quiet silhouette edges may tuck together, as in C. Reading is protected. */
export function heroTrackPose(index: number, seconds: number, geometry: HeroGeometry) {
  const frame = geometry.frames[index];
  const travel = (frame.offset + seconds * geometry.cycle / 80) % geometry.cycle;
  const top = travel - frame.span;
  const progress = clamp(top / geometry.limit);
  const gutter = geometry.width * .025;
  const rotation = frame.rotation + Math.sin(progress * Math.PI) * .6;
  const text = heroTextEnvelopes(frame, rotation).map((box) => ({ top: top + box.top, bottom: top + box.bottom }));
  let left = geometry.width - gutter - frame.width - progress * geometry.width * .11;
  let clearance = 1;
  for (const box of geometry.reading) {
    const cornerRise = frame.width * Math.sin(frame.rotation * Math.PI / 180) / 2;
    // The signature may sit over a quiet frame edge, as C specifies; labels
    // must clear it. Ordinary reading excludes the entire opaque frame.
    const envelopes = box.signature ? text : [{ top: top - cornerRise, bottom: top + frame.height + cornerRise }];
    const padding = box.signature ? 6 : 18;
    for (const painted of envelopes) if (painted.bottom > box.top - padding && painted.top < box.bottom + padding) {
      left = Math.max(left, box.right + 24);
      if (left + frame.width > geometry.width - gutter) {
        clearance = Math.min(clearance, ease((painted.top - box.bottom - padding) / 16));
      }
    }
  }
  left = Math.min(left, geometry.width - gutter - frame.width);
  const entry = ease(top / 36);
  const exit = ease((geometry.limit - top - frame.height) / 36);
  const readingExit = ease((geometry.readingLimit - Math.max(...text.map((box) => box.bottom)) - 6) / 24);
  return {
    x: (left + frame.width / 2) / geometry.width * 100,
    y: top + frame.height / 2,
    width: frame.width / geometry.width * 100,
    rotation,
    opacity: entry * exit * readingExit * clearance,
    scale: 1,
  };
}
