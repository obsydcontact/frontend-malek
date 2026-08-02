'use client';

import * as React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { cn } from '@/lib/utils';

interface Story {
  name: string;
  quote: string;
  stat: string;
  duration: string;
  lifestyle: string;
}

export function TransformationGallery() {
  const t = useTranslations('gallery');
  const stories = t.raw('stories') as Story[];
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  const active = stories[activeIndex] ?? stories[0];
  if (!active) return null;

  return (
    <section className="section-padding bg-background" id="transformations">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <span className="text-eyebrow">{t('sectionLabel')}</span>
          <h2 className="mt-4 font-heading text-3xl font-medium leading-tight text-primary md:text-4xl">{t('headline')}</h2>
          <p className="mt-4 text-gray">{t('subhead')}</p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <Reveal>
            <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-[20px] bg-primary/5 shadow-soft-lg">
              <div className="relative h-72 sm:h-80 md:h-96 lg:h-[420px]">
                <Image
                  src={`/images/gallery/client-${activeIndex + 1}-before.jpg`}
                  alt={`${active.name} before transformation`}
                  fill
                  sizes="(min-width: 1024px) 30vw, 50vw"
                  className="object-contain"
                />
                <span className="absolute left-3 top-3 rounded-full bg-primary/80 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white">
                  {t('beforeLabel')}
                </span>
              </div>
              <div className="relative h-72 sm:h-80 md:h-96 lg:h-[420px]">
                <Image
                  src={`/images/gallery/client-${activeIndex + 1}-after.jpg`}
                  alt={`${active.name} after transformation`}
                  fill
                  sizes="(min-width: 1024px) 30vw, 50vw"
                  className="object-contain"
                />
                <span className="absolute left-3 top-3 rounded-full bg-primary/80 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white">
                  {t('afterLabel')}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-heading text-xl font-medium text-primary">{active.name}</p>
            <p className="mt-3 text-lg leading-relaxed text-gray">&ldquo;{active.quote}&rdquo;</p>
            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-eyebrow">{t('lostLabel')}</dt>
                <dd className="mt-1 font-heading text-lg text-primary">{active.stat}</dd>
              </div>
              <div>
                <dt className="text-eyebrow">{t('durationLabel')}</dt>
                <dd className="mt-1 font-heading text-lg text-primary">{active.duration}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-eyebrow">{t('lifestyleLabel')}</dt>
                <dd className="mt-1 text-primary">{active.lifestyle}</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <div className="mt-10 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {stories.map((story, index) => (
              <button
                key={story.name}
                onClick={() => emblaApi?.scrollTo(index)}
                className={cn(
                  'shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition-colors',
                  index === activeIndex ? 'border-gold bg-gold/10 text-primary' : 'border-border text-gray hover:text-primary'
                )}
              >
                {story.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-2 lg:hidden">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous transformation"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next transformation"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
