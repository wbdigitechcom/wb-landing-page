export function SocialIcon({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-5 w-5",
    "aria-hidden": true as const,
    fill: "currentColor",
  };
  if (name === "LinkedIn") {
    return (
      <svg {...common}>
        <path d="M4.7 3.2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM3.2 9h3v12h-3V9Zm6.1 0h2.9v1.6h.1c.4-.8 1.4-1.7 2.9-1.7 3.1 0 3.7 2 3.7 4.7V21h-3v-6.1c0-1.5 0-3.3-2-3.3s-2.3 1.6-2.3 3.2V21h-3V9Z" />
      </svg>
    );
  }
  if (name === "Instagram") {
    return (
      <svg {...common}>
        <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm8 2H8a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3Zm-4 2.2A4.8 4.8 0 1 1 7.2 12 4.8 4.8 0 0 1 12 7.2Zm0 2A2.8 2.8 0 1 0 14.8 12 2.8 2.8 0 0 0 12 9.2ZM17.4 6.4a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
      </svg>
    );
  }
  if (name === "Facebook") {
    return (
      <svg {...common}>
        <path d="M14.2 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.2-1.4 1.4-1.4H17V5.5A18 18 0 0 0 14.8 5c-2.2 0-3.7 1.3-3.7 3.8v2h-2.5V14h2.5v7h3.1Z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M4 4.5h3.2l4.1 5.5 4.8-5.5H19l-6.1 6.9L19.4 19.5h-3.2l-4.5-6-5.2 6H4.1l6.6-7.5L4 4.5Z" />
    </svg>
  );
}
