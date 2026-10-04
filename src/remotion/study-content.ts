export const STUDY_PHASES = [
  {
    slug: "daily-smith",
    project: "Daily Smith",
    role: "PIC · Released",
    contribution: "I design the AI pipeline, data flow and LLM-agent layer.",
    mechanism: "Context → daily brief → follow-up conversation",
    compactHeading: "Context becomes clarity.",
  },
  {
    slug: "creative-studio",
    project: "Creative Studio",
    role: "Contributor · Released",
    contribution:
      "I adapted the poster pipeline for menus and researched reference-image Visual DNA descriptions in JSONL.",
    mechanism: "Coherent references → Visual DNA guidelines → menu",
    compactHeading: "One visual language.",
  },
  {
    slug: "slide-design",
    project: "Slide Design",
    role: "Main PIC · In development",
    contribution: "Image-to-editable conversion is one module of Slide Design.",
    mechanism: "A flat image → editable text, image and layout elements",
    compactHeading: "Image to editable elements.",
  },
] as const;

export type StudyPhase = 0 | 1 | 2;

export function studyPhaseAt(frame: number): StudyPhase {
  return Math.min(2, Math.max(0, Math.floor(frame / 180))) as StudyPhase;
}
