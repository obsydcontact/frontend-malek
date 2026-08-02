import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Check } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { BookingCta } from '@/components/layout/booking-dialog';
import { CtaBand } from '@/components/sections/cta-band';
import { JsonLd } from '@/components/seo/json-ld';
import { getBreadcrumbSchema, getServiceSchema } from '@/lib/seo';
import { siteConfig } from '@/lib/constants';
import { routing } from '@/i18n/routing';

const SERVICE_KEYS = [
  'personalTraining',
  'onlineCoaching',
  'nutritionCoaching',
  'bodyRecomposition',
  'weightLoss',
  'muscleBuilding',
] as const;

interface ServiceItem {
  slug: string;
  title: string;
  hook: string;
  benefits: string[];
  included: string[];
  idealClient: string;
  cta: string;
}

async function findServiceBySlug(locale: string, slug: string) {
  const t = await getTranslations({ locale, namespace: 'services' });
  for (const key of SERVICE_KEYS) {
    const item = t.raw(`items.${key}`) as ServiceItem;
    if (item.slug === slug) return item;
  }
  return null;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    const t = await getTranslations({ locale, namespace: 'services' });
    for (const key of SERVICE_KEYS) {
      const item = t.raw(`items.${key}`) as ServiceItem;
      params.push({ locale, slug: item.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await findServiceBySlug(locale, slug);
  if (!service) return {};

  const title = `${service.title} | Coach Malek Lausanne`;
  return {
    title,
    description: service.hook,
    alternates: { canonical: `${siteConfig.url}/${locale}/services/${slug}` },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const service = await findServiceBySlug(locale, slug);
  const t = await getTranslations({ locale, namespace: 'services' });

  if (!service) notFound();

  return (
    <div className="pt-20">
      <JsonLd data={getServiceSchema(service)} />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', url: `${siteConfig.url}/${locale}` },
          { name: 'Services', url: `${siteConfig.url}/${locale}/services` },
          { name: service.title, url: `${siteConfig.url}/${locale}/services/${slug}` },
        ])}
      />

      <section className="section-padding">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="text-eyebrow">{t('sectionLabel')}</span>
            <h1 className="mt-4 font-heading text-4xl font-medium leading-tight text-primary md:text-5xl">{service.title}</h1>
            <p className="mt-4 text-lg text-gray">{service.hook}</p>

            <div className="mt-8">
              <p className="text-eyebrow">{t('benefitsLabel')}</p>
              <ul className="mt-3 space-y-2">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-primary">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <p className="text-eyebrow">{t('includedLabel')}</p>
              <ul className="mt-3 space-y-2">
                {service.included.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-primary">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-[20px] bg-gold/5 p-6">
              <p className="text-eyebrow">{t('idealClientLabel')}</p>
              <p className="mt-2 text-primary">{service.idealClient}</p>
            </div>

            <BookingCta location={`service-detail-${slug}`} size="lg" className="mt-8">
              {service.cta}
            </BookingCta>
          </Reveal>

          <Reveal delay={0.15} className="relative aspect-[4/5] overflow-hidden rounded-[20px] shadow-soft-lg">
            <Image
              src={`/images/services/${slug === service.slug ? mapSlugToImage(service.slug) : 'personal-training'}.jpg`}
              alt={service.title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      <CtaBand location={`service-detail-${slug}-bottom`} />
    </div>
  );
}

// The canonical image folder uses English slugs (see frontend/public/images/services);
// this maps a localized (FR) slug back to the English image filename.
function mapSlugToImage(localizedSlug: string): string {
  const map: Record<string, string> = {
    'coaching-personnel': 'personal-training',
    'personal-training': 'personal-training',
    'coaching-en-ligne': 'online-coaching',
    'online-coaching': 'online-coaching',
    'coaching-nutrition': 'nutrition-coaching',
    'nutrition-coaching': 'nutrition-coaching',
    'recomposition-corporelle': 'body-recomposition',
    'body-recomposition': 'body-recomposition',
    'perte-de-poids': 'weight-loss',
    'weight-loss': 'weight-loss',
    'prise-de-muscle': 'muscle-building',
    'muscle-building': 'muscle-building',
  };
  return map[localizedSlug] ?? 'personal-training';
}
