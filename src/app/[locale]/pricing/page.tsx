import type { Metadata } from 'next';
import { Pricing } from '@/components/sections/pricing';
import { Faq } from '@/components/sections/faq';
import { CtaBand } from '@/components/sections/cta-band';
import { siteConfig } from '@/lib/constants';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === 'fr' ? 'Tarifs Coaching Sportif | Coach Malek Lausanne' : 'Coaching Pricing | Coach Malek Lausanne';
  const description =
    locale === 'fr'
      ? 'Packs de coaching sportif et nutritionnel à partir de 150 CHF, à Lausanne et en ligne partout en Suisse.'
      : 'Fitness and nutrition coaching packs starting from 150 CHF, in Lausanne and online across Switzerland.';
  return { title, description, alternates: { canonical: `${siteConfig.url}/${locale}/pricing` } };
}

export default function PricingPage() {
  return (
    <div className="pt-20">
      <Pricing />
      <Faq />
      <CtaBand location="pricing-page" />
    </div>
  );
}
