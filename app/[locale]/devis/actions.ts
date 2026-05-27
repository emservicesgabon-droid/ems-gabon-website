"use server";

import { z } from "zod";
import { sendDevisEmail } from "@/lib/mailer";

const devisSchema = z.object({
  service: z.string().min(1, "Veuillez sélectionner un service"),
  details: z.string().min(20, "Veuillez décrire votre projet en au moins 20 caractères"),
  budget: z.string().optional(),
  urgency: z.string().min(1, "Veuillez sélectionner une urgence"),
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email("Email invalide"),
  phone: z.string().min(8),
});

export type DevisFormData = z.infer<typeof devisSchema>;

export interface FormState {
  success: boolean;
  message: string;
  errors?: Partial<Record<keyof DevisFormData, string>>;
}

export async function submitDevisForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = devisSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: Partial<Record<keyof DevisFormData, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof DevisFormData;
      errors[field] = issue.message;
    }
    return { success: false, message: "Veuillez corriger les erreurs.", errors };
  }

  try {
    await sendDevisEmail(parsed.data);
  } catch (err) {
    console.error("[Devis] Email error:", err);
    return {
      success: false,
      message: "Une erreur est survenue lors de l'envoi. Veuillez nous appeler directement.",
    };
  }

  return {
    success: true,
    message: "Votre demande de devis a bien été envoyée. Nous vous recontactons sous 24h.",
  };
}
