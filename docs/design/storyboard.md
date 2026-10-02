# Scroll storyboard v2 — Huy Nguyen

The visitor meets a person, sees what he builds, understands the decisions behind that work, and leaves with a clear way to contact him. The overview requires no clicks. The chosen Nekomata logo, real portrait and warm earth/plum palette replace the old cobalt/orange direction.

| Scene | What the visitor sees | Motion and purpose | Mobile / reduced motion |
| --- | --- | --- | --- |
| 01 Identity | Oversized **stacked serif HUY / NGUYEN**, AI engineer. Creative builder., Vulcan Labs, photographic portrait cutout, three current-work cards on the right | Fine orbital curves and scroll-linked card movement. Identity is readable immediately. | Portrait to the right of the stacked name; three cards underneath, readable labels. |
| 02 Work reveal `#work` | Huge serif Creative Studio on the left, **botanical paper / photographed food collage on the right**, menu-pipeline / visual-DNA contribution and release context | The collage rotates and settles into focus with native scroll. | Same art and content in normal flow; no pinning or mandatory selection. |
| 03 Method `#creative-method` | Reference images → DNA descriptions (JSONL) → generation guidelines; explicit contributor credit and method adoption | Connected nodes and an editorial concept menu explain the mechanism, without fabricated output comparisons. | Flow stacks vertically; explanation always present. |
| 04 Daily Smith `#daily-smith` | A warm dark scene: email/calendar → MCP/provider tools → context → daily priorities / follow-up | Lines connect sources to a short illustrative brief. No typing delay; no claims about sending or editing. | Compact vertical flow and readable brief. |
| 05 Slide Design `#slide-design` | Main PIC, peach In development badge; architectural editorial slide with blue/orange layer bounds, four layer tags | Concept artwork settles on scroll. Status remains visible. | Concept art and labelled layers stack; reduced perspective. |
| 06 Engineering `#engineering` | Three earlier cases: inspection lens, anonymous CCTV tracking and waveform **illustrative covers**; actual media remain inside cases | Compact three-card grid. | Three visible summaries, not a swipe carousel. |
| 07 Playground `#playground` | **Six art tiles**, original Nekomata paper sticker, creative-tool interests | Authored Remotion playhead in the timeline tile plays only nearby and in a visible tab; optional play/pause. | Two-column art grid; static artwork for reduced motion. |
| 08 Person/contact `#about`, `#contact` | Portrait cutout left, short bio and dark rectangular Say hello right, email / LinkedIn, eight-scene index. GitHub in compact footer. | Motion calms down; direct contact resolves the story. | Portrait, bio and large contact button stack; all links directly available. |

## Art direction
Paper `#F2EEE7`, espresso `#2E2723`, earth `#816957`, sand `#B7A07A`, dusty plum `#705461`, night `#211D1B`. Oversized editorial type, quiet fine rules, organic twin curves and layered graphic studies. Sparse accent color. The cat is a personal signature; Huy's name and face stay central.

The exact chosen raster logo is used without altering the face, eye, head direction, chest curve or tails. **The accepted `storyboard-v2.png` is the visual source of truth.** Browser implementation must follow its compositions, typography, imagery, palette and scene order. A passing build does not replace visual comparison. Seven Image Gen assets recreate the accepted imagery as independent production assets; the website itself remains accessible DOM content. Concept artwork is explicitly distinguished from company screenshots and output evidence.

## Motion contract
Native document scroll, gentle card/collage focus and section reveals. No forced intro, scroll capture, mandatory click, sound, infinite spinning work cards or hidden primary text. Fast scrolling goes directly to the corresponding state. Reduced motion removes transformation and autoplay, rather than merely accelerating animations. Offscreen/hidden-tab playback pauses. Navigation supports keyboard, Escape, focus containment and restoration. Without JavaScript, header shortcuts stay visible and inert controls are hidden.

## Content contract
Creative Studio: contributor; menu port + visual DNA research, method later adopted by the original poster pipeline owner across formats. Daily Smith: PIC of AI/LLM-agent pipeline. Slide Design: main PIC, unreleased. Engineering cases retain concrete integration/system contributions without contradictory project dates, experience-year claims, target scale presented as deployment, or numerical claims lacking context.

## Reading paths
The homepage gives the complete overview. Optional case links give role, context, approach and known limits. The menu offers work, playground, about and contact; it never carries information unavailable in the page. Email is the final primary CTA; LinkedIn/GitHub support trust. No unverified Upwork destination.
