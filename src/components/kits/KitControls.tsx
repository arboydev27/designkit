"use client";

import {
  useEffect,
  useId,
  useRef,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

export function KitButton({
  children,
  className = "",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} type={type} className={`kit-button ${className}`}>
      {children}
    </button>
  );
}
export function KitCard({
  title,
  label,
  children,
  action,
}: {
  title: string;
  label?: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <article className="kit-card">
      <span className="kit-label">{label}</span>
      <h3>{title}</h3>
      {children}
      {action ? <div className="kit-card-action">{action}</div> : null}
    </article>
  );
}
export function KitNavigation({
  brand,
  links,
}: {
  brand: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav className="kit-navigation" aria-label={`${brand} example navigation`}>
      <a className="kit-brand" href={links[0]?.href}>
        {brand}
      </a>
      <div>
        {links.map((link) => (
          <a key={link.label} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
export function KitField({
  label,
  error,
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  const generated = useId();
  const fieldId = id || generated;
  return (
    <div className="kit-field">
      <label htmlFor={fieldId}>{label}</label>
      <input
        {...props}
        id={fieldId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${fieldId}-error` : undefined}
      />
      {error ? (
        <p id={`${fieldId}-error`} className="kit-field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
export function KitStatus({
  state,
  children,
}: {
  state: "loading" | "empty" | "error" | "success";
  children: ReactNode;
}) {
  return (
    <p
      className={`kit-status kit-status-${state}`}
      role={state === "error" ? "alert" : "status"}
    >
      {children}
    </p>
  );
}
export function KitDialog({
  trigger,
  title,
  children,
}: {
  trigger: string;
  title: string;
  children: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef<string | null>(null);
  const titleId = useId();
  const restore = () => {
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
    opener.current?.focus({ preventScroll: true });
  };
  useEffect(
    () => () => {
      if (previousOverflow.current !== null)
        document.body.style.overflow = previousOverflow.current;
    },
    [],
  );
  return (
    <>
      <button
        ref={opener}
        className="kit-button kit-button-secondary"
        type="button"
        onClick={() => {
          previousOverflow.current = document.body.style.overflow;
          dialog.current?.showModal();
          document.body.style.overflow = "hidden";
        }}
      >
        {trigger}
      </button>
      <dialog
        className="kit-dialog"
        ref={dialog}
        aria-labelledby={titleId}
        onClose={restore}
      >
        <div>
          <h3 id={titleId}>{title}</h3>
          <button
            type="button"
            aria-label="Close dialog"
            className="kit-dialog-close"
            onClick={() => dialog.current?.close()}
          >
            ×
          </button>
        </div>
        {children}
        <form method="dialog">
          <KitButton type="submit">Done</KitButton>
        </form>
      </dialog>
    </>
  );
}
