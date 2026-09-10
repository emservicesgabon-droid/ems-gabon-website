import { Resend } from "resend";

// Destinataire des notifications (arrive dans la boite Zoho, alias de ems@).
const TO = process.env.MAIL_TO ?? "contact@emsgabon.com";
// Expediteur : doit etre une adresse du (sous-)domaine VERIFIE dans Resend.
// Ici le domaine verifie est le sous-domaine no-reply.emsgabon.com.
const FROM = process.env.MAIL_FROM ?? "EMS GABON <noreply@no-reply.emsgabon.com>";

async function sendMail(opts: { subject: string; html: string; replyTo: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY manquante — a configurer dans les variables Vercel.");
  }
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: opts.replyTo,
    subject: opts.subject,
    html: opts.html,
  });
  if (error) {
    throw new Error(`${error.name}: ${error.message}`);
  }
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
}) {
  await sendMail({
    replyTo: data.email,
    subject: `[Contact] ${data.name} — ${data.service}`,
    html: `
      <h2>Nouveau message de contact</h2>
      <table cellpadding="8" style="border-collapse:collapse">
        <tr><td><strong>Nom</strong></td><td>${data.name}</td></tr>
        <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
        <tr><td><strong>Téléphone</strong></td><td>${data.phone}</td></tr>
        ${data.company ? `<tr><td><strong>Société</strong></td><td>${data.company}</td></tr>` : ""}
        <tr><td><strong>Service</strong></td><td>${data.service}</td></tr>
        <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${data.message}</td></tr>
      </table>
    `,
  });
}

export async function sendDevisEmail(data: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  details: string;
  budget?: string;
  urgency: string;
}) {
  await sendMail({
    replyTo: data.email,
    subject: `[Devis] ${data.name} — ${data.service}`,
    html: `
      <h2>Nouvelle demande de devis</h2>
      <table cellpadding="8" style="border-collapse:collapse">
        <tr><td><strong>Nom</strong></td><td>${data.name}</td></tr>
        <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
        <tr><td><strong>Téléphone</strong></td><td>${data.phone}</td></tr>
        ${data.company ? `<tr><td><strong>Société</strong></td><td>${data.company}</td></tr>` : ""}
        <tr><td><strong>Service</strong></td><td>${data.service}</td></tr>
        <tr><td><strong>Urgence</strong></td><td>${data.urgency}</td></tr>
        ${data.budget ? `<tr><td><strong>Budget</strong></td><td>${data.budget}</td></tr>` : ""}
        <tr><td><strong>Détails du projet</strong></td><td style="white-space:pre-wrap">${data.details}</td></tr>
      </table>
    `,
  });
}

export async function sendRdvEmail(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
}) {
  await sendMail({
    replyTo: data.email,
    subject: `[RDV] ${data.name} — ${data.date} à ${data.time}`,
    html: `
      <h2>Nouvelle demande de rendez-vous</h2>
      <table cellpadding="8" style="border-collapse:collapse">
        <tr><td><strong>Nom</strong></td><td>${data.name}</td></tr>
        <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
        <tr><td><strong>Téléphone</strong></td><td>${data.phone}</td></tr>
        <tr><td><strong>Service</strong></td><td>${data.service}</td></tr>
        <tr><td><strong>Date</strong></td><td>${data.date}</td></tr>
        <tr><td><strong>Créneau</strong></td><td>${data.time}</td></tr>
        ${data.notes ? `<tr><td><strong>Notes</strong></td><td style="white-space:pre-wrap">${data.notes}</td></tr>` : ""}
      </table>
    `,
  });
}
