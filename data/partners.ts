export type PartnerLogo = {
  name: string;
  logo: string;
  alt: string;
};

/**
 * Neutral caption. Do not change this to an endorsement line unless the
 * relationship is approved in writing.
 */
export const partnersCaption = "Recognition and platforms";

/** Each badge is one mark from public/media/logo-strip.webp. */
export const partners: PartnerLogo[] = [
  { name: "Inc. 5000", logo: "/media/badges/inc-5000.png", alt: "Inc. 5000" },
  { name: "Google Partner", logo: "/media/badges/google-partner.png", alt: "Google Partner" },
  { name: "Microsoft Advertising", logo: "/media/badges/microsoft-advertising.png", alt: "Microsoft Advertising Partner" },
  { name: "Meta", logo: "/media/badges/meta.png", alt: "Meta Business Partner" },
  { name: "IFA", logo: "/media/badges/ifa.png", alt: "IFA member" },
  { name: "Shopify", logo: "/media/badges/shopify.png", alt: "Shopify partner" },
  { name: "Glassdoor", logo: "/media/badges/glassdoor.png", alt: "Glassdoor" },
];
