import type { Metadata } from 'next';
import { Services } from '@/components/sections/services';
import { CtaBand } from '@/components/sections/cta-band';
import { siteConfig } from '@/lib/constants';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === 'fr' ? 'Nos Services de Coaching | Coach Malek Lausanne' : 'Coaching Services | Coach Malek Lausanne';
  const description =
    locale === 'fr'
      ? 'Personal training, coaching en ligne, nutrition, recomposition corporelle, perte de poids et prise de muscle à Lausanne et en Suisse.'
      : 'Personal training, online coaching, nutrition, body recomposition, weight loss and muscle building in Lausanne and Switzerland.';
  return { title, description, alternates: { canonical: `${siteConfig.url}/${locale}/services` } };
}

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <Services />
      <CtaBand location="services-page" />
    </div>
  );
}
