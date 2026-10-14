# DesignKit interface direction

DesignKit is a creative reference library for exploring visual languages and trying out a direction before starting a project. Its own identity should feel curious and expressive, while the 22 specimens remain useful, distinct examples.

## Composition and typography

The opening is a typographic poster: Karrik's direct “Follow your” meets the oversized, eccentric slab shapes of Oi in “instinct.” Space Grotesk handles reading and controls, with Caveat reserved for the handwritten “Surprise me” action. Oi is a signature moment, not a typeface for navigation or long text.

A deck of six actual specimens sits beside the headline. Previous/next controls and arrow keys cycle the featured directions; the front card opens its guide. No invented dashboard, decorative screenshot, autonomous carousel, or floating loop substitutes for the library's own content.

The desktop collection alternates seven- and five-column spans within a twelve-column grid. Paired rows and restrained offsets create changes in scale while preserving a consistent specimen aspect ratio and reading order. Tablets use equal columns; phones use one column. List mode remains compact and orderly. Larger Karrik captions, visible font-pairing names, and rectangular palette strips connect the artwork to practical design decisions.

The masthead uses plain navigation with an underline for the current view. Search, saved styles, and comparison remain immediately available; Toolkit opens the secondary drawer. The collection retains six family filters, sorting, grid/list views, all existing hashes, and saved-state migration.

Design dials: visual variance 8, motion intensity 4, content density 5. The shell has a strong display identity without competing with the individual styles through unrelated colors or ornamental sections.

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

Cobalt is the shell's single accent. Gallery previews use fine ink borders and 3px corners; the featured deck has thin paper edges and shallow shadows to convey its layers. Circular deck controls indicate the paired directional actions. Specimens intentionally retain their independent palettes, typography, and geometry. No forest green is used in the shell.

## Interaction and accessibility

The deck uses Motion springs with position and rotation targets that can change without waiting for a previous transition. Only transform and opacity animate; there are no pointer-move React updates. Press feedback begins immediately. Frequent navigation, filters, and viewport switches remain immediate.

Background and exiting deck cards are inert and hidden from assistive technology. Only the front card can receive focus. Keyboard arrows change its direction, previous/next buttons have 44px targets, and the current name is announced politely. Opening a featured guide and returning preserves its selected direction and restores focus to the deck. Returning from the collection restores the originating card.

Reduced motion makes deck changes immediate, removes press transforms, and shortens CSS transitions. Higher-contrast preferences strengthen secondary text and boundaries. Phone controls have 44px targets; palette swatches keep padded click areas.

The navigation drawer traps focus, makes the page inert, locks background scrolling, and returns focus to its trigger. Appearance defaults to the operating system and supports persisted light/dark overrides applied before paint. Specimen colors remain unchanged by appearance. Clipboard denial exposes complete selectable text in an accessible dialog.

## Typography provenance

Oi by **Kostas Bartsokas** was discovered via [Free Faces](https://www.freefaces.gallery/display). The original Regular WOFF2 and unchanged SIL OFL 1.1 license are bundled from [the author's repository](https://github.com/kosbarts/Oi), revision `bd7ccfa844054ec4a0b2b17e56c33830646668ea`. See `public/fonts/OI-SOURCE.md` for binary provenance. No glyph modifications or subsetting were made.

Karrik by **Jean-Baptiste Morizot and Lucas Le Bihan**, distributed by [Velvetyne](https://velvetyne.fr/fonts/karrik/), is also OFL 1.1. The original Regular WOFF2 and license are bundled from [the foundry repository](https://gitlab.com/phantomfoundry/karrik_fonts), revision `42ae96dcdfdd75b883d4d56a783c337f818f6651`. Space Grotesk by Florian Karsten reuses the existing local font and license. All shell faces use `font-display: swap`; Oi, Karrik, and Space Grotesk are preloaded.

## References applied

- The local **design-taste-frontend** skill: audit first, commit to a visual identity, make typography carry the design, use genuine content, and validate responsive composition.
- The local **Apple motion** skill: immediate feedback, interruptible springs, spatially consistent navigation, reduced-motion alternatives, and deliberate tracking and leading.
- [VoltAgent's awesome-design-md](https://github.com/voltagent/awesome-design-md), specifically [The Verge](https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/theverge/DESIGN.md) for display type as identity, [Figma](https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/figma/DESIGN.md) for compositions made from design content, and [Pinterest](https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/pinterest/DESIGN.md) for visual discovery and accessible collection actions. These are community analyses, not official brand systems; no proprietary assets were copied.
- [Dick Wu's Apple design skill](https://github.com/dickwu/apple-design-skill) and [Emil Kowalski's design engineering skill](https://github.com/emilkowalski/skills/tree/main/skills/emil-design-eng) informed the retained focus management, clear hierarchy, and fine-pointer hover behavior.

## Expanded library workspaces

The shell now connects styles, examples, components, boards, and agent access. Those pages retain the cobalt accent, Karrik hierarchy, plain navigation, and neutral light/dark materials. They use the actual example renderer in thumbnails so discovery leads to the same editable interface.

Each style offers three different project contexts from shop, journal, studio, planner, event, and archive compositions. Genre-specific geometry, material, type, and palette remain scoped to the preview. Desktop/mobile toggles expose their responsive behavior; a full-page route provides an unobstructed reference.

Design decisions are explicit and portable. A board's primary example anchors its exported brief, while supplementary components, fonts, and palettes retain their exact identities. Customized token JSON stores the actual text and CSS material choices, and starter entries accept those settings. Scoped CSS foundations let copied kits work independently of the library's global reset.

The agent page presents installation, examples, components, and machine-readable references in a sequential document. It avoids quality scores or promises unsupported by recorded checks. Original screenshots, design reasoning, licensed fonts, and local source travel together in the skill packages.
