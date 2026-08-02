import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Hero } from '@/components/sections/hero';
import { TrustBar } from '@/components/sections/trust-bar';
import { About } from '@/components/sections/about';
import { Services } from '@/components/sections/services';
import { TransformationGallery } from '@/components/sections/transformation-gallery';
import { Testimonials } from '@/components/sections/testimonials';
import { ComparisonTable } from '@/components/sections/comparison-table';
import { Process } from '@/components/sections/process';
import { Pricing } from '@/components/sections/pricing';
import { Faq } from '@/components/sections/faq';
import { CtaBand } from '@/components/sections/cta-band';
import { JsonLd } from '@/components/seo/json-ld';
import { getFaqSchema } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return { title: t('defaultTitle'), description: t('defaultDescription') };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });
  const faqItems = t.raw('items') as { question: string; answer: string }[];

  return (
    <>
      <JsonLd data={getFaqSchema(faqItems)} />
      <Hero />
      <TrustBar />
      <About />
      <Services />
      <CtaBand location="after-services" />
      <TransformationGallery />
      <Testimonials />
      <ComparisonTable />
      <Process />
      <CtaBand location="after-process" />
      <Pricing />
      <Faq />
    </>
  );
}
