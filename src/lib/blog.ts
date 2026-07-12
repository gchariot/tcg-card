import 'server-only';
import { supabaseAdmin } from '@/lib/supabase/server';
import type { BlogCategory } from '@/lib/validations/blog';

export type BlogPostRecord = {
  id: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  locale: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  category: BlogCategory | null;
  status: 'draft' | 'published';
  reading_time: number;
  meta_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
  author_name: string | null;
  author_email: string;
};

export type BlogListItem = Pick<
  BlogPostRecord,
  | 'id'
  | 'slug'
  | 'title'
  | 'excerpt'
  | 'cover_image_url'
  | 'category'
  | 'reading_time'
  | 'published_at'
  | 'author_name'
>;

const LIST_FIELDS =
  'id, slug, title, excerpt, cover_image_url, category, reading_time, published_at, author_name';

/** Published posts for a locale, most recent first. */
export async function getPublishedPosts(locale: string): Promise<BlogListItem[]> {
  const { data, error } = await supabaseAdmin
    .from('blog_posts')
    .select(LIST_FIELDS)
    .eq('locale', locale)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(200);

  if (error) {
    console.error('[blog] getPublishedPosts error:', error.message);
    return [];
  }
  return (data ?? []) as BlogListItem[];
}

/** A single published post by slug, or null. */
export async function getPostBySlug(
  locale: string,
  slug: string
): Promise<BlogPostRecord | null> {
  const { data, error } = await supabaseAdmin
    .from('blog_posts')
    .select('*')
    .eq('locale', locale)
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (error) {
    console.error('[blog] getPostBySlug error:', error.message);
    return null;
  }
  return (data as BlogPostRecord) ?? null;
}

/** Up to `limit` other published posts (for the "related" section). */
export async function getRelatedPosts(
  locale: string,
  excludeId: string,
  category: BlogCategory | null,
  limit = 3
): Promise<BlogListItem[]> {
  let query = supabaseAdmin
    .from('blog_posts')
    .select(LIST_FIELDS)
    .eq('locale', locale)
    .eq('status', 'published')
    .neq('id', excludeId)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (category) query = query.eq('category', category);

  const { data } = await query;
  const rows = (data ?? []) as BlogListItem[];

  // Backfill with any recent posts if the category didn't yield enough.
  if (rows.length < limit) {
    const { data: fill } = await supabaseAdmin
      .from('blog_posts')
      .select(LIST_FIELDS)
      .eq('locale', locale)
      .eq('status', 'published')
      .neq('id', excludeId)
      .order('published_at', { ascending: false })
      .limit(limit + 1);
    const seen = new Set(rows.map((r) => r.id));
    for (const r of (fill ?? []) as BlogListItem[]) {
      if (rows.length >= limit) break;
      if (!seen.has(r.id)) rows.push(r);
    }
  }
  return rows;
}
