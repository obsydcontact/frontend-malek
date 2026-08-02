import type { Metadata } from 'next';
import { About } from '@/components/sections/about';
import { CtaBand } from '@/components/sections/cta-band';
import { JsonLd } from '@/components/seo/json-ld';
import { getBreadcrumbSchema, getPersonSchema } from '@/lib/seo';
import { siteConfig } from '@/lib/constants';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === 'fr' ? 'À propos | Coach Malek Lausanne' : 'About | Coach Malek Lausanne';
  const description =
    locale === 'fr'
      ? "Découvrez l'histoire, la mission et les valeurs de Coach Malek, coach sportif et nutrition à Lausanne."
      : 'Discover the story, mission, and values behind Coach Malek, fitness and nutrition coach in Lausanne.';
  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}/${locale}/about` },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <>
      <JsonLd data={getPersonSchema()} />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', url: `${siteConfig.url}/${locale}` },
          { name: 'About', url: `${siteConfig.url}/${locale}/about` },
        ])}
      />
      <div className="pt-20">
        <About />
        <CtaBand location="about-page" />
      </div>
    </>
  );
}
