import { budgets, serviceIds, type ServiceId } from "./site";

export type FieldErrors = Partial<
  Record<
    "name" | "email" | "company" | "website" | "budget" | "message" | "services",
    string
  >
>;

export type InquiryInput = {
  source?: unknown;
  name?: unknown;
  email?: unknown;
  company?: unknown;
  website?: unknown;
  budget?: unknown;
  message?: unknown;
  services?: unknown;
  company_url_check?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const websitePattern = /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}([\/?#].*)?$/i;

export function cleanText(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001F]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

export function parseServices(value: unknown): ServiceId[] {
  if (!Array.isArray(value)) return [];
  const allowed = new Set<string>(serviceIds);
  const unique: ServiceId[] = [];
  for (const item of value) {
    if (typeof item !== "string" || !allowed.has(item)) continue;
    const id = item as ServiceId;
    if (!unique.includes(id)) unique.push(id);
  }
  return unique;
}

export function validateInquiry(input: InquiryInput): {
  errors: FieldErrors;
  honeypot: boolean;
  value: {
    source: "project" | "final";
    name: string;
    email: string;
    company: string;
    website: string;
    budget: string;
    message: string;
    services: ServiceId[];
  } | null;
} {
  const errors: FieldErrors = {};
  const honeypot = cleanText(input.company_url_check, 200).length > 0;
  const source = input.source === "final" ? "final" : input.source === "project" ? "project" : "";
  const name = cleanText(input.name, 80);
  const email = cleanText(input.email, 120);
  const company = cleanText(input.company, 120);
  const website = cleanText(input.website, 200);
  const budget = cleanText(input.budget, 40);
  const message = cleanText(input.message, 2000);
  const services = parseServices(input.services);

  if (!source) errors.message = "This form could not be submitted.";
  if (name.length < 2) errors.name = "Enter your full name.";
  if (!emailPattern.test(email)) errors.email = "Enter a valid email address.";
  if (source === "project" && company.length < 2) {
    errors.company = "Enter your company or brand name.";
  }
  if (website && !websitePattern.test(website)) {
    errors.website = "Enter a valid website, or leave this blank.";
  }
  if (budget && !budgets.includes(budget as (typeof budgets)[number])) {
    errors.budget = "Choose a budget from the list.";
  }
  if (message.length < 12) {
    errors.message = "Tell us a little more about the project.";
  }
  if (source === "project" && services.length === 0) {
    errors.services = "Select at least one service.";
  }

  if (Object.keys(errors).length > 0 || !source) {
    return { errors, honeypot, value: null };
  }

  return {
    errors,
    honeypot,
    value: {
      source,
      name,
      email,
      company,
      website,
      budget,
      message,
      services,
    },
  };
}
