import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: (process.env.SMTP_PASS ?? "").replace(/\s/g, ""),
  },
});

const TO = process.env.SMTP_TO ?? "ems@emsgabon.com";
const FROM = `"EMS GABON" <${process.env.SMTP_USER ?? "ems@emsgabon.com"}>`;

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
}) {
  await transporter.sendMail({
    from: FROM,
    to: TO,
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
  await transporter.sendMail({
    from: FROM,
    to: TO,
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
  await transporter.sendMail({
    from: FROM,
    to: TO,
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
