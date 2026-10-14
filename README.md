# DesignKit

An open design library for people, designers, and AI agents: 22 visual languages, 66 original interactive examples, reusable components, and practical guidance for choosing a coherent direction. Built with Next.js, TypeScript, React, and Tailwind CSS.

## Explore

- **Styles:** three different project contexts per direction, suggested fonts, palettes, design anatomy, and practical tradeoffs.
- **Examples:** searchable shop, journal, studio, planner, event, and archive interfaces, with desktop/mobile previews and original screenshots.
- **Playgrounds:** edit the actual headline, heading/body fonts, accent, radius, shadow, and spacing. Export CSS variables, a Tailwind v4 theme, or portable design-token JSON.
- **Components:** compare buttons, cards, navigation, fields, dialogs, and status patterns across all styles. Try relevant states and download source or install through a shadcn registry item.
- **Project boards:** collect examples, components, palettes, and fonts; record audience, required views, and constraints; export a project-specific DESIGN.md or portable JSON board.
- **For agents:** install the discovery skill or one of 22 style skills. Each style skill includes three implementation entrypoints, local visual references, scoped CSS, fonts, licenses, and design reasoning.

Preview interactions use local demo state. Boards live in the browser and can be exported/imported; there is no account, database, or payment service.

## Run locally

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. Development uses webpack. Where filesystem events are restricted, use `WATCHPACK_POLLING=true npm run dev`.

```sh
npm run typecheck
npm test
npm run check:kits
npm run build
npm run check:site
PORT=3001 npm start
```

The production build creates a provider-independent static export in `out/`. The preview server serves that export; `PORT` defaults to 3000. The For agents page uses the current host in its installation commands, so the same commands work locally and on a published static site.

## Install design skills

From a local checkout:

```sh
npx skills add . --list
npx skills add . --skill designkit-claymorphism
```

From a running site:

```sh
npx skills add http://127.0.0.1:3001 --skill designkit
npx skills add http://127.0.0.1:3001 --skill designkit-wabi-sabi
```

After the skills are published to the repository's default branch, GitHub installation uses:

```sh
npx skills add arboydev27/designkit --skill designkit-claymorphism
```

The CLI lets the user choose agent and project/global scope. Installing a skill does not star the repository. Direct ZIP downloads are also available on the For agents page. The site exposes a standard `.well-known/agent-skills/index.json` with archive digests.

## Reuse an example or component

Download a source ZIP on any example page. Copy the folder into a React/TypeScript project and import its `ExampleApp.tsx`. It includes local CSS, native controls, default fonts and their licenses, tokens, an integration guide, and original desktop/mobile references.

Playground JSON exports preserve the exact choices under `$extensions["dev.designkit"].settings`. Pass those settings to `ExampleApp` or edit the example/recipe data. A source ZIP contains its default pairing; if switching to another library font, load that face from the downloadable font bundle or your existing project. No UI library or DesignKit runtime package is required.

For a configured shadcn project, use a component page's registry command, for example:

```sh
npx shadcn@latest add http://127.0.0.1:3001/r/claymorphism-button.json
```

Registry items include the component, shared native controls, scoped CSS, font data, and licenses. They support normal React props and local project integration.

## Content and distribution

| Path | Purpose |
| --- | --- |
| `src/data/styles.ts` | Style descriptions, source references, and suggested pairings |
| `src/data/examples.ts` | 66 authored project contexts and palettes |
| `src/data/recipes.ts` | Geometry, materials, composition, and motion guidance |
| `src/components/kits/` | Interactive renderers, playgrounds, components, and boards |
| `src/lib/kit-tokens.ts` | Normalization, readable colors, CSS/Tailwind/token exports |
| `scripts/generate-kits.mts` | Source ZIPs, skills, Markdown/JSON, registry, and discovery |
| `skills/` | Portable skill packages committed for GitHub installation |
| `public/previews/` | Original browser-captured desktop/mobile references |
| `public/fonts/licenses/` | Original font licenses |

Builds regenerate `public/kits/`, `public/r/`, `public/llms.txt`, and the discovery endpoint. These distribution outputs are ignored in Git. Authored skill folders and screenshots are committed. Refresh affected screenshots when changing example content, typography, or materials.

Machine-readable entrypoints are `/llms.txt`, `/kits/catalog.json`, `/kits/styles/<id>.md`, `/kits/styles/<id>.json`, `/kits/examples/<id>.json`, and `/r/<component-id>.json`. Records include a library version and content digest. MCP remains a possible future delivery layer.

## Quality and contributions

See [the review evidence](docs/quality.md), [implementation scope](docs/library-expansion.md), and [the interface direction](DESIGN.md). CI checks types, unit behavior, source/package integrity, the production export, and local links/assets. Screenshots and functional skill evaluations support review; no universal accessibility or performance score is claimed.

Contribute a coherent project context, reusable pattern, or style refinement with its reasoning, source, responsive behavior, and licenses. Preserve the user's content and chosen stack in skill instructions. Prefer original code and artwork over third-party screenshots or copied proprietary interfaces.

Original DesignKit code and examples are [MIT licensed](LICENSE). Bundled fonts retain their original SIL Open Font Licenses. Oi and Karrik provenance is documented under `public/fonts/` and in DESIGN.md.
