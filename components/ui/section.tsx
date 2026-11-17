import type { ReactNode } from "react";

export function Section({
  id,
  className = "",
  children,
  label,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  label?: string;
}) {
  return (
    <section id={id} aria-label={label} className={`scroll-mt-24 ${className}`}>
      {children}
    </section>
  );
}
