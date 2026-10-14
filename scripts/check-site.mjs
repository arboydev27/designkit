import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { tsImport } from "tsx/esm/api";
import { inspectStaticSite } from "./lib/static-site.mjs";

const root = path.resolve(import.meta.dirname, "../out");
const { libraryViews } = await tsImport(
  "../src/lib/library-navigation.ts",
  import.meta.url,
);
const catalog = JSON.parse(
  await fs.readFile(path.join(root, "kits/catalog.json"), "utf8"),
);
// Library hashes select hydrated views and styles rather than static DOM anchors.
const result = await inspectStaticSite(root, {
  clientFragments: {
    "/": [...libraryViews, ...catalog.styles.map((style) => style.id)],
  },
});
assert.ok(
  result.pages >= 294,
  "Build the complete static library before checking its links.",
);
assert.deepEqual(
  result.failures,
  [],
  "Static pages contain unresolved local routes, assets, or fragments.",
);
console.log(
  `Verified ${result.checked} local links/assets and fragments across ${result.pages} static pages, including CSS dependencies.`,
);
