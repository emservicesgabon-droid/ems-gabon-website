"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import galerieData from "@/data/galerie.json";

type GalerieItem = {
  id: number;
  type: "image" | "video";
  src: string;
  categorie: string;
  titre: string;
  date: string;
  poster?: string;
  w?: number;
  h?: number;
};

const ITEMS = galerieData as unknown as GalerieItem[];

const CATEGORIES = [
  "Fibre Optique",
  "Vidéosurveillance",
  "Contrôle d'Accès",
  "Réseau & Serveurs",
];

function aspectOf(item: GalerieItem) {
  if (item.w && item.h) return `${item.w} / ${item.h}`;
  return item.type === "video" ? "16 / 9" : "4 / 3";
}

/* ---------- Carte média ---------- */
function GalerieCard({
  item,
  index,
  onOpen,
  reduce,
}: {
  item: GalerieItem;
  index: number;
  onOpen: () => void;
  reduce: boolean | null;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    const v = videoRef.current;
    if (v) v.play().catch(() => {});
  };
  const handleLeave = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <motion.div
      className="mb-4 break-inside-avoid"
      initial={reduce ? undefined : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay: Math.min(index, 8) * 0.04 }}
    >
      <button
        type="button"
        onClick={onOpen}
        onMouseEnter={item.type === "video" ? handleEnter : undefined}
        onMouseLeave={item.type === "video" ? handleLeave : undefined}
        aria-haspopup="dialog"
        aria-label={`${item.titre} — ${item.type === "video" ? "voir la vidéo" : "agrandir"}`}
        className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-[#00d4ff]/40 focus:outline-none focus-visible:border-[#00d4ff]/60"
      >
        <div className="relative w-full" style={{ aspectRatio: aspectOf(item) }}>
          <Image
            src={item.type === "video" ? item.poster ?? item.src : item.src}
            alt={item.titre}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {item.type === "video" && (
            <>
              {/* Preview vidéo au survol (desktop) */}
              <video
                ref={videoRef}
                src={item.src}
                poster={item.poster}
                muted
                loop
                playsInline
                preload="none"
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              {/* Bouton Play */}
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition-transform duration-300 group-hover:scale-110">
                  <Play size={24} className="ml-0.5 text-[#0a1628]" fill="currentColor" />
                </span>
              </span>
            </>
          )}
        </div>

        {/* Légende */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/60 to-transparent px-4 pb-3 pt-10 text-left">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-[#00d4ff]">
            {item.categorie}
          </span>
          <p className="text-sm font-semibold leading-snug text-white">{item.titre}</p>
        </div>
      </button>
    </motion.div>
  );
}

/* ---------- Lightbox ---------- */
function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalerieItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const t = useTranslations();
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
      data-lenis-prevent
    >
      <div className="absolute inset-0 bg-[#050f1c]/95 backdrop-blur-md" aria-hidden="true" />

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={t("common.close")}
        className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/90 backdrop-blur transition-colors hover:bg-white/20"
      >
        <X size={20} />
      </button>

      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label={t("common.previous")}
            className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/90 backdrop-blur transition-colors hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label={t("common.next")}
            className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/90 backdrop-blur transition-colors hover:bg-white/20 sm:right-6"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      <motion.div
        key={item.id}
        role="dialog"
        aria-modal="true"
        aria-label={item.titre}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center"
      >
        {item.type === "video" ? (
          <video
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            playsInline
            className="max-h-[74vh] w-auto max-w-full rounded-xl border border-white/10"
          />
        ) : (
          <div className="relative h-[74vh] w-full">
            <Image
              src={item.src}
              alt={item.titre}
              fill
              sizes="90vw"
              className="rounded-xl object-contain"
            />
          </div>
        )}

        <div className="mt-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#00d4ff]">
            {item.categorie}
          </span>
          <p className="text-base font-semibold text-white">{item.titre}</p>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- Grille ---------- */
export function GalerieGrid() {
  const t = useTranslations();
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const filters = [
    { id: "all", label: t("galerie.filter_all") },
    ...CATEGORIES.map((c) => ({ id: c, label: c })),
    { id: "videos", label: t("galerie.filter_videos") },
  ];

  const filtered = useMemo(() => {
    if (active === "all") return ITEMS;
    if (active === "videos") return ITEMS.filter((i) => i.type === "video");
    return ITEMS.filter((i) => i.categorie === active);
  }, [active]);

  const open = (i: number) => {
    triggerRef.current = (document.activeElement as HTMLElement) ?? null;
    setLightbox(i);
  };
  const close = () => {
    setLightbox(null);
    triggerRef.current?.focus?.();
  };
  const prev = () =>
    setLightbox((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length));
  const next = () =>
    setLightbox((i) => (i === null ? i : (i + 1) % filtered.length));

  return (
    <>
      {/* Filtres sticky */}
      <div className="sticky top-16 z-20 -mx-4 mb-8 border-b border-white/5 bg-[#0a1628]/85 px-4 py-3 backdrop-blur-md">
        <div className="flex flex-wrap justify-center gap-2">
          {filters.map((f) => {
            const isActive = active === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(f.id)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-[#d4a94b]/60 bg-[#d4a94b]/15 text-[#e6c988]"
                    : "border-white/10 text-white/70 hover:border-[#00d4ff]/40 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-white/50">{t("galerie.empty")}</p>
      ) : (
        <div className="columns-1 gap-4 [column-gap:1rem] sm:columns-2 lg:columns-3">
          {filtered.map((item, i) => (
            <GalerieCard key={item.id} item={item} index={i} reduce={reduce} onOpen={() => open(i)} />
          ))}
        </div>
      )}

      {lightbox !== null && (
        <Lightbox items={filtered} index={lightbox} onClose={close} onPrev={prev} onNext={next} />
      )}
    </>
  );
}
