import type { Metadata } from 'next';
import { siteConfig } from '@/lib/constants';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'fr' ? "Conditions d'Utilisation | Coach Malek" : 'Terms of Service | Coach Malek',
    alternates: { canonical: `${siteConfig.url}/${locale}/terms` },
    robots: { index: true, follow: true },
  };
}

// [[TODO: Have this legal text reviewed by a Swiss lawyer before launch —
// this draft covers the basics (service description, payment terms,
// cancellation, liability) but is not a substitute for legal counsel.]]
export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFr = locale === 'fr';

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-page prose prose-lg max-w-3xl prose-headings:font-heading prose-headings:font-medium prose-headings:text-primary prose-p:text-gray prose-li:text-gray">
          {isFr ? (
            <>
              <h1>Conditions d&apos;Utilisation</h1>
              <p>Dernière mise à jour : Juillet 2026</p>
              <h2>1. Services</h2>
              <p>Coach Malek propose des services de coaching sportif et nutritionnel, en présentiel à Lausanne ou à distance en ligne, décrits sur ce site.</p>
              <h2>2. Tarifs et paiement</h2>
              <p>Les tarifs sont indiqués en francs suisses (CHF) et facturés mensuellement. Aucun engagement de durée minimale n&apos;est requis, sauf mention contraire lors de la souscription.</p>
              <h2>3. Annulation</h2>
              <p>Vous pouvez annuler votre abonnement à tout moment avec effet à la fin du mois en cours, en nous contactant à {siteConfig.email}.</p>
              <h2>4. Responsabilité</h2>
              <p>
                Les conseils fournis ne remplacent pas un avis médical. Consultez un professionnel de santé avant de commencer tout
                programme d&apos;entraînement ou nutritionnel, en particulier en cas de condition médicale préexistante.
              </p>
              <h2>5. Droit applicable</h2>
              <p>Les présentes conditions sont régies par le droit suisse.</p>
            </>
          ) : (
            <>
              <h1>Terms of Service</h1>
              <p>Last updated: July 2026</p>
              <h2>1. Services</h2>
              <p>Coach Malek provides fitness and nutrition coaching services, in-person in Lausanne or remotely online, as described on this site.</p>
              <h2>2. Pricing and Payment</h2>
              <p>Prices are listed in Swiss francs (CHF) and billed monthly. No minimum commitment period is required unless stated otherwise at sign-up.</p>
              <h2>3. Cancellation</h2>
              <p>You may cancel your subscription at any time, effective at the end of the current billing month, by contacting us at {siteConfig.email}.</p>
              <h2>4. Liability</h2>
              <p>
                The advice provided does not replace medical advice. Consult a healthcare professional before starting any training or
                nutrition program, especially if you have a pre-existing medical condition.
              </p>
              <h2>5. Governing Law</h2>
              <p>These terms are governed by Swiss law.</p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
