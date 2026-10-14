export const SAVED_STYLES_KEY = "designkit:saved-styles:v1";
const LEGACY_KEY = "form-atlas-saved-v1";

export function readSavedStyles(
  storage: Pick<Storage, "getItem" | "setItem">,
  knownIds: ReadonlySet<string>,
): string[] {
  try {
    const current = storage.getItem(SAVED_STYLES_KEY);
    const legacy = current === null ? storage.getItem(LEGACY_KEY) : null;
    const data: unknown = JSON.parse(current ?? legacy ?? "[]");
    if (!Array.isArray(data)) return [];
    const saved = [
      ...new Set(
        data.filter(
          (id): id is string => typeof id === "string" && knownIds.has(id),
        ),
      ),
    ];
    if (current === null && legacy !== null) {
      try {
        storage.setItem(SAVED_STYLES_KEY, JSON.stringify(saved));
      } catch {
        // Keep the existing collection usable even when storage is read-only.
      }
    }
    return saved;
  } catch {
    return [];
  }
}
