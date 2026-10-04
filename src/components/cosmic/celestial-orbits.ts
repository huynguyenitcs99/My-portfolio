// Historical mathematical helpers remain available for the separate orbital study.
// The portfolio scene below uses deliberate composition, not these orbital elements.
export const ORBIT = {
  earthEccentricity: 0.0167,
  lunarEccentricity: 0.0549,
  earthObliquity: (23.44 * Math.PI) / 180,
  lunarInclination: (5.145 * Math.PI) / 180,
  yearDays: 365.256,
  lunarDays: 27.3217,
  yearSeconds: 156,
  earthRadius: 2.8,
  lunarRadius: 2.8 * 0.2727,
  earthDistance: 20,
  lunarDistance: 6.8,
} as const;

export function eccentricAnomaly(mean: number, eccentricity: number) {
  let eccentric = mean;
  for (let i = 0; i < 5; i++) {
    eccentric -=
      (eccentric - eccentricity * Math.sin(eccentric) - mean) /
      (1 - eccentricity * Math.cos(eccentric));
  }
  return eccentric;
}

export function ellipsePosition(
  mean: number,
  radius: number,
  eccentricity: number,
) {
  const e = eccentricAnomaly(mean, eccentricity);
  return {
    x: radius * (Math.cos(e) - eccentricity),
    z: -radius * Math.sqrt(1 - eccentricity * eccentricity) * Math.sin(e),
  };
}

export function celestialPose(seconds: number) {
  const earthMean = -0.2 + (seconds / ORBIT.yearSeconds) * Math.PI * 2;
  const lunarPeriod = (ORBIT.yearSeconds * ORBIT.lunarDays) / ORBIT.yearDays;
  const lunarMean = 2.3 + (seconds / lunarPeriod) * Math.PI * 2;
  return {
    earthMean,
    lunarMean,
    earth: ellipsePosition(
      earthMean,
      ORBIT.earthDistance,
      ORBIT.earthEccentricity,
    ),
    moon: ellipsePosition(
      lunarMean,
      ORBIT.lunarDistance,
      ORBIT.lunarEccentricity,
    ),
    // Uniform synchronous spin + eccentric orbit produces optical libration.
    lunarSpin: lunarMean - Math.PI / 2,
  };
}

/** Bounded viewport anchors protect C's face/name reading zones while the bodies
 * translate in 3D. Scroll adds a separate recession into the work chapters. */
export function directionCPose(
  seconds: number,
  compact: boolean,
  progress: number,
) {
  const arc = seconds / 32;
  const p = Math.min(1, Math.max(0, progress));
  const closingPhase = Math.min(1, Math.max(0, (p - 0.78) / 0.22));
  const returning = closingPhase * closingPhase * (3 - 2 * closingPhase);
  // Recede during workflow chapters, then return to the recognizable C world
  // for the person/contact closing. No hard visibility cut removes the bodies.
  const quiet = p * 1.5 * (1 - returning);
  return {
    sun: {
      x:
        (compact ? -0.06 : -0.0195) +
        Math.sin(arc * 0.83) * 0.017 -
        quiet * 0.07,
      y:
        (compact ? 0.185 : 0.1835) +
        Math.sin(arc * 0.83 + 0.3) * 0.023 -
        quiet * 0.05,
      radius: compact ? 0.09 : 0.04,
    },
    earth: {
      x: (compact ? 1.08 : 1.05) + Math.sin(arc) * 0.027 + quiet * 0.12,
      y:
        (compact ? 0.155 : 0.178) +
        Math.sin(arc * 0.72 + 0.6) * 0.022 -
        quiet * 0.09,
      radius: (compact ? 0.32 : 0.36) * (1 - quiet * 0.12),
      z: -2 + Math.sin(arc * 0.8) * 0.7 - quiet * 2.5,
    },
    moon: {
      x:
        (compact ? 0.72 : 0.6673) +
        (Math.sin(arc * 1.15 + 0.35) - Math.sin(0.35)) * 0.017 +
        quiet * 0.09,
      y: (compact ? 0.1 : 0.0655) + Math.sin(arc * 0.88) * 0.012 - quiet * 0.07,
      radius: compact ? 0.043 : 0.026,
      z: 1 + Math.sin(arc * 0.9) * 0.4 - quiet * 1.4,
    },
  };
}
