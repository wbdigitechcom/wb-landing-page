"use client";

import { useEffect, useRef, useState } from "react";
import { reels } from "@/data/reels";

const frames = reels.slice(0, 3);

export function HeroFrame() {
  const root = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setActive(Boolean(entry?.isIntersecting)), {
      threshold: 0.25,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!active || reduced) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % frames.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [active]);

  return (
    <div
      ref={root}
      className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-primary-950 lg:aspect-[5/4]"
      aria-hidden="true"
    >
      <div className="absolute inset-0">
        {frames.map((frame, frameIndex) => (
          <img
            key={frame.id}
            src={frame.poster}
            alt=""
            width={frame.posterWidth}
            height={frame.posterHeight}
            className={`absolute inset-0 h-full w-full object-cover motion-safe:transition-opacity motion-safe:duration-700 ${
              frameIndex === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
