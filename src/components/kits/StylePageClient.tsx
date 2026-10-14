"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { DesignStyle } from "../../data/styles";
import { useStyleCollections } from "../../lib/useStyleCollections";
import { safeReturnPath } from "../../lib/navigation";
import StyleDetail from "../StyleDetail";
import CopyFallback from "../CopyFallback";

export default function StylePageClient({ style }: { style: DesignStyle }) {
  const router = useRouter();
  const { saved, comparison, setSaved, setCompared, error } =
    useStyleCollections();
  const [message, setMessage] = useState("");
  const [fallback, setFallback] = useState<string | null>(null);
  const [backTarget, setBackTarget] = useState("/");
  useEffect(() => {
    let target = safeReturnPath(
      new URLSearchParams(location.search).get("return"),
      "",
    );
    if (!target && document.referrer) {
      try {
        const referrer = new URL(document.referrer);
        if (referrer.origin === location.origin)
          target = safeReturnPath(
            `${referrer.pathname}${referrer.search}${referrer.hash}`,
            "",
          );
      } catch {}
    }
    if (
      target &&
      new URL(target, location.origin).pathname.replace(/\/$/, "") ===
        location.pathname.replace(/\/$/, "")
    )
      target = "";
    setBackTarget(target || "/");
  }, [style.id]);
  const toggle = (kind: "saved" | "comparison") => {
    const current = kind === "saved" ? saved : comparison;
    const adding = !current.includes(style.id);
    const result =
      kind === "saved"
        ? setSaved(style.id, adding)
        : setCompared(style.id, adding);
    if (
      kind === "comparison" &&
      adding &&
      !result.comparison.includes(style.id)
    ) {
      setMessage(
        "Two styles are already selected. Remove one in Compare styles to add this direction.",
      );
      return;
    }
    setMessage(
      result.error ||
        (adding
          ? `Added to ${kind === "saved" ? "your collection" : "comparison"}.`
          : "Removed."),
    );
  };
  return (
    <>
      <StyleDetail
        style={style}
        saved={saved.includes(style.id)}
        compared={comparison.includes(style.id)}
        onSave={() => toggle("saved")}
        onCompare={() => toggle("comparison")}
        onBack={() => router.push(backTarget)}
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
      {message || error ? (
        <p className="kit-results" role="status">
          {error || message}
        </p>
      ) : null}
      {fallback ? (
        <CopyFallback value={fallback} onClose={() => setFallback(null)} />
      ) : null}
    </>
  );
}
