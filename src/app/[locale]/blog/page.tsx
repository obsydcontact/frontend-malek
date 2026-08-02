import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/motion/reveal';
import { Badge } from '@/components/ui/badge';
import { getAllPosts } from '@/lib/blog';
import { siteConfig } from '@/lib/constants';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === 'fr' ? 'Blog Fitness & Nutrition | Coach Malek' : 'Fitness & Nutrition Blog | Coach Malek';
  const description =
    locale === 'fr'
      ? 'Conseils fitness, nutrition et mode de vie sain pour professionnels suisses occupés.'
      : 'Fitness, nutrition, and healthy lifestyle advice for busy Swiss professionals.';
  return { title, description, alternates: { canonical: `${siteConfig.url}/${locale}/blog` } };
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const posts = getAllPosts(locale);

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <span className="text-eyebrow">{t('sectionLabel')}</span>
            <h1 className="mt-4 font-heading text-4xl font-medium leading-tight text-primary md:text-5xl">{t('headline')}</h1>
            <p className="mt-4 text-gray">{t('subhead')}</p>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={(index % 3) * 0.08}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
                    />
                  </div>
                  <Badge variant="gold" className="mt-4">
                    {t(`pillars.${post.pillar}` as never)}
                  </Badge>
                  <p className="mt-3 font-heading text-xl font-medium text-primary group-hover:text-gold">{post.title}</p>
                  <p className="mt-2 text-sm text-gray">{post.description}</p>
                </Link>
              </Reveal>
            ))}
          </div>

          {posts.length === 0 && <p className="mt-14 text-gray">No articles published yet for this language.</p>}
        </div>
      </section>
    </div>
  );
}
