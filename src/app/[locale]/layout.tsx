import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: 'KAMI - Expertise professionnelle cartes TCG',
    en: 'KAMI - Professional TCG Card Expertise',
  };

  const descriptions: Record<string, string> = {
    fr: 'Expertise professionnelle pour cartes à collectionner TCG. Pokémon, One Piece, Dragon Ball, Magic, Lorcana. Authentification, évaluation, assurance.',
    en: 'Professional expertise for collectible trading cards. Pokémon, One Piece, Dragon Ball, Magic, Lorcana. Authentication, valuation, insurance.',
  };

  return {
    title: {
      template: `%s | KAMI`,
      default: titles[locale] || titles.fr,
    },
    description: descriptions[locale] || descriptions.fr,
    keywords: [
      'expertise carte',
      'carte pokemon',
      'TCG',
      'authentification carte',
      'évaluation collection',
      'assurance carte collection',
    ],
    authors: [{ name: 'KAMI' }],
    creator: 'KAMI',
    metadataBase: new URL('https://kami.fr'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: '/fr',
        en: '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_GB',
      alternateLocale: locale === 'fr' ? 'en_GB' : 'fr_FR',
      siteName: 'KAMI',
      title: titles[locale] || titles.fr,
      description: descriptions[locale] || descriptions.fr,
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale] || titles.fr,
      description: descriptions[locale] || descriptions.fr,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as 'fr' | 'en')) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the locale
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="relative flex min-h-screen flex-col">{children}</div>
    </NextIntlClientProvider>
  );
}
