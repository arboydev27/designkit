import Link from "next/link";
import type { DesignExample } from "../../data/kit-types";
import { withReturnPath } from "../../lib/navigation";

export default function ExampleThumbnail({
  example,
  returnTo = "/examples/",
}: {
  example: DesignExample;
  returnTo?: string;
}) {
  return (
    <article className="example-teaser">
      <Link
        href={withReturnPath(`/examples/${example.id}/`, returnTo)}
        className="example-teaser-link"
        aria-label={`Explore ${example.brand}`}
      >
        <div className="example-thumbnail">
          <img
            src={`/previews/${example.id}-desktop.webp`}
            alt=""
            width={1280}
            height={900}
            loading="lazy"
            decoding="async"
          />
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
