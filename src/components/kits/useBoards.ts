"use client";
import { useSyncExternalStore } from "react";
import { boardsKey, validateBoard, type ProjectBoard } from "../../lib/boards";

type BoardSnapshot = { boards: ProjectBoard[]; ready: boolean; error: string };
type BoardStorage = Pick<Storage, "getItem" | "setItem">;
const initialSnapshot: BoardSnapshot = { boards: [], ready: false, error: "" };
const storageError =
  "Changes are kept for this visit. Export your board to keep them; browser storage is unavailable.";

const sameValue = (left: unknown, right: unknown) =>
  JSON.stringify(left) === JSON.stringify(right);
function mergePending<T>(
  base: T[],
  local: T[],
  remote: T[],
  key: (value: T) => string,
  resolve: (base: T, local: T, remote: T) => T,
) {
  const original = new Map(base.map((value) => [key(value), value]));
  const current = new Map(local.map((value) => [key(value), value]));
  const incoming = new Set(remote.map(key));
  const merged: T[] = [];
  for (const value of remote) {
    const id = key(value);
    const previous = original.get(id);
    const changed = current.get(id);
    if (changed !== undefined)
      merged.push(
        previous === undefined ? changed : resolve(previous, changed, value),
      );
    else if (previous === undefined) merged.push(value);
  }
  for (const value of local) {
    const id = key(value);
    if (!incoming.has(id) && !sameValue(value, original.get(id)))
      merged.push(value);
  }
  return merged;
}
function mergeBoard(
  base: ProjectBoard,
  local: ProjectBoard,
  remote: ProjectBoard,
) {
  const choose = <K extends keyof ProjectBoard>(key: K): ProjectBoard[K] =>
    sameValue(local[key], base[key]) ? remote[key] : local[key];
  const items = mergePending(
    base.items,
    local.items,
    remote.items,
    (item) => `${item.kind}:${item.id}`,
    (previous, changed, incoming) =>
      sameValue(previous, changed) ? incoming : changed,
  );
  const primary = choose("primaryExampleId");
  return {
    ...remote,
    name: choose("name"),
    audience: choose("audience"),
    pages: choose("pages"),
    constraints: choose("constraints"),
    primaryExampleId: items.some(
      (item) => item.kind === "example" && item.id === primary,
    )
      ? primary
      : "",
    items,
  };
}

// All hook instances use the same current value. Browser APIs are only read
// after subscribing or taking action, so server rendering stays deterministic.
export function createBoardsStore(
  getStorage: () => BoardStorage,
  listenForChanges?: (refresh: () => void) => () => void,
) {
  let snapshot = initialSnapshot;
  let unsaved = false;
  let baseBoards: ProjectBoard[] = [];
  let pendingRemote: ProjectBoard[] | undefined;
  let stopListening: (() => void) | undefined;
  const listeners = new Set<() => void>();
  const publish = (next: BoardSnapshot) => {
    snapshot = next;
    listeners.forEach((listener) => listener());
  };
  const refresh = () => {
    let content: string | null;
    try {
      content = getStorage().getItem(boardsKey);
    } catch {
      publish({ ...snapshot, ready: true, error: storageError });
      return;
    }
    try {
      const raw: unknown = JSON.parse(content ?? "[]");
      if (!Array.isArray(raw)) throw new Error("Invalid saved boards.");
      const boards: ProjectBoard[] = [];
      const ids = new Set<string>();
      let skipped = false;
      for (const entry of raw) {
        try {
          const board = validateBoard(entry);
          if (ids.has(board.id)) throw new Error("Duplicate board ID.");
          ids.add(board.id);
          boards.push(board);
        } catch {
          skipped = true;
        }
      }
      // Merge changes made elsewhere while a local write was unavailable.
      // Local edits win conflicts; untouched fields, new decisions and boards
      // from the other tab are preserved, along with intentional deletions.
      let current = boards;
      if (unsaved) {
        try {
          current = mergePending(
            baseBoards,
            snapshot.boards,
            boards,
            (board) => board.id,
            mergeBoard,
          ).map(validateBoard);
          pendingRemote = undefined;
        } catch {
          pendingRemote = boards;
          publish({
            ...snapshot,
            error:
              "Changes from another tab could not fit on this board. Remove selections to make room, or export your visit's boards before continuing.",
          });
          return;
        }
      }
      baseBoards = boards;
      publish({
        boards: current,
        ready: true,
        error: unsaved
          ? storageError
          : skipped
            ? "Some saved boards could not be opened because their data is invalid. Export the boards you can open to keep a copy."
            : "",
      });
    } catch {
      publish({
        ...snapshot,
        ready: true,
        error:
          "Saved boards could not be opened because their data is invalid. Export any boards still open to keep a copy.",
      });
    }
  };
  const update = (change: (boards: ProjectBoard[]) => ProjectBoard[]) => {
    // Another tab can update storage before its event arrives, or while an
    // asynchronous file import is still being read.
    refresh();
    let boards: ProjectBoard[];
    try {
      boards = change(snapshot.boards).map(validateBoard);
      if (new Set(boards.map((board) => board.id)).size !== boards.length)
        throw new Error("Each project board needs a unique ID.");
    } catch (error) {
      publish({
        ...snapshot,
        error:
          error instanceof Error
            ? error.message
            : "This change could not be saved.",
      });
      return null;
    }
    if (unsaved && pendingRemote) {
      try {
        boards = mergePending(
          baseBoards,
          boards,
          pendingRemote,
          (board) => board.id,
          mergeBoard,
        ).map(validateBoard);
      } catch {
        publish({
          boards,
          ready: true,
          error:
            "Changes are kept for this visit. Remove selections to make room for the other tab's decisions, or export your boards to keep a copy.",
        });
        return boards;
      }
    }
    let error = "";
    try {
      getStorage().setItem(boardsKey, JSON.stringify(boards));
      unsaved = false;
      baseBoards = boards;
      pendingRemote = undefined;
    } catch {
      unsaved = true;
      error = storageError;
    }
    publish({ boards, ready: true, error });
    return boards;
  };
  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    if (listeners.size === 1) {
      stopListening = listenForChanges?.(refresh);
      refresh();
    }
    return () => {
      listeners.delete(listener);
      if (!listeners.size) {
        stopListening?.();
        stopListening = undefined;
      }
    };
  };
  return { getSnapshot: () => snapshot, refresh, update, subscribe };
}

const store = createBoardsStore(
  () => window.localStorage,
  (refresh) => {
    const sync = (event: StorageEvent) => {
      if (event.key !== boardsKey && event.key !== null) return;
      try {
        if (event.storageArea && event.storageArea !== window.localStorage)
          return;
      } catch {}
      refresh();
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  },
);
export function useBoards() {
  const snapshot = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    () => initialSnapshot,
  );
  return { ...snapshot, update: store.update };
}
