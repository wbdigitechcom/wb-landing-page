import { REVIEW_COUNT_LABEL, REVIEW_SOURCE, ctaLabel } from "@/data/site";
import { HeroFrame } from "./hero-frame";
import { Stars } from "./stars";
import { Reveal } from "./ui/reveal";

export function Hero() {
  return (
    <section id="home" className="scroll-mt-24">
      <div className="mx-auto grid w-full max-w-6xl items-start gap-8 px-5 pt-4 pb-12 lg:grid-cols-2 lg:gap-10 lg:pt-6 lg:pb-16">
        <Reveal>
          <p className="text-[0.72rem] font-semibold tracking-[0.22em] text-primary uppercase">
            Creative Digital Growth Agency
          </p>
          <h1 className="mt-3 max-w-xl font-display text-[2.75rem] leading-[1.02] font-normal text-foreground sm:text-6xl lg:text-[4.25rem]">
            Building brands.
            <span className="mt-1 block text-primary italic">Driving growth.</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-muted">
            We help businesses grow through branding, marketing, and digital experiences.
            Sign of Experience.
          </p>
          <div className="mt-6 flex flex-col gap-1 min-[420px]:flex-row min-[420px]:items-center min-[420px]:gap-5">
            <a
              href="#enquiry"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary-600"
            >
              {ctaLabel}
            </a>
            <a
              href="#work"
              className="inline-flex min-h-11 items-center text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              See our work
            </a>
          </div>
          <a href="#reviews" className="mt-4 inline-flex min-h-11 items-center gap-3">
            <Stars className="h-4 w-4" />
            <span className="text-sm font-semibold">{REVIEW_COUNT_LABEL}</span>
            <span className="text-sm text-muted">{REVIEW_SOURCE}</span>
          </a>
        </Reveal>

        <HeroFrame />
      </div>
    </section>
  );
}
