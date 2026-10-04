# C adaptive final behavior audit — static export 3040

This audit used the freshly rebuilt static production export at `http://127.0.0.1:3040`, not the HMR server. `report.json` records SHA-256 for Experience, hero composition, responsive CSS, and page before and after the run; all remained unchanged. Older footer clipping evidence is retained separately in `../diagnosis-before-glyph-protection/`.

## Verified results

- Four complete **80-second source-clock cycles** at 1536×1024, 1366×768, 1280×650, and 1920×800; 81 samples per profile, 324 total. The actual DOM was advanced through the existing Experience scroll handler with 20 increments of 50ms per second. Start and end `left`, `top`, and opacity match exactly for all cards on all four profiles. Three redraws were held so software GPU throughput did not shorten cycle coverage. This is a source-clock motion verification, not a wall-clock frame-rate measurement.
- Actual caption/title/contribution character Ranges were compared against live name cap polygons, live role/body/CTA text, the curved horizon, and other project cards via `elementFromPoint`. No visible caption or Creative contribution clipping remained after manual review of the sole numeric flag. The old footer/horizon/name/next-card collisions do not reproduce.
- Eight real Pause/Play control interactions passed on the four motion profiles, with an actual native hit target recorded.
- 180 native forward/reverse chapter scroll states on six profiles: 1536×1024, 1280×650, 900×700, 768×1024, 390×844, and reduced-motion 1536×1024. No horizontal overflow. All chapter heading and description nodes remained accessible; visual exit links alone become inert. One transient DOM sample under concurrent SwiftShader load is discussed below.
- 19/21 native visible-caption clicks opened the correct dialog, focused the close control, closed with Escape, and restored focus to the source project button. The two failures are a real initial-arrival issue at 1920×800, not a dialog implementation failure. Compact flow cards below the first fold were reached with ordinary native vertical scroll.
- No page errors during the complete cycle, native scroll, or modal runs.

## Remaining confirmed arrival issue

At **1920×800**, pausing the initial arrival leaves Creative Studio at opacity 0 and inert despite its caption lying in the viewport (top ~430px). Slide Design's title begins at ~847px, outside the 800px first fold. Daily is the only immediately reachable preview. An isolated new browser page reproduced this at 150ms and 1000ms and after native scroll 1px → 0px. Evidence: `preview-hits.json`, `failed-check.json`, `ultrawide-initial-isolated.png`, and `ultrawide-return0-isolated.png`.

This blocks a claim that all three preview captions are initially visible on every wide viewport. At 1536×1024, 1366×768, and 1280×650, all three arrival captions are fully visible and all three native clicks pass. At 390×844 and 768×1024, Slide is naturally below the first fold; at 900×700, Creative and Slide are below it. Those compact layouts remain accessible with native scrolling.

## Numeric flags reviewed against paint

1. `report.json` has one `caption-reading` flag at ultra-wide second 49: the Range for the `n` in “In development.” extends into the N cap plane. The captured pixels show clear space between the subtitle and the silver N. `ultrawide-cycle-49-glyph-detail.png` is a 6× crop of the actual screenshot: this is empty font descent rather than covered ink. The raw flag is retained; no product change is required for it.
2. One desktop native sample, `engineering:-0.4`, read the preceding Slide style before the native scroll event had settled under concurrent software rendering. Its immediately captured screenshot contains no Slide card and shows both engineering texts unobstructed. An isolated replay recorded Slide opacity 0/inert at 100ms, 350ms, and 950ms at the same position. See `failed-check.json` and `engineering-isolated-100.png`. This is not a confirmed painted collision. The raw transient state remains in the report instead of being deleted or counted as a clean raw run.

## Limits

Chromium `/usr/bin/chromium` with SwiftShader was used. These results do not establish Safari/Firefox parity, physical iOS/Android behavior, or hardware frame rate. Earlier navigation, short-dialog, no-JavaScript, WebGL-fallback, and touch-orientation observations live in the baseline audit and should not be presented as fresh checks against this exact export. This final pass was deliberately bounded to the parent-requested cycle, reading, real controls, first-arrival, and preview/Escape scope.
