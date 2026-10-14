import {
  kitVersion,
  siteUrl,
  type DesignExample,
  type StyleKit,
} from "../data/kit-types";
import { exportCss } from "./kit-tokens";
const bullets = (values: string[]) =>
  values.map((value) => `- ${value}`).join("\n");
export function exampleGuide(example: DesignExample, kit: StyleKit) {
  return (
    [
      `# ${example.brand}: ${kit.style.name} ${example.kind}`,
      `DesignKit ${kitVersion}. Original fictional example, reusable under MIT; bundled fonts retain their original OFL licenses.`,
      `## Project context\n\n${example.description}\n\nHeadline: ${example.headline}\n\nThe primary action: ${example.action}`,
      `## Design reasoning\n\n${example.anatomy.map((entry) => `### ${entry.decision}\n\n${entry.reason}`).join("\n\n")}`,
      `## Typography\n\nHeading: ${example.fonts.heading}\nBody: ${example.fonts.body}\n\nTreat this pairing as an interpretation. If the destination project already has a suitable typeface, preserve it unless the requested direction needs a different voice.`,
      `## Exact default tokens\n\n\`\`\`css\n${exportCss(example, kit.recipe)}\`\`\``,
      `## Content\n\n${example.items.map((item) => `- ${item.title} (${item.label}): ${item.detail}`).join("\n")}`,
      `## Adaptation\n\n${kit.recipe.composition}\n\n${kit.recipe.motion}\n\nUse the page structure for its context, not as a universal template. Keep the user's real content and required interactions.`,
      `## Review\n\n${bullets(kit.style.avoid)}\n\nCheck reading order and text contrast at phone width; ensure native controls retain keyboard and focus feedback. Preview tasks, carts, and schedules are local demonstrations, not backend integrations.`,
      `## Resources\n\nPreview: ${siteUrl}/examples/${example.id}/\nFull-page preview: ${siteUrl}/preview/${example.id}/\nDesktop image: ${siteUrl}/previews/${example.id}-desktop.webp\nPhone image: ${siteUrl}/previews/${example.id}-mobile.webp\nKit: ${siteUrl}/kits/examples/${example.id}.zip\nJSON: ${siteUrl}/kits/examples/${example.id}.json`,
    ].join("\n\n") + "\n"
  );
}
export function styleGuide(
  kit: StyleKit,
  referencePrefix = `${siteUrl}/kits/examples/`,
) {
  return (
    [
      `# ${kit.style.name}: DesignKit reference`,
      `Version ${kitVersion}. A contemporary interpretation of this direction. The three projects vary content, palette, and typography while preserving the style’s defining materials and composition. Treat suggested colors and typefaces as adaptable choices.`,
      `## Character\n\n${kit.style.description}\n\n${kit.recipe.signature}\n\n${bullets(kit.style.traits)}`,
      `## Three interpretations\n\n${kit.examples.map((example) => `### ${example.brand} (${example.kind})\n\n${example.description}\n\n${example.anatomy[0].reason}\n\nPreview: ${siteUrl}/examples/${example.id}/\nReference: ${referencePrefix}${example.id}.md`).join("\n\n")}`,
      `## Composition and behavior\n\n${kit.recipe.composition}\n\n${kit.recipe.motion}`,
      `## Useful decisions\n\n${bullets(kit.style.tips)}\n\n## Common mistakes\n\n${bullets(kit.style.avoid)}`,
      `## Components\n\n${bullets(kit.components.map((component) => `${component.kind}: ${siteUrl}/components/${component.id}/`))}`,
      `## Suitability\n\n${bullets(kit.style.useCases)}\n\nChoose a relevant interpretation or compose a new one for the actual project. Do not turn a visual style into a requirement to use a particular page structure.`,
      `## Source and license\n\nOriginal DesignKit code and examples are MIT. Fonts keep their original licenses. Preserve the bundled license files when redistributing assets.${kit.style.sources?.length ? `\n\n${bullets(kit.style.sources.map((source) => `${source.label}: ${source.url}`))}` : ""}`,
    ].join("\n\n") + "\n"
  );
}
