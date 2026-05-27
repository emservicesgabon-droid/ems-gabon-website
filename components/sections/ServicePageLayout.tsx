import { type ReactNode } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { IconBox } from "@/components/ui/IconBox";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Feature {
  icon?: React.ComponentType<{ size?: number }>;
  titleKey: string;
  descKey: string;
}

interface ServicePageLayoutProps {
  badgeText?: string;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  iconComponent: React.ComponentType<{ size?: number; className?: string }>;
  features?: Feature[];
  benefits?: string[];
  benefitsTitleKey?: string;
  servicesTitleKey?: string;
  ourServices?: string[];
  children?: ReactNode;
}

export function ServicePageLayout({
  badgeText = "EMS GABON",
  titleKey,
  subtitleKey,
  descriptionKey,
  iconComponent: Icon,
  features = [],
  benefits = [],
  benefitsTitleKey,
  servicesTitleKey,
  ourServices = [],
  children,
}: ServicePageLayoutProps) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <>
      {/* Hero */}
      <section className="hero-logo-bg relative overflow-hidden text-white py-16 sm:py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div
            className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(26,80,100,0.70) 0%, rgba(13,45,58,0.40) 50%, transparent 70%)" }}
          />
          <div className="orange-glow-blob-strong absolute -top-16 right-0 w-[420px] h-[420px] rounded-full" />
          <div
            className="absolute -bottom-24 right-1/3 w-[380px] h-[380px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(56,216,255,0.22) 0%, rgba(56,216,255,0.07) 50%, transparent 70%)" }}
          />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#38d8ff] to-transparent opacity-60" />
        </div>

        <Container className="relative">
          <div className="flex items-start gap-6 max-w-3xl">
            <div
              className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(56,216,255,0.12)", border: "1px solid rgba(56,216,255,0.30)" }}
            >
              <Icon size={28} className="text-[#38d8ff]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 border border-[#38d8ff]/30 bg-[#38d8ff]/8 text-[#8eeeff] text-xs font-semibold px-3 py-1.5 rounded-full mb-4 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#38d8ff] animate-pulse shadow-[0_0_6px_#38d8ff]" />
                {badgeText}
              </div>
              <h1 className="text-neon-blue text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3">
                {t(titleKey)}
              </h1>
              <p className="text-neon-blue-sub text-base sm:text-lg leading-relaxed">
                {t(subtitleKey)}
              </p>
            </div>
          </div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none" aria-hidden="true">
          <svg viewBox="0 0 1200 50" preserveAspectRatio="none" className="w-full h-8 fill-white">
            <path d="M0,50 C300,0 900,50 1200,0 L1200,50 Z" />
          </svg>
        </div>
      </section>

      {/* Description */}
      <section className="py-14 bg-white">
        <Container>
          <div className="max-w-3xl">
            <p className="text-base sm:text-lg text-text-body leading-relaxed">{t(descriptionKey)}</p>
          </div>
        </Container>
      </section>

      {/* Features grid */}
      {features.length > 0 && (
        <section className="py-14 bg-grey-50 border-y border-border">
          <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
              {features.map(({ icon: FIcon, titleKey: ftk, descKey: fdk }) => (
                <div key={ftk} className="flex gap-4 bg-white p-5 rounded-xl border border-border">
                  {FIcon && (
                    <IconBox variant="primary" size="sm" className="flex-shrink-0">
                      <FIcon size={16} />
                    </IconBox>
                  )}
                  <div>
                    <h3 className="font-semibold text-text-heading mb-1">{t(ftk)}</h3>
                    <p className="text-sm text-text-muted leading-relaxed">{t(fdk)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Our services */}
      {ourServices.length > 0 && (
        <section className="py-14 bg-white">
          <Container>
            <h2 className="text-xl font-bold text-text-heading mb-6">
              {servicesTitleKey ? t(servicesTitleKey) : t("services.title")}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ourServices.map((key) => (
                <li key={key} className="flex items-start gap-3 text-sm text-text-body">
                  <CheckCircle size={16} className="text-accent-green flex-shrink-0 mt-0.5" />
                  {t(key)}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Benefits */}
      {benefits.length > 0 && (
        <section className="py-14 bg-grey-50 border-y border-border">
          <Container>
            <h2 className="text-xl font-bold text-text-heading mb-6">
              {benefitsTitleKey ? t(benefitsTitleKey) : "Avantages"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((key, i) => (
                <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-border text-sm text-text-body">
                  <CheckCircle size={16} className="text-primary-600 flex-shrink-0 mt-0.5" />
                  {t(key)}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {children}

      {/* CTA strip */}
      <section className="py-12 bg-white border-t border-border">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-primary-50 rounded-2xl p-6 sm:p-8">
            <div>
              <h3 className="font-bold text-text-heading text-lg mb-1">
                {t("home.cta_title")}
              </h3>
              <p className="text-text-muted text-sm">{t("home.cta_subtitle")}</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link
                href={`/${locale}/devis`}
                className="inline-flex items-center gap-2 bg-accent-neon text-primary-900 text-sm font-bold px-5 py-2.5 rounded-lg hover:brightness-110 transition-all shadow-sm shadow-accent-neon/20"
              >
                {t("common.cta_quote")} <ArrowRight size={14} />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 border border-border text-text-body text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-grey-50 transition-colors"
              >
                {t("common.cta_contact")}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
