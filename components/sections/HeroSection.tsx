"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationControls,
} from "framer-motion";
import { ArrowRight, X, Maximize2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

type Glow = "cyan" | "gold";

type HeroImage = {
  id: string;
  src: string;
  w: number;
  h: number;
  titleKey: string;
  descKey: string;
  slug: string;
  glow: Glow;
  cx: number; // centre horizontal dans la bulle (%)
  cy: number; // centre vertical dans la bulle (%)
  size: string; // classes de largeur
  drift: { x: number[]; y: number[]; rotate: number[]; duration: number };
};

// Les 5 piliers métier — objets qui dérivent dans la bulle de verre.
const HERO_IMAGES: HeroImage[] = [
  {
    id: "hero-fibre",
    src: "/images/hero/fibre-optique.webp",
    w: 1200,
    h: 1200,
    titleKey: "services.fiber_title",
    descKey: "services.fiber_desc",
    slug: "fibre-optique",
    glow: "cyan",
    cx: 21,
    cy: 17,
    size: "w-24 xl:w-28",
    drift: { x: [0, 10, -8, 0], y: [0, -14, 8, 0], rotate: [0, 3, -2, 0], duration: 11 },
  },
  {
    id: "hero-cloud",
    src: "/images/hero/serveur-cloud.webp",
    w: 1200,
    h: 1200,
    titleKey: "services.sage_title",
    descKey: "services.sage_desc",
    slug: "sage-100",
    glow: "gold",
    cx: 80,
    cy: 15,
    size: "w-24 xl:w-32",
    drift: { x: [0, -12, 6, 0], y: [0, 10, -12, 0], rotate: [0, -3, 2, 0], duration: 13 },
  },
  {
    id: "hero-secu",
    src: "/images/hero/securite-camera.webp",
    w: 1200,
    h: 1200,
    titleKey: "services.security_title",
    descKey: "services.security_desc",
    slug: "securite-videosurveillance",
    glow: "cyan",
    cx: 84,
    cy: 73,
    size: "w-24 xl:w-28",
    drift: { x: [0, -9, 10, 0], y: [0, -10, 12, 0], rotate: [0, 2, -3, 0], duration: 12 },
  },
  {
    id: "hero-access",
    src: "/images/hero/controle-acces.webp",
    w: 1200,
    h: 800,
    titleKey: "services.access_title",
    descKey: "services.access_desc",
    slug: "securite-videosurveillance",
    glow: "gold",
    cx: 31,
    cy: 85,
    size: "w-24 xl:w-28",
    drift: { x: [0, 12, -10, 0], y: [0, 12, -8, 0], rotate: [0, -2, 3, 0], duration: 10 },
  },
  {
    id: "hero-dev",
    src: "/images/hero/dev-applicatif.webp",
    w: 1200,
    h: 800,
    titleKey: "services.webdev_title",
    descKey: "services.webdev_desc",
    slug: "services#webdev",
    glow: "cyan",
    cx: 10,
    cy: 65,
    size: "w-20 xl:w-24",
    drift: { x: [0, 8, -12, 0], y: [0, -12, 10, 0], rotate: [0, 3, -2, 0], duration: 14 },
  },
];

const glowBase: Record<Glow, string> = {
  cyan: "0 0 0 1px rgba(0,212,255,0.22), 0 18px 44px -16px rgba(0,212,255,0.40)",
  gold: "0 0 0 1px rgba(212,169,75,0.26), 0 18px 44px -16px rgba(212,169,75,0.40)",
};

/* ---------- Image flottante (dérive + tilt Apple + clic) ---------- */
function FloatingImage({
  img,
  onOpen,
  reduce,
}: {
  img: HeroImage;
  onOpen: (img: HeroImage) => void;
  reduce: boolean | null;
}) {
  const t = useTranslations();
  const controls = useAnimationControls();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sry = useSpring(ry, { stiffness: 150, damping: 15 });

  const driftLoop = {
    x: img.drift.x,
    y: img.drift.y,
    rotate: img.drift.rotate,
    transition: { duration: img.drift.duration, repeat: Infinity, ease: "easeInOut" as const },
  };

  useEffect(() => {
    if (!reduce) controls.start(driftLoop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  function handleEnter() {
    if (reduce) return;
    // Apple : l'objet survolé se stabilise (dérive en pause) pour un focus net.
    controls.stop();
    controls.start({ x: 0, y: 0, rotate: 0, transition: { duration: 0.5, ease: "easeOut" } });
  }
  function handleLeave() {
    rx.set(0);
    ry.set(0);
    if (!reduce) controls.start(driftLoop);
  }
  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 18);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 18);
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(img)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      aria-haspopup="dialog"
      aria-label={t(img.titleKey)}
      className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 hover:z-30 focus-visible:z-30 focus:outline-none"
      style={{ left: `${img.cx}%`, top: `${img.cy}%` }}
    >
      {/* Couche dérive */}
      <motion.div animate={controls}>
        {/* Couche tilt + survol */}
        <motion.div
          onMouseMove={handleMove}
          whileHover={reduce ? undefined : { scale: 1.14 }}
          style={{ rotateX: srx, rotateY: sry, transformPerspective: 500 }}
          className={`relative overflow-hidden rounded-2xl ring-1 ring-white/10 transition-shadow duration-300 group-hover:ring-[#00d4ff]/60 group-focus-visible:ring-[#00d4ff]/60 ${img.size}`}
        >
          <div style={{ boxShadow: glowBase[img.glow] }} className="relative rounded-2xl">
            <Image
              src={img.src}
              alt={t(img.titleKey)}
              width={img.w}
              height={img.h}
              priority
              sizes="(min-width: 1280px) 8rem, 6rem"
              className="h-auto w-full object-cover transition duration-300 group-hover:brightness-110"
            />
            {/* Indice « agrandir » au survol */}
            <span className="pointer-events-none absolute bottom-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#0a1628]/75 text-white/90 opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              <Maximize2 size={12} />
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Titre de l'image */}
      <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#0a1628]/80 px-2.5 py-1 text-[10px] font-semibold text-white/80 backdrop-blur transition-colors group-hover:border-[#00d4ff]/40 group-hover:text-white">
        {t(img.titleKey)}
      </span>
    </button>
  );
}

/* ---------- Modale agrandie + description ---------- */
function HeroModal({ img, onClose }: { img: HeroImage | null; onClose: () => void }) {
  const t = useTranslations();
  const locale = useLocale();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!img) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [img, onClose]);

  return (
    <AnimatePresence>
      {img && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          data-lenis-prevent
        >
          <div className="absolute inset-0 bg-[#050f1c]/80 backdrop-blur-md" aria-hidden="true" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t(img.titleKey)}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.85, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#0b1c2e] shadow-2xl"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white/80 backdrop-blur transition-colors hover:bg-black/60 hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="relative aspect-[16/10] w-full">
              <Image
                src={img.src}
                alt={t(img.titleKey)}
                fill
                sizes="(min-width: 640px) 28rem, 100vw"
                className="object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(11,28,46,0.95), transparent 55%)" }}
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-white">{t(img.titleKey)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{t(img.descKey)}</p>
              <Link
                href={`/${locale}/${img.slug}`}
                onClick={onClose}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00d4ff] transition-colors hover:text-[#8eeeff]"
              >
                {locale === "en" ? "Learn more" : "En savoir plus"}
                <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Hero ---------- */
export function HeroSection() {
  const t = useTranslations();
  const locale = useLocale();
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<HeroImage | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openModal = (img: HeroImage) => {
    triggerRef.current = (document.activeElement as HTMLElement) ?? null;
    setSelected(img);
  };
  const closeModal = () => {
    setSelected(null);
    // Accessibilité : le focus revient sur l'image d'origine.
    triggerRef.current?.focus?.();
  };

  const bannerMask =
    "radial-gradient(ellipse 72% 74% at 50% 50%, black 52%, transparent 90%)";

  // Parallax souris (desktop) — profondeur Apple: l'avant-plan bouge plus que le fond.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const bgX = useTransform(sx, (v) => v * 16);
  const bgY = useTransform(sy, (v) => v * 16);
  const fgX = useTransform(sx, (v) => v * 36);
  const fgY = useTransform(sy, (v) => v * 36);

  const stageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || reduce) return;
    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

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
      {/* Grid pattern subtil */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 72% 62% at 50% 40%, black 42%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 72% 62% at 50% 40%, black 42%, transparent 100%)",
        }}
      />
      {/* Ligne néon cyan en haut */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/60 to-transparent" />

      <Container className="relative py-20 sm:py-24 lg:py-28">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/10 px-3 py-1.5 text-xs font-semibold text-[#8eeeff] backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#00d4ff] shadow-[0_0_6px_#00d4ff]" />
            {t("home.hero_badge")}
          </div>

          {/* H1 accessible (SEO) — le message de marque est dans la bannière */}
          <h1 className="sr-only">{t("home.hero_title")}</h1>

          {/* ── Stage desktop : bulle de verre + bannière + images flottantes ── */}
          <div
            ref={stageRef}
            className="relative mx-auto hidden aspect-square w-[min(78vw,640px)] lg:block"
          >
            {/* Couche fond (parallax léger) : halo + bulle + reflet + bannière */}
            <motion.div className="absolute inset-0" style={{ x: bgX, y: bgY }}>
            {/* Halo externe */}
            <div
              className="pointer-events-none absolute inset-[-8%] rounded-full"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(0,212,255,0.10), rgba(212,169,75,0.06) 45%, transparent 70%)",
              }}
            />
            {/* Bulle de verre */}
            <div
              className="pointer-events-none absolute inset-0 rounded-full"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.14), rgba(255,255,255,0.03) 42%, rgba(255,255,255,0) 72%)",
                border: "1px solid rgba(255,255,255,0.16)",
                boxShadow:
                  "inset 0 2px 1px rgba(255,255,255,0.20), inset 0 0 80px rgba(255,255,255,0.06), inset 0 12px 60px rgba(0,212,255,0.10), 0 40px 120px -36px rgba(0,212,255,0.30)",
                backdropFilter: "blur(3px)",
                WebkitBackdropFilter: "blur(3px)",
              }}
            />
            {/* Reflet spéculaire */}
            <div
              className="pointer-events-none absolute left-[13%] top-[9%] h-[28%] w-[38%] rounded-full opacity-90"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.45), transparent 62%)",
                filter: "blur(7px)",
              }}
            />

            {/* Bannière centrale fusionnée */}
            <motion.div
              className="absolute left-1/2 top-1/2 w-[64%] max-w-[400px] -translate-x-1/2 -translate-y-1/2"
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/banners/banner-tech-fibre.webp"
                alt={t("home.hero_title")}
                width={1920}
                height={1080}
                priority
                sizes="400px"
                className="h-auto w-full"
                style={{ maskImage: bannerMask, WebkitMaskImage: bannerMask }}
              />
            </motion.div>
            </motion.div>

            {/* Couche avant (parallax marqué) : images flottantes */}
            <motion.div className="absolute inset-0" style={{ x: fgX, y: fgY }}>
              {HERO_IMAGES.map((img) => (
                <FloatingImage key={img.id} img={img} onOpen={openModal} reduce={reduce} />
              ))}
            </motion.div>
          </div>

          {/* ── Bloc mobile / tablette ── */}
          <div className="w-full lg:hidden">
            <div className="mx-auto max-w-md">
              <Image
                src="/images/banners/banner-tech-fibre.webp"
                alt={t("home.hero_title")}
                width={1920}
                height={1080}
                priority
                sizes="(min-width: 640px) 28rem, 100vw"
                className="h-auto w-full"
                style={{ maskImage: bannerMask, WebkitMaskImage: bannerMask }}
              />
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {HERO_IMAGES.map((img, i) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => openModal(img)}
                  aria-haspopup="dialog"
                  aria-label={t(img.titleKey)}
                  className={`group relative overflow-hidden rounded-2xl ring-1 ring-white/10 ${i === 4 ? "col-span-2" : ""}`}
                  style={{ boxShadow: glowBase[img.glow] }}
                >
                  <Image
                    src={img.src}
                    alt={t(img.titleKey)}
                    width={img.w}
                    height={img.h}
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className={`w-full object-cover ${i === 4 ? "h-40" : "aspect-square"}`}
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/70 to-transparent px-3 pb-2.5 pt-8 text-left text-xs font-semibold text-white">
                    {t(img.titleKey)}
                  </span>
                </button>
              ))}
            </div>
          </div>

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
        </div>
      </Container>

      {/* Fondu vers les sections sombres */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
        aria-hidden="true"
        style={{ background: "linear-gradient(to bottom, transparent, #0a1628)" }}
      />

      <HeroModal img={selected} onClose={closeModal} />
    </section>
  );
}
