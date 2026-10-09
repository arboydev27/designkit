import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const source = await readFile(new URL("../src/lib/saved-styles.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ES2020, target: ts.ScriptTarget.ES2020 },
});
const { readSavedStyles, SAVED_STYLES_KEY } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
);
const legacyKey = "form-atlas-saved-v1";
const known = new Set(["wabi-sabi", "neo-brutalism"]);
const storage = (values) => {
  const entries = new Map(Object.entries(values));
  return {
    getItem: (key) => entries.get(key) ?? null,
    setItem: (key, value) => entries.set(key, value),
  };
};

test("moves valid legacy favorites into the DesignKit key without deleting the original", () => {
  const original = JSON.stringify(["wabi-sabi", "unknown", 42]);
  const store = storage({ [legacyKey]: original });
  assert.deepEqual(readSavedStyles(store, known), ["wabi-sabi"]);
  assert.equal(store.getItem(SAVED_STYLES_KEY), '["wabi-sabi"]');
  assert.equal(store.getItem(legacyKey), original);
});

test("respects an intentionally empty DesignKit collection", () => {
  const store = storage({ [SAVED_STYLES_KEY]: "[]", [legacyKey]: '["wabi-sabi"]' });
  assert.deepEqual(readSavedStyles(store, known), []);
});

test("prefers an existing DesignKit collection on later visits", () => {
  const store = storage({ [SAVED_STYLES_KEY]: '["neo-brutalism"]', [legacyKey]: '["wabi-sabi"]' });
  assert.deepEqual(readSavedStyles(store, known), ["neo-brutalism"]);
});

test("keeps legacy favorites available if writing storage fails", () => {
  const store = storage({ [legacyKey]: '["wabi-sabi"]' });
  store.setItem = () => { throw new Error("Storage is full"); };
  assert.deepEqual(readSavedStyles(store, known), ["wabi-sabi"]);
});

test("handles unavailable storage and malformed saved data", () => {
  assert.deepEqual(readSavedStyles({ getItem() { throw new Error("Blocked"); }, setItem() {} }, known), []);
  for (const value of ["broken JSON", "null", '{}']) {
    assert.deepEqual(readSavedStyles(storage({ [legacyKey]: value }), known), []);
  }
});
