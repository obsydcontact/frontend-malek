import { useTranslations } from 'next-intl';
import { Check, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { Card } from '@/components/ui/card';
import { BookingCta } from '@/components/layout/booking-dialog';
import { Link } from '@/i18n/navigation';

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

export function Services() {
  const t = useTranslations('services');
  const tCommon = useTranslations('common');

  return (
    <section className="section-padding bg-white" id="services">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <span className="text-eyebrow">{t('sectionLabel')}</span>
          <h2 className="mt-4 font-heading text-3xl font-medium leading-tight text-primary md:text-4xl">{t('headline')}</h2>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICE_KEYS.map((key, index) => {
            const item = t.raw(`items.${key}`) as ServiceItem;
            return (
              <Reveal key={key} delay={(index % 3) * 0.08}>
                <Card className="flex h-full flex-col hover:-translate-y-1 hover:shadow-soft-lg">
                  <p className="font-heading text-2xl font-medium text-primary">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray">{item.hook}</p>

                  <div className="mt-6">
                    <p className="text-eyebrow">{t('includedLabel')}</p>
                    <ul className="mt-3 space-y-2">
                      {item.included.map((line) => (
                        <li key={line} className="flex items-start gap-2 text-sm text-primary">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="mt-6 text-xs uppercase tracking-wide text-gray">{t('idealClientLabel')}</p>
                  <p className="mt-1 text-sm text-primary">{item.idealClient}</p>

                  <div className="mt-8">
                    <BookingCta location={`service-card-${item.slug}`} variant="secondary" className="w-full">
                      {item.cta}
                    </BookingCta>
                  </div>
                  <Link
                    href={`/services/${item.slug}`}
                    className="mt-3 flex items-center justify-center gap-1.5 text-center text-sm font-medium text-gold underline-offset-4 hover:underline"
                  >
                    {tCommon('learnMore')}
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                  </Link>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
