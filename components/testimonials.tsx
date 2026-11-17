"use client";

import { useEffect, useRef, useState } from "react";
import { reviews } from "@/lib/site";
import { SectionHeading } from "./section-heading";
import { Stars } from "./stars";

export function Testimonials() {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const cards = [...root.querySelectorAll<HTMLElement>("[data-review]")];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        setActive(Number((visible.target as HTMLElement).dataset.review));
      },
      { root, threshold: 0.6 },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  function show(index: number) {
    const root = scroller.current;
    const card = root?.querySelector<HTMLElement>(`[data-review="${index}"]`);
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionHeading
          id="reviews-heading"
          title="Good Work. Real Results."
          text="Don't just take our word for it. Hear what our clients have to say."
        />
      </div>

      <div
        ref={scroller}
        className="mt-8 flex w-full max-w-full snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-auto md:mt-10 md:grid md:max-w-6xl md:grid-cols-2 md:overflow-visible xl:grid-cols-3"
      >
        {reviews.map((review, index) => (
          <article
            key={review.name}
            data-review={index}
            className="w-[85%] shrink-0 snap-start rounded-3xl border border-border bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_18px_40px_-28px_rgba(26,123,184,0.85)] md:w-auto"
          >
            <Stars />
            <p className="mt-1 sr-only">5 out of 5 stars</p>
            <blockquote className="mt-4 text-sm leading-7 text-foreground">
              {review.quote}
            </blockquote>
            <footer className="mt-6 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary">
                {review.initials}
              </span>
              <span>
                <span className="block text-sm font-semibold">{review.name}</span>
                <span className="block text-xs text-muted">{review.company}</span>
              </span>
            </footer>
          </article>
        ))}
      </div>

      <div className="mt-5 flex justify-center gap-2 md:hidden" role="tablist" aria-label="Reviews">
        {reviews.map((review, index) => (
          <button
            key={review.name}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-label={`Show review ${index + 1}`}
            className={`h-2 rounded-full transition-all ${active === index ? "w-6 bg-primary" : "w-2 bg-border"}`}
            onClick={() => show(index)}
          />
        ))}
      </div>
    </section>
  );
}
