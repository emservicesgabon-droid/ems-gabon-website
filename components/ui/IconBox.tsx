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
  primary: "bg-primary-100 text-primary-700",
  success: "bg-accent-green-light text-accent-green",
  neon: "bg-accent-neon-light text-cyan-600",
  yellow: "bg-accent-yellow-light text-amber-600",
  grey: "bg-grey-100 text-grey-600",
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
