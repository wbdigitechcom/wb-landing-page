import { about } from "@/data/site";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./ui/reveal";
import { Section } from "./ui/section";

export function About() {
  return (
    <Section id="about" className="py-16 md:py-24">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <SectionHeading eyebrow="About" title={about.title} text={about.story} />
          <dl className="mt-8 grid grid-cols-3 gap-3">
            {about.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs leading-5 text-muted">{stat.label}</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight">{stat.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 max-w-md text-sm leading-6 text-muted">{about.how}</p>
        </Reveal>
        <img
          src={about.image}
          alt={about.imageAlt}
          width={about.imageWidth}
          height={about.imageHeight}
          loading="lazy"
          className="aspect-[16/10] w-full rounded-[2rem] object-cover"
        />
      </div>
    </Section>
  );
}
