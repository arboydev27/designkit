import assert from "node:assert/strict";
import path from "node:path";
import { inflateRawSync } from "node:zlib";
import ts from "typescript";

const crcTable = Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit++)
    value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  return value >>> 0;
});
function crc32(bytes) {
  let value = 0xffffffff;
  for (const byte of bytes)
    value = crcTable[(value ^ byte) & 255] ^ (value >>> 8);
  return (value ^ 0xffffffff) >>> 0;
}
function safePath(name) {
  return (
    name &&
    !/^[a-z]:/i.test(name) &&
    !/[\\\0]/.test(name) &&
    !name.split("/").some((part) => ["", ".", ".."].includes(part))
  );
}

// Validate both ZIP directories and checksums, so corrupt but decompressible files fail.
export function readZipFiles(bytes) {
  assert.ok(bytes.length >= 22, "Truncated ZIP");
  const end = bytes.length - 22;
  assert.equal(bytes.readUInt32LE(end), 0x06054b50, "ZIP end record missing");
  assert.equal(bytes.readUInt16LE(end + 4), 0, "Multi-disk ZIP is unsupported");
  assert.equal(bytes.readUInt16LE(end + 6), 0, "Multi-disk ZIP is unsupported");
  const count = bytes.readUInt16LE(end + 10);
  assert.equal(bytes.readUInt16LE(end + 8), count, "ZIP entry count differs");
  const directoryStart = bytes.readUInt32LE(end + 16);
  assert.equal(
    directoryStart + bytes.readUInt32LE(end + 12),
    end,
    "ZIP directory size differs",
  );
  const files = new Map();
  let directoryOffset = directoryStart;
  let localEnd = 0;
  for (let index = 0; index < count; index++) {
    assert.ok(directoryOffset + 46 <= end, "Truncated ZIP directory");
    assert.equal(
      bytes.readUInt32LE(directoryOffset),
      0x02014b50,
      "ZIP directory entry missing",
    );
    const flags = bytes.readUInt16LE(directoryOffset + 8);
    assert.equal(
      flags & 9,
      0,
      "Encrypted ZIPs and data descriptors are unsupported",
    );
    const method = bytes.readUInt16LE(directoryOffset + 10);
    assert.ok(method === 0 || method === 8, "Unsupported ZIP compression");
    const crc = bytes.readUInt32LE(directoryOffset + 16);
    const compressedSize = bytes.readUInt32LE(directoryOffset + 20);
    const size = bytes.readUInt32LE(directoryOffset + 24);
    const nameLength = bytes.readUInt16LE(directoryOffset + 28);
    const recordSize =
      46 +
      nameLength +
      bytes.readUInt16LE(directoryOffset + 30) +
      bytes.readUInt16LE(directoryOffset + 32);
    assert.ok(
      directoryOffset + recordSize <= end,
      "Truncated ZIP directory name",
    );
    const name = bytes
      .subarray(directoryOffset + 46, directoryOffset + 46 + nameLength)
      .toString();
    assert.ok(safePath(name), `Unsafe archive path: ${name}`);
    assert.ok(!files.has(name), `Duplicate archive path: ${name}`);
    const start = bytes.readUInt32LE(directoryOffset + 42);
    assert.equal(start, localEnd, `ZIP local offset differs: ${name}`);
    assert.ok(start + 30 <= directoryStart, "Truncated ZIP local header");
    assert.equal(
      bytes.readUInt32LE(start),
      0x04034b50,
      `ZIP local record missing: ${name}`,
    );
    assert.equal(
      bytes.readUInt16LE(start + 6),
      flags,
      `ZIP flags differ: ${name}`,
    );
    assert.equal(
      bytes.readUInt16LE(start + 8),
      method,
      `ZIP compression differs: ${name}`,
    );
    assert.equal(
      bytes.readUInt32LE(start + 14),
      crc,
      `ZIP CRC records differ: ${name}`,
    );
    assert.equal(
      bytes.readUInt32LE(start + 18),
      compressedSize,
      `ZIP size records differ: ${name}`,
    );
    assert.equal(
      bytes.readUInt32LE(start + 22),
      size,
      `ZIP size records differ: ${name}`,
    );
    const localNameLength = bytes.readUInt16LE(start + 26);
    const payloadStart =
      start + 30 + localNameLength + bytes.readUInt16LE(start + 28);
    assert.equal(
      bytes.subarray(start + 30, start + 30 + localNameLength).toString(),
      name,
      "ZIP filename records differ",
    );
    assert.ok(
      payloadStart + compressedSize <= directoryStart,
      `Truncated ZIP payload: ${name}`,
    );
    const compressed = bytes.subarray(
      payloadStart,
      payloadStart + compressedSize,
    );
    const content = method === 8 ? inflateRawSync(compressed) : compressed;
    assert.equal(
      content.length,
      size,
      `ZIP uncompressed size differs: ${name}`,
    );
    assert.equal(crc32(content), crc, `ZIP checksum differs: ${name}`);
    files.set(name, content);
    localEnd = payloadStart + compressedSize;
    directoryOffset += recordSize;
  }
  assert.equal(localEnd, directoryStart, "Unexpected ZIP local records");
  assert.equal(directoryOffset, end, "Unexpected ZIP directory records");
  return files;
}

export function checkImportClosure(files, allowedDependencies = ["react"]) {
  for (const [name, bytes] of files) {
    if (!/\.(tsx?|css)$/.test(name)) continue;
    if (!name.endsWith(".css"))
      for (const match of bytes
        .toString()
        .matchAll(/(?:from\s*|import\s*)['"]([^.'"][^'"]*)['"]/g)) {
        const dependency = match[1].startsWith("@")
          ? match[1].split("/").slice(0, 2).join("/")
          : match[1].split("/")[0];
        assert.ok(
          allowedDependencies.includes(dependency),
          `${name} uses undeclared dependency ${dependency}`,
        );
      }
    const refs = name.endsWith(".css")
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
        [
          target,
          `${target}.ts`,
          `${target}.tsx`,
          `${target}/index.ts`,
          `${target}/index.tsx`,
        ].some((candidate) => files.has(candidate)),
        `${name} cannot resolve ${match[1]}`,
      );
    }
  }
}

// Keep copied packages in memory while using only the existing destination dependencies.
export function checkTypescript(files, root) {
  const virtualRoot = path.join(root, ".designkit-package-check");
  const sources = new Map(
    [...files]
      .filter(([name]) => /\.tsx?$/.test(name))
      .map(([name, content]) => [
        path.join(virtualRoot, name),
        content.toString(),
      ]),
  );
  const directories = new Set();
  for (const file of sources.keys()) {
    for (
      let parent = path.dirname(file);
      parent.startsWith(virtualRoot);
      parent = path.dirname(parent)
    )
      directories.add(parent);
  }
  const options = {
    strict: true,
    noEmit: true,
    jsx: ts.JsxEmit.ReactJSX,
    target: ts.ScriptTarget.ES2017,
    lib: ["lib.esnext.d.ts", "lib.dom.d.ts", "lib.dom.iterable.d.ts"],
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    skipLibCheck: true,
  };
  const host = ts.createCompilerHost(options);
  const exists = host.fileExists.bind(host),
    read = host.readFile.bind(host),
    directoryExists = host.directoryExists.bind(host);
  host.fileExists = (file) => sources.has(file) || exists(file);
  host.readFile = (file) => sources.get(file) ?? read(file);
  host.directoryExists = (directory) =>
    directories.has(directory) || directoryExists(directory);
  host.getSourceFile = (file, languageVersion) => {
    const source = host.readFile(file);
    return source === undefined
      ? undefined
      : ts.createSourceFile(file, source, languageVersion, true);
  };
  const diagnostics = ts.getPreEmitDiagnostics(
    ts.createProgram([...sources.keys()], options, host),
  );
  assert.equal(
    diagnostics.length,
    0,
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (file) => file,
      getCurrentDirectory: () => root,
      getNewLine: () => "\n",
    }),
  );
  return sources.size;
}
