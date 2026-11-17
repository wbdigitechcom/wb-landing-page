import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy | WB DigiTech",
  description: "How WB DigiTech handles enquiry details sent from this page.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full min-w-0 max-w-3xl px-5 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-6 text-base leading-7 text-muted">
          This page stores the name, email, company, and project note you submit so the studio can reply.
          It is not the full legal policy. The published policy lives on the current WB DigiTech site.
        </p>
        <p className="mt-4 text-base leading-7">
          <a className="text-primary underline-offset-4 hover:underline" href="https://wbdigitech.ae/privacy-policy">
            Read the published privacy policy
          </a>
        </p>
        <p className="mt-4 text-base leading-7 text-muted">
          Questions go to <a href={`mailto:${contact.email}`}>{contact.email}</a>.
        </p>
      </main>
      <Footer />
    </>
  );
}
