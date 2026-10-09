import fs from "node:fs/promises";
import ts from "typescript";
const catalog = await fs.readFile(
  new URL("../src/data/styles.ts", import.meta.url),
  "utf8",
);
const compiled = ts.transpileModule(catalog, {
  compilerOptions: {
    module: ts.ModuleKind.ES2020,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;
const { styles } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);
const dir = new URL("../public/briefs/", import.meta.url);
await fs.mkdir(dir, { recursive: true });
for (const s of styles) {
  const fonts = (f) =>
    `https://fonts.google.com/specimen/${encodeURIComponent(f).replaceAll("%20", "+")}`;
  const bullets = (a) => a.map((x) => `- ${x}`).join("\n");
  const css = `:root {\n${s.palette.map((c) => `  --${c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}: ${c.hex};`).join("\n")}\n  --font-heading: '${s.fonts.heading}';\n  --font-body: '${s.fonts.body}';\n}`;
  const brief = [
    `# ${s.name} — design brief`,
    "A curated starting point from Form Atlas.",
    `## Direction\n\n${s.tagline}\n\n${s.description}\n\nCategory: ${s.category}`,
    `## Defining characteristics\n\n${bullets(s.traits)}`,
    `## Suggested color palette\n\n${bullets(s.palette.map((c) => `${c.name}: ${c.hex}`))}`,
    `## Suggested typography\n\nHeading: ${s.fonts.heading}\n${fonts(s.fonts.heading)}\n\nBody: ${s.fonts.body}\n${fonts(s.fonts.body)}\n\n${s.fonts.rationale}`,
    `## Works well for\n\n${bullets(s.useCases)}`,
    `## Lean into\n\n${bullets(s.tips)}`,
    `## Be mindful of\n\n${bullets(s.avoid)}`,
    `## Keywords\n\n${s.keywords.join(", ")}`,
    `## Starter CSS\n\n\`\`\`css\n${css}\n\`\`\``,
    ...(s.sources?.length
      ? [
          `## Further reading\n\n${bullets(s.sources.map((r) => `[${r.label}](${r.url})`))}`,
        ]
      : []),
    "---\nPalettes and font pairings are suggestions, not universal definitions. Adapt them to your project and check text contrast.",
  ].join("\n\n");
  await fs.writeFile(new URL(`${s.id}-design-brief.md`, dir), brief + "\n");
}
console.log(`Generated ${styles.length} design briefs.`);
