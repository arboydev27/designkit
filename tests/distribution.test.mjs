import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { zipFiles } from "../scripts/lib/zip.mjs";
import {
  readZipFiles,
  checkImportClosure,
  checkTypescript,
} from "../scripts/lib/distribution.mjs";
import { inspectStaticSite } from "../scripts/lib/static-site.mjs";

const repo =
  process.env.DESIGNKIT_TEST_ROOT || path.resolve(import.meta.dirname, "..");
test("source integrity checks reject named imports that file-existence checks accept", () => {
  const files = new Map([
    [
      "consumer.ts",
      Buffer.from(
        "import { missing } from './values'; export const result = missing;",
      ),
    ],
    ["values.ts", Buffer.from("export const available = 1;")],
  ]);
  checkImportClosure(files);
  assert.throws(
    () => checkTypescript(files, repo),
    /no exported member 'missing'/,
  );
  files.set(
    "consumer.ts",
    Buffer.from(
      "import { available } from './values'; export const result = available;",
    ),
  );
  assert.equal(checkTypescript(files, repo), 2);
  files.set("consumer.ts", Buffer.from("import 'lucide-react';"));
  assert.throws(
    () => checkImportClosure(files),
    /undeclared dependency lucide-react/,
  );
});
test("ZIP verification checks directory agreement, decompressed CRCs, and safe extraction paths", () => {
  const bytes = zipFiles({
    "reference.txt": "123456789",
    "folder/value.txt": "Original source",
  });
  assert.equal(
    readZipFiles(bytes).get("reference.txt").toString(),
    "123456789",
  );
  // The standard CRC-32 check value is independent of our implementation.
  const single = zipFiles({ "reference.txt": "123456789" });
  assert.equal(single.readUInt32LE(14), 0xcbf43926);
  const corrupt = Buffer.from(single);
  corrupt.writeUInt32LE(0, 14);
  const end = corrupt.length - 22,
    directory = corrupt.readUInt32LE(end + 16);
  corrupt.writeUInt32LE(0, directory + 16);
  assert.throws(() => readZipFiles(corrupt), /checksum differs/);
  const renamed = Buffer.from(single);
  renamed[30] = 120;
  assert.throws(() => readZipFiles(renamed), /filename records differ/);
  for (const unsafe of [
    "/absolute",
    "../escape",
    "a/../escape",
    "a\\escape",
    "C:/escape",
    "",
    "a//b",
    "a\0b",
  ])
    assert.throws(() => zipFiles({ [unsafe]: "" }), /Archive paths/);
});
test("static audit resolves relative assets, CSS fonts, fragments, and actual directory pages", async () => {
  const root = await fs.mkdtemp(
    path.join(os.tmpdir(), "designkit-static-test-"),
  );
  try {
    await fs.mkdir(path.join(root, "page"), { recursive: true });
    await fs.mkdir(path.join(root, "empty"));
    await fs.mkdir(path.join(root, "assets"));
    await fs.writeFile(
      path.join(root, "index.html"),
      '<a href="/page/#content">Page</a><a href="/empty/">Broken</a><a href="/#saved">Client route</a><a href="/#unknown">Unknown route</a><script src="/assets/script.js">const example = \'<a href="/fiction/">\';</script>',
    );
    await fs.writeFile(
      path.join(root, "page/index.html"),
      '<div id="content"></div><a href="#missing">Broken anchor</a><link href="../assets/site.css" rel="stylesheet"><img srcset="../assets/image.webp 1x, ../assets/missing.webp 2x">',
    );
    await fs.writeFile(
      path.join(root, "assets/site.css"),
      '@font-face { src: url("./missing.woff2"); }',
    );
    await fs.writeFile(path.join(root, "assets/image.webp"), "image");
    await fs.writeFile(path.join(root, "assets/script.js"), "script");
    const options = { clientFragments: { "/": ["saved"] } };
    const result = await inspectStaticSite(root, options);
    assert.equal(result.pages, 2);
    assert.deepEqual(
      result.failures.sort(),
      [
        "assets/site.css: ./missing.woff2",
        "index.html: /empty/",
        "index.html: missing fragment /#unknown",
        "page/index.html: ../assets/missing.webp",
        "page/index.html: missing fragment #missing",
      ].sort(),
    );
    await fs.writeFile(path.join(root, "empty/index.html"), "A real route");
    await fs.writeFile(path.join(root, "assets/missing.webp"), "image");
    await fs.writeFile(path.join(root, "assets/missing.woff2"), "font");
    await fs.appendFile(
      path.join(root, "page/index.html"),
      '<div id="missing"></div>',
    );
    await fs.writeFile(
      path.join(root, "index.html"),
      '<a href="/#saved">Client route</a><a href="/page/#content">Page</a>',
    );
    assert.deepEqual((await inspectStaticSite(root, options)).failures, []);
  } finally {
    await fs.rm(root, { recursive: true, force: true });
  }
});
