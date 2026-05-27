"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  className?: string;
  light?: boolean;
}

export function LanguageSwitcher({ className = "", light = false }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    // Replace the locale segment in the pathname
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  }

  const isEn = locale === "en";
  const baseClass = light
    ? "text-white/80 hover:text-white"
    : "text-grey-600 hover:text-primary-700";

  return (
    <div className={`flex items-center gap-1 text-sm font-medium ${className}`}>
      <Globe size={14} className={light ? "text-white/60" : "text-grey-400"} />
      <button
        onClick={() => switchLocale("fr")}
        className={`px-1.5 py-0.5 rounded transition-colors ${
          !isEn
            ? light
              ? "text-white font-semibold"
              : "text-primary-700 font-semibold"
            : baseClass
        }`}
        aria-label="Français"
        aria-pressed={!isEn}
      >
        FR
      </button>
      <span className={light ? "text-white/40" : "text-grey-300"}>/</span>
      <button
        onClick={() => switchLocale("en")}
        className={`px-1.5 py-0.5 rounded transition-colors ${
          isEn
            ? light
              ? "text-white font-semibold"
              : "text-primary-700 font-semibold"
            : baseClass
        }`}
        aria-label="English"
        aria-pressed={isEn}
      >
        EN
      </button>
    </div>
  );
}
