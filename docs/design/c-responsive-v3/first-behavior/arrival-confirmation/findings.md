# Final arrival confirmation — static production 3040

This bounded recheck supersedes the remaining ultra-wide initial-arrival issue in `../final/findings.md`. The shared glyph-envelope fix was freshly built and exported before this run. No app source edits were made by this audit.

## Fresh evidence

- Four complete 80-second **source-clock** cycles, 324 actual-DOM samples: 1536×1024, 1366×768, 1280×650, and 1920×800. Each profile's initial and final card left/top/opacity are identical. No visible caption/footer clipping against the name, body, another project card, or curved horizon remains after screenshot review.
- Three raw character-Range alerts at second 48 (desktop/laptop/short) are retained in `report.json` and individually reviewed in `reviewed-flags.json`. Their actual screenshot crops show intact subtitle ink above the silver N; the overlapping Range area is empty font descent. There are **zero confirmed painted defects**. Ultra-wide has zero raw flags.
- Eight fresh real Pause/Play interactions passed across all four profiles. No control errors, page errors, or horizontal overflow in these runs.
- Native ultra-wide 1920×800 arrival: Creative Studio is opacity 1, not inert, and its entire caption is visible at y≈452px. An actual mouse click on the caption opens the correct modal, focuses Close, closes with Escape, and restores Creative focus. This reproduces the previous failing setup rather than forcing a DOM click.
- Slide remains below the first fold on this wide/short aspect ratio (caption y≈870px). It is accessible through the intended story: ordinary native scroll to the Slide reading chapter exposes its caption at y≈379px, opacity 1, not inert. Actual caption click, Close focus, Escape, and returned Slide focus all pass. No assertion is made that every card is above the first fold at every aspect ratio.
- `arrival-native.json` and `report.json` independently record matching before/after SHA-256 for all four audited source files; the source was unchanged during both runs.

## Scope and limits

The prior 180 native forward/reverse reading samples remain in `../final/report.json`; they were **not rerun** in this deliberately bounded arrival correction confirmation. The changed code adjusts initial glyph packing and arrival height; the native Slide chapter preview was checked again at its resulting new scroll position. Chromium with SwiftShader was used; these checks are not a hardware frame-rate measurement or a physical Safari/iOS/Android validation. The source-clock replay runs the existing Experience scroll handler with 50ms increments while holding Three redraws, so all 80 seconds are covered independently of software-rendering throughput.

Key screenshots: `ultrawide-initial.png`, `ultrawide-slide-reading.png`, and `desktop-cycle-48-glyph-detail.png`, `laptop-cycle-48-glyph-detail.png`, `short-cycle-48-glyph-detail.png`.
