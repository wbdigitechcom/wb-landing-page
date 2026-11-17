export const services = [
  {
    id: "brand-management",
    title: "Brand Management",
    description: "Identity, voice, and a system that stays consistent.",
    primary: true,
  },
  {
    id: "social-media",
    title: "Social Media Marketing",
    description: "Content and campaigns that earn attention.",
    primary: true,
  },
  {
    id: "google-ppc",
    title: "Google PPC Advertising",
    description: "Search ads aimed at real enquiries.",
    primary: true,
  },
  {
    id: "web-development",
    title: "Web Development",
    description: "Fast sites built to turn visits into conversations.",
    primary: true,
  },
  {
    id: "seo",
    title: "SEO & Organic Growth",
    description: "Search visibility that compounds over time.",
    primary: false,
  },
  {
    id: "content",
    title: "Content Creation",
    description: "Writing and creative for the channels people use.",
    primary: false,
  },
  {
    id: "graphic-design",
    title: "Graphic Design & Creative",
    description: "Design for campaigns, print, and the details.",
    primary: false,
  },
  {
    id: "ecommerce",
    title: "E-commerce Solutions",
    description: "Stores and product experiences built to sell.",
    primary: false,
  },
] as const;

export type ServiceId = (typeof services)[number]["id"];

export const serviceIds = services.map((service) => service.id);

export const budgets = [
  "Not sure yet",
  "Under AED 5,000",
  "AED 5,000 – 15,000",
  "AED 15,000 – 40,000",
  "AED 40,000+",
] as const;

export const reviews = [
  {
    name: "Habib Madni",
    company: "SEO client",
    initials: "HM",
    quote:
      "Transparent about priorities, and they kept us updated with regular reports.",
  },
  {
    name: "Mohammad Tayyab",
    company: "Industry business",
    initials: "MT",
    quote: "They asked about our ideal customer first. The leads got more relevant.",
  },
  {
    name: "AKR UAE",
    company: "AKR UAE",
    initials: "AK",
    quote: "A proper audit, a clear plan, and communication that stayed consistent.",
  },
  {
    name: "Sami Ibrahim",
    company: "Digital marketing client",
    initials: "SI",
    quote:
      "They looked at what we were already doing, then suggested practical improvements.",
  },
  {
    name: "Hamilton Key Real Estate L.L.C",
    company: "Hamilton Key Real Estate",
    initials: "HK",
    quote: "SEO, content, social, and Google Ads, with a team focused on the result.",
  },
] as const;

export const clients = [
  "Kamile",
  "Hamilton Key",
  "SIZA",
  "Lattar",
  "Afdal",
  "Eton",
  "Premiere Driive",
  "Safe Line",
] as const;

export const reels = [
  {
    id: "01",
    title: "Brand systems",
    category: "Branding",
    caption: "A visual system that stays recognizable across every touchpoint.",
    wash: "from-primary-800 to-primary-950",
  },
  {
    id: "02",
    title: "Social cuts",
    category: "Social",
    caption: "Short, sharp campaign pieces made to earn the next second of attention.",
    wash: "from-primary to-primary-800",
  },
  {
    id: "03",
    title: "Search stories",
    category: "Performance",
    caption: "Ads and landing pages aimed at people who are already looking.",
    wash: "from-[#0e3a56] to-primary-700",
  },
  {
    id: "04",
    title: "Site studies",
    category: "Web",
    caption: "Interfaces with one job: make the next step obvious.",
    wash: "from-foreground to-primary-900",
  },
  {
    id: "05",
    title: "Campaign films",
    category: "Motion",
    caption: "Moving pieces for launches, offers, and the brand in between.",
    wash: "from-primary-700 to-[#071821]",
  },
  {
    id: "06",
    title: "Studio notes",
    category: "Process",
    caption: "The quiet work behind a public brand: type, color, and pace.",
    wash: "from-primary-600 to-primary-950",
  },
] as const;

export const nav = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#reviews", label: "Reviews" },
  { href: "#about", label: "About" },
] as const;

export const contact = {
  landline: "+971-4-255-9928",
  landlineHref: "tel:+97142559928",
  mobile: "+971-50-239-0775",
  mobileHref: "tel:+971502390775",
  whatsapp: "https://wa.me/971502390775",
  email: "info@wbdigitech.ae",
  address: "Office 203, Raffa Building, Rolla Street, Bur Dubai, UAE",
  privacy: "https://wbdigitech.ae/privacy-policy",
  terms: "https://wbdigitech.ae/cookie-policy",
} as const;

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/wb-digitech/" },
  { label: "Instagram", href: "https://www.instagram.com/wbdigitech.ae/" },
  { label: "Facebook", href: "https://www.facebook.com/wbdigitechuae/" },
  { label: "X", href: "https://x.com/wbdigitech" },
] as const;
