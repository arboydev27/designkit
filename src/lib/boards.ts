import { examples } from "../data/examples";
import { components, kitsById } from "../data/kits";
import {
  kitVersion,
  siteUrl,
  type PlaygroundSettings,
} from "../data/kit-types";
import { fontFamilies, normalizeSettings, resolveTokens } from "./kit-tokens";

export const boardsKey = "designkit:boards:v1";
export type BoardItem = {
  kind: "example" | "component" | "palette" | "font";
  id: string;
  settings?: PlaygroundSettings;
};
export type ProjectBoard = {
  id: string;
  name: string;
  audience: string;
  pages: string;
  constraints: string;
  primaryExampleId: string;
  items: BoardItem[];
};
const text = (value: unknown, max: number) =>
  typeof value === "string" ? value.slice(0, max) : "";
export function validateBoard(value: unknown): ProjectBoard {
  if (!value || typeof value !== "object")
    throw new Error("A board must be a JSON object.");
  const board = value as Record<string, unknown>;
  const id = text(board.id, 100),
    name = text(board.name, 120);
  if (
    !id ||
    !name.trim() ||
    !Array.isArray(board.items) ||
    board.items.length > 200
  )
    throw new Error(
      "This board needs a name, an ID, and at most 200 selections.",
    );
  const items: BoardItem[] = [];
  for (const raw of board.items) {
    if (!raw || typeof raw !== "object")
      throw new Error("A selection is not valid.");
    const item = raw as Record<string, unknown>;
    const kind = item.kind,
      itemId = text(item.id, 150);
    const example = examples.find((example) => example.id === itemId);
    if (
      !((kind === "example" || kind === "palette") && example) &&
      !(
        kind === "component" &&
        components.some((component) => component.id === itemId)
      ) &&
      !(kind === "font" && fontFamilies.includes(itemId))
    )
      throw new Error(
        "This board references a resource that is not in the current DesignKit catalog.",
      );
    if (items.some((saved) => saved.kind === kind && saved.id === itemId))
      continue;
    items.push({
      kind: kind as BoardItem["kind"],
      id: itemId,
      ...((kind === "example" || kind === "palette") &&
      example &&
      item.settings &&
      typeof item.settings === "object"
        ? {
            settings: normalizeSettings(
              item.settings as Partial<PlaygroundSettings>,
              example,
              kitsById[example.styleId].recipe,
            ),
          }
        : {}),
    });
  }
  const primaryExampleId = text(board.primaryExampleId, 150);
  if (
    primaryExampleId &&
    !items.some(
      (item) => item.kind === "example" && item.id === primaryExampleId,
    )
  )
    throw new Error(
      "The primary direction must be an example saved on this board.",
    );
  return {
    id,
    name,
    audience: text(board.audience, 1500),
    pages: text(board.pages, 1500),
    constraints: text(board.constraints, 4000),
    primaryExampleId,
    items,
  };
}
export function importBoard(content: string): ProjectBoard {
  if (content.length > 1_000_000)
    throw new Error("Choose a board smaller than 1 MB.");
  const envelope: unknown = JSON.parse(content);
  if (
    !envelope ||
    typeof envelope !== "object" ||
    (envelope as { version?: unknown }).version !== 1
  )
    throw new Error("This file is not a supported DesignKit board.");
  return validateBoard((envelope as { board?: unknown }).board);
}
export function exportBoard(board: ProjectBoard) {
  return JSON.stringify(
    { version: 1, kitVersion, board: validateBoard(board) },
    null,
    2,
  );
}
export function boardItemName(item: BoardItem) {
  if (item.kind === "component")
    return (
      components.find((component) => component.id === item.id)?.name || item.id
    );
  if (item.kind === "font") return item.id;
  const example = examples.find((example) => example.id === item.id);
  return example
    ? `${example.brand}${item.kind === "palette" ? " palette" : ""}`
    : item.id;
}
export function projectBrief(board: ProjectBoard) {
  const checked = validateBoard(board);
  const example = examples.find(
    (example) => example.id === checked.primaryExampleId,
  );
  const kit = example ? kitsById[example.styleId] : undefined;
  const saved = checked.items.find(
    (item) => item.kind === "example" && item.id === example?.id,
  );
  const list = (values: string[]) =>
    values.map((value) => `- ${value}`).join("\n");
  const resources = list(
    checked.items.map((item) => {
      const reference = `${item.kind}: ${boardItemName(item)}${item.kind === "font" ? "" : ` (${siteUrl}/${item.kind === "component" ? "components" : "examples"}/${item.id}/)`}`;
      if (item.kind !== "palette") return reference;
      const source = examples.find((entry) => entry.id === item.id)!;
      const { values } = resolveTokens(
        source,
        kitsById[source.styleId].recipe,
        item.settings,
      );
      return `${reference} — canvas ${values["--dk-canvas"]}, surface ${values["--dk-surface"]}, accent ${values["--dk-accent"]}, ink ${values["--dk-ink"]}`;
    }),
  );
  return (
    [
      `# ${checked.name}: project design direction`,
      `A project-specific brief from DesignKit ${kitVersion}.`,
      `## Project requirements\n\nAudience: ${checked.audience || "Not specified yet."}\n\nPages and views: ${checked.pages || "Not specified yet."}\n\nConstraints: ${checked.constraints || "Not specified yet."}`,
      example && kit
        ? `## Primary direction\n\n${kit.style.name}, expressed through **${example.brand}** (${example.kind}).\n\n${example.description}\n\nSelected headline: ${saved?.settings?.headline ?? example.headline}\n\n${kit.recipe.composition}\n\n${kit.recipe.signature}\n\nReference: ${siteUrl}/examples/${example.id}/`
        : "## Primary direction\n\nChoose one saved example as the primary direction before implementation.",
      example && kit
        ? `## Exact selected tokens\n\n\`\`\`css\n:root {\n${Object.entries(
            resolveTokens(example, kit.recipe, saved?.settings).values,
          )
            .map(([name, value]) => `  ${name}: ${value};`)
            .join("\n")}\n}\n\`\`\``
        : "",
      `## Saved references\n\n${resources || "No resources selected yet."}`,
      kit
        ? `## Preserve the character\n\n${list(kit.style.tips)}\n\n## Be mindful of\n\n${list(kit.style.avoid)}\n\n## Motion\n\n${kit.recipe.motion}`
        : "",
      "## Implementation review\n\nCheck the smallest supported viewport, readable text contrast, focus order, keyboard access, empty/error/loading states where relevant, and reduced motion. Adapt the direction to the stated project requirements; supplementary references do not automatically override the primary tokens. Confirm font and asset licenses in the destination project.",
    ]
      .filter(Boolean)
      .join("\n\n") + "\n"
  );
}
