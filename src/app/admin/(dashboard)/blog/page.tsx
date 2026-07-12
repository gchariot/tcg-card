import Link from 'next/link';
import { Plus, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabaseAdmin } from '@/lib/supabase/server';
import { BlogTable, type BlogRow } from './blog-table';

export const dynamic = 'force-dynamic';

export default async function BlogListPage() {
  const { data: posts, error } = await supabaseAdmin
    .from('blog_posts')
    .select(
      'id, created_at, updated_at, published_at, title, slug, category, status, cover_image_url, author_name, author_email'
    )
    .order('updated_at', { ascending: false })
    .limit(200);

  const rows = (posts ?? []) as BlogRow[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-3xl font-bold"
            style={{ fontFamily: 'var(--font-roena)', fontWeight: 400 }}
          >
            Articles blog
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Rédiger, publier et gérer les articles.
          </p>
        </div>
        <Button asChild className="bg-black hover:bg-black/90">
          <Link href="/admin/blog/nouveau">
            <Plus className="mr-2 h-4 w-4" /> Nouvel article
          </Link>
        </Button>
      </div>

      {error && (
        <Card>
          <CardContent className="py-8 text-center text-sm text-red-600">
            Erreur de chargement : {error.message}
            <div className="mt-2 text-xs text-muted-foreground">
              La table <code>blog_posts</code> existe-t-elle ? Voir{' '}
              <code>supabase/blog_posts.sql</code>.
            </div>
          </CardContent>
        </Card>
      )}

      {!error && rows.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <Newspaper className="h-10 w-10 text-muted-foreground" />
            <div className="text-sm text-muted-foreground">
              Aucun article pour l&apos;instant.
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/blog/nouveau">
                <Plus className="mr-2 h-4 w-4" /> Écrire le premier article
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {!error && rows.length > 0 && (
        <Card>
          <CardContent className="p-0">
            <BlogTable rows={rows} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
