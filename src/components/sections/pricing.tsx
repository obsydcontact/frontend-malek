import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { Badge } from '@/components/ui/badge';
import { BookingCta } from '@/components/layout/booking-dialog';
import { cn } from '@/lib/utils';

interface Plan {
  name: string;
  tagline: string;
  included: string[];
}

export function Pricing() {
  const t = useTranslations('pricing');
  const plans = t.raw('plans') as Plan[];

  return (
    <section className="section-padding bg-white" id="pricing">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-eyebrow">{t('sectionLabel')}</span>
          <h2 className="mt-4 font-heading text-3xl font-medium leading-tight text-primary md:text-4xl">{t('headline')}</h2>
          <p className="mt-4 text-gray">{t('subhead')}</p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-medium text-primary">
            {t('startingFrom')}
          </span>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const isFeatured = index === 1;
            return (
              <Reveal key={plan.name} delay={index * 0.1}>
                <div
                  className={cn(
                    'flex h-full flex-col rounded-[20px] border p-8',
                    isFeatured ? 'border-gold bg-primary text-white shadow-gold-glow lg:-translate-y-4' : 'border-border bg-white shadow-soft'
                  )}
                >
                  {isFeatured && (
                    <Badge variant="gold" className="mb-4 w-fit">
                      {t('mostPopular')}
                    </Badge>
                  )}
                  {index === 2 && (
                    <Badge variant="outline" className={cn('mb-4 w-fit', 'border-primary/15 text-primary')}>
                      {t('remoteBadge')}
                    </Badge>
                  )}

                  <p className={cn('font-heading text-2xl font-medium', isFeatured ? 'text-white' : 'text-primary')}>{plan.name}</p>
                  <p className={cn('mt-3 text-sm leading-relaxed', isFeatured ? 'text-white/70' : 'text-gray')}>{plan.tagline}</p>

                  <ul className="mt-8 flex-1 space-y-3">
                    {plan.included.map((line) => (
                      <li key={line} className="flex items-start gap-2 text-sm">
                        <Check className={cn('mt-0.5 h-4 w-4 shrink-0', isFeatured ? 'text-gold' : 'text-gold')} strokeWidth={2} />
                        <span className={isFeatured ? 'text-white/90' : 'text-primary'}>{line}</span>
                      </li>
                    ))}
                  </ul>

                  <BookingCta
                    location={`pricing-${plan.name}`}
                    className={cn('mt-8 w-full', isFeatured && 'bg-gold text-primary hover:bg-gold/90')}
                    variant={isFeatured ? 'primary' : 'secondary'}
                  >
                    {t('cta')}
                  </BookingCta>
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-gray">{t('finePrint')}</p>
      </div>
    </section>
  );
}
