import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { pageAlternates } from '@/lib/seo';
import { ExpertiseContent } from './expertise-content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Pourquoi une expertise',
    description:
      "Pourquoi faire expertiser ses cartes à collectionner : protection, assurance, patrimoine, authentification.",
    alternates: pageAlternates(locale, '/expertise'),
  };
}

export default async function ExpertisePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ExpertiseContent />;
}
