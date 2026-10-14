import type { ComponentKind } from "../data/kit-types";
export type ComponentState = "default" | "disabled" | "loading" | "error";
export function componentStates(kind: ComponentKind | ""): ComponentState[] {
  if (!kind || kind === "navigation" || kind === "dialog") return ["default"];
  if (kind === "field") return ["default", "disabled", "error"];
  return ["default", "disabled", "loading", "error"];
}
