import { z } from 'zod';

export const blogCategories = [
  'pokemon',
  'onepiece',
  'dragonball',
  'magic',
  'lorcana',
  'yugioh',
  'marche',
  'guides',
  'actualites',
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export const blogCategoryLabels: Record<BlogCategory, string> = {
  pokemon: 'Pokémon',
  onepiece: 'One Piece',
  dragonball: 'Dragon Ball',
  magic: 'Magic',
  lorcana: 'Lorcana',
  yugioh: 'Yu-Gi-Oh!',
  marche: 'Marché',
  guides: "Guides d'expertise",
  actualites: 'Actualités',
};

export const blogStatuses = ['draft', 'published'] as const;
export type BlogStatus = (typeof blogStatuses)[number];

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const blogPostSchema = z.object({
  title: z.string().trim().min(1, 'Le titre est requis').max(200),
  slug: z
    .string()
    .trim()
    .min(1, 'Le slug est requis')
    .max(200)
    .regex(slugRegex, 'Slug invalide (minuscules, chiffres et tirets uniquement)'),
  locale: z.enum(['fr', 'en']).default('fr'),
  excerpt: z.string().trim().max(320).optional().default(''),
  content: z.string().optional().default(''),
  coverImageUrl: z.string().optional().default(''),
  category: z.enum(blogCategories).optional(),
  status: z.enum(blogStatuses).default('draft'),
  metaTitle: z.string().trim().max(70).optional().default(''),
  metaDescription: z.string().trim().max(180).optional().default(''),
  ogImageUrl: z.string().optional().default(''),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;

/** URL-safe slug from an arbitrary title. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 200);
}

/** Rough reading time in minutes from HTML content (~200 words/min). */
export function readingTimeFromHtml(html: string): number {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text ? text.split(' ').length : 0;
  return Math.max(1, Math.round(words / 200));
}
