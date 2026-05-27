import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Shield, Camera, Lock, DoorOpen, ListChecks } from "lucide-react";
import { ServicePageLayout } from "@/components/sections/ServicePageLayout";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "security" });
  return { title: t("title"), description: t("description") };
}

function SecurityContent() {
  const t = useTranslations();
  return (
    <ServicePageLayout
      titleKey="security.title"
      subtitleKey="security.subtitle"
      descriptionKey="security.description"
      iconComponent={Shield}

      features={[
        { icon: Camera, titleKey: "security.cctv_title", descKey: "security.cctv_desc" },
        { icon: Shield, titleKey: "security.alarm_title", descKey: "security.alarm_desc" },
        { icon: Lock, titleKey: "security.access_title", descKey: "security.access_desc" },
        { icon: DoorOpen, titleKey: "security.portal_title", descKey: "security.portal_desc" },
      ]}
    />
  );
}

export default async function SecurityPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SecurityContent />;
}
