import fs from "node:fs/promises";
import path from "node:path";

async function listFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? listFiles(path.join(directory, entry.name))
          : [path.join(directory, entry.name)],
      ),
    )
  ).flat();
}
function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([\da-f]+);/gi, (_, n) =>
      String.fromCodePoint(parseInt(n, 16)),
    );
}
function attributes(html) {
  const result = [];
  // Script strings can resemble markup; only actual HTML tags provide references.
  const markup = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/(<script\b[^>]*>)[\s\S]*?<\/script>/gi, "$1</script>");
  for (const tag of markup.matchAll(/<[a-z][^>]*>/gi)) {
    for (const attr of tag[0].matchAll(
      /\b(href|src|srcset|poster|action|id|name)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi,
    )) {
      const key = attr[1].toLowerCase(),
        value = decodeEntities(attr[2] ?? attr[3] ?? attr[4]);
      if (key === "srcset") {
        if (!value.startsWith("data:"))
          for (const candidate of value.split(","))
            result.push(["src", candidate.trim().split(/\s+/)[0]]);
      } else result.push([key, value]);
    }
  }
  return result;
}
function cssReferences(css) {
  return [
    ...css
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .matchAll(
        /url\(\s*(?:"([^"]+)"|'([^']+)'|([^\s)]+))\s*\)|@import\s+(?:"([^"]+)"|'([^']+)')/gi,
      ),
  ].map((match) => match[1] ?? match[2] ?? match[3] ?? match[4] ?? match[5]);
}

export async function inspectStaticSite(
  directory,
  { clientFragments = {} } = {},
) {
  const root = path.resolve(directory);
  const files = await listFiles(root),
    pages = files.filter((file) => file.endsWith(".html"));
  const origin = "https://static.designkit.test";
  const failures = [],
    cache = new Map(),
    anchors = new Map();
  let checked = 0;
  async function contents(file) {
    if (!cache.has(file)) cache.set(file, await fs.readFile(file, "utf8"));
    return cache.get(file);
  }
  async function resolveFile(pathname) {
    let decoded;
    try {
      decoded = decodeURIComponent(pathname);
    } catch {
      return null;
    }
    const target = path.resolve(root, `.${decoded}`);
    if (target !== root && !target.startsWith(`${root}${path.sep}`))
      return null;
    for (const candidate of [
      target,
      path.join(target, "index.html"),
      `${target}.html`,
    ]) {
      try {
        if ((await fs.stat(candidate)).isFile()) return candidate;
      } catch {}
    }
    return null;
  }
  async function checkReference(file, reference, checkFragment = false) {
    if (
      !reference ||
      /^(?:data:|mailto:|tel:|javascript:|blob:)/i.test(reference)
    )
      return;
    const relative = path.relative(root, file).split(path.sep).join("/");
    const pagePath = relative.endsWith("index.html")
      ? relative.slice(0, -10)
      : relative;
    let url;
    try {
      url = new URL(reference, `${origin}/${pagePath}`);
    } catch {
      failures.push(`${relative}: invalid URL ${reference}`);
      return;
    }
    if (url.origin !== origin) return;
    const target = await resolveFile(url.pathname);
    if (!target) {
      failures.push(`${relative}: ${reference}`);
      return;
    }
    checked++;
    if (checkFragment && url.hash && target.endsWith(".html")) {
      if (!anchors.has(target))
        anchors.set(
          target,
          new Set(
            attributes(await contents(target))
              .filter(([key]) => key === "id" || key === "name")
              .map(([, value]) => value),
          ),
        );
      let fragment;
      try {
        fragment = decodeURIComponent(url.hash.slice(1));
      } catch {
        fragment = url.hash.slice(1);
      }
      const route =
        `/${path.relative(root, target).split(path.sep).join("/")}`.replace(
          /index\.html$/,
          "",
        );
      if (
        fragment &&
        !anchors.get(target).has(fragment) &&
        !clientFragments[route]?.includes(fragment)
      )
        failures.push(`${relative}: missing fragment ${reference}`);
    }
  }
  for (const page of pages) {
    const html = await contents(page);
    for (const [key, reference] of attributes(html))
      if (!["id", "name"].includes(key))
        await checkReference(page, reference, key === "href");
    for (const style of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi))
      for (const reference of cssReferences(style[1]))
        await checkReference(page, reference);
  }
  for (const file of files.filter((file) => file.endsWith(".css")))
    for (const reference of cssReferences(await contents(file)))
      await checkReference(file, reference);
  return { checked, pages: pages.length, failures };
}
