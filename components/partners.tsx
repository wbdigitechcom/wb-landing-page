const platforms = ["Meta", "Amazon", "Google", "Microsoft", "Shopify"];

export function Partners() {
  return (
    <section aria-labelledby="partners-heading" className="border-b border-border py-12 md:py-16">
      <div className="mx-auto w-full max-w-6xl px-5">
        <h2 id="partners-heading" className="text-sm text-muted">
          Platforms &amp; brands we work with
        </h2>
        <ul className="fade-x mt-6 flex gap-x-10 gap-y-4 overflow-x-auto px-2 pb-1">
          {platforms.map((name) => (
            <li
              key={name}
              className="shrink-0 text-2xl font-semibold tracking-[-0.04em] text-foreground/80"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
