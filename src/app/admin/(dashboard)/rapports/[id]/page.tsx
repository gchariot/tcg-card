import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft, Download, Pencil } from 'lucide-react';
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabaseAdmin } from '@/lib/supabase/server';
import type { ReportFormData } from '@/lib/validations/report';
import { DeleteButton } from './delete-button';

const liquidityLabels: Record<string, string> = {
  'tres-haute': 'Très haute',
  haute: 'Haute',
  moyenne: 'Moyenne',
  faible: 'Faible',
  'tres-faible': 'Très faible',
};

export const dynamic = 'force-dynamic';

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  if (value == null || value === '' || (Array.isArray(value) && value.length === 0)) return null;
  return (
    <div className="grid grid-cols-[200px_1fr] gap-4 border-b py-2 last:border-0">
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
      <div className="text-sm">{value}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2
          className="mb-4 text-xl font-bold uppercase"
          style={{ fontFamily: 'var(--font-roena)', fontWeight: 400 }}
        >
          {title}
        </h2>
        <div className="space-y-0">{children}</div>
      </CardContent>
    </Card>
  );
}

function PhotoGrid({ urls }: { urls: string[] }) {
  if (!urls || urls.length === 0) return null;
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
      {urls.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <a key={i} href={src} target="_blank" rel="noreferrer" className="block">
          <img src={src} alt="" className="aspect-square w-full rounded-md border object-cover" />
        </a>
      ))}
    </div>
  );
}

export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.email) redirect('/admin/login');

  const { id } = await params;
  const { data, error } = await supabaseAdmin
    .from('reports')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) notFound();

  const d = data.data as ReportFormData;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/admin/rapports"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Retour
        </Link>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <a href={`/api/reports/${id}/pdf`} target="_blank" rel="noreferrer">
              <Download className="mr-2 h-4 w-4" /> PDF
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/admin/rapports/${id}/modifier`}>
              <Pencil className="mr-2 h-4 w-4" /> Modifier
            </Link>
          </Button>
          <DeleteButton id={id} />
        </div>
      </div>

      <div>
        <h1
          className="text-3xl font-bold uppercase"
          style={{ fontFamily: 'var(--font-roena)', fontWeight: 400 }}
        >
          {d.reportNumber ? `Rapport n°${d.reportNumber}` : 'Rapport'}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Créé le {new Date(data.created_at).toLocaleDateString('fr-FR')} par {data.admin_email}
        </p>
      </div>

      <Section title="Général">
        <Row label="Numéro" value={d.reportNumber} />
        <Row label="Date d'expertise" value={d.expertiseDate} />
        <Row label="Lieu" value={d.expertiseLocation} />
        <Row label="Expert" value={d.expert} />
        <Row label="Client" value={d.client} />
        <Row label="Sujet" value={d.subject} />
        <Row label="Type d'objet" value={d.objectType} />
      </Section>

      <Section title="Identification">
        <Row label="Jeu" value={d.game} />
        <Row label="Set / extension" value={d.set} />
        <Row label="Carte" value={d.cardName} />
        <Row label="Rareté" value={d.rarity} />
        <Row label="Numéro carte" value={d.cardNumber} />
        <Row label="Année" value={d.year} />
        <Row label="Langue" value={d.language} />
        <Row label="Version" value={d.version} />
        <Row label="Remarques" value={d.identificationNotes} />
      </Section>

      <Section title="Photographies">
        {d.photoRecto?.length ? <Row label="Recto" value={<PhotoGrid urls={d.photoRecto} />} /> : null}
        {d.photoVerso?.length ? <Row label="Verso" value={<PhotoGrid urls={d.photoVerso} />} /> : null}
        {d.photoDefauts?.length ? <Row label="Défauts" value={<PhotoGrid urls={d.photoDefauts} />} /> : null}
        <Row label="Remarques" value={d.photosNotes} />
      </Section>

      <Section title="Authentification">
        <Row label="Méthodes" value={d.authMethods?.join(', ')} />
        <Row label="Notes" value={d.authNotes} />
        <Row label="Conclusion" value={d.authConclusion} />
      </Section>

      <Section title="État (condition)">
        <Row label="Gradée" value={d.graded ? 'Oui' : 'Non'} />
        <Row label="Centering" value={d.centering} />
        <Row label="Corners" value={d.corners} />
        <Row label="Edges" value={d.edges} />
        <Row label="Surface" value={d.surface} />
        <Row label="Société de grading" value={d.gradingCompany} />
        <Row label="Score" value={d.gradingScore} />
        <Row label="Classification" value={d.conditionClassification} />
        <Row label="Notes" value={d.conditionNotes} />
      </Section>

      <Section title="Rareté et demande">
        <Row label="Population gradée" value={d.gradedPopulation} />
        <Row label="Disponibilité marché" value={d.marketAvailability} />
        <Row label="Popularité du set" value={d.setPopularity} />
        <Row label="Popularité du perso" value={d.characterPopularity} />
        <Row label="Fréquence de vente" value={d.salesFrequency} />
      </Section>

      <Section title="Analyse du marché">
        {d.transactions && d.transactions.length > 0 ? (
          <div className="space-y-3">
            {d.transactions.map((tx, i) => (
              <div key={i} className="rounded-lg border p-3">
                <div className="text-xs font-semibold uppercase text-muted-foreground">
                  Transaction #{i + 1}
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                  <div>Date : {tx.date || '—'}</div>
                  <div>Prix : {tx.price ? `${tx.price} €` : '—'}</div>
                  <div>Plateforme : {tx.platform || '—'}</div>
                </div>
                {tx.photo && (
                  <a href={tx.photo} target="_blank" rel="noreferrer" className="mt-2 inline-block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={tx.photo} alt="" className="h-20 rounded-md border object-cover" />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">Aucune transaction renseignée.</div>
        )}
      </Section>

      <Section title="Évaluation financière">
        <Row label="Valeur de marché" value={d.marketValue != null ? `${d.marketValue} €` : ''} />
        <Row
          label="Valeur de remplacement"
          value={d.replacementValue != null ? `${d.replacementValue} €` : ''}
        />
        <Row
          label="Valeur de liquidation"
          value={d.liquidationValue != null ? `${d.liquidationValue} €` : ''}
        />
        <Row label="Liquidité" value={d.liquidity ? liquidityLabels[d.liquidity] : ''} />
        <Row label="Commentaire" value={d.financialComment} />
        <Row
          label="Estimation finale"
          value={d.finalEstimate != null ? `${d.finalEstimate} €` : ''}
        />
      </Section>
    </div>
  );
}
