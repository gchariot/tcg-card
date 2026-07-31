import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { pageAlternates } from '@/lib/seo';
import { ProsCollectionneursContent } from './pros-collectionneurs-content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Professionnels & Collectionneurs',
    description:
      "Expertise pour particuliers et professionnels : collectionneurs, assurances, notaires, maisons de vente, boutiques TCG.",
    alternates: pageAlternates(locale, '/pros-collectionneurs'),
  };
}

export default async function ProsCollectionneursPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProsCollectionneursContent />;
}
