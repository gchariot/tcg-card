import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { reportFormSchema } from '@/lib/validations/report';
import { supabaseAdmin } from '@/lib/supabase/server';

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

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = reportFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('reports')
      .update({
        report_number: parsed.data.reportNumber || null,
        client: parsed.data.client || null,
        subject: parsed.data.subject || null,
        final_estimate: parsed.data.finalEstimate ?? null,
        data: parsed.data,
      })
      .eq('id', id);

    if (error) {
      console.error('[report] update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error('[report] put error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

function extractStoragePath(url: string | undefined | null): string | null {
  if (!url) return null;
  const marker = '/storage/v1/object/public/reports/';
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.slice(idx + marker.length);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const { data: report, error: fetchError } = await supabaseAdmin
    .from('reports')
    .select('data')
    .eq('id', id)
    .single();

  if (fetchError || !report) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const d = report.data as {
    photoRecto?: string[];
    photoVerso?: string[];
    photoDefauts?: string[];
    transactions?: { photo?: string }[];
  };

  const urls = [
    ...(d.photoRecto ?? []),
    ...(d.photoVerso ?? []),
    ...(d.photoDefauts ?? []),
    ...((d.transactions ?? []).map((t) => t.photo).filter(Boolean) as string[]),
  ];

  const paths = urls
    .map(extractStoragePath)
    .filter((p): p is string => p !== null);

  if (paths.length > 0) {
    const { error: storageError } = await supabaseAdmin.storage
      .from('reports')
      .remove(paths);
    if (storageError) {
      console.error('[report] storage delete error:', storageError);
    }
  }

  const { error } = await supabaseAdmin.from('reports').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, deletedPhotos: paths.length });
}
