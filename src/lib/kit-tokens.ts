import type { DesignExample, PlaygroundSettings, StyleRecipe } from "../data/kit-types";
import { examples } from "../data/examples";

export const fontFamilies = [...new Set(examples.flatMap((example) => [example.fonts.heading, example.fonts.body]))].sort();
const hex = /^#[\da-f]{6}$/i;
const rgb = (value: string) => [1, 3, 5].map((start) => parseInt(value.slice(start, start + 2), 16));
function luminance(value: string) {
  const channels = rgb(value).map((channel) => {
    const s = channel / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}
export function contrast(a: string, b: string) {
  const values = [luminance(a), luminance(b)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}
export function readableInk(background: string, preferred = "#24252A") {
  if (contrast(background, preferred) >= 4.5) return preferred;
  return ["#191A1F", "#FFFFFF", "#000000"].find((candidate) => contrast(background, candidate) >= 4.5)!;
}
const clamp = (value: unknown, min: number, max: number, fallback: number) =>
  typeof value === "number" && Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;

export function defaultSettings(example: DesignExample, recipe: StyleRecipe): PlaygroundSettings {
  return { headline: example.headline, accent: example.colors.accent, headingFont: example.fonts.heading, radius: recipe.radius, shadow: 100, spacing: 24 };
}
export function normalizeSettings(input: Partial<PlaygroundSettings>, example: DesignExample, recipe: StyleRecipe): PlaygroundSettings {
  const defaults = defaultSettings(example, recipe);
  return {
    headline: typeof input.headline === "string" ? input.headline.slice(0, 120) : defaults.headline,
    accent: typeof input.accent === "string" && hex.test(input.accent) ? input.accent.toUpperCase() : defaults.accent,
    headingFont: typeof input.headingFont === "string" && fontFamilies.includes(input.headingFont) ? input.headingFont : defaults.headingFont,
    radius: clamp(input.radius, ...recipe.controls.radius, defaults.radius),
    shadow: clamp(input.shadow, 0, 100, defaults.shadow),
    spacing: clamp(input.spacing, ...recipe.controls.spacing, defaults.spacing),
  };
}
function blend(a: string, b: string, amount: number) {
  return `#${rgb(a).map((value, index) => Math.round(value * (1 - amount) + rgb(b)[index] * amount).toString(16).padStart(2, "0")).join("")}`;
}
export type ShadowLayer = { color: string; alpha: number; x: number; y: number; blur: number; spread: number; inset?: boolean };
export function resolveTokens(example: DesignExample, recipe: StyleRecipe, input: Partial<PlaygroundSettings> = {}) {
  const settings = normalizeSettings(input, example, recipe);
  const ink = readableInk(example.colors.canvas, example.colors.ink);
  const surfaceInk = readableInk(example.colors.surface, example.colors.ink);
  let muted = blend(ink, example.colors.canvas, 0.3);
  if (contrast(muted, example.colors.canvas) < 4.5) muted = ink;
  const line = contrast(example.colors.line, example.colors.canvas) >= 3 ? example.colors.line : blend(ink, example.colors.canvas, 0.35);
  const strength = settings.shadow / 100;
  const shadows: ShadowLayer[] = recipe.shadow === "none" || !strength ? [] : recipe.shadow === "hard"
    ? [{ color: ink, alpha: 1, x: 5 * strength, y: 5 * strength, blur: 0, spread: 0 }]
    : recipe.shadow === "inset"
      ? [{ color: "#68778C", alpha: 0.24 * strength, x: 6, y: 6, blur: 12, spread: 0 }, { color: "#FFFFFF", alpha: 0.8 * strength, x: -5, y: -5, blur: 12, spread: 0 }]
      : [{ color: "#343044", alpha: 0.16 * strength, x: 0, y: 10, blur: 24, spread: -5 }, ...(recipe.shadow === "soft" ? [{ color: "#FFFFFF", alpha: 0.5 * strength, x: -3, y: -3, blur: 6, spread: 0, inset: true }] : [])];
  const shadow = shadows.map((layer) => `${layer.inset ? "inset " : ""}${layer.x}px ${layer.y}px ${layer.blur}px ${layer.spread}px rgba(${rgb(layer.color).join(", ")}, ${layer.alpha})`).join(", ") || "none";
  const values: Record<string, string> = {
    "--dk-canvas": example.colors.canvas, "--dk-surface": example.colors.surface,
    "--dk-accent": settings.accent, "--dk-ink": ink, "--dk-surface-ink": surfaceInk,
    "--dk-on-accent": readableInk(settings.accent, example.colors.ink), "--dk-muted": muted,
    "--dk-line": line, "--dk-heading": `'${settings.headingFont}'`, "--dk-body": `'${example.fonts.body}'`,
    "--dk-radius": `${settings.radius}px`, "--dk-border": `${recipe.border}px`,
    "--dk-space": `${settings.spacing}px`, "--dk-shadow": shadow,
  };
  return { settings, values, shadows };
}
export function exportCss(example: DesignExample, recipe: StyleRecipe, input: Partial<PlaygroundSettings> = {}) {
  return `/* ${example.brand} / ${example.styleId} / DesignKit */\n:root {\n${Object.entries(resolveTokens(example, recipe, input).values).map(([key, value]) => `  ${key}: ${value};`).join("\n")}\n}\n`;
}
export function exportTailwind(example: DesignExample, recipe: StyleRecipe, input: Partial<PlaygroundSettings> = {}) {
  return `${exportCss(example, recipe, input)}\n@theme inline {\n  --color-kit-canvas: var(--dk-canvas);\n  --color-kit-surface: var(--dk-surface);\n  --color-kit-accent: var(--dk-accent);\n  --color-kit-ink: var(--dk-ink);\n  --font-kit-display: var(--dk-heading);\n  --font-kit-body: var(--dk-body);\n  --radius-kit: var(--dk-radius);\n  --shadow-kit: var(--dk-shadow);\n}\n`;
}
export function exportDesignTokens(example: DesignExample, recipe: StyleRecipe, input: Partial<PlaygroundSettings> = {}) {
  const { settings, values, shadows } = resolveTokens(example, recipe, input);
  const color = (value: string, alpha = 1) => ({ colorSpace: "srgb", components: rgb(value).map((channel) => channel / 255), alpha });
  const dimension = (value: number) => ({ value, unit: "px" });
  const colors = Object.fromEntries(["canvas", "surface", "accent", "ink", "surface-ink", "on-accent", "muted", "line"].map((name) => [name, { $type: "color", $value: color(values[`--dk-${name}`]) }]));
  return {
    $description: `${example.brand}: an adaptable ${example.styleId} interpretation from DesignKit.`,
    $extensions: { "dev.designkit": { exampleId: example.id, styleId: example.styleId, version: "2.0.0" } },
    color: colors,
    font: { heading: { $type: "fontFamily", $value: settings.headingFont }, body: { $type: "fontFamily", $value: example.fonts.body } },
    dimension: { radius: { $type: "dimension", $value: dimension(settings.radius) }, border: { $type: "dimension", $value: dimension(recipe.border) }, spacing: { $type: "dimension", $value: dimension(settings.spacing) } },
    ...(shadows.length && !shadows.some((layer) => layer.inset) ? { shadow: { surface: { $type: "shadow", $value: shadows.map((layer) => ({ color: color(layer.color, layer.alpha), offsetX: dimension(layer.x), offsetY: dimension(layer.y), blur: dimension(layer.blur), spread: dimension(layer.spread) })) } } } : {}),
  };
}
