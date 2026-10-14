import Link from "next/link";
import type { DesignExample, StyleRecipe } from "../../data/kit-types";
import ExampleCanvas from "./ExampleCanvas";

export default function ExampleThumbnail({
  example,
  recipe,
}: {
  example: DesignExample;
  recipe: StyleRecipe;
}) {
  return (
    <article className="example-teaser">
      <Link
        href={`/examples/${example.id}`}
        className="example-teaser-link"
        aria-label={`Explore ${example.brand}`}
      >
        <div className="example-thumbnail" inert aria-hidden="true">
          <ExampleCanvas example={example} recipe={recipe} />
        </div>
        <div className="example-teaser-title">
          <h2>{example.brand}</h2>
          <span aria-hidden="true">↗</span>
        </div>
      </Link>
      <p>{example.headline}</p>
      <span className="example-teaser-meta">
        {example.kind} · {example.fonts.heading} + {example.fonts.body}
      </span>
    </article>
  );
}
