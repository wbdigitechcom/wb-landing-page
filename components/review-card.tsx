import { MISSING_COMPANY, type Review } from "@/data/reviews";
import { Stars } from "./stars";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}

export function ReviewCard({ review }: { review: Review }) {
  const company = review.company.trim() && review.company !== MISSING_COMPANY ? review.company : "";
  return (
    <article className="flex h-full flex-col rounded-3xl border border-border bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_18px_40px_-28px_rgba(26,123,184,0.85)]">
      {review.rating != null ? (
        <>
          <Stars value={review.rating} />
          <p className="sr-only">{review.rating} out of 5 stars</p>
        </>
      ) : null}
      <blockquote className="mt-4 text-sm leading-7 text-foreground">{review.quote}</blockquote>
      <footer className="mt-6 flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary-800">
          {initials(review.name)}
        </span>
        <span>
          <span className="block text-sm font-semibold">{review.name}</span>
          {company ? <span className="block text-xs text-muted">{company}</span> : null}
          <span className="block text-xs text-muted">{review.role}</span>
        </span>
      </footer>
    </article>
  );
}
