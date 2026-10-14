"use client";
import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { urlForRoute, urlStateStore } from "../../lib/url-state";
export default function useUrlQuery() {
  const pathname = usePathname();
  const current = useSyncExternalStore(
    urlStateStore.subscribe,
    urlStateStore.getSnapshot,
    urlStateStore.getServerSnapshot,
  );
  const route = urlForRoute(current, pathname);
  const search = route?.search || "";
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
    window.dispatchEvent(new Event("designkit:query-change"));
  };
  return {
    params,
    update,
    search,
    ready: route !== null,
    currentPath: route ? current : null,
  };
}
