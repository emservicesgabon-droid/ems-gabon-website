import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface CTABannerProps {
  titleKey?: string;
  subtitleKey?: string;
  variant?: "blue" | "dark" | "gradient";
}

export function CTABanner({
  titleKey = "home.cta_title",
  subtitleKey = "home.cta_subtitle",
  variant = "gradient",
}: CTABannerProps) {
  const t = useTranslations();
  const locale = useLocale();

  const bgClass = {
    blue: "bg-primary-700",
    dark: "bg-bg-dark",
    gradient: "bg-gradient-to-r from-primary-900 to-primary-700",
  }[variant];

  return (
    <section className={`${bgClass} py-16 sm:py-20 relative overflow-hidden`}>
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-accent-neon/10" />
      </div>

      <Container className="relative text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
          {t(titleKey)}
        </h2>
        <p className="text-white/80 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
          {t(subtitleKey)}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href={`/${locale}/devis`}
            className="inline-flex items-center gap-2 bg-accent-neon text-primary-900 font-bold text-sm px-6 py-3 rounded-lg hover:brightness-110 transition-all shadow-lg shadow-accent-neon/20"
          >
            {t("common.cta_quote")}
            <ArrowRight size={16} />
          </Link>
          <a
            href="tel:+241011454973"
            className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Phone size={16} />
            {t("common.call")}
          </a>
        </div>
      </Container>
    </section>
  );
}
