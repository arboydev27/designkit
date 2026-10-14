import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { examplesByStyle } from "../src/data/examples";
import { safeReturnPath, withReturnPath } from "../src/lib/navigation";
import {
  matchesExample,
  exampleFilters,
  componentFilters,
} from "../src/lib/gallery-filters";
import {
  KitButton,
  KitCard,
  KitNavigation,
  KitField,
  KitDialog,
  KitStatus,
} from "../src/components/kits/KitControls";
import ExampleThumbnail from "../src/components/kits/ExampleThumbnail";

function attributes(markup: string, tag: string) {
  const opening = markup.match(new RegExp(`<${tag}\\b[^>]*>`));
  assert.ok(opening, `Expected a ${tag} element in ${markup}`);
  return Object.fromEntries(
    [...opening[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [
      match[1],
      match[2].replace(/&amp;/g, "&").replace(/&quot;/g, '"'),
    ]),
  );
}

test("return links preserve an internal gallery's filters and fragment", () => {
  const returnTo =
    "/examples/?q=DM%20Sans&style=wabi-sabi&kind=shop&count=24#results";
  assert.equal(safeReturnPath(returnTo), returnTo);
  const destination = new URL(
    withReturnPath(
      "/examples/wabi-sabi-earthware/?mode=source#canvas",
      returnTo,
    ),
    "https://designkit.local",
  );
  assert.equal(destination.pathname, "/examples/wabi-sabi-earthware/");
  assert.equal(destination.searchParams.get("mode"), "source");
  assert.equal(destination.searchParams.get("return"), returnTo);
  assert.equal(destination.hash, "#canvas");
  assert.equal(safeReturnPath("/#saved"), "/#saved");
});

test("return links reject external destinations before and after URL normalization", () => {
  for (const invalid of [
    undefined,
    null,
    "",
    "https://outside.example/",
    "//outside.example/",
    "relative/page",
    "javascript:alert(1)",
    "/\\outside.example/",
    "/examples/\nnext",
    "/examples/\u0000next",
    "/examples/\u007fnext",
    "/a/..//example.org/path",
    "/%2e%2e//example.org/path",
  ]) {
    assert.equal(
      safeReturnPath(invalid, "/components/"),
      "/components/",
      String(invalid),
    );
  }
  for (const returnTo of [
    "//outside.example/",
    "/a/..//example.org/path",
    "/%2e%2e//example.org/path",
  ]) {
    const destination = new URL(
      withReturnPath("/components/claymorphism-button/", returnTo),
      "https://designkit.local",
    );
    assert.equal(destination.searchParams.get("return"), "/");
  }
});

test("example search finds readable style names, categories, body fonts, and hyphenated words", () => {
  const swiss = examplesByStyle["swiss-design"][0];
  const wabi = examplesByStyle["wabi-sabi"][0];
  const bento = examplesByStyle["bento-grid"][0];
  for (const query of [
    "Swiss design",
    "SWISS-DESIGN",
    "swiss_design",
    "Structured",
  ])
    assert.equal(matchesExample(swiss, query), true, query);
  assert.equal(matchesExample(wabi, "Organic"), true);
  assert.notEqual(wabi.fonts.heading, "DM Sans");
  assert.equal(wabi.fonts.body, "DM Sans");
  assert.equal(matchesExample(wabi, "DM Sans"), true);
  assert.equal(matchesExample(bento, "bento grid"), true);
  assert.equal(matchesExample(bento, "  BENTO--GRID  "), true);
  assert.equal(
    matchesExample(swiss, "an unrelated pineapple spaceship"),
    false,
  );
});

test("invalid example URL filters fall back to usable choices and bounded page counts", () => {
  const invalid = exampleFilters(
    new URLSearchParams({
      style: "missing-style",
      kind: "missing-kind",
      count: "Infinity",
    }),
  );
  assert.equal(invalid.styleId, "");
  assert.equal(invalid.kind, "");
  assert.equal(invalid.limit, 12);
  for (const count of ["-12", "not-a-number"])
    assert.equal(exampleFilters(new URLSearchParams({ count })).limit, 12);
  assert.equal(
    exampleFilters(new URLSearchParams({ count: "9999" })).limit,
    66,
  );
  const valid = exampleFilters(
    new URLSearchParams({
      q: "DM Sans",
      style: "wabi-sabi",
      kind: "shop",
      count: "24",
    }),
  );
  assert.equal(valid.query, "DM Sans");
  assert.equal(valid.styleId, "wabi-sabi");
  assert.equal(valid.kind, "shop");
  assert.equal(valid.limit, 24);
});

test("component URL filters retain all-pattern selection and reject unsupported preview states", () => {
  const unknown = componentFilters(
    new URLSearchParams({
      style: "missing-style",
      kind: "missing-kind",
      state: "missing-state",
      count: "9999",
    }),
  );
  assert.equal(unknown.styleId, "");
  assert.equal(unknown.kind, "button");
  assert.equal(unknown.state, "default");
  assert.equal(unknown.limit, 132);
  const style = componentFilters(
    new URLSearchParams({ style: "claymorphism" }),
  );
  assert.equal(style.styleId, "claymorphism");
  assert.equal(style.kind, "");
  const all = componentFilters(
    new URLSearchParams({ kind: "all", state: "loading" }),
  );
  assert.equal(all.kind, "");
  assert.equal(all.state, "default");
  for (const kind of ["navigation", "dialog", "field"])
    assert.equal(
      componentFilters(new URLSearchParams({ kind, state: "loading" })).state,
      "default",
      kind,
    );
  assert.equal(
    componentFilters(new URLSearchParams({ kind: "field", state: "error" }))
      .state,
    "error",
  );
  assert.equal(
    componentFilters(
      new URLSearchParams({ kind: "button", state: "loading", count: "24" }),
    ).state,
    "loading",
  );
});

test("native components retain caller attributes, classes, and accessible names", () => {
  const button = attributes(
    renderToStaticMarkup(
      createElement(
        KitButton,
        {
          id: "save",
          className: "custom-button",
          type: "submit",
          name: "action",
          value: "save",
          disabled: true,
          "aria-label": "Save project",
        },
        "Save",
      ),
    ),
    "button",
  );
  assert.equal(button.id, "save");
  assert.equal(button.class, "kit-button custom-button");
  assert.equal(button.type, "submit");
  assert.equal(button.name, "action");
  assert.equal(button.value, "save");
  assert.equal(button.disabled, "");
  assert.equal(button["aria-label"], "Save project");

  const card = attributes(
    renderToStaticMarkup(
      createElement(
        KitCard,
        {
          title: "Project",
          id: "project-card",
          className: "custom-card",
          lang: "fr",
          "aria-label": "Featured project",
          style: { marginTop: 12 },
        },
        "Detail",
      ),
    ),
    "article",
  );
  assert.equal(card.id, "project-card");
  assert.equal(card.class, "kit-card custom-card");
  assert.equal(card.lang, "fr");
  assert.equal(card["aria-label"], "Featured project");
  assert.equal(card.style, "margin-top:12px");

  const navigation = attributes(
    renderToStaticMarkup(
      createElement(KitNavigation, {
        brand: "Desk",
        links: [{ label: "Collection", href: "/collection" }],
        id: "main-nav",
        className: "custom-nav",
        "aria-label": "Shop navigation",
      }),
    ),
    "nav",
  );
  assert.equal(navigation.id, "main-nav");
  assert.equal(navigation.class, "kit-navigation custom-nav");
  assert.equal(navigation["aria-label"], "Shop navigation");

  const status = attributes(
    renderToStaticMarkup(
      createElement(
        KitStatus,
        {
          state: "success",
          id: "save-status",
          className: "custom-status",
          role: "log",
          "aria-live": "polite",
        },
        "Saved",
      ),
    ),
    "p",
  );
  assert.equal(status.id, "save-status");
  assert.equal(status.class, "kit-status kit-status-success custom-status");
  assert.equal(status.role, "log");
  assert.equal(status["aria-live"], "polite");

  const dialog = attributes(
    renderToStaticMarkup(
      createElement(
        KitDialog,
        {
          trigger: "Details",
          title: "Project details",
          id: "project-dialog",
          className: "custom-dialog",
          "aria-labelledby": "external-title",
          "aria-describedby": "project-summary",
          role: "alertdialog",
        },
        "Details",
      ),
    ),
    "dialog",
  );
  assert.equal(dialog.id, "project-dialog");
  assert.equal(dialog.class, "kit-dialog custom-dialog");
  assert.equal(dialog["aria-labelledby"], "external-title");
  assert.equal(dialog["aria-describedby"], "project-summary");
  assert.equal(dialog.role, "alertdialog");
});

test("field validation preserves caller help descriptions and adds the error association", () => {
  const normalMarkup = renderToStaticMarkup(
    createElement(KitField, {
      label: "Email",
      id: "email",
      name: "email",
      type: "email",
      required: true,
      autoComplete: "email",
      className: "custom-field",
      "aria-describedby": "email-hint privacy-note",
      "aria-invalid": "grammar",
    }),
  );
  const normal = attributes(normalMarkup, "input");
  assert.equal(normal.name, "email");
  assert.equal(normal.type, "email");
  assert.equal(normal.required, "");
  assert.equal(normal.autoComplete, "email");
  assert.equal(normal.class, "custom-field");
  assert.equal(normal["aria-describedby"], "email-hint privacy-note");
  assert.equal(normal["aria-invalid"], "grammar");
  assert.equal(attributes(normalMarkup, "label").for, "email");

  const invalidMarkup = renderToStaticMarkup(
    createElement(KitField, {
      label: "Email",
      id: "email",
      error: "Enter a valid email address",
      "aria-describedby": "email-hint privacy-note",
      "aria-invalid": false,
    }),
  );
  const invalid = attributes(invalidMarkup, "input");
  assert.equal(
    invalid["aria-describedby"],
    "email-hint privacy-note email-error",
  );
  assert.equal(invalid["aria-invalid"], "true");
  assert.equal(attributes(invalidMarkup, "p").id, "email-error");
  assert.ok(invalidMarkup.includes("Enter a valid email address"));
});

test("an example thumbnail contains one link and no nested interactive preview", () => {
  const example = examplesByStyle["wabi-sabi"][0];
  const returnTo = "/examples/?q=DM%20Sans&style=wabi-sabi&kind=shop&count=24";
  const markup = renderToStaticMarkup(
    createElement(ExampleThumbnail, { example, returnTo }),
  );
  assert.equal([...markup.matchAll(/<a(?:\s|>)/g)].length, 1);
  assert.doesNotMatch(
    markup,
    /<(?:button|input|select|textarea|dialog|form)\b/,
  );
  const anchor = attributes(markup, "a");
  const destination = new URL(anchor.href, "https://designkit.local");
  assert.equal(
    destination.pathname.replace(/\/$/, ""),
    `/examples/${example.id}`,
  );
  assert.equal(destination.searchParams.get("return"), returnTo);
  assert.equal(anchor["aria-label"], `Explore ${example.brand}`);
  const image = attributes(markup, "img");
  assert.equal(image.src, `/previews/${example.id}-desktop.webp`);
  assert.equal(image.alt, "");
  assert.equal(image.loading, "lazy");
});
