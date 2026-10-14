"use client";
import { useState } from "react";
import Link from "next/link";
import type { KitComponent, StyleKit } from "../../data/kit-types";
import { exportCss } from "../../lib/kit-tokens";
import { downloadText } from "../../lib/download";
import ComponentSample from "./ComponentSample";

export default function ComponentDetail({
  component,
  kit,
}: {
  component: KitComponent;
  kit: StyleKit;
}) {
  const [state, setState] = useState<
    "default" | "disabled" | "loading" | "error"
  >("default");
  const css = exportCss(kit.examples[0], kit.recipe);
  return (
    <>
      <Link href="/components" className="kit-example-return">
        ← All components
      </Link>
      <div className="kit-page-intro">
        <p>
          {kit.style.name} · {component.kind}
        </p>
        <h1>
          {kit.style.name} {component.kind}.
        </h1>
        <p>{kit.recipe.signature}</p>
      </div>
      <div className="component-detail-grid">
        <div>
          <div className="example-workspace-toolbar">
            <label className="component-state-control">
              Try a state
              <select
                value={state}
                onChange={(event) =>
                  setState(event.target.value as typeof state)
                }
              >
                <option value="default">Default</option>
                <option value="disabled">Disabled / empty</option>
                <option value="loading">Loading</option>
                <option value="error">Error</option>
              </select>
            </label>
          </div>
          <ComponentSample
            component={component}
            example={kit.examples[0]}
            recipe={kit.recipe}
            state={state}
          />
        </div>
        <aside className="component-guidance">
          <h2>Keep its character.</h2>
          <p>{kit.recipe.composition}</p>
          <p>{kit.recipe.motion}</p>
          <h3>Be mindful of</h3>
          <ul>
            {kit.style.avoid.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <button
            type="button"
            className="primary-button"
            onClick={() => downloadText(`${component.id}.css`, css, "text/css")}
          >
            Export style tokens
          </button>
        </aside>
      </div>
      <details className="example-source">
        <summary>Inspect the style tokens</summary>
        <pre>
          <code>{css}</code>
        </pre>
      </details>
      <div className="kit-example-links">
        <Link href={`/styles/${component.styleId}`}>
          Explore the full {kit.style.name} kit ↗
        </Link>
        <Link href={`/components?style=${component.styleId}`}>
          All six {kit.style.name} components ↗
        </Link>
      </div>
    </>
  );
}
