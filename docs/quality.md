# Library quality and review

This records evidence for DesignKit 2.0.0, reviewed locally on October 14, 2026. It separates checks completed during the current audit from earlier installation and skill evaluations. It does not assign a universal quality, accessibility, or performance score.

## Current catalog, code, and distribution checks

- The library contains 22 styles, three authored project contexts per style (66 examples), and six component patterns per style (132 components).
- TypeScript checks and 67 automated tests pass. Regression coverage includes saved-style migration; searchable style names, categories, body fonts, and hyphenated terms; bounded URL filters; safe return links; native component attributes and field descriptions; board import/export and customization; storage failures and concurrent updates; and URL state during client navigation.
- The production build exports 294 pages. Static verification resolves 12,802 local references and checks actual route files, relative and root-relative links, CSS dependencies, assets, downloads, and ordinary fragment targets. The root Library's declared view and style hashes are recognized as client routes; their behavior is checked in the browser rather than inferred from static anchor IDs.
- The package checker verifies 222 ZIPs: 66 example packages, 132 component packages, 23 skill packages, and one font bundle. It checks local and central ZIP records, decompression sizes and CRCs, safe paths, import closure, declared dependencies, export coherence, version/provenance metadata, discovery digests, current shared source, and bundled reference bytes.
- A strict TypeScript program compiles 1,453 copied source files and component usage examples across the packages and combined registry payload. This total includes repeated shared source distributed with separate kits; it is not a count of distinct components. Registry checks preserve complete target paths and reject differing content written to the same target.
- Default font files and embedded registry font data are compared with the original bundled bytes. Each required font retains its original license; source and skill packages retain the project's MIT license. Component ZIPs include integration instructions and typed examples for all six patterns.
- Opaque canvas, surface, accent, and muted text token pairs meet the tested 4.5:1 threshold. Customized accents recalculate readable text. CSS, Tailwind v4, and design-token JSON exports preserve the corresponding settings, including custom text and layered CSS shadows. Token calculations do not establish pixel contrast over every translucent, textured, or gradient material.

## Current browser checks

All 66 preview routes were swept at widths 1280 and 375 (132 route/width cases). The recorded checks found no horizontal page or canvas overflow and no nested anchors. All 132 component routes were swept at the same widths (264 cases); the recorded checks found no horizontal overflow, nested anchors, or missing field-label associations. These are specific DOM checks, not comprehensive visual or accessibility tests.

Representative native flows cover gallery search and filtering, contextual return navigation, browser history, Load more focus, dialog dismissal with Escape and Done, shop additions, planner tasks, and archive search. Browser board checks cover updates across tabs, saving an existing decision, reopening a selected board, preserving local edits, and valid and invalid JSON import/export. Automated domain tests cover storage quota/read failures and concurrent board changes.

A selected-board race during Next.js client navigation was fixed by publishing URL changes through a shared store, observing Next route/search changes in a small Suspense boundary, and delaying board selection until the URL belongs to the current route. Regression tests cover stale previous-route state and subsequent URL refreshes. Browser checks include reopening the intended board after navigation.

All 66 example detail pages and all 22 style guides were also checked at 1280 and 375 pixels. The six Library views were checked at both widths; galleries, boards, and agent documentation were checked at 320, 375, and 1440 pixels. These additional 200 route/width cases recorded no horizontal page overflow or nested anchors after fonts loaded. Together with the preview and component sweeps, this covers 596 route/width cases. The sweeps do not exercise every possible customization or interaction state.

The final build was used to repeat the non-first-board navigation, reload, and exact return-link regression; cross-tab saved styles and comparisons; natural-language style search and empty-result recovery; component filter retention and canonical reset; native dialog focus and scroll-lock recovery; registry-command copying; planner note retention; desktop/mobile toggles; and explicit Light/Dark switching. Actual CSS, Tailwind, and JSON downloads were inspected, with JSON parsed and playground defaults restored. A 120-character unbroken headline using Press Start 2P stayed within the phone preview. Temporary boards, favorites, and comparison choices created for testing were removed through the UI. No new console errors were recorded during the final sweep.

## Refreshed visual references

All 132 desktop and phone reference images were replaced with complete page captures. A previous capture method produced collapsed planner rasters or truncated content despite correct live layouts. Those images were capture defects; they were not evidence that the live planner layout had collapsed.

The replacement method uses literal browser viewport captures at fixed dimensions: 1280 × 900 for desktop and 375 × 812 for phones, with loaded fonts. Overlapping captures are assembled to cover each page without changing its viewport-dependent layout. [Capture metrics](../public/previews/capture-metrics.json) record each example, device, output dimensions, page height, and tile offsets. The 132 records cover all 66 examples at both widths; every recorded output height equals its page height.

The references travel with example ZIPs and style skills. Complete capture coverage and source-byte checks do not establish that every visual detail has been manually reviewed or that every interaction state appears in the images.

## Earlier installation and skill evaluation evidence

The October 13 review documented that all 23 SKILL.md entrypoints passed the skill-creator validator, all 23 packages were discovered and installed through the skills CLI, and installed file bytes matched their archives. It also documented shadcn installation and TypeScript checking of all six pattern kinds across Claymorphism, Glassmorphism, Swiss design, Victorian, and Cyberpunk in an isolated project.

Those CLI installations and skill-creator validation were not rerun after the current source and reference changes. The current audit verifies generated discovery records, digests, archives, source closure, licenses, registry targets, and copied-source compilation; these checks do not substitute for a fresh CLI installation.

The earlier review also recorded 66 independent skill forward evaluations: each of the 22 style skills was used for a React/TypeScript illustration portfolio, a React/TypeScript stationery shop, and a plain HTML/CSS/JavaScript reading-list tool. Evaluators produced artifacts and ran compiler, syntax, asset, server-rendering, or event/state checks as applicable. These evaluations were not rerun for this audit and did not establish browser rendering, screen-reader behavior, contact delivery, or a backend integration.

An earlier downloaded example was bundled and rendered without the library's global CSS reset, with customized text, typography, color, radius, and spacing at phone width. Light/Dark switching was repeated during this audit. Reduced-motion support was reviewed in the featured deck and CSS; OS preference emulation was not repeated.

## Limits

No Lighthouse, Core Web Vitals, screen-reader, exhaustive device, or cross-browser certification is claimed. Browser sweeps, static markup assertions, and successful builds cannot establish all keyboard, focus, visual, or accessible-name behavior. Preview shops, schedules, and tasks use local demonstration state. Boards use browser storage; no account, payment service, database, or backend delivery is implied. Local verification does not establish the state of a published deployment.

## Reproduce automated checks

```sh
npm ci
npm run typecheck
npm test
npm run check:kits
npm run build
npm run check:site
PORT=3001 npm start
```

`check:kits` and the production build regenerate distribution outputs from the current shared source. Preserve font licenses when redistributing assets. Refresh affected visual references deliberately after content, typography, or layout changes, and record capture coverage rather than relying on a full-page screenshot setting alone.

To repeat skill installation checks without changing a usual agent setup, use an empty scratch project while the local preview is running:

```sh
npx skills add http://127.0.0.1:3001 --list
npx skills add http://127.0.0.1:3001 --skill '*' --agent codex --copy --yes
```

For component installation, use a component page's registry command in a scratch project with a valid components.json, then check the installed source and its behavior in that project.
