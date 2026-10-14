"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDownToLine, RotateCcw } from "lucide-react";
import type {
  DesignExample,
  PlaygroundSettings,
  StyleRecipe,
} from "../../data/kit-types";
import {
  contrast,
  defaultSettings,
  exportCss,
  exportDesignTokens,
  exportTailwind,
  fontFamilies,
  resolveTokens,
} from "../../lib/kit-tokens";
import { downloadText } from "../../lib/download";
import ExampleCanvas from "./ExampleCanvas";
import BoardPicker from "./BoardPicker";

export default function ExampleWorkspace({
  examples,
  recipe,
  initialId,
}: {
  examples: DesignExample[];
  recipe: StyleRecipe;
  initialId?: string;
}) {
  const [id, setId] = useState(initialId || examples[0].id);
  const example = examples.find((entry) => entry.id === id) || examples[0];
  const [settings, setSettings] = useState<PlaygroundSettings>(() =>
    defaultSettings(example, recipe),
  );
  const [mode, setMode] = useState<"desktop" | "mobile">("desktop");
  const [showControls, setShowControls] = useState(true);
  const [saveKind, setSaveKind] = useState("example");
  const [format, setFormat] = useState<"css" | "tailwind" | "json">("css");
  const values = resolveTokens(example, recipe, settings).values;
  const source =
    format === "css"
      ? exportCss(example, recipe, settings)
      : format === "tailwind"
        ? exportTailwind(example, recipe, settings)
        : JSON.stringify(
            exportDesignTokens(example, recipe, settings),
            null,
            2,
          );
  const update = <K extends keyof PlaygroundSettings>(
    key: K,
    value: PlaygroundSettings[K],
  ) => setSettings((current) => ({ ...current, [key]: value }));
  return (
    <section
      className="example-workspace"
      aria-label="Interactive example playground"
    >
      {examples.length > 1 ? (
        <div
          className="example-picker"
          role="group"
          aria-label="Choose an interpretation"
        >
          {examples.map((entry, index) => (
            <button
              type="button"
              key={entry.id}
              aria-pressed={entry.id === example.id}
              onClick={() => {
                setId(entry.id);
                setSettings(defaultSettings(entry, recipe));
              }}
            >
              <span>
                0{index + 1} · {entry.kind}
              </span>
              <strong>{entry.brand}</strong>
            </button>
          ))}
        </div>
      ) : null}
      <div className="example-workspace-toolbar">
        <div
          className="example-device-options"
          role="group"
          aria-label="Example viewport"
        >
          {(["desktop", "mobile"] as const).map((device) => (
            <button
              type="button"
              key={device}
              aria-pressed={device === mode}
              onClick={() => setMode(device)}
            >
              {device === "desktop" ? "Desktop" : "Mobile"}
            </button>
          ))}
        </div>
        <button
          className="small-button"
          type="button"
          aria-expanded={showControls}
          onClick={() => setShowControls(!showControls)}
        >
          {showControls ? "Hide" : "Show"} playground
        </button>
        <Link className="text-link" href={`/examples/${example.id}`}>
          Open example ↗
        </Link>
      </div>
      <div
        className={`example-workspace-grid ${showControls ? "" : "example-workspace-wide"}`}
      >
        <div
          className="example-viewport"
          tabIndex={0}
          role="region"
          aria-label={`${example.brand} ${mode} preview${mode === "desktop" ? ". Scroll horizontally if needed." : ""}`}
        >
          <div className={`example-device example-device-${mode}`}>
            <ExampleCanvas
              key={example.id}
              example={example}
              recipe={recipe}
              settings={settings}
            />
          </div>
        </div>
        {showControls ? (
          <aside
            className="example-inspector"
            aria-label="Customize this example"
          >
            <div className="example-inspector-heading">
              <h3>Make it yours.</h3>
              <button
                type="button"
                className="icon-button"
                aria-label="Reset playground"
                onClick={() => setSettings(defaultSettings(example, recipe))}
              >
                <RotateCcw size={17} />
              </button>
            </div>
            <label>
              Headline
              <textarea
                maxLength={120}
                value={settings.headline}
                onChange={(event) => update("headline", event.target.value)}
                rows={3}
              />
            </label>
            <label>
              Heading font
              <select
                value={settings.headingFont}
                onChange={(event) => update("headingFont", event.target.value)}
              >
                {fontFamilies.map((family) => (
                  <option key={family}>{family}</option>
                ))}
              </select>
            </label>
            <label>
              Body font
              <select
                value={settings.bodyFont}
                onChange={(event) => update("bodyFont", event.target.value)}
              >
                {fontFamilies.map((family) => (
                  <option key={family}>{family}</option>
                ))}
              </select>
            </label>
            <label>
              Accent color
              <span className="example-color-input">
                <input
                  type="color"
                  value={settings.accent}
                  onChange={(event) => update("accent", event.target.value)}
                />
                <span>{settings.accent.toUpperCase()}</span>
              </span>
            </label>
            <label>
              Corner radius <output>{settings.radius}px</output>
              <input
                type="range"
                min={recipe.controls.radius[0]}
                max={recipe.controls.radius[1]}
                value={settings.radius}
                onChange={(event) =>
                  update("radius", Number(event.target.value))
                }
              />
            </label>
            {recipe.controls.shadow ? (
              <label>
                Shadow strength <output>{settings.shadow}%</output>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={settings.shadow}
                  onChange={(event) =>
                    update("shadow", Number(event.target.value))
                  }
                />
              </label>
            ) : null}
            <label>
              Spacing <output>{settings.spacing}px</output>
              <input
                type="range"
                min={recipe.controls.spacing[0]}
                max={recipe.controls.spacing[1]}
                value={settings.spacing}
                onChange={(event) =>
                  update("spacing", Number(event.target.value))
                }
              />
            </label>
            <p className="example-contrast">
              Body text contrast:{" "}
              {contrast(values["--dk-canvas"], values["--dk-ink"]).toFixed(1)}:1
            </p>
            <label>
              Export format
              <select
                value={format}
                onChange={(event) =>
                  setFormat(event.target.value as typeof format)
                }
              >
                <option value="css">CSS variables</option>
                <option value="tailwind">Tailwind v4 theme</option>
                <option value="json">Design tokens JSON</option>
              </select>
            </label>
            <button
              type="button"
              className="primary-button"
              onClick={() =>
                downloadText(
                  `${example.id}.${format === "json" ? "tokens.json" : "css"}`,
                  source,
                  format === "json" ? "application/json" : "text/css",
                )
              }
            >
              <ArrowDownToLine size={16} /> Export these decisions
            </button>
          </aside>
        ) : null}
      </div>
      <div className="example-anatomy">
        <h3>Why this works.</h3>
        <div>
          {example.anatomy.map((item) => (
            <article key={item.decision}>
              <h4>{item.decision}</h4>
              <p>{item.reason}</p>
            </article>
          ))}
        </div>
      </div>
      <label className="board-save-kind">
        Save a decision
        <select
          value={saveKind}
          onChange={(event) => setSaveKind(event.target.value)}
        >
          <option value="example">Example and playground choices</option>
          <option value="palette">This example's palette</option>
          <option value="heading">Selected heading font</option>
          <option value="body">Selected body font</option>
        </select>
      </label>
      <BoardPicker
        item={
          saveKind === "example"
            ? { kind: "example", id: example.id, settings }
            : saveKind === "palette"
              ? { kind: "palette", id: example.id, settings }
              : {
                  kind: "font",
                  id:
                    saveKind === "heading"
                      ? settings.headingFont
                      : settings.bodyFont,
                }
        }
      />
      <details className="example-source">
        <summary>
          Inspect the exported {format === "json" ? "tokens" : "CSS"}
        </summary>
        <pre>
          <code>{source}</code>
        </pre>
      </details>
    </section>
  );
}
