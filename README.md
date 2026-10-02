# Huy Nguyen — Nekomata portfolio

A personal portfolio for an AI engineer × creative builder. Next.js App Router, React, Motion and a lazy Remotion motion study. English copy, warm earth/plum identity, native scrolling and static mobile/reduced-motion fallbacks.

## Run

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Production: `npm run build` then `npm start`.

## Verify

```sh
npm run lint
npm run typecheck
npm run build
python scripts/check-site.py --screenshots
```

The browser check uses Python Playwright and `/usr/bin/chromium` in the current workspace. Run it against the production server. It checks the scroll overview, mobile overflow/images, reduced motion, keyboard navigation, contact, routes/redirects and JavaScript-disabled content.

## Motion

`npm run studio` opens the authored `NekomataBrandStudy` composition in Remotion Studio without opening a browser automatically. `npm run compositions` lists it. The website loads the Player near the study and pauses when offscreen or the tab is hidden. Reduced motion uses a static graphic unless the visitor explicitly plays it.

DOM motion handles the short desktop card orbit/focus transition. Mobile uses ordinary stacked content. No scroll hijacking or mandatory selection.

## Content and design

- [Storyboard](docs/design/storyboard.md), [visual concept board](docs/design/storyboard-v2.png)
- [Approved spec](docs/superpowers/specs/2026-10-02-nekomata-portfolio.md)
- [Implementation plan](docs/superpowers/plans/2026-10-02-nekomata-portfolio.md)
- Typed content in `src/content/projects.ts`; old MDX sources in `content/archive`.
- Accepted original logo in `public/images/brand/nekomata.png`. Kept unchanged; Next image/metadata rendering optimizes delivery.

New graphics are illustrative. Creative Studio is a team product: Huy contributed the menu pipeline adaptation and visual DNA method. Daily Smith's AI pipeline is his PIC responsibility. Slide Design is in development. Earlier cases retain public media without unverified date/experience claims. Case study details should be updated with approved real outputs as those become available.

Canonical host is the existing `huynguyenitcs99.vercel.app`. This workspace rebuild does not publish or deploy automatically.
