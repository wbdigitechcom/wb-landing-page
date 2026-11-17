"use client";

import { useEffect, useRef } from "react";
import type { Reel } from "@/data/reels";

export function ReelCard({ reel, onOpen }: { reel: Reel; onOpen: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !reel.src) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          if (video.getAttribute("src") !== reel.src) video.src = reel.src;
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reel.src]);

  return (
    <article className="w-[85%] shrink-0 snap-start sm:w-80 lg:w-[calc((100%-2rem)/3)]">
      <button
        type="button"
        className="relative block aspect-[16/10] w-full overflow-hidden rounded-[1.6rem] bg-primary-950 text-left text-white"
        onClick={onOpen}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster={reel.poster}
          muted
          playsInline
          loop
          preload="none"
          aria-hidden="true"
        />
        <img
          src={reel.poster}
          alt=""
          width={reel.posterWidth}
          height={reel.posterHeight}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover ${reel.src ? "opacity-0" : ""}`}
        />
        <span className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary-950/80 to-transparent" />
        <span className="absolute top-4 left-4 rounded-full bg-primary-950/55 px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.16em] text-white uppercase">
          {reel.category}
        </span>
        <span className="absolute right-4 bottom-4 left-4 text-base font-semibold tracking-tight text-white">{reel.title}</span>
        <span className="sr-only">Play {reel.title}</span>
      </button>
    </article>
  );
}
