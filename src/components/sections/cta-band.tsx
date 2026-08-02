import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/motion/reveal';
import { BookingCta } from '@/components/layout/booking-dialog';

/**
 * Reusable recurring conversion band — inserted after Hero, Services,
 * Transformation Gallery, Comparison Table, Process, and before the
 * Footer. See docs/02-content-and-copy.md § 14.
 */
export function CtaBand({ location }: { location: string }) {
  const t = useTranslations('cta');

  return (
    <section className="bg-gold/[0.06] py-16 md:py-20">
      <Reveal className="container-page flex flex-col items-center gap-6 text-center">
        <p className="max-w-2xl font-heading text-2xl font-medium leading-snug text-primary md:text-3xl">{t('headline')}</p>
        <BookingCta location={location} size="lg">
          {t('button')}
        </BookingCta>
      </Reveal>
    </section>
  );
}
