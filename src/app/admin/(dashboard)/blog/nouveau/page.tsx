import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { BlogEditor } from '@/components/admin/blog-editor/blog-editor';

export default async function NewBlogPostPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect('/admin/login');
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <Link
        href="/admin/blog"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-1 h-4 w-4" /> Retour
      </Link>

      <h1
        className="text-3xl font-bold uppercase"
        style={{ fontFamily: 'var(--font-roena)', fontWeight: 400 }}
      >
        Nouvel article
      </h1>

      <BlogEditor mode="create" />
    </div>
  );
}
