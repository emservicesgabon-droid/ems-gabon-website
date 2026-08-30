import { useTranslations } from "next-intl";
import { MapPin, Award, Zap, DollarSign, Cpu, MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconBox } from "@/components/ui/IconBox";

const reasons = [
  { icon: MapPin, titleKey: "home.why_proximity_title", descKey: "home.why_proximity_desc", color: "primary" as const },
  { icon: Award, titleKey: "home.why_expertise_title", descKey: "home.why_expertise_desc", color: "success" as const },
  { icon: Zap, titleKey: "home.why_reactivity_title", descKey: "home.why_reactivity_desc", color: "neon" as const },
  { icon: DollarSign, titleKey: "home.why_cost_title", descKey: "home.why_cost_desc", color: "yellow" as const },
  { icon: Cpu, titleKey: "home.why_local_title", descKey: "home.why_local_desc", color: "primary" as const },
  { icon: MessageSquare, titleKey: "home.why_bilingual_title", descKey: "home.why_bilingual_desc", color: "grey" as const },
];

export function WhyChooseUs() {
  const t = useTranslations();

  return (
    <section className="py-16 sm:py-20 bg-[#0b1c2e]">
      <Container>
        <SectionHeading
          title={t("home.why_title")}
          subtitle={t("home.why_subtitle")}
          className="mb-12"
          light
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(({ icon: Icon, titleKey, descKey, color }) => (
            <div key={titleKey} className="flex gap-4 p-5 bg-white/[0.04] rounded-xl border border-white/10 hover:border-[#00d4ff]/30 transition-colors">
              <IconBox variant={color} size="md" className="flex-shrink-0">
                <Icon size={20} />
              </IconBox>
              <div>
                <h3 className="font-semibold text-white mb-1">{t(titleKey)}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{t(descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
