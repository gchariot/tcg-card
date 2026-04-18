import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { reportFormSchema } from '@/lib/validations/report';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = reportFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('reports')
      .insert({
        admin_email: session.user.email,
        report_number: parsed.data.reportNumber || null,
        client: parsed.data.client || null,
        subject: parsed.data.subject || null,
        final_estimate: parsed.data.finalEstimate ?? null,
        data: parsed.data,
      })
      .select('id')
      .single();

    if (error) {
      console.error('[report] db error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (err) {
    console.error('[report] route error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
