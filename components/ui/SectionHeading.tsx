interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  accent?: boolean;
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  accent = true,
  light = false,
  className = "",
}: SectionHeadingProps) {
  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[align];

  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {accent && (
        <span
          className="inline-block h-1 w-12 rounded-full bg-accent-neon"
          aria-hidden="true"
        />
      )}
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight ${
          light ? "text-white" : "text-text-heading"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base sm:text-lg leading-relaxed max-w-2xl ${
            light ? "text-white/80" : "text-text-muted"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
