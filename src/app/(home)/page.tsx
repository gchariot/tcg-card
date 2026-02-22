import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const tcgList = ['Pokémon', 'One Piece', 'Dragon Ball', 'Magic', 'Lorcana'];

export default function HomePage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Hero Section - Takes remaining viewport height */}
      <section className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Expertise professionnelle
            <br />
            cartes à collectionner
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Méthodologie rigoureuse • Analyse objective • Totale indépendance
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="min-w-[160px]">
              <Link href="/particuliers">
                Particuliers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-[160px]">
              <Link href="/professionnels">Professionnels</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* TCG List - Fixed at bottom */}
      <section className="border-t py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {tcgList.map((tcg) => (
              <span
                key={tcg}
                className="text-sm font-medium text-muted-foreground md:text-base"
              >
                {tcg}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
