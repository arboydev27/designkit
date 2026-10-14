"use client";

import { useId, useState, type CSSProperties, type MouseEvent } from "react";
import type {
  DesignExample,
  PlaygroundSettings,
  StyleRecipe,
} from "./types";
import { resolveTokens } from "./tokens";
import {
  KitButton,
  KitCard,
  KitDialog,
  KitField,
  KitNavigation,
  KitStatus,
} from "./KitControls";

export function ExampleArtwork({
  label,
  index = 0,
}: {
  label: string;
  index?: number;
}) {
  return (
    <div className={`kit-art kit-art-${index % 3}`} aria-hidden="true">
      <span className="kit-art-circle" />
      <span className="kit-art-object" />
      <span className="kit-art-line" />
      <span className="kit-art-letter">{label.slice(0, 1)}</span>
    </div>
  );
}

export default function ExampleCanvas({
  example,
  recipe,
  settings = {},
}: {
  example: DesignExample;
  recipe: StyleRecipe;
  settings?: Partial<PlaygroundSettings>;
}) {
  const { values, settings: normalized } = resolveTokens(
    example,
    recipe,
    settings,
  );
  const baseId = useId().replaceAll(":", "");
  const sectionId = `${baseId}-collection`;
  const aboutId = `${baseId}-about`;
  const [cart, setCart] = useState<string[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("Today");
  const [note, setNote] = useState("");
  const [selectedSession, setSelectedSession] = useState(
    example.items[0].title,
  );
  const filtered = example.items.filter((item) =>
    `${item.title} ${item.label}`.toLowerCase().includes(query.toLowerCase()),
  );
  const headline = normalized.headline;
  const focusSection = (id: string) => {
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: "instant", block: "start" });
    target?.focus({ preventScroll: true });
  };
  const navigateWithinExample = (
    href: string,
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    focusSection(href.slice(1));
  };
  const goToContent = () => focusSection(sectionId);
  const contextLabel = {
    shop: "A considered collection",
    journal: "An independent journal",
    studio: "An independent practice",
    planner: "Your space for today",
    event: "A gathering of good ideas",
    archive: "An open working collection",
  }[example.kind];
  const contentHeading = {
    shop: "Objects with a point of view.",
    journal: "Stories worth a closer look.",
    studio: "A few things we've made.",
    planner: "A little progress, at your pace.",
    event: "Make a day of it.",
    archive: "Find the next useful idea.",
  }[example.kind];
  return (
    <article
      className={`kit-canvas kit-style-${example.styleId} kit-layout-${example.kind} kit-texture-${recipe.texture}`}
      style={values as CSSProperties}
      aria-label={`${example.brand} ${example.kind} example`}
    >
      <KitNavigation
        brand={example.brand}
        onNavigate={navigateWithinExample}
        links={[
          {
            label:
              example.kind === "shop"
                ? "Collection"
                : example.kind === "event"
                  ? "Programme"
                  : "Explore",
            href: `#${sectionId}`,
          },
          { label: "Our approach", href: `#${aboutId}` },
        ]}
      />
      {example.kind === "shop" ? (
        <p className="kit-cart" role="status">
          Bag ({cart.length})
        </p>
      ) : null}
      <header className="kit-hero">
        <div className="kit-hero-copy">
          <p className="kit-kicker">{contextLabel}</p>
          <h2>{headline}</h2>
          <p className="kit-description">{example.description}</p>
          <KitButton onClick={goToContent}>
            {example.action} <span aria-hidden="true">↗</span>
          </KitButton>
        </div>
        <div className="kit-hero-art">
          <ExampleArtwork label={example.brand} />
          <span className="kit-art-caption">{example.items[0].title}</span>
        </div>
      </header>
      <section
        id={sectionId}
        className="kit-content"
        tabIndex={-1}
        aria-label={contentHeading}
      >
        <div className="kit-section-heading">
          <h3>{contentHeading}</h3>
          <span>{example.brand}</span>
        </div>
        {example.kind === "planner" ? (
          <>
            <div
              className="kit-planner-tabs"
              role="group"
              aria-label="Planner view"
            >
              {["Today", "This week", "Notes"].map((name) => (
                <button
                  key={name}
                  type="button"
                  aria-pressed={tab === name}
                  onClick={() => setTab(name)}
                >
                  {name}
                </button>
              ))}
            </div>
            {tab === "Notes" ? (
              <label className="kit-notes">
                A thought to carry forward
                <textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="What would help tomorrow?"
                  maxLength={800}
                />
              </label>
            ) : (
              <div className="kit-planner-grid">
                <div className="kit-task-list">
                  {example.items
                    .filter((_, index) => tab === "Today" || index < 2)
                    .map((item) => (
                      <label
                        key={item.title}
                        className={`kit-task ${completed.includes(item.title) ? "kit-task-complete" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={completed.includes(item.title)}
                          onChange={() =>
                            setCompleted((current) =>
                              current.includes(item.title)
                                ? current.filter(
                                    (entry) => entry !== item.title,
                                  )
                                : [...current, item.title],
                            )
                          }
                        />
                        <span>
                          <b>{item.title}</b>
                          <small>{item.detail}</small>
                        </span>
                        <em>{item.label}</em>
                      </label>
                    ))}
                </div>
                <aside className="kit-reflection">
                  <span className="kit-label">A little perspective</span>
                  <h3>Leave room for a good day.</h3>
                  <p>
                    A useful plan has space for the things you didn't expect.
                  </p>
                  <KitStatus state="success">
                    {completed.length} of {example.items.length} small steps
                    complete.
                  </KitStatus>
                </aside>
              </div>
            )}
          </>
        ) : example.kind === "event" ? (
          <div className="kit-event-grid">
            <div className="kit-schedule">
              {example.items.map((item, index) => (
                <article key={item.title}>
                  <span>{item.label}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                  <span className="kit-schedule-number" aria-hidden="true">
                    {index + 1}
                  </span>
                </article>
              ))}
            </div>
            <aside className="kit-invitation">
              <span className="kit-label">Find your place</span>
              <h3>Come with a little curiosity.</h3>
              <p>Choose a session to build your own programme.</p>
              <label>
                Session
                <select
                  value={selectedSession}
                  onChange={(event) => setSelectedSession(event.target.value)}
                >
                  {example.items.map((item) => (
                    <option key={item.title}>{item.title}</option>
                  ))}
                </select>
              </label>
              <KitDialog
                trigger="Your programme"
                title="A day to look forward to"
              >
                <p>
                  You've chosen <strong>{selectedSession}</strong>. Bring a
                  question, a notebook, and an open mind.
                </p>
              </KitDialog>
            </aside>
          </div>
        ) : (
          <>
            {example.kind === "archive" ? (
              <KitField
                label="Search this collection"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try a title or category"
              />
            ) : null}
            <div className="kit-items">
              {filtered.map((item, index) =>
                example.kind === "studio" ? (
                  <article className="kit-project" key={item.title}>
                    <div className="kit-project-art">
                      <ExampleArtwork label={item.title} index={index} />
                    </div>
                    <div>
                      <span className="kit-label">{item.label}</span>
                      <h3>{item.title}</h3>
                      <p>{item.detail}</p>
                      <KitDialog trigger="Read the project" title={item.title}>
                        <p>{example.description}</p>
                      </KitDialog>
                    </div>
                  </article>
                ) : (
                  <KitCard
                    key={item.title}
                    title={item.title}
                    label={item.label}
                    action={
                      example.kind === "shop" ? (
                        <KitButton
                          onClick={() =>
                            setCart((current) => [...current, item.title])
                          }
                        >
                          Add to bag
                        </KitButton>
                      ) : (
                        <KitDialog
                          trigger={
                            example.kind === "journal"
                              ? "Read the story"
                              : "Open reference"
                          }
                          title={item.title}
                        >
                          <p>{item.detail}</p>
                          <p>{example.description}</p>
                        </KitDialog>
                      )
                    }
                  >
                    <ExampleArtwork label={item.title} index={index} />
                    <p>{item.detail}</p>
                  </KitCard>
                ),
              )}
            </div>
            {!filtered.length ? (
              <KitStatus state="empty">
                No references match “{query}”. Try another word.
              </KitStatus>
            ) : null}
            {cart.length ? (
              <KitStatus state="success">
                {cart[cart.length - 1]} added to your bag.
              </KitStatus>
            ) : null}
          </>
        )}
      </section>
      <section id={aboutId} className="kit-about" tabIndex={-1}>
        <span className="kit-label">A little about us</span>
        <h3>{example.brand}, with a point of view.</h3>
        <p>{example.description}</p>
      </section>
      <footer className="kit-footer">
        <span className="kit-brand">{example.brand}</span>
        <a
          href={`#${sectionId}`}
          onClick={(event) => navigateWithinExample(`#${sectionId}`, event)}
        >
          Explore again <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </article>
  );
}
