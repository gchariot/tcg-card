import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomePageContent />;
}

function HomePageContent() {
  const t = useTranslations('home');

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="mx-auto w-full max-w-6xl text-center">
          {/* Main Title */}
          <h1
            className="mb-8 text-4xl font-black uppercase md:text-5xl lg:text-6xl"
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 900,
              letterSpacing: '0.02em',
            }}
          >
            {t('mainTitle')}
          </h1>

          {/* Subtitle - Single line */}
          <p
            className="mx-auto mb-6 text-sm leading-relaxed md:text-base"
            style={{
              fontFamily: '"Courier New", Courier, monospace',
            }}
          >
            {t('description')}
          </p>

          {/* Explanation - Two lines */}
          <p
            className="mx-auto mb-12 max-w-6xl text-sm leading-relaxed md:text-base"
            style={{
              fontFamily: '"Courier New", Courier, monospace',
            }}
          >
            {t('explanation')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-6">
            <Button
              asChild
              size="lg"
              className="min-w-[200px] rounded-full bg-black px-8 py-6 text-base font-black uppercase text-white hover:bg-black/90 md:min-w-[280px] md:px-10 md:py-7 md:text-lg"
            >
              <Link href="/services">{t('cta.services')}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="min-w-[200px] rounded-full bg-black px-8 py-6 text-base font-black uppercase text-white hover:bg-black/90 md:min-w-[280px] md:px-10 md:py-7 md:text-lg"
            >
              <Link href="/particuliers">{t('cta.expertises')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Separator Line */}
      <div className="border-t-2 border-black" />
    </div>
  );
}
