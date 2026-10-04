# Responsive root-cause audit of deployed c06792d

This is a read-only audit of `http://127.0.0.1:3040` (the exported production build), not a claim that a changed implementation passes. The browser screenshot pixels do not reveal the original CSS viewport or zoom. The user's screenshot is authoritative visual failure evidence; an exact browser-zoom attribution remains unproven.

## Confirmed causes

1. **Mixed sizing systems do not share a design basis.** Name size/projection scales with viewport width, portrait width scales with width but its height scales with viewport height, project orbit coordinates scale with viewport height, while role/body/caption/header text keep independent 16–27 px limits. Therefore narrow, tall, short, and zoomed layouts can keep the same horizontal composition even when text and portrait no longer fit.
2. **Portrait magnification and clipping are produced by `object-fit: cover` in a non-square container.** The source asset is square (1254 × 1254), but at 801 × 1000 the displayed box is only 400.5 × 700, so `cover` magnifies the source to 700 × 700 and clips almost 300 px horizontally. Its visible face meets the role/body, then terminates at the portrait container's hard vertical right edge. At 1536 × 1024 the box is 768 × 716.8 and the same settings happen to work.
3. **Story fallback does not recompose the hero.** `data-story-layout=flow` changes chapter flow and clears card inline animation styles. It leaves the desktop hero portrait/copy/card/proof composition intact. At 880 × 682 and 900 × 650, static orbit card defaults now collide with hero copy, and the proof overlay can intercept the pause button.
4. **Mobile placement is fixed before text measurement.** At 768/800 px wide, the 34 vw name occupies far more vertical space than it does at 390 px. Nevertheless portrait and Daily card still start at 380 px. The role/body/CTA are still being read at that position; portrait hair appears behind the reading copy. Fixed card top coordinates 380/550/795 also allow preceding cards' artwork to be covered by the next card.
5. **Width-only name growth and height-only card bands collide in wide, short windows.** At 1920 × 800, the name grows proportionally to width while cards occupy the same percentages of the smaller height. Creative card covers a large region of NGUYEN. At ultrawide widths the same problem becomes larger; a capped, coherent design basis is necessary.
6. **Real text-only accessibility scaling is unsupported by fixed line heights and image-plate labels.** Chromium Preferences `webkit.webprefs.minimum_font_size=32` and `minimum_logical_font_size=32` increase a declared 16 px body font to a computed 32 px, while a declared 24 px line height remains 24 px. Measured glyph boxes are 44 px high with only 24 px vertical advance. Text therefore overlaps. Labels inside concept illustrations also grow past their decorative art planes. This stress test does not uniquely explain the user's screenshot, but it is a meaningful reproducible accessibility failure.
7. **The existing regression check does not inspect hero text or the entire ambient loop.** `check-c-scroll-boundaries.py` samples `.chapter-copy` and cards with ambient motion paused at the initial position. It cannot catch portrait/hero collisions, the 800/801 breakpoint discontinuity, proof/control intersections, or cards passing into the name/role zone later in the 80 second reel.

## Evidence and limits

`baseline/report.json` records CSS viewport, DPR, visual viewport, measured boxes, active retained/flow layout, text wrapping, card/copy envelopes, pause pointer errors, and overflow for 15 profiles. Captures sit beside it. Envelope overlaps are potential collisions; the hero-positioning parent includes body and CTA and should not be confused with individual glyph bounds. Visual captures confirm the actual face and text defects at the narrow/tall and tablet sizes.

Important reproduced profiles:

| CSS viewport | Result |
|---|---|
| 1536 × 1024 | Original production baseline; first view happens to fit face/body. Title and card containers partially overlap, requiring glyph-aware review. |
| 801 × 1000 | Flow fallback; face magnified/clipped, title/role/body cover face. |
| 900 × 900 | Retained layout; body and role cover face. |
| 900 × 650 | Flow fallback; cards overlap reading copy; proof blocks pause. |
| 880 × 682 at DPR 2 | Equivalent geometry to a 200% zoomed 1760 × 1364 display; copy/card collisions and blocked pause. Actual browser zoom is not proven. |
| 1100 × 853 at DPR 1.6 | Equivalent reduced CSS viewport stress; narrow-copy/card overlap. |
| 800/768 × 1024 | Mobile mode; oversized name moves copy into fixed portrait/cards at 380 px. |
| 844 × 390 | Landscape flow; multiple cards intersect title and role/body zones. |
| 1920 × 800 | Wide/short retained layout; large name/card intersection. |

No horizontal document overflow was recorded for the completed profiles. That does **not** mean these layouts are acceptable: visible collisions, clipped portrait, missing safe zones, and inaccessible pause are the failures.

## General solution implications

- Keep the portrait square and scale it from the same capped width-based composition basis as the name; its face geometry must not be magnified by viewport height.
- Define a face exclusion region on the square source. A practical approximate conservative natural asset region is x=.335–.747 and y=.215–.656 (ear, glasses/eyes, cheek, chin); pad it by about .03. Map it through the actual square asset placement, then check individual text glyph rectangles, rather than equating the entire transparent photo container with a face.
- Have two coherent hero compositions: wide C and compact C hierarchy. Select compact when width, available height, or measured text fails safe reading bounds, including font-ready/text-scaling changes. Story retained/flow remains an independent choice.
- In compact composition, measure the full intro to place portrait and cards after the actual reading envelope. Measure caption and artwork heights before stacking previews. Preserve tilted cards, silver typography, and curved continuation; compact does not require an unrelated flat design.
- In wide composition, derive travel bounds from the text/header/proof exclusion areas and actual rotated card bounds. Check the entire ambient cycle, including wrap. The widest card must not pass across name, role, face, controls, or proof caption at a later phase.
- Use unitless line heights for reading text. At substantial text scaling, allow a content-first fallback; miniature concept-art labels can be decorative/aria-hidden with equivalent readable semantic descriptions beside the art rather than acting as essential tiny text.
- Put the pause control in a collision-safe accessible layer. Avoid a proof overlay intercepting it; a native pointer test should remain part of each mode validation.
- Test breakpoint neighbors (799/800/801 and compact/wide boundary neighbors), measured fit changes, resize/orientation, browser zoom equivalent CSS viewports, text-only minimum font stress, native reverse scroll, keyboard, reduced motion, and no-JS fallback. Existing desktop-only success is insufficient.

No app source was modified by this audit.
