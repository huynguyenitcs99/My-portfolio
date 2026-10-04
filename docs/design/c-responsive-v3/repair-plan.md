# C adaptive composition implementation plan

**Goal:** Preserve approved C while eliminating confirmed hero/face/card/control collisions across desktop, compact screens, text enlargement and resizing.

**Architecture:** A single width-based portrait/lettering basis; an intrinsic, measured compact composition when reading cannot fit; one ordered descending card track whose frames respect measured reading and horizon envelopes. Native chapter scrolling and existing dialog behavior remain intact. The satin horizon is a responsive vector surface, shared by the hero and native-flow chapter transitions.

**Authority:** `docs/research/2026-10-03-concept-reset/mockups/c-name.png`, `c-mobile.png`, `c-storyboard.png`; factual content in `PRODUCT.md`. User already authorizes implementation and private review deployment.

## Tasks

- [x] Pin failing real-browser hero regression: face exclusion, compact intro before artwork, card caption ordering, Pause pointer, boundary widths and short/wide aspect ratios.
- [x] Implement intrinsic hero geometry in `experience.tsx` and `c-fidelity.css`: square portrait; unitless copy line-height; actual caption/frame dimensions; compact selection; all-phase bounded track and continuous wrap fade; controls outside backdrop stacking.
- [x] Restore C satin horizon, shallow physical plate depth, explicit visual-DNA contribution and compact narrative order in `page.tsx`, `c-fidelity.css`, `project-art.css`.
- [x] Add readable compact Remotion composition/captions/controls (independent implementation ownership).
- [x] Verify production export: responsive matrix, full80s card phase, native forward/reverse, selection/Escape/focus, touch/orientation, reduced motion/noJS and text enlargement; lint/type/build; independent whole visual/code review with one correction batch.
- [x] Sync only changed source into isolated Site checkout, preserve export adapters/audience, push exact source SHA, deploy private review and open its URL.

## Constraints and review focus

No new dependency or font/portrait/logo replacement. Concept illustrations remain labeled; no invented outcome/capability/release. Responsive fidelity may gain native vertical space to retain16px reading; it must never magnify/crop the face to fill an unrelated viewport rectangle. Test799/800/801/1199/1200, narrow/tall and wide/short, font preferences and resize. Entire card frames and captions are measured; no current claim that historical chapter-only tests cover the hero. Controls must receive real pointer clicks. Real Safari/iOS and Firefox hardware unavailable unless verified otherwise; do not imply testing them.

## Diagnosis

See `responsive-root-cause.md`, `visual-diagnosis.md` and `platform-audit/` evidence. Prior typography-only SHIP is superseded by user's full-page rejection. The automatic whole-hero gate remains open and must not be forced closed.
