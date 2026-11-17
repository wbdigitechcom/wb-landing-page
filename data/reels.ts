export type Reel = {
  id: string;
  title: string;
  category: string;
  caption: string;
  poster: string;
  posterWidth: number;
  posterHeight: number;
  /** TODO(client): set this to the real video file. Empty keeps the still only. */
  src: string;
};

/**
 * Stills are the photographs in public/media. src stays empty until a film file exists.
 */
export const reels: Reel[] = [
  {
    id: "01",
    title: "Brand systems",
    category: "Branding",
    caption: "A visual system that stays recognizable across every touchpoint.",
    poster: "/media/graphic.webp",
    posterWidth: 1280,
    posterHeight: 720,
    src: "",
  },
  {
    id: "02",
    title: "Social cuts",
    category: "Social",
    caption: "Short campaign pieces made for the next second of attention.",
    poster: "/media/social.webp",
    posterWidth: 1280,
    posterHeight: 720,
    src: "",
  },
  {
    id: "03",
    title: "Search stories",
    category: "Search",
    caption: "Ads and landing pages for people who are already looking.",
    poster: "/media/seo.webp",
    posterWidth: 1280,
    posterHeight: 720,
    src: "",
  },
  {
    id: "04",
    title: "Site studies",
    category: "Web",
    caption: "Interfaces with one job: make the next step obvious.",
    poster: "/media/web.webp",
    posterWidth: 1280,
    posterHeight: 720,
    src: "",
  },
  {
    id: "05",
    title: "Campaign films",
    category: "Motion",
    caption: "Moving pieces for launches, offers, and the brand in between.",
    poster: "/media/videography.webp",
    posterWidth: 1280,
    posterHeight: 720,
    src: "",
  },
  {
    id: "06",
    title: "Studio notes",
    category: "Studio",
    caption: "The quiet work behind a public brand: type, color, and pace.",
    poster: "/media/main.webp",
    posterWidth: 1280,
    posterHeight: 720,
    src: "",
  },
  {
    id: "07",
    title: "Search ads",
    category: "Ads",
    caption: "Search ads aimed at the next enquiry.",
    poster: "/media/google-ads.webp",
    posterWidth: 1280,
    posterHeight: 720,
    src: "",
  },
  {
    id: "08",
    title: "Mobile product",
    category: "Product",
    caption: "Product screens built for a phone in the hand.",
    poster: "/media/mobile-app.webp",
    posterWidth: 1280,
    posterHeight: 720,
    src: "",
  },
  {
    id: "09",
    title: "Lead generation",
    category: "Growth",
    caption: "Pages and campaigns arranged around the enquiry.",
    poster: "/media/lead-gen.webp",
    posterWidth: 1280,
    posterHeight: 720,
    src: "",
  },
  {
    id: "10",
    title: "Web design",
    category: "Web",
    caption: "Design for the pages people actually read.",
    poster: "/media/blog-web-design.webp",
    posterWidth: 1280,
    posterHeight: 720,
    src: "",
  },
  {
    id: "11",
    title: "Education",
    category: "Industries",
    caption: "Work shaped for education brands.",
    poster: "/media/industry-education.webp",
    posterWidth: 1280,
    posterHeight: 720,
    src: "",
  },
  {
    id: "12",
    title: "Interiors",
    category: "Industries",
    caption: "Work shaped for interior brands.",
    poster: "/media/industry-interior.webp",
    posterWidth: 1280,
    posterHeight: 720,
    src: "",
  },
];
