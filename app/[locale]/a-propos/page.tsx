import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { IconBox } from "@/components/ui/IconBox";
import Image from "next/image";
import { CTABanner } from "@/components/sections/CTABanner";
import { PartnerLogos } from "@/components/sections/PartnerLogos";
import { team } from "@/data/team";
import {
  Target, Eye, Heart, Building2, ShoppingBag,
  School, HandHeart, User, Users, MapPin,
  ShieldCheck, Star, Cpu
} from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

function AboutContent() {
  const t = useTranslations();
  const locale = useLocale();

  const values = [
    { icon: ShieldCheck, titleKey: "about.value_integrity", descKey: "about.value_integrity_desc", color: "primary" as const },
    { icon: Star, titleKey: "about.value_excellence", descKey: "about.value_excellence_desc", color: "yellow" as const },
    { icon: Cpu, titleKey: "about.value_innovation", descKey: "about.value_innovation_desc", color: "neon" as const },
    { icon: Heart, titleKey: "about.value_proximity", descKey: "about.value_proximity_desc", color: "success" as const },
  ];

  const clientTypes = [
    { icon: Building2, labelKey: "about.client_sme" },
    { icon: Users, labelKey: "about.client_admin" },
    { icon: ShoppingBag, labelKey: "about.client_commerce" },
    { icon: School, labelKey: "about.client_schools" },
    { icon: HandHeart, labelKey: "about.client_ngo" },
    { icon: User, labelKey: "about.client_individuals" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero-logo-bg relative overflow-hidden text-white py-16 sm:py-20">
        {/* Blobs décoratifs */}
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
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-[#38d8ff]/30 bg-[#38d8ff]/8 text-[#8eeeff] text-xs font-semibold px-3 py-1.5 rounded-full mb-5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#38d8ff] animate-pulse shadow-[0_0_6px_#38d8ff]" />
              EMS GABON
            </div>
            <h1 className="text-neon-blue text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              {t("about.title")}
            </h1>
            <p className="text-neon-blue-sub text-base sm:text-lg leading-relaxed">
              {t("about.subtitle")}
            </p>
          </div>
        </Container>

        {/* Vague de transition */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none" aria-hidden="true">
          <svg viewBox="0 0 1200 50" preserveAspectRatio="none" className="w-full h-8 fill-white">
            <path d="M0,50 C300,0 900,50 1200,0 L1200,50 Z" />
          </svg>
        </div>
      </section>

      {/* History + Mission + Vision */}
      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card padding="lg" className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <IconBox variant="primary" size="sm"><Target size={16} /></IconBox>
                <h2 className="text-xl font-bold text-text-heading">{t("about.history_title")}</h2>
              </div>
              <p className="text-text-body leading-relaxed">{t("about.history_text")}</p>
            </Card>

            <div className="flex flex-col gap-5">
              <Card padding="md">
                <div className="flex items-center gap-2 mb-3">
                  <IconBox variant="success" size="sm"><Target size={14} /></IconBox>
                  <h3 className="font-semibold text-text-heading">{t("about.mission_title")}</h3>
                </div>
                <p className="text-sm text-text-muted leading-relaxed">{t("about.mission_text")}</p>
              </Card>
              <Card padding="md">
                <div className="flex items-center gap-2 mb-3">
                  <IconBox variant="neon" size="sm"><Eye size={14} /></IconBox>
                  <h3 className="font-semibold text-text-heading">{t("about.vision_title")}</h3>
                </div>
                <p className="text-sm text-text-muted leading-relaxed">{t("about.vision_text")}</p>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-16 bg-grey-50">
        <Container>
          <SectionHeading title={t("about.values_title")} className="mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, titleKey, descKey, color }) => (
              <Card key={titleKey} padding="md" hover>
                <IconBox variant={color} size="md" className="mb-4"><Icon size={20} /></IconBox>
                <h3 className="font-semibold text-text-heading mb-2">{t(titleKey)}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{t(descKey)}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <Container>
          <SectionHeading
            title={t("about.team_title")}
            subtitle={t("about.team_subtitle")}
            className="mb-12"
          />

          {/* Direction */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ color: "#f5a623", background: "rgba(245,166,35,0.10)", border: "1px solid rgba(245,166,35,0.25)" }}>
                Direction
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.filter(m => m.group === "direction").map((member) => (
                <Card key={member.id} padding="md" hover>
                  <div className="w-16 h-16 rounded-full mb-4 mx-auto overflow-hidden flex-shrink-0"
                    style={{ border: "2px solid rgba(245,166,35,0.40)" }}>
                    {member.avatar ? (
                      <Image src={member.avatar} alt={member.name} width={64} height={64} className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-xl"
                        style={{ background: "rgba(245,166,35,0.12)", color: "#f5a623" }}>
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-text-heading text-center mb-0.5">{member.name}</h3>
                  <p className="text-xs font-semibold text-center mb-3" style={{ color: "#f5a623" }}>
                    {locale === "en" ? member.roleEn : member.role}
                  </p>
                  <p className="text-xs text-text-muted leading-relaxed mb-3">
                    {locale === "en" ? member.bioEn : member.bio}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {member.skills.map((skill) => (
                      <Badge key={skill} variant="grey" className="text-xs">{skill}</Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Opérations */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ color: "#38d8ff", background: "rgba(56,216,255,0.08)", border: "1px solid rgba(56,216,255,0.25)" }}>
                Opérations
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <div className="flex justify-center">
              {team.filter(m => m.group === "operations").map((member) => (
                <Card key={member.id} padding="md" hover className="w-full max-w-sm">
                  <div className="w-16 h-16 rounded-full mb-4 mx-auto overflow-hidden flex-shrink-0 border-2 border-primary-200">
                    {member.avatar ? (
                      <Image src={member.avatar} alt={member.name} width={64} height={64} className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="w-full h-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xl">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-text-heading text-center mb-0.5">{member.name}</h3>
                  <p className="text-sm text-primary-600 text-center mb-3">
                    {locale === "en" ? member.roleEn : member.role}
                  </p>
                  <p className="text-xs text-text-muted leading-relaxed mb-3">
                    {locale === "en" ? member.bioEn : member.bio}
                  </p>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {member.skills.map((skill) => (
                      <Badge key={skill} variant="grey" className="text-xs">{skill}</Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Équipe terrain */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full text-grey-600"
                style={{ background: "rgba(100,116,139,0.10)", border: "1px solid rgba(100,116,139,0.25)" }}>
                Équipe terrain
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>
            {team.filter(m => m.group === "terrain").map((member) => (
              <div key={member.id} className="bg-grey-50 border border-border rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-grey-200 flex items-center justify-center flex-shrink-0">
                  <Users size={28} className="text-grey-500" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-semibold text-text-heading mb-0.5">{member.name}</h3>
                  <p className="text-sm text-grey-500 mb-2">
                    {locale === "en" ? member.roleEn : member.role}
                  </p>
                  <p className="text-xs text-text-muted leading-relaxed mb-3">
                    {locale === "en" ? member.bioEn : member.bio}
                  </p>
                  <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                    {member.skills.map((skill) => (
                      <Badge key={skill} variant="grey" className="text-xs">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </Container>
      </section>

      {/* Zone d'intervention */}
      <section className="py-16 bg-grey-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                title={t("about.zones_title")}
                subtitle={t("about.zones_subtitle")}
                align="left"
                className="mb-5"
              />
              <p className="text-text-body leading-relaxed mb-6">{t("about.zones_text")}</p>

              <div className="bg-white rounded-xl border border-border p-5">
                <h3 className="font-semibold text-text-heading mb-4">{t("about.clients_title")}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {clientTypes.map(({ icon: Icon, labelKey }) => (
                    <div key={labelKey} className="flex items-center gap-2.5 text-sm text-text-body">
                      <div className="w-7 h-7 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <Icon size={13} className="text-primary-700" />
                      </div>
                      {t(labelKey)}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl h-72 flex items-center justify-center border border-primary-200">
              <div className="text-center">
                <MapPin size={40} className="text-primary-600 mx-auto mb-3" />
                <p className="text-primary-700 font-semibold">Gabon — Afrique Centrale</p>
                <p className="text-primary-600 text-sm mt-1">Libreville · Port-Gentil · Franceville · Oyem</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <PartnerLogos />
      <CTABanner />
    </>
  );
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}
