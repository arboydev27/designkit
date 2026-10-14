import assert from "node:assert/strict";
import test from "node:test";
import {
  initialLibraryRoute,
  libraryRouteUrl,
  readLibraryRoute,
} from "../src/lib/library-navigation";
import {
  COMPARISON_KEY,
  createStyleCollectionsStore,
  normalizeComparison,
} from "../src/lib/style-collections";
import { readSavedStyles, SAVED_STYLES_KEY } from "../src/lib/saved-styles";

const known = new Set([
  "wabi-sabi",
  "neo-brutalism",
  "swiss-design",
  "cyberpunk",
]);
const parseRoute = (path: string) =>
  readLibraryRoute(new URL(path, "https://designkit.test"), known);
const makeStorage = (initial: Record<string, string> = {}) => {
  const entries = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => entries.get(key) ?? null,
    setItem: (key: string, value: string) => {
      entries.set(key, value);
    },
  };
};

test("empty, unknown and malformed hashes restore the library rather than a stale previous view", () => {
  for (const path of ["/", "/#unknown", "/#%E0%A4%A"])
    assert.deepEqual(parseRoute(path), initialLibraryRoute);
  assert.equal(parseRoute("/#compare").view, "compare");
  assert.equal(parseRoute("/#saved").view, "saved");
});

test("filtered browsing and the parent view survive style-detail URL round trips", () => {
  const route = {
    ...initialLibraryRoute,
    view: "saved" as const,
    selected: "wabi-sabi",
    query: "calm & natural",
    category: "Organic",
    sort: "az" as const,
    layout: "list" as const,
  };
  assert.deepEqual(parseRoute(libraryRouteUrl(route)), route);
  assert.deepEqual(parseRoute(libraryRouteUrl({ ...route, selected: null })), {
    ...route,
    selected: null,
  });
  assert.equal(parseRoute("/#neo-brutalism").selected, "neo-brutalism");
  assert.equal(
    parseRoute("/?view=outside&family=unknown&sort=bad&layout=bad#wabi-sabi")
      .view,
    "library",
  );
});

test("the same URL parser restores each state in a back/forward sequence", () => {
  const filtered = {
    ...initialLibraryRoute,
    category: "Organic",
    sort: "az" as const,
  };
  const urls = [
    "/",
    libraryRouteUrl(filtered),
    libraryRouteUrl({ ...filtered, selected: "wabi-sabi" }),
    "/#compare",
  ];
  const expected = [
    initialLibraryRoute,
    filtered,
    { ...filtered, selected: "wabi-sabi" },
    { ...initialLibraryRoute, view: "compare" },
  ];
  for (let i = urls.length - 1; i >= 0; i--)
    assert.deepEqual(parseRoute(urls[i]), expected[i]);
  for (let i = 0; i < urls.length; i++)
    assert.deepEqual(parseRoute(urls[i]), expected[i]);
});

test("saved favorites are deduplicated, including during legacy migration", () => {
  const storage = makeStorage({
    "form-atlas-saved-v1": '["wabi-sabi","wabi-sabi","missing"]',
  });
  assert.deepEqual(readSavedStyles(storage, known), ["wabi-sabi"]);
  assert.equal(storage.getItem(SAVED_STYLES_KEY), '["wabi-sabi"]');
});

test("comparison parsing preserves empty slots and rejects duplicate or unknown entries", () => {
  assert.deepEqual(normalizeComparison(["", "wabi-sabi"], known), [
    "",
    "wabi-sabi",
  ]);
  assert.deepEqual(normalizeComparison(["missing", "neo-brutalism"], known), [
    "",
    "neo-brutalism",
  ]);
  assert.deepEqual(normalizeComparison(["wabi-sabi", "wabi-sabi"], known), [
    "wabi-sabi",
    "",
  ]);
  assert.deepEqual(normalizeComparison(null, known), ["", ""]);
});

test("a second tab merges each saved action with current storage before a storage event arrives", () => {
  const storage = makeStorage();
  const first = createStyleCollectionsStore(() => storage, known);
  const second = createStyleCollectionsStore(() => storage, known);
  first.refresh();
  second.refresh();
  first.setSaved("wabi-sabi", true);
  assert.deepEqual(second.setSaved("neo-brutalism", true).saved, [
    "wabi-sabi",
    "neo-brutalism",
  ]);
  first.setSaved("swiss-design", true);
  assert.deepEqual(second.setSaved("wabi-sabi", false).saved, [
    "neo-brutalism",
    "swiss-design",
  ]);
});

test("comparison slot changes merge across tabs and stay in their slots on reload", () => {
  const storage = makeStorage();
  const first = createStyleCollectionsStore(() => storage, known);
  const second = createStyleCollectionsStore(() => storage, known);
  first.refresh();
  second.refresh();
  first.setComparisonSlot(1, "wabi-sabi");
  assert.equal(storage.getItem(COMPARISON_KEY), '["","wabi-sabi"]');
  second.refresh();
  assert.deepEqual(second.getSnapshot().comparison, ["", "wabi-sabi"]);
  assert.deepEqual(second.setComparisonSlot(0, "neo-brutalism").comparison, [
    "neo-brutalism",
    "wabi-sabi",
  ]);
  assert.deepEqual(first.setCompared("swiss-design", true).comparison, [
    "neo-brutalism",
    "wabi-sabi",
  ]);
  assert.deepEqual(first.setCompared("neo-brutalism", false).comparison, [
    "",
    "wabi-sabi",
  ]);
  second.refresh();
  assert.deepEqual(second.getSnapshot().comparison, ["", "wabi-sabi"]);
});

test("storage notifications update every subscriber using the same snapshot", () => {
  const storage = makeStorage();
  let signal: (() => void) | undefined;
  let stopped = false;
  const store = createStyleCollectionsStore(
    () => storage,
    known,
    (refresh) => {
      signal = refresh;
      return () => {
        stopped = true;
      };
    },
  );
  let changes = 0;
  const unsubscribe = store.subscribe(() => {
    changes++;
  });
  storage.setItem(SAVED_STYLES_KEY, '["wabi-sabi"]');
  signal?.();
  assert.deepEqual(store.getSnapshot().saved, ["wabi-sabi"]);
  assert.equal(changes, 2);
  unsubscribe();
  assert.equal(stopped, true);
});

test("failed writes preserve visit-only edits through refresh and save them after storage recovers", () => {
  const storage = makeStorage();
  let blocked = true;
  const store = createStyleCollectionsStore(() => {
    if (blocked) throw new Error("Blocked storage");
    return storage;
  }, known);
  assert.ok(store.setSaved("wabi-sabi", true).error);
  store.refresh();
  assert.deepEqual(store.getSnapshot().saved, ["wabi-sabi"]);
  blocked = false;
  assert.deepEqual(store.setSaved("neo-brutalism", true).saved, [
    "wabi-sabi",
    "neo-brutalism",
  ]);
  assert.equal(store.getSnapshot().error, "");
  assert.equal(
    storage.getItem(SAVED_STYLES_KEY),
    '["wabi-sabi","neo-brutalism"]',
  );
});

test("quota failures cannot replace visit-only selections with older persisted data", () => {
  const storage = makeStorage({ [SAVED_STYLES_KEY]: '["neo-brutalism"]' });
  let quotaFailure = true;
  const store = createStyleCollectionsStore(
    () => ({
      getItem: storage.getItem,
      setItem: (key, value) => {
        if (quotaFailure) throw new Error("Quota exceeded");
        storage.setItem(key, value);
      },
    }),
    known,
  );
  store.refresh();
  assert.ok(store.setSaved("wabi-sabi", true).error);
  store.refresh();
  assert.deepEqual(store.getSnapshot().saved, ["neo-brutalism", "wabi-sabi"]);
  quotaFailure = false;
  store.setCompared("swiss-design", true);
  assert.ok(
    store.getSnapshot().error,
    "An unrelated successful write must not hide unsaved favorites.",
  );
  store.setSaved("neo-brutalism", false);
  assert.equal(store.getSnapshot().error, "");
  assert.equal(storage.getItem(SAVED_STYLES_KEY), '["wabi-sabi"]');
});

test("quota recovery merges independent local and remote favorite additions and removals", () => {
  const storage = makeStorage({
    [SAVED_STYLES_KEY]: '["wabi-sabi","neo-brutalism"]',
  });
  let quotaFailure = true;
  const store = createStyleCollectionsStore(
    () => ({
      getItem: storage.getItem,
      setItem: (key, value) => {
        if (quotaFailure) throw new Error("Quota exceeded");
        storage.setItem(key, value);
      },
    }),
    known,
  );
  store.refresh();
  store.setSaved("wabi-sabi", false);
  store.setSaved("swiss-design", true);
  // The other tab removes an untouched favorite and adds a new one while
  // this tab's removal and addition exist only in memory.
  storage.setItem(SAVED_STYLES_KEY, '["wabi-sabi","cyberpunk"]');
  store.refresh();
  assert.deepEqual(store.getSnapshot().saved, ["cyberpunk", "swiss-design"]);
  quotaFailure = false;
  store.setSaved("swiss-design", true);
  assert.equal(store.getSnapshot().error, "");
  assert.equal(
    storage.getItem(SAVED_STYLES_KEY),
    '["cyberpunk","swiss-design"]',
  );
});

test("comparison recovery keeps an edited slot and remote changes to the other slot", () => {
  const storage = makeStorage({
    [COMPARISON_KEY]: '["wabi-sabi","neo-brutalism"]',
  });
  let quotaFailure = true;
  const store = createStyleCollectionsStore(
    () => ({
      getItem: storage.getItem,
      setItem: (key, value) => {
        if (quotaFailure) throw new Error("Quota exceeded");
        storage.setItem(key, value);
      },
    }),
    known,
  );
  store.refresh();
  store.setComparisonSlot(0, "swiss-design");
  storage.setItem(COMPARISON_KEY, '["wabi-sabi","cyberpunk"]');
  quotaFailure = false;
  assert.deepEqual(store.setComparisonSlot(0, "swiss-design").comparison, [
    "swiss-design",
    "cyberpunk",
  ]);
  assert.equal(storage.getItem(COMPARISON_KEY), '["swiss-design","cyberpunk"]');
});

test("comparison recovery preserves a local removal and the chosen slot of a duplicate remote addition", () => {
  const storage = makeStorage({
    [COMPARISON_KEY]: '["wabi-sabi","neo-brutalism"]',
  });
  let quotaFailure = true;
  const store = createStyleCollectionsStore(
    () => ({
      getItem: storage.getItem,
      setItem: (key, value) => {
        if (quotaFailure) throw new Error("Quota exceeded");
        storage.setItem(key, value);
      },
    }),
    known,
  );
  store.refresh();
  store.setCompared("wabi-sabi", false);
  storage.setItem(COMPARISON_KEY, '["cyberpunk","neo-brutalism"]');
  quotaFailure = false;
  assert.deepEqual(store.setComparisonSlot(1, "neo-brutalism").comparison, [
    "",
    "neo-brutalism",
  ]);

  store.clearComparison();
  quotaFailure = true;
  store.setComparisonSlot(1, "wabi-sabi");
  storage.setItem(COMPARISON_KEY, '["wabi-sabi",""]');
  quotaFailure = false;
  assert.deepEqual(store.setComparisonSlot(1, "wabi-sabi").comparison, [
    "",
    "wabi-sabi",
  ]);
  assert.equal(storage.getItem(COMPARISON_KEY), '["","wabi-sabi"]');
});
