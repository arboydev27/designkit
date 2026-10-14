import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { examples } from "../src/data/examples";
import { kits, components } from "../src/data/kits";
import {
  contrast,
  normalizeSettings,
  resolveTokens,
  exportCss,
  exportDesignTokens,
} from "../src/lib/kit-tokens";

test("all 22 styles have three unique project contexts and complete reusable recipes", () => {
  assert.equal(kits.length, 22);
  assert.equal(examples.length, 66);
  assert.equal(new Set(examples.map((example) => example.id)).size, 66);
  for (const kit of kits) {
    assert.equal(kit.examples.length, 3, kit.style.id);
    assert.equal(
      new Set(kit.examples.map((example) => example.kind)).size,
      3,
      kit.style.id,
    );
    assert.equal(
      new Set(kit.examples.map((example) => example.headline)).size,
      3,
      kit.style.id,
    );
    assert.equal(kit.components.length, 6, kit.style.id);
    assert.ok(
      kit.recipe.signature && kit.recipe.composition && kit.recipe.motion,
    );
  }
  assert.equal(new Set(components.map((component) => component.id)).size, 132);
});

test("every example uses bundled fonts and normal-text contrast on its intended reading surfaces", () => {
  const declarations = readFileSync(
    new URL("../src/app/fonts.css", import.meta.url),
    "utf8",
  );
  for (const kit of kits)
    for (const example of kit.examples) {
      for (const family of Object.values(example.fonts))
        assert.ok(
          declarations.includes(`'${family}'`) ||
            declarations.includes(`"${family}"`),
          family,
        );
      const { values } = resolveTokens(example, kit.recipe);
      for (const [foreground, background] of [
        ["ink", "canvas"],
        ["surface-ink", "surface"],
        ["on-accent", "accent"],
        ["muted", "canvas"],
        ["surface-muted", "surface"],
      ]) {
        assert.ok(
          contrast(
            values[`--dk-${foreground}`],
            values[`--dk-${background}`],
          ) >= 4.5,
          `${example.id}: ${foreground}/${background}`,
        );
      }
    }
});

test("playground values are bounded and invalid settings cannot enter exported CSS", () => {
  const kit = kits.find((kit) => kit.style.id === "claymorphism")!;
  const example = kit.examples[0];
  const settings = normalizeSettings(
    {
      accent: "red; color: red",
      headingFont: "bad'; } body {",
      radius: -50,
      spacing: Infinity,
      shadow: 999,
      headline: "a".repeat(200),
    },
    example,
    kit.recipe,
  );
  assert.equal(settings.accent, example.colors.accent);
  assert.equal(settings.headingFont, example.fonts.heading);
  assert.equal(settings.radius, 0);
  assert.equal(settings.spacing, 24);
  assert.equal(settings.shadow, 100);
  assert.equal(settings.headline.length, 120);
});

test("customized CSS and portable design-token exports describe the same values", () => {
  const kit = kits[0];
  const example = kit.examples[1];
  const changes = {
    accent: "#3155DF",
    radius: 7,
    spacing: 32,
    headingFont: "Space Grotesk",
  };
  const css = exportCss(example, kit.recipe, changes);
  const tokens = exportDesignTokens(example, kit.recipe, changes);
  assert.ok(css.includes("--dk-radius: 7px"));
  assert.ok(css.includes("--dk-space: 32px"));
  assert.equal(tokens.dimension.radius.$value.value, 7);
  assert.equal(tokens.dimension.spacing.$value.value, 32);
  assert.equal(tokens.font.heading.$value, "Space Grotesk");
  assert.deepEqual(tokens.color.accent.$value.components, [
    49 / 255,
    85 / 255,
    223 / 255,
  ]);
});

test("design-token extensions preserve custom text and layered CSS shadows", () => {
  const kit = kits.find((kit) => kit.style.id === "claymorphism")!;
  const tokens = exportDesignTokens(kit.examples[0], kit.recipe, {
    headline: "A custom headline",
    shadow: 42,
  });
  assert.equal(
    tokens.$extensions["dev.designkit"].settings.headline,
    "A custom headline",
  );
  assert.equal(tokens.$extensions["dev.designkit"].settings.shadow, 42);
  assert.ok(tokens.$extensions["dev.designkit"].cssShadow.includes("inset"));
});
