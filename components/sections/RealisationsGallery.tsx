"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle, Maximize2, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { projects, type Project } from "@/data/projects";

const categoryColors: Record<
  Project["category"],
  "primary" | "success" | "neon" | "yellow" | "grey"
> = {
  enterprise: "primary",
  public: "success",
  security: "neon",
  network: "yellow",
  training: "grey",
};

export function RealisationsGallery() {
  const t = useTranslations();
  const locale = useLocale();
  const [selected, setSelected] = useState<Project | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const openModal = (p: Project) => {
    triggerRef.current = (document.activeElement as HTMLElement) ?? null;
    setSelected(p);
  };
  const closeModal = () => {
    setSelected(null);
    triggerRef.current?.focus?.();
  };

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const title = (p: Project) => (locale === "en" ? p.titleEn : p.title);
  const problem = (p: Project) => (locale === "en" ? p.problemEn : p.problem);
  const solution = (p: Project) => (locale === "en" ? p.solutionEn : p.solution);
  const result = (p: Project) => (locale === "en" ? p.resultEn : p.result);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.id}
            className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] transition-colors hover:border-white/20"
          >
            {/* Image interactive — clic pour agrandir */}
            <button
              type="button"
              onClick={() => openModal(project)}
              aria-haspopup="dialog"
              aria-label={`${title(project)} — agrandir`}
              className="group relative block h-44 w-full overflow-hidden focus:outline-none"
            >
              <Image
                src={project.image ?? "/images/banners/banner-premium-dark.webp"}
                alt={title(project)}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-focus-visible:scale-105"
              />
              <span
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(10,22,40,0.55), transparent 55%)" }}
              />
              <span className="pointer-events-none absolute inset-0 rounded-none ring-inset ring-[#00d4ff]/0 transition-all duration-300 group-hover:ring-2 group-hover:ring-[#00d4ff]/50 group-focus-visible:ring-2 group-focus-visible:ring-[#00d4ff]/50" />
              <span className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#0a1628]/70 text-white/90 opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                <Maximize2 size={14} />
              </span>
            </button>

            {/* Détails */}
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant={categoryColors[project.category]}>
                    {tag}
                  </Badge>
                ))}
              </div>

              <h3 className="font-bold leading-snug text-text-heading">{title(project)}</h3>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                  {t("realisations.problem")}
                </span>
                <p className="mt-0.5 text-sm text-text-body">{problem(project)}</p>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                  {t("realisations.solution")}
                </span>
                <p className="mt-0.5 text-sm text-text-body">{solution(project)}</p>
              </div>

              <div className="mt-auto flex items-start gap-2 rounded-lg border border-accent-green/20 bg-accent-green/10 p-3">
                <CheckCircle size={14} className="mt-0.5 flex-shrink-0 text-accent-green" />
                <div>
                  <span className="mb-0.5 block text-xs font-semibold uppercase tracking-wide text-green-300">
                    {t("realisations.result")}
                  </span>
                  <p className="text-xs text-white/70">{result(project)}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modale agrandie */}
      {selected && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={closeModal}
            data-lenis-prevent
          >
            <div className="absolute inset-0 bg-[#050f1c]/80 backdrop-blur-md" aria-hidden="true" />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={title(selected)}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, y: 14 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto overflow-x-hidden rounded-3xl border border-white/10 bg-[#0b1c2e] shadow-2xl"
              data-lenis-prevent
            >
              <button
                ref={closeRef}
                type="button"
                onClick={closeModal}
                aria-label="Fermer"
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white/80 backdrop-blur transition-colors hover:bg-black/60 hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="relative aspect-video w-full">
                <Image
                  src={selected.image ?? "/images/banners/banner-premium-dark.webp"}
                  alt={title(selected)}
                  fill
                  sizes="(min-width: 768px) 42rem, 100vw"
                  className="object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(11,28,46,0.95), transparent 55%)" }}
                />
              </div>

              <div className="flex flex-col gap-4 p-6">
                <div className="flex flex-wrap gap-1.5">
                  {selected.tags.map((tag) => (
                    <Badge key={tag} variant={categoryColors[selected.category]}>
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white">{title(selected)}</h3>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#00d4ff]">
                    {t("realisations.problem")}
                  </span>
                  <p className="mt-1 text-sm leading-relaxed text-white/70">{problem(selected)}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#00d4ff]">
                    {t("realisations.solution")}
                  </span>
                  <p className="mt-1 text-sm leading-relaxed text-white/70">{solution(selected)}</p>
                </div>
                <div className="flex items-start gap-2 rounded-lg border border-accent-green/20 bg-accent-green/10 p-3">
                  <CheckCircle size={15} className="mt-0.5 flex-shrink-0 text-accent-green" />
                  <div>
                    <span className="mb-0.5 block text-xs font-semibold uppercase tracking-wide text-green-300">
                      {t("realisations.result")}
                    </span>
                    <p className="text-sm text-white/80">{result(selected)}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
      )}
    </>
  );
}
