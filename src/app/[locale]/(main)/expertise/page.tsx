import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { ExpertiseContent } from './expertise-content';

export const metadata: Metadata = {
  title: 'Pourquoi une expertise',
  description:
    "Pourquoi faire expertiser ses cartes à collectionner : protection, assurance, patrimoine, authentification.",
};

export default async function ExpertisePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ExpertiseContent />;
}
