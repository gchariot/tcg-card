import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { pageAlternates } from '@/lib/seo';
import { getPublishedPosts } from '@/lib/blog';
import { blogCategoryLabels } from '@/lib/validations/blog';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Blog',
    description:
      "Actualités, guides et analyses du marché des cartes à collectionner TCG : Pokémon, One Piece, Dragon Ball, Magic, Lorcana. Conseils d'experts par KAMI.",
    alternates: pageAlternates(locale, '/blog'),
  };
}

function formatDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function BlogListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = await getPublishedPosts(locale);
  const [featured, ...rest] = posts;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
      <header className="mb-10 md:mb-14">
        <h1
          className="text-4xl font-bold uppercase md:text-5xl"
          style={{ fontFamily: 'var(--font-roena)', fontWeight: 400 }}
        >
          Le Blog
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Actualités du marché, guides d&apos;expertise et analyses sur les cartes à
          collectionner.
        </p>
      </header>

      {posts.length === 0 && (
        <div className="rounded-xl border border-dashed py-20 text-center text-muted-foreground">
          Les premiers articles arrivent bientôt.
        </div>
      )}

      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group mb-12 grid overflow-hidden rounded-2xl border transition-colors hover:border-black md:grid-cols-2"
        >
          <div className="aspect-video overflow-hidden bg-muted md:aspect-auto">
            {featured.cover_image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={featured.cover_image_url}
                alt={featured.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="h-full min-h-[220px] w-full bg-gradient-to-br from-gray-100 to-gray-200" />
            )}
          </div>
          <div className="flex flex-col justify-center gap-3 p-6 md:p-10">
            {featured.category && (
              <span className="w-fit rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                {blogCategoryLabels[featured.category]}
              </span>
            )}
            <h2
              className="text-2xl font-bold md:text-3xl"
              style={{ fontFamily: 'var(--font-roena)', fontWeight: 400 }}
            >
              {featured.title}
            </h2>
            {featured.excerpt && (
              <p className="line-clamp-3 text-muted-foreground">{featured.excerpt}</p>
            )}
            <div className="mt-1 text-xs text-muted-foreground">
              {formatDate(featured.published_at)} · {featured.reading_time} min de lecture
            </div>
          </div>
        </Link>
      )}

      {rest.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border transition-colors hover:border-black"
            >
              <div className="aspect-video overflow-hidden bg-muted">
                {post.cover_image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200" />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                {post.category && (
                  <span className="text-xs font-medium text-muted-foreground">
                    {blogCategoryLabels[post.category]}
                  </span>
                )}
                <h3
                  className="text-lg font-semibold leading-snug"
                  style={{ fontFamily: 'var(--font-roena)', fontWeight: 400 }}
                >
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                )}
                <div className="mt-auto pt-2 text-xs text-muted-foreground">
                  {formatDate(post.published_at)} · {post.reading_time} min
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
