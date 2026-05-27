"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { CalendarCheck, CheckCircle } from "lucide-react";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { submitRdvForm, type FormState } from "./actions";

const initialState: FormState = { success: false, message: "" };

export function RdvForm() {
  const t = useTranslations();
  const [state, formAction, isPending] = useActionState(submitRdvForm, initialState);

  const serviceOptions = [
    { value: "maintenance", label: t("contact.service_options.maintenance") },
    { value: "sage", label: t("contact.service_options.sage") },
    { value: "security", label: t("contact.service_options.security") },
    { value: "fiber", label: t("contact.service_options.fiber") },
    { value: "training", label: t("contact.service_options.training") },
    { value: "other", label: t("contact.service_options.other") },
  ];

  const timeSlots = [
    { value: "08:00", label: "08:00 – 09:00" },
    { value: "09:00", label: "09:00 – 10:00" },
    { value: "10:00", label: "10:00 – 11:00" },
    { value: "11:00", label: "11:00 – 12:00" },
    { value: "14:00", label: "14:00 – 15:00" },
    { value: "15:00", label: "15:00 – 16:00" },
    { value: "16:00", label: "16:00 – 17:00" },
  ];

  if (state.success) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-accent-green-light flex items-center justify-center">
          <CheckCircle size={32} className="text-accent-green" />
        </div>
        <h3 className="text-xl font-bold text-text-heading">Rendez-vous confirmé !</h3>
        <p className="text-text-muted max-w-sm">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input id="name" name="name" label={t("rdv.name")} required error={state.errors?.name} autoComplete="name" />
        <Input id="phone" name="phone" type="tel" label={t("rdv.phone")} required error={state.errors?.phone} autoComplete="tel" />
      </div>
      <Input id="email" name="email" type="email" label={t("rdv.email")} required error={state.errors?.email} autoComplete="email" />
      <Select id="service" name="service" label={t("rdv.service")} placeholder="Choisissez un sujet" options={serviceOptions} required error={state.errors?.service} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input id="date" name="date" type="date" label={t("rdv.date")} required error={state.errors?.date} min={new Date().toISOString().split("T")[0]} />
        <Select id="time" name="time" label={t("rdv.time")} placeholder="Choisissez un créneau" options={timeSlots} required error={state.errors?.time} />
      </div>
      <Textarea id="notes" name="notes" label={t("rdv.notes")} rows={3} placeholder="Informations complémentaires..." />

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 bg-primary-700 text-white font-semibold text-sm py-3.5 rounded-xl hover:bg-primary-800 disabled:opacity-50 transition-colors"
      >
        {isPending ? (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <CalendarCheck size={16} />
        )}
        {isPending ? t("common.sending") : t("rdv.submit")}
      </button>
    </form>
  );
}
