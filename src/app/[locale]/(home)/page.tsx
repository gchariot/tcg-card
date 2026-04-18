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

  const title = t('mainTitle');
  const chars = [...title];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="mx-auto w-full max-w-6xl text-center">
          {/* Main Title */}
          <h1
            className="mb-8 text-4xl font-black uppercase md:text-6xl lg:text-8xl"
            style={{
              fontFamily: 'var(--font-roena)',
              fontWeight: 400,
              letterSpacing: '0.02em',
            }}
          >
            {(() => {
              let firstSpaceSeen = false;
              return chars.map((char, i) => {
                if (char === ' ') {
                  if (!firstSpaceSeen) {
                    firstSpaceSeen = true;
                    return <br key={i} />;
                  }
                  return <span key={i}>{'\u00A0'}</span>;
                }
                return <span key={i}>{char}</span>;
              });
            })()}
          </h1>

          {/* Subtitle - Single line */}
          <p
            className="mx-auto mb-6 text-sm leading-relaxed md:text-base"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            {t('description')}
          </p>

          {/* Explanation - Two lines */}
          <p
            className="mx-auto mb-12 max-w-6xl text-sm leading-relaxed md:text-base"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            {t('explanation')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-3 lg:gap-4">
            <Button
              asChild
              className="h-auto rounded-full bg-[#C5C5FF] px-4 py-2.5 text-xs font-black uppercase text-black hover:bg-[#C5C5FF]/80 md:px-5 md:py-3 md:text-sm lg:px-6 lg:py-3.5 lg:text-base"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              <Link href="/services">{t('cta.services')}</Link>
            </Button>
            <Button
              asChild
              className="h-auto rounded-full bg-[#B3FFC7] px-4 py-2.5 text-xs font-black uppercase text-black hover:bg-[#B3FFC7]/80 md:px-5 md:py-3 md:text-sm lg:px-6 lg:py-3.5 lg:text-base"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              <Link href="/methodologie">{t('cta.methodology')}</Link>
            </Button>
            <Button
              asChild
              className="h-auto rounded-full bg-[#BED6FF] px-4 py-2.5 text-xs font-black uppercase text-black hover:bg-[#BED6FF]/80 md:px-5 md:py-3 md:text-sm lg:px-6 lg:py-3.5 lg:text-base"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              <Link href="/expertise">{t('cta.whyExpertise')}</Link>
            </Button>
            <Button
              asChild
              className="h-auto rounded-full bg-[#FFCC99] px-4 py-2.5 text-xs font-black uppercase text-black hover:bg-[#FFCC99]/80 md:px-5 md:py-3 md:text-sm lg:px-6 lg:py-3.5 lg:text-base"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              <Link href="/pros-collectionneurs">{t('cta.expertises')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Separator Line */}
      <div className="border-t-2 border-black" />
    </div>
  );
}
