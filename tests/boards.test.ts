import assert from "node:assert/strict";
import test from "node:test";
import {
  importBoard,
  exportBoard,
  projectBrief,
  validateBoard,
  addBoardItem,
  removeBoardItem,
  restoreBoard,
  type BoardItem,
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

test("duplicate imported decisions keep the latest customization in the original position", () => {
  const updated = {
    ...board.items[0],
    settings: { ...board.items[0].settings!, accent: "#227744" },
  };
  const checked = validateBoard({ ...board, items: [...board.items, updated] });
  assert.equal(checked.items.length, board.items.length);
  assert.equal(checked.items[0].settings!.accent, "#227744");
  assert.equal(checked.items[1].kind, "component");
});
test("saving an existing decision replaces its customization without moving it", () => {
  const updated = addBoardItem(board, {
    ...board.items[0],
    settings: { ...board.items[0].settings!, headline: "The updated decision" },
  });
  assert.equal(updated.items.length, board.items.length);
  assert.equal(updated.items[0].settings!.headline, "The updated decision");
  assert.equal(updated.primaryExampleId, board.primaryExampleId);
  assert.equal(
    board.items[0].settings!.headline,
    "A desk with a little more personality.",
  );
});
test("primary direction is assigned to the first example and only cleared when that example is removed", () => {
  const empty = { ...board, items: [], primaryExampleId: "" };
  const palette: BoardItem = { kind: "palette", id: example.id };
  const withPalette = addBoardItem(empty, palette);
  assert.equal(withPalette.primaryExampleId, "");
  const withExample = addBoardItem(withPalette, board.items[0]);
  assert.equal(withExample.primaryExampleId, example.id);
  const withoutPalette = removeBoardItem(withExample, palette);
  assert.equal(withoutPalette.primaryExampleId, example.id);
  assert.equal(
    removeBoardItem(withoutPalette, board.items[0]).primaryExampleId,
    "",
  );
});
test("a full board accepts an updated decision and rejects another selection without changing the board", () => {
  const selections: BoardItem[] = kits.flatMap((entry) => [
    ...entry.examples.map((item) => ({
      kind: "example" as const,
      id: item.id,
    })),
    ...entry.examples.map((item) => ({
      kind: "palette" as const,
      id: item.id,
    })),
    ...entry.components.map((item) => ({
      kind: "component" as const,
      id: item.id,
    })),
  ]);
  const full = validateBoard({
    ...board,
    primaryExampleId: "",
    items: selections.slice(0, 200),
  });
  assert.equal(addBoardItem(full, full.items[0]).items.length, 200);
  assert.throws(() => addBoardItem(full, selections[200]), /at most 200/);
  assert.equal(full.items.length, 200);
});
test("Undo restores the original board position and preserves a board already restored elsewhere", () => {
  const first = { ...board, id: "first" };
  const last = { ...board, id: "last" };
  assert.deepEqual(
    restoreBoard([first, last], board, 1).map((entry) => entry.id),
    ["first", board.id, "last"],
  );
  const external = { ...board, name: "Renamed in another tab" };
  assert.equal(restoreBoard([external], board, 0)[0].name, external.name);
});
test("malformed import JSON and blank IDs produce useful validation errors", () => {
  assert.throws(() => importBoard("{broken"), /valid JSON/);
  assert.throws(() => validateBoard({ ...board, id: "   " }), /an ID/);
});

test("project briefs preserve supplementary example choices and every saved palette color", () => {
  const secondary = kit.examples[2];
  const selections: BoardItem[] = [
    ...board.items,
    {
      kind: "example",
      id: secondary.id,
      settings: {
        ...defaultSettings(secondary, kit.recipe),
        headline: "A supplementary customized headline",
        accent: "#227744",
        radius: 18,
      },
    },
    {
      kind: "palette",
      id: example.id,
      settings: { ...defaultSettings(example, kit.recipe), accent: "#3155DF" },
    },
  ];
  const brief = projectBrief({ ...board, items: selections });
  for (const expected of [
    "Supplementary example choices",
    "A supplementary customized headline",
    "--dk-accent: #227744",
    "--dk-radius: 18px",
    "on-accent #",
    "surface-muted #",
    "line #",
  ])
    assert.ok(brief.includes(expected), expected);
  assert.equal(
    addBoardItem(board, selections[3]).primaryExampleId,
    board.primaryExampleId,
  );
});
