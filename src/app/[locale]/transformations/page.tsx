import type { Metadata } from 'next';
import { TransformationGallery } from '@/components/sections/transformation-gallery';
import { Testimonials } from '@/components/sections/testimonials';
import { CtaBand } from '@/components/sections/cta-band';
import { siteConfig } from '@/lib/constants';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === 'fr' ? 'Transformations Clients | Coach Malek Lausanne' : 'Client Transformations | Coach Malek Lausanne';
  const description =
    locale === 'fr'
      ? 'Découvrez les transformations réelles de nos clients à Lausanne et en Suisse : perte de poids, prise de muscle, recomposition corporelle.'
      : 'Real client transformations in Lausanne and Switzerland: weight loss, muscle building, body recomposition.';
  return { title, description, alternates: { canonical: `${siteConfig.url}/${locale}/transformations` } };
}

export default function TransformationsPage() {
  return (
    <div className="pt-20">
      <TransformationGallery />
      <Testimonials />
      <CtaBand location="transformations-page" />
    </div>
  );
}
