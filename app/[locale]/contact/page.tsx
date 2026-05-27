import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { ContactForm } from "./ContactForm";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("subtitle") };
}

function ContactContent() {
  const t = useTranslations();

  const channels = [
    {
      icon: Phone,
      label: t("common.call"),
      value: t("contact.phone_value"),
      href: "tel:+241011454973",
      color: "text-primary-700",
      bg: "bg-primary-100",
    },
    {
      icon: MessageSquare,
      label: "WhatsApp",
      value: t("contact.phone_value"),
      href: "https://wa.me/241011454973",
      color: "text-accent-green",
      bg: "bg-accent-green-light",
      external: true,
    },
    {
      icon: Mail,
      label: t("common.email"),
      value: t("contact.email_value"),
      href: `mailto:${t("contact.email_value")}`,
      color: "text-primary-700",
      bg: "bg-primary-100",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero-logo-bg relative overflow-hidden text-white py-16 sm:py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div
            className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(26,80,100,0.70) 0%, rgba(13,45,58,0.40) 50%, transparent 70%)" }}
          />
          <div className="orange-glow-blob-strong absolute -top-16 right-0 w-[420px] h-[420px] rounded-full" />
          <div
            className="absolute -bottom-24 right-1/3 w-[380px] h-[380px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(56,216,255,0.22) 0%, rgba(56,216,255,0.07) 50%, transparent 70%)" }}
          />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#38d8ff] to-transparent opacity-60" />
        </div>

        <Container className="relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-[#38d8ff]/30 bg-[#38d8ff]/8 text-[#8eeeff] text-xs font-semibold px-3 py-1.5 rounded-full mb-5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#38d8ff] animate-pulse shadow-[0_0_6px_#38d8ff]" />
              EMS GABON
            </div>
            <h1 className="text-neon-blue text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              {t("contact.title")}
            </h1>
            <p className="text-neon-blue-sub text-base sm:text-lg leading-relaxed">
              {t("contact.subtitle")}
            </p>
          </div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none" aria-hidden="true">
          <svg viewBox="0 0 1200 50" preserveAspectRatio="none" className="w-full h-8 fill-[#f8fafc]">
            <path d="M0,50 C300,0 900,50 1200,0 L1200,50 Z" />
          </svg>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-16 sm:py-20 bg-grey-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-6 sm:p-8">
              <h2 className="text-xl font-bold text-text-heading mb-6">{t("contact.form_title")}</h2>
              <ContactForm />
            </div>

            {/* Info sidebar */}
            <div className="flex flex-col gap-5">
              {/* Quick contact */}
              <div className="bg-white rounded-xl border border-border p-5">
                <h3 className="font-semibold text-text-heading mb-4">{t("contact.channels_title")}</h3>
                <div className="space-y-3">
                  {channels.map(({ icon: Icon, label, value, href, color, bg, external }) => (
                    <a
                      key={label}
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-grey-50 transition-colors group"
                    >
                      <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon size={16} className={color} />
                      </div>
                      <div>
                        <div className="text-xs text-text-muted">{label}</div>
                        <div className="text-sm font-medium text-text-heading group-hover:text-primary-700 transition-colors">
                          {value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="bg-white rounded-xl border border-border p-5">
                <h3 className="font-semibold text-text-heading mb-4">{t("contact.info_title")}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <MapPin size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-text-body">{t("contact.address_value")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-text-body">{t("contact.hours_value")}</span>
                  </li>
                </ul>
              </div>

              {/* Map placeholder */}
              <div className="bg-primary-100 rounded-xl border border-primary-200 h-48 flex flex-col items-center justify-center gap-2">
                <MapPin size={28} className="text-primary-600" />
                <p className="text-sm font-medium text-primary-700">{t("contact.map_title")}</p>
                <p className="text-xs text-primary-600">Libreville, Gabon</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactContent />;
}
