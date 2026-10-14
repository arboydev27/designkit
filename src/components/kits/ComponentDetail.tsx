"use client";
import Link from "next/link";
import type { KitComponent, StyleKit } from "../../data/kit-types";
import { exportCss } from "../../lib/kit-tokens";
import { downloadText } from "../../lib/download";
import ComponentSample from "./ComponentSample";
import BackLink from "./BackLink";
import ContextLink from "./ContextLink";
import useUrlQuery from "./useUrlQuery";
import BoardPicker from "./BoardPicker";
import CommandBox from "./CommandBox";
import { componentStates } from "../../lib/component-states";

export default function ComponentDetail({
  component,
  kit,
}: {
  component: KitComponent;
  kit: StyleKit;
}) {
  const { params, update } = useUrlQuery();
  const state =
    componentStates(component.kind).find(
      (option) => option === params.get("state"),
    ) || "default";
  const css = exportCss(kit.examples[0], kit.recipe);
  return (
    <>
      <BackLink fallback="/components/">← Back to components</BackLink>
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
                disabled={componentStates(component.kind).length === 1}
                onChange={(event) =>
                  update({
                    state:
                      event.target.value === "default"
                        ? null
                        : event.target.value,
                  })
                }
              >
                {componentStates(component.kind).map((option) => (
                  <option key={option} value={option}>
                    {option === "disabled" && component.kind === "status"
                      ? "Empty"
                      : option[0].toUpperCase() + option.slice(1)}
                  </option>
                ))}
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
      <section className="component-source-download">
        <h2>Use this pattern.</h2>
        <p>
          Install the source in a configured shadcn project, or copy the
          self-contained React kit.
        </p>
        <CommandBox
          command="npx shadcn@latest add {url}"
          originPath={`/r/${component.id}.json`}
        />
        <div className="kit-example-links">
          <a href={`/kits/components/${component.id}.zip`} download>
            Download source ZIP ↗
          </a>
          <a href={`/kits/components/${component.id}.tsx`}>
            Read the component ↗
          </a>
          <a href={`/r/${component.id}.json`}>Registry JSON ↗</a>
        </div>
      </section>
      <BoardPicker item={{ kind: "component", id: component.id }} />
      <details className="example-source">
        <summary>Inspect the style tokens</summary>
        <pre>
          <code>{css}</code>
        </pre>
      </details>
      <div className="kit-example-links">
        <ContextLink
          href={`/styles/${component.styleId}/`}
          fallback={`/components/${component.id}/`}
        >
          Explore the full {kit.style.name} kit ↗
        </ContextLink>
        <Link href={`/components?style=${component.styleId}`}>
          All six {kit.style.name} components ↗
        </Link>
      </div>
    </>
  );
}
