import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsCounter } from "@/components/sections/StatsCounter";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { RealisationsPreview } from "@/components/sections/RealisationsPreview";
import { PartnerLogos } from "@/components/sections/PartnerLogos";
import { CTABanner } from "@/components/sections/CTABanner";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <StatsCounter />
      <ServicesGrid featured />
      <WhyChooseUs />
      <TestimonialsCarousel />
      <RealisationsPreview />
      <PartnerLogos />
      <CTABanner />
    </>
  );
}
