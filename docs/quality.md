# Library quality and review

This is evidence for DesignKit 2.0.0, reviewed on October 13, 2026. It describes the checks performed, rather than assigning a universal quality or accessibility score.

## Catalog and source checks

- 22 styles, three distinct contexts per style, 66 examples, and six component patterns per style (132 components).
- All bundled example fonts exist, and opaque canvas, surface, accent, and muted text token pairs meet 4.5:1. Customized accents recalculate readable text. These calculations do not establish pixel contrast over every translucent or gradient material.
- Bounded playground inputs, JSON/CSS consistency, saved-style migration, board import validation, customized board round trips, and explicit project briefs pass 15 unit tests.
- All 66 example ZIPs, 132 component ZIPs/registry records, and 23 skill packages pass dependency closure, metadata, archive digest, original font bytes, and license-file checks. The ZIP records also passed an independent Python zipfile CRC/decompression check.
- All 23 SKILL.md entrypoints pass the skill-creator validator. The current `skills` CLI discovers and installs every package through the well-known discovery endpoint; all installed file bytes were compared with their archives.
- The current shadcn CLI installed all six pattern kinds across Claymorphism, Glassmorphism, Swiss design, Victorian, and Cyberpunk into an isolated project. The installed source passed TypeScript checking.
- The production build exports 294 pages. Every locally referenced route, download, and asset resolves. CI repeats the catalog, unit, package, build, and static-link checks.

## Browser checks

A downloaded source kit was also bundled and rendered without the library’s global reset. Its custom headline, Inter body font, accent, radius, and spacing matched the supplied settings at mobile width.

All 66 full-page examples were rendered at desktop width 1280 and mobile width 375. Full-page screenshots were captured with loaded fonts; document and interactive/text-element overflow checks found no horizontal overflow. A contact-sheet review covered all 22 directions at both sizes. Shell pages were also checked at 320, 390, and 1440 widths.

Representative interactions cover planner completion, shop additions, event selection, archive search/empty state, reading/project dialogs, component loading/error/disabled states, playground text/font/geometry updates, and board creation, persistence, export, import, removal and Undo. Native dialog keyboard activation, Done and Escape dismissal, focus restoration, and scroll-lock cleanup were exercised. Light and dark shell appearances were reviewed. Reduced-motion CSS removes example press transforms; the existing deck retains its reduced-motion path.

This is not an exhaustive browser/device, screen-reader, backend integration, or performance certification. No Lighthouse or Core Web Vitals score is claimed. Preview commerce, schedules, and tasks deliberately use local demo state.

## Independent skill forward tests

Each of the 22 style skills was evaluated against three separate realistic briefs (66 cases):

1. A React/TypeScript illustration portfolio for Ren Park, including three projects, about/contact sections, and visible contact validation.
2. A React/TypeScript Margin stationery shop, including three products, editable cart quantities/totals, and newsletter validation.
3. A Shelf reading-list tool in plain HTML/CSS/JavaScript, including search, status filters, add-book validation, and an empty state.

Evaluators read each skill and necessary references, produced usable source, and ran compiler, syntax, asset, server-rendering, or actual event/state tests as applicable. All permitted functional checks passed. Those tests did not claim browser rendering, real focus order, screen-reader behavior, or contact delivery. The plain JavaScript brief retained its requested stack.

The portfolio evaluator identified a conditional muted-text contrast hazard on colored surfaces. The library now exports a separate readable surface-muted token. The shop evaluator noted variation between suggested and example font/palette choices; pixel display lettering was made consistent across the Pixel art examples, and references now explain that palettes/type pairings are adaptable interpretations. Rendered desktop/phone references are included in every style skill to support future visual checks.

## Reproduce checks

```sh
npm ci
npm run typecheck
npm test
npm run check:kits
npm run build
npm run check:site
PORT=3001 npm start
```

To check skills without changing your usual agent setup, run the following in an empty scratch project while the local preview is running:

```sh
npx skills add http://127.0.0.1:3001 --list
npx skills add http://127.0.0.1:3001 --skill '*' --agent codex --copy --yes
```

For component installation, use the command on a component page in a scratch project with a valid components.json. Adapt future source changes deliberately, rerun package/build checks, and refresh affected screenshots through the browser. Generated distribution folders are rebuilt by `npm run generate:kits`; the portable skill folders and original screenshots are committed so GitHub-based installation has real assets.
