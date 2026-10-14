"use client";
import { useSyncExternalStore } from "react";
import { styles } from "../data/styles";
import { SAVED_STYLES_KEY } from "./saved-styles";
import {
  COMPARISON_KEY,
  createStyleCollectionsStore,
  initialCollections,
} from "./style-collections";

const store = createStyleCollectionsStore(
  () => window.localStorage,
  new Set(styles.map((style) => style.id)),
  (refresh) => {
    const sync = (event: StorageEvent) => {
      if (
        event.key !== SAVED_STYLES_KEY &&
        event.key !== COMPARISON_KEY &&
        event.key !== null
      )
        return;
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
export function useStyleCollections() {
  const snapshot = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    () => initialCollections,
  );
  return {
    ...snapshot,
    setSaved: store.setSaved,
    setCompared: store.setCompared,
    setComparisonSlot: store.setComparisonSlot,
    clearComparison: store.clearComparison,
  };
}
