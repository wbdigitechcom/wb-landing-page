import { partners, partnersCaption } from "@/data/partners";

export function Partners() {
  const loop = [...partners, ...partners];

  return (
    <section aria-labelledby="partners-heading" className="border-b border-border py-10 md:py-14">
      <div className="mx-auto w-full max-w-6xl px-5">
        <h2 id="partners-heading" className="text-sm text-muted">
          {partnersCaption}
        </h2>
        <div className="fade-x mt-6 overflow-hidden lg:hidden">
          <ul className="marquee-sm flex w-max items-center gap-x-10">
            {loop.map((partner, index) => (
              <li key={`${partner.name}-${index}`} className={index >= partners.length ? "marquee-clone" : ""}>
                <img
                  src={partner.logo}
                  alt=""
                  width={120}
                  height={48}
                  loading="lazy"
                  className="h-12 w-auto object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                />
                <span className="sr-only">{partner.alt}</span>
              </li>
            ))}
          </ul>
        </div>
        <ul className="mt-6 hidden items-center justify-between gap-6 lg:flex">
          {partners.map((partner) => (
            <li key={partner.name}>
              <img
                src={partner.logo}
                alt={partner.alt}
                width={140}
                height={56}
                loading="lazy"
                className="h-14 w-auto object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
