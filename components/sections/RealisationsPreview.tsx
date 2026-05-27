import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { featuredProjects } from "@/data/projects";

export function RealisationsPreview() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className="py-16 sm:py-20 bg-white">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <SectionHeading
            title={t("home.realisations_title")}
            subtitle={t("home.realisations_subtitle")}
            align="left"
          />
          <Link
            href={`/${locale}/realisations`}
            className="flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors flex-shrink-0"
          >
            {t("common.cta_realisations")}
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col bg-grey-50 rounded-xl border border-border overflow-hidden hover:border-primary-200 hover:shadow-[var(--shadow-card-hover)] transition-all duration-200"
            >
              {/* Image placeholder */}
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 h-36 flex items-center justify-center">
                <span className="text-primary-600 font-bold text-sm opacity-60">{project.client}</span>
              </div>

              <div className="p-5 flex-1 flex flex-col gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="primary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
                <h3 className="font-semibold text-text-heading text-sm leading-snug">
                  {locale === "en" ? project.titleEn : project.title}
                </h3>
                <div className="flex items-start gap-2 text-xs text-text-muted">
                  <CheckCircle size={13} className="text-accent-green flex-shrink-0 mt-0.5" />
                  <span>{locale === "en" ? project.resultEn : project.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
