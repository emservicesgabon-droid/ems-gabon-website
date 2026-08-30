# CLAUDE.md - Règles Absolues EMS GABON IT

## IDENTITÉ VISUELLE OFFICIELLE
- Fond principal: #0a1628 (bleu nuit profond, jamais noir pur #000)
- Accent Or: #d4a94b / #f59e0b (pour CTA et logo)
- Accent Cyan: #00d4ff / #38bdf8 (pour glow et effets)
- Texte principal: #ffffff
- Texte secondaire: #94a3b8
- Font: Inter, Sora, ou Geist Sans - style Apple minimaliste

## STACK TECHNIQUE
- Next.js 14 App Router (pas Pages Router)
- TypeScript strict
- Tailwind CSS 3.4
- Framer Motion pour toutes les animations
- next/image obligatoire (pas de <img>)
- lucide-react pour les icônes (pas FontAwesome)

## RÈGLES ABSOLUES - NE JAMAIS FAIRE
1. NE JAMAIS modifier package.json manuellement -> utilise npm install
2. NE JAMAIS modifier tailwind.config.ts sans demande
3. NE JAMAIS utiliser <img> -> utilise Image de next/image
4. NE JAMAIS mettre de couleur claire en fond -> toujours #0a1628
5. NE JAMAIS inventer un chemin d'image -> utilise SEULEMENT:
   - public/images/hero/fibre-optique.webp
   - public/images/hero/serveur-cloud.webp
   - public/images/hero/securite-camera.webp
   - public/images/hero/controle-acces.webp
   - public/images/hero/dev-applicatif.webp
   - public/images/banners/banner-premium-dark.webp
   - public/images/banners/banner-tech-fibre.webp
   - public/images/logo/logo-3d-icon.webp
6. TOUJOURS mettre 'use client' si Framer Motion ou useState
7. TOUJOURS animation flottante: y: [0, -15, 0], duration 3-5s, repeat Infinity

## STRUCTURE HERO OBLIGATOIRE
- Fond #0a1628 + radial-gradient + grid pattern subtil
- Titre 72px bold blanc centré: "EMS GABON Votre Partenaire de Confiance"
- 5 images hero qui flottent autour du titre avec delays différents
- 2 boutons CTA: "Demander un Devis" (bg or) + "Nos Services" (outline blanc)
- Responsive mobile: images en grid 2 colonnes sous le titre

## WORKFLOW
1. Vérifie que les images existent avant de coder
2. Code le composant
3. Lance npm run dev
4. Attends le GO de l'utilisateur pour la suite

## TON RÔLE
Tu es un développeur senior Apple-level. Tu codes ultra premium, clean, sans bloat. Tu ne poses pas de questions inutiles, tu exécutes.