import { useTranslations } from 'next-intl';
import { Check, X } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';

export function ComparisonTable() {
  const t = useTranslations('comparison');
  const rows = t.raw('rows') as string[];

  return (
    <section className="section-padding bg-primary text-white">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <span className="text-eyebrow">{t('sectionLabel')}</span>
          <h2 className="mt-4 font-heading text-3xl font-medium leading-tight text-white md:text-4xl">{t('headline')}</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-[20px] border border-white/10">
            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 bg-white/5 px-6 py-4 text-sm font-medium uppercase tracking-wide text-white/50 sm:px-8">
              <span />
              <span className="w-24 text-center text-gold">{t('columnAwMalek')}</span>
              <span className="w-24 text-center">{t('columnGeneric')}</span>
            </div>
            {rows.map((row, index) => (
              <div
                key={row}
                className={`grid grid-cols-[1fr_auto_auto] items-center gap-4 px-6 py-5 sm:px-8 ${
                  index % 2 === 0 ? 'bg-white/[0.02]' : ''
                }`}
              >
                <span className="text-sm sm:text-base">{row}</span>
                <span className="flex w-24 justify-center">
                  <Check className="h-5 w-5 text-gold" strokeWidth={2} />
                </span>
                <span className="flex w-24 justify-center">
                  <X className="h-5 w-5 text-white/30" strokeWidth={2} />
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center font-heading text-xl text-gold">{t('closingLine')}</p>
        </Reveal>
      </div>
    </section>
  );
}
