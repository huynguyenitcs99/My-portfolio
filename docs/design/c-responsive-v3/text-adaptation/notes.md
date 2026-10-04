# Focused text and resize adaptation review

Live development URL: http://127.0.0.1:3020. Tested with Chromium using isolated profiles. WebGL was disabled for these geometry and pointer checks; celestial rendering/fidelity is outside this review.

## Final rerun after the source freeze

**Pass for the named adaptation checks:** six initial profiles plus eight resize/orientation states; no failures, horizontal document overflow, or page exceptions.

- Main description uses unitless line-height: measured 16/24 px normally, 24/36 px with real Chromium minimum-font preferences at 24, and 32/48 px with minimum-font preferences at 32. Reading line advances scale with the rendered font.
- Portrait is square in every sampled state. Main copy glyph rectangles do not intersect the padded face exclusion region.
- In compact mode, first artwork starts at least 30.6 px after the entire intro. At font 24/32 on a 1760 × 1364 display, the measured intro bottom increases to 471.0/515.0 px and artwork follows it by 31.6/31.8 px.
- Native pause clicks now work in both wide-display font-enlarged compact profiles. The control remains outside the desktop header's interactive envelope.
- 1199 → 1200 → 1199 → 1200 → 1199 px transitions recover the retained story on both eligible wide entries. At 1200 × 650 the story uses native flow; returning to 1200 × 900 restores retained mode.
- Phone 390 × 844 → landscape 844 × 390 → phone 390 × 844 remeasures intro and artwork correctly.
- The 880 × 682 viewport at DPR 2 passes; it represents the layout geometry of a reduced CSS viewport on a 1760 × 1364 display, but is not a claim that browser zoom controls were exercised.

Final machine-readable evidence and captures: `report.json` and adjacent PNG files. Source hashes are recorded in the final report. `check-text-adaptation.py` is a read-only reproduction script; app source was not edited by this reviewer.

## Preserved diagnosis from the first run

The first repaired implementation correctly scaled the hero reading text, but still had two confirmed adaptation bugs:

1. At minimum font 24/32 on 1760 × 1364, compact control placement moved pause to top 15 px/right 84 px while the width-based header retained its desktop links. The header's ActionIcon intercepted native pointer clicks. The final implementation places this control at bottom right on physically wide displays; both native clicks now pass.
2. At the first 1199 → 1200 × 900 resize, the story remained in native flow despite a fresh page of the same size choosing retained. Three isolated follow-up trials showed it persisted for two seconds. A geometry-driven second measurement at unchanged viewport did not reset the retained candidate and instead measured the taller flow copy, making flow self-reinforcing. The final implementation measures an eligible retained candidate independently of the previous viewport key; two repeated transitions now recover consistently.

Before-fix evidence remains in `report-before-fixes.json` and `resize-settle-before-fixes.json`.

Decorative miniature concept-art labels under minimum-font scaling are not treated as essential reading copy; this check covers semantic hero text, geometry, and controls. It does not certify those labels' visual quality, real Safari/Firefox behavior, celestial fidelity, or the complete ambient loop. Those require separate reviews.
