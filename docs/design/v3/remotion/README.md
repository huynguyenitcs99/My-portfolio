# Motion storyboard v3 — review only

These are design prototypes. They are deliberately separate from the production portfolio in `src/` and do not change the selected Nekomata logo.

Two standalone compositions are authored at 1440×900, 30fps:

- **CardToHero** — 180 frames / 6 seconds. Three independent work cards settle around the generated twin-ribbon artwork. The original Creative card moves, grows and straightens into the final project surface. The exact same specimen remains visible throughout. The outcome and scoped individual contribution then become the focus. Frames 0–38 orient; 38–112 transform; 124–179 hold the readable result.
- **VisualDNA** — 240 frames / 8 seconds. An intact original poster reference becomes a connected description of how its elements work together. Shared grammar carries into a menu and a business card. It illustrates the method without pretending to be a production schema, real evaluation or company-generated output. Frames 0–25 orient; 25–100 describe the relationship; 105–184 carry it across formats; 199–239 hold.

All animation is driven by `useCurrentFrame()` and `interpolate()`. Each card, specimen, connector and text block is independently authored JSX/SVG. No CSS animations, time-based typing, image-to-image crossfade posing as layer transformation, or generic timeline demo. `Specimens.tsx` intentionally shares one original design grammar across three explicitly placed specimen instances.

## Preview

From `/workspace/My-portfolio`:

```sh
npx remotion studio docs/design/v3/remotion/index.ts --public-dir=docs/design/v3 --port=3002 --no-open
```

Open `http://localhost:3002` and choose a composition. Scrub the frame control to inspect continuity. The fixed video timing is for design review; an eventual website version would map selected ranges to native scroll while keeping headings/contributions readable in the DOM, and provide complete static states for reduced motion/mobile.

## Assets and scope

- `assets/motion-twin-ribbons.png` is a copy of the supplied new Image Gen artwork `exec-bc453d43-0b7b-4124-a912-069b4aca088a.png`, used as an illustrative personal brand surface.
- `assets/inter.woff2` is copied from the portfolio's licensed local Inter subset.
- Form & Field poster/menu/business card are original SVG design specimens created for this motion study. They are not Chat Smith output evidence.
- No product source, release claims, selected logo, production dependencies or production deployment was modified.

## Verification

Standalone TypeScript checking passed. Remotion Studio loads both registered compositions at port3002 with no browser page errors. Representative frames were rendered with the installed Chromium and inspected: `card-orbit-start.png` (frame30), `card-transform-middle.png` (frame77), `card-hero-final.png` (frame170), and `visual-dna-final.png` (frame220). These are actual Remotion frames, not a substitute illustration.
