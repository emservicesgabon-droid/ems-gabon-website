import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Mentions Légales — EMS GABON",
  description: "Mentions légales du site web EMS GABON, entreprise informatique au Gabon.",
};

export default async function MentionsLegalesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <Container size="md">
        <h1 className="text-3xl font-bold text-text-heading mb-2">Mentions Légales</h1>
        <p className="text-text-muted text-sm mb-10">Dernière mise à jour : mai 2025</p>

        <div className="prose prose-slate max-w-none space-y-8 text-text-body">

          <div>
            <h2 className="text-xl font-bold text-text-heading mb-3">1. Éditeur du site</h2>
            <p>Le site <strong>ems-gabon.com</strong> est édité par :</p>
            <ul className="mt-2 space-y-1 text-sm">
              <li><strong>Raison sociale :</strong> EMS GABON</li>
              <li><strong>Forme juridique :</strong> Entreprise individuelle / SARL</li>
              <li><strong>Siège social :</strong> Libreville, Gabon</li>
              <li><strong>Email :</strong> ems@emsgabon.com</li>
              <li><strong>Téléphone :</strong> +241 011 45 49 73</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-heading mb-3">2. Hébergement</h2>
            <p className="text-sm">Ce site est hébergé par un prestataire d'hébergement web. Les coordonnées de l'hébergeur sont disponibles sur demande.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-heading mb-3">3. Propriété intellectuelle</h2>
            <p className="text-sm">L'ensemble du contenu de ce site (textes, images, logos, icônes, graphismes) est la propriété exclusive d'EMS GABON. Toute reproduction, représentation, modification ou exploitation sans autorisation préalable écrite d'EMS GABON est interdite.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-heading mb-3">4. Responsabilité</h2>
            <p className="text-sm">EMS GABON s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, EMS GABON ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition. EMS GABON décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur ce site.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-heading mb-3">5. Liens hypertextes</h2>
            <p className="text-sm">Ce site peut contenir des liens vers d'autres sites web. EMS GABON n'est pas responsable du contenu de ces sites tiers et ne peut être tenu responsable des dommages résultant de leur utilisation.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-heading mb-3">6. Droit applicable</h2>
            <p className="text-sm">Le présent site et les présentes mentions légales sont soumis au droit gabonais. Tout litige relatif à l'utilisation de ce site sera soumis à la compétence des tribunaux compétents de Libreville (Gabon).</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-heading mb-3">7. Contact</h2>
            <p className="text-sm">Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter à : <a href="mailto:ems@emsgabon.com" className="text-primary-700 underline">ems@emsgabon.com</a></p>
          </div>

        </div>
      </Container>
    </section>
  );
}
