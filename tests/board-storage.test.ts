import assert from "node:assert/strict";
import test from "node:test";
import { createBoardsStore } from "../src/components/kits/useBoards";
import { boardsKey, type ProjectBoard } from "../src/lib/boards";

const board = (id: string): ProjectBoard => ({
  id,
  name: `Project ${id}`,
  audience: "",
  pages: "",
  constraints: "",
  primaryExampleId: "",
  items: [],
});
function storage(initial: ProjectBoard[] = []) {
  return {
    content: JSON.stringify(initial) as string | null,
    reads: 0,
    writes: 0,
    failRead: false,
    failWrite: false,
    getItem(key: string) {
      assert.equal(key, boardsKey);
      this.reads++;
      if (this.failRead) throw new Error("Storage disabled");
      return this.content;
    },
    setItem(key: string, content: string) {
      assert.equal(key, boardsKey);
      if (this.failWrite) throw new Error("Quota exceeded");
      this.writes++;
      this.content = content;
    },
  };
}

test("board storage waits for subscription and shares one external listener", () => {
  const saved = storage([board("a")]);
  let starts = 0;
  let stops = 0;
  const store = createBoardsStore(
    () => saved,
    () => {
      starts++;
      return () => {
        stops++;
      };
    },
  );
  assert.equal(saved.reads, 0);
  assert.equal(store.getSnapshot().ready, false);
  const unsubscribeFirst = store.subscribe(() => {});
  const unsubscribeSecond = store.subscribe(() => {});
  assert.equal(starts, 1);
  assert.equal(store.getSnapshot().boards[0].id, "a");
  unsubscribeFirst();
  assert.equal(stops, 0);
  unsubscribeSecond();
  assert.equal(stops, 1);
});

test("async import adds to the latest boards instead of overwriting intervening edits", async () => {
  const saved = storage([board("a")]);
  const store = createBoardsStore(() => saved);
  store.refresh();
  let finish!: () => void;
  const fileRead = new Promise<void>((resolve) => {
    finish = resolve;
  });
  const importing = (async () => {
    await fileRead;
    store.update((current) => [...current, board("imported")]);
  })();
  store.update((current) =>
    current.map((entry) => ({ ...entry, name: "Edited during import" })),
  );
  store.update((current) => [...current, board("new")]);
  finish();
  await importing;
  const restored = JSON.parse(saved.content!);
  assert.deepEqual(
    restored.map((entry: ProjectBoard) => entry.id),
    ["a", "new", "imported"],
  );
  assert.equal(restored[0].name, "Edited during import");
});

test("mutation reads another tab's changes even before a storage event arrives", () => {
  const saved = storage([board("a")]);
  const firstTab = createBoardsStore(() => saved);
  const secondTab = createBoardsStore(() => saved);
  firstTab.refresh();
  secondTab.refresh();
  firstTab.update((current) => [...current, board("b")]);
  secondTab.update((current) =>
    current.map((entry) =>
      entry.id === "a" ? { ...entry, audience: "New audience" } : entry,
    ),
  );
  const restored: ProjectBoard[] = JSON.parse(saved.content!);
  assert.deepEqual(
    restored.map((entry) => entry.id),
    ["a", "b"],
  );
  assert.equal(restored[0].audience, "New audience");
});

test("external refresh and clear update every subscriber", () => {
  const saved = storage([board("a")]);
  let externalRefresh!: () => void;
  const store = createBoardsStore(
    () => saved,
    (refresh) => {
      externalRefresh = refresh;
      return () => {};
    },
  );
  const first: string[][] = [];
  const second: string[][] = [];
  store.subscribe(() =>
    first.push(store.getSnapshot().boards.map((entry) => entry.id)),
  );
  store.subscribe(() =>
    second.push(store.getSnapshot().boards.map((entry) => entry.id)),
  );
  saved.content = JSON.stringify([board("b")]);
  externalRefresh();
  assert.deepEqual(first.at(-1), ["b"]);
  assert.deepEqual(second.at(-1), ["b"]);
  saved.content = null;
  externalRefresh();
  assert.deepEqual(store.getSnapshot().boards, []);
});

test("quota failures keep visit edits, share the warning, and recover on the next successful write", () => {
  const saved = storage([board("a")]);
  const store = createBoardsStore(() => saved);
  const warnings: string[] = [];
  store.subscribe(() => {});
  store.subscribe(() => warnings.push(store.getSnapshot().error));
  saved.failWrite = true;
  store.update((current) => [...current, board("b")]);
  assert.match(warnings.at(-1)!, /kept for this visit/);
  store.refresh();
  assert.deepEqual(
    store.getSnapshot().boards.map((entry) => entry.id),
    ["a", "b"],
  );
  saved.failWrite = false;
  store.update((current) => [...current, board("c")]);
  assert.equal(store.getSnapshot().error, "");
  assert.deepEqual(
    JSON.parse(saved.content!).map((entry: ProjectBoard) => entry.id),
    ["a", "b", "c"],
  );
});

test("blocked browser storage still permits board creation and reports the limitation", () => {
  const store = createBoardsStore(() => {
    throw new Error("SecurityError");
  });
  store.refresh();
  assert.equal(store.getSnapshot().ready, true);
  assert.match(store.getSnapshot().error, /storage is unavailable/);
  store.update((current) => [...current, board("memory")]);
  store.refresh();
  assert.equal(store.getSnapshot().boards[0].id, "memory");
  assert.match(store.getSnapshot().error, /storage is unavailable/);
});

test("malformed saved data is reported; valid boards survive invalid entries and duplicate IDs", () => {
  const saved = storage([board("a")]);
  saved.content = JSON.stringify([
    board("a"),
    { id: "broken" },
    board("a"),
    board("b"),
  ]);
  const store = createBoardsStore(() => saved);
  store.refresh();
  assert.deepEqual(
    store.getSnapshot().boards.map((entry) => entry.id),
    ["a", "b"],
  );
  assert.match(store.getSnapshot().error, /data is invalid/);
  saved.content = "{broken";
  store.refresh();
  assert.deepEqual(
    store.getSnapshot().boards.map((entry) => entry.id),
    ["a", "b"],
  );
  assert.match(store.getSnapshot().error, /data is invalid/);
});

test("invalid changes report an error without crashing or replacing saved boards", () => {
  const saved = storage([board("a")]);
  const store = createBoardsStore(() => saved);
  store.refresh();
  const before = saved.content;
  assert.equal(
    store.update((current) => [...current, board("a")]),
    null,
  );
  assert.match(store.getSnapshot().error, /unique ID/);
  assert.equal(saved.content, before);
  assert.equal(saved.writes, 0);
  assert.equal(
    store.update(() => [{ ...board("a"), name: "" }]),
    null,
  );
  assert.equal(store.getSnapshot().boards[0].name, "Project a");
});

test("quota recovery merges other-tab boards, fields, and decisions without resurrecting local deletions", () => {
  const saved = storage([board("a"), board("removed")]);
  const local = createBoardsStore(() => saved);
  const remote = createBoardsStore(() => saved);
  local.refresh();
  remote.refresh();
  saved.failWrite = true;
  local.update((current) =>
    current
      .filter((entry) => entry.id !== "removed")
      .map((entry) => ({ ...entry, name: "Local unsaved name" })),
  );
  saved.failWrite = false;
  remote.update((current) => [
    ...current.map((entry) =>
      entry.id === "a"
        ? {
            ...entry,
            audience: "Audience from another tab",
            items: [{ kind: "font" as const, id: "Nunito" }],
          }
        : entry,
    ),
    board("external"),
  ]);
  local.refresh();
  assert.match(local.getSnapshot().error, /kept for this visit/);
  local.update((current) => [...current, board("new-local")]);
  const restored: ProjectBoard[] = JSON.parse(saved.content!);
  assert.deepEqual(
    restored.map((entry) => entry.id),
    ["a", "external", "new-local"],
  );
  assert.equal(restored[0].name, "Local unsaved name");
  assert.equal(restored[0].audience, "Audience from another tab");
  assert.equal(restored[0].items[0].id, "Nunito");
});

test("pending decision removal survives an external addition to the same board", () => {
  const saved = storage([
    { ...board("a"), items: [{ kind: "font", id: "Nunito" }] },
  ]);
  const local = createBoardsStore(() => saved);
  const remote = createBoardsStore(() => saved);
  local.refresh();
  remote.refresh();
  saved.failWrite = true;
  local.update((current) => current.map((entry) => ({ ...entry, items: [] })));
  saved.failWrite = false;
  remote.update((current) =>
    current.map((entry) => ({
      ...entry,
      items: [...entry.items, { kind: "font" as const, id: "Inter" }],
    })),
  );
  local.update((current) => current);
  const restored: ProjectBoard[] = JSON.parse(saved.content!);
  assert.deepEqual(
    restored[0].items.map((entry) => entry.id),
    ["Inter"],
  );
});

test("a full pending board can resolve a merge conflict without crashing or dropping the other tab's decision", async () => {
  const { kits } = await import("../src/data/kits");
  const selections = kits.flatMap((kit) => [
    ...kit.examples.map((entry) => ({
      kind: "example" as const,
      id: entry.id,
    })),
    ...kit.examples.map((entry) => ({
      kind: "palette" as const,
      id: entry.id,
    })),
    ...kit.components.map((entry) => ({
      kind: "component" as const,
      id: entry.id,
    })),
  ]);
  assert.ok(selections.length > 201);
  const saved = storage([{ ...board("a"), items: selections.slice(0, 199) }]);
  const local = createBoardsStore(() => saved);
  const remote = createBoardsStore(() => saved);
  local.refresh();
  remote.refresh();
  saved.failWrite = true;
  local.update((current) =>
    current.map((entry) => ({
      ...entry,
      items: [...entry.items, selections[199]],
    })),
  );
  saved.failWrite = false;
  remote.update((current) =>
    current.map((entry) => ({
      ...entry,
      items: [...entry.items, selections[200]],
    })),
  );
  const remoteContent = saved.content;
  local.refresh();
  assert.equal(local.getSnapshot().boards[0].items.length, 200);
  assert.match(local.getSnapshot().error, /could not fit/);
  local.update((current) => current);
  assert.equal(saved.content, remoteContent);
  local.update((current) =>
    current.map((entry) => ({
      ...entry,
      items: entry.items.slice(1),
    })),
  );
  const restored: ProjectBoard[] = JSON.parse(saved.content!);
  assert.equal(restored[0].items.length, 200);
  assert.ok(restored[0].items.some((entry) => entry.id === selections[199].id));
  assert.ok(restored[0].items.some((entry) => entry.id === selections[200].id));
  assert.equal(local.getSnapshot().error, "");
});
