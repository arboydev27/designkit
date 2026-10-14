import type { DesignStyle } from "./styles";

export const kitVersion = "2.0.0";
export const siteUrl = "https://designkit-vert.vercel.app";
export const repositoryUrl = "https://github.com/arboydev27/designkit";
export const exampleKinds = ["shop", "journal", "studio", "planner", "event", "archive"] as const;
export type ExampleKind = (typeof exampleKinds)[number];
export const componentKinds = ["button", "card", "navigation", "field", "dialog", "status"] as const;
export type ComponentKind = (typeof componentKinds)[number];
export type KitColors = { canvas: string; surface: string; accent: string; ink: string; line: string };
export type StyleRecipe = {
  colors: KitColors;
  radius: number;
  border: number;
  shadow: "none" | "hard" | "soft" | "inset" | "glass";
  texture: "none" | "paper" | "grid" | "dots" | "scanlines";
  composition: string;
  motion: string;
  signature: string;
  controls: { radius: [number, number]; shadow: boolean; spacing: [number, number] };
};
export type ExampleItem = { title: string; detail: string; label: string };
export type DesignExample = {
  id: string;
  styleId: string;
  name: string;
  brand: string;
  kind: ExampleKind;
  headline: string;
  description: string;
  action: string;
  colors: KitColors;
  fonts: { heading: string; body: string };
  items: ExampleItem[];
  anatomy: { decision: string; reason: string }[];
};
export type PlaygroundSettings = {
  headline: string;
  accent: string;
  headingFont: string;
  radius: number;
  shadow: number;
  spacing: number;
};
export type KitComponent = {
  id: string;
  styleId: string;
  kind: ComponentKind;
  name: string;
};
export type StyleKit = {
  version: string;
  style: DesignStyle;
  recipe: StyleRecipe;
  examples: DesignExample[];
  components: KitComponent[];
};
