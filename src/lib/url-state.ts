export function createUrlStateStore(
  read: () => string,
  listen: (refresh: () => void) => () => void,
) {
  let current: string | null = null;
  let stop: (() => void) | undefined;
  const listeners = new Set<() => void>();
  const refresh = () => {
    const next = read();
    if (next === current) return;
    current = next;
    listeners.forEach((listener) => listener());
  };
  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    if (listeners.size === 1) {
      stop = listen(refresh);
      refresh();
    }
    return () => {
      listeners.delete(listener);
      if (!listeners.size) {
        stop?.();
        stop = undefined;
      }
    };
  };
  return {
    refresh,
    subscribe,
    getSnapshot: () => current,
    getServerSnapshot: () => null,
  };
}
export function urlForRoute(current: string | null, pathname: string | null) {
  if (current === null || pathname === null) return null;
  const url = new URL(current, "https://designkit.local");
  return url.pathname.replace(/\/$/, "") === pathname.replace(/\/$/, "")
    ? url
    : null;
}
export const urlStateStore = createUrlStateStore(
  () => `${location.pathname}${location.search}${location.hash}`,
  (refresh) => {
    const events = ["popstate", "hashchange", "designkit:query-change"];
    events.forEach((event) => window.addEventListener(event, refresh));
    return () =>
      events.forEach((event) => window.removeEventListener(event, refresh));
  },
);
