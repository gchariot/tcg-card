import { ContactForm } from '@/components/forms';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Clock, MapPin } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contactez CARTATTAC pour une demande de devis ou toute question sur nos services d\'expertise de cartes à collectionner.',
};

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'contact@cartattac.fr',
    description: 'Réponse sous 48h',
  },
  {
    icon: Clock,
    title: 'Horaires',
    value: 'Lun - Ven : 9h - 18h',
    description: 'Hors jours fériés',
  },
  {
    icon: MapPin,
    title: 'Zone d\'intervention',
    value: 'France entière',
    description: 'Déplacement ou envoi sécurisé',
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="border-b bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Contactez-nous</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Demandez un devis gratuit ou posez-nous vos questions. Nous vous répondons sous 48h.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Informations de contact</h2>
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
                  <CardTitle>Demande de devis</CardTitle>
                  <CardDescription>
                    Remplissez ce formulaire pour recevoir un devis personnalisé gratuit et sans
                    engagement.
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
    </div>
  );
}
