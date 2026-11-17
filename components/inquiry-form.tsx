"use client";

import { useEffect, useId, useState } from "react";
import { validateInquiry, type FieldErrors } from "@/lib/inquiry";
import { budgets, services } from "@/lib/site";
import { useLockBody } from "@/lib/use-lock-body";
import { Mark } from "./mark";
import { SectionHeading } from "./section-heading";

const fieldClass =
  "mt-2 w-full rounded-xl border border-border bg-white px-3.5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/80 focus:border-primary";

export function InquiryForm() {
  const formId = useId();
  const [selected, setSelected] = useState<string[]>([]);
  const [draft, setDraft] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formError, setFormError] = useState("");
  useLockBody(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function toggle(list: string[], id: string) {
    return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
  }

  const extraSelected = services.filter(
    (service) => !service.primary && selected.includes(service.id),
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const input = {
      source: "project",
      name: form.get("name"),
      email: form.get("email"),
      company: form.get("company"),
      website: form.get("website"),
      budget: form.get("budget"),
      message: form.get("message"),
      services: selected,
      company_url_check: form.get("company_url_check"),
    };
    const { errors: nextErrors, honeypot } = validateInquiry(input);
    setErrors(nextErrors);
    if (honeypot) {
      setStatus("sent");
      return;
    }
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      setFormError("");
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
      const data = (await response.json()) as {
        ok?: boolean;
        errors?: FieldErrors;
        message?: string;
      };
      if (!response.ok || !data.ok) {
        setErrors(data.errors ?? {});
        setFormError(data.message || "Check the highlighted fields.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setFormError("We couldn't send that. Email info@wbdigitech.ae.");
      setStatus("error");
    }
  }

  return (
    <section id="services" className="scroll-mt-20 bg-surface py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionHeading
          eyebrow="Let's build something great"
          title="What can we help you grow?"
          text="Choose the services you need and tell us a little about your project."
        />

        {status === "sent" ? (
          <div className="mt-10 max-w-xl rounded-3xl border border-border bg-white p-8">
            <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
              Received
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">
              Your project details are with the team.
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              We saved this enquiry. If you need to add anything, email{" "}
              <a className="text-primary" href="mailto:info@wbdigitech.ae">
                info@wbdigitech.ae
              </a>
              .
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-10">
            <input
              type="text"
              name="company_url_check"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {services.map((service) => {
                const active = selected.includes(service.id);
                return (
                  <button
                    key={service.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelected((current) => toggle(current, service.id))}
                    className={`rounded-2xl border p-3 text-left transition duration-300 md:p-4 lg:hover:-translate-y-0.5 ${service.primary ? "" : "hidden lg:block"} ${active ? "border-primary bg-primary-50 shadow-[0_16px_30px_-24px_rgba(26,123,184,0.9)]" : "border-border bg-white hover:border-primary/30"}`}
                  >
                    <span className="flex items-start justify-between gap-2">
                      <Mark id={service.id} />
                      <span
                        className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] ${active ? "border-primary bg-primary text-white" : "border-border text-transparent"}`}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                    </span>
                    <span className="mt-3 block text-sm font-semibold tracking-tight">
                      {service.title}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-muted">
                      {service.description}
                    </span>
                  </button>
                );
              })}
            </div>

            {extraSelected.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2 lg:hidden">
                {extraSelected.map((service) => (
                  <li
                    key={service.id}
                    className="rounded-full border border-primary/30 bg-white px-3 py-1 text-xs text-foreground"
                  >
                    {service.title}
                  </li>
                ))}
              </ul>
            ) : null}

            <button
              type="button"
              className="mt-4 inline-flex items-center rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium lg:hidden"
              onClick={() => {
                setDraft(selected);
                setOpen(true);
              }}
            >
              View All Services +
            </button>
            {errors.services ? (
              <p className="mt-3 text-sm text-red-700" role="alert">
                {errors.services}
              </p>
            ) : null}

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <label className="block text-sm font-medium" htmlFor={`${formId}-name`}>
                Full name
                <input
                  id={`${formId}-name`}
                  name="name"
                  autoComplete="name"
                  required
                  aria-invalid={Boolean(errors.name)}
                  className={fieldClass}
                />
                {errors.name ? <FieldError>{errors.name}</FieldError> : null}
              </label>
              <label className="block text-sm font-medium" htmlFor={`${formId}-email`}>
                Work email
                <input
                  id={`${formId}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-invalid={Boolean(errors.email)}
                  className={fieldClass}
                />
                {errors.email ? <FieldError>{errors.email}</FieldError> : null}
              </label>
              <label className="block text-sm font-medium" htmlFor={`${formId}-company`}>
                Company / brand name
                <input
                  id={`${formId}-company`}
                  name="company"
                  autoComplete="organization"
                  required
                  aria-invalid={Boolean(errors.company)}
                  className={fieldClass}
                />
                {errors.company ? <FieldError>{errors.company}</FieldError> : null}
              </label>
              <label className="block text-sm font-medium" htmlFor={`${formId}-website`}>
                Website URL <span className="font-normal text-muted">(optional)</span>
                <input
                  id={`${formId}-website`}
                  name="website"
                  inputMode="url"
                  autoComplete="url"
                  aria-invalid={Boolean(errors.website)}
                  className={fieldClass}
                />
                {errors.website ? <FieldError>{errors.website}</FieldError> : null}
              </label>
              <label className="block text-sm font-medium" htmlFor={`${formId}-budget`}>
                Project budget <span className="font-normal text-muted">(optional)</span>
                <select
                  id={`${formId}-budget`}
                  name="budget"
                  defaultValue=""
                  aria-invalid={Boolean(errors.budget)}
                  className={fieldClass}
                >
                  <option value="">Select a range</option>
                  {budgets.map((budget) => (
                    <option key={budget} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>
                {errors.budget ? <FieldError>{errors.budget}</FieldError> : null}
              </label>
              <label className="block text-sm font-medium md:col-span-2" htmlFor={`${formId}-message`}>
                Project details
                <textarea
                  id={`${formId}-message`}
                  name="message"
                  required
                  rows={5}
                  aria-invalid={Boolean(errors.message)}
                  className={fieldClass}
                />
                {errors.message ? <FieldError>{errors.message}</FieldError> : null}
              </label>
            </div>

            {formError ? (
              <p className="mt-4 text-sm text-red-700" role="alert">
                {formError}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-600 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Submit Your Project"}
            </button>
          </form>
        )}
      </div>

      {open ? (
        <div className="fixed inset-0 z-[70] flex items-end justify-center lg:items-center lg:p-6">
          <button
            type="button"
            className="absolute inset-0 bg-foreground/40"
            aria-label="Close services"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="services-dialog-title"
            className="relative flex max-h-[92vh] w-full flex-col rounded-t-3xl bg-white shadow-2xl lg:max-w-3xl lg:rounded-3xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
              <div>
                <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-primary uppercase">
                  All services
                </p>
                <h3 id="services-dialog-title" className="mt-1 text-xl font-semibold tracking-tight">
                  Choose everything you need
                </h3>
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close</span>
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 overflow-y-auto px-5 py-4 sm:grid-cols-2">
              {services.map((service) => {
                const active = draft.includes(service.id);
                return (
                  <button
                    key={service.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setDraft((current) => toggle(current, service.id))}
                    className={`flex gap-3 rounded-2xl border p-3 text-left ${active ? "border-primary bg-primary-50" : "border-border"}`}
                  >
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50">
                      <Mark id={service.id} />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{service.title}</span>
                      <span className="mt-1 block text-xs leading-5 text-muted">
                        {service.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="border-t border-border px-5 py-4">
              <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground sm:w-auto"
                onClick={() => {
                  setSelected(draft);
                  setOpen(false);
                }}
              >
                Apply Selection
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function FieldError({ children }: { children: string }) {
  return (
    <span className="mt-1.5 block text-xs font-normal text-red-700" role="alert">
      {children}
    </span>
  );
}
