import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { ServicesPageContent } from './services-content';

export const metadata: Metadata = {
  title: 'Nos Services',
  description:
    "Découvrez nos services d'expertise pour cartes à collectionner : expertise individuelle, inventaire, évaluation assurance, expertise sinistre, authentification.",
};

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ServicesPageContent />;
}
