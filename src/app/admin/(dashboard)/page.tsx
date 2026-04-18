import { auth } from '@/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Newspaper } from 'lucide-react';

export default async function AdminDashboardPage() {
  const session = await auth();

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
          Dashboard d'administration KAMI.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <FileText className="h-6 w-6 text-muted-foreground" />
            <div>
              <CardTitle>Rapports d'expertise</CardTitle>
              <CardDescription>Créer et exporter en PDF (à venir)</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Fonctionnalité en développement.</p>
          </CardContent>
        </Card>

        <Card>
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
