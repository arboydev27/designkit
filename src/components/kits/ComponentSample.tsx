"use client";
import { useId, useState, type CSSProperties } from "react";
import type {
  KitComponent,
  DesignExample,
  StyleRecipe,
} from "../../data/kit-types";
import { resolveTokens } from "../../lib/kit-tokens";
import {
  KitButton,
  KitCard,
  KitDialog,
  KitField,
  KitNavigation,
  KitStatus,
} from "./KitControls";

export default function ComponentSample({
  component,
  example,
  recipe,
  state = "default",
}: {
  component: KitComponent;
  example: DesignExample;
  recipe: StyleRecipe;
  state?: "default" | "disabled" | "loading" | "error";
}) {
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState("");
  const id = useId();
  return (
    <div
      className={`kit-component-surface kit-style-${component.styleId}`}
      style={resolveTokens(example, recipe).values as CSSProperties}
    >
      {component.kind === "button" ? (
        <div>
          <KitButton
            disabled={state === "disabled" || state === "loading"}
            aria-busy={state === "loading"}
            onClick={() => setCount((current) => current + 1)}
          >
            {state === "loading" ? "Saving…" : "Continue"}
          </KitButton>
          {state === "error" ? (
            <KitStatus state="error">
              Your changes could not be saved. Try again.
            </KitStatus>
          ) : null}
          {count && state === "default" ? (
            <KitStatus state="success">
              Pressed {count} {count === 1 ? "time" : "times"}.
            </KitStatus>
          ) : null}
        </div>
      ) : component.kind === "card" ? (
        <KitCard
          title="A good idea starts here."
          label="A considered collection"
          action={
            <KitButton
              onClick={() => setCount((current) => current + 1)}
              disabled={state === "disabled" || state === "loading"}
              aria-busy={state === "loading"}
            >
              {state === "loading" ? "Saving…" : "Save this idea"}
            </KitButton>
          }
        >
          <p>
            A reusable surface with a clear heading, supporting text, and one
            primary action.
          </p>
          {state === "error" ? (
            <KitStatus state="error">
              This idea could not be saved. Try again.
            </KitStatus>
          ) : null}
          {count && state === "default" ? (
            <KitStatus state="success">Saved for this preview.</KitStatus>
          ) : null}
        </KitCard>
      ) : component.kind === "navigation" ? (
        <>
          <KitNavigation
            brand="Your project"
            links={[
              { label: "Work", href: `#${id}-work` },
              { label: "About", href: `#${id}-about` },
            ]}
          />
          <p id={`${id}-work`}>A clear path to your work.</p>
          <p id={`${id}-about`}>A little context about your practice.</p>
        </>
      ) : component.kind === "field" ? (
        <KitField
          label="Email address"
          type="email"
          value={email}
          disabled={state === "disabled"}
          error={
            state === "error"
              ? "Enter an address such as hello@example.com."
              : undefined
          }
          onChange={(event) => setEmail(event.target.value)}
          placeholder="hello@example.com"
        />
      ) : component.kind === "dialog" ? (
        <KitDialog trigger="A closer look" title="A little more context">
          <p>
            Keep the task focused. This dialog supports keyboard navigation,
            Escape dismissal, and return focus.
          </p>
        </KitDialog>
      ) : (
        <KitStatus
          state={
            state === "error"
              ? "error"
              : state === "loading"
                ? "loading"
                : state === "disabled"
                  ? "empty"
                  : "success"
          }
        >
          {state === "error"
            ? "Your changes could not be saved. Try again."
            : state === "loading"
              ? "Saving your changes…"
              : state === "disabled"
                ? "No items yet. Your collection starts here."
                : "Your changes are saved."}
        </KitStatus>
      )}
    </div>
  );
}
