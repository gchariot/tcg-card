import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { blogPostSchema, readingTimeFromHtml } from '@/lib/validations/blog';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

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

    // Preserve the original publish date once set; stamp it the first time it goes live.
    const { data: existing } = await supabaseAdmin
      .from('blog_posts')
      .select('published_at')
      .eq('id', id)
      .single();

    let publishedAt: string | null = existing?.published_at ?? null;
    if (d.status === 'published' && !publishedAt) {
      publishedAt = new Date().toISOString();
    }

    const { error } = await supabaseAdmin
      .from('blog_posts')
      .update({
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
      .eq('id', id);

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Un article avec ce slug existe déjà.' },
          { status: 409 }
        );
      }
      console.error('[blog] update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error('[blog] update route error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const { error } = await supabaseAdmin.from('blog_posts').delete().eq('id', id);

  if (error) {
    console.error('[blog] delete error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
