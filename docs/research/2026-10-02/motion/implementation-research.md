# Scroll motion / Remotion research

Inspected2026-10-02 using actual rendered React Bits demos, current official documentation and the local codebase. This is a design recommendation, not evidence that a library improves conversion or trust on its own.

## React Bits: use by narrative function

| Demo | Observed interaction / documented behavior | Use here |
| --- | --- | --- |
| [Bubble Menu](https://www.reactbits.dev/components/bubble-menu) | Toggle opens five large rotated pill links; the menu button becomes a close icon. The live demo was opened and captured. | Optional secondary navigation accent, adapted to the brand. Keep visible work/contact shortcuts and proper dialog/focus behavior. |
| [Orbit Images](https://www.reactbits.dev/animations/orbit-images) | Images circulate on an elliptical path; adjustable radii, rotation, duration, easing and pause; Motion dependency. | A small set of meaningful capability surfaces, then a deterministic scroll transition. Do not let labels orbit perpetually or require chasing a card. |
| [Scroll Expand](https://www.reactbits.dev/animations/scroll-expand) | A bounded image frame opens toward the available stage as scrolling progresses; title and media remain together. Start size/radius, zoom, hold and smoothing are exposed. | Preserve the selected surface’s identity as it becomes the next scene. Define a real reading hold rather than endless zoom. |
| [Scroll Stack](https://www.reactbits.dev/components/scroll-stack) | Successive cards scale into a stack; demo is inside a scrollable preview. Props include `useWindowScroll`, default false; dependency is Lenis. | Optional short set of secondary studies. Do not import its nested scrolling or stack the entire reading path. Existing native scroll + Motion can provide the relevant visual effect without adding Lenis. |

Captured start/scrolled/open states are in this folder. These checks are desktop visual/interaction research, not a complete accessibility audit of React Bits code. Mobile behavior is to be implemented and verified for Huy’s own composition.

## Remotion: the right unit is an explanation

Read `remotion-best-practices`, `remotion-create`, `remotion-markup`, `remotion-saas` and current [Player documentation](https://www.remotion.dev/docs/player/player). Skill bundle version4.0.530 and installed Remotion/Player4.0.532 are recorded, not silently upgraded. The Player docs explicitly expose `PlayerRef.seekTo(frame)`, playback methods and initial-frame/control options.

Use frame-driven independently authored layers for transformations worth inspecting: card-to-hero, reference-system propagation, image-to-editable. Keep meaningful copy as semantic DOM around a Player. A single scroll progress value may drive `seekTo` through requestAnimationFrame; autoplay should not fight it. Reduced motion shows the completed diagram and readable prose. Mount/lazy-load by proximity, pause offscreen/hidden tabs, and show a meaningful poster while loading.

The previous playhead over a generated timeline was technically Remotion but did not explain Huy’s capability. The v3 review compositions replace that with180-frame and240-frame authored transformations. They are examples for choreography review; fixed six/eight-second timing does not prescribe how quickly a visitor must read the actual website.

## Native scroll, compositing and fallback

[web.dev’s animation guidance](https://web.dev/articles/animations-guide) supports preferring transform/opacity and inspecting rendering cost. Avoid animating filters, blur and complex full-page surfaces simply for atmosphere. For a major card takeover, keep stable geometry where possible and animate a container; crossfade semantic layout states deliberately, with complete reduced-motion and no-JS states.

[MDN animation-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline) and [GSAP ScrollTrigger documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) were inspected as alternatives. Their availability does not justify adding another motion engine. The existing Next/React/Motion stack can drive the planned page. CSS scroll-timeline support should be checked against the chosen browser matrix before relying on it as the only implementation.

Evidence and video state from Apple’s mobile/desktop framing and viewport pause behavior are in [reference research](../scroll-reference-research.md). The principle to adopt is a tailored mobile composition and controlled playback, not copying Apple’s asset weight or assuming every hero video is scroll-scrubbed.

## Access limits

Google returned a human-verification page rather than usable results. DuckDuckGo also challenged requests. A Bing response returned irrelevant results and was discarded. Therefore the report relies on directly inspected official/reference pages, not a claimed exhaustive search-engine survey. YouTube is blocked403; the subsequent supplied clip exceeds the local32MiB attachment-transfer limit. See [Ex-Aid evidence](ex-aid.md) for the official written description and pending footage check.

The browser’s initial proxy-certificate problem was solved without disabling verification: Playwright request routing used `route.fetch()` with the inherited proxy and Node’s configured CA trust. The browser rendered the returned verified responses. No anti-bot verification was bypassed. Chat Smith’s visible verification overlay was preserved in research captures.
