'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUp, ArrowUpDown, Download, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ReportRow = {
  id: string;
  created_at: string;
  admin_email: string;
  report_number: string | null;
  client: string | null;
  subject: string | null;
  final_estimate: number | null;
  photoRecto: string[] | null;
  card_name: string | null;
  card_set: string | null;
};

type SortKey =
  | 'report_number'
  | 'client'
  | 'card_name'
  | 'card_set'
  | 'subject'
  | 'final_estimate'
  | 'created_at'
  | 'admin_email';

type SortDir = 'asc' | 'desc';

function compareValues(
  a: string | number | null,
  b: string | number | null,
  dir: SortDir
): number {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  let r: number;
  if (typeof a === 'number' && typeof b === 'number') {
    r = a - b;
  } else {
    r = String(a).localeCompare(String(b), 'fr', { numeric: true, sensitivity: 'base' });
  }
  return dir === 'asc' ? r : -r;
}

function formatEuro(n: number): string {
  return `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €`;
}

function matches(haystack: string | null, needle: string): boolean {
  if (!needle) return true;
  if (!haystack) return false;
  return haystack.toLowerCase().includes(needle.toLowerCase().trim());
}

function SortHeader({
  label,
  sortKey,
  currentKey,
  dir,
  onToggle,
  align = 'left',
}: {
  label: string;
  sortKey: SortKey;
  currentKey: SortKey | null;
  dir: SortDir;
  onToggle: (key: SortKey) => void;
  align?: 'left' | 'right';
}) {
  const active = currentKey === sortKey;
  const Icon = !active ? ArrowUpDown : dir === 'asc' ? ArrowUp : ArrowDown;
  return (
    <th className={cn('px-4 py-3 font-medium', align === 'right' && 'text-right')}>
      <button
        type="button"
        onClick={() => onToggle(sortKey)}
        className={cn(
          'inline-flex items-center gap-1 uppercase transition-colors hover:text-foreground',
          active && 'text-foreground'
        )}
      >
        {label}
        <Icon className="h-3 w-3" />
      </button>
    </th>
  );
}

export function ReportsTable({ rows }: { rows: ReportRow[] }) {
  const [sortKey, setSortKey] = useState<SortKey>('created_at');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [filterReportNumber, setFilterReportNumber] = useState('');
  const [filterClient, setFilterClient] = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');

  const hasFilter =
    !!filterReportNumber || !!filterClient || !!filterDateFrom || !!filterDateTo;

  const resetFilters = () => {
    setFilterReportNumber('');
    setFilterClient('');
    setFilterDateFrom('');
    setFilterDateTo('');
  };

  const toggle = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir(key === 'created_at' || key === 'final_estimate' ? 'desc' : 'asc');
    }
  };

  const filteredAndSorted = useMemo(() => {
    const fromMs = filterDateFrom ? new Date(filterDateFrom).getTime() : null;
    const toMs = filterDateTo ? new Date(filterDateTo).getTime() + 86_399_000 : null;

    return rows
      .filter((r) => {
        if (!matches(r.report_number, filterReportNumber)) return false;
        if (!matches(r.client, filterClient)) return false;
        if (fromMs != null || toMs != null) {
          const ts = new Date(r.created_at).getTime();
          if (fromMs != null && ts < fromMs) return false;
          if (toMs != null && ts > toMs) return false;
        }
        return true;
      })
      .sort((a, b) => compareValues(a[sortKey], b[sortKey], sortDir));
  }, [rows, sortKey, sortDir, filterReportNumber, filterClient, filterDateFrom, filterDateTo]);

  return (
    <div>
      <div className="flex flex-wrap items-end gap-3 border-b bg-muted/20 px-4 py-3">
        <div className="min-w-[160px] flex-1">
          <Label className="mb-1 text-xs text-muted-foreground">Numéro d&apos;expertise</Label>
          <Input
            value={filterReportNumber}
            onChange={(e) => setFilterReportNumber(e.target.value)}
            placeholder="ex: 1001"
            className="h-8"
          />
        </div>
        <div className="min-w-[160px] flex-1">
          <Label className="mb-1 text-xs text-muted-foreground">Client</Label>
          <Input
            value={filterClient}
            onChange={(e) => setFilterClient(e.target.value)}
            placeholder="Nom du client"
            className="h-8"
          />
        </div>
        <div>
          <Label className="mb-1 text-xs text-muted-foreground">Date du</Label>
          <Input
            type="date"
            value={filterDateFrom}
            onChange={(e) => setFilterDateFrom(e.target.value)}
            className="h-8"
          />
        </div>
        <div>
          <Label className="mb-1 text-xs text-muted-foreground">Date au</Label>
          <Input
            type="date"
            value={filterDateTo}
            onChange={(e) => setFilterDateTo(e.target.value)}
            className="h-8"
          />
        </div>
        {hasFilter && (
          <Button type="button" variant="ghost" size="sm" onClick={resetFilters}>
            <X className="mr-1 h-3 w-3" /> Réinitialiser
          </Button>
        )}
        <div className="ml-auto text-xs text-muted-foreground">
          {filteredAndSorted.length} / {rows.length} rapport{rows.length > 1 ? 's' : ''}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs uppercase text-muted-foreground">
              <th className="px-4 py-3 font-medium">Photo</th>
              <SortHeader
                label="Numéro"
                sortKey="report_number"
                currentKey={sortKey}
                dir={sortDir}
                onToggle={toggle}
              />
              <SortHeader
                label="Client"
                sortKey="client"
                currentKey={sortKey}
                dir={sortDir}
                onToggle={toggle}
              />
              <SortHeader
                label="Carte"
                sortKey="card_name"
                currentKey={sortKey}
                dir={sortDir}
                onToggle={toggle}
              />
              <SortHeader
                label="Extension"
                sortKey="card_set"
                currentKey={sortKey}
                dir={sortDir}
                onToggle={toggle}
              />
              <SortHeader
                label="Estimation"
                sortKey="final_estimate"
                currentKey={sortKey}
                dir={sortDir}
                onToggle={toggle}
              />
              <SortHeader
                label="Date"
                sortKey="created_at"
                currentKey={sortKey}
                dir={sortDir}
                onToggle={toggle}
              />
              <SortHeader
                label="Auteur"
                sortKey="admin_email"
                currentKey={sortKey}
                dir={sortDir}
                onToggle={toggle}
              />
              <th className="px-4 py-3 text-right font-medium">PDF</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-12 text-center text-sm text-muted-foreground"
                >
                  Aucun rapport ne correspond aux filtres.
                </td>
              </tr>
            )}
            {filteredAndSorted.map((r) => {
              const thumb = r.photoRecto?.[0];
              return (
                <tr key={r.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="p-0">
                    <Link href={`/admin/rapports/${r.id}`} className="block px-4 py-2">
                      {thumb ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={thumb}
                          alt=""
                          className="h-12 w-12 rounded-md border object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-md border bg-muted/40 text-xs text-muted-foreground">
                          —
                        </div>
                      )}
                    </Link>
                  </td>
                  <td className="p-0">
                    <Link
                      href={`/admin/rapports/${r.id}`}
                      className="block px-4 py-3 font-medium"
                    >
                      {r.report_number || '—'}
                    </Link>
                  </td>
                  <td className="p-0">
                    <Link href={`/admin/rapports/${r.id}`} className="block px-4 py-3">
                      {r.client || '—'}
                    </Link>
                  </td>
                  <td className="p-0">
                    <Link href={`/admin/rapports/${r.id}`} className="block px-4 py-3">
                      {r.card_name || '—'}
                    </Link>
                  </td>
                  <td className="p-0">
                    <Link
                      href={`/admin/rapports/${r.id}`}
                      className="block px-4 py-3 text-muted-foreground"
                    >
                      {r.card_set || '—'}
                    </Link>
                  </td>
                  <td className="p-0">
                    <Link href={`/admin/rapports/${r.id}`} className="block px-4 py-3">
                      {r.final_estimate != null ? formatEuro(r.final_estimate) : '—'}
                    </Link>
                  </td>
                  <td className="p-0">
                    <Link
                      href={`/admin/rapports/${r.id}`}
                      className="block px-4 py-3 text-muted-foreground"
                    >
                      {new Date(r.created_at).toLocaleDateString('fr-FR')}
                    </Link>
                  </td>
                  <td className="p-0">
                    <Link
                      href={`/admin/rapports/${r.id}`}
                      className="block px-4 py-3 text-muted-foreground"
                    >
                      {r.admin_email}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <a
                      href={`/api/reports/${r.id}/pdf`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs hover:bg-muted"
                      title="Ouvrir le PDF"
                    >
                      <Download className="h-3 w-3" /> PDF
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
