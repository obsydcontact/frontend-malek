'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { TextReveal } from '@/components/motion/text-reveal';
import { Reveal } from '@/components/motion/reveal';
import { BookingCta } from '@/components/layout/booking-dialog';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

/**
 * Large cinematic hero. Background photo + soft dark overlay (never a
 * "cheap gradient" — a single low-opacity radial/linear per
 * docs/04-design-system.md). Headline uses word-stagger TextReveal.
 */
export function Hero() {
  const t = useTranslations('hero');
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative flex h-screen min-h-[720px] w-full items-center overflow-hidden bg-primary">
      <Image
        src="/images/hero/hero-training.jpg"
        alt="Coach Malek coaching a client through an assisted mobility stretch in the studio"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: '50% 30%' }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-primary/20"
        aria-hidden="true"
      />

      <div className="container-page relative z-10">
        <Reveal>
          <span className="text-eyebrow mb-6 inline-block">{t('eyebrow')}</span>
        </Reveal>

        <TextReveal
          as="h1"
          text={t('headline')}
          className="max-w-4xl font-heading text-[clamp(2.75rem,6vw,6rem)] font-medium leading-[1.02] tracking-tight text-white"
        />

        <Reveal delay={0.3}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">{t('subheadline')}</p>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <BookingCta location="hero" size="lg" className="bg-gold text-primary hover:bg-gold/90">
              {t('ctaPrimary')}
            </BookingCta>
            <Button asChild variant="secondary" size="lg" className="border-white/30 text-white hover:bg-white hover:text-primary">
              <Link href="/transformations">{t('ctaSecondary')}</Link>
            </Button>
          </div>
        </Reveal>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70"
        animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-xs uppercase tracking-[0.2em]">{t('scrollHint')}</span>
        <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
