import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema } from '@/lib/validations/contact';

const resend = new Resend(process.env.RESEND_API_KEY);

const subjectLabels: Record<string, string> = {
  renseignements: 'Demande de renseignements',
  devis: 'Demande de devis',
  autre: 'Autres demandes',
};

const professionLabels: Record<string, string> = {
  assurance: 'Assurance / Courtier',
  notaire: 'Notaire / Avocat',
  'vente-encheres': 'Maison de vente aux enchères',
  boutique: 'Boutique / Marchand TCG',
  autre: 'Autre',
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (data.website) {
      return NextResponse.json({ success: true });
    }

    const from = process.env.CONTACT_FROM ?? 'onboarding@resend.dev';
    const to = (process.env.CONTACT_TO ?? '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (to.length === 0) {
      return NextResponse.json(
        { error: 'CONTACT_TO is not configured' },
        { status: 500 }
      );
    }

    const html = `
      <h2>Nouvelle prise de contact — KAMI</h2>
      <p><strong>Objet :</strong> ${subjectLabels[data.subject] ?? data.subject}</p>
      <p><strong>Profil :</strong> ${data.type === 'particulier' ? 'Particulier' : 'Professionnel'}</p>
      ${data.type === 'professionnel' && data.company ? `<p><strong>Entreprise :</strong> ${data.company}</p>` : ''}
      ${data.type === 'professionnel' && data.profession ? `<p><strong>Secteur :</strong> ${professionLabels[data.profession] ?? data.profession}</p>` : ''}
      <hr />
      <p><strong>Nom :</strong> ${data.name}</p>
      <p><strong>Email :</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      ${data.phone ? `<p><strong>Téléphone :</strong> ${data.phone}</p>` : ''}
      <hr />
      <p><strong>Message :</strong></p>
      <p style="white-space: pre-wrap;">${data.message}</p>
    `;

    const { error } = await resend.emails.send({
      from: `KAMI <${from}>`,
      to,
      replyTo: data.email,
      subject: `[KAMI] ${subjectLabels[data.subject] ?? 'Prise de contact'} — ${data.name}`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Email send failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
