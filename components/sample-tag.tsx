export function SampleTag() {
  if (process.env.NEXT_PUBLIC_SHOW_PLACEHOLDER_TAGS !== "true") return null;
  return (
    <span className="pointer-events-none absolute top-3 right-3 z-10 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-foreground uppercase">
      Sample
    </span>
  );
}
