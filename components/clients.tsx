import { clients } from "@/lib/site";
import { SectionHeading } from "./section-heading";

export function Clients() {
  const loop = [...clients, ...clients];

  return (
    <section aria-labelledby="clients-heading" className="overflow-hidden py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionHeading id="clients-heading" title="Trusted by Brands with Big Ambitions." />
      </div>
      <div className="fade-x mt-10 w-full max-w-full overflow-x-auto lg:overflow-hidden">
        <ul className="marquee flex w-max items-center gap-x-10 px-5">
          {loop.map((name, index) => (
            <li key={`${name}-${index}`} className="flex items-center gap-10">
              <span className="text-lg font-medium tracking-[-0.03em] whitespace-nowrap text-foreground/75">
                {name}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
