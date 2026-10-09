# DesignKit interface direction

DesignKit is a visual reference tool for choosing a direction, studying its details, and carrying those decisions into a project. The specimens are the product's primary visual content.

## Audit and decisions

The original shell used DM Sans throughout, a permanent desktop sidebar, a decorative poster collage, small catalog metadata, and controls layered over specimens. The 22 original specimen compositions already had distinct identities. The redesign gives the shell its own typographic character and more space for those specimens.

- A compact masthead replaces the permanent sidebar. Explore, saved styles, and comparison remain immediate; Toolkit opens the navigation drawer. The drawer serves smaller screens as well.
- A short typographic introduction leads directly to the collection. The random-style action opens an actual guide.
- Equally proportioned previews support scanning and comparison. Save controls sit alongside the title, outside the artwork. No arbitrary masonry, card entrance animation, or specimen zoom on hover.
- Six family filters, search, sort, grid/list, and all existing hashes remain available. Font/palette tools, collection persistence, comparison, and downloadable briefs remain part of the library.
- Display typography uses Karrik Regular; body text and controls use Space Grotesk. Original specimens keep their own font pairings.

Design dials: visual variance 7 in the specimens and 4 in the surrounding interface; motion intensity 2; content density 6. A bespoke creative-tool interface is appropriate here. This is not a reproduction of Apple's native materials or a marketing-page template.

## Tokens

| Role           | Light     | Dark      |
| -------------- | --------- | --------- |
| Page           | `#F9F9F7` | `#191A1F` |
| Raised surface | `#FFFFFF` | `#222329` |
| Muted surface  | `#EFEFED` | `#2C2D35` |
| Primary text   | `#24252A` | `#EEEEF2` |
| Secondary text | `#626570` | `#A7A9B5` |
| Accent         | `#3155DF` | `#A5B5FF` |
| Accent surface | `#E9EDFF` | `#303A61` |

Chrome uses one cobalt accent, 6px control corners, and 8px preview/panel corners. Styles inside specimens are intentionally exempt from shell palette, typography, and geometry rules. Their diversity is the explicit purpose of the library. No forest green is used in the shell.

## Interaction and accessibility

Frequent navigation and preview viewport changes are immediate. Hover feedback is limited to fine pointers with brief 140-160ms transitions; motion never carries essential information. Reduced-motion settings remove transforms and shorten transitions. Higher-contrast preferences strengthen secondary text and boundaries. Phone controls have 44px targets; color swatches include larger padded targets.

Detail navigation focuses the new heading and restores the originating card on return. Comparison controls expose their selected state. The navigation drawer traps focus, makes the page inert, and returns focus to its trigger. Appearance defaults to the operating system and supports persisted light/dark overrides; a small pre-hydration script applies the override before paint. Specimen colors never change with appearance.

## Typography provenance

Karrik was discovered via [Free Faces](https://www.freefaces.gallery/). It is designed by **Jean-Baptiste Morizot and Lucas Le Bihan**, distributed by [Velvetyne](https://velvetyne.fr/fonts/karrik/), and licensed under SIL Open Font License 1.1. The original Regular WOFF2 (31,180 bytes) and unmodified license are bundled under `public/fonts/`. No subsetting or glyph modifications were made. Source archive revision: `42ae96dcdfdd75b883d4d56a783c337f818f6651` from [the foundry repository](https://gitlab.com/phantomfoundry/karrik_fonts).

Space Grotesk by Florian Karsten is also featured on Free Faces. Its existing local font and OFL license are reused. All other local fonts continue to serve the individual specimens. The two shell fonts are preloaded; every face uses `font-display: swap`.

## References applied

- [Dick Wu's Apple design skill](https://github.com/dickwu/apple-design-skill): hierarchy, legible controls, consistent feedback, and accessibility before decorative polish.
- [Emil Kowalski's design engineering skill](https://github.com/emilkowalski/skills/tree/main/skills/emil-design-eng): immediate frequent actions, restrained interruptible feedback, fine-pointer hover, and reduced motion.
- The local design-taste-frontend skill: audit before redesign, deliberate type, real visual content, responsive composition, and coherent shell tokens. Its landing-page rules are scoped to this product: a uniform comparison grid and 22 independently styled specimens are intentional.
- [VoltAgent's awesome-design-md](https://github.com/voltagent/awesome-design-md): neutral framing around expressive content from its Figma interpretation, visual browsing and accessible save actions from Pinterest, and clear typographic roles from Wired. These are community interpretations, not official brand systems; no proprietary assets were copied.
