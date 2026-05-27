import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Home, Headphones, Settings, Shield, DoorOpen, GraduationCap } from "lucide-react";
import { ServicePageLayout } from "@/components/sections/ServicePageLayout";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "particuliers" });
  return { title: t("title"), description: t("description") };
}

function ParticuliersContent() {
  const t = useTranslations();
  return (
    <ServicePageLayout
      titleKey="particuliers.title"
      subtitleKey="particuliers.subtitle"
      descriptionKey="particuliers.description"
      iconComponent={Home}

      features={[
        { icon: Headphones, titleKey: "particuliers.assistance_title", descKey: "particuliers.assistance_desc" },
        { icon: Settings, titleKey: "particuliers.install_title", descKey: "particuliers.install_desc" },
        { icon: Shield, titleKey: "particuliers.security_title", descKey: "particuliers.security_desc" },
        { icon: DoorOpen, titleKey: "particuliers.portal_title", descKey: "particuliers.portal_desc" },
        { icon: GraduationCap, titleKey: "particuliers.training_title", descKey: "particuliers.training_desc" },
      ]}
    />
  );
}

export default async function ParticuliersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ParticuliersContent />;
}
