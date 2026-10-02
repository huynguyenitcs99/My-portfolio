# Nekomata portfolio implementation plan

**Goal:** Rebuild Huy's portfolio around current AI and creative work and the accepted personal identity.
**Architecture:** Server-rendered Next App Router pages and typed project content; small client islands for navigation, scroll motion and lazy Remotion Player. Native CSS, local fonts/images, no WebGL dependency.
**Tech stack:** Registry stable versions verified today: Next 16.3.8, React/DOM 19.3.0, Motion 13.5.0, Remotion/Player/CLI 4.0.532, TypeScript 7.0.2, ESLint 10.11.0. Install/build confirms compatibility; adjust only with evidence.
**Spec:** ../specs/2026-10-02-nekomata-portfolio.md

## Global constraints
Preserve accepted logo pixels and real portrait. No false attribution, release states, private data or unsupported capabilities. All core content readable without interaction. Reduced motion and no-JS preserve overview. New imagery is illustrative. Work on codex/nekomata-rebuild from clean bbb64c1; no publish/push/merge. Existing media and three MDX cases are archived.

## Review focus
Check scroll layout at intermediate positions, keyboard menu focus/escape/restore, SSR/reduced-motion visibility, paused offscreen animations, bundle impact of Player, legacy routes and unknown slugs, project attribution and release wording. Check information does not depend on artwork or interaction. Check rendering with scripts disabled and at narrow widths.

## Task 1: Storyboard and behavioral baseline
Files: docs/design/storyboard.md, scripts/check-site.py, docs/design/implementation-log.md.
Interfaces: eight scene IDs/anchors, case slugs and menu labels consumed by tasks 2–3.
Write mobile, keyboard, reduced-motion and case-route checks first. Run against old development app and observe new-role/route failures. Document approved story, motion, fallback and evidence. Generate updated storyboard concept with Image Gen; retain original logo file.
Expected: old app fails new positioning/case expectations; storyboard records all eight scenes.

## Task 2: Foundation, content and website
Files: package/config, src/app/*, src/components/*, src/content/projects.ts, public/images/brand.
Interfaces: all six projects use a shared typed slug/title/status/role/content model; scene anchors match storyboard. Menu links point to static sections, metadata canonical uses existing deployment URL.
Replace Once UI view layer with custom design. Implement home, cases, about, index, old URL redirects, sitemap/robots/OG/favicon. Use actual archived media for earlier engineering. SSR text and image-only visual fallbacks remain useful without JS. Install verified dependencies and run type/lint/build; resolve errors by cause.
Expected: build and checks succeed; app routes resolve; no stale template content or timeline claims.

## Task 3: Motion and Remotion
Files: src/components/orbit.tsx, navigation.tsx, motion-study*.tsx, src/remotion/*.
Interfaces: active Player uses authored frame-based composition; fallback rendered before lazy load, focus/pause controls; desktop orbit uses document scroll, mobile/reduced motion static.
Author twin paths/card focus and gentle reveals. Remotion's editable React composition drives one illustrative brand/method motion study; it is not product evidence. Load Player only when its section nears view, pause when out of view or tab hidden. No autoplay for reduced motion.
Expected: desktop transformation observable, mobile readable, inactive Player paused; registered composition lists successfully.

## Task 4: Verification and final review
Files: scripts/check-site.py, docs/design/verification.md, screenshots under docs/design/previews.
Run production server and behavioral suite at desktop and 360/390/430 mobile widths, JS disabled and reduced motion; verify keyboard navigation, routes/404, image loads and horizontal overflow. Inspect screenshots and fix real usability issues. Measure lab LCP/CLS and requests; record limits. Run fresh lint/type/build once final changes settled. One whole-branch fresh reviewer per executing-plans, then resolve material findings and rerun affected/full suite.
Expected: all checks pass; screenshots and concrete verification report saved; no unsupported claim of field performance or deployment.
