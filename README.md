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
- Compact masthead and mobile drawer with keyboard navigation, focus restoration, and reduced-motion support.
- System, light, and dark appearance modes that preserve each specimen’s own colors.
- Karrik display typography discovered through Free Faces, paired with Space Grotesk.
- Selectable text fallback when browser clipboard access is unavailable.
- Self-hosted fonts and their licenses in `public/fonts/licenses/`, including the unmodified Karrik Regular WOFF2.

The illustrations and specimen brands are original fictional examples. Styles are interpretations, and suggested palettes and pairings are not historical prescriptions. Primary references are linked in applicable guides. The initial style list was inspired by Talha × Codes' Instagram reel, credited in the About page.

See [DESIGN.md](DESIGN.md) for the design audit, tokens, interaction decisions, and the Emil Kowalski, Dick Wu, Free Faces, and awesome-design-md references. Karrik is by Jean-Baptiste Morizot and Lucas Le Bihan, distributed by Velvetyne under OFL 1.1.

## Source map

- `src/data/styles.ts` — typed catalog and editorial guidance.
- `src/components/Library.tsx` — browsing, saved collection, search, and comparison.
- `src/components/StylePreview.tsx` and `previews.css` — all original visual specimens.
- `src/components/StyleDetail.tsx` and `detail.css` — interactive style guides.
- `src/app/globals.css` — library shell, responsive layout, and Tailwind import.
- `src/app/fonts.css` — self-hosted font declarations.

To add a language, add a catalog entry and an original specimen, then verify its desktop and mobile layouts.

## Verification

The production build and TypeScript checks pass. All 22 specimens were rendered in card, desktop, and mobile modes, then checked in the browser. Phone-width checks at 390px found no page overflow or clipped specimen headings. Search, category filters, sorting, grid/list views, palette and CSS copying, type editing, saved-style persistence, and two-style comparison were exercised. All 22 complete briefs are generated as static downloadable files under `public/briefs/` during the build. Production browser checks reported no console errors. The refreshed shell was checked at 1440px and 390px, including light/dark appearance, theme persistence, drawer scroll locking and return focus, search, list layout, comparison state, toolkit views, editable typography, and successful CSS clipboard output. The clipboard fallback was verified against the production export served with `Permissions-Policy: clipboard-write=(), clipboard-read=()`: complete CSS text, full text selection, read-only input, keyboard focus, background scroll locking, Escape dismissal, and return focus all passed. No Lighthouse score is claimed.

A final catalog audit confirmed exactly the 22 requested languages, 22 distinct specimen components, 110 valid palette entries, every font file present in both source and export, and all 22 generated briefs matching the current catalog.

The private Site was registered, but source publication is pending: this session's automatic approval policy rejected input to the publishing helper. No deployment is claimed. The local source and static production export are complete.
