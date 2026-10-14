"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronDown,
  CircleHelp,
  Grid2X2,
  Layers3,
  List,
  Menu,
  Palette,
  Plus,
  Search,
  Shuffle,
  SlidersHorizontal,
  SplitSquareHorizontal,
  Type,
  X,
} from "lucide-react";
import { styles } from "@/data/styles";
import { useStyleCollections } from "@/lib/useStyleCollections";
import {
  initialLibraryRoute,
  libraryFamilies,
  libraryRouteUrl,
  readLibraryRoute,
  type LibraryRoute,
  type LibraryView,
} from "@/lib/library-navigation";
import { StylePreview } from "./StylePreview";
import ThemeToggle from "./ThemeToggle";
import InspirationDeck from "./InspirationDeck";
import CopyFallback from "./CopyFallback";
import "./previews.css";
const StyleDetail = dynamic(() => import("./StyleDetail"));

type View = LibraryView;
const families = libraryFamilies;
const knownStyleIds = new Set(styles.map((style) => style.id));
function Mark() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6v20h5c6 0 9-4 9-10S15 6 9 6H4M22 6v20M29 7l-7 9 7 9"
        stroke="currentColor"
        strokeWidth="2.5"
      />
    </svg>
  );
}
export default function Library() {
  const [route, setRoute] = useState<LibraryRoute>(initialLibraryRoute);
  const { view, selected, category, query, sort, layout } = route;
  const {
    saved,
    comparison,
    setSaved,
    setCompared,
    setComparisonSlot,
    clearComparison,
    error: collectionError,
  } = useStyleCollections();
  const comparedIds = comparison.filter(Boolean);
  const [sidebar, setSidebar] = useState(false);
  const [toast, setToast] = useState("");
  const [clipboardFallback, setClipboardFallback] = useState<string | null>(
    null,
  );
  const searchRef = useRef<HTMLInputElement>(null);
  const navigationTrigger = useRef<HTMLButtonElement | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastCard = useRef<string | null>(null);
  const lastOrigin = useRef<"gallery" | "deck">("gallery");
  const [featuredStyle, setFeaturedStyle] = useState("neo-brutalism");
  const style = styles.find((s) => s.id === selected);

  useEffect(() => {
    const sync = () =>
      setRoute(readLibraryRoute(new URL(location.href), knownStyleIds));
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    window.addEventListener("designkit:query-change", sync);
    const keys = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape") setSidebar(false);
    };
    window.addEventListener("keydown", keys);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
      window.removeEventListener("designkit:query-change", sync);
      window.removeEventListener("keydown", keys);
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);
  useEffect(() => {
    if (!sidebar) return;
    const opener = navigationTrigger.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = document.querySelector<HTMLElement>(".sidebar");
    const first = panel?.querySelector<HTMLElement>("button");
    first?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = panel?.querySelectorAll<HTMLElement>("button, a[href]");
      if (!items?.length) return;
      const start = items[0],
        end = items[items.length - 1];
      if (e.shiftKey && document.activeElement === start) {
        e.preventDefault();
        end.focus();
      } else if (!e.shiftKey && document.activeElement === end) {
        e.preventDefault();
        start.focus();
      }
    };
    document.addEventListener("keydown", trap);
    return () => {
      document.removeEventListener("keydown", trap);
      document.body.style.overflow = previousOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, [sidebar]);
  const notify = (message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 3000);
  };
  const changeRoute = (
    patch: Partial<LibraryRoute>,
    mode: "push" | "replace" = "push",
  ) => {
    const next = {
      ...readLibraryRoute(new URL(location.href), knownStyleIds),
      ...patch,
    };
    const url = libraryRouteUrl(next);
    setRoute(next);
    if (url !== `${location.pathname}${location.search}${location.hash}`) {
      if (mode === "replace") history.replaceState(history.state, "", url);
      else history.pushState(history.state, "", url);
      window.dispatchEvent(new Event("designkit:query-change"));
    }
  };
  const navigate = (next: View) => {
    changeRoute({
      view: next,
      selected: null,
      query: "",
      category: "All styles",
    });
    setSidebar(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const openStyle = (id: string, origin: "gallery" | "deck" = "gallery") => {
    lastCard.current = id;
    lastOrigin.current = origin;
    changeRoute({ selected: id });
    setSidebar(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const goBack = () => {
    changeRoute({ selected: null });
    requestAnimationFrame(() => {
      const card = document.getElementById(
        lastOrigin.current === "deck"
          ? "featured-style"
          : `open-${lastCard.current}`,
      );
      if (card) card.focus();
      else window.scrollTo({ top: 0 });
    });
  };
  const save = (id: string) => {
    const result = setSaved(id, !saved.includes(id));
    notify(
      result.error ||
        (result.saved.includes(id)
          ? "Saved to your collection"
          : "Removed from your collection"),
    );
  };
  const compare = (id: string) => {
    const adding = !comparedIds.includes(id);
    const result = setCompared(id, adding);
    if (adding && !result.comparison.includes(id)) {
      notify("Two styles selected. Remove one to add another.");
      return;
    }
    notify(
      result.error ||
        (adding ? "Added to comparison" : "Removed from comparison"),
    );
  };
  const copy = async (text: string, message = "Copied to clipboard") => {
    try {
      await navigator.clipboard.writeText(text);
      notify(message);
    } catch {
      setClipboardFallback(text);
    }
  };
  const filterCategory = (next: string) => {
    changeRoute({ query: "", category: next, view: "library", selected: null });
    setSidebar(false);
  };
  const search = (value: string) => {
    changeRoute(
      {
        query: value,
        selected: null,
        view: view === "saved" ? "saved" : "library",
        category: "All styles",
      },
      selected || (view !== "saved" && view !== "library") ? "push" : "replace",
    );
  };
  let shown = styles.filter(
    (s) =>
      (view !== "saved" || saved.includes(s.id)) &&
      (category === "All styles" || s.category === category) &&
      [
        s.name,
        s.category,
        s.tagline,
        ...s.keywords,
        ...s.traits,
        s.fonts.heading,
        s.fonts.body,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  if (sort === "az")
    shown = [...shown].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="app-shell">
      <a
        href="#main-content"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main-content")?.focus();
          document.getElementById("main-content")?.scrollIntoView();
        }}
      >
        Skip to content
      </a>
      {sidebar ? (
        <button
          className="sidebar-scrim"
          tabIndex={-1}
          aria-label="Close navigation"
          onClick={() => setSidebar(false)}
        />
      ) : null}
      <aside
        className={`sidebar ${sidebar ? "is-open" : ""}`}
        role="dialog"
        aria-modal={sidebar}
        aria-label="Main navigation"
        aria-hidden={!sidebar}
        inert={!sidebar}
      >
        <button
          className="mobile-sidebar-close icon-button"
          aria-label="Close navigation"
          onClick={() => setSidebar(false)}
        >
          <X size={20} />
        </button>
        <button
          className="brand"
          onClick={() => navigate("library")}
          aria-label="DesignKit home"
        >
          <Mark />
          <span>
            Design<span className="brand-light">Kit</span>
          </span>
        </button>
        <div className="sidebar-intro">
          Your design reference, all in one place.
        </div>
        <span className="nav-section-label">Library</span>
        <nav className="nav-main">
          <button
            className={!selected && view === "library" ? "active" : ""}
            aria-current={!selected && view === "library" ? "page" : undefined}
            onClick={() => navigate("library")}
          >
            <Grid2X2 />
            <span>Explore styles</span>
            <span className="nav-count">22</span>
          </button>
          <button
            className={!selected && view === "saved" ? "active" : ""}
            aria-current={!selected && view === "saved" ? "page" : undefined}
            onClick={() => navigate("saved")}
          >
            <Bookmark />
            <span>Saved styles</span>
            {saved.length > 0 ? (
              <span className="nav-count">{saved.length}</span>
            ) : null}
          </button>
          <button
            className={!selected && view === "compare" ? "active" : ""}
            aria-current={!selected && view === "compare" ? "page" : undefined}
            onClick={() => navigate("compare")}
          >
            <SplitSquareHorizontal />
            <span>Compare styles</span>
            {comparedIds.length > 0 ? (
              <span className="nav-count">{comparedIds.length}</span>
            ) : null}
          </button>
        </nav>
        <span className="nav-section-label">Browse by feel</span>
        <nav className="nav-families">
          {families.slice(1).map((f) => (
            <button
              key={f}
              className={category === f && !selected ? "active" : ""}
              aria-pressed={category === f && !selected}
              onClick={() => filterCategory(f)}
            >
              <span>{f}</span>
              <span>{styles.filter((s) => s.category === f).length}</span>
            </button>
          ))}
        </nav>
        <span className="nav-section-label">Toolkit</span>
        <nav className="nav-main">
          <button
            className={view === "palettes" && !selected ? "active" : ""}
            aria-current={!selected && view === "palettes" ? "page" : undefined}
            onClick={() => navigate("palettes")}
          >
            <Palette />
            <span>Color palettes</span>
          </button>
          <button
            className={view === "typography" && !selected ? "active" : ""}
            aria-current={
              !selected && view === "typography" ? "page" : undefined
            }
            onClick={() => navigate("typography")}
          >
            <Type />
            <span>Type pairings</span>
          </button>
        </nav>
        <div className="sidebar-bottom">
          <button className="about-button" onClick={() => navigate("about")}>
            <CircleHelp size={16} /> About this library{" "}
            <ArrowUpRight size={14} />
          </button>
        </div>
      </aside>
      <div className="workspace" inert={sidebar}>
        <header className="topbar">
          <button
            className="icon-button mobile-menu"
            onClick={(event) => {
              navigationTrigger.current = event.currentTarget;
              setSidebar(true);
            }}
            aria-label="Open navigation"
            aria-expanded={sidebar}
          >
            <Menu size={21} />
          </button>
          <button
            className="brand"
            onClick={() => navigate("library")}
            aria-label="DesignKit home"
          >
            <Mark />
            <span>DesignKit</span>
          </button>
          <nav className="desktop-navigation" aria-label="Library">
            <button
              aria-current={
                !selected && view === "library" ? "page" : undefined
              }
              onClick={() => navigate("library")}
            >
              Explore styles
            </button>
            <button
              aria-current={!selected && view === "saved" ? "page" : undefined}
              onClick={() => navigate("saved")}
            >
              Saved styles{" "}
              {saved.length > 0 && (
                <span className="nav-count">{saved.length}</span>
              )}
            </button>
            <button
              aria-current={
                !selected && view === "compare" ? "page" : undefined
              }
              onClick={() => navigate("compare")}
            >
              Compare styles{" "}
              {comparedIds.length > 0 && (
                <span className="nav-count">{comparedIds.length}</span>
              )}
            </button>
            <button
              onClick={(event) => {
                navigationTrigger.current = event.currentTarget;
                setSidebar(true);
              }}
              aria-expanded={sidebar}
            >
              Toolkit <ChevronDown size={14} />
            </button>
          </nav>
          <label className="global-search">
            <Search size={16} />
            <input
              ref={searchRef}
              aria-label="Search styles, moods, or fonts"
              placeholder="Search styles, moods, fonts"
              value={query}
              onChange={(e) => search(e.target.value)}
            />
            {query ? (
              <button aria-label="Clear search" onClick={() => search("")}>
                <X size={14} />
              </button>
            ) : (
              <kbd>⌘ K</kbd>
            )}
          </label>
          <ThemeToggle />
        </header>
        <main id="main-content" className="main-content" tabIndex={-1}>
          <nav
            className="library-kit-links"
            aria-label="Explore the full library"
          >
            <a href="/examples">
              66 original examples <ArrowUpRight size={16} />
            </a>
            <a href="/components">
              Reusable components <ArrowUpRight size={16} />
            </a>
            <a href="/boards">
              Project boards <ArrowUpRight size={16} />
            </a>
            <a href="/agents">
              Design kits for your agent <ArrowUpRight size={16} />
            </a>
          </nav>
          {collectionError ? (
            <p className="kit-results" role="status">
              {collectionError}
            </p>
          ) : null}
          {style ? (
            <StyleDetail
              key={style.id}
              style={style}
              saved={saved.includes(style.id)}
              compared={comparedIds.includes(style.id)}
              onSave={() => save(style.id)}
              onBack={goBack}
              onCompare={() => compare(style.id)}
              onCopy={copy}
            />
          ) : view === "compare" ? (
            <CompareView
              comparison={comparison}
              onChange={(index, id) => setComparisonSlot(index, id)}
              onExplore={() => navigate("library")}
              onOpen={openStyle}
              onCopy={copy}
            />
          ) : view === "palettes" ? (
            <>
              <PageHeading
                id="palettes"
                eyebrow="THE TOOLKIT"
                title="Color, with character."
                description="22 suggested palettes. Click a swatch to copy its hex code, or take the whole palette."
              />
              <div className="palette-library">
                {styles.map((s) => (
                  <section key={s.id} className="palette-sheet">
                    <div className="flex items-center justify-between gap-3">
                      <button
                        className="text-link"
                        onClick={() => openStyle(s.id)}
                      >
                        {s.name}
                        <ArrowUpRight size={16} />
                      </button>
                      <button
                        className="small-button"
                        onClick={() =>
                          copy(
                            s.palette.map((c) => c.hex).join(", "),
                            "Palette copied",
                          )
                        }
                      >
                        Copy palette
                      </button>
                    </div>
                    <div className="palette-strip">
                      {s.palette.map((c) => (
                        <button
                          key={c.hex}
                          style={{ background: c.hex }}
                          aria-label={`Copy ${c.name} ${c.hex}`}
                          onClick={() => copy(c.hex, `${c.hex} copied`)}
                        >
                          <span>{c.hex}</span>
                        </button>
                      ))}
                    </div>
                    <span className="subtle">
                      {s.category} · Suggested interpretation
                    </span>
                  </section>
                ))}
              </div>
            </>
          ) : view === "typography" ? (
            <>
              <PageHeading
                id="typography"
                eyebrow="THE TOOLKIT"
                title="Let the type do the talking."
                description="Considered pairings to try, not fixed rules. Open a style to test your own text and explore its fonts."
              />
              <div className="type-library">
                {styles.map((s) => (
                  <button
                    key={s.id}
                    className="type-sheet"
                    onClick={() => openStyle(s.id)}
                  >
                    <div className="type-meta">
                      <span>{s.name}</span>
                      <ArrowUpRight size={18} />
                    </div>
                    <div
                      className="type-specimen"
                      style={{ fontFamily: `"${s.fonts.heading}", serif` }}
                    >
                      Aa Bb Cc.
                    </div>
                    <p style={{ fontFamily: `"${s.fonts.body}", sans-serif` }}>
                      Every detail tells a story.
                    </p>
                    <span className="type-pair-names">
                      {s.fonts.heading} <Plus size={12} /> {s.fonts.body}
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : view === "about" ? (
            <About onExplore={() => navigate("library")} />
          ) : (
            <>
              {view === "library" && !query && category === "All styles" ? (
                <section className="hero">
                  <div className="hero-copy">
                    <h1 id="library">
                      Follow your <span>instinct.</span>
                    </h1>
                    <p>
                      A playground of 22 visual languages. Try on a style,
                      collect what moves you, and make it your own.
                    </p>
                    <button
                      className="hero-explore"
                      onClick={() => {
                        const gallery = document.getElementById("style-grid");
                        gallery?.scrollIntoView({ behavior: "instant" });
                        gallery?.focus({ preventScroll: true });
                      }}
                    >
                      Explore the collection <ArrowRight size={20} />
                    </button>
                  </div>
                  <InspirationDeck
                    initialId={featuredStyle}
                    onOpen={(id) => {
                      setFeaturedStyle(id);
                      openStyle(id, "deck");
                    }}
                  />
                </section>
              ) : (
                <PageHeading
                  id={view}
                  eyebrow={view === "saved" ? "YOUR COLLECTION" : "THE LIBRARY"}
                  title={
                    view === "saved"
                      ? "Keep what speaks to you."
                      : query
                        ? `Results for “${query}”`
                        : `The ${category.toLowerCase()} perspective.`
                  }
                  description={
                    view === "saved"
                      ? "Your saved directions, ready for the next project. Stored in this browser."
                      : query
                        ? "Search across styles, moods, characteristics, and font pairings."
                        : `Explore ${category.toLowerCase()} visual languages and what makes each one distinct.`
                  }
                />
              )}
              <section
                id="style-grid"
                className="explore-section"
                tabIndex={-1}
                aria-label="Design style gallery"
              >
                <div className="collection-title">
                  <h2>
                    {view === "saved"
                      ? "Your saved styles"
                      : query
                        ? "Search results"
                        : "The collection"}{" "}
                    <span>{shown.length}</span>
                  </h2>
                  <button
                    className="hero-link"
                    onClick={() =>
                      openStyle(
                        styles[Math.floor(Math.random() * styles.length)].id,
                      )
                    }
                  >
                    <Shuffle size={16} /> Surprise me <ArrowUpRight size={16} />
                  </button>
                </div>
                <div className="filter-bar">
                  <div
                    className="filter-tabs"
                    aria-label="Filter by design family"
                  >
                    {families.map((f) => (
                      <button
                        key={f}
                        aria-pressed={category === f}
                        className={category === f ? "selected" : ""}
                        onClick={() => changeRoute({ category: f })}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                  <div className="view-options">
                    <label className="sort-control">
                      <SlidersHorizontal size={14} />
                      <select
                        aria-label="Sort styles"
                        value={sort}
                        onChange={(e) =>
                          changeRoute({
                            sort: e.target.value === "az" ? "az" : "curated",
                          })
                        }
                      >
                        <option value="curated">Curated order</option>
                        <option value="az">A-Z</option>
                      </select>
                      <ChevronDown size={12} />
                    </label>
                    <div className="layout-toggle">
                      <button
                        aria-label="Grid view"
                        aria-pressed={layout === "grid"}
                        className={layout === "grid" ? "chosen" : ""}
                        onClick={() => changeRoute({ layout: "grid" })}
                      >
                        <Grid2X2 size={16} />
                      </button>
                      <button
                        aria-label="List view"
                        aria-pressed={layout === "list"}
                        className={layout === "list" ? "chosen" : ""}
                        onClick={() => changeRoute({ layout: "list" })}
                      >
                        <List size={17} />
                      </button>
                    </div>
                  </div>
                </div>
                {shown.length ? (
                  <div
                    className={`style-grid ${layout === "list" ? "list-layout" : ""}`}
                  >
                    {shown.map((s) => (
                      <article key={s.id} className="style-card">
                        <div className="card-image">
                          <button
                            id={`open-${s.id}`}
                            className="preview-link"
                            onClick={() => openStyle(s.id)}
                            aria-label={`Explore ${s.name}`}
                          >
                            <StylePreview id={s.id} />
                          </button>
                        </div>
                        <div className="card-info">
                          <div className="card-title-row">
                            <button onClick={() => openStyle(s.id)}>
                              {s.name} <ArrowUpRight size={17} />
                            </button>
                            <span className="category-badge">{s.category}</span>
                            <button
                              className={`card-save ${saved.includes(s.id) ? "is-saved" : ""}`}
                              onClick={() => save(s.id)}
                              aria-label={`${saved.includes(s.id) ? "Unsave" : "Save"} ${s.name}`}
                              aria-pressed={saved.includes(s.id)}
                            >
                              {saved.includes(s.id) ? (
                                <Bookmark size={16} fill="currentColor" />
                              ) : (
                                <Bookmark size={16} />
                              )}
                            </button>
                          </div>
                          <p>
                            {s.tagline}{" "}
                            <span className="subtle">· 3 interpretations</span>
                          </p>
                          <span className="card-fonts">
                            {s.fonts.heading} <span aria-hidden="true">↔</span>{" "}
                            {s.fonts.body}
                          </span>
                          <div className="card-bottom">
                            <div
                              className="card-swatches"
                              aria-label={`${s.name} color palette`}
                            >
                              {s.palette.map((c) => (
                                <button
                                  key={c.hex}
                                  aria-label={`Copy ${s.name} ${c.hex}`}
                                  title={`${c.name} · ${c.hex}`}
                                  style={{ background: c.hex }}
                                  onClick={() => copy(c.hex, `${c.hex} copied`)}
                                />
                              ))}
                            </div>
                            <button
                              className={`compare-card ${comparison.includes(s.id) ? "added" : ""}`}
                              onClick={() => compare(s.id)}
                              aria-label={`${comparison.includes(s.id) ? "Remove" : "Add"} ${s.name} ${comparison.includes(s.id) ? "from" : "to"} comparison`}
                              aria-pressed={comparison.includes(s.id)}
                            >
                              {comparison.includes(s.id) ? (
                                <Check size={14} />
                              ) : (
                                <Plus size={14} />
                              )}
                              <span>Compare</span>
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <Search size={30} />
                    <h3>
                      {view === "saved" && !saved.length
                        ? "Your collection starts with a spark."
                        : "No styles found."}
                    </h3>
                    <p>
                      {view === "saved" && !saved.length
                        ? "Tap the bookmark on a style you like. You’ll find it here."
                        : "Try a different mood, font, or design family."}
                    </p>
                    <button
                      className="primary-button"
                      onClick={() => {
                        changeRoute({
                          query: "",
                          category: "All styles",
                          view: "library",
                          selected: null,
                        });
                      }}
                    >
                      Explore all styles <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </section>
            </>
          )}
          <footer className="footer">
            <span>
              <Mark /> DesignKit{" "}
              <span className="footer-description">
                A library for the visually curious.
              </span>
            </span>
            <button onClick={() => navigate("about")}>
              Made to be explored <ArrowUpRight size={13} />
            </button>
          </footer>
        </main>
      </div>
      {comparedIds.length > 0 && view !== "compare" ? (
        <div className="compare-tray" inert={sidebar} aria-hidden={sidebar}>
          <span className="compare-tray-label">
            <SplitSquareHorizontal size={18} />
            <strong>{comparedIds.length}/2</strong> styles selected
          </span>
          <div className="compare-tray-items">
            {comparedIds.map((id) => (
              <button
                key={id}
                onClick={() => compare(id)}
                aria-label={`Remove ${styles.find((s) => s.id === id)?.name} from comparison`}
              >
                {styles.find((s) => s.id === id)?.name}
                <X size={13} />
              </button>
            ))}
          </div>
          <button
            className="primary-button"
            onClick={() => navigate("compare")}
          >
            Compare <ArrowRight size={15} />
          </button>
          <button
            className="icon-button"
            aria-label="Clear comparison"
            onClick={clearComparison}
          >
            <X size={18} />
          </button>
        </div>
      ) : null}
      {clipboardFallback !== null && (
        <CopyFallback
          value={clipboardFallback}
          onClose={() => setClipboardFallback(null)}
        />
      )}
      <div
        role="status"
        aria-live="polite"
        className={`toast ${toast ? "visible" : ""}`}
      >
        {toast ? (
          <>
            <Check size={16} />
            {toast}
          </>
        ) : null}
      </div>
    </div>
  );
}
function PageHeading({
  id,
  eyebrow,
  title,
  description,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="page-heading">
      <div className="eyebrow">{eyebrow}</div>
      <h1 id={id}>{title}</h1>
      <p>{description}</p>
    </header>
  );
}
function CompareView({
  comparison,
  onChange,
  onExplore,
  onOpen,
  onCopy,
}: {
  comparison: string[];
  onChange: (index: number, id: string) => void;
  onExplore: () => void;
  onOpen: (id: string) => void;
  onCopy: (text: string, message?: string) => void;
}) {
  return (
    <>
      <PageHeading
        id="compare"
        eyebrow="A LITTLE PERSPECTIVE"
        title="See the difference."
        description="Two directions, side by side. Find the right visual language for what you’re building."
      />
      <div className="comparison-grid">
        {[0, 1].map((index) => {
          const s = styles.find((s) => s.id === comparison[index]);
          return (
            <section className="comparison-panel" key={index}>
              <label className="compare-select-label">
                {index === 0 ? "First direction" : "Second direction"}
                <select
                  aria-label={
                    index === 0
                      ? "First comparison style"
                      : "Second comparison style"
                  }
                  value={s?.id || ""}
                  onChange={(e) => {
                    onChange(index, e.target.value);
                  }}
                >
                  <option value="">Select a design language</option>
                  {styles.map((style) => (
                    <option
                      key={style.id}
                      value={style.id}
                      disabled={comparison[1 - index] === style.id}
                    >
                      {style.name}
                    </option>
                  ))}
                </select>
              </label>
              {s ? (
                <>
                  <div className="comparison-preview">
                    <StylePreview id={s.id} />
                  </div>
                  <div className="comparison-info">
                    <h2>{s.name}</h2>
                    <p>{s.description}</p>
                    <h3>Suggested palette</h3>
                    <div className="compare-colors">
                      {s.palette.map((c) => (
                        <button
                          key={c.hex}
                          onClick={() => onCopy(c.hex, `${c.hex} copied`)}
                          aria-label={`Copy ${c.hex}`}
                        >
                          <i style={{ background: c.hex }} />
                          <span>{c.hex}</span>
                        </button>
                      ))}
                    </div>
                    <h3>Font pairing</h3>
                    <div
                      className="compare-font"
                      style={{ fontFamily: `"${s.fonts.heading}",serif` }}
                    >
                      {s.fonts.heading}
                    </div>
                    <div style={{ fontFamily: `"${s.fonts.body}",sans-serif` }}>
                      {s.fonts.body}
                    </div>
                    <h3>Key characteristics</h3>
                    <div className="trait-list">
                      {s.traits.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <h3>Works well for</h3>
                    <ul>
                      {s.useCases.map((u) => (
                        <li key={u}>{u}</li>
                      ))}
                    </ul>
                    <button className="text-link" onClick={() => onOpen(s.id)}>
                      Explore the complete guide <ArrowUpRight size={16} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="compare-empty">
                  <Layers3 size={36} />
                  <h2>A different point of view.</h2>
                  <p>
                    Choose a style above, or explore the library to find a
                    direction.
                  </p>
                  <button className="text-link" onClick={onExplore}>
                    Browse the library <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
function About({ onExplore }: { onExplore: () => void }) {
  return (
    <div className="about-page">
      <PageHeading
        id="about"
        eyebrow="THE IDEA BEHIND DESIGNKIT"
        title="A starting point. Never a set of rules."
        description="DesignKit is a personal field guide for turning a visual feeling into a considered design direction."
      />
      <div className="about-content">
        <h2>Look closer. Make it yours.</h2>
        <p>
          Browse 22 visual languages, explore a specimen, and look at the
          decisions behind it: type, color, composition, texture, and space.
          Save a few directions, then compare them before your next project.
        </p>
        <h2>Suggested, not prescribed.</h2>
        <p>
          Design languages overlap and evolve. These are original, illustrative
          interpretations, not official templates or rigid definitions. Font
          pairings and color palettes are starting points to adapt to your
          content, audience, and accessibility needs.
        </p>
        <h2>Built for your process.</h2>
        <p>
          Copy individual colors or an entire palette. Test your own words in a
          type pairing. Switch specimen viewport sizes. Download a style brief
          to bring the direction into a project. Saved styles stay in this
          browser; exported briefs travel with you.
        </p>
        <h2>The spark.</h2>
        <p>
          The initial list was inspired by{" "}
          <a
            href="https://www.instagram.com/reel/DdMUB4kskYv/"
            target="_blank"
            rel="noreferrer"
          >
            Talha × Codes’ collection of visual styles{" "}
            <ArrowUpRight size={14} />
          </a>
          . Historical references, where relevant, are linked in each guide. All
          specimen brands, names, and compositions are fictional examples made
          for this library.
        </p>
        <button className="primary-button" onClick={onExplore}>
          Find your direction <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
