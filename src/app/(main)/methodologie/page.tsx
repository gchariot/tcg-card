import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Search,
  ShieldCheck,
  ClipboardCheck,
  Gem,
  TrendingUp,
  Calculator,
  ArrowRight,
  CheckCircle,
  FileText,
  Camera,
  Award,
  BookOpen,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Méthodologie',
  description:
    "Notre méthodologie d'expertise en 6 étapes : identification, authentification, évaluation de l'état, analyse de la rareté, analyse du marché, et détermination des valeurs.",
};

const steps = [
  {
    number: 1,
    icon: Search,
    title: 'Identification',
    description:
      "Identification précise de la carte : nom, édition, numéro, langue, variante. Vérification dans les bases de données officielles.",
    details: [
      'Référencement dans les bases officielles',
      'Identification des variantes (1ère édition, holo, reverse...)',
      'Vérification de la langue et du marché d\'origine',
    ],
  },
  {
    number: 2,
    icon: ShieldCheck,
    title: 'Authentification',
    description:
      "Analyse technique visant à confirmer l'authenticité de la carte et à détecter d'éventuelles contrefaçons.",
    details: [
      'Analyse de la trame d\'impression',
      'Contrôle sous lumière UV',
      'Comparaison avec exemplaires authentiques',
      'Vérification des textures et finitions',
    ],
  },
  {
    number: 3,
    icon: ClipboardCheck,
    title: 'Évaluation de l\'état',
    description:
      "Examen minutieux de l'état de conservation selon les standards internationaux (centering, surface, edges, corners).",
    details: [
      'Centrage (centering)',
      'État de surface (surface)',
      'État des bords (edges)',
      'État des coins (corners)',
    ],
  },
  {
    number: 4,
    icon: Gem,
    title: 'Analyse de la rareté',
    description:
      "Évaluation de la rareté de la carte en fonction de son tirage, de sa distribution et de sa disponibilité sur le marché.",
    details: [
      'Tirage et distribution',
      'Cartes promotionnelles et événements',
      'Disponibilité sur le marché secondaire',
      'Historique des ventes',
    ],
  },
  {
    number: 5,
    icon: TrendingUp,
    title: 'Analyse du marché',
    description:
      "Étude des transactions récentes et des tendances de marché pour établir une fourchette de prix réaliste.",
    details: [
      'Analyse des ventes récentes',
      'Comparaison des plateformes (eBay, Cardmarket...)',
      'Tendances de marché',
      'Impact de l\'actualité TCG',
    ],
  },
  {
    number: 6,
    icon: Calculator,
    title: 'Détermination des valeurs',
    description:
      "Établissement des différentes valeurs : valeur de marché, valeur de remplacement pour assurance, valeur à neuf.",
    details: [
      'Valeur de marché actuelle',
      'Valeur de remplacement (assurance)',
      'Fourchette de prix justifiée',
      'Recommandations',
    ],
  },
];

const deliverables = [
  {
    icon: FileText,
    title: 'Rapport d\'expertise',
    description: 'Document complet incluant méthodologie, analyses détaillées et conclusions.',
  },
  {
    icon: Camera,
    title: 'Documentation photo',
    description: 'Photos haute résolution de chaque carte, recto/verso, avec détails.',
  },
  {
    icon: Award,
    title: 'Certificat officiel',
    description: 'Attestation officielle avec numéro unique et signature de l\'expert.',
  },
  {
    icon: BookOpen,
    title: 'Inventaire valorisé',
    description: 'Liste exhaustive avec identification, état et valeur de chaque pièce.',
  },
];

const guarantees = [
  {
    title: 'Indépendance',
    description: 'Aucun conflit d\'intérêt : nous n\'achetons ni ne vendons de cartes.',
  },
  {
    title: 'Objectivité',
    description: 'Analyse basée sur des critères mesurables et des données de marché.',
  },
  {
    title: 'Transparence',
    description: 'Méthodologie documentée et justification de chaque conclusion.',
  },
  {
    title: 'Confidentialité',
    description: 'Vos informations et la composition de votre collection restent strictement confidentielles.',
  },
];

export default function MethodologiePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="border-b bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Notre méthodologie</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Une approche rigoureuse en 6 étapes pour une expertise fiable et documentée
            de vos cartes à collectionner.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex flex-col gap-8 lg:flex-row lg:items-start ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                      {step.number}
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h2 className="mb-3 text-2xl font-bold">{step.title}</h2>
                  <p className="mb-4 text-muted-foreground">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <div className="h-48 w-full max-w-sm rounded-xl bg-muted/50" />
                </div>
              </div>
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
              <Card key={item.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Nos engagements
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((guarantee) => (
              <div key={guarantee.title} className="text-center">
                <h3 className="mb-2 text-xl font-semibold">{guarantee.title}</h3>
                <p className="text-muted-foreground">{guarantee.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Convaincu par notre approche ?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Contactez-nous pour discuter de votre projet d'expertise.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">
              Demander un devis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
