export function SectionHeading({
  eyebrow,
  title,
  text,
  id,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  id?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p
          className={`text-[0.72rem] font-semibold tracking-[0.18em] uppercase ${light ? "text-primary-100" : "text-primary-800"}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={`font-display text-[clamp(1.85rem,4.4vw,3.1rem)] leading-[1.08] font-normal ${eyebrow ? "mt-3" : ""} ${light ? "text-white" : "text-foreground"}`}
      >
        {title}
      </h2>
      {text ? (
        <p
          className={`mt-4 max-w-xl text-base leading-7 ${light ? "text-white" : "text-muted"}`}
        >
          {text}
        </p>
      ) : null}
    </div>
  );
}
