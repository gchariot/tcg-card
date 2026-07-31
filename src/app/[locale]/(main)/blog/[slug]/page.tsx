import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getPostBySlug, getRelatedPosts } from '@/lib/blog';
import { blogCategoryLabels } from '@/lib/validations/blog';

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kami.expert';

function formatDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(locale, slug);

  if (!post) {
    return { title: 'Article introuvable', robots: { index: false, follow: false } };
  }

  const title = post.meta_title || post.title;
  const description =
    post.meta_description || post.excerpt || `${post.title} — Blog Cartattac.`;
  const image = post.og_image_url || post.cover_image_url || undefined;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title,
      description,
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      authors: post.author_name ? [post.author_name] : undefined,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPostBySlug(locale, slug);
  if (!post) notFound();

  const related = await getRelatedPosts(locale, post.id, post.category);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.meta_description || post.excerpt || undefined,
    image: post.cover_image_url || post.og_image_url || undefined,
    datePublished: post.published_at || undefined,
    dateModified: post.updated_at,
    author: {
      '@type': 'Organization',
      name: post.author_name || 'Cartattac',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cartattac',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
  };

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 md:py-14">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/blog"
        className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="mr-1 h-4 w-4" /> Tous les articles
      </Link>

      <header className="mt-6">
        {post.category && (
          <span className="inline-block rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
            {blogCategoryLabels[post.category]}
          </span>
        )}
        <h1
          className="mt-4 text-3xl font-bold leading-tight md:text-4xl"
          style={{ fontFamily: 'var(--font-roena)', fontWeight: 400 }}
        >
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span>{formatDate(post.published_at)}</span>
          <span aria-hidden>·</span>
          <span>{post.reading_time} min de lecture</span>
          {post.author_name && (
            <>
              <span aria-hidden>·</span>
              <span>Par {post.author_name}</span>
            </>
          )}
        </div>
      </header>

      {post.cover_image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.cover_image_url}
          alt={post.title}
          className="mt-8 aspect-video w-full rounded-2xl border object-cover"
        />
      )}

      {post.excerpt && (
        <p className="mt-8 border-l-2 border-black pl-4 text-lg text-muted-foreground">
          {post.excerpt}
        </p>
      )}

      <div
        className="blog-content mt-8"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: post.content || '' }}
      />

      {related.length > 0 && (
        <section className="mt-16 border-t pt-10">
          <h2
            className="mb-6 text-2xl font-bold"
            style={{ fontFamily: 'var(--font-roena)', fontWeight: 400 }}
          >
            À lire aussi
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/blog/${r.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border transition-colors hover:border-black"
              >
                <div className="aspect-video overflow-hidden bg-muted">
                  {r.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={r.cover_image_url}
                      alt={r.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200" />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-1 p-4">
                  <h3 className="text-sm font-semibold leading-snug">{r.title}</h3>
                  <div className="mt-auto pt-2 text-xs text-muted-foreground">
                    {r.reading_time} min
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
