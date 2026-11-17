export function Hero() {
  return (
    <section id="home" className="scroll-mt-20">
      <div className="mx-auto grid w-full max-w-6xl items-end gap-12 px-5 pt-12 pb-16 md:pt-20 lg:grid-cols-[1.2fr_0.8fr] lg:pt-24 lg:pb-28">
        <div className="rise">
          <p className="text-[0.72rem] font-semibold tracking-[0.22em] text-primary uppercase">
            Creative Digital Growth Agency
          </p>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.7rem,8vw,5.4rem)] leading-[0.96] font-semibold tracking-[-0.05em] text-foreground">
            Building Brands.
            <span className="mt-1 block text-primary">Creating Digital</span>
            <span className="block">Experiences.</span>
            <span className="block">Driving Growth.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-muted md:text-lg">
            We help ambitious businesses grow through strategic branding, powerful
            marketing, and high-performing digital experiences.
          </p>
          <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-xl bg-foreground px-5 py-3.5 text-sm font-medium text-white transition-colors hover:bg-primary"
            >
              Let&apos;s Work Together
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-xl px-5 py-3.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              Explore Our Services
            </a>
          </div>
        </div>

        <div
          className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-primary-950 text-white"
          aria-hidden="true"
        >
          <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-primary" />
          <div className="absolute top-1/3 -left-10 h-40 w-40 rounded-full border border-white/30" />
          <div className="absolute right-8 bottom-24 h-px w-2/3 bg-white/40" />
          <p className="absolute top-8 left-8 text-[0.7rem] tracking-[0.28em] uppercase">
            Dubai
          </p>
          <p className="absolute right-6 bottom-8 left-8 text-3xl leading-none font-semibold tracking-[-0.04em] sm:text-4xl">
            Sign of
            <span className="block">Experience.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
