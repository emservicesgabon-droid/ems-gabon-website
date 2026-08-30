import { type ReactNode } from "react";

type BadgeVariant = "primary" | "success" | "warning" | "danger" | "info" | "grey" | "neon" | "yellow";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: "bg-primary-500/15 text-primary-300 border border-primary-400/20",
  success: "bg-accent-green/15 text-green-300 border border-green-400/20",
  warning: "bg-amber-400/15 text-amber-300 border border-amber-400/20",
  danger: "bg-red-500/15 text-red-300 border border-red-400/20",
  info: "bg-[#00d4ff]/15 text-[#7fe7ff] border border-[#00d4ff]/20",
  neon: "bg-[#00d4ff]/15 text-[#7fe7ff] border border-[#00d4ff]/20",
  yellow: "bg-amber-400/15 text-amber-300 border border-amber-400/20",
  grey: "bg-white/10 text-white/70 border border-white/10",
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
