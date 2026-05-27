import { type ReactNode } from "react";

type BadgeVariant = "primary" | "success" | "warning" | "danger" | "info" | "grey" | "neon" | "yellow";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: "bg-primary-100 text-primary-700",
  success: "bg-accent-green-light text-accent-green",
  warning: "bg-accent-yellow-light text-amber-700",
  danger: "bg-red-100 text-red-700",
  info: "bg-accent-neon-light text-cyan-700",
  neon: "bg-accent-neon-light text-cyan-700",
  yellow: "bg-accent-yellow-light text-amber-700",
  grey: "bg-grey-100 text-grey-700",
};

export function Badge({ children, variant = "primary", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
