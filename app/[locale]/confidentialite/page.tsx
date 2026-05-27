import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Politique de Confidentialité — EMS GABON",
  description: "Politique de confidentialité et protection des données personnelles — EMS GABON.",
};

export default async function ConfidentialitePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <Container size="md">
        <h1 className="text-3xl font-bold text-text-heading mb-2">Politique de Confidentialité</h1>
        <p className="text-text-muted text-sm mb-10">Dernière mise à jour : mai 2025</p>

        <div className="prose prose-slate max-w-none space-y-8 text-text-body">

          <div>
            <h2 className="text-xl font-bold text-text-heading mb-3">1. Responsable du traitement</h2>
            <p className="text-sm">Le responsable du traitement des données est <strong>EMS GABON</strong>, dont le siège est situé à Libreville, Gabon. Contact : <a href="mailto:ems@emsgabon.com" className="text-primary-700 underline">ems@emsgabon.com</a></p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-heading mb-3">2. Données collectées</h2>
            <p className="text-sm mb-2">Nous collectons les données suivantes lors de l'utilisation de nos formulaires de contact, de devis ou de prise de rendez-vous :</p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Nom de l'entreprise (optionnel)</li>
              <li>Message et détails du projet</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-heading mb-3">3. Finalités du traitement</h2>
            <p className="text-sm">Les données collectées sont utilisées exclusivement pour :</p>
            <ul className="list-disc list-inside text-sm space-y-1 mt-2">
              <li>Répondre à vos demandes de contact ou de devis</li>
              <li>Confirmer et gérer vos rendez-vous</li>
              <li>Vous informer de nos services si vous y avez consenti</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-heading mb-3">4. Conservation des données</h2>
            <p className="text-sm">Vos données sont conservées pour la durée nécessaire à la gestion de votre demande et au maximum 3 ans à compter de notre dernier contact.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-heading mb-3">5. Partage des données</h2>
            <p className="text-sm">EMS GABON ne vend, ne loue et ne transmet jamais vos données personnelles à des tiers à des fins commerciales. Vos données ne sont partagées qu'avec nos collaborateurs internes dans le cadre du traitement de votre demande.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-heading mb-3">6. Cookies</h2>
            <p className="text-sm">Ce site utilise des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie de suivi ou publicitaire n'est utilisé sans votre consentement.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-heading mb-3">7. Vos droits</h2>
            <p className="text-sm">Conformément à la réglementation applicable, vous disposez des droits suivants sur vos données personnelles :</p>
            <ul className="list-disc list-inside text-sm space-y-1 mt-2">
              <li>Droit d'accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement (droit à l'oubli)</li>
              <li>Droit d'opposition au traitement</li>
            </ul>
            <p className="text-sm mt-2">Pour exercer ces droits, contactez-nous à : <a href="mailto:ems@emsgabon.com" className="text-primary-700 underline">ems@emsgabon.com</a></p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-heading mb-3">8. Sécurité</h2>
            <p className="text-sm">Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou destruction.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-heading mb-3">9. Contact</h2>
            <p className="text-sm">Pour toute question relative à cette politique, contactez-nous à : <a href="mailto:ems@emsgabon.com" className="text-primary-700 underline">ems@emsgabon.com</a> ou par téléphone au <a href="tel:+241011454973" className="text-primary-700 underline">+241 011 45 49 73</a>.</p>
          </div>

        </div>
      </Container>
    </section>
  );
}
