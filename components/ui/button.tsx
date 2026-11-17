import type { ButtonHTMLAttributes, ReactNode } from "react";

const styles = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-600",
  secondary: "border border-border bg-white text-foreground hover:border-primary/40",
} as const;

const base =
  "inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition-colors disabled:opacity-60";

type Shared = {
  children: ReactNode;
  variant?: keyof typeof styles;
  className?: string;
};

type ButtonProps = Shared &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type LinkProps = Shared & {
  href: string;
  onClick?: () => void;
};

export function Button(props: ButtonProps | LinkProps) {
  const variant = props.variant ?? "primary";
  const className = `${base} ${styles[variant]} ${props.className ?? ""}`;

  if ("href" in props && props.href) {
    return (
      <a href={props.href} className={className} onClick={props.onClick}>
        {props.children}
      </a>
    );
  }

  const { children, variant: _variant, className: _className, ...rest } = props;
  return (
    <button {...rest} className={className}>
      {children}
    </button>
  );
}
