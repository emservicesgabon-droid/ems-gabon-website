"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

// Les 5 piliers métier EMS GABON — images flottantes autour du titre.
const HERO_IMAGES = [
  {
    src: "/images/hero/fibre-optique.webp",
    alt: "Fibre optique",
    w: 1200,
    h: 1200,
    pos: "left-[3%] top-[15%] w-32 xl:w-44",
    glow: "cyan",
    delay: 0,
  },
  {
    src: "/images/hero/serveur-cloud.webp",
    alt: "Cloud & Sage 100",
    w: 1200,
    h: 1200,
    pos: "right-[4%] top-[9%] w-36 xl:w-48",
    glow: "gold",
    delay: 0.2,
  },
  {
    src: "/images/hero/securite-camera.webp",
    alt: "Sécurité & vidéosurveillance",
    w: 1200,
    h: 1200,
    pos: "left-[6%] bottom-[16%] w-28 xl:w-40",
    glow: "gold",
    delay: 0.4,
  },
  {
    src: "/images/hero/controle-acces.webp",
    alt: "Contrôle d'accès",
    w: 1200,
    h: 800,
    pos: "right-[5%] bottom-[14%] w-36 xl:w-44",
    glow: "cyan",
    delay: 0.6,
  },
  {
    src: "/images/hero/dev-applicatif.webp",
    alt: "Développement applicatif",
    w: 1200,
    h: 800,
    pos: "left-[15%] top-[54%] w-24 xl:w-32",
    glow: "cyan",
    delay: 0.8,
  },
] as const;

const glowShadow = {
  cyan: "0 0 0 1px rgba(0,212,255,0.25), 0 24px 60px -18px rgba(0,212,255,0.45)",
  gold: "0 0 0 1px rgba(212,169,75,0.30), 0 24px 60px -18px rgba(212,169,75,0.45)",
} as const;

export function HeroSection() {
  const t = useTranslations();
  const locale = useLocale();
  const reduce = useReducedMotion();

  const float = (delay: number) =>
    reduce
      ? undefined
      : {
          animate: { y: [0, -15, 0] },
          transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay,
          },
        };

  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        background: `
          radial-gradient(ellipse 50% 42% at 18% 18%, rgba(0,212,255,0.16), transparent 60%),
          radial-gradient(ellipse 46% 42% at 84% 24%, rgba(212,169,75,0.20), transparent 60%),
          radial-gradient(ellipse 70% 55% at 50% 108%, rgba(26,80,100,0.55), transparent 72%),
          linear-gradient(160deg, #0a1628 0%, #0b1c2e 45%, #0d2536 75%, #0e2b3a 100%)
        `,
      }}
    >
      {/* Grid pattern subtil, estompé sur les bords */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 72% 62% at 50% 40%, black 42%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 72% 62% at 50% 40%, black 42%, transparent 100%)",
        }}
      />

      {/* Ligne néon cyan en haut */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/60 to-transparent" />

      {/* ── Images flottantes (desktop uniquement) ── */}
      <div className="absolute inset-0 hidden lg:block" aria-hidden="true">
        {HERO_IMAGES.map((img) => (
          <div key={img.src} className={`absolute ${img.pos}`}>
            <motion.div
              {...float(img.delay)}
              className="relative overflow-hidden rounded-[24px]"
              style={{ boxShadow: glowShadow[img.glow] }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                priority
                sizes="(min-width: 1280px) 12rem, 9rem"
                className="h-auto w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/10" />
            </motion.div>
          </div>
        ))}
      </div>

      <Container className="relative py-24 sm:py-28 lg:py-36">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/10 px-3 py-1.5 text-xs font-semibold text-[#8eeeff] backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#00d4ff] shadow-[0_0_6px_#00d4ff]" />
            {t("home.hero_badge")}
          </div>

          {/* Titre */}
          <h1
            className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
            style={{ textShadow: "0 2px 40px rgba(0,212,255,0.25)" }}
          >
            {t("home.hero_title")}
          </h1>

          {/* Sous-titre */}
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg lg:text-xl">
            {t("home.hero_subtitle")}
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/devis`}
              className="inline-flex items-center gap-2 rounded-xl bg-[#d4a94b] px-7 py-3.5 text-sm font-bold text-[#0a1628] shadow-lg shadow-[#d4a94b]/30 transition-all hover:brightness-110"
            >
              {t("home.hero_cta_primary")}
              <ArrowRight size={16} />
            </Link>
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {t("home.hero_cta_secondary")}
            </Link>
          </div>

          {/* ── Grille d'images (mobile / tablette) ── */}
          <div className="mt-14 grid w-full grid-cols-2 gap-4 lg:hidden">
            {HERO_IMAGES.map((img, i) => (
              <div
                key={img.src}
                className={`relative overflow-hidden rounded-2xl ring-1 ring-white/10 ${
                  i === 4 ? "col-span-2" : ""
                }`}
                style={{ boxShadow: glowShadow[img.glow] }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.w}
                  height={img.h}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className={`w-full object-cover ${
                    i === 4 ? "h-40" : "aspect-square"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Fondu vers le fond sombre des sections suivantes (#0a1628) */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
        aria-hidden="true"
        style={{ background: "linear-gradient(to bottom, transparent, #0a1628)" }}
      />
    </section>
  );
}
