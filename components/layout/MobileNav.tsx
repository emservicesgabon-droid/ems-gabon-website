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
        className={`fixed top-0 right-0 z-50 h-full w-[300px] max-w-[90vw] bg-white shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
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
            <span className="font-bold text-primary-800 text-base">EMS GABON</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-grey-500 hover:bg-grey-100 transition-colors"
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
              className="flex items-center justify-between px-5 py-3 text-sm font-medium text-grey-700 hover:text-primary-700 hover:bg-primary-50 transition-colors"
            >
              {t(link.labelKey)}
              <ChevronRight size={14} className="text-grey-400" />
            </Link>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="border-t border-border p-5 space-y-3">
          <Link
            href={`/${locale}/devis`}
            className="flex items-center justify-center gap-2 w-full bg-primary-700 text-white text-sm font-semibold py-3 rounded-lg hover:bg-primary-800 transition-colors"
          >
            {t("common.cta_quote")}
          </Link>
          <div className="flex gap-3">
            <a
              href="tel:+241011454973"
              className="flex-1 flex items-center justify-center gap-1.5 text-sm text-grey-600 border border-border rounded-lg py-2.5 hover:bg-grey-50 transition-colors"
            >
              <Phone size={14} />
              {t("common.call")}
            </a>
            <a
              href="https://wa.me/241011454973"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 text-sm text-accent-green border border-border rounded-lg py-2.5 hover:bg-accent-green-light transition-colors"
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
