"use client";
import { useEffect, useState } from "react";
import { siteUrl } from "../../data/kit-types";
import CopyFallback from "../CopyFallback";

export default function CommandBox({
  command,
  originPath,
}: {
  command: string;
  originPath?: string;
}) {
  const [origin, setOrigin] = useState(siteUrl);
  const [copied, setCopied] = useState(false);
  const [fallback, setFallback] = useState(false);
  useEffect(() => setOrigin(window.location.origin), []);
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [copied]);
  const value =
    originPath !== undefined
      ? command.replace("{url}", `${origin}${originPath}`)
      : command;
  return (
    <div className="kit-command">
      <pre>
        <code>{value}</code>
      </pre>
      <button
        type="button"
        className="small-button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
          } catch {
            setFallback(true);
          }
        }}
        aria-label="Copy command"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <span className="sr-only" role="status">
        {copied ? "Command copied." : ""}
      </span>
      {fallback ? (
        <CopyFallback value={value} onClose={() => setFallback(false)} />
      ) : null}
    </div>
  );
}
