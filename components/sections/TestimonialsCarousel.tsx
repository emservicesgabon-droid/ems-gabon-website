"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

export function TestimonialsCarousel({ dark = true }: { dark?: boolean }) {
  const t = useTranslations();
  const locale = useLocale();
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const item = testimonials[current];

  return (
    <section className={`py-16 sm:py-20 ${dark ? "bg-[#0b1c2e]" : "bg-grey-50"}`}>
      <Container size="lg">
        <SectionHeading
          title={t("home.testimonials_title")}
          subtitle={t("home.testimonials_subtitle")}
          className="mb-12"
          light={dark}
        />

        <div className="relative max-w-3xl mx-auto">
          <div
            className={`rounded-2xl p-8 sm:p-10 ${
              dark
                ? "bg-white/[0.04] border border-white/10"
                : "bg-white border border-border shadow-[var(--shadow-card)]"
            }`}
          >
            {/* Quote icon */}
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 ${
                dark ? "bg-[#00d4ff]/10 border border-[#00d4ff]/20" : "bg-primary-100"
              }`}
            >
              <Quote size={18} className={dark ? "text-[#00d4ff]" : "text-primary-700"} />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star key={i} size={15} className="fill-accent-yellow text-accent-yellow" />
              ))}
            </div>

            {/* Text */}
            <blockquote
              className={`text-base sm:text-lg leading-relaxed mb-6 italic ${
                dark ? "text-white/80" : "text-text-body"
              }`}
            >
              &ldquo;{locale === "en" ? item.textEn : item.text}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                  dark ? "bg-white/10 text-white" : "bg-primary-200 text-primary-700"
                }`}
              >
                {item.name.charAt(0)}
              </div>
              <div>
                <div className={`font-semibold text-sm ${dark ? "text-white" : "text-text-heading"}`}>
                  {item.name}
                </div>
                <div className={`text-xs ${dark ? "text-white/50" : "text-text-muted"}`}>
                  {item.role} · {item.company}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className={`p-2 rounded-full border transition-colors ${
                dark
                  ? "border-white/15 bg-white/5 text-white/60 hover:text-[#00d4ff] hover:bg-white/10"
                  : "border-border bg-white hover:bg-grey-50 text-grey-600 hover:text-primary-700"
              }`}
              aria-label="Témoignage précédent"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2" role="tablist" aria-label="Témoignages">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-200 ${
                    i === current
                      ? `w-6 h-2.5 ${dark ? "bg-[#00d4ff]" : "bg-primary-700"}`
                      : `w-2.5 h-2.5 ${dark ? "bg-white/20 hover:bg-white/40" : "bg-grey-300 hover:bg-grey-400"}`
                  }`}
                  aria-label={`Témoignage ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className={`p-2 rounded-full border transition-colors ${
                dark
                  ? "border-white/15 bg-white/5 text-white/60 hover:text-[#00d4ff] hover:bg-white/10"
                  : "border-border bg-white hover:bg-grey-50 text-grey-600 hover:text-primary-700"
              }`}
              aria-label="Témoignage suivant"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
