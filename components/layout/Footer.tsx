import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { footerServiceLinks, footerCompanyLinks } from "@/data/navigation";

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <footer className="text-white/80" style={{ background: "linear-gradient(160deg, #071820 0%, #0d2d3a 50%, #071820 100%)", borderTop: "1px solid rgba(245,166,35,0.25)" }}>
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2.5 mb-4">
              <Image
                src="/logo.png"
                alt="EMS GABON"
                width={48}
                height={48}
                className="rounded-lg object-contain"
              />
              <div>
                <div className="font-bold text-white text-base leading-none" style={{ textShadow: "0 0 10px rgba(245,166,35,0.5)" }}>EMS GABON</div>
                <div className="text-xs leading-none mt-0.5" style={{ color: "rgba(245,166,35,0.75)" }}>Solutions Informatiques</div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-white/70 mb-5">
              {t("footer.description")}
            </p>
            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://wa.me/241011454973"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="footer-social-icon"
              >
                <MessageSquare size={16} />
              </a>
              <a
                href="mailto:ems@emsgabon.com"
                aria-label="Email"
                className="footer-social-icon"
              >
                <Mail size={16} />
              </a>
              <a
                href="tel:+241011454973"
                aria-label="Téléphone"
                className="footer-social-icon"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-semibold text-sm mb-4" style={{ color: "#f5a623" }}>{t("footer.services_title")}</h3>
            <ul className="space-y-2.5">
              {footerServiceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-white/65 hover:text-[#f5a623] transition-colors"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-sm mb-4" style={{ color: "#f5a623" }}>{t("footer.company_title")}</h3>
            <ul className="space-y-2.5 mb-6">
              {footerCompanyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-white/65 hover:text-[#f5a623] transition-colors"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2.5">
              <li>
                <Link href={`/${locale}/devis`} className="text-sm font-bold hover:brightness-110 transition-all" style={{ color: "#f5a623" }}>
                  {t("common.cta_quote")} →
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/rendez-vous`} className="text-sm text-white/65 hover:text-[#f5a623] transition-colors">
                  {t("common.cta_rdv")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-semibold text-sm mb-4" style={{ color: "#f5a623" }}>{t("footer.contact_title")}</h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 flex-shrink-0" style={{ color: "#f5a623" }} />
                <span className="text-sm text-white/65">{t("contact.address_value")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="flex-shrink-0" style={{ color: "#f5a623" }} />
                <a href="tel:+241011454973" className="text-sm text-white/65 hover:text-[#f5a623] transition-colors">
                  {t("contact.phone_value")}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="flex-shrink-0" style={{ color: "#f5a623" }} />
                <a href="mailto:ems@emsgabon.com" className="text-sm text-white/65 hover:text-[#f5a623] transition-colors break-all">
                  {t("contact.email_value")}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={15} className="mt-0.5 flex-shrink-0" style={{ color: "#f5a623" }} />
                <span className="text-sm text-white/65">{t("contact.hours_value")}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(245,166,35,0.18)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs" style={{ color: "rgba(255,255,255,0.40)" }}>
            <span>
              © {new Date().getFullYear()} EMS GABON. {t("footer.rights")}
            </span>
            <div className="flex items-center gap-4">
              <Link href={`/${locale}/mentions-legales`} className="hover:text-[#f5a623] transition-colors">
                {t("common.legalMentions")}
              </Link>
              <Link href={`/${locale}/confidentialite`} className="hover:text-[#f5a623] transition-colors">
                {t("common.privacy")}
              </Link>
              <span style={{ color: "rgba(245,166,35,0.30)" }}>·</span>
              <span>{t("footer.made_in")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
