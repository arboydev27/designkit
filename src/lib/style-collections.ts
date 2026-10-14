import { readSavedStyles, SAVED_STYLES_KEY } from "./saved-styles";

export const COMPARISON_KEY = "designkit:comparison:v1";
type CollectionStorage = Pick<Storage, "getItem" | "setItem">;
export type CollectionsSnapshot = {
  saved: string[];
  comparison: string[];
  ready: boolean;
  error: string;
};
export const initialCollections: CollectionsSnapshot = {
  saved: [],
  comparison: ["", ""],
  ready: false,
  error: "",
};
const storageError = "Updated for this visit. Browser storage is unavailable.";

export function normalizeComparison(
  value: unknown,
  knownIds: ReadonlySet<string>,
): string[] {
  const seen = new Set<string>();
  return [0, 1].map((index) => {
    const id = Array.isArray(value) ? value[index] : null;
    if (typeof id !== "string" || !knownIds.has(id) || seen.has(id)) return "";
    seen.add(id);
    return id;
  });
}

function mergeSaved(base: string[], local: string[], remote: string[]) {
  const previous = new Set(base);
  const current = new Set(local);
  const incoming = new Set(remote);
  return [
    ...remote.filter((id) => !previous.has(id) || current.has(id)),
    ...local.filter((id) => !previous.has(id) && !incoming.has(id)),
  ];
}

function mergeComparison(base: string[], local: string[], remote: string[]) {
  const changed = [0, 1].map((index) => local[index] !== base[index]);
  const removed = new Set(base.filter((id) => id && !local.includes(id)));
  const merged = [0, 1].map((index) => {
    const id = changed[index] ? local[index] : remote[index];
    return removed.has(id) ? "" : id;
  });
  // If another tab selected the same style in the other slot, preserve the
  // locally edited slot rather than letting normalization move its choice.
  if (merged[0] && merged[0] === merged[1]) {
    if (changed[1] && !changed[0]) merged[0] = "";
    else merged[1] = "";
  }
  return merged;
}

export function createStyleCollectionsStore(
  getStorage: () => CollectionStorage,
  knownIds: ReadonlySet<string>,
  listenForChanges?: (refresh: () => void) => () => void,
) {
  let snapshot = initialCollections;
  let dirtySaved = false;
  let dirtyComparison = false;
  let baseSaved: string[] = [];
  let baseComparison = ["", ""];
  let stopListening: (() => void) | undefined;
  const listeners = new Set<() => void>();
  const publish = (next: CollectionsSnapshot) => {
    snapshot = next;
    listeners.forEach((listener) => listener());
  };
  const refresh = () => {
    try {
      const storage = getStorage();
      // Check access outside readSavedStyles, which intentionally handles
      // migration failures without discarding usable legacy favorites.
      storage.getItem(SAVED_STYLES_KEY);
      const remoteSaved = readSavedStyles(storage, knownIds);
      const raw = storage.getItem(COMPARISON_KEY);
      let remoteComparison: string[];
      try {
        remoteComparison = normalizeComparison(
          JSON.parse(raw || "[]"),
          knownIds,
        );
      } catch {
        remoteComparison = ["", ""];
      }
      const saved = dirtySaved
        ? mergeSaved(baseSaved, snapshot.saved, remoteSaved)
        : remoteSaved;
      const comparison = dirtyComparison
        ? mergeComparison(baseComparison, snapshot.comparison, remoteComparison)
        : remoteComparison;
      // The merged snapshot differs from this latest persisted baseline only
      // in local edits still waiting to be written.
      baseSaved = remoteSaved;
      baseComparison = remoteComparison;
      publish({
        saved,
        comparison,
        ready: true,
        error: dirtySaved || dirtyComparison ? storageError : "",
      });
    } catch {
      publish({ ...snapshot, ready: true, error: storageError });
    }
  };
  const update = (
    kind: "saved" | "comparison",
    change: (ids: string[]) => string[],
  ) => {
    // Read before applying the particular action, so a delayed storage event
    // cannot make a second tab overwrite unrelated selections.
    refresh();
    const changed = change(snapshot[kind]);
    const next =
      kind === "saved"
        ? [...new Set(changed.filter((id) => knownIds.has(id)))]
        : normalizeComparison(changed, knownIds);
    let error = "";
    try {
      getStorage().setItem(
        kind === "saved" ? SAVED_STYLES_KEY : COMPARISON_KEY,
        JSON.stringify(next),
      );
      if (kind === "saved") {
        dirtySaved = false;
        baseSaved = next;
      } else {
        dirtyComparison = false;
        baseComparison = next;
      }
    } catch {
      if (kind === "saved") dirtySaved = true;
      else dirtyComparison = true;
      error = storageError;
    }
    publish({
      ...snapshot,
      [kind]: next,
      ready: true,
      error: error || (dirtySaved || dirtyComparison ? storageError : ""),
    });
    return snapshot;
  };
  const setSaved = (id: string, value: boolean) =>
    update("saved", (ids) =>
      value ? [...ids, id] : ids.filter((entry) => entry !== id),
    );
  const setCompared = (id: string, value: boolean) =>
    update("comparison", (ids) => {
      if (!value) return ids.map((entry) => (entry === id ? "" : entry));
      if (ids.includes(id)) return ids;
      const empty = ids.indexOf("");
      return empty < 0
        ? ids
        : ids.map((entry, index) => (index === empty ? id : entry));
    });
  const setComparisonSlot = (index: number, id: string) =>
    update("comparison", (ids) => {
      if (![0, 1].includes(index) || (id && ids[1 - index] === id)) return ids;
      return ids.map((entry, slot) => (slot === index ? id : entry));
    });
  const clearComparison = () => update("comparison", () => ["", ""]);
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
  return {
    getSnapshot: () => snapshot,
    refresh,
    subscribe,
    setSaved,
    setCompared,
    setComparisonSlot,
    clearComparison,
  };
}
