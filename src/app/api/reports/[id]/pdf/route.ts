import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { supabaseAdmin } from '@/lib/supabase/server';
import { renderReportPdf } from '@/lib/pdf/report-pdf';
import type { ReportFormData } from '@/lib/validations/report';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const { data, error } = await supabaseAdmin
    .from('reports')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const formData = data.data as ReportFormData;
  const buffer = await renderReportPdf({
    data: formData,
    createdAt: data.created_at,
    adminEmail: data.admin_email,
  });

  const filename = `rapport-${formData.reportNumber || id}.pdf`;

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
