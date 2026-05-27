import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { Calculator, Cloud, Server, BookOpen, Headphones, RefreshCw } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { IconBox } from "@/components/ui/IconBox";
import { ServicePageLayout } from "@/components/sections/ServicePageLayout";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sage" });
  return { title: t("title"), description: t("description") };
}

function Sage100Content() {
  const t = useTranslations();

  const modes = [
    { icon: Server, titleKey: "sage.local_title", descKey: "sage.local_desc", variant: "primary" as const },
    { icon: Cloud, titleKey: "sage.cloud_title", descKey: "sage.cloud_desc", variant: "neon" as const },
  ];

  const modules = ["sage.module_compta", "sage.module_commercial", "sage.module_paie", "sage.module_immo"];

  return (
    <ServicePageLayout
      titleKey="sage.title"
      subtitleKey="sage.subtitle"
      descriptionKey="sage.description"
      iconComponent={Calculator}

      servicesTitleKey="sage.services_title"
      ourServices={["sage.service_install", "sage.service_training", "sage.service_support", "sage.service_migration"]}
    >
      {/* Modes */}
      <section className="py-14 bg-white">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {modes.map(({ icon: Icon, titleKey, descKey, variant }) => (
              <Card key={titleKey} padding="lg" hover>
                <IconBox variant={variant} size="md" className="mb-4"><Icon size={22} /></IconBox>
                <h3 className="font-bold text-text-heading text-lg mb-2">{t(titleKey)}</h3>
                <p className="text-text-muted leading-relaxed text-sm">{t(descKey)}</p>
              </Card>
            ))}
          </div>

          {/* Modules */}
          <h2 className="text-xl font-bold text-text-heading mb-4">{t("sage.modules_title")}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {modules.map((key) => (
              <div key={key} className="flex flex-col items-center gap-2 p-4 bg-grey-50 rounded-xl border border-border text-center">
                <div className="w-8 h-8 rounded-lg bg-accent-green-light flex items-center justify-center">
                  <BookOpen size={14} className="text-accent-green" />
                </div>
                <span className="text-sm font-medium text-text-heading">{t(key)}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </ServicePageLayout>
  );
}

export default async function Sage100Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Sage100Content />;
}
