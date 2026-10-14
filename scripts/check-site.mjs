import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "../out");
async function files(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? files(path.join(directory, entry.name))
          : [path.join(directory, entry.name)],
      ),
    )
  ).flat();
}
const pages = (await files(root)).filter((file) => file.endsWith(".html"));
assert.ok(
  pages.length >= 294,
  "Build the complete static library before checking its links.",
);
const failures = [];
let checked = 0;
for (const page of pages) {
  const html = await fs.readFile(page, "utf8");
  for (const match of html.matchAll(
    /(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g,
  )) {
    const url = decodeURIComponent(match[1]);
    if (url === "/") continue;
    try {
      await fs.stat(path.join(root, url));
      checked++;
    } catch {
      failures.push(`${path.relative(root, page)}: ${url}`);
    }
  }
}
assert.deepEqual(
  failures,
  [],
  "Static pages contain unresolved local links or assets.",
);
console.log(
  `Verified ${checked} local links/assets across ${pages.length} static pages.`,
);
