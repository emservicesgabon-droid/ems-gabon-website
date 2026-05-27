"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

export function TestimonialsCarousel() {
  const t = useTranslations();
  const locale = useLocale();
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const item = testimonials[current];

  return (
    <section className="py-16 sm:py-20 bg-grey-50">
      <Container size="lg">
        <SectionHeading
          title={t("home.testimonials_title")}
          subtitle={t("home.testimonials_subtitle")}
          className="mb-12"
        />

        <div className="relative max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-border p-8 sm:p-10 shadow-[var(--shadow-card)]">
            {/* Quote icon */}
            <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center mb-6">
              <Quote size={18} className="text-primary-700" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star key={i} size={15} className="fill-accent-yellow text-accent-yellow" />
              ))}
            </div>

            {/* Text */}
            <blockquote className="text-base sm:text-lg text-text-body leading-relaxed mb-6 italic">
              &ldquo;{locale === "en" ? item.textEn : item.text}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-bold text-sm flex-shrink-0">
                {item.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-text-heading text-sm">{item.name}</div>
                <div className="text-xs text-text-muted">
                  {item.role} · {item.company}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-border bg-white hover:bg-grey-50 text-grey-600 hover:text-primary-700 transition-colors"
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
                      ? "w-6 h-2.5 bg-primary-700"
                      : "w-2.5 h-2.5 bg-grey-300 hover:bg-grey-400"
                  }`}
                  aria-label={`Témoignage ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full border border-border bg-white hover:bg-grey-50 text-grey-600 hover:text-primary-700 transition-colors"
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
