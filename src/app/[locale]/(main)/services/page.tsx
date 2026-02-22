import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Search,
  List,
  Shield,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos Services',
  description:
    "Découvrez nos services d'expertise pour cartes à collectionner : expertise individuelle, inventaire, évaluation assurance, expertise sinistre, authentification.",
};

const services = [
  {
    id: 'expertise-individuelle',
    title: 'Expertise de carte individuelle',
    description:
      "Analyse approfondie de l'authenticité, de l'état et de la valeur de marché d'une carte.",
    details: [
      "Vérification de l'authenticité",
      'Évaluation de la condition selon standards internationaux',
      'Estimation de la valeur de marché',
      'Rapport détaillé et documenté',
    ],
    icon: Search,
  },
  {
    id: 'inventaire-collection',
    title: 'Inventaire et valorisation de collection',
    description:
      'Évaluation structurée des collections, identification des pièces majeures et estimation globale.',
    details: [
      'Inventaire complet de la collection',
      'Identification des pièces à forte valeur',
      'Estimation globale documentée',
      'Classification par catégories',
    ],
    icon: List,
  },
  {
    id: 'evaluation-assurance',
    title: 'Évaluation pour assurance',
    description: 'Estimer la valeur de remplacement pour assurer correctement vos cartes.',
    details: [
      'Valeur de remplacement calculée',
      'Documentation acceptée par les assureurs',
      'Mise à jour périodique possible',
      'Certificat officiel',
    ],
    icon: Shield,
  },
  {
    id: 'expertise-sinistre',
    title: 'Expertise après sinistre',
    description:
      "Intervention suite à vol, perte ou dommage afin d'établir la valeur des biens concernés.",
    details: [
      'Évaluation des pertes',
      'Documentation pour indemnisation',
      'Rapport détaillé pour assurance',
      'Intervention rapide',
    ],
    icon: AlertTriangle,
  },
  {
    id: 'authentification',
    title: 'Authentification et détection de contrefaçons',
    description: 'Analyse technique visant à identifier les faux et sécuriser les transactions.',
    details: [
      "Analyse de la trame d'impression",
      'Contrôle sous lumière UV',
      'Comparaison avec exemplaires authentiques',
      'Certificat d\'authenticité',
    ],
    icon: CheckCircle,
  },
];

const whyExpertise = [
  {
    title: 'Protection contre le vol et les sinistres',
    description:
      "En cas de vol, incendie ou dégât des eaux, une expertise documentée facilite l'indemnisation et permet de prouver la valeur réelle des biens.",
  },
  {
    title: 'Exigence des assurances',
    description:
      "De nombreuses compagnies d'assurance demandent une évaluation préalable pour couvrir correctement les objets de collection.",
  },
  {
    title: 'Valorisation patrimoniale',
    description:
      "Une expertise permet d'établir la valeur réelle de votre collection et de l'intégrer dans votre patrimoine global.",
  },
  {
    title: 'Authentification et sécurité',
    description:
      "Le marché des cartes connaît une hausse des contrefaçons. L'expertise permet d'authentifier les cartes et de sécuriser vos acquisitions.",
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="border-b bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Nos services</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Des prestations adaptées aux collectionneurs comme aux professionnels.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`flex flex-col gap-8 lg:flex-row lg:items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="mb-4 text-2xl font-bold md:text-3xl">{service.title}</h2>
                  <p className="mb-6 text-lg text-muted-foreground">{service.description}</p>
                  <ul className="space-y-2">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2">
                        <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <div className="h-64 w-full max-w-md rounded-xl bg-muted/50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Expertise */}
      <section className="border-t bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Pourquoi une expertise est essentielle ?
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {whyExpertise.map((item) => (
              <Card key={item.title}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Prêt à faire expertiser votre collection ?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Contactez-nous pour obtenir un devis personnalisé. Expertise réalisée en toute
            indépendance et confidentialité.
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
