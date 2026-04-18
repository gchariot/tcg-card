import Link from 'next/link';
import { auth } from '@/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Newspaper, ArrowRight } from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const session = await auth();
  const { count } = await supabaseAdmin
    .from('reports')
    .select('*', { count: 'exact', head: true });

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-3xl font-bold"
          style={{ fontFamily: 'var(--font-roena)', fontWeight: 400 }}
        >
          Bienvenue, {session?.user?.name?.split(' ')[0] ?? 'Admin'}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Dashboard d&apos;administration KAMI.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/admin/rapports" className="group">
          <Card className="h-full transition-colors group-hover:border-black">
            <CardHeader className="flex flex-row items-center gap-3">
              <FileText className="h-6 w-6 text-muted-foreground" />
              <div className="flex-1">
                <CardTitle>Rapports d&apos;expertise</CardTitle>
                <CardDescription>Créer, consulter et exporter en PDF</CardDescription>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{count ?? 0}</div>
              <p className="mt-1 text-sm text-muted-foreground">
                rapport{(count ?? 0) > 1 ? 's' : ''} enregistré{(count ?? 0) > 1 ? 's' : ''}
              </p>
            </CardContent>
          </Card>
        </Link>

        <Card className="h-full opacity-60">
          <CardHeader className="flex flex-row items-center gap-3">
            <Newspaper className="h-6 w-6 text-muted-foreground" />
            <div>
              <CardTitle>Articles blog</CardTitle>
              <CardDescription>Rédiger et publier (à venir)</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Fonctionnalité en développement.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
