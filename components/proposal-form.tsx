"use client";

import { useEffect, useId, useState } from "react";
import { proposalServices, type ProposalServiceId } from "@/data/services";
import { contact } from "@/data/site";
import { validateInquiry, type FieldErrors, type InquiryInput } from "@/lib/inquiry";
import { INQUIRY_SENT_EVENT, markInquirySent, readInquirySent } from "@/lib/inquiry-sent";

const fieldClass =
  "min-h-11 w-full rounded-lg border border-[#314056] bg-[#172033] px-3.5 py-3 text-sm text-white outline-none placeholder:text-white/85 focus:border-[#4aa4d2]";

export function ProposalForm({ anchor }: { anchor?: string }) {
  const formId = useId();
  const [service, setService] = useState<ProposalServiceId>("consultation");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (readInquirySent()) setStatus("sent");
    const onSent = () => setStatus("sent");
    window.addEventListener(INQUIRY_SENT_EVENT, onSent);
    return () => window.removeEventListener(INQUIRY_SENT_EVENT, onSent);
  }, []);

  useEffect(() => {
    const onPick = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (proposalServices.some((item) => item.id === id)) {
        setService(id as ProposalServiceId);
      }
    };
    window.addEventListener("wb-proposal-service", onPick);
    return () => window.removeEventListener("wb-proposal-service", onPick);
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const input: InquiryInput = {
      source: "proposal",
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      message: data.get("message"),
      service,
      company_url_check: data.get("company_url_check"),
    };
    const { errors: nextErrors, honeypot } = validateInquiry(input);
    setErrors(nextErrors);
    if (honeypot) {
      setStatus("sent");
      markInquirySent();
      return;
    }
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      setFormError("");
      const field = (["name", "email", "phone", "message"] as const).find((key) => nextErrors[key]);
      if (field) form.querySelector<HTMLElement>(`[name="${field}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setFormError("");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const body = (await response.json()) as { ok?: boolean; errors?: FieldErrors; message?: string };
      if (!response.ok || !body.ok) {
        setErrors(body.errors ?? {});
        setFormError(body.message || "Check the highlighted fields.");
        setStatus("error");
        return;
      }
      markInquirySent();
      setStatus("sent");
    } catch {
      setFormError(`We couldn't send that. Email ${contact.email}.`);
      setStatus("error");
    }
  }

  return (
    <div className="relative rounded-2xl bg-[#10192b] px-5 py-8 text-white shadow-[0_20px_50px_rgba(16,25,43,0.18)] sm:px-7">
      <span className="absolute top-4 left-4 h-2 w-2 rounded-full bg-[#2c3a4e]" aria-hidden="true" />
      <h2 className="text-center text-xl font-semibold tracking-tight">Get a Free Proposal</h2>

      {status === "sent" ? (
        <p className="mt-8 text-center text-sm leading-6 text-white/80" role="status">
          We&apos;ve received your proposal. To add anything, email{" "}
          <a className="text-[#7ec8ef] underline-offset-4 hover:underline" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          .
        </p>
      ) : (
        <form id={anchor} onSubmit={onSubmit} noValidate className="mt-6 scroll-mt-28 space-y-3">
          <input type="text" name="company_url_check" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <div className="grid gap-3 sm:grid-cols-2">
            <input className={fieldClass} name="name" type="text" autoComplete="name" required placeholder="Your Name" aria-label="Your Name" aria-invalid={Boolean(errors.name) || undefined} />
            <input className={fieldClass} name="email" type="email" autoComplete="email" required placeholder="Email Address" aria-label="Email Address" aria-invalid={Boolean(errors.email) || undefined} />
          </div>
          <div className="flex">
            <span className="inline-flex shrink-0 items-center gap-2 rounded-l-lg border border-r-0 border-[#314056] bg-[#172033] px-3 text-sm text-white">
              <UaeFlag />
              +971
            </span>
            <input
              className={`${fieldClass} rounded-l-none`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              required
              placeholder="Phone Number"
              aria-label="Phone Number"
              aria-invalid={Boolean(errors.phone) || undefined}
            />
          </div>
          <label className="sr-only" htmlFor={`${formId}-service`}>
            Service
          </label>
          <select
            id={`${formId}-service`}
            name="service"
            value={service}
            onChange={(event) => setService(event.target.value as ProposalServiceId)}
            aria-invalid={Boolean(errors.service) || undefined}
            className={`${fieldClass} appearance-none bg-[length:1rem] bg-[position:right_0.85rem_center] bg-no-repeat pr-10`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='white' stroke-width='1.8'%3E%3Cpath d='M5 7.5 10 12.5 15 7.5'/%3E%3C/svg%3E\")",
            }}
          >
            {proposalServices.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
          <textarea className={`${fieldClass} min-h-28 resize-y`} name="message" required rows={4} placeholder="Briefly describe your project" aria-label="Briefly describe your project" aria-invalid={Boolean(errors.message) || undefined} />
          <FieldNote error={errors.name || errors.email || errors.phone || errors.service || errors.message || formError} />
          <div aria-live="polite" className="sr-only">
            {status === "sending" ? "Sending your proposal." : ""}
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="flex min-h-12 w-full items-center justify-center rounded-lg bg-[#1a8cd8] text-sm font-semibold text-white transition-colors hover:bg-[#1578bc] disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Get Your Quote →"}
          </button>
        </form>
      )}
    </div>
  );
}

function FieldNote({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p className="text-sm text-red-300" role="alert">
      {error}
    </p>
  );
}

function UaeFlag() {
  return (
    <svg viewBox="0 0 24 16" className="h-4 w-6 rounded-[2px]" aria-hidden="true">
      <rect width="24" height="16" fill="#fff" />
      <rect width="24" height="5.34" fill="#00732f" />
      <rect y="10.66" width="24" height="5.34" fill="#000" />
      <rect width="6.5" height="16" fill="#ce1126" />
    </svg>
  );
}
