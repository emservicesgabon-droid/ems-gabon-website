"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Menu, Phone, ChevronDown } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";

export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const serviceLinks = [
    { labelKey: "nav.services", href: `/${locale}/services` },
    { labelKey: "nav.solutionsEntreprises", href: `/${locale}/solutions-entreprises` },
    { labelKey: "nav.solutionsParticuliers", href: `/${locale}/solutions-particuliers` },
    { labelKey: "nav.sage100", href: `/${locale}/sage-100` },
    { labelKey: "nav.securite", href: `/${locale}/securite-videosurveillance` },
    { labelKey: "nav.fibre", href: `/${locale}/fibre-optique` },
    { labelKey: "nav.formation", href: `/${locale}/formation` },
    { labelKey: "nav.support", href: `/${locale}/support` },
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== `/${locale}` && pathname.startsWith(href));

  return (
    <>
      <header
        className={`sticky top-0 z-30 transition-all duration-200 ${
          scrolled ? "header-neon-orange-scrolled" : "header-neon-orange"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 flex-shrink-0"
              aria-label="EMS GABON — Accueil"
            >
              <Image
                src="/logo.png"
                alt="EMS GABON"
                width={44}
                height={44}
                className="rounded-lg object-contain"
                priority
              />
              <div className="hidden sm:block">
                <div className="font-bold text-white text-base leading-none" style={{ textShadow: "0 0 10px rgba(245,166,35,0.6)" }}>EMS GABON</div>
                <div className="text-xs leading-none mt-0.5" style={{ color: "rgba(245,166,35,0.80)" }}>Solutions Informatiques</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
              <Link
                href={`/${locale}`}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(`/${locale}`)
                    ? "text-[#f5a623] bg-[#f5a623]/10"
                    : "text-white/80 hover:text-[#f5a623] hover:bg-[#f5a623]/10"
                }`}
              >
                {t("nav.home")}
              </Link>

              <Link
                href={`/${locale}/a-propos`}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(`/${locale}/a-propos`)
                    ? "text-[#f5a623] bg-[#f5a623]/10"
                    : "text-white/80 hover:text-[#f5a623] hover:bg-[#f5a623]/10"
                }`}
              >
                {t("nav.about")}
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    pathname.includes("/services") ||
                    pathname.includes("/solutions") ||
                    pathname.includes("/sage") ||
                    pathname.includes("/securite") ||
                    pathname.includes("/fibre") ||
                    pathname.includes("/formation") ||
                    pathname.includes("/support")
                      ? "text-[#f5a623] bg-[#f5a623]/10"
                      : "text-white/80 hover:text-[#f5a623] hover:bg-[#f5a623]/10"
                  }`}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                >
                  {t("nav.services")}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {servicesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 rounded-xl shadow-xl p-2 z-50"
                    style={{ background: "#0d2d3a", border: "1px solid rgba(245,166,35,0.30)" }}>
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                          isActive(link.href)
                            ? "text-[#f5a623] bg-[#f5a623]/10 font-medium"
                            : "text-white/75 hover:text-[#f5a623] hover:bg-[#f5a623]/10"
                        }`}
                      >
                        {t(link.labelKey)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href={`/${locale}/realisations`}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(`/${locale}/realisations`)
                    ? "text-[#f5a623] bg-[#f5a623]/10"
                    : "text-white/80 hover:text-[#f5a623] hover:bg-[#f5a623]/10"
                }`}
              >
                {t("nav.realisations")}
              </Link>

              <Link
                href={`/${locale}/contact`}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(`/${locale}/contact`)
                    ? "text-[#f5a623] bg-[#f5a623]/10"
                    : "text-white/80 hover:text-[#f5a623] hover:bg-[#f5a623]/10"
                }`}
              >
                {t("nav.contact")}
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href="tel:+241011454973"
                className="hidden md:flex items-center gap-1.5 text-sm text-white/60 hover:text-[#f5a623] transition-colors px-2 py-1.5"
                aria-label="Appeler EMS GABON"
              >
                <Phone size={14} />
                <span className="hidden xl:inline">+241 011 45 49 73</span>
              </a>

              <div className="hidden lg:block">
                <LanguageSwitcher />
              </div>

              <Link
                href={`/${locale}/devis`}
                className="hidden sm:inline-flex items-center gap-2 text-primary-900 text-sm font-bold px-4 py-2 rounded-lg hover:brightness-110 transition-all"
                style={{ background: "#f5a623", boxShadow: "0 0 12px rgba(245,166,35,0.45)" }}
              >
                {t("common.cta_quote")}
              </Link>

              {/* Mobile burger */}
              <button
                className="lg:hidden p-2 rounded-lg text-white/70 hover:text-[#f5a623] hover:bg-[#f5a623]/10 transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Ouvrir le menu"
                aria-expanded={mobileOpen}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={closeMobile} />
    </>
  );
}
