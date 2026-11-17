import type { Service } from "@/data/services";
import { Mark } from "./mark";

export function ServiceCard({
  service,
  pressed,
  onToggle,
  className = "",
}: {
  service: Service;
  pressed: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      id={`service-${service.id}`}
      type="button"
      aria-pressed={pressed}
      onClick={onToggle}
      className={`flex min-h-11 flex-col rounded-3xl border p-4 text-left transition duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:focus-visible:-translate-y-0.5 ${
        pressed ? "border-primary bg-primary-50/70 ring-2 ring-primary" : "border-border/80 bg-white hover:border-primary/30"
      } ${className}`}
    >
      <span className="flex items-start justify-between gap-3 text-primary">
        <Mark id={service.id} />
        <span
          className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] ${
            pressed ? "bg-primary text-white" : "text-transparent"
          }`}
          aria-hidden="true"
        >
          ✓
        </span>
      </span>
      <span className="mt-4 block text-sm leading-5 font-semibold tracking-tight">{service.title}</span>
      <span className="mt-1 block text-xs leading-5 text-muted">{service.benefit}</span>
    </button>
  );
}
