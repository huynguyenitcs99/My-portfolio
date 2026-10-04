# Direction C — whole-page storyboard

Huy approved C implementation on 2026-10-03: “Mình thấy C okie bắt đầu implement đi”. The storyboard governs the implemented private review prototype. Approval of the direction is distinct from acceptance of the actual rendered first viewport or automated fidelity gates.

## Visuals

- [Selected desktop C](mockups/c-name.png)
- [Mobile C, corrected Daily continuation](mockups/c-mobile.png)
- [Six-scene storyboard C, corrected evidence placeholders](mockups/c-storyboard.png)
- [Actual personal-site reference screenshots](personal-reference-board.png)

Generated text and logos in the illustrations are layout approximations. The existing exact Nekomata file remains the authoritative brand asset. Actual website text must use the contribution copy below. Do not ship the mockups as screenshot backgrounds, bake the planets into the environment, or treat the generated engineering diagrams as evidence. Planetary movement and scroll morph quality still need an interactive proof.

## One concept, six useful beats

| Scene | What the visitor sees without clicking | Continuous transformation | Canonical English copy |
| --- | --- | --- | --- |
| Arrival | Huy's name and recognizable left portrait; rightward gaze; three descending work previews; subordinate Sun/Terra/Luna. | The paired path leads into the first selected preview. Readable text stays still during ambient motion. | **Huy Nguyen.** **AI engineer. Creative by instinct.** “I build AI agents, generative design workflows, and tools for creative work.” |
| Daily Smith | Connected context, priorities and one follow-up; role/status immediately visible. | The same card expands and settles; email/calendar items converge into the brief, then conversation appears. | **Context becomes clarity.** **PIC · Released.** “I design the AI pipeline, data flow and LLM-agent layer.” |
| Creative Studio | Coherent references, a structured guideline and menu output; secondary formats follow. | The connectors retain their identity while reference descriptions resolve into one guideline and carry into a menu. | **One visual language, carried through.** **Contributor · Released.** “I adapted the poster pipeline for menus and researched reference-image Visual DNA descriptions in JSONL.” “The poster pipeline owner later adopted the method across posters, flyers, business cards and social formats.” |
| Slide Design | A flat illustrated slide and editable text/image/layout elements, with development status. | The image plane separates; one text element can change while the overall design stays coherent. | **From an image to editable elements.** **Main PIC · In development.** “Image-to-editable conversion is one module of Slide Design.” |
| Evidence and explorations | Existing real case media and individual roles for NextSight, ReID, CrystalSound; experiments are explicitly concepts. | The same frame becomes a quiet media viewer; engineering evidence takes priority over decorative motion. | **Built beyond the concept.** “Industrial inspection · Four-camera proof of concept · Audio application integration.” |
| Person and contact | Huy returns at a smaller scale; direct email, LinkedIn and GitHub. | Work recedes along the same path; the exact mark and contact settle into the foreground. | **Engineering meets imagination.** “I turn complex AI workflows into useful creative tools.” **Let's build something useful.** |

Daily does not show sending mail or modifying calendars. Creative is not Huy's PIC project. Slide is not released and does not promise exact reconstruction. No fabricated metrics, testimonials, product screenshots or evaluation improvements.

## Shared art direction

Graphite/midnight ground, silver type and digital framing, one blue selection/data accent, restrained warm Sun light. The portrait, planets, frame edges and diagram paths share light direction and exposure. Terra's ocean/cloud/atmosphere and Luna's crater/terminator must read at their final size. Sun uses restrained emissive surface variation/corona; it cannot become the white sphere behind Huy's head from the rejected draft. Protect face and key text silhouettes.

A single frame/material family continues into every case, the playground, About and contact. Menu artwork can contain paper, but the surrounding website does not turn into a different cream editorial world. Rich output imagery supplies color; multiplying independent glows, particle fields and material families does not supply energy.

## Motion contract for the next interactive proof

- Native vertical scroll determines chapter progress. No compulsory intro, virtual-scroll trap or click required to understand the overview.
- One focal transition leads at a time. A card changes position/perspective, then its contents change meaning; ambient bodies remain subordinate.
- Card click retains object identity and opens details in roughly 650–850ms. Close reverses that relation; keyboard/focus behavior must remain ordinary and clear.
- Idle previews descend slowly through a shallow spatial curve, with a readable pause around the active preview. Continuous rotation must not make titles unreadable or force a visitor to catch a moving hit target.
- A chapter first establishes its role/status and visual mechanism. The next scroll interval develops the mechanism. Then a readable rest carries the contribution sentence before the next transformation.
- Three.js owns the environmental camera, light, celestial materials and spatial anchors. DOM/Motion owns accessible labels, cards and detail controls. Remotion uses the same assets, palette, paths and sequence for frame-driven demonstrations. Independent scene engines must not invent independent worlds.
- Reduce DPR/effects according to viewport and measured capability. Pause hidden/offscreen animation. Reduced motion shows final useful states; WebGL failure preserves the content and composition.

## Mobile contract

Mobile is an independent composition in the same world. Huy, name, role and a selected project share the first screen; a next-preview cue continues the descending stream. Key contribution copy is real DOM text of at least 16px, outside tiny artwork captions. Nonessential inner illustration text can simplify. All work remains visible through native scroll. Controls have usable touch targets and projects do not depend on hover.

## Review findings carried into implementation requirements

The independent [draft review](draft-review.md) identified regenerated logo contours, variable role captions, small mobile metadata, and unverified motion continuity. These are explicit build requirements, not claims of fixes in the existing application. The corrected storyboard additionally labels engineering thumbnails as placeholders. The six-scene board now establishes a coherent set of endpoints; it does not prove the interpolation, runtime performance or live Three.js rendering.

## Implemented review state — 2026-10-03

The first desktop fold reserves the upper 76svh for identity and descending previews, then uses a 24svh Creative contribution cue. The complete native-scroll sequence remains Daily → Creative → Slide → real engineering → Remotion study → person/contact. Mobile keeps the cue in the Creative chapter. The exact portrait source is CSS-cropped; the exact logo file is retained.

The final recorded automatic hero comparison is 61.6%, below its 72% threshold. The hero phase remains open; later CLI phases are pending. This is a reviewable interactive prototype, not a claim of pixel-exact comp reproduction. Functional browser and bounded independent visual/code evidence are recorded separately in docs/design/c-implementation*.
