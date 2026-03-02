import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { ProsCollectionneursContent } from './pros-collectionneurs-content';

export const metadata: Metadata = {
  title: 'Professionnels & Collectionneurs',
  description:
    "Expertise pour particuliers et professionnels : collectionneurs, assurances, notaires, maisons de vente, boutiques TCG.",
};

export default async function ProsCollectionneursPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProsCollectionneursContent />;
}
