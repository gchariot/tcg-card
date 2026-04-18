import Link from 'next/link';
import { Plus, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabaseAdmin } from '@/lib/supabase/server';
import { ReportsTable, type ReportRow } from './reports-table';

export const dynamic = 'force-dynamic';

export default async function RapportsListPage() {
  const { data: reports, error } = await supabaseAdmin
    .from('reports')
    .select(
      'id, created_at, admin_email, report_number, client, subject, final_estimate, photoRecto:data->photoRecto, card_name:data->>cardName, card_set:data->>set'
    )
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
            <ReportsTable rows={rows} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
