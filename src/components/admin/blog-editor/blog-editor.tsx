'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Upload, X, Eye, Save, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RichTextEditor } from './rich-text-editor';
import {
  blogCategories,
  blogCategoryLabels,
  slugify,
  type BlogCategory,
  type BlogStatus,
} from '@/lib/validations/blog';

export type BlogEditorInitial = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  category: BlogCategory | '';
  status: BlogStatus;
  metaTitle: string;
  metaDescription: string;
  ogImageUrl: string;
};

const EMPTY: BlogEditorInitial = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverImageUrl: '',
  category: '',
  status: 'draft',
  metaTitle: '',
  metaDescription: '',
  ogImageUrl: '',
};

export function BlogEditor({
  mode,
  postId,
  initial,
}: {
  mode: 'create' | 'edit';
  postId?: string;
  initial?: BlogEditorInitial;
}) {
  const router = useRouter();
  const start = initial ?? EMPTY;

  const [title, setTitle] = useState(start.title);
  const [slug, setSlug] = useState(start.slug);
  // In create mode, keep the slug synced to the title until the user edits it by hand.
  const [slugLocked, setSlugLocked] = useState(mode === 'edit' || !!start.slug);
  const [excerpt, setExcerpt] = useState(start.excerpt);
  const [content, setContent] = useState(start.content);
  const [coverImageUrl, setCoverImageUrl] = useState(start.coverImageUrl);
  const [category, setCategory] = useState<BlogCategory | ''>(start.category);
  const [metaTitle, setMetaTitle] = useState(start.metaTitle);
  const [metaDescription, setMetaDescription] = useState(start.metaDescription);
  const [submitting, setSubmitting] = useState<BlogStatus | null>(null);
  const [coverUploading, setCoverUploading] = useState(false);

  const coverInputRef = useRef<HTMLInputElement>(null);

  const onTitleChange = (v: string) => {
    setTitle(v);
    if (!slugLocked) setSlug(slugify(v));
  };

  const onCoverPick = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setCoverUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/blog/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Upload failed');
      setCoverImageUrl(json.url);
      toast.success('Image de couverture ajoutée');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Échec de l'envoi");
    } finally {
      setCoverUploading(false);
    }
  }, []);

  const submit = async (status: BlogStatus) => {
    if (!title.trim()) {
      toast.error('Le titre est requis');
      return;
    }
    if (!slug.trim()) {
      toast.error('Le slug est requis');
      return;
    }
    setSubmitting(status);
    try {
      const payload = {
        title: title.trim(),
        slug: slug.trim(),
        locale: 'fr' as const,
        excerpt: excerpt.trim(),
        content,
        coverImageUrl,
        category: category || undefined,
        status,
        metaTitle: metaTitle.trim(),
        metaDescription: metaDescription.trim(),
        ogImageUrl: '',
      };

      const res = await fetch(
        mode === 'create' ? '/api/blog' : `/api/blog/${postId}`,
        {
          method: mode === 'create' ? 'POST' : 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Erreur');

      toast.success(
        status === 'published' ? 'Article publié' : 'Brouillon enregistré'
      );
      router.push('/admin/blog');
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur');
      setSubmitting(null);
    }
  };

  const metaTitlePreview = metaTitle.trim() || title.trim() || 'Titre de la page';
  const metaDescPreview =
    metaDescription.trim() || excerpt.trim() || 'Description qui apparaîtra sur Google…';

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main column */}
        <div className="space-y-5">
          <div>
            <Label htmlFor="title" className="mb-1.5">
              Titre <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Ex : Les 10 cartes Pokémon les plus chères en 2026"
              className="text-lg"
            />
          </div>

          <div>
            <Label htmlFor="slug" className="mb-1.5">
              Slug (URL) <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">/blog/</span>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => {
                  setSlugLocked(true);
                  setSlug(slugify(e.target.value));
                }}
                placeholder="cartes-pokemon-plus-cheres-2026"
              />
            </div>
          </div>

          <div>
            <Label className="mb-1.5">Contenu</Label>
            <RichTextEditor value={content} onChange={setContent} />
          </div>
        </div>

        {/* Sidebar column */}
        <div className="space-y-5">
          <div className="rounded-lg border p-4">
            <div className="mb-3 text-sm font-semibold">Publication</div>
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                onClick={() => submit('published')}
                disabled={submitting !== null}
                className="bg-black hover:bg-black/90"
              >
                {submitting === 'published' ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                {mode === 'edit' && start.status === 'published'
                  ? 'Mettre à jour'
                  : 'Publier'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => submit('draft')}
                disabled={submitting !== null}
              >
                {submitting === 'draft' ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Enregistrer le brouillon
              </Button>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <Label className="mb-1.5">Catégorie</Label>
            <Select
              value={category || undefined}
              onValueChange={(v) => setCategory(v as BlogCategory)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choisir…" />
              </SelectTrigger>
              <SelectContent>
                {blogCategories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {blogCategoryLabels[c]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border p-4">
            <Label className="mb-2">Image de couverture</Label>
            {coverImageUrl ? (
              <div className="group relative overflow-hidden rounded-md border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverImageUrl}
                  alt="Couverture"
                  className="aspect-video w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setCoverImageUrl('')}
                  className="absolute right-2 top-2 rounded-full bg-black/70 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  title="Retirer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                disabled={coverUploading}
                className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed text-sm text-muted-foreground transition-colors hover:border-black hover:text-foreground"
              >
                {coverUploading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    Ajouter une image
                  </>
                )}
              </button>
            )}
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onCoverPick}
            />
          </div>
        </div>
      </div>

      {/* Excerpt + SEO */}
      <div className="space-y-5 rounded-lg border p-5">
        <div className="text-sm font-semibold">Référencement (SEO)</div>

        <div>
          <Label htmlFor="excerpt" className="mb-1.5">
            Extrait / chapô
          </Label>
          <Textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Résumé court affiché dans la liste des articles et utilisé par défaut comme description SEO."
            rows={2}
            maxLength={320}
          />
          <div className="mt-1 text-right text-xs text-muted-foreground">
            {excerpt.length}/320
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="metaTitle" className="mb-1.5">
              Titre SEO (meta title)
            </Label>
            <Input
              id="metaTitle"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="Laisser vide = titre de l'article"
              maxLength={70}
            />
            <div className="mt-1 text-right text-xs text-muted-foreground">
              {metaTitle.length}/70
            </div>
          </div>
          <div>
            <Label htmlFor="metaDescription" className="mb-1.5">
              Description SEO (meta description)
            </Label>
            <Input
              id="metaDescription"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Laisser vide = extrait"
              maxLength={180}
            />
            <div className="mt-1 text-right text-xs text-muted-foreground">
              {metaDescription.length}/180
            </div>
          </div>
        </div>

        {/* Google preview */}
        <div className="rounded-md border bg-muted/20 p-4">
          <div className="mb-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Eye className="h-3.5 w-3.5" /> Aperçu Google
          </div>
          <div className="truncate text-sm text-[#1a0dab]">{metaTitlePreview}</div>
          <div className="text-xs text-[#006621]">
            cartattac.fr › blog › {slug || 'slug'}
          </div>
          <div className="line-clamp-2 text-sm text-[#545454]">{metaDescPreview}</div>
        </div>
      </div>
    </div>
  );
}
