import { type ReactNode } from "react";

type IconBoxVariant = "primary" | "success" | "neon" | "yellow" | "grey";
type IconBoxSize = "sm" | "md" | "lg";

interface IconBoxProps {
  children: ReactNode;
  variant?: IconBoxVariant;
  size?: IconBoxSize;
  rounded?: boolean;
  className?: string;
}

const variantClasses: Record<IconBoxVariant, string> = {
  primary: "bg-primary-500/12 text-primary-300 border border-primary-400/15",
  success: "bg-accent-green/12 text-green-300 border border-green-400/15",
  neon: "bg-[#00d4ff]/12 text-[#00d4ff] border border-[#00d4ff]/15",
  yellow: "bg-amber-400/12 text-amber-300 border border-amber-400/15",
  grey: "bg-white/8 text-white/70 border border-white/10",
};

const sizeClasses: Record<IconBoxSize, string> = {
  sm: "w-8 h-8 text-base",
  md: "w-12 h-12 text-xl",
  lg: "w-16 h-16 text-2xl",
};

export function IconBox({
  children,
  variant = "primary",
  size = "md",
  rounded = false,
  className = "",
}: IconBoxProps) {
  return (
    <div
      className={`inline-flex items-center justify-center flex-shrink-0 ${variantClasses[variant]} ${sizeClasses[size]} ${rounded ? "rounded-full" : "rounded-xl"} ${className}`}
    >
      {children}
    </div>
  );
}
