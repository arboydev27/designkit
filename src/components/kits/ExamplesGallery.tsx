"use client";
import { useState } from "react";
import { examplesByStyle } from "../../data/examples";
import { styles } from "../../data/styles";
import { recipes } from "../../data/recipes";
import { exampleKinds } from "../../data/kit-types";
import ExampleThumbnail from "./ExampleThumbnail";

const discoveryExamples = [0, 1, 2].flatMap((index) =>
  styles.map((style) => examplesByStyle[style.id][index]),
);

export default function ExamplesGallery() {
  const [query, setQuery] = useState("");
  const [styleId, setStyleId] = useState("");
  const [kind, setKind] = useState("");
  const [limit, setLimit] = useState(12);
  const shown = discoveryExamples.filter(
    (example) =>
      (!styleId || example.styleId === styleId) &&
      (!kind || example.kind === kind) &&
      `${example.brand} ${example.headline} ${example.description} ${example.styleId} ${example.fonts.heading}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
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
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setLimit(12);
            }}
            placeholder="A mood, font, style, or project…"
          />
        </label>
        <label>
          Design language
          <select
            value={styleId}
            onChange={(event) => {
              setStyleId(event.target.value);
              setLimit(12);
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
              setKind(event.target.value);
              setLimit(12);
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
        {shown.length} {shown.length === 1 ? "example" : "examples"}
      </p>
      <div className="example-gallery">
        {shown.slice(0, limit).map((example) => (
          <ExampleThumbnail
            key={example.id}
            example={example}
            recipe={recipes[example.styleId]}
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
              setQuery("");
              setStyleId("");
              setKind("");
            }}
          >
            Explore every example
          </button>
        </div>
      ) : null}
      {shown.length > limit ? (
        <div className="kit-load-more">
          <button
            className="primary-button"
            type="button"
            onClick={() => setLimit((current) => current + 12)}
          >
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
