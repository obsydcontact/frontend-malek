import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Blog posts are authored as MDX files in src/content/blog/{locale}/{slug}.mdx
 * with frontmatter. See docs/03-architecture.md § Component architecture
 * rules and docs/02-content-and-copy.md § 11 for the pillar taxonomy.
 * A post available only in one language is fine — callers must never
 * link to a locale that doesn't have the slug (see docs/10-seo-strategy.md).
 */
export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  pillar: string;
  coverImage: string;
}

export interface BlogPostSummary extends BlogFrontmatter {
  slug: string;
  locale: string;
}

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

export function getAllPosts(locale: string): BlogPostSummary[] {
  const localeDir = path.join(BLOG_DIR, locale);
  if (!fs.existsSync(localeDir)) return [];

  return fs
    .readdirSync(localeDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const source = fs.readFileSync(path.join(localeDir, file), 'utf8');
      const { data } = matter(source);
      return { slug, locale, ...(data as BlogFrontmatter) };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(locale: string, slug: string): { frontmatter: BlogFrontmatter; content: string } | null {
  const filePath = path.join(BLOG_DIR, locale, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(source);
  return { frontmatter: data as BlogFrontmatter, content };
}
