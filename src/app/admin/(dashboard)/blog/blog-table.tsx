'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2, Loader2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { blogCategoryLabels, type BlogCategory } from '@/lib/validations/blog';

export type BlogRow = {
  id: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  title: string;
  slug: string;
  category: BlogCategory | null;
  status: 'draft' | 'published';
  cover_image_url: string | null;
  author_name: string | null;
  author_email: string;
};

function StatusBadge({ status }: { status: 'draft' | 'published' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        status === 'published'
          ? 'bg-green-100 text-green-700'
          : 'bg-amber-100 text-amber-700'
      )}
    >
      {status === 'published' ? 'Publié' : 'Brouillon'}
    </span>
  );
}

export function BlogTable({ rows }: { rows: BlogRow[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  const onDelete = async (id: string, title: string) => {
    if (!confirm(`Supprimer l'article « ${title} » ? Action irréversible.`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
      toast.success('Article supprimé');
      router.refresh();
    } catch {
      toast.error('Erreur lors de la suppression');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-xs uppercase text-muted-foreground">
            <th className="px-4 py-3 font-medium">Article</th>
            <th className="px-4 py-3 font-medium">Catégorie</th>
            <th className="px-4 py-3 font-medium">Statut</th>
            <th className="px-4 py-3 font-medium">Modifié</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b last:border-0 hover:bg-muted/30">
              <td className="px-4 py-3">
                <Link
                  href={`/admin/blog/${r.id}/modifier`}
                  className="flex items-center gap-3"
                >
                  {r.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={r.cover_image_url}
                      alt=""
                      className="h-10 w-16 rounded border object-cover"
                    />
                  ) : (
                    <div className="h-10 w-16 rounded border bg-muted/40" />
                  )}
                  <div className="min-w-0">
                    <div className="truncate font-medium">{r.title}</div>
                    <div className="truncate text-xs text-muted-foreground">
                      /blog/{r.slug}
                    </div>
                  </div>
                </Link>
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {r.category ? blogCategoryLabels[r.category] : '—'}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={r.status} />
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {new Date(r.updated_at).toLocaleDateString('fr-FR')}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  {r.status === 'published' && (
                    <a
                      href={`/blog/${r.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      title="Voir en ligne"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  <Link
                    href={`/admin/blog/${r.id}/modifier`}
                    title="Modifier"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => onDelete(r.id, r.title)}
                    disabled={deleting === r.id}
                    title="Supprimer"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-red-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                  >
                    {deleting === r.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
