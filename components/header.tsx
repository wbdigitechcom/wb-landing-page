"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ctaLabel, nav } from "@/data/site";
import { useLockBody } from "@/lib/use-lock-body";

const sections = ["home", "services", "work", "reviews", "about"];

export function Header() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState("#home");
  useLockBody(open);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      setProgress((current) => {
        const reduced = media.matches;
        const next = reduced
          ? window.scrollY > 32
            ? 1
            : window.scrollY < 8
              ? 0
              : current
          : Math.min(1, Math.max(0, window.scrollY / 160));
        return Math.abs(current - next) < 0.004 ? current : next;
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    media.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      media.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const nodes = sections
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.15, 0.4] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const logoHeight = 72 - 16 * progress;
  const barHeight = logoHeight;

  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{
        backgroundColor: `rgb(255 255 255 / ${0.55 + progress * 0.33})`,
        borderColor: `rgb(217 227 236 / ${progress * 0.9})`,
        boxShadow: `0 10px 30px -24px rgb(18 32 44 / ${0.45 * progress})`,
        backdropFilter: `blur(${progress * 20}px)`,
      }}
    >
      <div
        className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5"
        style={{ height: barHeight }}
      >
        <a href="#home" className="min-w-0 shrink" aria-label="WB DigiTech home">
          <Image
            src="/logo.webp"
            alt="WB DigiTech"
            width={320}
            height={84}
            priority
            className="w-auto max-w-full"
            style={{ height: "auto", maxHeight: logoHeight, maxWidth: "calc(100vw - 6.25rem)" }}
          />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const current = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={current ? "true" : undefined}
                className={`relative py-1 text-[0.92rem] transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-primary after:transition-transform after:duration-300 ${
                  current
                    ? "text-foreground after:scale-x-100"
                    : "text-foreground/70 after:scale-x-0 hover:text-foreground hover:after:scale-x-100"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <a
          href="#enquiry"
          className="hidden min-h-11 items-center rounded-full bg-primary font-medium text-primary-foreground hover:bg-primary-600 lg:inline-flex"
          style={{
            paddingInline: 16 - progress * 2,
            fontSize: `${0.875 - progress * 0.0625}rem`,
          }}
        >
          {ctaLabel}
        </a>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/80 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="relative block h-3.5 w-4" aria-hidden="true">
            <span className={`nav-motion absolute left-0 h-px w-4 bg-foreground ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`nav-motion absolute top-1.5 left-0 h-px w-4 bg-foreground ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`nav-motion absolute left-0 h-px w-4 bg-foreground ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      {mounted
        ? createPortal(
            <>
              <button
                type="button"
                aria-label="Close menu"
                className={`nav-motion fixed inset-0 z-50 bg-foreground/35 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
                tabIndex={-1}
                inert={!open}
                onClick={() => setOpen(false)}
              />
              <div
                id="mobile-nav"
                className={`nav-motion fixed inset-y-0 right-0 z-50 flex h-dvh w-[min(100%,22rem)] flex-col bg-white/95 px-6 pt-6 shadow-2xl backdrop-blur-xl lg:hidden ${open ? "translate-x-0" : "translate-x-full"}`}
                inert={!open}
                aria-hidden={!open}
              >
                <div className="flex items-center justify-between">
                  <Image src="/logo.webp" alt="" width={320} height={84} className="h-8 w-auto" />
                  <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <span aria-hidden="true" className="text-xl leading-none">
                      ×
                    </span>
                  </button>
                </div>
                <nav className="mt-10 flex flex-col" aria-label="Mobile">
                  {nav.map((item, index) => (
                    <a
                      key={item.href}
                      href={item.href}
                      style={{ transitionDelay: open ? `${80 + index * 45}ms` : "0ms" }}
                      className={`nav-motion border-b border-border py-4 text-2xl font-medium tracking-tight ${
                        open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                      } ${active === item.href ? "text-primary" : "text-foreground"}`}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <a
                  href="#enquiry"
                  style={{ transitionDelay: open ? "320ms" : "0ms" }}
                  className={`nav-motion mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground ${
                    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {ctaLabel}
                </a>
              </div>
            </>,
            document.body,
          )
        : null}
    </header>
  );
}
