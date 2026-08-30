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
    "bg-white/[0.04] rounded-xl border border-white/10",
    hover
      ? "transition-all duration-200 hover:border-[#00d4ff]/40 hover:bg-white/[0.06] hover:-translate-y-0.5"
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
