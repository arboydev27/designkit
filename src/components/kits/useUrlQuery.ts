"use client";
import { useSyncExternalStore } from "react";
const changed = "designkit:query-change";
function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener(changed, callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener(changed, callback);
  };
}
const snapshot = () => window.location.search;
const serverSnapshot = () => "";
export default function useUrlQuery() {
  const search = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const params = new URLSearchParams(search);
  const update = (
    patch: Record<string, string | number | null>,
    replace = false,
  ) => {
    const url = new URL(window.location.href);
    for (const [key, value] of Object.entries(patch)) {
      if (value === null || value === "") url.searchParams.delete(key);
      else url.searchParams.set(key, String(value));
    }
    const href = `${url.pathname}${url.search}${url.hash}`;
    if (href === `${location.pathname}${location.search}${location.hash}`)
      return;
    window.history[replace ? "replaceState" : "pushState"](
      window.history.state,
      "",
      href,
    );
    window.dispatchEvent(new Event(changed));
  };
  return { params, update, search };
}
