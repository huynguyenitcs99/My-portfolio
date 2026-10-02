# Verification — storyboard fidelity revision, 2026-10-02

Branch `codex/nekomata-rebuild`, revision base `e5d7c52`. Local production server; no deployment, push or merge. The accepted storyboard PNG is unchanged.

## Build and compatibility

- `npm run typecheck`: passed (strict).
- `npm run lint`: passed, no warnings.
- `npm run build`: passed, home/about/work and six case routes generated.
- Next 16.3.8, React/DOM 19.3.0, Motion 13.5.0, Remotion/Player/CLI 4.0.532, Node 24.19.0. TypeScript 6.0.3 and ESLint 9.39.5 retain working lint dependency APIs; earlier trials of TypeScript 7 / ESLint 10 were incompatible.
- Original selected logo SHA-256 unchanged: `006276705fe9ebf4791151f2befba28391c2ead262c601273fc9e0b354eb0b47`.

## Behavior and visual evidence

`python3 scripts/check-site.py --screenshots`: **13 passed, 0 failed**. Immediate positioning, scroll-only overview, three arrival projects and collage focus, keyboard menu/focus loop/Escape, real contact links, actual Remotion frame advance/pause/offscreen stop, six cases/legacy redirects/404, responsive image loading/no overflow at 360/390/430/768/1440px, reduced motion and no-JS reading/navigation.

Additional normal-motion checks at 320/600/601/800/801/1024px found no overflow or browser JavaScript errors. No-JS navigation also fits 320px. English glyph subsets retain the used punctuation; arrows/Roman controls use the existing symbol fallback.

Seven generated assets restore the eight compositions, with DOM copy kept separate from artwork. See [fidelity revision](storyboard-fidelity.md), [fixed master](storyboard-v2.png) and [independent review](final-review.md). Captures reset scroll/focus to prevent sticky-header artifacts.

## Isolated Lighthouse mobile lab

Latest production run: **2026-10-02T09:45:34.466Z**. Chrome 151, Lighthouse simulated mobile/network/CPU throttling. No other browser/build/check commands ran during this audit.

| Category | Score |
| --- | --- |
| Performance | 90 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |

LCP **3.5 s**, CLS **0**, total blocking time **100 ms**, speed index **0.9 s**. Console-error and accessible-label checks pass. [Full report](previews/lighthouse-mobile.report.html).

Earlier revision audits exposed image/font delivery and startup work. Fixes include responsive card/reference sizes, pre-encoded high-priority portrait variants, 60 KB mobile background, raster paper texture, English font subsets and lazy Motion features. The previous rebuild's 98 score does not describe this richer visual revision.

These are lab results. LCP still has room to improve on simulated slow mobile. No field INP, physical iPhone/Android, Firefox/Safari or assistive-technology session was measured; Chromium emulation is the tested scope.

## Review artifacts

- [Actual browser walkthrough](previews/website-walkthrough.webm): all eight scenes at 1440×960.
- [Desktop arrival](previews/fidelity-arrival-1440.png), [mobile arrival](previews/fidelity-arrival-390.png).
- [Full desktop](previews/fidelity-home-1440.png), [full mobile](previews/fidelity-home-390.png).
- Scene-by-scene captures: `previews/fidelity-{scene}-{1440,390}.png`.

Core reading/contact work without JavaScript; menu/player controls are hidden in that mode. All artwork is illustrative, not real product-output evidence. Creative contribution, Daily pipeline PIC and unreleased Slide status remain explicit. Real legacy screenshots stay inside cases; experience/year claims remain omitted until reconciled.
