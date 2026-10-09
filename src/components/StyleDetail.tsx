"use client";

import { useState } from "react";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  Check,
  Copy,
  GitCompareArrows,
  Monitor,
  Smartphone,
  Sparkles,
  Type,
  X,
} from "lucide-react";
import type { DesignStyle } from "@/data/styles";
import { StylePreview } from "./StylePreview";

type StyleDetailProps = {
  style: DesignStyle;
  saved: boolean;
  onSave: () => void;
  onBack: () => void;
  onCompare: () => void;
  onCopy: (text: string, message?: string) => void;
};

function fontUrl(family: string) {
  return `https://fonts.google.com/specimen/${encodeURIComponent(family).replaceAll("%20", "+")}`;
}

function cssTokens(style: DesignStyle) {
  return `/* ${style.name} · Form Atlas */\n:root {\n${style.palette
    .map(
      ({ name, hex }) =>
        `  --${name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")}: ${hex};`,
    )
    .join(
      "\n",
    )}\n  --font-heading: '${style.fonts.heading}';\n  --font-body: '${style.fonts.body}';\n}`;
}

function TypographyLab({ style }: { style: DesignStyle }) {
  const [sample, setSample] = useState("A different way to see.");
  return (
    <section
      className="detail-section detail-type-section"
      aria-labelledby="detail-type-heading"
    >
      <div className="detail-section-heading">
        <div>
          <span className="detail-eyebrow">THE VOICE</span>
          <h2 id="detail-type-heading">Typography</h2>
        </div>
        <Type size={21} aria-hidden="true" />
      </div>
      <p className="detail-section-description">
        A suggested pairing to bring the direction to life.
      </p>
      <label className="detail-sample-label" htmlFor="detail-type-sample">
        Try your own heading
      </label>
      <input
        id="detail-type-sample"
        className="detail-sample-input"
        value={sample}
        onChange={(event) => setSample(event.target.value)}
        placeholder="A different way to see."
        maxLength={100}
      />
      <div className="detail-font-specimen">
        <div className="detail-font-meta">
          <span>HEADINGS</span>
          <a
            href={fontUrl(style.fonts.heading)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {style.fonts.heading}
            <ArrowUpRight size={14} aria-hidden="true" />
            <span className="detail-sr-only">
              {" "}
              on Google Fonts (opens in a new tab)
            </span>
          </a>
        </div>
        <p
          className="detail-heading-specimen"
          style={{ fontFamily: `"${style.fonts.heading}", Georgia, serif` }}
        >
          {sample || "A different way to see."}
        </p>
      </div>
      <div className="detail-font-specimen detail-body-specimen">
        <div className="detail-font-meta">
          <span>BODY</span>
          <a
            href={fontUrl(style.fonts.body)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {style.fonts.body}
            <ArrowUpRight size={14} aria-hidden="true" />
            <span className="detail-sr-only">
              {" "}
              on Google Fonts (opens in a new tab)
            </span>
          </a>
        </div>
        <p
          style={{ fontFamily: `"${style.fonts.body}", system-ui, sans-serif` }}
        >
          Good design makes room for the things that matter. Let your words,
          shapes, and details tell the same story.
        </p>
        <span
          className="detail-alphabet"
          style={{ fontFamily: `"${style.fonts.body}", system-ui, sans-serif` }}
        >
          Aa Bb Cc Dd Ee Ff Gg · 0123456789
        </span>
      </div>
      <p className="detail-font-rationale">{style.fonts.rationale}</p>
    </section>
  );
}

export default function StyleDetail({
  style,
  saved,
  onSave,
  onBack,
  onCompare,
  onCopy,
}: StyleDetailProps) {
  const [mode, setMode] = useState<"desktop" | "mobile">("desktop");
  return (
    <article className="detail-page">
      <button type="button" className="detail-back" onClick={onBack}>
        <ArrowLeft size={16} aria-hidden="true" /> Back to browsing
      </button>
      <header className="detail-header">
        <div className="detail-intro">
          <span className="detail-category">{style.category}</span>
          <h1>
            {style.name}
            <span className="detail-title-dot">.</span>
          </h1>
          <p className="detail-tagline">{style.tagline}</p>
          <p className="detail-description">{style.description}</p>
        </div>
        <div className="detail-actions">
          <button
            type="button"
            className={`detail-button detail-button-primary${saved ? " detail-button-saved" : ""}`}
            onClick={onSave}
            aria-pressed={saved}
          >
            <Bookmark
              size={16}
              fill={saved ? "currentColor" : "none"}
              aria-hidden="true"
            />
            {saved ? "Saved to collection" : "Save to collection"}
          </button>
          <div className="detail-secondary-actions">
            <button type="button" className="detail-button" onClick={onCompare}>
              <GitCompareArrows size={16} aria-hidden="true" />
              Compare
            </button>
            <a
              className="detail-button"
              href={`/briefs/${style.id}-design-brief.md`}
              download
            >
              <ArrowDownToLine size={16} aria-hidden="true" />
              Export brief
            </a>
          </div>
        </div>
      </header>

      <section
        className="detail-preview"
        aria-labelledby="detail-preview-heading"
      >
        <div className="detail-preview-toolbar">
          <div className="detail-preview-label">
            <span className="detail-preview-dot" />
            <h2 id="detail-preview-heading">Style in action</h2>
            <span className="detail-preview-caption">
              An illustrative specimen
            </span>
          </div>
          <div
            className="detail-device-switch"
            role="group"
            aria-label="Preview viewport"
          >
            <button
              type="button"
              aria-pressed={mode === "desktop"}
              onClick={() => setMode("desktop")}
            >
              <Monitor size={16} aria-hidden="true" />
              <span>Desktop</span>
            </button>
            <button
              type="button"
              aria-pressed={mode === "mobile"}
              onClick={() => setMode("mobile")}
            >
              <Smartphone size={16} aria-hidden="true" />
              <span>Mobile</span>
            </button>
          </div>
        </div>
        <div
          className={`detail-preview-scroll detail-preview-scroll-${mode}`}
          tabIndex={mode === "desktop" ? 0 : undefined}
          role="region"
          aria-label={`${style.name} ${mode} specimen${mode === "desktop" ? ". Scroll horizontally on smaller screens." : ""}`}
        >
          <div className={`detail-device detail-device-${mode}`}>
            <StylePreview id={style.id} mode={mode} />
          </div>
        </div>
        <div className="detail-preview-footnote">
          <span>
            {mode === "desktop"
              ? "A little room to explore the big picture."
              : "The same visual language, composed for a smaller screen."}
          </span>
          <span>{mode === "desktop" ? "DESKTOP VIEW" : "MOBILE VIEW"}</span>
        </div>
      </section>

      <div className="detail-guide-grid">
        <div className="detail-guide-column">
          <section
            className="detail-section"
            aria-labelledby="detail-palette-heading"
          >
            <div className="detail-section-heading">
              <div>
                <span className="detail-eyebrow">THE PALETTE</span>
                <h2 id="detail-palette-heading">Color, with character</h2>
              </div>
              <button
                type="button"
                className="detail-text-button"
                onClick={() =>
                  onCopy(cssTokens(style), "Palette and font CSS copied")
                }
              >
                <Copy size={14} aria-hidden="true" />
                Copy CSS
              </button>
            </div>
            <p className="detail-section-description">
              A starting palette. Click any swatch to copy its hex.
            </p>
            <div className="detail-palette">
              {style.palette.map((color) => (
                <button
                  type="button"
                  key={color.hex}
                  className="detail-color"
                  onClick={() =>
                    onCopy(color.hex, `${color.name} copied — ${color.hex}`)
                  }
                  aria-label={`Copy ${color.name}, ${color.hex}`}
                >
                  <span
                    className="detail-color-fill"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span className="detail-color-copy">
                      <Copy size={16} aria-hidden="true" />
                    </span>
                  </span>
                  <span className="detail-color-name">{color.name}</span>
                  <span className="detail-color-hex">{color.hex}</span>
                </button>
              ))}
            </div>
          </section>

          <section
            className="detail-section"
            aria-labelledby="detail-character-heading"
          >
            <div className="detail-section-heading">
              <div>
                <span className="detail-eyebrow">THE DNA</span>
                <h2 id="detail-character-heading">
                  What makes it feel this way
                </h2>
              </div>
            </div>
            <ul className="detail-traits">
              {style.traits.map((trait) => (
                <li key={trait}>
                  <span className="detail-trait-marker" aria-hidden="true" />
                  {trait}
                </li>
              ))}
            </ul>
            <h3 className="detail-small-heading">Works well for</h3>
            <div className="detail-use-cases">
              {style.useCases.map((useCase) => (
                <span key={useCase}>{useCase}</span>
              ))}
            </div>
          </section>
        </div>

        <div className="detail-guide-column">
          <TypographyLab key={style.id} style={style} />
        </div>
      </div>

      <section
        className="detail-practice"
        aria-labelledby="detail-practice-heading"
      >
        <div className="detail-section-heading">
          <div>
            <span className="detail-eyebrow">PUT IT INTO PRACTICE</span>
            <h2 id="detail-practice-heading">Make the direction work</h2>
          </div>
          <Sparkles size={21} aria-hidden="true" />
        </div>
        <div className="detail-practice-grid">
          <div>
            <h3>
              <Check size={17} aria-hidden="true" />
              Lean into
            </h3>
            <ul>
              {style.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>
              <X size={17} aria-hidden="true" />
              Be mindful of
            </h3>
            <ul>
              {style.avoid.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {style.sources?.length ? (
        <section
          className="detail-resources"
          aria-labelledby="detail-resources-heading"
        >
          <div>
            <span className="detail-eyebrow">GO A LITTLE DEEPER</span>
            <h2 id="detail-resources-heading">Further reading</h2>
          </div>
          <div className="detail-resource-links">
            {style.sources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {source.label}
                <ArrowUpRight size={16} aria-hidden="true" />
                <span className="detail-sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        </section>
      ) : null}
      <footer className="detail-footer">
        <span>Think of this as a starting point, not a rulebook.</span>
        <a
          className="detail-text-button"
          href={`/briefs/${style.id}-design-brief.md`}
          download
        >
          Take the direction with you
          <ArrowDownToLine size={15} aria-hidden="true" />
        </a>
      </footer>
    </article>
  );
}
