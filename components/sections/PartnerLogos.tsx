import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { partners } from "@/data/partners";

export function PartnerLogos({ dark = true }: { dark?: boolean }) {
  const t = useTranslations();

  return (
    <section
      className={`py-14 border-t ${dark ? "bg-[#0a1628] border-white/5" : "bg-white border-border"}`}
    >
      <Container>
        <SectionHeading
          title={t("home.partners_title")}
          subtitle={t("home.partners_subtitle")}
          className="mb-10"
          light={dark}
        />
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className={`group flex flex-col items-center gap-2 px-6 py-4 rounded-xl border transition-all duration-200 ${
                dark
                  ? "border-white/10 hover:border-[#00d4ff]/40 hover:bg-white/5"
                  : "border-border hover:border-primary-200 hover:bg-primary-50"
              }`}
              title={partner.description}
            >
              {/* Placeholder logo — replace with actual <Image> when logos are available */}
              <div className="w-20 h-10 flex items-center justify-center">
                <span
                  className={`text-sm font-bold transition-colors ${
                    dark
                      ? "text-white/70 group-hover:text-[#00d4ff]"
                      : "text-grey-700 group-hover:text-primary-700"
                  }`}
                >
                  {partner.name}
                </span>
              </div>
              <span className={`text-xs ${dark ? "text-white/50" : "text-text-muted"}`}>
                {partner.category}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
