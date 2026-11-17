"use client";

import { useEffect, useState } from "react";
import { reels } from "@/lib/site";
import { useLockBody } from "@/lib/use-lock-body";
import { SectionHeading } from "./section-heading";

type Reel = (typeof reels)[number];

export function Reels() {
  const [active, setActive] = useState<Reel | null>(null);
  useLockBody(Boolean(active));

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="work" aria-labelledby="work-heading" className="scroll-mt-20 bg-surface py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionHeading
          id="work-heading"
          title="Creativity in Motion."
          text="A closer look at the ideas, campaigns, and digital experiences we bring to life."
        />
      </div>

      <div className="mt-8 flex w-full max-w-full snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 lg:mx-auto lg:grid lg:max-w-6xl lg:grid-cols-6 lg:overflow-visible">
        {reels.map((reel) => (
          <article key={reel.id} className="w-[68%] shrink-0 snap-start sm:w-56 lg:w-auto">
            <button
              type="button"
              className={`relative block aspect-[9/16] w-full overflow-hidden rounded-[1.6rem] bg-gradient-to-b text-left text-white transition duration-500 hover:-translate-y-1 ${reel.wash}`}
              onClick={() => setActive(reel)}
            >
              <span className="absolute top-4 left-4 text-4xl font-semibold tracking-[-0.05em]">
                {reel.id}
              </span>
              <span className="absolute top-16 right-[-18%] h-28 w-28 rounded-full border border-white/30" />
              <span className="absolute right-4 bottom-4 left-4">
                <span className="block text-[0.65rem] font-semibold tracking-[0.16em] text-white/70 uppercase">
                  {reel.category}
                </span>
                <span className="mt-1 block text-base font-semibold tracking-tight">{reel.title}</span>
              </span>
              <span className="sr-only">Open {reel.title}</span>
            </button>
          </article>
        ))}
      </div>

      {active ? (
        <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
          <button
            type="button"
            className="absolute inset-0 bg-foreground/70"
            aria-label="Close project"
            onClick={() => setActive(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reel-title"
            className="relative grid w-full overflow-hidden rounded-t-3xl bg-white sm:max-w-3xl sm:grid-cols-[16rem_1fr] sm:rounded-3xl"
          >
            <div className={`relative aspect-[9/16] bg-gradient-to-b text-white sm:aspect-auto ${active.wash}`}>
              <span className="absolute top-6 left-6 text-5xl font-semibold tracking-[-0.05em]">
                {active.id}
              </span>
              <span className="absolute right-6 bottom-6 left-6 text-lg font-semibold">{active.title}</span>
            </div>
            <div className="flex flex-col p-6">
              <div className="flex items-start justify-between gap-4">
                <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-primary uppercase">
                  {active.category}
                </p>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border"
                  onClick={() => setActive(null)}
                >
                  <span className="sr-only">Close</span>
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <h3 id="reel-title" className="mt-4 text-2xl font-semibold tracking-tight">
                {active.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">{active.caption}</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
