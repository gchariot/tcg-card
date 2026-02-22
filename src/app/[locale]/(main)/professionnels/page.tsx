import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Building2,
  Scale,
  Gavel,
  Store,
  FileText,
  ArrowRight,
  CheckCircle,
  Shield,
} from 'lucide-react';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Professionnels',
  description:
    "Services d'expertise pour assurances, notaires, maisons de vente et boutiques spécialisées. Évaluations fiables et documentées.",
};

const professionals = [
  {
    icon: Building2,
    title: 'Assurances et courtiers',
    description:
      "Évaluations pour souscription de contrats, expertise contradictoire en cas de sinistre, détermination des valeurs de remplacement.",
    services: [
      'Évaluation pré-sinistre',
      'Expertise post-sinistre',
      'Valeur de remplacement',
      'Rapport détaillé pour indemnisation',
    ],
  },
  {
    icon: Scale,
    title: 'Notaires et avocats',
    description:
      'Inventaires et valorisations dans le cadre de successions, partages, divorces ou liquidations de patrimoine.',
    services: [
      'Inventaire successoral',
      'Évaluation pour partage',
      'Attestation de valeur',
      'Expertise contradictoire',
    ],
  },
  {
    icon: Gavel,
    title: 'Maisons de vente aux enchères',
    description:
      "Estimations professionnelles pour catalogues de vente, authentification des lots, conseil sur les réserves.",
    services: [
      'Estimation pré-vente',
      'Authentification des lots',
      'Conseil sur les réserves',
      'Description catalogue',
    ],
  },
  {
    icon: Store,
    title: 'Boutiques et marchands TCG',
    description:
      "Authentification de stock, évaluation de rachats de collections, expertise pour transactions importantes.",
    services: [
      'Authentification de stock',
      'Détection de contrefaçons',
      'Évaluation de rachat',
      'Formation équipes',
    ],
  },
];

const deliverables = [
  {
    title: 'Rapport d\'expertise complet',
    description:
      'Document détaillé incluant méthodologie, analyses, photos, et conclusions avec valeurs justifiées.',
  },
  {
    title: 'Certificat d\'authenticité',
    description:
      'Attestation officielle confirmant l\'authenticité des cartes expertisées.',
  },
  {
    title: 'Inventaire valorisé',
    description:
      'Liste exhaustive des pièces avec identification, état, et valeur unitaire et globale.',
  },
  {
    title: 'Documentation photographique',
    description:
      'Photos haute résolution de chaque carte, recto/verso, avec détails pertinents.',
  },
];

const guarantees = [
  'Indépendance totale : aucun conflit d\'intérêt (pas de vente de cartes)',
  'Méthodologie rigoureuse et documentée en 6 étapes',
  'Expertise basée sur les données de marché actualisées',
  'Confidentialité absolue des informations',
  'Délais d\'intervention adaptés à vos contraintes',
  'Interlocuteur unique et disponible',
];

export default async function ProfessionnelsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="border-b bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Expertise pour professionnels
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Assurances, notaires, maisons de vente, boutiques spécialisées : bénéficiez
            d'évaluations fiables et de rapports documentés pour vos activités.
          </p>
        </div>
      </section>

      {/* Professionals */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Domaines d'intervention
          </h2>
          <div className="grid gap-8 lg:grid-cols-2">
            {professionals.map((pro) => (
              <Card key={pro.title} className="flex flex-col">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <pro.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{pro.title}</CardTitle>
                  <CardDescription className="text-base">{pro.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    {pro.services.map((service) => (
                      <li key={service} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="border-y bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Livrables fournis
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {deliverables.map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex items-center justify-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold md:text-4xl">Nos garanties</h2>
            </div>
            <ul className="space-y-4">
              {guarantees.map((guarantee) => (
                <li key={guarantee} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-lg">{guarantee}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Établissons un partenariat
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Discutons de vos besoins spécifiques et de la manière dont nous pouvons
            vous accompagner dans vos activités professionnelles.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">
              Nous contacter
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
