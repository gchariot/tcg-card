import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

const tcgList = ['Pokémon', 'One Piece', 'Dragon Ball', 'Magic', 'Lorcana'];

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // This is a workaround for Next.js 15+ where params is a Promise
  // We need to use the sync version for server components
  return <HomePageContent />;
}

function HomePageContent() {
  const t = useTranslations('home');

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Hero Section - Takes remaining viewport height */}
      <section className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {t('title')}
            <br />
            {t('titleLine2')}
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {t('subtitle')}
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="min-w-[160px]">
              <Link href="/particuliers">
                {t('cta.individuals')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-[160px]">
              <Link href="/professionnels">{t('cta.professionals')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* TCG List - Fixed at bottom */}
      <section className="border-t py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {tcgList.map((tcg) => (
              <span
                key={tcg}
                className="text-sm font-medium text-muted-foreground md:text-base"
              >
                {tcg}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
