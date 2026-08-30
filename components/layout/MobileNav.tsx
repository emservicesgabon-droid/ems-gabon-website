"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, ChevronRight, Phone, MessageSquare } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLinks = [
    { labelKey: "nav.home", href: `/${locale}` },
    { labelKey: "nav.about", href: `/${locale}/a-propos` },
    { labelKey: "nav.services", href: `/${locale}/services` },
    { labelKey: "nav.solutionsEntreprises", href: `/${locale}/solutions-entreprises` },
    { labelKey: "nav.solutionsParticuliers", href: `/${locale}/solutions-particuliers` },
    { labelKey: "nav.sage100", href: `/${locale}/sage-100` },
    { labelKey: "nav.securite", href: `/${locale}/securite-videosurveillance` },
    { labelKey: "nav.fibre", href: `/${locale}/fibre-optique` },
    { labelKey: "nav.formation", href: `/${locale}/formation` },
    { labelKey: "nav.support", href: `/${locale}/support` },
    { labelKey: "nav.realisations", href: `/${locale}/realisations` },
    { labelKey: "nav.galerie", href: `/${locale}/galerie` },
    { labelKey: "nav.contact", href: `/${locale}/contact` },
  ];

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[300px] max-w-[90vw] bg-[#0b1c2e] border-l border-white/10 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu principal"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="EMS GABON" width={36} height={36} className="rounded-lg object-contain" />
            <span className="font-bold text-white text-base">EMS GABON</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/60 hover:bg-white/10 transition-colors"
            aria-label="Fermer le menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto py-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between px-5 py-3 text-sm font-medium text-white/80 hover:text-[#00d4ff] hover:bg-white/5 transition-colors"
            >
              {t(link.labelKey)}
              <ChevronRight size={14} className="text-white/30" />
            </Link>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="border-t border-white/10 p-5 space-y-3">
          <Link
            href={`/${locale}/devis`}
            className="flex items-center justify-center gap-2 w-full bg-[#d4a94b] text-[#0a1628] text-sm font-bold py-3 rounded-lg hover:brightness-110 transition-all"
          >
            {t("common.cta_quote")}
          </Link>
          <div className="flex gap-3">
            <a
              href="tel:+241011454973"
              className="flex-1 flex items-center justify-center gap-1.5 text-sm text-white/70 border border-white/15 rounded-lg py-2.5 hover:bg-white/10 transition-colors"
            >
              <Phone size={14} />
              {t("common.call")}
            </a>
            <a
              href="https://wa.me/241011454973"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 text-sm text-green-400 border border-white/15 rounded-lg py-2.5 hover:bg-green-500/10 transition-colors"
            >
              <MessageSquare size={14} />
              WhatsApp
            </a>
          </div>
          <div className="pt-1 flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  );
}
