"use server";

import { z } from "zod";
import { sendRdvEmail } from "@/lib/mailer";

const rdvSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  service: z.string().min(1),
  date: z.string().min(1, "Veuillez choisir une date"),
  time: z.string().min(1, "Veuillez choisir un créneau"),
  notes: z.string().optional(),
});

export type RdvFormData = z.infer<typeof rdvSchema>;
export interface FormState {
  success: boolean;
  message: string;
  errors?: Partial<Record<keyof RdvFormData, string>>;
}

export async function submitRdvForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = rdvSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    const errors: Partial<Record<keyof RdvFormData, string>> = {};
    for (const issue of parsed.error.issues) errors[issue.path[0] as keyof RdvFormData] = issue.message;
    return { success: false, message: "Veuillez corriger les erreurs.", errors };
  }

  try {
    await sendRdvEmail(parsed.data);
  } catch (err) {
    console.error("[RDV] Email error:", err);
    return {
      success: false,
      message: "Une erreur est survenue lors de l'envoi. Veuillez nous appeler directement.",
    };
  }

  return {
    success: true,
    message: "Votre rendez-vous a bien été enregistré. Confirmation par email ou téléphone.",
  };
}
