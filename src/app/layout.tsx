import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | CARTATTAC',
    default: 'CARTATTAC - Expertise professionnelle cartes TCG',
  },
  description:
    'Expertise professionnelle pour cartes à collectionner TCG. Pokémon, One Piece, Dragon Ball, Magic, Lorcana. Authentification, évaluation, assurance.',
  keywords: [
    'expertise carte',
    'carte pokemon',
    'TCG',
    'authentification carte',
    'évaluation collection',
    'assurance carte collection',
  ],
  authors: [{ name: 'CARTATTAC' }],
  creator: 'CARTATTAC',
  metadataBase: new URL('https://cartattac.fr'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: 'en_GB',
    siteName: 'CARTATTAC',
    title: 'CARTATTAC - Expertise professionnelle cartes TCG',
    description:
      'Expertise professionnelle pour cartes à collectionner. Méthodologie rigoureuse, analyse objective, totale indépendance.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CARTATTAC - Expertise professionnelle cartes TCG',
    description: 'Expertise professionnelle pour cartes à collectionner TCG.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="relative flex min-h-screen flex-col">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
