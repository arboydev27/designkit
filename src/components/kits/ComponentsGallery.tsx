"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { styles } from "../../data/styles";
import { kitsById, components } from "../../data/kits";
import { componentKinds } from "../../data/kit-types";
import ComponentSample from "./ComponentSample";

export default function ComponentsGallery() {
  const [styleId, setStyleId] = useState("");
  const [kind, setKind] = useState("button");
  const [state, setState] = useState<
    "default" | "disabled" | "loading" | "error"
  >("default");
  const [limit, setLimit] = useState(12);
  useEffect(() => {
    const requested = new URLSearchParams(location.search).get("style");
    if (requested && kitsById[requested]) {
      setStyleId(requested);
      setKind("");
    }
  }, []);
  const shown = components.filter(
    (component) =>
      (!styleId || component.styleId === styleId) &&
      (!kind || component.kind === kind),
  );
  return (
    <>
      <div className="kit-page-intro">
        <p>The same purpose. A different personality.</p>
        <h1>Details make the direction.</h1>
        <p>
          132 reusable patterns across 22 styles. Compare the same component,
          try its states, and inspect the decisions behind it.
        </p>
      </div>
      <div className="kit-browse-controls">
        <label>
          Design language
          <select
            value={styleId}
            onChange={(event) => {
              setStyleId(event.target.value);
              setLimit(12);
            }}
          >
            <option value="">Compare all styles</option>
            {styles.map((style) => (
              <option key={style.id} value={style.id}>
                {style.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Component
          <select
            value={kind}
            onChange={(event) => {
              setKind(event.target.value);
              setLimit(12);
            }}
          >
            <option value="">Every pattern</option>
            {componentKinds.map((kind) => (
              <option key={kind}>{kind}</option>
            ))}
          </select>
        </label>
        <label>
          Preview state
          <select
            value={state}
            onChange={(event) => setState(event.target.value as typeof state)}
          >
            <option value="default">Default</option>
            <option value="disabled">Disabled / empty</option>
            <option value="loading">Loading</option>
            <option value="error">Error</option>
          </select>
        </label>
      </div>
      <p className="kit-results" role="status">
        {shown.length} {shown.length === 1 ? "component" : "components"}
        {kind ? ` · ${kind}` : ""}
      </p>
      <div className="component-gallery">
        {shown.slice(0, limit).map((component) => {
          const kit = kitsById[component.styleId];
          return (
            <article className="component-teaser" key={component.id}>
              <ComponentSample
                component={component}
                example={kit.examples[0]}
                recipe={kit.recipe}
                state={state}
              />
              <div>
                <Link href={`/components/${component.id}`}>
                  <h2>
                    {kit.style.name} <span aria-hidden="true">↗</span>
                  </h2>
                </Link>
                <p>
                  {component.kind} · {kit.recipe.shadow} shadow ·{" "}
                  {kit.recipe.radius}px radius
                </p>
              </div>
            </article>
          );
        })}
      </div>
      {shown.length > limit ? (
        <div className="kit-load-more">
          <button
            className="primary-button"
            onClick={() => setLimit((current) => current + 12)}
          >
            Show more components
          </button>
          <span>
            {Math.min(limit, shown.length)} of {shown.length}
          </span>
        </div>
      ) : null}
    </>
  );
}
