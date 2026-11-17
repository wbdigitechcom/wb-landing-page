export function Mark({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 32 32" className="h-9 w-9 text-primary" aria-hidden="true">
      {id === "brand-management" ? (
        <path fill="currentColor" d="M16 4 28 26H4L16 4Zm0 7.2L9.2 23h13.6L16 11.2Z" />
      ) : null}
      {id === "social-media" ? (
        <>
          <circle cx="10" cy="16" r="4" fill="currentColor" />
          <circle cx="22" cy="9" r="3" fill="currentColor" />
          <circle cx="22" cy="23" r="3" fill="currentColor" />
          <path d="M13.5 14.5 19.5 11M13.5 17.5l6 4" stroke="currentColor" strokeWidth="1.6" />
        </>
      ) : null}
      {id === "google-ppc" ? (
        <path fill="currentColor" d="M7 23 15 6l3.2 1.6L10.2 23H7Zm10.2-8.2 7.6 8.2h-3.6l-5.6-6.1 1.6-2.1Z" />
      ) : null}
      {id === "web-development" ? (
        <path
          fill="currentColor"
          d="M6 8h20v16H6V8Zm2 2v12h16V10H8Zm3.2 3.2 2.8 2.8-2.8 2.8-1.4-1.4 1.4-1.4-1.4-1.4 1.4-1.4Zm6.2 5.6h5.2v1.8h-5.2v-1.8Z"
        />
      ) : null}
      {id === "seo" ? (
        <>
          <circle cx="14" cy="14" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="m18.5 18.5 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : null}
      {id === "content" ? (
        <path fill="currentColor" d="M8 6h11l5 5v15H8V6Zm10 1.8V12h4.2L18 7.8ZM11 16h10v1.8H11V16Zm0 4h7v1.8h-7V20Z" />
      ) : null}
      {id === "graphic-design" ? (
        <>
          <rect x="6" y="8" width="14" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="22" cy="12" r="4" fill="currentColor" />
        </>
      ) : null}
      {id === "ecommerce" ? (
        <path
          fill="currentColor"
          d="M8 9h2.2l1.4 9h10.2l1.6-6H12.2l-.4-2H8V9Zm5 14a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2Zm7.2 0a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2Z"
        />
      ) : null}
    </svg>
  );
}
