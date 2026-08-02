'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import useEmblaCarousel from 'embla-carousel-react';
import { Star, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

interface VideoTestimonialCopy {
  caption: string;
}

const VIDEO_TESTIMONIALS = [
  { src: '/videos/testimonials/testimonial-1.mp4', poster: '/images/testimonials/testimonial-1-poster.jpg' },
  { src: '/videos/testimonials/testimonial-2.mp4', poster: '/images/testimonials/testimonial-2-poster.jpg' },
  { src: '/videos/testimonials/testimonial-3.mp4', poster: '/images/testimonials/testimonial-3-poster.jpg' },
];

function VideoTestimonialCard({ src, poster, caption }: { src: string; poster: string; caption: string }) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlay = () => {
    videoRef.current?.play();
    setIsPlaying(true);
  };

  return (
    <div className="group relative aspect-[9/16] overflow-hidden rounded-[20px] bg-primary shadow-soft-lg">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls={isPlaying}
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        <track kind="captions" />
      </video>
      {!isPlaying && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label={caption}
          className="absolute inset-0 flex items-center justify-center bg-primary/10 transition-colors hover:bg-primary/20"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-primary shadow-soft-lg transition-transform group-hover:scale-105">
            <Play className="h-6 w-6 translate-x-0.5 fill-primary" strokeWidth={0} />
          </span>
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/85 to-transparent p-5 pt-12 text-left">
            <span className="text-sm font-medium text-white">{caption}</span>
          </span>
        </button>
      )}
    </div>
  );
}

export function Testimonials() {
  const t = useTranslations('testimonials');
  const items = t.raw('items') as Testimonial[];
  const videoItems = t.raw('videoItems') as VideoTestimonialCopy[];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  return (
    <section className="section-padding bg-white" id="testimonials">
      <div className="container-page">
        <Reveal className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="text-eyebrow">{t('sectionLabel')}</span>
            <h2 className="mt-4 font-heading text-3xl font-medium leading-tight text-primary md:text-4xl">{t('headline')}</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-primary transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-primary transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>

        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {items.map((testimonial) => (
              <div key={testimonial.name} className="min-w-0 shrink-0 basis-full sm:basis-1/2 lg:basis-1/3">
                <div className="flex h-full flex-col rounded-[20px] border border-border bg-white p-8 shadow-soft">
                  <div className="flex gap-1 text-gold" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold" strokeWidth={0} />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 leading-relaxed text-primary">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-primary">{testimonial.name}</p>
                      <p className="text-xs text-gray">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <Reveal className="text-center">
            <span className="text-eyebrow">{t('videoLabel')}</span>
            <h3 className="mt-3 font-heading text-2xl font-medium leading-tight text-primary md:text-3xl">{t('videoHeadline')}</h3>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-sm gap-6 sm:max-w-none sm:grid-cols-3">
            {VIDEO_TESTIMONIALS.map((video, index) => (
              <Reveal key={video.src} delay={index * 0.1}>
                <VideoTestimonialCard {...video} caption={videoItems[index]?.caption ?? ''} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
