"use client";

import { useEffect, useId, useRef } from "react";

type CopyFallbackProps = {
  value: string;
  onClose: () => void;
};

export default function CopyFallback({ value, onClose }: CopyFallbackProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const closingRef = useRef(false);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closingRef.current = false;

    if (dialog && !dialog.open) dialog.showModal();
    textRef.current?.focus({ preventScroll: true });
    textRef.current?.select();

    return () => {
      closingRef.current = true;
      if (dialog?.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, []);

  useEffect(() => {
    textRef.current?.select();
  }, [value]);

  const close = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="copy-dialog"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClose={() => {
        if (!dialogRef.current?.open) close();
      }}
    >
      <h2 id={titleId} className="copy-dialog-title">
        Copy to clipboard
      </h2>
      <p id={descriptionId} className="copy-dialog-note">
        Clipboard access is unavailable. Select the text below and use your
        device’s Copy command.
      </p>
      <textarea
        ref={textRef}
        className="copy-dialog-text"
        aria-label="Text to copy"
        value={value}
        readOnly
        spellCheck={false}
        rows={Math.min(10, Math.max(2, value.split("\n").length))}
      />
      <div className="copy-dialog-actions">
        <button
          type="button"
          className="copy-dialog-close primary-button"
          onClick={close}
        >
          Done
        </button>
      </div>
    </dialog>
  );
}
