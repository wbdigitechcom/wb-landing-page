"use client";

import { useEffect, useId, useState } from "react";
import { budgets, services, type ServiceId } from "@/data/services";
import { contact, ctaLabel } from "@/data/site";
import { validateInquiry, type FieldErrors, type InquiryInput } from "@/lib/inquiry";
import { INQUIRY_SENT_EVENT, markInquirySent, readInquirySent } from "@/lib/inquiry-sent";
import { Button } from "./ui/button";
import { Modal } from "./ui/modal";
import { Section } from "./ui/section";
import { SectionHeading } from "./section-heading";
import { ServiceCard } from "./service-card";

const fieldClass =
  "mt-2 min-h-11 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/80 focus:border-primary";

type Variant = "project" | "final";

export function EnquiryForm({ variant = "project" }: { variant?: Variant }) {
  const formId = useId();
  const [selected, setSelected] = useState<ServiceId[]>([]);
  const [draft, setDraft] = useState<ServiceId[]>([]);
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (variant !== "final") return;
    if (readInquirySent()) setStatus("sent");
    const onSent = () => setStatus("sent");
    window.addEventListener(INQUIRY_SENT_EVENT, onSent);
    return () => window.removeEventListener(INQUIRY_SENT_EVENT, onSent);
  }, [variant]);

  useEffect(() => {
    if (variant !== "project") return;
    function applyHash() {
      const match = window.location.hash.match(/^#service-([a-z0-9-]+)$/);
      if (!match) return;
      const id = match[1] as ServiceId;
      if (!services.some((service) => service.id === id)) return;
      setSelected((current) => (current.includes(id) ? current : [...current, id]));
      const card = document.getElementById(`service-${id}`);
      if (card && card.offsetParent !== null) {
        card.scrollIntoView({ block: "center" });
      } else {
        document.getElementById("enquiry")?.scrollIntoView();
      }
    }
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [variant]);

  function toggle(list: ServiceId[], id: ServiceId) {
    return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
  }

  function readInput(form: HTMLFormElement): InquiryInput {
    const data = new FormData(form);
    return {
      source: variant,
      name: data.get("name"),
      email: data.get("email"),
      company: data.get("company"),
      website: data.get("website"),
      budget: data.get("budget"),
      message: data.get("message"),
      services: variant === "project" ? selected : [],
      company_url_check: data.get("company_url_check"),
    };
  }

  function applyErrors(next: FieldErrors, fields?: Array<keyof FieldErrors>) {
    setErrors((current) => {
      if (!fields) return next;
      const merged = { ...current };
      for (const field of fields) {
        if (next[field]) merged[field] = next[field];
        else delete merged[field];
      }
      return merged;
    });
  }

  function onBlur(form: HTMLFormElement, field: keyof FieldErrors) {
    setTouched((current) => ({ ...current, [field]: "1" }));
    const { errors: next } = validateInquiry(readInput(form));
    applyErrors(next, [field]);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const input = readInput(form);
    const { errors: nextErrors, honeypot } = validateInquiry(input);
    setSubmitted(true);
    setErrors(nextErrors);
    if (nextErrors.company || nextErrors.website || nextErrors.budget || nextErrors.message) {
      setDetailsOpen(true);
    }
    if (honeypot) {
      setStatus("sent");
      markInquirySent();
      return;
    }
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      setFormError("");
      const field = (["name", "email", "company", "website", "budget", "message"] as const).find(
        (key) => nextErrors[key],
      );
      window.setTimeout(() => {
        if (nextErrors.services && !field) {
          document.getElementById("service-brand-management")?.focus();
          return;
        }
        if (field) form.querySelector<HTMLElement>(`[name="${field}"]`)?.focus();
      }, 0);
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
        if (data.errors?.company || data.errors?.message) setDetailsOpen(true);
        return;
      }
      markInquirySent();
      setStatus("sent");
    } catch {
      setFormError(`We couldn't send that. Email ${contact.email}.`);
      setStatus("error");
    }
  }

  const extraSelected = services.filter((service) => !service.primary && selected.includes(service.id));
  const countLabel =
    selected.length === 1 ? "1 service selected" : `${selected.length} services selected`;
  const showServicesError = variant === "project" && (submitted || open) && Boolean(errors.services);
  const light = variant === "final";

  function visibleError(field: keyof FieldErrors) {
    return submitted || touched[field] ? errors[field] : undefined;
  }

  return (
    <Section
      id={variant === "project" ? "services" : "contact"}
      className={light ? "bg-foreground py-16 text-white md:py-24" : "bg-surface py-12 md:py-24"}
    >
      <div className={light ? "mx-auto grid w-full max-w-6xl items-stretch gap-5 px-5 lg:grid-cols-2 lg:gap-8" : "mx-auto w-full max-w-6xl px-5"}>
        {light ? (
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-primary-950 lg:aspect-auto lg:min-h-full" aria-hidden="true">
            <img src="/media/main.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        ) : null}

        <div className={light ? "rounded-[2rem] border border-border bg-white p-5 text-foreground sm:p-8" : ""}>
        <SectionHeading
          eyebrow={variant === "project" ? "New enquiry" : "Still deciding"}
          title={ctaLabel}
          text={
            variant === "project"
              ? "Choose the services you need, then tell us how to reach you."
              : "Send a short note if you would rather start here."
          }
        />

        {status === "sent" ? (
          <div className="mt-8" role="status">
            <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">Received</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">We&apos;ve received your enquiry.</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              The note is saved. To add anything, email{" "}
              <a className="text-primary" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
              .
            </p>
          </div>
        ) : (
          <form id={variant === "project" ? "enquiry" : undefined} onSubmit={onSubmit} noValidate className="mt-6">
            <input type="text" name="company_url_check" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

            {variant === "project" ? (
              <div>
                <p className="text-sm font-semibold">1. Choose services</p>
                <div
                  className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4"
                  role="group"
                  aria-describedby={`${formId}-services-help ${formId}-services-error`}
                >
                  {services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      pressed={selected.includes(service.id)}
                      onToggle={() => setSelected((current) => toggle(current, service.id))}
                      className={service.primary ? "" : "hidden lg:flex lg:flex-col"}
                    />
                  ))}
                </div>
                <p id={`${formId}-services-help`} className="mt-3 text-sm text-muted" aria-live="polite">
                  {countLabel}
                </p>
                <p id={`${formId}-services-error`} className="mt-1 text-sm text-red-700" role="alert" data-invalid={showServicesError || undefined}>
                  {showServicesError ? errors.services : ""}
                </p>
                {extraSelected.length > 0 ? (
                  <ul className="mt-3 flex flex-wrap gap-2 lg:hidden">
                    {extraSelected.map((service) => (
                      <li key={service.id}>
                        <button
                          type="button"
                          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/30 bg-white px-3 text-xs"
                          onClick={() => setSelected((current) => current.filter((id) => id !== service.id))}
                        >
                          {service.title}
                          <span className="sr-only">Remove {service.title}</span>
                          <span aria-hidden="true">×</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <Button
                  type="button"
                  variant="secondary"
                  className="mt-4 lg:hidden"
                  onClick={() => {
                    setDraft(selected);
                    setOpen(true);
                  }}
                >
                  View all services
                </Button>
              </div>
            ) : null}

            <div className={variant === "project" ? "mt-8 grid items-stretch gap-5 lg:grid-cols-2 lg:gap-8" : ""}>
            {variant === "project" ? (
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-primary-950 lg:aspect-auto lg:min-h-full" aria-hidden="true">
                <img src="/media/web.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            ) : null}
            <div className={variant === "project" ? "rounded-[2rem] border border-border bg-white p-5 sm:p-8" : ""}>
            <p className="text-sm font-semibold">
              {variant === "project" ? "2. Tell us about your project" : "Your details"}
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <Field
                id={`${formId}-name`}
                name="name"
                label="Full name"
                autoComplete="name"
                error={visibleError("name")}
                onBlur={onBlur}
              />
              <Field
                id={`${formId}-email`}
                name="email"
                type="email"
                label="Work email"
                autoComplete="email"
                error={visibleError("email")}
                onBlur={onBlur}
              />
              {variant === "project" ? (
                <div className={`${detailsOpen ? "contents" : "hidden lg:contents"}`}>
                  <Field
                    id={`${formId}-company`}
                    name="company"
                    label="Company / brand name"
                    autoComplete="organization"
                    error={visibleError("company")}
                    onBlur={onBlur}
                  />
                  <Field
                    id={`${formId}-website`}
                    name="website"
                    label="Website URL"
                    hint="optional"
                    autoComplete="url"
                    error={visibleError("website")}
                    required={false}
                    onBlur={onBlur}
                  />
                  <label className="block text-sm font-medium" htmlFor={`${formId}-budget`}>
                    Project budget <span className="font-normal text-muted">(optional)</span>
                    <select
                      id={`${formId}-budget`}
                      name="budget"
                      defaultValue=""
                      aria-invalid={Boolean(visibleError("budget"))}
                      aria-describedby={visibleError("budget") ? `${formId}-budget-error` : undefined}
                      className={fieldClass}
                      onBlur={(event) => onBlur(event.currentTarget.form!, "budget")}
                    >
                      <option value="">Select a range</option>
                      {budgets.map((budget) => (
                        <option key={budget} value={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>
                    <FieldError id={`${formId}-budget-error`}>{visibleError("budget")}</FieldError>
                  </label>
                  <Field
                    id={`${formId}-message`}
                    name="message"
                    label="Project details"
                    multiline
                    className="md:col-span-2"
                    error={visibleError("message")}
                    onBlur={onBlur}
                  />
                </div>
              ) : (
                <Field
                  id={`${formId}-message`}
                  name="message"
                  label="Message"
                  multiline
                  className="md:col-span-2"
                  error={visibleError("message")}
                  onBlur={onBlur}
                />
              )}
            </div>

            {variant === "project" && !detailsOpen ? (
              <Button type="button" variant="secondary" className="mt-4 lg:hidden" onClick={() => setDetailsOpen(true)}>
                Add company and message
              </Button>
            ) : null}

            {formError ? (
              <p className="mt-4 text-sm text-red-700" role="alert">
                {formError}
              </p>
            ) : null}

            <div aria-live="polite" className="sr-only">
              {status === "sending" ? "Sending your enquiry." : ""}
              {status === "error" ? formError : ""}
            </div>

            <Button type="submit" disabled={status === "sending"} className="mt-5">
              {status === "sending" ? "Sending…" : ctaLabel}
            </Button>

            {variant === "final" ? (
              <p className="mt-4 text-sm text-muted">
                or email{" "}
                <a className="underline-offset-4 hover:underline" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </p>
            ) : null}
            </div>
            </div>
          </form>
        )}
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Choose everything you need" label="All services" align="sheet">
        <div className="grid grid-cols-1 gap-3 overflow-y-auto px-5 py-4 sm:grid-cols-2">
          {services.map((service) => {
            const active = draft.includes(service.id);
            return (
              <button
                key={service.id}
                type="button"
                aria-pressed={active}
                onClick={() => setDraft((current) => toggle(current, service.id))}
                className={`flex min-h-11 gap-3 rounded-2xl border p-3 text-left ${active ? "border-primary bg-primary-50" : "border-border"}`}
              >
                <span>
                  <span className="block text-sm font-semibold">{service.title}</span>
                  <span className="mt-1 block text-xs leading-5 text-muted">{service.description}</span>
                </span>
              </button>
            );
          })}
        </div>
        <div className="border-t border-border px-5 py-4">
          <Button
            type="button"
            className="w-full sm:w-auto"
            onClick={() => {
              setSelected(draft);
              setOpen(false);
            }}
          >
            Apply selection
          </Button>
        </div>
      </Modal>
    </Section>
  );
}

function Field({
  id,
  name,
  label,
  hint,
  type = "text",
  autoComplete,
  multiline = false,
  className = "",
  required = true,
  error,
  onBlur,
}: {
  id: string;
  name: keyof FieldErrors;
  label: string;
  hint?: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
  className?: string;
  required?: boolean;
  error?: string;
  onBlur: (form: HTMLFormElement, field: keyof FieldErrors) => void;
}) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    autoComplete,
    required,
    "aria-invalid": Boolean(error) || undefined,
    "aria-describedby": error ? errorId : undefined,
    className: fieldClass,
    onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (event.currentTarget.form) onBlur(event.currentTarget.form, name);
    },
  };
  return (
    <label className={`block text-sm font-medium ${className}`} htmlFor={id}>
      {label} {hint ? <span className="font-normal text-muted">({hint})</span> : null}
      {multiline ? <textarea {...shared} rows={4} /> : <input {...shared} type={type} />}
      <FieldError id={errorId}>{error}</FieldError>
    </label>
  );
}

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <span id={id} className="mt-1.5 block text-xs font-normal text-red-700" role="alert">
      {children}
    </span>
  );
}
