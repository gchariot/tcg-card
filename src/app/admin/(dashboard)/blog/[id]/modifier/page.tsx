import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound, redirect } from 'next/navigation';
import { auth } from '@/auth';
import { supabaseAdmin } from '@/lib/supabase/server';
import {
  BlogEditor,
  type BlogEditorInitial,
} from '@/components/admin/blog-editor/blog-editor';
import type { BlogCategory } from '@/lib/validations/blog';

export const dynamic = 'force-dynamic';

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.email) {
    redirect('/admin/login');
  }

  const { id } = await params;

  const { data: post, error } = await supabaseAdmin
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !post) {
    notFound();
  }

  const initial: BlogEditorInitial = {
    title: post.title ?? '',
    slug: post.slug ?? '',
    excerpt: post.excerpt ?? '',
    content: post.content ?? '',
    coverImageUrl: post.cover_image_url ?? '',
    category: (post.category as BlogCategory) ?? '',
    status: post.status === 'published' ? 'published' : 'draft',
    metaTitle: post.meta_title ?? '',
    metaDescription: post.meta_description ?? '',
    ogImageUrl: post.og_image_url ?? '',
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/blog"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Retour
        </Link>
        {post.status === 'published' && (
          <a
            href={`/blog/${post.slug}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Voir en ligne ↗
          </a>
        )}
      </div>

      <h1
        className="text-3xl font-bold uppercase"
        style={{ fontFamily: 'var(--font-roena)', fontWeight: 400 }}
      >
        Modifier l&apos;article
      </h1>

      <BlogEditor mode="edit" postId={id} initial={initial} />
    </div>
  );
}
