export const libraryViews = [
  "library",
  "saved",
  "compare",
  "palettes",
  "typography",
  "about",
] as const;
export type LibraryView = (typeof libraryViews)[number];
export const libraryFamilies = [
  "All styles",
  "Organic",
  "Expressive",
  "Digital",
  "Structured",
  "Classic",
] as const;
export type LibraryRoute = {
  view: LibraryView;
  selected: string | null;
  category: string;
  query: string;
  sort: "curated" | "az";
  layout: "grid" | "list";
};
export const initialLibraryRoute: LibraryRoute = {
  view: "library",
  selected: null,
  category: "All styles",
  query: "",
  sort: "curated",
  layout: "grid",
};
const isView = (value: string | null): value is LibraryView =>
  libraryViews.some((view) => view === value);

export function readLibraryRoute(
  url: URL,
  knownIds: ReadonlySet<string>,
): LibraryRoute {
  let fragment = url.hash.slice(1);
  try {
    fragment = decodeURIComponent(fragment);
  } catch {
    fragment = "";
  }
  const selected = knownIds.has(fragment) ? fragment : null;
  const parent = url.searchParams.get("view");
  const category = url.searchParams.get("family");
  return {
    view:
      selected && isView(parent)
        ? parent
        : isView(fragment)
          ? fragment
          : "library",
    selected,
    category: libraryFamilies.some((family) => family === category)
      ? category!
      : "All styles",
    query: url.searchParams.get("q") || "",
    sort: url.searchParams.get("sort") === "az" ? "az" : "curated",
    layout: url.searchParams.get("layout") === "list" ? "list" : "grid",
  };
}

export function libraryRouteUrl(route: LibraryRoute): string {
  const params = new URLSearchParams();
  if (route.query) params.set("q", route.query);
  if (route.category !== "All styles") params.set("family", route.category);
  if (route.sort !== "curated") params.set("sort", route.sort);
  if (route.layout !== "grid") params.set("layout", route.layout);
  if (route.selected && route.view !== "library")
    params.set("view", route.view);
  return `/${params.size ? `?${params}` : ""}#${route.selected || route.view}`;
}
