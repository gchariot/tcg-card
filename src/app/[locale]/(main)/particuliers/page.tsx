import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Shield,
  AlertTriangle,
  ScrollText,
  TrendingUp,
  ShoppingCart,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Particuliers',
  description:
    "Services d'expertise pour collectionneurs et investisseurs. Évaluation, authentification et assurance de vos cartes à collectionner.",
};

const useCases = [
  {
    icon: Shield,
    title: 'Assurance de votre collection',
    description:
      "Obtenez une évaluation documentée acceptée par les compagnies d'assurance pour protéger correctement vos cartes.",
  },
  {
    icon: AlertTriangle,
    title: 'Expertise après sinistre',
    description:
      "En cas de vol, incendie ou dégât des eaux, nous établissons la valeur des biens pour faciliter l'indemnisation.",
  },
  {
    icon: ScrollText,
    title: 'Succession et héritage',
    description:
      'Inventaire et valorisation de collection dans le cadre de successions, partages ou donations.',
  },
  {
    icon: TrendingUp,
    title: 'Valorisation patrimoniale',
    description:
      'Intégrez votre collection à votre patrimoine global avec une évaluation professionnelle et documentée.',
  },
  {
    icon: ShoppingCart,
    title: 'Achat ou vente',
    description:
      "Sécurisez vos transactions avec une authentification et une estimation de valeur avant achat ou vente.",
  },
];

const benefits = [
  'Méthodologie rigoureuse en 6 étapes',
  'Indépendance totale (aucune vente de cartes)',
  'Rapport détaillé et documenté',
  'Expertise multi-TCG (Pokémon, One Piece, Dragon Ball, Magic, Lorcana)',
  'Analyse basée sur les données de marché actuelles',
  'Certificat officiel pour vos démarches',
];

const faq = [
  {
    question: 'Comment se déroule une expertise ?',
    answer:
      "L'expertise suit notre méthodologie en 6 étapes : identification de la carte, authentification, évaluation de l'état, analyse de la rareté, analyse du marché, et détermination des valeurs. Vous recevez un rapport complet à l'issue du processus.",
  },
  {
    question: 'Combien de cartes puis-je faire expertiser ?',
    answer:
      "Nous proposons des expertises individuelles pour une carte précieuse comme des inventaires complets pour des collections de plusieurs centaines de cartes. Le tarif est adapté au volume.",
  },
  {
    question: "Mon assurance acceptera-t-elle votre expertise ?",
    answer:
      "Oui, nos rapports sont conçus pour être acceptés par les compagnies d'assurance. Ils contiennent toutes les informations nécessaires : identification précise, état documenté, et valeur de remplacement justifiée.",
  },
  {
    question: 'Quels TCG expertisez-vous ?',
    answer:
      'Nous couvrons les principaux jeux de cartes à collectionner : Pokémon, One Piece, Dragon Ball, Magic: The Gathering, et Disney Lorcana.',
  },
  {
    question: 'Combien coûte une expertise ?',
    answer:
      "Le tarif dépend du type de prestation (carte individuelle, collection, urgence) et du volume. Contactez-nous pour un devis personnalisé et gratuit.",
  },
  {
    question: 'Dois-je envoyer mes cartes ?',
    answer:
      "Selon le type d'expertise, nous pouvons nous déplacer ou vous demander d'envoyer vos cartes de manière sécurisée. Les modalités sont définies lors de l'établissement du devis.",
  },
  {
    question: 'Quelle est la différence entre expertise et grading ?',
    answer:
      "Le grading (PSA, BGS) certifie l'état et l'authenticité d'une carte dans un boîtier scellé. Notre expertise fournit une analyse complète avec valeur de marché, idéale pour l'assurance, la succession ou la vente, sans modification physique de la carte.",
  },
];

export default function ParticuliersPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="border-b bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Expertise pour collectionneurs
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Vous êtes collectionneur ou investisseur ? Faites évaluer vos cartes par un expert
            indépendant pour les assurer, les vendre ou les intégrer à votre patrimoine.
          </p>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Dans quels cas faire appel à nous ?
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((useCase) => (
              <Card key={useCase.title}>
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <useCase.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{useCase.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">
              Pourquoi choisir CARTATTAC ?
            </h2>
            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Questions fréquentes
          </h2>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faq.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Prêt à faire expertiser votre collection ?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Demandez un devis gratuit et sans engagement. Nous vous recontactons sous 48h.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">
              Demander un devis gratuit
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
