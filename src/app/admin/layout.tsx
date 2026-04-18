import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin — KAMI',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: 'var(--font-poppins)' }}>{children}</div>;
}
