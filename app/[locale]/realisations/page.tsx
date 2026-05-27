import type { ComponentType } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { CTABanner } from "@/components/sections/CTABanner";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { projects } from "@/data/projects";
import { CheckCircle, Building2, Landmark, ShieldCheck, Network, GraduationCap } from "lucide-react";
import Image from "next/image";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "realisations" });
  return { title: t("title"), description: t("description") };
}

const categoryColors: Record<string, "primary" | "success" | "neon" | "yellow" | "grey"> = {
  enterprise: "primary",
  public: "success",
  security: "neon",
  network: "yellow",
  training: "grey",
};

const categoryFallback: Record<string, { Icon: ComponentType<{ size?: number; className?: string }>; bg: string; color: string }> = {
  enterprise: { Icon: Building2,     bg: "bg-primary-100",  color: "text-primary-600" },
  public:     { Icon: Landmark,      bg: "bg-success-100",  color: "text-success-700" },
  security:   { Icon: ShieldCheck,   bg: "bg-[rgba(56,216,255,0.10)]", color: "text-[#1ab8e0]" },
  network:    { Icon: Network,       bg: "bg-yellow-100",   color: "text-yellow-700" },
  training:   { Icon: GraduationCap, bg: "bg-grey-100",     color: "text-grey-500" },
};

function RealisationsContent() {
  const t = useTranslations();
  const locale = useLocale();

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
              Portfolio
            </div>
            <h1 className="text-neon-blue text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              {t("realisations.title")}
            </h1>
            <p className="text-neon-blue-sub text-base sm:text-lg leading-relaxed">
              {t("realisations.subtitle")}
            </p>
          </div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none" aria-hidden="true">
          <svg viewBox="0 0 1200 50" preserveAspectRatio="none" className="w-full h-8 fill-[#f8fafc]">
            <path d="M0,50 C300,0 900,50 1200,0 L1200,50 Z" />
          </svg>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-16 sm:py-20 bg-grey-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl border border-border overflow-hidden hover:border-primary-200 hover:shadow-[var(--shadow-card-hover)] transition-all duration-200 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.client}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    (() => {
                      const fb = categoryFallback[project.category] ?? categoryFallback.enterprise;
                      return (
                        <div className={`h-full flex flex-col items-center justify-center gap-2 ${fb.bg}`}>
                          <fb.Icon size={32} className={fb.color} />
                          <span className={`text-xs font-semibold text-center px-4 opacity-70 ${fb.color}`}>
                            {project.client}
                          </span>
                        </div>
                      );
                    })()
                  )}
                </div>

                <div className="p-5 flex flex-col gap-3 flex-1">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant={categoryColors[project.category]}>{tag}</Badge>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-text-heading leading-snug">
                    {locale === "en" ? project.titleEn : project.title}
                  </h3>

                  {/* Problem */}
                  <div>
                    <span className="text-xs font-semibold text-text-muted uppercase tracking-wide">
                      {t("realisations.problem")}
                    </span>
                    <p className="text-sm text-text-body mt-0.5">
                      {locale === "en" ? project.problemEn : project.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div>
                    <span className="text-xs font-semibold text-text-muted uppercase tracking-wide">
                      {t("realisations.solution")}
                    </span>
                    <p className="text-sm text-text-body mt-0.5">
                      {locale === "en" ? project.solutionEn : project.solution}
                    </p>
                  </div>

                  {/* Result */}
                  <div className="flex items-start gap-2 bg-accent-green-light rounded-lg p-3 mt-auto">
                    <CheckCircle size={14} className="text-accent-green flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold text-accent-green uppercase tracking-wide block mb-0.5">
                        {t("realisations.result")}
                      </span>
                      <p className="text-xs text-grey-700">
                        {locale === "en" ? project.resultEn : project.result}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <TestimonialsCarousel />
      <CTABanner />
    </>
  );
}

export default async function RealisationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RealisationsContent />;
}
