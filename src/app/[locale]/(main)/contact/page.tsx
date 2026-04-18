import { ContactForm } from '@/components/forms';
import { Footer } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <div
      className="flex flex-1 flex-col bg-[#79E8B3]"
      style={{ fontFamily: 'var(--font-poppins)' }}
    >
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1
            className="mb-4 text-4xl font-bold md:text-5xl"
            style={{ fontFamily: 'var(--font-roena)', fontWeight: 400 }}
          >
            {t('title')}
          </h1>
          <p className="mx-auto max-w-2xl text-lg">{t('subtitle')}</p>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-6">
              <h2
                className="text-2xl font-bold"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                {t('info.title')}
              </h2>
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{t('info.area.title')}</CardTitle>
                      <CardDescription>{t('info.area.description')}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{t('info.area.value')}</p>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t('form.title')}</CardTitle>
                  <CardDescription>{t('form.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
