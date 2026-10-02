# Huy Nguyen — portfolio direction v3

Status: **reviewable design proposal**, 2026-10-02. The current production source is unchanged. The accepted logo is unchanged. Huy’s latest feedback reopens the previous storyboard, palette execution, imagery, content hierarchy and motion; v2 is history, not the acceptance target for this revision.

## 1. Outcome and constraints

The portfolio makes Huy memorable as **AI engineer × creative builder** and earns inbound trust through concrete work, decisions and evidence. It should invite a broad range of useful AI and creative problems, not market only enterprise systems or present an agency service menu. English public copy; Vietnamese collaboration.

Within the first one or two viewports, a visitor should know who Huy is, what he currently builds, where he works and the three areas of contribution. Within a casual 30–60 second scroll, the visitor should understand at least one original decision, see evidence of engineering delivery, and know how to contact him. These are acceptance goals, not measured user-study results.

Native vertical scrolling exposes the overview. Selection, hover, dragging and playing video are optional. The aesthetic should be energetic and technically precise while keeping saturation restrained. The user’s Nekomata identity carries personal meaning; date/time of birth and astrology do not become public claims or scientific design rationales.

## 2. Diagnosis that drives the revision

The previous implementation improved screenshot resemblance while leaving the desired story unbuilt: one card never became the next scene, a whole PNG rotated instead of objects transforming, and Remotion only moved a playhead. Eight decorative compositions read as an illustrated article. Botanical food/paper styling dominated the personal brand, obscuring engineering breadth. Some mobile contribution copy was 10–12px. Most actual proof required opening a case.

New design decisions must fix these specific problems. Passing build or Lighthouse cannot substitute for a review of motion, authorship clarity and visual quality.

## 3. Three directions and recommendation

| Direction | Experience | Benefit | Trade-off |
| --- | --- | --- | --- |
| **A — Light canvas, cinematic work** | Ivory reading surfaces, graphite feature stages, warm copper/plum highlights, contemporary sans + occasional expressive serif, connected card transformations | Balances recognizability, craft, readability and credible work; supports a clear mobile counterpart | Requires precise choreography and careful separation of specimen art from proof |
| B — Night studio | Dark graphite/plum throughout, luminous material studies and more immersive stage changes | Strong initial technology/creative atmosphere | Higher risk of generic AI/cyber styling; long dark pages and canvas-heavy effects can tire readers or underperform |
| C — Editorial engineering archive | Light structured case-first layout with restrained motion and excellent real media | Fastest route to comprehension and evidence | Less closely matches Huy’s desire for a memorable transformation-driven experience |

**Recommend A.** The interactive review page demonstrates A using actual HTML, independent layers and the new generated artwork. It is a proposed direction, not a claim of user approval.

## 4. Visual system

- Paper/ivory `#F3F0E9`: reading surface, clean rather than a noisy paper collage.
- Graphite `#19191B`: concentrated depth and dramatic contrast in the hero artifact and Daily scene.
- Dusty plum `#7F627B`: identity accent, selected states and expressive type.
- Warm copper `#BD845F`: connections, light and secondary emphasis. Never use it as the only signal of meaning.
- Body/role text has readable contrast and a 15–18px target on mobile/desktop. Supporting metadata 12–14px; decorative specimen text can be smaller because it is not required to understand Huy’s work.
- Inter is the reading and primary heading face. Playfair is an occasional accent rather than the personality of every entire heading. A future font change needs its own review and license/performance check.
- The complete name stays unobscured. Real portrait remains the recognition anchor; generation creates surroundings and studies, not a replacement identity.
- Keep the exact selected left/upward-facing Nekomata mark, facial geometry, eye, front chest curve and two matching tails. The new twin-ribbon artwork is a supporting material study, not a replacement logo.
- Two paths/strands recur in stage transitions and agent connections. Use them sparingly so they remain recognizable.

## 5. Narrative and storyboard

| Beat | Visitor takeaway | Visual / copy | Motion | Mobile |
| --- | --- | --- | --- | --- |
| 1. Meet Huy | A real AI engineer with creative range | Huy Nguyen; AI Engineer × Creative Builder; Vulcan Labs; true portrait; clear one-sentence scope; three capability summaries | Short individual card arrangement around twin-ribbon art; identity readable immediately | Headline + portrait credential + compact artwork, followed by three visible capability rows; no carousel |
| 2. Enter a piece of work | Generative design is an engineering problem Huy has worked on | Creative Studio, menu adaptation, visual-DNA research, Contributor | **The same Creative card** moves forward, straightens and expands into its project surface; other cards recede | Short transition or normal card flow; no multi-screen pin |
| 3. Understand the decision | Huy researched coherent reference-based guidance; the method spread across formats | Reference → connected visual description → guided design; adoption statement and accurate team credit | Whole visual relationships persist as independently authored type/shape/layout layers; scan only supports the explanation | Readable steps; concise prose; completed example visible without waiting |
| 4. See the agent | Connected information becomes something useful | Daily Smith; ownership of AI pipeline/data flow/LLM-agent layer; fictional email/calendar → context → priority/follow-up | Source paths connect; context resolves; meaningful brief forms. One short explanatory transition | Vertical chain with complete result, readable source cards; no tiny dashboard screenshot |
| 5. See creative tooling | A design can remain useful after generation | Slide Design; main responsibility; image → editable module; In development | An original concept composition begins unified, its actual independent text/image layers separate and settle | Brief progression or static completed state; development status remains visible |
| 6. Trust the engineering | Huy has integrated AI with working software and real constraints | Actual legacy project media, own role and scoped outcome for NextSight, ReID, CrystalSound | Motion calms; clean case rows/grid encourage reading | Compact preview rows, all three visible in normal scroll |
| 7. Remember the maker | Creativity is an active practice, not a cloud of skills | Named personal studies, purpose and provenance; first is Twin Instincts + actual Remotion transformation studies | Short authored loops or optional controlled previews, paused offscreen | Static posters/brief loops, no mandatory play to learn what the study is |
| 8. Start a conversation | Approachable, capable person with a clear contact path | Real portrait, concise personal interest, email/LinkedIn/GitHub | Calm ending; brand strands resolve to signature if it stays legible | Large direct email CTA; social links; no form friction |

The implementation may use fewer DOM sections than these eight beats. Pacing alternates spectacle, explanation and proof; it must not look like eight equally sized posters.

## 6. Motion specification

**Main hero sequence:** one native-scroll track about 180–210vh total on desktop, including reading holds. There is no wheel interception, fake scrollbar or forced intro. First 15–20% protects orientation, roughly 20–65% selects and expands the persistent Creative surface, remaining progress holds the readable project result. A fast scroll produces the correct final state directly. Return scrolling reverses coherently. The current review HTML demonstrates the same-card identity and progression; the separate Remotion timeline makes keyframes inspectable.

**Ex-Aid inspiration:** official Toei text confirms orbit → character selection → transformation. YouTube footage is blocked in this environment. Huy subsequently supplied a video, but it exceeds the32MiB workspace transfer limit; Higgsfield is unavailable due to the quota reported by Huy. No frames from the supplied file have yet been inspected, so frame timing, exact paths and number of cards are not claimed as observed. Adapt the principle into original personal branding; no franchise assets or imitation costume UI.

**DOM/CSS/Motion:** navigation, shared card, layout continuity, readable text and scroll progress. Use the existing Motion dependency. Do not install GSAP or Lenis merely because a reference uses them. A polished Bubble Menu may be a secondary navigation interaction; links and overview remain accessible without opening it.

**Remotion:** deterministic explanatory compositions with independently editable layers and meaningful start/middle/end states. At minimum, card-to-hero and visual-DNA propagation; slide reconstruction can become a third composed scene after the design is approved. Use `useCurrentFrame()`/`interpolate()` rather than CSS keyframes inside the composition. For embedded scroll control, a single progress source maps to `PlayerRef.seekTo(frame)` through requestAnimationFrame; do not let autonomous playback and scroll seeking compete. Keep semantic headings and explanations outside the Player. A static poster is the loading/reduced-motion fallback.

**Reading holds:** every transformation resolves to a composition that can be read without time pressure. No character-by-character delay of essential copy. One major moving focal object per beat. Persistent copy does not fade to illegible contrast merely to create a reveal effect.

**Responsive motion:** mobile has its own framing, timing and information order. Remove long pinning rather than shrinking the desktop experience. Reduced motion shows complete states and removes autoplay/perspective. Pause animation when hidden or offscreen. Avoid canvas-first navigation and full-page WebGL.

## 7. English content and attribution

Hero draft:

> **Huy Nguyen. Curiosity, applied.**
>
> I build context-aware agents, generative design workflows, and tools that make ideas usable.
>
> Huy Nguyen — AI Engineer × Creative Builder · Vulcan Labs

The name is the main headline so the person remains more memorable than the supporting sculpture. The scope sentence underneath explains the work directly. An alternative value-led line is **“I turn complex AI into useful, expressive tools.”**

Creative draft:

> **A visual language. Carried forward.**
>
> I adapted the poster pipeline for menus, then designed a visual-DNA method that turns references into coherent generation guidelines.
>
> The original poster-pipeline owner later applied my method to posters, flyers, business cards and social content.

Visible role: **Contributor — Menu pipeline adaptation + visual-DNA research.** Official public web navigation says **Design Studio**; use “Creative Studio / Chat Smith’s Design Studio” in case context if necessary to bridge Huy’s internal naming with the public destination. Do not label Huy the PIC or claim he authored all gallery examples. No invented quality percentage or generated before/after evidence.

Daily draft:

> **Your day. With context.**
>
> I design the AI pipeline, data flow and LLM-agent layer that turn connected email and calendar information into priorities and useful conversations.

Released status is supported by Huy and App Store release notes. Public notes do not establish personal authorship; the role comes from Huy. No sending email, editing events or unconfirmed providers.

Slide draft:

> **A picture is a starting point.**
>
> I’m the main engineer responsible for Slide Design. One module turns image-based slides into editable content, so a design can keep evolving.

Always **In development / Concept preview**. Independent text/image layers in the authored illustration are illustrative objects, not a verified output-format capability matrix. “Vector support” is not claimed.

Engineering:

- NextSight: cameras, inference and desktop integration; previous case’s Hoya Glass Disk deployment context; actual screenshot/video.
- ReID: detection, identity matching and runtime integration; **four-camera proof of concept**, not 500+ deployed cameras.
- CrystalSound: audio pipeline/application/release integration; separate team owned the noise-cancellation model.

Contact: **“Bring a curious problem.”** Useful AI, creative workflows and the space between. Direct email, actual LinkedIn and GitHub. No invented client list, availability statement, Upwork profile or testimonials.

## 8. Evidence and imagery

Every current case pairs outcome + Huy’s responsibility + product context. Real legacy media appears on the homepage. Official Chat Smith and App Store links validate product context; they do not validate Huy’s private role.

Public gallery images are research references and can demonstrate suite breadth with clear attribution, but are not automatically treated as Huy-created portfolio outputs. If matched creative examples become available later, record brief/reference/output conditions and permission before presenting improvement evidence. The site should still work well using role, decision and adoption evidence already confirmed.

New Image Gen asset: `assets/twin-instincts.webp`, derived from `/workspace/generated_images/exec-bc453d43-0b7b-4124-a912-069b4aca088a.png`, around82KB delivery WebP. Champagne metal + smoked-plum glass is an original personal brand study. Its visual does not depict a company product. All important webpage text remains live HTML.

Original specimen designs in the review HTML and Remotion are explicitly conceptual; they are not fabricated company outputs. Before production, unify them into the same authored visual language so storyboard, motion timeline and website use identical composition layers.

## 9. Implementation boundaries after review

Preserve Next.js app routes, verified contact destinations, legacy redirects and all authentic media. Replace homepage scene components and consolidate the two accumulated global/style layers into a coherent scene system. Shared design tokens, role/status data and reference-aware media components keep case pages consistent with the homepage. Do not change a working stack solely for novelty; verify pinned versions and peer compatibility before modifying dependencies.

Components should separate concerns: `Identity`, `ProjectTransition`, `VisualDNA`, `DailyContext`, `EditableStudy`, `EngineeringEvidence`, `CreativeLab`, `Contact`. Each scene owns its semantic content and fallback. One shared motion preference and visibility policy governs Player instances. At most one active heavy composition is required at a time.

The review prototype lives under `docs/design/v3/` and is not a production route. Its links to old case pages intentionally open the existing local site. Production implementation follows design review, consistent with Huy’s original request to discuss important design decisions first.

## 10. Acceptance and review

Review actual browser output and motion at1440/1024/768/390/360px, not only a generated board. Check: visible name, readable role, three capability areas early, true same-card transition, causal DNA/agent/slide explanation, obvious own contribution, real proof, clear unreleased status, direct contact.

Functional verification: no horizontal overflow, loaded media, touch/keyboard navigation, focus restoration if menu changes, anchor landing, fast/reverse scroll, reduced motion, no-JS reading, offscreen/hidden-tab pause and case routes. Production work additionally requires build/lint/typecheck and a fresh isolated mobile performance audit. Targets: reserve image dimensions and keep CLS close to0; aim for Lighthouse performance90+ without claiming it before measurement. Physical-device Safari/Firefox checks remain separate from Chromium emulation.

Do not call the redesign successful merely because the old13 functional checks pass. User review of the visible direction and demonstrated motion is the central acceptance step for this revision.
