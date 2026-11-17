/** One label for the enquiry, in the header, hero, and both forms. */
export const ctaLabel = "Start your project";

/**
 * Client-editable review line. The count is the figure requested for this page.
 * TODO(client): confirm the count and set REVIEW_SOURCE to the real platform,
 * for example "on Google". AggregateRating is omitted until that is confirmed.
 */
export const REVIEW_COUNT_LABEL = "300+ reviews";
export const REVIEW_SOURCE = "from published client reviews";

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
  privacy: "/privacy",
  terms: "/terms",
} as const;

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/wb-digitech/" },
  { label: "Instagram", href: "https://www.instagram.com/wbdigitech.ae/" },
  { label: "Facebook", href: "https://www.facebook.com/wbdigitechuae/" },
  { label: "X", href: "https://x.com/wbdigitech" },
] as const;

/**
 * TODO(client): replace the studio still and, if you want different proof
 * lines, edit the three stats. These three are facts about the page and the
 * office, not campaign results.
 */
export const about = {
  title: "A studio in Bur Dubai.",
  story:
    "WB DigiTech plans the brand, runs the marketing, and builds the site that receives the enquiry. The work happens from one office on Rolla Street.",
  how: "One team owns the brief, the work, and the report back.",
  image: "/media/industry-interior.webp",
  imageAlt: "Interior project still",
  imageWidth: 800,
  imageHeight: 520,
  stats: [
    { value: "8", label: "Service lines" },
    { value: "1", label: "Office in Bur Dubai" },
    { value: "UAE", label: "Where the work runs" },
  ],
} as const;
