"use client";

import { useState } from "react";
import { MISSING_COMPANY, featuredReview, reviews } from "@/data/reviews";
import { SectionHeading } from "./section-heading";
import { Modal } from "./ui/modal";
import { Section } from "./ui/section";

type Person = {
  id: string;
  name: string;
  company: string;
  role: string;
  quote: string;
  featured?: boolean;
};

const people: Person[] = [
  {
    id: featuredReview.id,
    name: featuredReview.name,
    company: featuredReview.company,
    role: featuredReview.role,
    quote: featuredReview.quote,
    featured: true,
  },
  ...reviews,
];

const spots = [
  "left-[2%] top-[8%] lg:left-[6%]",
  "left-[0%] top-[62%] lg:left-[2%]",
  "right-[2%] top-[6%] lg:right-[8%]",
  "right-[0%] top-[64%] lg:right-[4%]",
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}

function companyLine(person: Person) {
  return person.company.trim() && person.company !== MISSING_COMPANY ? person.company : "";
}

export function Testimonials() {
  const [selectedId, setSelectedId] = useState(featuredReview.id);
  const [playing, setPlaying] = useState(false);
  const selected = people.find((person) => person.id === selectedId) ?? people[0];
  const satellites = people.filter((person) => person.id !== selected.id);
  const company = companyLine(selected);

  return (
    <Section id="reviews" label="Reviews" className="relative overflow-hidden py-16 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -left-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,var(--color-primary-50),transparent_68%)]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-5">
        <div className="flex items-start gap-8">
          <p className="hidden pt-1 text-[0.68rem] font-semibold tracking-[0.28em] text-primary-800 uppercase lg:block [writing-mode:vertical-rl] rotate-180">
            Reviews
          </p>
          <SectionHeading
            id="reviews-heading"
            title="Notes from teams we have already shipped for."
            text="Choose a name to read their note."
          />
        </div>

        <link rel="preload" as="image" href={featuredReview.poster} />

        <div className="relative mt-10 lg:mt-6 lg:min-h-[32rem]">
          <div className="flex flex-wrap justify-center gap-3 lg:absolute lg:inset-0 lg:block">
            {satellites.map((person, index) => (
              <button
                key={person.id}
                type="button"
                onClick={() => setSelectedId(person.id)}
                className={`inline-flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-primary-50 text-xs font-semibold text-primary-800 shadow-[0_16px_30px_-20px_rgba(26,123,184,0.9)] transition duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:focus-visible:-translate-y-0.5 lg:absolute lg:h-16 lg:w-16 ${spots[index] ?? spots[0]}`}
              >
                <span className="sr-only">Show note from {person.name}</span>
                <span aria-hidden="true">{initials(person.name)}</span>
              </button>
            ))}
          </div>

          <div className="relative z-10 mx-auto mt-8 flex max-w-sm flex-col items-center text-center lg:absolute lg:inset-0 lg:mt-0 lg:justify-center">
            <span className="inline-flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-primary-50 text-lg font-semibold text-primary-800 shadow-[0_0_0_8px_rgba(26,123,184,0.12)]">
              <span className="sr-only">{selected.name}</span>
              <span aria-hidden="true">{initials(selected.name)}</span>
            </span>
            <p className="mt-4 text-sm font-semibold">{selected.name}</p>
            {company ? <p className="text-xs text-muted">{company}</p> : null}
            <p className="text-xs text-muted">{selected.role}</p>
            <blockquote className="mt-4 text-sm leading-7 text-muted" aria-live="polite">
              {selected.quote}
            </blockquote>
            {selected.featured ? (
              <button
                type="button"
                className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-white"
                onClick={() => setPlaying(true)}
              >
                <span className="sr-only">Play testimonial from {featuredReview.name}</span>
                <span aria-hidden="true">▶ Play</span>
              </button>
            ) : null}
          </div>

          <span aria-hidden="true" className="absolute top-[34%] left-[24%] hidden h-2 w-2 rounded-full bg-primary lg:block" />
          <span aria-hidden="true" className="absolute top-[22%] right-[28%] hidden h-1.5 w-1.5 rounded-full bg-star lg:block" />
          <span aria-hidden="true" className="absolute right-[22%] bottom-[24%] hidden h-2.5 w-2.5 rounded-full bg-primary-200 lg:block" />
        </div>
      </div>

      <Modal open={playing} onClose={() => setPlaying(false)} title={featuredReview.name} label="Testimonial">
        <div className="grid gap-4 overflow-y-auto p-5 sm:grid-cols-[16rem_1fr]">
          {playing && featuredReview.src ? (
            <video
              className="aspect-[9/16] w-full rounded-2xl bg-primary-950 object-cover"
              src={featuredReview.src}
              poster={featuredReview.poster}
              controls
              autoPlay
              playsInline
              preload="none"
            />
          ) : (
            <img
              src={featuredReview.poster}
              alt=""
              width={featuredReview.posterWidth}
              height={featuredReview.posterHeight}
              className="aspect-video w-full rounded-2xl object-cover"
            />
          )}
          <p className="text-sm leading-7">{featuredReview.quote}</p>
        </div>
      </Modal>
    </Section>
  );
}
