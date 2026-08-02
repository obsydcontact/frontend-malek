import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/lib/constants';
import { getAllPosts } from '@/lib/blog';

const staticPaths = ['', '/about', '/services', '/pricing', '/transformations', '/blog', '/contact', '/privacy-policy', '/terms'];

const serviceSlugsByLocale: Record<string, string[]> = {
  en: ['personal-training', 'online-coaching', 'nutrition-coaching', 'body-recomposition', 'weight-loss', 'muscle-building'],
  fr: ['coaching-personnel', 'coaching-en-ligne', 'coaching-nutrition', 'recomposition-corporelle', 'perte-de-poids', 'prise-de-muscle'],
};

/** Emits every localized URL with full hreflang alternates. See docs/10-seo-strategy.md § Sitemap. */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const p of staticPaths) {
      entries.push({
        url: `${siteConfig.url}/${locale}${p}`,
        lastModified: new Date(),
        changeFrequency: p === '' ? 'weekly' : 'monthly',
        priority: p === '' ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(routing.locales.map((l) => [l, `${siteConfig.url}/${l}${p}`])),
        },
      });
    }

    for (const slug of serviceSlugsByLocale[locale] ?? []) {
      entries.push({
        url: `${siteConfig.url}/${locale}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }

    for (const post of getAllPosts(locale)) {
      entries.push({
        url: `${siteConfig.url}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'yearly',
        priority: 0.5,
      });
    }
  }

  return entries;
}
