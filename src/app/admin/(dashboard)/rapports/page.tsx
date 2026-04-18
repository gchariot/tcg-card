import Link from 'next/link';
import { Plus, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabaseAdmin } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

type ReportRow = {
  id: string;
  created_at: string;
  admin_email: string;
  report_number: string | null;
  client: string | null;
  subject: string | null;
  final_estimate: number | null;
};

export default async function RapportsListPage() {
  const { data: reports, error } = await supabaseAdmin
    .from('reports')
    .select('id, created_at, admin_email, report_number, client, subject, final_estimate')
    .order('created_at', { ascending: false })
    .limit(100);

  const rows = (reports ?? []) as ReportRow[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-3xl font-bold"
            style={{ fontFamily: 'var(--font-roena)', fontWeight: 400 }}
          >
            Rapports d&apos;expertise
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Créer, consulter et exporter les rapports.
          </p>
        </div>
        <Button asChild className="bg-black hover:bg-black/90">
          <Link href="/admin/rapports/nouveau">
            <Plus className="mr-2 h-4 w-4" /> Nouveau rapport
          </Link>
        </Button>
      </div>

      {error && (
        <Card>
          <CardContent className="py-8 text-center text-sm text-red-600">
            Erreur de chargement: {error.message}
          </CardContent>
        </Card>
      )}

      {!error && rows.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <FileText className="h-10 w-10 text-muted-foreground" />
            <div className="text-sm text-muted-foreground">
              Aucun rapport pour l&apos;instant.
            </div>
          </CardContent>
        </Card>
      )}

      {!error && rows.length > 0 && (
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Numéro</th>
                  <th className="px-4 py-3 font-medium">Client</th>
                  <th className="px-4 py-3 font-medium">Sujet</th>
                  <th className="px-4 py-3 font-medium">Estimation</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Auteur</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.id}
                    className="cursor-pointer border-b last:border-0 hover:bg-muted/30"
                  >
                    <td className="p-0" colSpan={6}>
                      <Link
                        href={`/admin/rapports/${r.id}`}
                        className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] px-4 py-3"
                      >
                        <span className="font-medium">{r.report_number || '—'}</span>
                        <span>{r.client || '—'}</span>
                        <span className="text-muted-foreground">{r.subject || '—'}</span>
                        <span>
                          {r.final_estimate != null
                            ? new Intl.NumberFormat('fr-FR', {
                                style: 'currency',
                                currency: 'EUR',
                                maximumFractionDigits: 0,
                              }).format(r.final_estimate)
                            : '—'}
                        </span>
                        <span className="text-muted-foreground">
                          {new Date(r.created_at).toLocaleDateString('fr-FR')}
                        </span>
                        <span className="text-muted-foreground">{r.admin_email}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
