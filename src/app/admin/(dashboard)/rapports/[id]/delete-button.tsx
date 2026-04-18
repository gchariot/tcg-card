'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    if (!confirm('Supprimer ce rapport ? Action irréversible.')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/reports/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
      toast.success('Rapport supprimé');
      router.push('/admin/rapports');
    } catch {
      toast.error('Erreur lors de la suppression');
      setLoading(false);
    }
  };

  return (
    <Button variant="outline" onClick={onClick} disabled={loading} className="text-red-600 hover:text-red-700">
      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
      Supprimer
    </Button>
  );
}
