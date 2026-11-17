import { budgets, proposalServices, serviceIds, type ServiceId } from "./site";

export type FieldErrors = Partial<
  Record<
    "name" | "email" | "phone" | "company" | "website" | "budget" | "message" | "services" | "service",
    string
  >
>;

export type InquiryInput = {
  source?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  website?: unknown;
  budget?: unknown;
  message?: unknown;
  services?: unknown;
  service?: unknown;
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
    source: "project" | "final" | "proposal";
    name: string;
    email: string;
    phone: string;
    company: string;
    website: string;
    budget: string;
    message: string;
    services: ServiceId[];
    service: string;
  } | null;
} {
  const errors: FieldErrors = {};
  const honeypot = cleanText(input.company_url_check, 200).length > 0;
  const source =
    input.source === "final" ? "final" : input.source === "project" ? "project" : input.source === "proposal" ? "proposal" : "";
  const name = cleanText(input.name, 80);
  const email = cleanText(input.email, 120);
  const company = cleanText(input.company, 120);
  const website = cleanText(input.website, 200);
  const budget = cleanText(input.budget, 40);
  const message = cleanText(input.message, 2000);
  const services = parseServices(input.services);
  const serviceId = cleanText(input.service, 40);
  const proposal = proposalServices.find((item) => item.id === serviceId);
  let phoneDigits = cleanText(input.phone, 20).replace(/\D/g, "");
  if (phoneDigits.startsWith("971")) phoneDigits = phoneDigits.slice(3);
  if (phoneDigits.startsWith("0")) phoneDigits = phoneDigits.slice(1);
  phoneDigits = phoneDigits.slice(0, 9);

  if (!source) errors.message = "This form could not be submitted.";
  if (name.length < 2) errors.name = "Enter your full name.";
  if (!emailPattern.test(email)) errors.email = "Enter a valid email address.";
  if (source === "proposal" && phoneDigits.length < 8) {
    errors.phone = "Enter a valid UAE phone number.";
  }
  if (source === "proposal" && !proposal) {
    errors.service = "Choose a service.";
  }
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
      phone: source === "proposal" ? `+971${phoneDigits}` : "",
      company,
      website,
      budget,
      message,
      services,
      service: proposal?.title ?? "",
    },
  };
}
