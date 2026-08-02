import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/motion/reveal';
import { CtaBand } from '@/components/sections/cta-band';
import { JsonLd } from '@/components/seo/json-ld';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { getBreadcrumbSchema } from '@/lib/seo';
import { siteConfig } from '@/lib/constants';
import { routing } from '@/i18n/routing';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const post of getAllPosts(locale)) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale, slug);
  if (!post) return {};

  return {
    title: `${post.frontmatter.title} | Coach Malek Blog`,
    description: post.frontmatter.description,
    alternates: { canonical: `${siteConfig.url}/${locale}/blog/${slug}` },
    openGraph: {
      type: 'article',
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: [{ url: post.frontmatter.coverImage }],
      publishedTime: post.frontmatter.date,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale, slug);
  const t = await getTranslations({ locale, namespace: 'common' });

  if (!post) notFound();

  const { frontmatter, content } = post;

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.description,
    image: `${siteConfig.url}${frontmatter.coverImage}`,
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    author: { '@type': 'Person', name: 'Coach Malek' },
    publisher: { '@type': 'Organization', name: siteConfig.name },
  };

  return (
    <div className="pt-20">
      <JsonLd data={blogPostingSchema} />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', url: `${siteConfig.url}/${locale}` },
          { name: 'Blog', url: `${siteConfig.url}/${locale}/blog` },
          { name: frontmatter.title, url: `${siteConfig.url}/${locale}/blog/${slug}` },
        ])}
      />

      <article className="section-padding">
        <div className="container-page max-w-3xl">
          <Reveal>
            <Link href="/blog" className="text-sm font-medium text-gold hover:underline">
              &larr; {t('backToBlog')}
            </Link>
            <h1 className="mt-4 font-heading text-3xl font-medium leading-tight text-primary md:text-4xl">{frontmatter.title}</h1>
            <p className="mt-3 text-sm text-gray">
              {new Date(frontmatter.date).toLocaleDateString(locale === 'fr' ? 'fr-CH' : 'en-CH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[20px]">
            <Image src={frontmatter.coverImage} alt={frontmatter.title} fill sizes="100vw" className="object-cover" />
          </Reveal>

          <Reveal delay={0.15}>
            <div className="prose prose-lg mt-10 max-w-none prose-headings:font-heading prose-headings:font-medium prose-headings:text-primary prose-p:text-gray prose-a:text-gold prose-a:no-underline hover:prose-a:underline">
              <MDXRemote source={content} />
            </div>
          </Reveal>
        </div>
      </article>

      <CtaBand location={`blog-post-${slug}`} />
    </div>
  );
}
