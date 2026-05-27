import { type ReactNode, type ElementType } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  as?: ElementType;
}

const sizeClasses = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

export function Container({
  children,
  className = "",
  size = "xl",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} ${className}`}
    >
      {children}
    </Tag>
  );
}
