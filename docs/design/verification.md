# Verification — 2026-10-02

Final source on branch `codex/nekomata-rebuild`, base `bbb64c1`. Local production server; no deployment, push or merge.

## Build and compatibility

- `npm run build`: passed, all home/about/work and six case routes generated.
- `npm run typecheck`: passed (strict).
- `npm run lint`: passed, no warnings.
- Registry versions verified and installed: Next 16.3.8, React/DOM 19.3.0, Motion 13.5.0, Remotion/Player/CLI 4.0.532. Node 24.19.0.
- TypeScript 7 and ESLint 10 were tested but incompatible with the current Next lint dependency APIs. Stable TypeScript 6.0.3 and ESLint 9.39.5 keep the checks functioning; the chosen combination builds and runs.
- `remotion compositions`: NekomataBrandStudy, 1000×620, 30 fps, 300 frames (10 seconds). Real authored frames played in the website test.
- Original selected logo and copied website asset have identical SHA-256: `006276705fe9ebf4791151f2befba28391c2ead262c601273fc9e0b354eb0b47`.

## Browser behavior

`python scripts/check-site.py --screenshots`: **13 passed, 0 failed** against the final production build. Covers immediate positioning, complete overview by scroll, menu keyboard/focus/Escape, verified contacts, actual card enlargement with covered links removed from focus, actual Remotion frame advance/pause/offscreen stop, six case routes/legacy redirects/404, images and no overflow at 360/390/430/768/1440px, reduced motion and no-JS core content. Footer email touch target is at least 44px; its regression assertion was observed failing before the fix and passing afterwards.

Independent review additionally checked normal-motion 320/600/601/800/801/1024px layouts, six orbit positions, desktop no-JS, menu behavior and lazy Player network loading. No material findings. See [review](final-review.md).

## Lighthouse lab run

Final isolated mobile run: `2026-10-02T07:52:08.358Z`. Chrome 151.0.0.0, Lighthouse simulated mobile/CPU/network throttling, local production server. Screenshots/browser suites were not running concurrently. First run during rebuild had a stale CSS failure and was discarded; a concurrent run was also excluded from representative performance results.

| Category | Score |
| --- | --- |
| Performance | 98 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |

LCP **2.2 s**, CLS **0**, total blocking time **70 ms**, speed index **0.9 s**. Console-error and touch-target checks passed. [Full lab report](previews/lighthouse-mobile.report.html).

These are lab results, not field Core Web Vitals. INP was not measured on real users. Chromium desktop/mobile emulation was tested; no physical iPhone/Android, Firefox/Safari or assistive-technology session was performed.

## Review artifacts and known scope

[Browser walkthrough](previews/website-walkthrough.webm): actual 1440×960 browser recording, 25.6 seconds, not a rendered product demo. [Updated concept storyboard](storyboard-v2.png), [storyboard specification](storyboard.md), screenshots under previews.

Core reading and contact work without JavaScript. Deferred minor: menu/Play controls remain visible without scripts, though those controls need JavaScript. New diagrams/concept art are illustrative; no real output comparisons or invented metrics/schema are shown. Slide Design stays in development. Dates/experience counts omitted until reconciled; old MDX and media retained for provenance.
