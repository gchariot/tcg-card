import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { pageAlternates } from '@/lib/seo';
import { MethodologyPageContent } from './methodology-content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Méthodologie',
    description:
      "Notre méthodologie d'expertise en 6 étapes : identification, authentification, évaluation de l'état, analyse de la rareté, analyse du marché, et détermination des valeurs.",
    alternates: pageAlternates(locale, '/methodologie'),
  };
}

export default async function MethodologiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MethodologyPageContent />;
}
