"use client";

import { useActionState, useState } from "react";
import { useTranslations } from "next-intl";
import { Send, CheckCircle } from "lucide-react";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { submitDevisForm, type FormState } from "./actions";

const initialState: FormState = { success: false, message: "" };

export function DevisForm() {
  const t = useTranslations();
  const [state, formAction, isPending] = useActionState(submitDevisForm, initialState);

  const serviceOptions = [
    { value: "maintenance", label: t("contact.service_options.maintenance") },
    { value: "sage", label: t("contact.service_options.sage") },
    { value: "security", label: t("contact.service_options.security") },
    { value: "fiber", label: t("contact.service_options.fiber") },
    { value: "training", label: t("contact.service_options.training") },
    { value: "webdev", label: t("contact.service_options.webdev") },
    { value: "server", label: t("contact.service_options.server") },
    { value: "support", label: t("contact.service_options.support") },
    { value: "other", label: t("contact.service_options.other") },
  ];

  const urgencyOptions = [
    { value: "normal", label: t("devis.urgency_normal") },
    { value: "fast", label: t("devis.urgency_fast") },
    { value: "urgent", label: t("devis.urgency_urgent") },
  ];

  if (state.success) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-accent-green-light flex items-center justify-center">
          <CheckCircle size={32} className="text-accent-green" />
        </div>
        <h3 className="text-xl font-bold text-text-heading">Demande envoyée !</h3>
        <p className="text-text-muted max-w-sm">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <h2 className="text-xl font-bold text-text-heading mb-6">{t("devis.title")}</h2>

      {/* Step 1: Service */}
      <div className="p-5 bg-grey-50 rounded-xl border border-border">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">
          1. {t("devis.step1_title")}
        </h3>
        <Select
          id="service"
          name="service"
          label={t("devis.service")}
          placeholder={t("contact.service_placeholder")}
          options={serviceOptions}
          required
          error={state.errors?.service}
        />
      </div>

      {/* Step 2: Details */}
      <div className="p-5 bg-grey-50 rounded-xl border border-border space-y-4">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide">
          2. {t("devis.step2_title")}
        </h3>
        <Textarea
          id="details"
          name="details"
          label={t("devis.details")}
          placeholder={t("devis.details_placeholder")}
          rows={5}
          required
          error={state.errors?.details}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="budget"
            name="budget"
            label={t("devis.budget")}
            placeholder="ex: 500 000 FCFA"
          />
          <Select
            id="urgency"
            name="urgency"
            label={t("devis.urgency")}
            options={urgencyOptions}
            required
            error={state.errors?.urgency}
          />
        </div>
      </div>

      {/* Step 3: Contact */}
      <div className="p-5 bg-grey-50 rounded-xl border border-border space-y-4">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide">
          3. {t("devis.step3_title")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input id="name" name="name" label={t("devis.name")} required error={state.errors?.name} autoComplete="name" />
          <Input id="company" name="company" label={t("devis.company")} autoComplete="organization" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input id="email" name="email" type="email" label={t("devis.email")} required error={state.errors?.email} autoComplete="email" />
          <Input id="phone" name="phone" type="tel" label={t("devis.phone")} required error={state.errors?.phone} autoComplete="tel" />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 bg-primary-700 text-white font-semibold text-sm py-3.5 rounded-xl hover:bg-primary-800 disabled:opacity-50 transition-colors"
      >
        {isPending ? (
          <>
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {t("common.sending")}
          </>
        ) : (
          <>
            <Send size={16} />
            {t("devis.submit")}
          </>
        )}
      </button>
    </form>
  );
}
