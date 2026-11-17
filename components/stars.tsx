export function Stars({
  value = 5,
  className = "h-4 w-4",
}: {
  value?: number;
  className?: string;
}) {
  return (
    <span className="inline-flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => {
        const amount = Math.max(0, Math.min(1, value - index));
        return (
          <svg key={index} viewBox="0 0 20 20" className={className}>
            <path className="fill-border" d="M10 1.6 12.4 7l5.9.5-4.5 3.8 1.4 5.7L10 14.2 4.8 17l1.4-5.7L1.7 7.5 7.6 7 10 1.6Z" />
            <path
              className="fill-star"
              d="M10 1.6 12.4 7l5.9.5-4.5 3.8 1.4 5.7L10 14.2 4.8 17l1.4-5.7L1.7 7.5 7.6 7 10 1.6Z"
              style={{ clipPath: `inset(0 ${100 - amount * 100}% 0 0)` }}
            />
          </svg>
        );
      })}
    </span>
  );
}
