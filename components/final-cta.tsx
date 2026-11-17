"use client";

import { useId, useState } from "react";
import { validateInquiry, type FieldErrors } from "@/lib/inquiry";
import { services } from "@/lib/site";
import { SectionHeading } from "./section-heading";

const fieldClass =
  "mt-2 w-full rounded-xl border border-border bg-white px-3.5 py-3 text-sm text-foreground outline-none placeholder:text-muted/80 focus:border-primary";

export function FinalCta() {
  const formId = useId();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formError, setFormError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const service = String(form.get("service") ?? "");
    const input = {
      source: "final",
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
      services: service ? [service] : [],
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
    <section id="contact" className="scroll-mt-20 bg-foreground py-16 text-white md:py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading
          light
          eyebrow="Start here"
          title="Ready to Take Your Brand Further?"
          text="Let's turn your next big idea into something extraordinary."
        />

        <div className="rounded-3xl bg-white p-5 text-foreground sm:p-7">
          {status === "sent" ? (
            <div>
              <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
                Received
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                We have your message.
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                It is saved with the team. You can also write to{" "}
                <a className="text-primary" href="mailto:info@wbdigitech.ae">
                  info@wbdigitech.ae
                </a>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <input
                type="text"
                name="company_url_check"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium" htmlFor={`${formId}-name`}>
                  Name
                  <input
                    id={`${formId}-name`}
                    name="name"
                    autoComplete="name"
                    required
                    aria-invalid={Boolean(errors.name)}
                    className={fieldClass}
                  />
                  {errors.name ? <ErrorText>{errors.name}</ErrorText> : null}
                </label>
                <label className="block text-sm font-medium" htmlFor={`${formId}-email`}>
                  Email
                  <input
                    id={`${formId}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-invalid={Boolean(errors.email)}
                    className={fieldClass}
                  />
                  {errors.email ? <ErrorText>{errors.email}</ErrorText> : null}
                </label>
                <label className="block text-sm font-medium sm:col-span-2" htmlFor={`${formId}-service`}>
                  Service of interest
                  <select
                    id={`${formId}-service`}
                    name="service"
                    defaultValue=""
                    required
                    aria-invalid={Boolean(errors.services)}
                    className={fieldClass}
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                  {errors.services ? <ErrorText>{errors.services}</ErrorText> : null}
                </label>
                <label className="block text-sm font-medium sm:col-span-2" htmlFor={`${formId}-message`}>
                  Message
                  <textarea
                    id={`${formId}-message`}
                    name="message"
                    required
                    rows={4}
                    aria-invalid={Boolean(errors.message)}
                    className={fieldClass}
                  />
                  {errors.message ? <ErrorText>{errors.message}</ErrorText> : null}
                </label>
              </div>
              {formError ? (
                <p className="mt-4 text-sm text-red-700" role="alert">
                  {formError}
                </p>
              ) : null}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary-600 disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Start Your Project"}
                </button>
                <a className="text-sm text-muted" href="mailto:info@wbdigitech.ae">
                  or email info@wbdigitech.ae
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function ErrorText({ children }: { children: string }) {
  return (
    <span className="mt-1.5 block text-xs font-normal text-red-700" role="alert">
      {children}
    </span>
  );
}
