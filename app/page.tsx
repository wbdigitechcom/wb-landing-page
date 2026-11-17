import { About } from "@/components/about";
import { Clients } from "@/components/clients";
import { EnquiryForm } from "@/components/enquiry-form";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Partners } from "@/components/partners";
import { Reels } from "@/components/reels";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-w-0">
        <Hero />
        <Partners />
        <EnquiryForm variant="project" />
        <Testimonials />
        <Clients />
        <Reels />
        <About />
        <EnquiryForm variant="final" />
      </main>
      <Footer />
    </>
  );
}
