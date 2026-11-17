"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pending, setPending] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPending(false);
      return;
    }
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      setPending(false);
      return;
    }
    setPending(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setPending(false);
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      data-pending={pending === null ? undefined : pending ? "true" : "false"}
    >
      {children}
    </div>
  );
}
