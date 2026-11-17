/**
 * TODO(client): set each review.company to the real company.
 * An empty string is unknown, and the card then shows the role only.
 */
export const MISSING_COMPANY = "";

export type Review = {
  id: string;
  name: string;
  company: string;
  role: string;
  quote: string;
  /** Set 1–5 from the original review. Null hides the stars on the card. */
  rating: number | null;
};

/**
 * Names and shortened quotes come from feedback already published for the studio.
 * TODO(client): replace company and role where marked, and set each rating from the source review.
 * Do not leave placeholder companies on the live page.
 */
export const reviews: Review[] = [
  {
    id: "habib-madni",
    name: "Habib Madni",
    company: MISSING_COMPANY,
    role: "Client",
    quote: "Transparent about priorities, and they kept us updated with regular reports.",
    rating: null,
  },
  {
    id: "mohammad-tayyab",
    name: "Mohammad Tayyab",
    company: MISSING_COMPANY,
    role: "Client",
    quote: "They asked about our ideal customer first. The leads got more relevant.",
    rating: null,
  },
  {
    id: "akr-uae",
    name: "AKR UAE",
    company: "AKR UAE",
    role: "Client",
    quote: "A proper audit, a clear plan, and communication that stayed consistent.",
    rating: null,
  },
  {
    id: "sami-ibrahim",
    name: "Sami Ibrahim",
    company: MISSING_COMPANY,
    role: "Client",
    quote: "They looked at what we were already doing, then suggested practical improvements.",
    rating: null,
  },
];

/**
 * Featured film. TODO(client): add src (mp4 or webm) and replace the poster with a real frame.
 * rating stays null until the source review confirms a score.
 */
export const featuredReview = {
  id: "hamilton-key",
  name: "Hamilton Key Real Estate L.L.C",
  company: "Hamilton Key",
  role: "Client",
  quote: "SEO, content, social, and Google Ads, with a team focused on the result.",
  rating: null as number | null,
  poster: "/media/videography.webp",
  posterWidth: 1280,
  posterHeight: 720,
  src: "",
};
