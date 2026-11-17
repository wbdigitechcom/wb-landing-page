export const services = [
  {
    id: "brand-management",
    title: "Brand Management",
    description: "Identity, voice, and a system that stays consistent.",
    benefit: "A system that stays consistent.",
    primary: true,
  },
  {
    id: "social-media",
    title: "Social Media Marketing",
    description: "Content and campaigns that earn attention.",
    benefit: "Campaigns that earn attention.",
    primary: true,
  },
  {
    id: "google-ppc",
    title: "PPC / Google Ads",
    description: "Search ads aimed at real enquiries.",
    benefit: "Search ads aimed at enquiries.",
    primary: true,
  },
  {
    id: "web-development",
    title: "Web Development",
    description: "Fast sites built to turn visits into conversations.",
    benefit: "Sites that start the conversation.",
    primary: true,
  },
  {
    id: "seo",
    title: "SEO & Organic Growth",
    description: "Search visibility that compounds over time.",
    benefit: "Visibility that compounds.",
    primary: false,
  },
  {
    id: "content",
    title: "Content Creation",
    description: "Writing and creative for the channels people use.",
    benefit: "Writing for the channels in use.",
    primary: false,
  },
  {
    id: "graphic-design",
    title: "Graphic Design & Creative",
    description: "Design for campaigns, print, and the details.",
    benefit: "Design for the campaign details.",
    primary: false,
  },
  {
    id: "ecommerce",
    title: "E-commerce Solutions",
    description: "Stores and product experiences built to sell.",
    benefit: "Stores built to sell.",
    primary: false,
  },
] as const;

export type Service = (typeof services)[number];
export type ServiceId = Service["id"];
export const serviceIds = services.map((service) => service.id);

/** Options on the proposal form. Labels follow wbdigitech.ae. */
export const proposalServices = [
  { id: "consultation", title: "Digital Marketing Consultation" },
  { id: "web-development", title: "Website Development" },
  { id: "seo", title: "SEO / ASO" },
  { id: "lead-generation", title: "Lead Generation" },
  { id: "mobile-app", title: "Mobile App Development" },
  { id: "social-media", title: "Social Media Marketing" },
  { id: "crm", title: "CRM Development" },
  { id: "google-ppc", title: "Google Ads" },
  { id: "videography", title: "Videography" },
  { id: "brand-management", title: "Brand Management" },
  { id: "content", title: "Content Creation" },
  { id: "graphic-design", title: "Graphic Design & Creative" },
  { id: "ecommerce", title: "E-commerce Solutions" },
] as const;

export type ProposalServiceId = (typeof proposalServices)[number]["id"];

export const budgets = [
  "Not sure yet",
  "Under AED 5,000",
  "AED 5,000 – 15,000",
  "AED 15,000 – 40,000",
  "AED 40,000+",
] as const;
