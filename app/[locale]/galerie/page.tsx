import { pageMeta } from "@/lib/seo";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { GalerieGrid } from "@/components/sections/GalerieGrid";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "galerie" });
  return pageMeta({ locale, title: t("title"), description: t("subtitle"), path: "/galerie" });
}

function GalerieContent() {
  const t = useTranslations();

  return (
    <div className="bg-[#0a1628]">
      {/* Hero */}
      <section className="relative overflow-hidden pb-6 pt-16 text-white sm:pt-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute -left-28 -top-24 h-[420px] w-[420px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(0,212,255,0.16), transparent 70%)" }}
          />
          <div
            className="absolute -right-20 top-0 h-[380px] w-[380px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(212,169,75,0.16), transparent 70%)" }}
          />
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/50 to-transparent" />
        </div>

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/10 px-3 py-1.5 text-xs font-semibold text-[#8eeeff] backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[#00d4ff] shadow-[0_0_6px_#00d4ff]" />
              EMS GABON
            </span>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t("galerie.title")}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              {t("galerie.subtitle")}
            </p>
          </div>
        </Container>
      </section>

      {/* Grille */}
      <section className="pb-20">
        <Container>
          <GalerieGrid />
        </Container>
      </section>
    </div>
  );
}

export default async function GaleriePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <GalerieContent />;
}
