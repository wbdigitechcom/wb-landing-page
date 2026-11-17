import { Clients } from "@/components/clients";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { InquiryForm } from "@/components/inquiry-form";
import { Partners } from "@/components/partners";
import { Proof } from "@/components/proof";
import { Reels } from "@/components/reels";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-w-0">
        <Hero />
        <Proof />
        <Partners />
        <InquiryForm />
        <Testimonials />
        <Clients />
        <Reels />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
