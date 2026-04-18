import { ContactForm } from '@/components/forms';
import { Footer } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MapPin } from 'lucide-react';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contactez KAMI pour une demande de devis ou toute question sur nos services d\'expertise de cartes à collectionner.',
};

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'contact@kami.fr',
    description: 'Réponse sous 48h',
  },
  {
    icon: MapPin,
    title: 'Zone d\'intervention',
    value: 'France • Belgique • Suisse',
    description: 'Déplacement à domicile uniquement',
  },
];

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
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
            Contactez-nous
          </h1>
          <p className="mx-auto max-w-2xl text-lg">
            Demandez un devis gratuit ou posez-nous vos questions. Nous vous répondons sous 48h.
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2
                className="text-2xl font-bold"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                Informations de contact
              </h2>
              {contactInfo.map((info) => (
                <Card key={info.title}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{info.title}</CardTitle>
                        <CardDescription>{info.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">{info.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Prise de contact</CardTitle>
                  <CardDescription>
                    Remplissez ce formulaire pour nous joindre. Nous vous répondons sous 48h.
                  </CardDescription>
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
