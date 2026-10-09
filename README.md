# DesignKit

DesignKit is a personal reference for exploring 22 visual languages and planning design directions. It complements the sibling SystemKit project, which focuses on system design. Built with **Next.js 16, TypeScript, React 19, and Tailwind CSS 4**.

## Run locally

The main repository lives at `/Users/arboy/dev/personal-projects/designkit`.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. The development script uses webpack so it works in restricted environments where native filesystem events are unavailable. If filesystem watching is restricted, run `WATCHPACK_POLLING=true npm run dev`.

```sh
npm run typecheck
npm test
npm run build
npm start
```

The build creates a standalone static export in `out/`. `npm start` previews that export at http://127.0.0.1:3000; use `PORT=3001 npm start` to choose another port. It can be hosted with any static server. This app has no server-side database or API keys.

The accompanying `designkit-source.zip` contains the editable project. `designkit-static.zip` contains the built site, ready to extract and upload to a static host.

## What's inside

- 22 original, distinctly composed specimens, each with desktop and mobile layouts.
- Search across names, moods, font pairings, and characteristics; filter by family; sort; browse as a grid or list.
- Style guides with suggested palettes, practical font pairings, use cases, characteristic traits, and guidance.
- Copy a color, a palette, or ready-to-use CSS variables.
- Editable typography specimens and links to the fonts.
- Saved styles stored in this browser's local storage.
- Existing Form Atlas saved styles migrate automatically to DesignKit on the same browser origin.
- Two-style comparison and downloadable Markdown design briefs.
- An interactive deck of six featured styles with interruptible springs, arrow-key browsing, and focus restoration.
- An expressive gallery with varied desktop proportions, a single-column phone layout, and a compact list view.
- Plain masthead navigation and a mobile drawer with keyboard navigation and reduced-motion support.
- System, light, and dark appearance modes that preserve each specimen’s own colors.
- Oi and Karrik display typography discovered through Free Faces, paired with Space Grotesk.
- Selectable text fallback when browser clipboard access is unavailable.
- Self-hosted fonts and their licenses in `public/fonts/licenses/`, including the unmodified Oi and Karrik Regular WOFF2 files.

The illustrations and specimen brands are original fictional examples. Styles are interpretations, and suggested palettes and pairings are not historical prescriptions. Primary references are linked in applicable guides. The initial style list was inspired by Talha × Codes' Instagram reel, credited in the About page.

See [DESIGN.md](DESIGN.md) for the design audit, tokens, interaction decisions, and the Emil Kowalski, Dick Wu, Free Faces, and awesome-design-md references. Oi is by Kostas Bartsokas under OFL 1.1. Karrik is by Jean-Baptiste Morizot and Lucas Le Bihan, distributed by Velvetyne under OFL 1.1.

## Source map

- `src/data/styles.ts` — typed catalog and editorial guidance.
- `src/components/Library.tsx` — browsing, saved collection, search, and comparison.
- `src/components/InspirationDeck.tsx` and `inspiration-deck.css` — featured specimen deck and spring interaction.
- `src/components/StylePreview.tsx` and `previews.css` — all original visual specimens.
- `src/components/StyleDetail.tsx` and `detail.css` — interactive style guides.
- `src/app/globals.css` — library shell, responsive layout, and Tailwind import.
- `src/app/fonts.css` — self-hosted font declarations.

To add a language, add a catalog entry and an original specimen, then verify its desktop and mobile layouts.

## Verification

The production build and TypeScript checks pass, along with all five saved-collection tests. The creative shell was checked in the production browser at 320px, 390px, 900px, and 1440px with no page overflow. Light and dark appearances, theme persistence, deck buttons and arrow keys, featured-guide return focus, gallery navigation, search, family filters, sorting, grid/list views, saving, two-style comparison, preview viewport switching, and drawer focus/scroll locking were exercised. No browser console errors were reported. Reduced-motion branches and hidden-card accessibility were also reviewed in code.

Catalog verification confirms the 22 requested languages, 22 distinct specimens, 110 valid palette entries, and 22 complete generated briefs. All 21 WOFF2 files and all briefs match the static export. Previous full-catalog browser checks covered card, desktop, and mobile specimen layouts, editable typography, palette/CSS copying, and the complete selectable-text fallback under denied clipboard permissions; those implementations are retained.

A Lighthouse CLI run was attempted, but Chrome aborted during macOS application registration before exposing its debugging port. No Lighthouse or Core Web Vitals score is claimed.

The production export is independent of any hosting provider. Deploy the contents of `out/` to a static host when ready.
