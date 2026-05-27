"use client";

import { useActionState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { submitContactForm, type FormState } from "./actions";

const initialState: FormState = { success: false, message: "" };

export function ContactForm() {
  const t = useTranslations();
  const locale = useLocale();
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

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

  if (state.success) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-accent-green-light flex items-center justify-center">
          <CheckCircle size={32} className="text-accent-green" />
        </div>
        <h3 className="text-xl font-bold text-text-heading">{t("common.success")}</h3>
        <p className="text-text-muted max-w-sm">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {state.message && !state.success && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-danger">
          <AlertCircle size={16} className="flex-shrink-0" />
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="name"
          name="name"
          label={t("contact.name")}
          placeholder="Jean Dupont"
          required
          error={state.errors?.name}
          autoComplete="name"
        />
        <Input
          id="phone"
          name="phone"
          type="tel"
          label={t("contact.phone")}
          placeholder="+241 07 XX XX XX"
          required
          error={state.errors?.phone}
          autoComplete="tel"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="email"
          name="email"
          type="email"
          label={t("contact.email")}
          placeholder="jean@exemple.com"
          required
          error={state.errors?.email}
          autoComplete="email"
        />
        <Input
          id="company"
          name="company"
          label={t("contact.company")}
          placeholder="Ma Société"
          autoComplete="organization"
        />
      </div>

      <Select
        id="service"
        name="service"
        label={t("contact.service")}
        placeholder={t("contact.service_placeholder")}
        options={serviceOptions}
        required
        error={state.errors?.service}
      />

      <Textarea
        id="message"
        name="message"
        label={t("contact.message")}
        placeholder={t("contact.message_placeholder")}
        rows={5}
        required
        error={state.errors?.message}
      />

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 bg-primary-700 text-white font-semibold text-sm py-3 rounded-lg hover:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
            {t("contact.submit")}
          </>
        )}
      </button>
    </form>
  );
}
