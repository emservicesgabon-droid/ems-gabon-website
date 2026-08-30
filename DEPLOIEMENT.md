# EMS GABON — Site web

Site corporate multilingue (FR/EN) construit avec **Next.js 16**, **Tailwind CSS v4** et **next-intl**.

## Prérequis

- Node.js 20 ou supérieur
- npm

## Installation locale

```bash
npm install --legacy-peer-deps
cp .env.example .env.local   # puis renseigner les variables SMTP
npm run dev
```

Le site est accessible sur http://localhost:3000

> Note : `--legacy-peer-deps` est nécessaire à cause des dépendances React 19 / next-intl.

## Variables d'environnement

Voir `.env.example`. Elles servent à l'envoi des emails des formulaires (contact, devis, rendez-vous) via SMTP Gmail :

| Variable    | Description                                             |
|-------------|---------------------------------------------------------|
| `SMTP_USER` | Compte Gmail expéditeur                                  |
| `SMTP_PASS` | Mot de passe d'application Gmail (16 caractères)         |
| `SMTP_TO`   | Adresse destinataire des messages (défaut = SMTP_USER)  |

## Build de production

```bash
npm install --legacy-peer-deps
npm run build
npm run start
```

## Déploiement sur Vercel (recommandé)

1. Importer le projet dans Vercel.
2. Dans **Settings → Environment Variables**, ajouter `SMTP_USER`, `SMTP_PASS`, `SMTP_TO`.
3. La commande d'installation utilise déjà `--legacy-peer-deps` via le fichier `.npmrc` inclus.
4. Déployer.

## Déploiement sur un autre hébergeur (Node.js)

Tout hébergeur supportant Node.js 20+ convient (Railway, Render, VPS...) :

```bash
npm install --legacy-peer-deps
npm run build
npm run start   # démarre le serveur sur le port 3000 (ou $PORT)
```

## Structure du projet

```
app/          Pages et routes (App Router, i18n via [locale])
components/    Composants UI, sections et layout
data/          Données statiques (services, équipe, projets, témoignages...)
i18n/          Configuration next-intl (routing + requêtes)
messages/      Traductions FR et EN
lib/           Utilitaires (mailer SMTP)
public/        Images et assets statiques
```
