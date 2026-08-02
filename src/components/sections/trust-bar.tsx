import { useTranslations } from 'next-intl';
import { ShieldCheck, CreditCard, CalendarCheck } from 'lucide-react';
import { AnimatedCounter } from '@/components/motion/animated-counter';
import { Reveal } from '@/components/motion/reveal';

export function TrustBar() {
  const t = useTranslations('trustBar');

  const stats = [
    { node: <AnimatedCounter value={250} suffix="+" />, labelKey: 'clientsLabel' as const },
    { node: <AnimatedCounter value={96} suffix="%" />, labelKey: 'successRateLabel' as const },
    { node: t('yearsValue'), labelKey: 'yearsLabel' as const },
    { node: <AnimatedCounter value={4.9} decimals={1} suffix="/5" />, labelKey: 'ratingLabel' as const },
  ];

  return (
    <section className="border-y border-border bg-white">
      <div className="container-page grid grid-cols-2 gap-10 py-16 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal key={stat.labelKey} delay={index * 0.08} className="text-center">
            <p className="font-heading text-4xl font-medium text-primary md:text-5xl">{stat.node}</p>
            <p className="mt-2 text-sm text-gray">{t(stat.labelKey)}</p>
          </Reveal>
        ))}
      </div>

      <div className="container-page flex flex-col items-center justify-center gap-6 border-t border-border py-8 text-center text-sm text-gray md:flex-row md:gap-12">
        <span className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-gold" strokeWidth={1.5} />
          {t('certificationLine')}
        </span>
        <span className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-gold" strokeWidth={1.5} />
          {t('paymentLine')}
        </span>
        <span className="flex items-center gap-2">
          <CalendarCheck className="h-4 w-4 text-gold" strokeWidth={1.5} />
          {t('bookingLine')}
        </span>
      </div>
    </section>
  );
}
