"use client";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type HTMLAttributes,
  type DialogHTMLAttributes,
  type MouseEvent,
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
  className = "",
  ...props
}: Omit<HTMLAttributes<HTMLElement>, "title"> & {
  title: ReactNode;
  label?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <article {...props} className={`kit-card ${className}`}>
      {label ? <span className="kit-label">{label}</span> : null}
      <h3>{title}</h3>
      {children}
      {action ? <div className="kit-card-action">{action}</div> : null}
    </article>
  );
}
export function KitNavigation({
  brand,
  links,
  onNavigate,
  className = "",
  ...props
}: HTMLAttributes<HTMLElement> & {
  brand: string;
  links: { label: string; href: string }[];
  onNavigate?: (href: string, event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <nav
      {...props}
      className={`kit-navigation ${className}`}
      aria-label={props["aria-label"] || `${brand} navigation`}
    >
      {links[0]?.href ? (
        <a
          className="kit-brand"
          href={links[0].href}
          onClick={(event) => onNavigate?.(links[0].href, event)}
        >
          {brand}
        </a>
      ) : (
        <span className="kit-brand">{brand}</span>
      )}
      <div>
        {links.map((link, index) => (
          <a
            key={`${link.href}:${index}`}
            href={link.href}
            onClick={(event) => onNavigate?.(link.href, event)}
          >
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
  const generated = useId(),
    fieldId = id || generated;
  const describedBy =
    [props["aria-describedby"], error ? `${fieldId}-error` : undefined]
      .filter(Boolean)
      .join(" ") || undefined;
  return (
    <div className="kit-field">
      <label htmlFor={fieldId}>{label}</label>
      <input
        {...props}
        id={fieldId}
        aria-invalid={error ? true : props["aria-invalid"]}
        aria-describedby={describedBy}
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
  className = "",
  ...props
}: HTMLAttributes<HTMLParagraphElement> & {
  state: "loading" | "empty" | "error" | "success";
}) {
  return (
    <p
      {...props}
      className={`kit-status kit-status-${state} ${className}`}
      role={props.role || (state === "error" ? "alert" : "status")}
    >
      {children}
    </p>
  );
}
const bodyLocks = new WeakMap<
  HTMLElement,
  { count: number; overflow: string }
>();
function lockBody(body: HTMLElement) {
  const lock = bodyLocks.get(body) || {
    count: 0,
    overflow: body.style.overflow,
  };
  lock.count++;
  bodyLocks.set(body, lock);
  body.style.overflow = "hidden";
  let released = false;
  return () => {
    if (released) return;
    released = true;
    lock.count--;
    if (!lock.count) {
      body.style.overflow = lock.overflow;
      bodyLocks.delete(body);
    }
  };
}
type KitDialogProps = Omit<
  DialogHTMLAttributes<HTMLDialogElement>,
  "title" | "open"
> & { title: ReactNode; trigger: ReactNode } & (
    | { open?: undefined; onOpenChange?: (open: boolean) => void }
    | { open: boolean; onOpenChange: (open: boolean) => void }
  );
export function KitDialog({
  trigger,
  title,
  children,
  open,
  onOpenChange,
  className = "",
  onClose,
  onCancel,
  ...props
}: KitDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null),
    opener = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null),
    release = useRef<(() => void) | null>(null);
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen,
    titleId = useId();
  const request = (next: boolean) => {
    if (open === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  };
  const restore = () => {
    release.current?.();
    release.current = null;
    const target = previousFocus.current?.isConnected
      ? previousFocus.current
      : opener.current;
    if (target?.isConnected) target.focus({ preventScroll: true });
    previousFocus.current = null;
  };
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (isOpen) {
      if (!element.open) {
        previousFocus.current ??=
          document.activeElement instanceof HTMLElement
            ? document.activeElement
            : opener.current;
        element.showModal();
      }
      if (!release.current) release.current = lockBody(document.body);
    } else if (!isOpen && element.open) element.close();
  }, [isOpen]);
  useEffect(
    () => () => {
      release.current?.();
      release.current = null;
    },
    [],
  );
  return (
    <>
      <button
        ref={opener}
        className="kit-button kit-button-secondary"
        type="button"
        aria-haspopup="dialog"
        onClick={() => {
          previousFocus.current = opener.current;
          request(true);
        }}
      >
        {trigger}
      </button>
      <dialog
        {...props}
        className={`kit-dialog ${className}`}
        ref={dialog}
        aria-labelledby={props["aria-labelledby"] || titleId}
        onCancel={(event) => onCancel?.(event)}
        onClose={(event) => {
          restore();
          if (isOpen) request(false);
          onClose?.(event);
        }}
      >
        <div className="kit-dialog-heading">
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
