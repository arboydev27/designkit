"use client";
import { useEffect, useState } from "react";
import type { DesignStyle } from "../../data/styles";
import { styles } from "../../data/styles";
import { readSavedStyles, SAVED_STYLES_KEY } from "../../lib/saved-styles";
import StyleDetail from "../StyleDetail";
import CopyFallback from "../CopyFallback";

export default function StylePageClient({ style }: { style: DesignStyle }) {
  const [saved, setSaved] = useState<string[]>([]);
  const [comparison, setComparison] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [fallback, setFallback] = useState<string | null>(null);
  useEffect(() => {
    try {
      const known = new Set(styles.map((style) => style.id));
      setSaved(readSavedStyles(localStorage, known));
      const stored: unknown = JSON.parse(
        localStorage.getItem("designkit:comparison:v1") || "[]",
      );
      if (Array.isArray(stored))
        setComparison(
          [
            ...new Set(
              stored.filter((id) => typeof id === "string" && known.has(id)),
            ),
          ].slice(0, 2),
        );
    } catch {
      setMessage(
        "Your collection is available for this visit. Browser storage could not be read.",
      );
    }
  }, []);
  const toggle = (kind: "saved" | "comparison") => {
    const current = kind === "saved" ? saved : comparison;
    if (
      kind === "comparison" &&
      current.length === 2 &&
      !current.includes(style.id)
    ) {
      setMessage(
        "Two styles are already selected. Remove one in Compare styles to add this direction.",
      );
      return;
    }
    const next = current.includes(style.id)
      ? current.filter((id) => id !== style.id)
      : [...current, style.id];
    if (kind === "saved") setSaved(next);
    else setComparison(next);
    try {
      localStorage.setItem(
        kind === "saved" ? SAVED_STYLES_KEY : "designkit:comparison:v1",
        JSON.stringify(next),
      );
      setMessage(
        next.includes(style.id)
          ? `Added to ${kind === "saved" ? "your collection" : "comparison"}.`
          : "Removed.",
      );
    } catch {
      setMessage("Updated for this visit. Browser storage is unavailable.");
    }
  };
  return (
    <>
      <StyleDetail
        style={style}
        saved={saved.includes(style.id)}
        compared={comparison.includes(style.id)}
        onSave={() => toggle("saved")}
        onCompare={() => toggle("comparison")}
        onBack={() => {
          window.location.href = "/";
        }}
        onCopy={async (text, success) => {
          try {
            await navigator.clipboard.writeText(text);
            setMessage(success || "Copied to clipboard.");
          } catch {
            setFallback(text);
          }
        }}
      />
      <div className="kit-example-links">
        <a href="/#saved">Your saved collection ↗</a>
        <a href="/#compare">Compare selected styles ↗</a>
      </div>
      {message ? (
        <p className="kit-results" role="status">
          {message}
        </p>
      ) : null}
      {fallback ? (
        <CopyFallback value={fallback} onClose={() => setFallback(null)} />
      ) : null}
    </>
  );
}
