import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { blogPostSchema, readingTimeFromHtml } from '@/lib/validations/blog';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = blogPostSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const d = parsed.data;
    const publishedAt = d.status === 'published' ? new Date().toISOString() : null;

    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .insert({
        author_email: session.user.email,
        author_name: session.user.name ?? null,
        locale: d.locale,
        slug: d.slug,
        title: d.title,
        excerpt: d.excerpt || null,
        content: d.content || null,
        cover_image_url: d.coverImageUrl || null,
        category: d.category ?? null,
        status: d.status,
        published_at: publishedAt,
        reading_time: readingTimeFromHtml(d.content || ''),
        meta_title: d.metaTitle || null,
        meta_description: d.metaDescription || null,
        og_image_url: d.ogImageUrl || null,
      })
      .select('id')
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Un article avec ce slug existe déjà.' },
          { status: 409 }
        );
      }
      console.error('[blog] db error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (err) {
    console.error('[blog] route error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
