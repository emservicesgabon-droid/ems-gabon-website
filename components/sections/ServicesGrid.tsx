import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import {
  Wrench, Calculator, Shield, Cable, GraduationCap, Server,
  Globe, Headphones, Settings, ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconBox } from "@/components/ui/IconBox";
import { services, featuredServices, type Service } from "@/data/services";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Wrench, Calculator, Shield, Cable, GraduationCap, Server,
  Globe, Headphones, Settings,
};

const colorMap: Record<Service["color"], "primary" | "success" | "neon" | "yellow" | "grey"> = {
  primary: "primary",
  success: "success",
  neon: "neon",
  yellow: "yellow",
  grey: "grey",
};

interface ServicesGridProps {
  featured?: boolean;
  showAll?: boolean;
}

export function ServicesGrid({ featured = true, showAll = false }: ServicesGridProps) {
  const t = useTranslations();
  const locale = useLocale();
  const items = showAll ? services : featuredServices;

  return (
    <section className="py-16 sm:py-20 bg-white">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <SectionHeading
            title={t("home.services_title")}
            subtitle={t("home.services_subtitle")}
            align="left"
          />
          {!showAll && (
            <Link
              href={`/${locale}/services`}
              className="flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors flex-shrink-0"
            >
              {t("common.cta_services")}
              <ArrowRight size={15} />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((service) => {
            const Icon = iconMap[service.icon] ?? Globe;
            return (
              <Link
                key={service.id}
                href={`/${locale}/${service.slug}`}
                className="group flex flex-col gap-4 p-6 bg-white rounded-xl border border-border hover:border-primary-200 hover:shadow-[var(--shadow-card-hover)] transition-all duration-200"
              >
                <IconBox variant={colorMap[service.color]} size="md">
                  <Icon size={22} />
                </IconBox>
                <div className="flex-1">
                  <h3 className="font-semibold text-text-heading mb-1.5 group-hover:text-primary-700 transition-colors">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {t(service.descriptionKey)}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-primary-600 group-hover:gap-2 transition-all">
                  {t("common.cta_discover")}
                  <ArrowRight size={12} />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
