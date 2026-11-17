import { partners } from "@/data/partners";
import { ProposalForm } from "./proposal-form";

export function Hero() {
  return (
    <section id="home" className="scroll-mt-24 bg-[#f3f6fb]">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pt-6 pb-14 lg:grid-cols-2 lg:gap-12 lg:pt-10 lg:pb-20">
        <div>
          <h1 className="max-w-xl text-[2.15rem] leading-[1.12] font-bold text-[#184a86] sm:text-5xl">
            Leading Digital Marketing Agency in Dubai & UAE
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#5d6c7b]">
            WB-DIGITECH is a top digital marketing agency in Dubai and across the UAE delivering SEO, website
            development, social media marketing, and lead generation that drives measurable growth for startups and
            established brands.
          </p>
          <ul className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
            {partners.map((partner) => (
              <li key={partner.name}>
                <img
                  src={partner.logo}
                  alt={partner.alt}
                  width={120}
                  height={36}
                  className="h-8 w-auto object-contain sm:h-9"
                />
              </li>
            ))}
          </ul>
        </div>
        <ProposalForm anchor="enquiry" />
      </div>
    </section>
  );
}
