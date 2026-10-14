import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { kits, components } from "../src/data/kits";
import { examples } from "../src/data/examples";
import {
  exportCss,
  exportDesignTokens,
  exportTailwind,
} from "../src/lib/kit-tokens";
import { kitVersion, repositoryUrl, siteUrl } from "../src/data/kit-types";
import {
  readZipFiles as unzip,
  checkImportClosure as checkClosure,
  checkTypescript,
} from "./lib/distribution.mjs";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFile(path.join(root, file));
const json = async (file: string) => JSON.parse((await read(file)).toString());
const controlsSource = await read("src/components/kits/KitControls.tsx");
const cssSource = await read("src/components/kits/kit.css");
const canvasSource = (await read("src/components/kits/ExampleCanvas.tsx"))
  .toString()
  .replaceAll("../../data/kit-types", "./types")
  .replaceAll("../../lib/kit-tokens", "./tokens");
const originalFontFaces = [
  ...(await read("src/app/fonts.css"))
    .toString()
    .matchAll(/@font-face\s*\{[^}]+\}/g),
].map((match) => ({
  family: match[0].match(/font-family:\s*['"]([^'"]+)['"]/)![1],
  file: match[0].match(/url\(['"]?\/fonts\/([^)'"\s]+)['"]?\)/)![1],
}));
const originalFonts = new Map(
  await Promise.all(
    originalFontFaces.map(
      async (face) =>
        [face.file, await read(`public/fonts/${face.file}`)] as const,
    ),
  ),
);
function checkSharedSource(files: Map<string, Buffer>) {
  assert.deepEqual(
    files.get("KitControls.tsx"),
    controlsSource,
    "Copied controls are stale",
  );
  assert.deepEqual(files.get("kit.css"), cssSource, "Copied CSS is stale");
  if (files.has("ExampleCanvas.tsx"))
    assert.equal(
      files.get("ExampleCanvas.tsx")!.toString(),
      canvasSource,
      "Copied renderer is stale",
    );
}
const sourcePackages = new Map<string, Buffer>();
function collectSources(prefix: string, files: Map<string, Buffer>) {
  for (const [name, content] of files)
    sourcePackages.set(`${prefix}/${name}`, content);
}
async function checkLocalRecords(value: unknown) {
  if (typeof value === "string" && /^\/(kits|r|previews|fonts)\//.test(value)) {
    const file = path.join(
      root,
      "public",
      decodeURIComponent(value.split(/[?#]/)[0]),
    );
    assert.ok(
      (await fs.stat(file)).isFile(),
      `Not a downloadable file: ${value}`,
    );
  } else if (Array.isArray(value)) {
    for (const entry of value) await checkLocalRecords(entry);
  } else if (value && typeof value === "object") {
    for (const entry of Object.values(value)) await checkLocalRecords(entry);
  }
}
function checkMetadata(
  record: {
    version: string;
    contentDigest: string;
    repository: string;
    homepage: string;
  },
  digest: string,
) {
  assert.equal(record.version, kitVersion);
  assert.equal(record.contentDigest, digest);
  assert.equal(record.repository, repositoryUrl);
  assert.equal(record.homepage, siteUrl);
}
async function checkFonts(
  files: Map<string, Buffer>,
  kit: (typeof kits)[number],
) {
  const fonts = files.get("fonts.css")?.toString();
  assert.ok(fonts, `${kit.style.id}: fonts.css missing`);
  for (const family of new Set(
    kit.examples.flatMap((example) => Object.values(example.fonts)),
  )) {
    assert.ok(
      fonts.includes(`'${family}'`) || fonts.includes(`"${family}"`),
      `${kit.style.id}: missing font face ${family}`,
    );
    const name = `licenses/${family.toLowerCase().replace(/[^a-z0-9]/g, "")}.txt`;
    assert.deepEqual(
      files.get(name),
      await read(`public/fonts/${name}`),
      `${kit.style.id}: wrong license for ${family}`,
    );
  }
  for (const [name, bytes] of files)
    if (name.startsWith("fonts/"))
      assert.deepEqual(
        bytes,
        await read(`public/${name}`),
        `${kit.style.id}: modified font bytes`,
      );
}
const catalog = await json("public/kits/catalog.json");
assert.equal(catalog.styles.length, kits.length);
checkMetadata(catalog, catalog.contentDigest);
await checkLocalRecords(catalog);
assert.match(catalog.contentDigest, /^[a-f0-9]{64}$/);
for (const kit of kits) {
  const style = await json(`public/kits/styles/${kit.style.id}.json`);
  checkMetadata(style, catalog.contentDigest);
  assert.equal(style.style.id, kit.style.id);
  await checkLocalRecords(style);
  for (const example of kit.examples) {
    const files = unzip(await read(`public/kits/examples/${example.id}.zip`));
    checkClosure(files);
    collectSources(`examples/${example.id}`, files);
    await checkFonts(files, kit);
    checkSharedSource(files);
    assert.deepEqual(
      files.get("LICENSE"),
      await read("LICENSE"),
      `${example.id}: source license differs`,
    );
    for (const [name, content] of files)
      if (name.startsWith("previews/"))
        assert.deepEqual(
          content,
          await read(`public/${name}`),
          `${example.id}: stale reference ${name}`,
        );
    assert.equal(
      files.get("tokens.css")?.toString(),
      exportCss(example, kit.recipe),
    );
    assert.equal(
      files.get("tailwind.css")?.toString(),
      exportTailwind(example, kit.recipe),
    );
    assert.deepEqual(
      JSON.parse(files.get("tokens.json")!.toString()),
      exportDesignTokens(example, kit.recipe),
    );
    const record = await json(`public/kits/examples/${example.id}.json`);
    assert.deepEqual([...files.keys()].sort(), record.files.sort());
    checkMetadata(record, catalog.contentDigest);
    await checkLocalRecords(record);
    assert.deepEqual(record.tokens, exportDesignTokens(example, kit.recipe));
    assert.ok(
      files.has("ExampleApp.tsx") &&
        files.has("DESIGN.md") &&
        files.has("LICENSE"),
    );
  }
}
const installed = new Map<string, Buffer>();
for (const component of components) {
  const item = await json(`public/r/${component.id}.json`);
  assert.equal(item.name, component.id);
  assert.equal(item.type, "registry:ui");
  checkMetadata(item.meta, catalog.contentDigest);
  assert.ok(
    item.docs.includes("import "),
    `${component.id}: usage instructions missing`,
  );
  assert.deepEqual(item.dependencies, ["react"]);
  assert.ok(Array.isArray(item.files) && item.files.length > 0);
  for (const file of item.files) {
    assert.ok(
      file.target.startsWith("@components/designkit/"),
      `${component.id}: unexpected registry target ${file.target}`,
    );
    const target = file.target.replace(/^@components\//, "components/");
    const bytes = Buffer.from(file.content);
    if (installed.has(target))
      assert.deepEqual(
        bytes,
        installed.get(target),
        `Conflicting registry target: ${target}`,
      );
    installed.set(target, bytes);
  }
  const archive = unzip(
    await read(`public/kits/components/${component.id}.zip`),
  );
  checkClosure(archive);
  checkSharedSource(archive);
  assert.deepEqual(
    archive.get("LICENSE"),
    await read("LICENSE"),
    `${component.id}: source license differs`,
  );
  collectSources(`components/${component.id}`, archive);
  assert.equal(
    archive.get(`${component.id}.tsx`)?.toString(),
    item.files[0].content,
  );
  const record = await json(`public/kits/components/${component.id}.json`);
  checkMetadata(record, catalog.contentDigest);
  await checkLocalRecords(record);
  assert.deepEqual([...archive.keys()].sort(), [...record.files].sort());
  assert.ok(
    archive.has("FONT-LICENSES.md") &&
      archive.has("LICENSE") &&
      archive.has("INTEGRATION.md"),
  );
  for (const file of item.files) {
    const name = path.posix.basename(file.target);
    if (name.endsWith("-FONT-LICENSES.md"))
      assert.equal(archive.get("FONT-LICENSES.md")?.toString(), file.content);
    else assert.equal(archive.get(name)?.toString(), file.content);
  }
  const kit = kits.find((entry) => entry.style.id === component.styleId)!;
  const expectedLicenses = await Promise.all(
    [
      ...new Set(
        kit.examples.flatMap((example) => Object.values(example.fonts)),
      ),
    ].map(async (family) =>
      (
        await read(
          `public/fonts/licenses/${family.toLowerCase().replace(/[^a-z0-9]/g, "")}.txt`,
        )
      ).toString(),
    ),
  );
  for (const fontLicense of expectedLicenses)
    assert.ok(
      archive.get("FONT-LICENSES.md")!.toString().includes(fontLicense),
      `${component.id}: original font license missing`,
    );
  const inlineFonts = archive.get(`${kit.style.id}-fonts.css`)!.toString();
  const includedFamilies = new Set(
    kit.examples.flatMap((example) => Object.values(example.fonts)),
  );
  const packagedFontFiles = new Set<string>();
  for (const face of inlineFonts.matchAll(/@font-face\s*\{[^}]+\}/g)) {
    const family = face[0].match(/font-family:\s*['"]([^'"]+)['"]/)![1];
    const encoded = face[0].match(
      /data:font\/woff2;base64,([a-zA-Z0-9+/=]+)/,
    )?.[1];
    assert.ok(
      encoded && includedFamilies.has(family),
      `${component.id}: unexpected embedded font`,
    );
    const bytes = Buffer.from(encoded, "base64");
    const original = originalFontFaces.find(
      (entry) =>
        entry.family === family && originalFonts.get(entry.file)!.equals(bytes),
    );
    assert.ok(original, `${component.id}: modified embedded font ${family}`);
    packagedFontFiles.add(original.file);
  }
  assert.deepEqual(
    [...packagedFontFiles].sort(),
    [
      ...new Set(
        originalFontFaces
          .filter((face) => includedFamilies.has(face.family))
          .map((face) => face.file),
      ),
    ].sort(),
    `${component.id}: missing embedded font face`,
  );
  const usage = item.docs.match(/```tsx\n([\s\S]*?)```/)?.[1];
  assert.ok(usage, `${component.id}: no typed usage example`);
  sourcePackages.set(
    `components/${component.id}/Usage.tsx`,
    Buffer.from(usage),
  );
}
checkClosure(installed);
collectSources("registry", installed);
const registry = await json("public/r/registry.json");
assert.deepEqual(
  registry.items.map((item: { name: string }) => item.name).sort(),
  components.map((component) => component.id).sort(),
);
const discovery = await json("public/.well-known/agent-skills/index.json");
assert.equal(
  discovery.$schema,
  "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
);
assert.deepEqual(
  discovery.skills.map((skill: { name: string }) => skill.name).sort(),
  ["designkit", ...kits.map((kit) => `designkit-${kit.style.id}`)].sort(),
);
for (const skill of discovery.skills) {
  assert.equal(skill.type, "archive");
  assert.equal(skill.url, `/kits/skills/${skill.name}.zip`);
  assert.ok(skill.description && skill.description.length <= 1024);
  const bytes = await read(`public${skill.url}`);
  assert.equal(
    skill.digest,
    `sha256:${createHash("sha256").update(bytes).digest("hex")}`,
  );
  const archive = unzip(bytes);
  checkClosure(archive);
  collectSources(`skills/${skill.name}`, archive);
  assert.deepEqual(archive.get("LICENSE"), await read("LICENSE"));
  const entry = (await read(`skills/${skill.name}/SKILL.md`)).toString();
  assert.ok(entry.startsWith(`---\nname: ${skill.name}\n`));
  assert.ok(entry.length < 10_000);
  for (const match of entry.matchAll(/\]\(([^)]+)\)/g)) {
    if (!/^https?:/.test(match[1]))
      assert.ok(
        archive.has(match[1]),
        `${skill.name}: missing reference ${match[1]}`,
      );
  }
  for (const [name, content] of archive) {
    assert.deepEqual(
      content,
      await read(`skills/${skill.name}/${name}`),
      `${skill.name}: archived resource differs: ${name}`,
    );
  }
}
const fontBundle = unzip(await read("public/kits/fonts.zip"));
checkClosure(fontBundle);
for (const kit of kits) await checkFonts(fontBundle, kit);
const checkedSources = checkTypescript(sourcePackages, root);
console.log(
  `Verified ${examples.length} complete example archives, ${components.length} component archives/registry payloads, and ${discovery.skills.length} skill packages with ${checkedSources} strictly compiled copied source files, coherent exports, metadata, registry targets, original fonts/licenses, CRCs, and digests.`,
);
