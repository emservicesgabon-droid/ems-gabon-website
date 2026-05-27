import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { GraduationCap, User, Users, Monitor, Building2 } from "lucide-react";
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
  const t = await getTranslations({ locale, namespace: "training" });
  return { title: t("title"), description: t("description") };
}

function TrainingContent() {
  const t = useTranslations();

  const levels = [
    { titleKey: "training.level_beginner", descKey: "training.level_beginner_desc", variant: "success" as const },
    { titleKey: "training.level_intermediate", descKey: "training.level_intermediate_desc", variant: "primary" as const },
    { titleKey: "training.level_advanced", descKey: "training.level_advanced_desc", variant: "neon" as const },
  ];

  const formats = [
    { icon: Users, labelKey: "training.format_onsite" },
    { icon: Monitor, labelKey: "training.format_remote" },
    { icon: Building2, labelKey: "training.format_company" },
    { icon: User, labelKey: "training.format_individual" },
  ];

  return (
    <ServicePageLayout
      titleKey="training.title"
      subtitleKey="training.subtitle"
      descriptionKey="training.description"
      iconComponent={GraduationCap}

    >
      {/* Levels */}
      <section className="py-14 bg-white">
        <Container>
          <h2 className="text-xl font-bold text-text-heading mb-6">{t("training.levels_title")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {levels.map(({ titleKey, descKey, variant }) => (
              <Card key={titleKey} padding="lg" hover>
                <IconBox variant={variant} size="md" className="mb-4"><GraduationCap size={20} /></IconBox>
                <h3 className="font-bold text-text-heading mb-2">{t(titleKey)}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{t(descKey)}</p>
              </Card>
            ))}
          </div>

          {/* Formats */}
          <h2 className="text-xl font-bold text-text-heading mb-4">{t("training.formats_title")}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {formats.map(({ icon: Icon, labelKey }) => (
              <div key={labelKey} className="flex flex-col items-center gap-2 p-4 bg-grey-50 rounded-xl border border-border text-center">
                <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center">
                  <Icon size={16} className="text-primary-700" />
                </div>
                <span className="text-sm font-medium text-text-heading">{t(labelKey)}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </ServicePageLayout>
  );
}

export default async function FormationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TrainingContent />;
}
