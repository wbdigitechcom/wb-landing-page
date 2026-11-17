"use client";

import { useEffect, useState } from "react";
import { reels, type Reel } from "@/data/reels";
import { ReelCard } from "./reel-card";
import { SectionHeading } from "./section-heading";
import { Carousel } from "./ui/carousel";
import { Modal } from "./ui/modal";
import { Reveal } from "./ui/reveal";
import { Section } from "./ui/section";

export function Reels() {
  const [index, setIndex] = useState<number | null>(null);
  const active = index === null ? null : reels[index];

  useEffect(() => {
    if (index === null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        setIndex((current) => (current === null ? current : (current + 1) % reels.length));
      }
      if (event.key === "ArrowLeft") {
        setIndex((current) => (current === null ? current : (current - 1 + reels.length) % reels.length));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  function step(direction: number) {
    setIndex((current) => {
      if (current === null) return current;
      return (current + direction + reels.length) % reels.length;
    });
  }

  return (
    <Section id="work" className="bg-surface py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-5">
        <Reveal>
          <SectionHeading
            id="work-heading"
            title="Creativity in Motion."
            text="A closer look at the ideas, campaigns, and digital experiences we bring to life."
          />
        </Reveal>
        <div className="mt-8">
          <Carousel label="Films" arrows>
            {reels.map((reel, reelIndex) => (
              <ReelCard key={reel.id} reel={reel} onOpen={() => setIndex(reelIndex)} />
            ))}
          </Carousel>
        </div>
      </div>

      <Player
        reel={active}
        onClose={() => setIndex(null)}
        onStep={step}
      />
    </Section>
  );
}

function Player({
  reel,
  onClose,
  onStep,
}: {
  reel: Reel | null;
  onClose: () => void;
  onStep: (direction: number) => void;
}) {
  const [touchX, setTouchX] = useState<number | null>(null);

  return (
    <Modal open={Boolean(reel)} onClose={onClose} title={reel?.title ?? "Film"} label={reel?.category}>
      {reel ? (
        <div
          className="grid gap-4 overflow-y-auto p-5 sm:grid-cols-[16rem_1fr]"
          onTouchStart={(event) => setTouchX(event.changedTouches[0]?.clientX ?? null)}
          onTouchEnd={(event) => {
            if (touchX === null) return;
            const next = event.changedTouches[0]?.clientX ?? touchX;
            const delta = next - touchX;
            if (Math.abs(delta) > 40) onStep(delta < 0 ? 1 : -1);
            setTouchX(null);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") onStep(1);
            if (event.key === "ArrowLeft") onStep(-1);
          }}
        >
          {reel.src ? (
            <video
              key={reel.src}
              className="aspect-video w-full rounded-2xl bg-black object-cover"
              src={reel.src}
              poster={reel.poster}
              controls
              autoPlay
              playsInline
            />
          ) : (
            <img
              src={reel.poster}
              alt={reel.title}
              width={reel.posterWidth}
              height={reel.posterHeight}
              className="aspect-video w-full rounded-2xl object-cover"
            />
          )}
          <div>
            <p className="text-sm leading-7">{reel.caption}</p>
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border"
                aria-label="Previous film"
                onClick={() => onStep(-1)}
              >
                ←
              </button>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border"
                aria-label="Next film"
                onClick={() => onStep(1)}
              >
                →
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
