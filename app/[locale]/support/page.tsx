import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import type { Metadata } from "next";
import Link from "next/link";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { IconBox } from "@/components/ui/IconBox";
import { CTABanner } from "@/components/sections/CTABanner";
import { Phone, Monitor, MapPin, Wrench, ArrowRight, ChevronDown } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "support" });
  return { title: t("title"), description: t("description") };
}

const faqItems = [
  {
    q: "Quels sont vos délais d'intervention ?",
    a: "Pour les urgences, nous intervenons sous 24–48h. Pour les interventions planifiées, nous proposons des créneaux dans la semaine. Nos abonnés mensuels bénéficient d'une priorité.",
  },
  {
    q: "Intervenez-vous en dehors de Libreville ?",
    a: "Oui, notre équipe intervient dans tout le Gabon : Port-Gentil, Franceville, Oyem, Lambaréné et autres villes. Des frais de déplacement peuvent s'appliquer.",
  },
  {
    q: "Que comprend le contrat de maintenance mensuel ?",
    a: "Il comprend : support téléphonique illimité, 2 visites préventives par mois, interventions correctives incluses, et rapport mensuel de l'état de votre parc.",
  },
  {
    q: "Peut-on faire une assistance à distance ?",
    a: "Oui, nous pouvons prendre le contrôle à distance de votre ordinateur (avec votre accord) pour résoudre la majorité des problèmes logiciels.",
  },
  {
    q: "Proposez-vous des contrats pour les particuliers ?",
    a: "Oui, nous proposons un contrat annuel pour particuliers incluant 4 visites par an, support téléphonique et priorité d'intervention.",
  },
];

function SupportContent() {
  const t = useTranslations();
  const locale = useLocale();

  const supportTypes = [
    { icon: Phone, titleKey: "support.phone_title", descKey: "support.phone_desc", variant: "primary" as const },
    { icon: Monitor, titleKey: "support.remote_title", descKey: "support.remote_desc", variant: "neon" as const },
    { icon: MapPin, titleKey: "support.onsite_title", descKey: "support.onsite_desc", variant: "success" as const },
    { icon: Wrench, titleKey: "support.preventive_title", descKey: "support.preventive_desc", variant: "yellow" as const },
  ];

  const contracts = [
    { titleKey: "support.contract_incident", descKey: "support.contract_incident_desc", variant: "grey" as const, featured: false },
    { titleKey: "support.contract_monthly", descKey: "support.contract_monthly_desc", variant: "primary" as const, featured: true },
    { titleKey: "support.contract_annual", descKey: "support.contract_annual_desc", variant: "success" as const, featured: false },
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
              {t("support.title")}
            </h1>
            <p className="text-neon-blue-sub text-base sm:text-lg leading-relaxed">
              {t("support.subtitle")}
            </p>
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
          <p className="text-base sm:text-lg text-text-body leading-relaxed max-w-3xl">
            {t("support.description")}
          </p>
        </Container>
      </section>

      {/* Support types */}
      <section className="py-14 bg-grey-50 border-y border-border">
        <Container>
          <SectionHeading title={t("support.title")} align="left" className="mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {supportTypes.map(({ icon: Icon, titleKey, descKey, variant }) => (
              <Card key={titleKey} padding="md" hover>
                <IconBox variant={variant} size="md" className="mb-4"><Icon size={20} /></IconBox>
                <h3 className="font-semibold text-text-heading mb-2">{t(titleKey)}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{t(descKey)}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Contracts */}
      <section className="py-14 bg-white">
        <Container>
          <SectionHeading title={t("support.contracts_title")} align="left" className="mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {contracts.map(({ titleKey, descKey, featured }) => (
              <div
                key={titleKey}
                className={`rounded-xl border p-6 flex flex-col gap-4 ${
                  featured
                    ? "border-primary-400 bg-primary-50 ring-2 ring-primary-300"
                    : "border-border bg-white"
                }`}
              >
                {featured && <Badge variant="primary" className="self-start">Recommandé</Badge>}
                <h3 className="font-bold text-text-heading text-lg">{t(titleKey)}</h3>
                <p className="text-sm text-text-muted leading-relaxed flex-1">{t(descKey)}</p>
                <Link
                  href={`/${locale}/devis`}
                  className={`flex items-center gap-1.5 text-sm font-semibold ${
                    featured ? "text-primary-700" : "text-grey-600 hover:text-primary-700"
                  } transition-colors`}
                >
                  {t("common.cta_quote")} <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-grey-50 border-t border-border">
        <Container size="lg">
          <SectionHeading title={t("support.faq_title")} className="mb-10" />
          <div className="max-w-3xl mx-auto divide-y divide-border">
            {faqItems.map((item, i) => (
              <details key={i} className="group py-4">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-text-heading font-medium text-sm sm:text-base">
                  {item.q}
                  <ChevronDown
                    size={18}
                    className="flex-shrink-0 text-grey-400 group-open:rotate-180 transition-transform duration-200"
                  />
                </summary>
                <p className="mt-3 text-sm text-text-muted leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}

export default async function SupportPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SupportContent />;
}
