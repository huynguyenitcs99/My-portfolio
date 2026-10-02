# Storyboard fidelity revision — 2026-10-02

User instruction: “Nó quá khác hình ảnh ở storyboard làm giống storyboard hoàn toàn luôn đi, gen ảnh phù hợp.” Base implementation: `e5d7c52` on `codex/nekomata-rebuild`.

The prior implementation changed the stacked serif name to a single sans-serif line, enclosed the portrait in an arch, substituted simple CSS artwork, and replaced the six-tile gallery and portrait/contact composition. Those choices did not preserve the approved visual storyboard. The master PNG remains unchanged and is now the explicit acceptance reference.

## Compositions restored

1. Stacked heavy serif HUY / NGUYEN, photographic collage cutout, three angled work cards, thin orbits and paper background.
2. Left serif Creative / Studio and right full-size menu / food / botanical paper collage.
3. Three horizontal reference / JSONL / guideline panels; botanical corner and coherent menu reference details.
4. Dark espresso paper, plum glass cube, botanical leaves, transparent source/output cards. Labels remain DOM content.
5. Slide Design with peach development pill, architectural slide layers and four layer tags. Removed the extra enclosing demo frame.
6. Three compact engineering covers matching the lens / tracked people / waveform imagery. Existing real screenshots remain inside case studies.
7. Six visual tiles, Nekomata sticker, interest pills; Remotion timeline playhead integrated into one tile.
8. Portrait on the left, serif bio headline, dark rectangular email CTA, supporting links and scene index on the right.

All reading uses native scroll. Mobile preserves the corresponding stacked name, portrait, cards, artwork and vertical agent flow. Images supplement accessible English headings/copy. No mandatory selection or player action to understand the overview.

## Generated asset provenance

All are illustrative personal/concept artwork. They are not company outputs, measured comparisons or private product screenshots. Image Gen used the accepted board as a reference; portrait generation additionally referenced Huy's supplied `public/images/avatar.jpg`. Original generated files remain in `/workspace/generated_images`.

| Production asset | Source generation |
| --- | --- |
| `portrait.png` | `exec-1d91bfd2-8fc9-4755-a8de-7ed41e254197.png` |
| `creative.png` | `exec-fca67a5f-5ac0-434c-97e2-61a9391908d7.png` |
| `daily.png` | `exec-cffb27ec-cef3-48b6-9b2f-7b2c98ed0caa.png` |
| `slide.png` | `exec-05ed51d0-2a1a-47a3-9a10-896b16865007.png` |
| `engineering.png` | `exec-142085ca-a3f5-45a4-8db4-7c35ac1ece99.png` |
| `atlas.png` | `exec-a156fabf-3349-4259-98ff-91a05cca4bdd.png` |
| `botanical.png` | `exec-573dd4ef-0cf2-46bf-b091-d91f99662cb0.png` |

`atlas-motion.jpg` and `daily-mobile.webp` are delivery conversions for the Remotion background and small mobile cube region, with no creative modification. Gallery/engineering atlas tiles use CSS viewports; Next Image delivers WebP for the remaining images. Inter and Playfair are local licensed fonts subset for English/punctuation; Caveat is subset for the actual handwritten annotations. Their total WOFF2 size is about 68 KB. The selected Nekomata image is untouched.

`paper.webp` is a raster delivery conversion of the authored SVG paper-grain texture. It avoids repainting a turbulence filter over the entire long document. The above-fold portrait has pre-encoded responsive AVIF/WebP variants at 384/640/1024px, with high-priority responsive preload. This avoids cold on-demand encoding for the LCP image. Compact cards and reference details use their actual responsive image sizes. The original portrait PNG remains intact.

## Acceptance evidence

Fresh production checks, screenshots, browser walkthrough and Lighthouse report are recorded in [verification](verification.md). Full-page captures reset scroll/focus before capture so fixed navigation is at the top. Independent review compared the fixed master, actual rendered desktop/mobile images and clean live arrivals. No blocking findings; partial desktop surname overlap follows the foreground portrait in the master.

Visual fidelity is checked scene by scene; browser checks cover interaction, content, image loading and responsive behavior. This is a working webpage, not the storyboard flattened into a screenshot.

Motion uses `m` components with asynchronously loaded `domAnimation` features. Core copy/art remains server-rendered. Remotion's Player stays lazy and pauses outside the viewport or a hidden tab.
