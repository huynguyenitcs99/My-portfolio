# Design prototype verification — 2026-10-02

This verifies review artifacts, not an upgraded production website.

- HTML prototype rendered in Chromium at320,360,390,768,1024,1440px.
-18 configurations: normal motion, reduced motion and JavaScript disabled at each width.
- No horizontal overflow, missing images or browser page errors in those checks.
- Desktop opening, selected-card state, method, Daily, slide, actual engineering media and contact screenshots inspected.
- Card-to-hero is the same HTML surface throughout the native scroll transform. It is a directional prototype; final production scroll architecture still requires implementation and validation after design review.
- Two standalone Remotion compositions: CardToHero180frames and VisualDNA240frames. Standalone TypeScript checking and actual Studio playback passed; representative frames were rendered and inspected.
- Original chosen Nekomata mark and real portrait were reused without editing.
- Main production source, dependencies and deployments remain unchanged in this research/design phase. Previous Lighthouse results do not apply to this prototype.

Artifacts: `previews/browser-checks.json`, `previews/hero-1440.png`, `previews/hero-390.png`, `previews/storyboard-v3.png`, `previews/scroll-storyboard-v3.webm`; all scene captures in `previews/`; Remotion keyframes under `remotion/`.

Important review limit: visual direction and readability targets need Huy’s judgment. Browser checks do not establish aesthetic success or user comprehension. HTML and Remotion studies explore the same choreography with separate original specimens; unify final visual layers before production to avoid another storyboard/website mismatch.

Video reference: user supplied an Ex-Aid MP4, but it exceeds the32MiB workspace transfer limit. No frames from it have been viewed. Higgsfield transfer was blocked by automatic approval review; user subsequently reported insufficient quota, so only a local smaller clip can resolve that footage gap.
