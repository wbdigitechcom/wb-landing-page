import { Stars } from "./stars";

export function Proof() {
  return (
    <section aria-label="Client reviews" className="border-y border-border bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-5 py-7 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <Stars className="h-5 w-5" />
          <p className="text-base font-semibold tracking-tight sm:text-lg">
            <span className="sr-only">Rated 5 stars. </span>
            300+ reviews
          </p>
        </div>
        <p className="max-w-md text-sm leading-6 text-muted">
          Trusted by ambitious brands and growing businesses.
        </p>
      </div>
    </section>
  );
}
