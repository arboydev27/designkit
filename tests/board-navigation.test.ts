import assert from "node:assert/strict";
import test from "node:test";
import { kits } from "../src/data/kits";
import { defaultSettings } from "../src/lib/kit-tokens";
import { withReturnPath } from "../src/lib/navigation";
import type { ProjectBoard } from "../src/lib/boards";
import {
  boardHref,
  boardDecisionHref,
  createBoardDecisionRestorer,
  selectedBoard,
} from "../src/lib/board-navigation";

const kit = kits.find((kit) => kit.style.id === "claymorphism")!;
const example = kit.examples[1];
const board: ProjectBoard = {
  id: "project & one",
  name: "A saved project",
  audience: "",
  pages: "",
  constraints: "",
  primaryExampleId: example.id,
  items: [
    {
      kind: "example",
      id: example.id,
      settings: {
        ...defaultSettings(example, kit.recipe),
        headline: "A saved idea, ready to revisit.",
        accent: "#3155DF",
      },
    },
    {
      kind: "palette",
      id: example.id,
      settings: {
        ...defaultSettings(example, kit.recipe),
        headline: "The palette's saved choices.",
        accent: "#227744",
      },
    },
    { kind: "component", id: kit.components[0].id },
  ],
};
const entry = {
  boards: [board],
  ready: true,
  boardId: board.id,
  kind: "example",
  example,
  recipe: kit.recipe,
};

test("decision navigation retains the selected board through a contextual return and reload", () => {
  const href = withReturnPath(
    boardDecisionHref(board.id, "palette", example.id),
    boardHref(board.id),
  );
  const destination = new URL(href, "https://designkit.test");
  assert.equal(destination.pathname, `/examples/${example.id}/`);
  assert.equal(destination.searchParams.get("board"), board.id);
  assert.equal(destination.searchParams.get("decision"), "palette");
  const returning = new URL(
    destination.searchParams.get("return")!,
    destination,
  );
  assert.equal(returning.pathname, "/boards/");
  const anotherBoard = { ...board, id: "first", name: "First project" };
  assert.equal(
    selectedBoard([anotherBoard, board], returning.searchParams.get("board")!)!
      .id,
    board.id,
  );
  assert.deepEqual([...destination.searchParams.keys()].sort(), [
    "board",
    "decision",
    "return",
  ]);
});

test("component decisions use their own detail route and retain board context", () => {
  const destination = new URL(
    boardDecisionHref(board.id, "component", kit.components[0].id),
    "https://designkit.test",
  );
  assert.equal(destination.pathname, `/components/${kit.components[0].id}/`);
  assert.equal(destination.searchParams.get("board"), board.id);
  assert.equal(destination.searchParams.get("decision"), "component");
});

test("selection falls back gracefully when a requested board was deleted", () => {
  assert.equal(selectedBoard([board], "deleted")!.id, board.id);
  assert.equal(selectedBoard([], "deleted"), undefined);
});

test("reopened example and palette restore their own distinct saved choices", () => {
  const restore = createBoardDecisionRestorer();
  const savedExample = restore(entry)!;
  assert.equal(savedExample.status, "found");
  assert.equal(savedExample.kind, "example");
  assert.equal(
    savedExample.settings.headline,
    "A saved idea, ready to revisit.",
  );
  assert.equal(savedExample.settings.accent, "#3155DF");
  const savedPalette = restore({ ...entry, kind: "palette" })!;
  assert.equal(savedPalette.kind, "palette");
  assert.equal(savedPalette.settings.accent, "#227744");
  assert.equal(savedPalette.settings.headline, "The palette's saved choices.");
  assert.notEqual(savedExample.settings, board.items[0].settings);
});

test("restoration waits for storage readiness and never resets edits on later storage notifications", () => {
  const restore = createBoardDecisionRestorer();
  assert.equal(restore({ ...entry, ready: false, boards: [] }), null);
  const restored = restore(entry)!;
  assert.equal(restored.settings.headline, "A saved idea, ready to revisit.");
  const updated = {
    ...board,
    items: [
      {
        ...board.items[0],
        settings: {
          ...board.items[0].settings!,
          headline: "Changed in another tab",
        },
      },
    ],
  };
  assert.equal(restore({ ...entry, boards: [updated] }), null);
  assert.equal(restore({ ...entry, boards: [] }), null);
});

test("missing boards and exact decisions use defaults instead of another saved item's choices", () => {
  const restore = createBoardDecisionRestorer();
  const missingBoard = restore({ ...entry, boardId: "missing" })!;
  assert.equal(missingBoard.status, "missing-board");
  assert.deepEqual(missingBoard.settings, defaultSettings(example, kit.recipe));
  const missingKind = restore({
    ...entry,
    boards: [{ ...board, items: [board.items[1]] }],
  })!;
  assert.equal(missingKind.status, "missing-decision");
  assert.deepEqual(missingKind.settings, defaultSettings(example, kit.recipe));
  const anotherExample = kit.examples[2];
  const missingExample = restore({ ...entry, example: anotherExample })!;
  assert.equal(missingExample.status, "missing-decision");
  assert.deepEqual(
    missingExample.settings,
    defaultSettings(anotherExample, kit.recipe),
  );
});

test("returning to a saved entry restores again after leaving its board context", () => {
  const restore = createBoardDecisionRestorer();
  assert.equal(restore(entry)!.status, "found");
  assert.equal(restore({ ...entry, boardId: null, kind: null }), null);
  assert.equal(restore(entry)!.settings.accent, "#3155DF");
  assert.equal(restore({ ...entry, kind: "component" }), null);
  assert.equal(
    restore({ ...entry, kind: "palette" })!.settings.accent,
    "#227744",
  );
});

test("saved settings are normalized before entering the playground", () => {
  const restored = createBoardDecisionRestorer()({
    ...entry,
    boards: [
      {
        ...board,
        items: [
          {
            ...board.items[0],
            settings: {
              ...board.items[0].settings!,
              accent: "red;display:none",
              radius: 999,
              bodyFont: "not a bundled font",
            },
          },
        ],
      },
    ],
  })!;
  assert.equal(restored.settings.accent, example.colors.accent);
  assert.equal(restored.settings.radius, kit.recipe.controls.radius[1]);
  assert.equal(restored.settings.bodyFont, example.fonts.body);
});
