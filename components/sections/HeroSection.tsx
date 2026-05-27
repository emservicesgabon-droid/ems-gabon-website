import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, Shield, Wifi, Calculator, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function HeroSection() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className="hero-logo-bg relative overflow-hidden text-white">
      {/* ── Decorative blobs – three circles ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">

        {/* Blob 1 — grand cercle teal centre-gauche */}
        <div
          className="absolute -left-40 top-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(26,80,100,0.75) 0%, rgba(13,45,58,0.45) 50%, transparent 70%)",
          }}
        />

        {/* Blob 2 — halo orange top-right (effet logo) */}
        <div
          className="orange-glow-blob-strong absolute -top-20 right-0 w-[560px] h-[560px] rounded-full"
        />

        {/* Blob 3 — cercle neon bleu bottom-right */}
        <div
          className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(56,216,255,0.28) 0%, rgba(56,216,255,0.10) 50%, transparent 70%)",
          }}
        />

        {/* Ligne neon en haut */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#38d8ff] to-transparent opacity-70" />

        {/* Ligne orange subtile en bas à droite */}
        <div className="absolute bottom-0 right-0 w-1/2 h-[1px] bg-gradient-to-l from-[#f5a623]/60 to-transparent" />
      </div>

      <Container className="relative py-20 sm:py-24 lg:py-32">
        <div className="max-w-3xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-[#38d8ff]/30 bg-[#38d8ff]/8 text-[#8eeeff] text-xs font-semibold px-3 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#38d8ff] animate-pulse shadow-[0_0_6px_#38d8ff]" />
            {t("home.hero_badge")}
          </div>

          {/* Titre — neon bleu électrique */}
          <h1 className="text-neon-blue text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
            {t("home.hero_title")}
          </h1>

          {/* Sous-titre — neon bleu clair */}
          <p className="text-neon-blue-sub text-base sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-2xl">
            {t("home.hero_subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 mb-12">
            <Link
              href={`/${locale}/devis`}
              className="inline-flex items-center gap-2 bg-accent-neon text-primary-900 font-bold text-sm px-6 py-3 rounded-lg hover:brightness-110 transition-all shadow-lg shadow-accent-neon/30"
            >
              {t("home.hero_cta_primary")}
              <ArrowRight size={16} />
            </Link>
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 border-2 border-[#38d8ff]/40 text-[#8eeeff] font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#38d8ff]/10 transition-colors"
            >
              {t("home.hero_cta_secondary")}
            </Link>
          </div>

          {/* Quick features */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Shield, labelKey: "services.security_title" },
              { icon: Wifi, labelKey: "services.fiber_title" },
              { icon: Calculator, labelKey: "services.sage_title" },
              { icon: Phone, labelKey: "services.support_title" },
            ].map(({ icon: Icon, labelKey }) => (
              <div
                key={labelKey}
                className="flex items-center gap-2 text-white/60 text-xs"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(56,216,255,0.12)",
                    border: "1px solid rgba(56,216,255,0.25)",
                  }}
                >
                  <Icon size={14} className="text-[#38d8ff]" />
                </div>
                <span>{t(labelKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Vague bas — blanche pour transition vers le contenu */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-10 fill-white">
          <path d="M0,60 C300,0 900,60 1200,0 L1200,60 Z" />
        </svg>
      </div>
    </section>
  );
}
