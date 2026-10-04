# Independent final source review — responsive C repair

Reviewed 2026-10-03. Scope: `experience.tsx`, `hero-composition.ts`, `c-responsive.css`, `c-fidelity.css`, `page.tsx`, `motion-study.tsx`, `motion-study.module.css`, `study-player.tsx`, and the compact Remotion composition. Source reviewed read-only; the only repository output from this reviewer is this record.

## Result

No confirmed P1/P2 source defect in the reviewed repair. This is a bounded source/lifecycle review, not whole-site visual acceptance, pixel-identical C approval, or proof of every browser/platform.

The retained scene cleanup removes inline state, inert links, artwork focus classes and listeners before switching to mobile/reduced motion. Compact chapters retain native reading order. The composition measurement clones arrival captions instead of feeding focused-card dimensions back into hero fitting. Root/copy resize measurement restores a retained candidate before choosing a fallback, so a previous short-flow state does not permanently choose the next tall layout. Modal uses native `showModal`, restores scrolling/focus and closes on Escape; its cleanup captures the original trigger. No changed behavior in those paths warranted an additional source fix.

The compact study uses one Remotion frame clock, switches composition dimensions together with its `compact` input, pauses offscreen/hidden, and only renders moving content for reduced-motion users after their explicit action. Accessible workflow text stays outside the aria-hidden Player. Phase panels all contribute to row sizing, avoiding height changes at phase transitions. Existing portrait/logo/font sources remain in use.

## Focused runtime check

A separate local Chromium probe disabled WebGL to isolate DOM geometry, paused ambient cards with a native click, and inspected the fully focused Creative frame at section start +0.5 viewport height. Tested1200×800,1280×800,1366×768,1440×900,1536×1024 and1760×1364. All were retained, fully opaque and within the visible viewport; horizontal overflow was false and page exceptions were empty. These are geometry checks, not GPU/performance or celestial fidelity checks.

The new27px contribution footer is not included in the current caption+art focus-height estimate. Consequently, the visible copy/frame and bottom clearances on the tighter profiles are approximately19–20px instead of the intended32px. The actual frame remained readable and inside the viewport in every tested profile, so this is not represented as a blocking overlap or clipping bug. If the32px clearance later becomes a formal requirement, include the footer height in both card-width and center calculations together; changing only one would shift the frame inconsistently.

A paused1536×1024 hero screenshot was also inspected. All three initial cards, the full Creative contribution line, original portrait/name treatment and curved proof horizon were visible. Element bounding boxes of rotated padded footers are conservative: a hit at the footer box's empty lower-left corner can reach Slide, while its actual tilted glyph line is above the Slide edge. That box hit alone is not evidence of covered text.

## Limits

This review did not rerun the parent's complete hero-cycle/platform matrix or inspect physical Safari/Firefox/iOS hardware. The fresh rendered reviewer and production checks remain the authority for visual findings and exported behavior. Prior typography-only passes are not extended to the new whole-site request.

## Addendum — generic glyph/footer safety correction

The later full-cycle visual audit found footer/name and footer/horizon cases outside this review's initial paused-hero sample. Those findings supersede any inference of full-cycle protection from the earlier screenshot; the first source review did not execute the complete80-second cycle.

Read-only follow-up inspected the new `HeroFrame.text` glyph envelopes, rotated-corner safety calculation, contribution-dependent full frame span, and `readingLimit` fade in `hero-composition.ts`/`experience.tsx`. No additional important source finding was confirmed. Clone Range rectangles are returned in viewport coordinates by the DOM, augmented with scrollY by `glyphBoxes`, then correctly converted back to local clone coordinates by subtracting clone viewport top and scrollY. Thus a later resize while scrolled does not add the page scroll distance to a card's local glyph envelope. All clone measurement/browser access remains inside the mounted effect; SSR does not execute it. Measurement clones are removed synchronously.

Signature checks now cover all measured title/caption/contribution glyph lines rather than only a guessed top caption strip. Frames containing a contribution use their rotated full span before positioning the next frame. The reading exit reaches zero before the largest rotated text bottom reaches the horizon reading limit, with a24px fade window and6px clearance. Quiet artwork may continue through the decorative edge. The parent's cycle trace and final production captures remain the runtime authority; this follow-up is a math/measurement review, not an additional all-platform or visual approval.

## Addendum — ultrawide initial-fit correction

A final bounded source review covered only the extracted `heroTextEnvelopes` helper and the revised initial-fit loop. No additional important math or SSR/measurement defect was confirmed in that delta.

The helper applies rotation around the frame center to all four corners of every local glyph rectangle and returns the conservative vertical envelope. Initial placement now uses that same envelope at the maximum additional0.6° track turn. When a frame cannot clear reading horizontally, placement moves below the relevant reading bottom, its padding and the16px opacity-clearance window. Placement is monotonic; repeated passes recheck earlier reading boxes after later boxes move the frame. The loop is bounded by the number of reading boxes. Clone coordinate conversion and browser-only measurement remain unchanged from the preceding addendum.

This corrects the previous mismatch between unrotated first-paint placement and rotated travel clearance. The parent's latest1920px native check is the runtime evidence for initially visible Creative, modal click/Escape/focus restore and the subsequent Slide scroll. This final review does not extend that check to untested physical platforms or restart an unrelated redesign review.
