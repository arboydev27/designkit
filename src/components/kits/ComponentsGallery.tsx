"use client";
import Link from "next/link";
import { styles } from "../../data/styles";
import { kitsById, components } from "../../data/kits";
import { componentStates } from "../../lib/component-states";
import { componentKinds } from "../../data/kit-types";
import { componentFilters } from "../../lib/gallery-filters";
import { withReturnPath } from "../../lib/navigation";
import useUrlQuery from "./useUrlQuery";
import ComponentSample from "./ComponentSample";

export default function ComponentsGallery() {
  const { params, update, search } = useUrlQuery();
  const { styleId, kind, state, limit } = componentFilters(params);
  const more = () => {
    update({ count: limit + 12 });
    requestAnimationFrame(() =>
      document
        .querySelectorAll<HTMLElement>(".component-teaser-link")
        [limit]?.focus(),
    );
  };
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
              update({
                style: event.target.value,
                kind: kind || "all",
                count: null,
              });
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
              update({
                kind: event.target.value || "all",
                state: null,
                count: null,
              });
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
            disabled={componentStates(kind).length === 1}
            onChange={(event) =>
              update({
                state:
                  event.target.value === "default" ? null : event.target.value,
              })
            }
          >
            {componentStates(kind).map((option) => (
              <option key={option} value={option}>
                {option === "disabled" && kind === "status"
                  ? "Empty"
                  : option[0].toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="kit-results" role="status">
        {shown.length} {shown.length === 1 ? "component" : "components"}
        {kind ? ` · ${kind}` : ""} · Showing {Math.min(limit, shown.length)}
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
                <Link
                  className="component-teaser-link"
                  href={withReturnPath(
                    `/components/${component.id}/`,
                    `/components/${search}`,
                  )}
                >
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
          <button className="primary-button" onClick={more}>
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
