import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/motion/reveal';
import { ImageReveal } from '@/components/motion/image-reveal';

interface TimelineItem {
  year: string;
  text: string;
}

interface ValueItem {
  title: string;
  description: string;
}

export function About() {
  const t = useTranslations('about');
  const values = t.raw('values') as ValueItem[];
  const timeline = t.raw('timeline') as TimelineItem[];

  return (
    <section className="section-padding bg-background" id="about">
      <div className="container-page grid gap-16 lg:grid-cols-2 lg:items-center">
        <ImageReveal className="aspect-[4/5] rounded-[20px] shadow-soft-lg">
          <Image
            src="/images/about/coach-portrait.jpg"
            alt="Portrait of Coach Malek, fitness and nutrition coach, at Fight Factory Lausanne"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </ImageReveal>

        <div>
          <Reveal>
            <span className="text-eyebrow">{t('sectionLabel')}</span>
            <h2 className="mt-4 font-heading text-3xl font-medium leading-tight text-primary md:text-4xl">{t('headline')}</h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 leading-relaxed text-gray">{t('bodyPart1')}</p>
            <p className="mt-4 leading-relaxed text-gray">{t('bodyPart2')}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <p className="text-eyebrow">{t('missionLabel')}</p>
                <p className="mt-2 text-sm leading-relaxed text-primary">{t('mission')}</p>
              </div>
              <div>
                <p className="text-eyebrow">{t('visionLabel')}</p>
                <p className="mt-2 text-sm leading-relaxed text-primary">{t('vision')}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="container-page mt-20">
        <Reveal>
          <p className="text-eyebrow text-center">{t('valuesLabel')}</p>
        </Reveal>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.1} className="rounded-[20px] border border-border bg-white p-8 text-center shadow-soft">
              <p className="font-heading text-xl font-medium text-primary">{value.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray">{value.description}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="container-page mt-24">
        <Reveal>
          <p className="text-eyebrow text-center">{t('timelineLabel')}</p>
        </Reveal>
        <div className="relative mt-12">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-border md:block" aria-hidden="true" />
          <div className="grid gap-10 md:grid-cols-5">
            {timeline.map((item, index) => (
              <Reveal key={item.year} delay={index * 0.1} className="relative text-center">
                <div className="mx-auto mb-4 hidden h-3 w-3 rounded-full bg-gold md:block" aria-hidden="true" />
                <p className="font-heading text-lg font-medium text-gold">{item.year}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
