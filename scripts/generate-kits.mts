import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { kits } from "../src/data/kits";
import { examples } from "../src/data/examples";
import {
  kitVersion,
  siteUrl,
  type StyleKit,
  type DesignExample,
  type KitComponent,
} from "../src/data/kit-types";
import {
  exportCss,
  exportTailwind,
  exportDesignTokens,
  resolveTokens,
} from "../src/lib/kit-tokens";
import { styleGuide, exampleGuide } from "../src/lib/kit-guides";
import { zipFiles } from "./lib/zip.mjs";

const root = path.resolve(import.meta.dirname, "..");
const publicRoot = path.join(root, "public");
const read = (file: string) => fs.readFile(path.join(root, file), "utf8");
const write = async (file: string, value: string | Buffer) => {
  const target = path.join(root, file);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, value);
};
const json = (value: unknown) => JSON.stringify(value, null, 2) + "\n";
const [
  controlsSource,
  canvasSource,
  cssSource,
  tokensSource,
  typesSource,
  stylesSource,
  fontSource,
  license,
] = await Promise.all([
  read("src/components/kits/KitControls.tsx"),
  read("src/components/kits/ExampleCanvas.tsx"),
  read("src/components/kits/kit.css"),
  read("src/lib/kit-tokens.ts"),
  read("src/data/kit-types.ts"),
  read("src/data/styles.ts"),
  read("src/app/fonts.css"),
  read("LICENSE"),
]);
const fontFaces = [...fontSource.matchAll(/@font-face\s*\{[^}]+\}/g)].map(
  (match) => {
    const family = match[0].match(/font-family:\s*['"]([^'"]+)['"]/)?.[1];
    const file = match[0].match(/url\(['"]?\/fonts\/([^)'"\s]+)['"]?\)/)?.[1];
    if (!family || !file)
      throw new Error("A font declaration could not be packaged.");
    return { family, file, css: match[0] };
  },
);
const groupedFaces = new Map<string, typeof fontFaces>();
for (const face of fontFaces) {
  const key = `${face.family}:${face.file}:${face.css.match(/font-style:\s*([^;]+)/)?.[1]}`;
  groupedFaces.set(key, [...(groupedFaces.get(key) || []), face]);
}
const compactFaces = [...groupedFaces.values()].map((group) => {
  const weights = group.map((face) =>
    Number(face.css.match(/font-weight:\s*(\d+)/)?.[1] || 400),
  );
  const min = Math.min(...weights),
    max = Math.max(...weights);
  return {
    ...group[0],
    css: group[0].css.replace(
      /font-weight:\s*[^;]+/,
      `font-weight: ${min === max ? min : `${min} ${max}`}`,
    ),
  };
});
const digest = createHash("sha256")
  .update(json(kits))
  .update(controlsSource)
  .update(canvasSource)
  .update(cssSource)
  .update(tokensSource)
  .update(fontSource)
  .digest("hex");
const metadata = {
  version: kitVersion,
  contentDigest: digest,
  license: "MIT",
  fontsLicense: "OFL-1.1",
  source: "https://github.com/arboydev27/designkit",
};
const catalog = {
  ...metadata,
  styles: kits.map((kit) => ({
    id: kit.style.id,
    name: kit.style.name,
    category: kit.style.category,
    description: kit.style.description,
    examples: kit.examples.map((example) => ({
      id: example.id,
      brand: example.brand,
      kind: example.kind,
      headline: example.headline,
      url: `/examples/${example.id}/`,
    })),
    components: kit.components.map((component) => ({
      ...component,
      url: `/components/${component.id}/`,
    })),
    guide: `/kits/styles/${kit.style.id}.md`,
    json: `/kits/styles/${kit.style.id}.json`,
  })),
};
const commonTypes = stylesSource.slice(
  0,
  stylesSource.indexOf("// Palettes and type pairings"),
);
async function sharedFiles(kit: StyleKit, inlineFonts = false) {
  const families = new Set(
    kit.examples.flatMap((example) => Object.values(example.fonts)),
  );
  const faces = compactFaces.filter((face) => families.has(face.family));
  const files: Record<string, string | Buffer> = {
    "KitControls.tsx": controlsSource,
    "ExampleCanvas.tsx": canvasSource
      .replaceAll("../../data/kit-types", "./types")
      .replaceAll("../../lib/kit-tokens", "./tokens"),
    "types.ts": typesSource,
    "styles.ts": commonTypes,
    "tokens.ts": tokensSource
      .replaceAll("../data/kit-types", "./types")
      .replaceAll("../data/examples", "./examples"),
    "examples.ts": `import type { DesignExample } from './types';\nexport const examples: DesignExample[] = ${json(kit.examples)};\n`,
    "kit.css": cssSource,
    LICENSE: license,
  };
  for (const family of families) {
    const licenseName = family.toLowerCase().replace(/[^a-z0-9]/g, "");
    files[`licenses/${licenseName}.txt`] = await read(
      `public/fonts/licenses/${licenseName}.txt`,
    );
  }
  let fontsCss =
    "/* Original, unmodified OFL fonts. Preserve the bundled licenses. */\n";
  for (const face of faces) {
    const bytes = await fs.readFile(path.join(publicRoot, "fonts", face.file));
    files[`fonts/${face.file}`] = bytes;
    const url = inlineFonts
      ? `data:font/woff2;base64,${bytes.toString("base64")}`
      : `./fonts/${face.file}`;
    fontsCss += face.css.replace(/url\([^)]*\)/, `url('${url}')`) + "\n";
  }
  files["fonts.css"] = fontsCss;
  files["FONT-LICENSES.md"] =
    `# Bundled font licenses\n\n${[...families].map((family) => `- ${family}: original SIL OFL 1.1, see licenses/${family.toLowerCase().replace(/[^a-z0-9]/g, "")}.txt`).join("\n")}\n\nFont files are unmodified. The kit's MIT license does not replace the font licenses.\n`;
  return files;
}
function entryFiles(example: DesignExample, kit: StyleKit, prefix = ".") {
  return {
    "example.ts": `import type { DesignExample } from '${prefix}/types';\nexport const example: DesignExample = ${json(example)};\n`,
    "recipe.ts": `import type { StyleRecipe } from '${prefix}/types';\nexport const recipe: StyleRecipe = ${json(kit.recipe)};\n`,
    "ExampleApp.tsx": `"use client";\nimport ExampleCanvas from '${prefix}/ExampleCanvas';\nimport { example } from './example';\nimport { recipe } from './recipe';\nimport '${prefix}/kit.css';\nimport '${prefix}/fonts.css';\nexport default function ExampleApp() { return <ExampleCanvas example={example} recipe={recipe} />; }\n`,
  };
}
function componentSource(component: KitComponent, kit: StyleKit) {
  const name = component.id
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
  const symbol = {
    button: "KitButton",
    card: "KitCard",
    navigation: "KitNavigation",
    field: "KitField",
    dialog: "KitDialog",
    status: "KitStatus",
  }[component.kind];
  return `"use client";\nimport type { ComponentProps, CSSProperties } from 'react';\nimport { ${symbol} } from './KitControls';\nimport './kit.css';\nimport './${kit.style.id}-fonts.css';\nconst tokens = ${json(resolveTokens(kit.examples[0], kit.recipe).values)};\nexport default function ${name}(props: ComponentProps<typeof ${symbol}>) { return <div className="kit-component-surface kit-style-${kit.style.id}" style={tokens as CSSProperties}><${symbol} {...props} /></div>; }\n`;
}
const registryItems: {
  name: string;
  type: string;
  title: string;
  description: string;
}[] = [];
for (const kit of kits) {
  const shared = await sharedFiles(kit);
  const inline = await sharedFiles(kit, true);
  await write(
    `public/kits/styles/${kit.style.id}.json`,
    json({
      ...metadata,
      ...kit,
      guide: `/kits/styles/${kit.style.id}.md`,
      skill: `designkit-${kit.style.id}`,
    }),
  );
  await write(`public/kits/styles/${kit.style.id}.md`, styleGuide(kit));
  for (const example of kit.examples) {
    const guide = exampleGuide(example, kit);
    const files = {
      ...shared,
      ...entryFiles(example, kit),
      "DESIGN.md": guide,
      "tokens.css": exportCss(example, kit.recipe),
      "tailwind.css": exportTailwind(example, kit.recipe),
      "tokens.json": json(exportDesignTokens(example, kit.recipe)),
      "INTEGRATION.md": `# Use this example\n\nCopy this folder into an existing React/TypeScript project. Import ExampleApp.tsx from your page. The example uses native React controls and its own scoped CSS; no additional UI library or backend is required.\n\nThe fonts are self-hosted with their original licenses. Keep their relative paths when copying.\n\nAdapt example.ts, recipe.ts, and your destination project's content. Preview carts, tasks, and dialogs have local state only. Replace these interactions with the real project behavior where required.\n\nThe exact default tokens are in tokens.json and tokens.css. Tailwind v4 aliases are in tailwind.css.\n`,
    };
    await write(`public/kits/examples/${example.id}.zip`, zipFiles(files));
    await write(
      `public/kits/examples/${example.id}.json`,
      json({
        ...metadata,
        example,
        recipe: kit.recipe,
        tokens: exportDesignTokens(example, kit.recipe),
        files: Object.keys(files),
        source: `/kits/examples/${example.id}.zip`,
        guide: `/kits/examples/${example.id}.md`,
      }),
    );
    await write(`public/kits/examples/${example.id}.md`, guide);
    await write(
      `public/kits/examples/${example.id}.css`,
      exportCss(example, kit.recipe),
    );
    await write(
      `public/kits/examples/${example.id}.tokens.json`,
      json(exportDesignTokens(example, kit.recipe)),
    );
  }
  for (const component of kit.components) {
    const source = componentSource(component, kit);
    const fontLicenses = Object.entries(shared)
      .filter(([name]) => name.startsWith("licenses/"))
      .map(([name, content]) => `# ${name}\n\n${content}`)
      .join("\n\n");
    const payloadFiles = [
      {
        path: `registry/${kit.style.id}/${component.id}.tsx`,
        type: "registry:component",
        target: `@components/designkit/${component.id}.tsx`,
        content: source,
      },
      {
        path: "registry/shared/KitControls.tsx",
        type: "registry:component",
        target: "@components/designkit/KitControls.tsx",
        content: controlsSource,
      },
      {
        path: "registry/shared/kit.css",
        type: "registry:file",
        target: "@components/designkit/kit.css",
        content: cssSource,
      },
      {
        path: `registry/${kit.style.id}/fonts.css`,
        type: "registry:file",
        target: `@components/designkit/${kit.style.id}-fonts.css`,
        content: inline["fonts.css"],
      },
      {
        path: `registry/${kit.style.id}/FONT-LICENSES.md`,
        type: "registry:file",
        target: `@components/designkit/${kit.style.id}-FONT-LICENSES.md`,
        content: fontLicenses,
      },
      {
        path: "registry/shared/LICENSE",
        type: "registry:file",
        target: "@components/designkit/LICENSE",
        content: license,
      },
    ];
    const item = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: component.id,
      type: "registry:ui",
      title: component.name,
      description: `${kit.recipe.signature} Native ${component.kind} component with ${kit.style.name} tokens.`,
      dependencies: ["react"],
      files: payloadFiles,
    };
    await write(`public/r/${component.id}.json`, json(item));
    await write(`public/kits/components/${component.id}.tsx`, source);
    await write("public/kits/components/KitControls.tsx", controlsSource);
    await write("public/kits/components/kit.css", cssSource);
    await write(
      `public/kits/components/${kit.style.id}-fonts.css`,
      inline["fonts.css"],
    );
    await write(
      `public/kits/components/${component.id}.zip`,
      zipFiles({
        [`${component.id}.tsx`]: source,
        "KitControls.tsx": controlsSource,
        "kit.css": cssSource,
        [`${kit.style.id}-fonts.css`]: inline["fonts.css"],
        "FONT-LICENSES.md": fontLicenses,
        LICENSE: license,
      }),
    );
    await write(
      `public/kits/components/${component.id}.json`,
      json({
        ...metadata,
        component,
        recipe: kit.recipe,
        registry: `/r/${component.id}.json`,
        source: `/kits/components/${component.id}.tsx`,
      }),
    );
    registryItems.push({
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
    });
  }
  const skillName = `designkit-${kit.style.id}`;
  const skillRoot = `skills/${skillName}`;
  const entrypoint = `---\nname: ${skillName}\ndescription: ${JSON.stringify(`Apply or review ${kit.style.name} for a requested website or interface. Use when the user chooses ${kit.style.name} and needs a coherent visual direction, relevant examples, or reusable React patterns.`)}\nlicense: MIT\nmetadata:\n  version: ${JSON.stringify(kitVersion)}\n---\n\n# ${kit.style.name} with DesignKit\n\n${kit.recipe.signature}\n\nUse this direction to support the user's actual project, content, and chosen stack. It is not a requirement to reproduce a particular example or replace existing working interactions.\n\n## Apply the direction\n\n- Read [the style reference](references/style.md) for its composition, materials, useful decisions, and common mistakes.\n- Choose a relevant project context from the examples below. Read only its reference and inspect its implementation when it helps the task. You can compose another context using the same principles.\n- When using the React assets, copy the chosen entry folder with assets/shared and preserve their relative structure. Adapt the example data to the user's content; replace local demo state with required project behavior.\n- For another stack, translate the tokens, hierarchy, material, and interaction decisions into that stack rather than introducing React.\n- Preserve suitable fonts, components, and conventions in an existing project. Make a change when it materially supports this direction, not simply because a kit contains an alternative.\n\n## Example contexts\n\n${kit.examples.map((example) => `- **${example.brand} (${example.kind})**: [reference](references/examples/${example.id}.md), [React entry](assets/${example.id}/ExampleApp.tsx).`).join("\n")}\n\n## Evaluate the result\n\nCheck that ${kit.style.traits.map((trait) => trait.toLowerCase()).join(", ")} are expressed coherently. ${kit.recipe.composition} ${kit.recipe.motion}\n\nReview the actual rendered phone and desktop layouts, text contrast, focus order, native control affordances, relevant empty/error/loading states, and reduced-motion behavior. State what was checked and what remains unverified. Do not claim visual fidelity or accessibility from a successful build alone.\n\nKeep font licenses with redistributed assets. This skill supplies design guidance and local source; it does not authorize publishing, installations, or changes to unrelated project settings.\n`;
  await write(`${skillRoot}/SKILL.md`, entrypoint);
  await write(`${skillRoot}/references/style.md`, styleGuide(kit, "examples/"));
  await write(
    `${skillRoot}/references/kit.json`,
    json({ ...metadata, ...kit }),
  );
  for (const [name, content] of Object.entries(shared))
    await write(`${skillRoot}/assets/shared/${name}`, content);
  for (const example of kit.examples) {
    await write(
      `${skillRoot}/references/examples/${example.id}.md`,
      exampleGuide(example, kit),
    );
    for (const [name, content] of Object.entries(
      entryFiles(example, kit, "../shared"),
    ))
      await write(`${skillRoot}/assets/${example.id}/${name}`, content);
  }
  const archive: Record<string, string | Buffer> = {
    "SKILL.md": entrypoint,
    "references/style.md": styleGuide(kit, "examples/"),
    "references/kit.json": json({ ...metadata, ...kit }),
  };
  for (const [name, content] of Object.entries(shared))
    archive[`assets/shared/${name}`] = content;
  for (const example of kit.examples) {
    archive[`references/examples/${example.id}.md`] = exampleGuide(
      example,
      kit,
    );
    for (const [name, content] of Object.entries(
      entryFiles(example, kit, "../shared"),
    ))
      archive[`assets/${example.id}/${name}`] = content;
  }
  await write(`public/kits/skills/${skillName}.zip`, zipFiles(archive));
}
const discoverySkill = `---\nname: designkit\ndescription: Help choose a visual design direction for a website or interface using DesignKit's 22 original style references. Use for style discovery, comparing directions, or turning a project brief into a coherent design choice.\nlicense: MIT\nmetadata:\n  version: ${JSON.stringify(kitVersion)}\n---\n\n# Choose a direction with DesignKit\n\nRead [the catalog](references/catalog.json) for available styles and project contexts. Match the user's audience, content, density, and interaction needs to a few relevant options. Explain the tradeoffs using concrete layout, typography, and material decisions rather than a vague mood label.\n\nRespect an already-chosen style. Do not replace the user's project with a particular example, or treat a visual style as a mandatory page architecture.\n\nFor implementation, use the corresponding designkit-<style-id> skill when it is available, or retrieve that style's Markdown/JSON reference from ${siteUrl}/kits/styles/<style-id>.md. A style package includes three original React entrypoints, scoped CSS, tokens, and licensed fonts. Translate those principles if the project uses a different stack.\n\nFor a mixed direction, establish one primary system for layout and components. Treat secondary references as deliberate typography or material choices; do not randomly blend entire systems.\n\nReview the rendered result against the actual brief, including phone layout, focus order, readable contrast, and reduced motion. Report only verified checks.\n\nThis skill supplies design references. It does not authorize external publishing, installing dependencies, or changes to unrelated settings.\n`;
await write("skills/designkit/SKILL.md", discoverySkill);
await write("skills/designkit/references/catalog.json", json(catalog));
await write(
  "public/kits/skills/designkit.zip",
  zipFiles({
    "SKILL.md": discoverySkill,
    "references/catalog.json": json(catalog),
    LICENSE: license,
  }),
);
await write("public/kits/catalog.json", json(catalog));
await write(
  "public/r/registry.json",
  json({
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "designkit",
    homepage: siteUrl,
    items: registryItems,
  }),
);
await write(
  "public/llms.txt",
  `# DesignKit\n\nOriginal visual design references, reusable examples, and installable skills.\n\nVersion: ${kitVersion}\nContent digest: ${digest}\n\n- [Catalog](${siteUrl}/kits/catalog.json): 22 styles, 66 examples, 132 components.\n- [Agent guide](${siteUrl}/agents/)\n- [Component registry](${siteUrl}/r/registry.json)\n\n## Style references\n${kits.map((kit) => `- [${kit.style.name}](${siteUrl}/kits/styles/${kit.style.id}.md): ${kit.style.tagline}`).join("\n")}\n`,
);
console.log(
  `Generated ${kits.length} style packages, ${examples.length} example kits, ${registryItems.length} registry items, and 23 skills.`,
);

const skillNames = [
  "designkit",
  ...kits.map((kit) => `designkit-${kit.style.id}`),
];
const discoveryEntries = await Promise.all(
  skillNames.map(async (name) => {
    const instructions = await read(`skills/${name}/SKILL.md`);
    const rawDescription =
      instructions.match(/^description: (.+)$/m)?.[1] ||
      "DesignKit visual guidance";
    const description = rawDescription.startsWith('"')
      ? JSON.parse(rawDescription)
      : rawDescription;
    const bytes = await fs.readFile(
      path.join(publicRoot, "kits", "skills", `${name}.zip`),
    );
    return {
      name,
      description,
      type: "archive",
      url: `/kits/skills/${name}.zip`,
      digest: `sha256:${createHash("sha256").update(bytes).digest("hex")}`,
    };
  }),
);
await write(
  "public/.well-known/agent-skills/index.json",
  json({
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: discoveryEntries,
  }),
);
