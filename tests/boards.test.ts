import assert from "node:assert/strict";
import test from "node:test";
import {
  importBoard,
  exportBoard,
  projectBrief,
  validateBoard,
  type ProjectBoard,
} from "../src/lib/boards";
import { kits } from "../src/data/kits";
import { defaultSettings } from "../src/lib/kit-tokens";
const kit = kits.find((kit) => kit.style.id === "claymorphism")!;
const example = kit.examples[1];
const board: ProjectBoard = {
  id: "test-project",
  name: "My desk shop",
  audience: "Independent makers",
  pages: "Collection, product, about",
  constraints: "Readable on phones; no tracking",
  primaryExampleId: example.id,
  items: [
    {
      kind: "example",
      id: example.id,
      settings: {
        ...defaultSettings(example, kit.recipe),
        accent: "#3155DF",
        radius: 20,
        headline: "A desk with a little more personality.",
      },
    },
    { kind: "component", id: kit.components[0].id },
    { kind: "font", id: "Nunito" },
  ],
};
test("board round trips preserve selected resources, project constraints, and customized tokens", () => {
  assert.deepEqual(importBoard(exportBoard(board)), board);
  const brief = projectBrief(board);
  for (const expected of [
    board.name,
    board.audience,
    board.pages,
    board.constraints,
    example.brand,
    "--dk-radius: 20px",
    "A desk with a little more personality.",
    "--dk-accent: #3155DF",
    kit.components[0].id,
  ])
    assert.ok(brief.includes(expected), expected);
});
test("board imports reject unsupported versions, unknown resources, and an unsaved primary direction", () => {
  assert.throws(() => importBoard(JSON.stringify({ version: 2, board })));
  assert.throws(() =>
    validateBoard({
      ...board,
      items: [{ kind: "example", id: "missing-example" }],
    }),
  );
  assert.throws(() =>
    validateBoard({ ...board, primaryExampleId: kit.examples[2].id }),
  );
});
test("invalid imported customization is bounded without retaining arbitrary fields", () => {
  const checked = validateBoard({
    ...board,
    items: [
      {
        kind: "example",
        id: example.id,
        settings: {
          accent: "red;display:none",
          radius: 999,
          bodyFont: "unbundled",
          arbitrary: "not retained",
        },
      },
    ],
  });
  assert.equal(checked.items[0].settings!.accent, example.colors.accent);
  assert.equal(
    checked.items[0].settings!.radius,
    kit.recipe.controls.radius[1],
  );
  assert.equal(checked.items[0].settings!.bodyFont, example.fonts.body);
  assert.ok(!("arbitrary" in checked.items[0].settings!));
});
test("duplicate selections are consolidated and a board without a primary direction is explicit", () => {
  const checked = validateBoard({
    ...board,
    items: [...board.items, board.items[0]],
  });
  assert.equal(checked.items.length, board.items.length);
  assert.ok(
    projectBrief({ ...board, primaryExampleId: "" }).includes(
      "Choose one saved example",
    ),
  );
});

test("saved palette customization survives export and import", () => {
  const palette = {
    kind: "palette" as const,
    id: example.id,
    settings: { ...defaultSettings(example, kit.recipe), accent: "#3155DF" },
  };
  const restored = importBoard(
    exportBoard({ ...board, items: [...board.items, palette] }),
  );
  assert.equal(
    restored.items.find((item) => item.kind === "palette")!.settings!.accent,
    "#3155DF",
  );
});
