import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { pageAlternates } from '@/lib/seo';
import { ServicesPageContent } from './services-content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Nos Services',
    description:
      "Découvrez nos services d'expertise pour cartes à collectionner : expertise individuelle, inventaire, évaluation assurance, expertise sinistre, authentification.",
    alternates: pageAlternates(locale, '/services'),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ServicesPageContent />;
}
