"use server";

import { z } from "zod";
import { sendContactEmail } from "@/lib/mailer";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit faire au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  company: z.string().optional(),
  service: z.string().min(1, "Veuillez sélectionner un service"),
  message: z.string().min(10, "Le message doit faire au moins 10 caractères"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export interface FormState {
  success: boolean;
  message: string;
  errors?: Partial<Record<keyof ContactFormData, string>>;
}

export async function submitContactForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    company: (formData.get("company") as string) || undefined,
    service: formData.get("service") as string,
    message: formData.get("message") as string,
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: Partial<Record<keyof ContactFormData, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof ContactFormData;
      errors[field] = issue.message;
    }
    return { success: false, message: "Veuillez corriger les erreurs.", errors };
  }

  try {
    await sendContactEmail(parsed.data);
  } catch (err) {
    console.error("[Contact] Email error:", err);
    return {
      success: false,
      message: "Une erreur est survenue lors de l'envoi. Veuillez nous appeler directement.",
    };
  }

  return {
    success: true,
    message: "Votre message a bien été envoyé. Nous vous répondons sous 24h.",
  };
}
