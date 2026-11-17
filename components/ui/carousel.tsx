"use client";

import { useRef, type ReactNode } from "react";

export function Carousel({
  label,
  children,
  className = "",
  arrows = false,
}: {
  label: string;
  children: ReactNode;
  className?: string;
  arrows?: boolean;
}) {
  const scroller = useRef<HTMLDivElement>(null);

  function move(direction: number) {
    const root = scroller.current;
    if (!root) return;
    const card = root.querySelector<HTMLElement>(":scope > *");
    const distance = (card?.getBoundingClientRect().width ?? root.clientWidth * 0.7) + 12;
    root.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  function onKey(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
  }

  return (
    <div>
      {arrows ? (
        <div className="mb-4 hidden justify-end gap-2 lg:flex">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white"
            aria-label={`Previous ${label}`}
            onClick={() => move(-1)}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white"
            aria-label={`Next ${label}`}
            onClick={() => move(1)}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      ) : null}
      <div
        ref={scroller}
        tabIndex={0}
        aria-label={label}
        onKeyDown={onKey}
        className={`flex w-full max-w-full snap-x snap-mandatory gap-3 overflow-x-auto pb-2 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
