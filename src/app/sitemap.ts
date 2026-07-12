import type { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/lib/blog';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kami.expert';

// Regenerate the sitemap at most once per hour so new articles show up.
export const revalidate = 3600;

// Public, indexable pages (paths without a locale prefix = the default `fr`).
const STATIC_PATHS = [
  '',
  '/services',
  '/methodologie',
  '/expertise',
  '/pros-collectionneurs',
  '/contact',
  '/blog',
] as const;

function url(locale: 'fr' | 'en', path: string): string {
  const prefix = locale === 'fr' ? '' : '/en';
  return `${SITE_URL}${prefix}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: url('fr', path),
    lastModified: now,
    changeFrequency: path === '/blog' ? 'daily' : 'monthly',
    priority: path === '' ? 1 : 0.7,
    alternates: {
      languages: {
        fr: url('fr', path),
        en: url('en', path),
      },
    },
  }));

  const [frPosts, enPosts] = await Promise.all([
    getPublishedPosts('fr'),
    getPublishedPosts('en'),
  ]);

  const postEntries: MetadataRoute.Sitemap = [
    ...frPosts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.published_at ? new Date(post.published_at) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...enPosts.map((post) => ({
      url: `${SITE_URL}/en/blog/${post.slug}`,
      lastModified: post.published_at ? new Date(post.published_at) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];

  return [...staticEntries, ...postEntries];
}
