import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Target, Heart, Shield, Eye } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos',
  description:
    "Découvrez CARTATTAC, notre histoire, nos valeurs et notre équipe d'experts passionnés par les cartes à collectionner.",
};

const values = [
  {
    icon: Shield,
    title: 'Indépendance',
    description:
      "Nous n'achetons ni ne vendons de cartes. Notre seul intérêt est de vous fournir une expertise objective et impartiale.",
  },
  {
    icon: Target,
    title: 'Rigueur',
    description:
      "Notre méthodologie en 6 étapes garantit une analyse complète et documentée de chaque carte expertisée.",
  },
  {
    icon: Eye,
    title: 'Transparence',
    description:
      'Chaque conclusion est justifiée et documentée. Vous comprenez exactement comment nous arrivons à nos évaluations.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description:
      "Collectionneurs nous-mêmes, nous partageons votre passion et comprenons l'attachement que vous portez à vos cartes.",
  },
];

const commitments = [
  'Réponse à votre demande sous 48h',
  'Devis gratuit et sans engagement',
  'Confidentialité absolue de vos informations',
  'Méthodologie rigoureuse et documentée',
  'Rapports acceptés par les assurances',
  'Accompagnement personnalisé',
];

const team = [
  {
    name: 'Expert 1',
    role: 'Co-fondateur & Expert TCG',
    description:
      "Collectionneur depuis plus de 15 ans, spécialiste Pokémon et Magic. Passionné par l'authentification et la détection de contrefaçons.",
  },
  {
    name: 'Expert 2',
    role: 'Co-fondateur & Expert TCG',
    description:
      "Expert en évaluation et analyse de marché. Spécialiste One Piece, Dragon Ball et Lorcana. Passionné par la valorisation patrimoniale.",
  },
];

export default function AProposPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="border-b bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">À propos de CARTATTAC</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            L'expertise professionnelle au service des collectionneurs et des professionnels.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold">Notre histoire</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                CARTATTAC est né d'un constat simple : le marché des cartes à collectionner a
                explosé, mais il manquait un acteur indépendant capable de fournir des expertises
                fiables et documentées.
              </p>
              <p>
                Collectionneurs passionnés depuis notre enfance, nous avons vu le marché évoluer,
                les prix s'envoler, et avec eux les risques : contrefaçons de plus en plus
                sophistiquées, difficultés à assurer ses collections, complications lors de
                successions...
              </p>
              <p>
                Face à ces enjeux, nous avons décidé de mettre notre expertise au service de tous :
                collectionneurs souhaitant protéger leur patrimoine, assureurs ayant besoin
                d'évaluations fiables, notaires gérant des successions, ou encore maisons de vente
                cherchant des estimations professionnelles.
              </p>
              <p>
                Notre force ? Une totale indépendance. Nous n'achetons ni ne vendons de cartes,
                ce qui garantit l'objectivité de nos évaluations. Notre seul intérêt est de vous
                fournir une expertise rigoureuse et documentée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Nos valeurs</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">L'équipe</h2>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            {team.map((member) => (
              <Card key={member.name}>
                <CardHeader>
                  <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-muted" />
                  <CardTitle className="text-center">{member.name}</CardTitle>
                  <CardDescription className="text-center font-medium text-primary">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="border-y bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">Nos engagements</h2>
            <ul className="space-y-4">
              {commitments.map((commitment) => (
                <li key={commitment} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-lg">{commitment}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Travaillons ensemble</h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Vous avez un projet d'expertise ? Contactez-nous pour en discuter.
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
