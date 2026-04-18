import { signIn, auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  if (session) {
    redirect('/admin');
  }

  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl md:p-10">
        <h1
          className="mb-2 text-3xl font-bold"
          style={{ fontFamily: 'var(--font-roena)', fontWeight: 400 }}
        >
          KAMI ADMIN
        </h1>
        <p className="mb-8 text-sm text-gray-600">
          Connectez-vous avec le compte Google autorisé pour accéder au dashboard.
        </p>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error === 'AccessDenied'
              ? "Cet email n'est pas autorisé."
              : 'Une erreur est survenue. Réessayez.'}
          </div>
        )}

        <form
          action={async () => {
            'use server';
            await signIn('google', { redirectTo: '/admin' });
          }}
        >
          <Button
            type="submit"
            className="w-full rounded-full bg-black py-6 text-sm font-semibold uppercase text-white hover:bg-black/90"
          >
            Se connecter avec Google
          </Button>
        </form>
      </div>
    </div>
  );
}
