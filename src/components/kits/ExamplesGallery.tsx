"use client";
import { examplesByStyle } from "../../data/examples";
import { styles } from "../../data/styles";
import { exampleKinds } from "../../data/kit-types";
import { exampleFilters, matchesExample } from "../../lib/gallery-filters";
import useUrlQuery from "./useUrlQuery";
import ExampleThumbnail from "./ExampleThumbnail";

const discoveryExamples = [0, 1, 2].flatMap((index) =>
  styles.map((style) => examplesByStyle[style.id][index]),
);

export default function ExamplesGallery() {
  const { params, update, search } = useUrlQuery();
  const { query, styleId, kind, limit } = exampleFilters(params);
  const shown = discoveryExamples.filter(
    (example) =>
      (!styleId || example.styleId === styleId) &&
      (!kind || example.kind === kind) &&
      matchesExample(example, query),
  );
  const more = () => {
    update({ count: limit + 12 });
    requestAnimationFrame(() =>
      document
        .querySelectorAll<HTMLElement>(".example-teaser-link")
        [limit]?.focus(),
    );
  };
  return (
    <>
      <div className="kit-page-intro">
        <p>Three ways into every direction.</p>
        <h1>Ideas, in use.</h1>
        <p>
          66 original examples. Explore a visual language across different
          projects, then take its decisions into your own.
        </p>
      </div>
      <div className="kit-browse-controls">
        <label className="kit-search-label">
          Find an example
          <input
            type="search"
            name="q"
            autoComplete="off"
            value={query}
            onChange={(event) => {
              update({ q: event.target.value, count: null }, true);
            }}
            placeholder="A mood, font, style, or project…"
          />
        </label>
        <label>
          Design language
          <select
            value={styleId}
            onChange={(event) => {
              update({ style: event.target.value, count: null });
            }}
          >
            <option value="">All 22 styles</option>
            {styles.map((style) => (
              <option key={style.id} value={style.id}>
                {style.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Project type
          <select
            value={kind}
            onChange={(event) => {
              update({ kind: event.target.value, count: null });
            }}
          >
            <option value="">Every project type</option>
            {exampleKinds.map((kind) => (
              <option key={kind}>{kind}</option>
            ))}
          </select>
        </label>
      </div>
      <p className="kit-results" role="status">
        {shown.length} {shown.length === 1 ? "example" : "examples"} · Showing{" "}
        {Math.min(limit, shown.length)}
      </p>
      <div className="example-gallery">
        {shown.slice(0, limit).map((example) => (
          <ExampleThumbnail
            key={example.id}
            example={example}
            returnTo={`/examples/${search}`}
          />
        ))}
      </div>
      {!shown.length ? (
        <div className="empty-state">
          <h2>Try another direction.</h2>
          <p>No examples match those choices.</p>
          <button
            className="primary-button"
            type="button"
            onClick={() => {
              update({ q: null, style: null, kind: null, count: null });
            }}
          >
            Explore every example
          </button>
        </div>
      ) : null}
      {shown.length > limit ? (
        <div className="kit-load-more">
          <button className="primary-button" type="button" onClick={more}>
            Show more examples
          </button>
          <span>
            {Math.min(limit, shown.length)} of {shown.length}
          </span>
        </div>
      ) : null}
    </>
  );
}
