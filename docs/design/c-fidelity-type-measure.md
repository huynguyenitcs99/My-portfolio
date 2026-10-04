# Direction C: typography and ink measurements

Reference: `docs/research/2026-10-03-concept-reset/mockups/c-name.png`, native 1536 × 1024. Comparison: `.impeccable/review/hero-repro.png`, same size. Research is read-only with respect to application source. Candidate fonts were downloaded to `/tmp` from the official Google Fonts repository; no dependencies were installed.

## Name geometry

The approved name has two separately projected rows. HUY decreases in cap height toward the right; NGUYEN increases toward the right. A uniform horizontal compression cannot reproduce this geometry.

| Row | Overall visible bounds | Approximate cap-plane corners, clockwise from upper left |
| --- | --- | --- |
| HUY | x479–878, y85–257 | (479,85), (878,105), (878,227), (479,257) |
| NGUYEN | x549–1075, y226–345 | (549,256), (1075,226), (1075,343), (549,345) |

Individual visible cap heights are approximately H173, U151, Y131; lower-row N89, G97, U103, Y107, E112, N117. These are visual estimates from the generated reference, not authoritative font outlines. Portrait, planet, and card overlaps lower confidence at obscured edges.

For a source rectangle 399 × 172, placed at (479,85), the upper homography is:

```css
transform-origin: 0 0;
transform: matrix3d(
  1.409836066, .070668474, 0, .001027158,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
);
```

For a source rectangle 526 × 119, placed at (549,226), the lower homography is:

```css
transform-origin: 0 0;
transform: matrix3d(
  .760683761, -.057034221, 0, -.000454974,
  0, .747899160, 0, 0,
  0, 0, 1, 0,
  0, 30, 0, 1
);
```

For a responsive basis scale `s = width / 1536`, multiply all source sizes, offsets, and the lower 30px drop by s, and divide the perspective entries `.001027158` / `-.000454974` by s. Alternatively place the complete composition in a fixed design basis and scale it once.

## Font selection and measured ink

Keep actual HUY and NGUYEN as selectable DOM text. Existing Sora800 is the closest tested upper-row base. The lower row's G needs a substantially heavier, squared, spur-free bowl. Barlow Black900 is the closest tested lower-row base. Sora800's round G stem is about24% of normalized ink width; the reference is about33%; Barlow Black is about35%. None of the candidates is established as the exact font of the generated reference.

Other installed fonts inspected: Manrope, Space Grotesk, Bricolage Grotesque, Inter. Directed official candidates inspected: Anton, Archivo Black, Roboto Black, Barlow Black/Semi Condensed Black, Archivo900, Roboto Condensed900, Teko700, Oswald700, Chivo900, Kanit Black, Russo One, Bakbak One. Teko/Russo square counters were too rectilinear; several other G forms introduce a visible spur or remain too circular. No font search is needed to implement the preferred pair.

Official, downloaded sources:

- https://raw.githubusercontent.com/google/fonts/main/ofl/barlow/Barlow-Black.ttf — 111116 bytes.
- https://raw.githubusercontent.com/google/fonts/main/ofl/barlow/Barlow-ExtraBold.ttf — 110228 bytes, available if using one family for both rows.

The following values were measured in Chromium through Canvas `measureText` and an inline baseline marker. They use letter-spacing0, line-height1, and the exact font files. Canvas left values below are signed: an actualBoundingBoxLeft of −17 means glyph ink begins17px to the right of the text origin.

| Font and text | Advance | Ink width | Ink ascent/descent | DOM baseline from line top | Ink top from line top |
| --- | ---: | ---: | ---: | ---: | ---: |
| Sora800 HUY234px | 521.117920 | 504.145935 | 171 / 5 | 196 | 25 |
| Sora800 HUY240px | 534.480042 | 516.559998 | 175 / 5 | 201 | 26 |
| Barlow900 NGUYEN164px | 617.460144 | 605.548096 | 117 / 1 | 147 | 30 |
| Barlow900 NGUYEN170px | 640.050293 | 628.190186 | 121 / 1 | 153 | 32 |

At234px align upper text with `translate(-17px,-25px)`, then normalize its ink width with scaleX `.791437503` (399 /504.145935). The whole ink height normalization is scaleY `.977272727` (172 /176). To put the H cap edge exactly at the172px corner instead, use scaleY `1.005847953` (172 /171) and allow the U's5px overshoot to remain visible: perspective raises that overshoot into the overall row bounds. This should be judged against the final screenshot rather than clipping the U's bowl.

At164px align lower text with `translate(-6px,-30px)`, then normalize to526 ×119 with scaleX `.868634554`, scaleY `1.008474576`. CSS order `scale(...) translate(...)` applies the translation first, then scales the aligned ink. Inner transform-origin must be0 0. Font ascent space must not become part of the outer homography.

## Material

The approved title is flat silver, not extruded chrome. Broad upper patches average roughly RGB249/248/248; lower H patches fall to171/171/176 and lower first N to129/128/132. H's left stem has warm gray patches (about217/205/199 near y140) from the sun side; right glyphs remain neutral/cool. The finish has fine uneven roughness, a broad gray falloff, and small edge highlights. Plain #f0f4fa loses this information. Use a silver material texture clipped by live glyphs or layered CSS gradients; retain DOM words and screen-reader text.

## Readable text and continuation

Measured ink positions below are native reference pixels. Antialiasing thresholds vary by text contrast; these are useful layout anchors, not unqualified exact source-font claims.

| Element | Visible ink bounds / placement | Practical starting style |
| --- | --- | --- |
| Role | (546,363)–(911,386) | Manrope600,24px; natural advance368.7px is close to365px reference |
| Body line1 | (609,402)–(821,418) | Manrope400, about16–16.3px |
| Body line2 | approximately (610,425)–(806,438) | same,23–24px baseline separation |
| CTA text | (610,461)–(753,479), arrow extends to783 | Manrope700,18px; its144.8px advance matches143px ink |
| Continuation number | x64,y792 | about18px |
| Continuation title1 | (64,818)–(438,855) | about40px bold, tight tracking |
| Continuation title2 | (64,858)–(349,894) | same,40px baseline separation |
| Continuation body1 | (65,903)–(414,918) | about17–18px |
| Continuation body2 | (65,926)–(236,941) |23px baseline separation |
| Metadata row1 | x65,y967 | about13px |
| Metadata row2 | x65,y986 |19px baseline separation |

Reference role copy is `AI engineer. Creative by instinct.`. Body is `AI agents, generative design` / `and tools for creative work.`. CTA arrow points right. Lower copy is `A reference image layout becomes a compact` / `guideline, then a menu.`. The lower strip shows separate label/value rows: Contributor → Design + direction; Released → Concept. Root owns final truthful copy choices.

The lower scene occupies y783–1024, roughly241px /23.5% of the frame. Its upper edge is a curving satin path, not a prominent straight divider. First image frame starts around(500,809),273 ×157; middle frame(824,809),267 ×157; last frame(1142,809),348 ×157. Captions sit around y978–988, about12px. Keep the first continuation number, compact metadata, and unequal image widths; an equal three-tile strip with large16px single-line metadata materially changes the reference composition.
