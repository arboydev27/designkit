import { styles } from "../data/styles";
import {
  exampleKinds,
  componentKinds,
  type DesignExample,
  type ComponentKind,
} from "../data/kit-types";
import { componentStates } from "./component-states";
const known = new Set(styles.map((style) => style.id));
export const normalizeSearch = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
export function matchesExample(example: DesignExample, query: string) {
  const style = styles.find((entry) => entry.id === example.styleId)!;
  return normalizeSearch(
    [
      example.brand,
      example.headline,
      example.description,
      example.styleId,
      example.kind,
      example.fonts.heading,
      example.fonts.body,
      style.name,
      style.category,
      ...style.keywords,
      ...style.traits,
      ...style.useCases,
    ].join(" "),
  ).includes(normalizeSearch(query));
}
function count(params: URLSearchParams, max: number) {
  const requested = Number(params.get("count"));
  return Number.isFinite(requested) && requested >= 12
    ? Math.min(max, Math.max(12, Math.floor(requested)))
    : 12;
}
export function exampleFilters(params: URLSearchParams) {
  return {
    query: (params.get("q") || "").slice(0, 200),
    styleId: known.has(params.get("style") || "") ? params.get("style")! : "",
    kind: exampleKinds.includes(
      params.get("kind") as (typeof exampleKinds)[number],
    )
      ? params.get("kind")!
      : "",
    limit: count(params, 66),
  };
}
export function componentFilters(params: URLSearchParams) {
  const styleId = known.has(params.get("style") || "")
    ? params.get("style")!
    : "";
  const rawKind = params.get("kind");
  const kind: ComponentKind | "" =
    rawKind === "all"
      ? ""
      : componentKinds.includes(rawKind as ComponentKind)
        ? (rawKind as ComponentKind)
        : styleId
          ? ""
          : "button";
  const rawState = params.get("state");
  return {
    styleId,
    kind,
    state:
      componentStates(kind).find((state) => state === rawState) || "default",
    limit: count(params, 132),
  };
}
