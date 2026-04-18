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

const TITLE_COLORS = [
  '#FFD2EA',
  '#FFC2DF',
  '#FFA4D4',
  '#FFCC99',
  '#FFE98A',
  '#79E8B3',
  '#B3FFC7',
  '#BBEFFF',
  '#99E2FF',
  '#80B1FF',
  '#C5C5FF',
  '#A4A4F4',
];

function HomePageContent() {
  const t = useTranslations('home');

  const title = t('mainTitle');
  const chars = [...title];
  const letterIndices = chars
    .map((c, i) => (c === ' ' ? -1 : i))
    .filter((i) => i !== -1);
  const shuffled = [...letterIndices].sort(() => Math.random() - 0.5);
  const colorByIndex = new Map<number, string>();
  shuffled.forEach((idx, k) => {
    if (k < TITLE_COLORS.length) colorByIndex.set(idx, TITLE_COLORS[k]);
  });

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="mx-auto w-full max-w-6xl text-center">
          {/* Main Title */}
          <h1
            className="mb-8 text-xl font-black uppercase md:text-3xl lg:text-8xl"
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
                const color = colorByIndex.get(i) ?? '#000000';
                return (
                  <span key={i} style={{ color }}>
                    {char}
                  </span>
                );
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
          <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-6">
            <Button
              asChild
              size="lg"
              className="min-w-[200px] rounded-full bg-[#C5C5FF] px-8 py-6 text-base font-black uppercase text-black hover:bg-[#C5C5FF]/80 md:min-w-[280px] md:px-10 md:py-7 md:text-lg"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              <Link href="/services">{t('cta.services')}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="min-w-[200px] rounded-full bg-[#FFCC99] px-8 py-6 text-base font-black uppercase text-black hover:bg-[#FFCC99]/80 md:min-w-[280px] md:px-10 md:py-7 md:text-lg"
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
