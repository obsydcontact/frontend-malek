import type { Metadata } from 'next';
import { siteConfig } from '@/lib/constants';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'fr' ? 'Politique de Confidentialité | Coach Malek' : 'Privacy Policy | Coach Malek',
    alternates: { canonical: `${siteConfig.url}/${locale}/privacy-policy` },
    robots: { index: true, follow: true },
  };
}

// [[TODO: Have this legal text reviewed by a Swiss lawyer / data protection
// advisor before launch — nFADP (revLPD) compliance for a CH-based business
// collecting leads, cookies, and CAPI-hashed PII. This is a reasonable
// starting draft, not legal advice.]]
export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFr = locale === 'fr';

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-page prose prose-lg max-w-3xl prose-headings:font-heading prose-headings:font-medium prose-headings:text-primary prose-p:text-gray prose-li:text-gray">
          {isFr ? (
            <>
              <h1>Politique de Confidentialité</h1>
              <p>Dernière mise à jour : Juillet 2026</p>
              <p>
                Coach Malek (&laquo; nous &raquo;) respecte votre vie privée. Cette politique explique quelles données nous collectons via
                {' '}{siteConfig.url}, pourquoi, et comment vous pouvez exercer vos droits.
              </p>
              <h2>1. Données collectées</h2>
              <ul>
                <li>Informations de contact (nom, email, téléphone) via nos formulaires.</li>
                <li>Données de navigation (pages vues, source de trafic) via des cookies analytiques et publicitaires.</li>
                <li>Identifiants publicitaires hachés (email, téléphone) transmis aux plateformes Meta, TikTok et Snapchat à des fins de mesure de conversion.</li>
              </ul>
              <h2>2. Finalité du traitement</h2>
              <p>Vos données sont utilisées pour répondre à vos demandes, vous fournir nos services de coaching, et mesurer l'efficacité de nos campagnes publicitaires.</p>
              <h2>3. Partage des données</h2>
              <p>
                Vos données peuvent être partagées, sous forme hachée lorsque cela s'applique, avec Meta, TikTok, Snapchat, Google Sheets
                (pour notre gestion interne des leads), et notre fournisseur d'hébergement.
              </p>
              <h2>4. Vos droits</h2>
              <p>Conformément à la loi suisse sur la protection des données (LPD), vous pouvez demander l'accès, la rectification ou la suppression de vos données en nous contactant à {siteConfig.email}.</p>
              <h2>5. Cookies</h2>
              <p>Nous utilisons des cookies essentiels et des cookies de mesure publicitaire. Vous pouvez les gérer via les paramètres de votre navigateur.</p>
            </>
          ) : (
            <>
              <h1>Privacy Policy</h1>
              <p>Last updated: July 2026</p>
              <p>
                Coach Malek (&quot;we&quot;) respects your privacy. This policy explains what data we collect via {siteConfig.url}, why,
                and how you can exercise your rights.
              </p>
              <h2>1. Data We Collect</h2>
              <ul>
                <li>Contact information (name, email, phone) via our forms.</li>
                <li>Browsing data (pages viewed, traffic source) via analytics and advertising cookies.</li>
                <li>Hashed advertising identifiers (email, phone) sent to Meta, TikTok, and Snapchat for conversion measurement purposes.</li>
              </ul>
              <h2>2. Purpose of Processing</h2>
              <p>Your data is used to respond to your requests, provide our coaching services, and measure the effectiveness of our advertising campaigns.</p>
              <h2>3. Data Sharing</h2>
              <p>
                Your data may be shared, in hashed form where applicable, with Meta, TikTok, Snapchat, Google Sheets (for our internal
                lead management), and our hosting provider.
              </p>
              <h2>4. Your Rights</h2>
              <p>Under the Swiss Federal Act on Data Protection (FADP), you may request access, rectification, or deletion of your data by contacting us at {siteConfig.email}.</p>
              <h2>5. Cookies</h2>
              <p>We use essential cookies and advertising measurement cookies. You can manage these via your browser settings.</p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
