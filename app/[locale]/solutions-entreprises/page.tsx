import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Building2, Wrench, Server, Shield, DoorOpen, GraduationCap } from "lucide-react";
import { ServicePageLayout } from "@/components/sections/ServicePageLayout";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "entreprises" });
  return { title: t("title"), description: t("description") };
}

function EntreprisesContent() {
  const t = useTranslations();
  return (
    <ServicePageLayout
      titleKey="entreprises.title"
      subtitleKey="entreprises.subtitle"
      descriptionKey="entreprises.description"
      iconComponent={Building2}

      features={[
        { icon: Wrench, titleKey: "entreprises.maintenance_title", descKey: "entreprises.maintenance_desc" },
        { icon: Server, titleKey: "entreprises.gestion_title", descKey: "entreprises.gestion_desc" },
        { icon: Shield, titleKey: "entreprises.security_title", descKey: "entreprises.security_desc" },
        { icon: DoorOpen, titleKey: "entreprises.portal_title", descKey: "entreprises.portal_desc" },
        { icon: GraduationCap, titleKey: "entreprises.training_title", descKey: "entreprises.training_desc" },
      ]}
    />
  );
}

export default async function EntreprisesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <EntreprisesContent />;
}
