"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { useLockBody } from "@/lib/use-lock-body";

const focusable =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Modal({
  open,
  title,
  onClose,
  children,
  label,
  align = "center",
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  label?: string;
  align?: "center" | "sheet";
}) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  useLockBody(open);

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const panel = panelRef.current;
    panel?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const nodes = [...panel.querySelectorAll<HTMLElement>(focusable)];
      if (nodes.length === 0) {
        event.preventDefault();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      restoreRef.current?.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[70] flex justify-center ${align === "sheet" ? "items-end lg:items-center lg:p-6" : "items-end p-0 sm:items-center sm:p-6"}`}
    >
      <button type="button" className="absolute inset-0 bg-foreground/55" aria-label="Close dialog" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`relative flex max-h-[92vh] w-full flex-col bg-white shadow-2xl outline-none ${align === "sheet" ? "rounded-t-3xl lg:max-w-3xl lg:rounded-3xl" : "rounded-t-3xl sm:max-w-3xl sm:rounded-3xl"}`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div>
            {label ? (
              <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-primary uppercase">{label}</p>
            ) : null}
            <h3 id={titleId} className="mt-1 text-xl font-semibold tracking-tight">
              {title}
            </h3>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <span aria-hidden="true">×</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
