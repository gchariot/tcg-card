import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { auth } from '@/auth';
import { ReportWizard } from '@/components/admin/report-wizard/wizard';
import { supabaseAdmin } from '@/lib/supabase/server';
import type { ReportFormData } from '@/lib/validations/report';

export const dynamic = 'force-dynamic';

export default async function EditReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.email) redirect('/admin/login');

  const { id } = await params;
  const { data, error } = await supabaseAdmin
    .from('reports')
    .select('data')
    .eq('id', id)
    .single();

  if (error || !data) notFound();

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <Link
        href={`/admin/rapports/${id}`}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-1 h-4 w-4" /> Retour au rapport
      </Link>

      <h1
        className="text-3xl font-bold uppercase"
        style={{ fontFamily: 'var(--font-roena)', fontWeight: 400 }}
      >
        Modifier le rapport
      </h1>

      <ReportWizard
        adminEmail={session.user.email}
        initialData={data.data as Partial<ReportFormData>}
        reportId={id}
      />
    </div>
  );
}
