import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Cable, Zap, Activity, TrendingUp, ShieldCheck } from "lucide-react";
import { ServicePageLayout } from "@/components/sections/ServicePageLayout";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "fiber" });
  return { title: t("title"), description: t("description") };
}

function FiberContent() {
  const t = useTranslations();
  return (
    <ServicePageLayout
      titleKey="fiber.title"
      subtitleKey="fiber.subtitle"
      descriptionKey="fiber.description"
      iconComponent={Cable}

      features={[
        { icon: Zap, titleKey: "fiber.benefit_speed", descKey: "fiber.benefit_stability" },
        { icon: Activity, titleKey: "fiber.benefit_stability", descKey: "fiber.benefit_scalability" },
        { icon: TrendingUp, titleKey: "fiber.benefit_scalability", descKey: "fiber.benefit_speed" },
        { icon: ShieldCheck, titleKey: "fiber.benefit_security", descKey: "fiber.benefit_security" },
      ]}
    />
  );
}

export default async function FiberPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FiberContent />;
}
