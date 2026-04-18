import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { ReportWizard } from '@/components/admin/report-wizard/wizard';

export default async function NewReportPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect('/admin/login');
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <Link
        href="/admin/rapports"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-1 h-4 w-4" /> Retour
      </Link>

      <h1
        className="text-3xl font-bold uppercase"
        style={{ fontFamily: 'var(--font-roena)', fontWeight: 400 }}
      >
        Nouveau rapport
      </h1>

      <ReportWizard adminEmail={session.user.email} />
    </div>
  );
}
