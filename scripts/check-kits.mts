import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { inflateRawSync } from "node:zlib";
import { createHash } from "node:crypto";
import { kits, components } from "../src/data/kits";
import { examples } from "../src/data/examples";
import { exportCss } from "../src/lib/kit-tokens";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFile(path.join(root, file));
const json = async (file: string) => JSON.parse((await read(file)).toString());
function unzip(bytes: Buffer) {
  const files = new Map<string, Buffer>();
  let offset = 0;
  while (bytes.readUInt32LE(offset) === 0x04034b50) {
    const method = bytes.readUInt16LE(offset + 8),
      length = bytes.readUInt32LE(offset + 18),
      uncompressed = bytes.readUInt32LE(offset + 22);
    const nameLength = bytes.readUInt16LE(offset + 26),
      extraLength = bytes.readUInt16LE(offset + 28);
    const name = bytes
      .subarray(offset + 30, offset + 30 + nameLength)
      .toString();
    assert.ok(!name.startsWith("/") && !name.split("/").includes(".."), name);
    assert.ok(!files.has(name), `Duplicate archive path: ${name}`);
    const start = offset + 30 + nameLength + extraLength;
    const content =
      method === 8
        ? inflateRawSync(bytes.subarray(start, start + length))
        : bytes.subarray(start, start + length);
    assert.equal(content.length, uncompressed, name);
    files.set(name, content);
    offset = start + length;
  }
  assert.equal(bytes.readUInt32LE(offset), 0x02014b50);
  return files;
}
function checkClosure(files: Map<string, Buffer>) {
  for (const [name, bytes] of files) {
    if (!/\.(tsx?|css)$/.test(name)) continue;
    const refs = name.endsWith("css")
      ? [...bytes.toString().matchAll(/url\(['"]?(\.[^)'"\s]+)['"]?\)/g)]
      : [
          ...bytes
            .toString()
            .matchAll(/(?:from\s*|import\s*)['"](\.[^'"]+)['"]/g),
        ];
    for (const match of refs) {
      const target = path.posix.normalize(
        path.posix.join(path.posix.dirname(name), match[1]),
      );
      assert.ok(
        [target, `${target}.ts`, `${target}.tsx`].some((candidate) =>
          files.has(candidate),
        ),
        `${name} cannot resolve ${match[1]}`,
      );
    }
  }
}
const catalog = await json("public/kits/catalog.json");
assert.equal(catalog.styles.length, 22);
assert.match(catalog.contentDigest, /^[a-f0-9]{64}$/);
for (const kit of kits) {
  const style = await json(`public/kits/styles/${kit.style.id}.json`);
  assert.equal(style.contentDigest, catalog.contentDigest);
  for (const example of kit.examples) {
    const files = unzip(await read(`public/kits/examples/${example.id}.zip`));
    checkClosure(files);
    assert.equal(
      files.get("tokens.css")?.toString(),
      exportCss(example, kit.recipe),
    );
    const record = await json(`public/kits/examples/${example.id}.json`);
    assert.deepEqual([...files.keys()].sort(), record.files.sort());
    assert.equal(record.contentDigest, catalog.contentDigest);
    assert.ok(
      files.has("ExampleApp.tsx") &&
        files.has("DESIGN.md") &&
        files.has("LICENSE"),
    );
    for (const [name, bytes] of files)
      if (name.startsWith("fonts/")) {
        assert.deepEqual(
          bytes,
          await read(`public/${name}`),
          `${example.id}: modified font bytes`,
        );
        assert.ok(
          [...files.keys()].some((key) => key.startsWith("licenses/")),
          `${example.id}: font license missing`,
        );
      }
  }
}
for (const component of components) {
  const item = await json(`public/r/${component.id}.json`);
  assert.equal(item.name, component.id);
  assert.equal(item.type, "registry:ui");
  assert.equal(item.files.length, 6);
  const installed = new Map<string, Buffer>(
    item.files.map((file: { target: string; content: string }) => [
      path.posix.basename(file.target),
      Buffer.from(file.content),
    ]),
  );
  checkClosure(installed);
  const archive = unzip(
    await read(`public/kits/components/${component.id}.zip`),
  );
  checkClosure(archive);
  assert.equal(
    archive.get(`${component.id}.tsx`)?.toString(),
    item.files[0].content,
  );
  assert.ok(archive.has("FONT-LICENSES.md") && archive.has("LICENSE"));
}
const discovery = await json("public/.well-known/agent-skills/index.json");
assert.equal(discovery.skills.length, 23);
for (const skill of discovery.skills) {
  const bytes = await read(`public${skill.url}`);
  assert.equal(
    skill.digest,
    `sha256:${createHash("sha256").update(bytes).digest("hex")}`,
  );
  const archive = unzip(bytes);
  checkClosure(archive);
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
  for (const [name, content] of archive)
    if (name !== "LICENSE" || skill.name !== "designkit") {
      assert.deepEqual(
        content,
        await read(`skills/${skill.name}/${name}`),
        `${skill.name}: archived resource differs: ${name}`,
      );
    }
}
console.log(
  `Verified ${examples.length} complete example archives, ${components.length} component archives/registry payloads, and ${discovery.skills.length} skill packages with import closure, original fonts, license files, and archive digests.`,
);
