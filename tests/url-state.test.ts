import assert from "node:assert/strict";
import test from "node:test";
import { createUrlStateStore, urlForRoute } from "../src/lib/url-state";

test("a newly mounted route cannot use the previous page's URL during a Next navigation", () => {
  let location = "/examples/wabi-sabi-earthware/";
  const store = createUrlStateStore(
    () => location,
    () => () => {},
  );
  assert.equal(store.getServerSnapshot(), null);
  const stop = store.subscribe(() => {});
  assert.equal(urlForRoute(store.getSnapshot(), "/boards"), null);
  location = "/boards/?board=second-project";
  store.refresh(); // The Next router bridge publishes after navigation.
  const route = urlForRoute(store.getSnapshot(), "/boards");
  assert.equal(route?.searchParams.get("board"), "second-project");
  assert.equal(urlForRoute(null, "/boards"), null);
  stop();
});
test("same-path Next links, native history and fragments refresh every subscriber", () => {
  let location = "/components/?style=claymorphism";
  let nativeChange: (() => void) | undefined;
  let subscriptions = 0,
    notifications = 0,
    cleanups = 0;
  const store = createUrlStateStore(
    () => location,
    (refresh) => {
      subscriptions++;
      nativeChange = refresh;
      return () => cleanups++;
    },
  );
  const stopA = store.subscribe(() => notifications++);
  const stopB = store.subscribe(() => notifications++);
  location = "/components/?style=swiss-design&kind=field";
  store.refresh();
  assert.equal(
    urlForRoute(store.getSnapshot(), "/components/")?.searchParams.get("style"),
    "swiss-design",
  );
  location = "/#saved";
  nativeChange?.();
  assert.equal(urlForRoute(store.getSnapshot(), "/")?.hash, "#saved");
  assert.equal(subscriptions, 1);
  assert.equal(notifications, 5);
  store.refresh();
  assert.equal(notifications, 5);
  stopA();
  stopB();
  assert.equal(cleanups, 1);
});
