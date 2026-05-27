import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import type { Metadata } from "next";
import Link from "next/link";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconBox } from "@/components/ui/IconBox";
import { CTABanner } from "@/components/sections/CTABanner";
import { services, type Service } from "@/data/services";
import {
  Wrench, Calculator, Shield, Cable, GraduationCap, Server,
  Globe, Headphones, Settings, ArrowRight, Building2, Home
} from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Wrench, Calculator, Shield, Cable, GraduationCap, Server,
  Globe, Headphones, Settings,
};

const colorMap: Record<Service["color"], "primary" | "success" | "neon" | "yellow" | "grey"> = {
  primary: "primary", success: "success", neon: "neon", yellow: "yellow", grey: "grey",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("title"), description: t("subtitle") };
}

function ServicesContent() {
  const t = useTranslations();
  const locale = useLocale();

  const solutionBlocks = [
    {
      icon: Building2,
      titleKey: "nav.solutionsEntreprises",
      descKey: "entreprises.description",
      href: `/${locale}/solutions-entreprises`,
      color: "primary" as const,
    },
    {
      icon: Home,
      titleKey: "nav.solutionsParticuliers",
      descKey: "particuliers.description",
      href: `/${locale}/solutions-particuliers`,
      color: "success" as const,
    },
  ];

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
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-[#38d8ff]/30 bg-[#38d8ff]/8 text-[#8eeeff] text-xs font-semibold px-3 py-1.5 rounded-full mb-5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#38d8ff] animate-pulse shadow-[0_0_6px_#38d8ff]" />
              EMS GABON
            </div>
            <h1 className="text-neon-blue text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              {t("services.title")}
            </h1>
            <p className="text-neon-blue-sub text-base sm:text-lg leading-relaxed">
              {t("services.subtitle")}
            </p>
          </div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none" aria-hidden="true">
          <svg viewBox="0 0 1200 50" preserveAspectRatio="none" className="w-full h-8 fill-[#f8fafc]">
            <path d="M0,50 C300,0 900,50 1200,0 L1200,50 Z" />
          </svg>
        </div>
      </section>

      {/* Solution blocks */}
      <section className="py-12 bg-grey-50 border-b border-border">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {solutionBlocks.map(({ icon: Icon, titleKey, descKey, href, color }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-start gap-4 bg-white rounded-xl border border-border p-6 hover:border-primary-200 hover:shadow-[var(--shadow-card-hover)] transition-all"
              >
                <IconBox variant={color} size="lg"><Icon size={26} /></IconBox>
                <div className="flex-1">
                  <h2 className="font-bold text-text-heading text-lg mb-2 group-hover:text-primary-700 transition-colors">
                    {t(titleKey)}
                  </h2>
                  <p className="text-sm text-text-muted leading-relaxed line-clamp-2">{t(descKey)}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 mt-3">
                    {t("common.cta_discover")} <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* All services grid */}
      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <SectionHeading
            title={t("services.title")}
            subtitle={t("services.subtitle")}
            align="left"
            className="mb-10"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" id="maintenance">
            {services.map((service) => {
              const Icon = iconMap[service.icon] ?? Globe;
              return (
                <Link
                  key={service.id}
                  id={service.id}
                  href={`/${locale}/${service.slug}`}
                  className="group flex flex-col gap-4 p-6 bg-white rounded-xl border border-border hover:border-primary-200 hover:shadow-[var(--shadow-card-hover)] transition-all"
                >
                  <IconBox variant={colorMap[service.color]} size="md">
                    <Icon size={22} />
                  </IconBox>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-heading mb-1.5 group-hover:text-primary-700 transition-colors">
                      {t(service.titleKey)}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {t(service.descriptionKey)}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-primary-600 group-hover:gap-2 transition-all">
                    {t("common.cta_discover")} <ArrowRight size={12} />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicesContent />;
}
