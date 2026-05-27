import { type ReactNode } from "react";
import Link from "next/link";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  href?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  children,
  className = "",
  hover = false,
  href,
  padding = "md",
}: CardProps) {
  const classes = [
    "bg-white rounded-xl border border-border",
    "shadow-[var(--shadow-card)]",
    hover
      ? "transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5"
      : "",
    paddingClasses[padding],
    href ? "block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}
