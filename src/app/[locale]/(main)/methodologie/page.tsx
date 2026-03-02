import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { MethodologyPageContent } from './methodology-content';

export const metadata: Metadata = {
  title: 'Méthodologie',
  description:
    "Notre méthodologie d'expertise en 6 étapes : identification, authentification, évaluation de l'état, analyse de la rareté, analyse du marché, et détermination des valeurs.",
};

export default async function MethodologiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MethodologyPageContent />;
}
