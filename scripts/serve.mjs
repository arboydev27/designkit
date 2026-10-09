import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../out");
const port = Number(process.env.PORT || 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

try {
  await stat(resolve(root, "index.html"));
} catch {
  console.error("Build the site first with npm run build.");
  process.exit(1);
}

createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }

  let path;
  try {
    path = resolve(root, `.${decodeURIComponent(new URL(request.url, "http://localhost").pathname)}`);
  } catch {
    response.writeHead(400).end("Invalid URL");
    return;
  }

  if (path !== root && !path.startsWith(root + sep)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  try {
    if ((await stat(path)).isDirectory()) path = resolve(path, "index.html");
    const body = await readFile(path);
    response.writeHead(200, {
      "Content-Type": types[extname(path)] || "application/octet-stream",
      "Content-Length": body.length,
      "X-Content-Type-Options": "nosniff",
    });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch {
    const body = await readFile(resolve(root, "404.html")).catch(() => "Not found");
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    response.end(request.method === "HEAD" ? undefined : body);
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`DesignKit is available at http://127.0.0.1:${port}`);
});
