const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function Mark({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 32 32" className="h-10 w-10" aria-hidden="true">
      {id === "brand-management" ? <path {...stroke} d="M16 5 27 26H5L16 5Z" /> : null}
      {id === "social-media" ? (
        <>
          <circle {...stroke} cx="10" cy="16" r="3.2" />
          <circle {...stroke} cx="22" cy="9" r="2.6" />
          <circle {...stroke} cx="22" cy="23" r="2.6" />
          <path {...stroke} d="M13 14.2 19.4 10.6M13 17.8l6.4 3.6" />
        </>
      ) : null}
      {id === "google-ppc" ? <path {...stroke} d="M7 24 16 6l3 1.6L10.4 24H7ZM18 14l8 9h-4" /> : null}
      {id === "web-development" ? (
        <>
          <rect {...stroke} x="5" y="7" width="22" height="16" rx="2" />
          <path {...stroke} d="m12 13-3 3 3 3M20 13l3 3-3 3M14.5 20.5l3-9" />
        </>
      ) : null}
      {id === "seo" ? (
        <>
          <circle {...stroke} cx="14" cy="14" r="6" />
          <path {...stroke} d="m18.5 18.5 6 6" />
        </>
      ) : null}
      {id === "content" ? (
        <>
          <path {...stroke} d="M8 6h11l5 5v15H8V6Z" />
          <path {...stroke} d="M18 6v6h6M11 16h10M11 20h7" />
        </>
      ) : null}
      {id === "graphic-design" ? (
        <>
          <rect {...stroke} x="6" y="8" width="14" height="14" rx="2" />
          <circle {...stroke} cx="22" cy="12" r="4" />
        </>
      ) : null}
      {id === "ecommerce" ? (
        <>
          <path {...stroke} d="M6 8h3l1.4 11h12.2l1.6-7H11" />
          <circle {...stroke} cx="13" cy="24" r="1.4" />
          <circle {...stroke} cx="21" cy="24" r="1.4" />
        </>
      ) : null}
    </svg>
  );
}
