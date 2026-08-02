'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from '@/components/motion/reveal';

interface Step {
  title: string;
  description: string;
}

export function Process() {
  const t = useTranslations('process');
  const steps = t.raw('steps') as Step[];
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 80%', 'end 60%'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="section-padding bg-background">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <span className="text-eyebrow">{t('sectionLabel')}</span>
          <h2 className="mt-4 font-heading text-3xl font-medium leading-tight text-primary md:text-4xl">{t('headline')}</h2>
        </Reveal>

        <div ref={containerRef} className="relative mt-16">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-border md:left-1/2 md:block" aria-hidden="true" />
          <motion.div
            className="absolute left-6 top-0 hidden w-px bg-gold md:left-1/2 md:block"
            style={{ height: '100%', scaleY: lineScale, transformOrigin: 'top' }}
            aria-hidden="true"
          />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <Reveal
                key={step.title}
                delay={index * 0.1}
                className={`relative flex items-start gap-6 md:mb-16 md:w-1/2 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
                }`}
              >
                <div
                  className={`absolute left-0 top-0 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-lg text-white md:top-0 ${
                    index % 2 === 0 ? 'md:-right-6 md:left-auto' : 'md:-left-6'
                  }`}
                >
                  {index + 1}
                </div>
                <div className="ml-16 md:ml-0">
                  <p className="font-heading text-xl font-medium text-primary">{step.title}</p>
                  <p className="mt-2 text-gray">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
