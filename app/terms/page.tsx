import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms & Conditions | WB DigiTech",
  description: "Terms for enquiries sent to WB DigiTech from this page.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full min-w-0 max-w-3xl px-5 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Terms &amp; Conditions</h1>
        <p className="mt-6 text-base leading-7 text-muted">
          Sending the form asks WB DigiTech to read your note and reply. It does not start a project or a
          paid engagement. Work begins only after the studio confirms scope and terms with you.
        </p>
        <p className="mt-4 text-base leading-7 text-muted">
          {/* TODO(client): replace this page with the approved terms. */}
          The full terms document is not published here yet. Write to{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a> for a copy.
        </p>
      </main>
      <Footer />
    </>
  );
}
