export const clamp = (value: number) => Math.max(0, Math.min(1, value));
export const ease = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};
export const mix = (a: number, b: number, t: number) => a + (b - a) * clamp(t);

/** A descending ribbon. All three previews are legible at arrival; time gently carries them down. */
export function orbitPose(index: number, seconds: number) {
  const p = (((seconds / 80 + index / 3) % 1) + 1) % 1;
  const rotation = mix(5, 8, p);
  return {
    x: 88 - p * 19,
    y: 20 + p * 80 - p * p * 20,
    rotation,
    scale: 0.9 + Math.sin(p * Math.PI) * 0.1,
    opacity:
      p > 0.94
        ? mix(1, 0, (p - 0.94) / 0.06)
        : p < 0.04
          ? mix(0.65, 1, p / 0.04)
          : 1,
  };
}
