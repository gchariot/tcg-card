'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const navItems = [
  { key: 'services', href: '/services' },
  { key: 'methodology', href: '/methodologie' },
  { key: 'individuals', href: '/particuliers' },
  { key: 'professionals', href: '/professionnels' },
  { key: 'blog', href: '/blog' },
] as const;

export function NavMain() {
  const pathname = usePathname();
  const t = useTranslations('nav');

  return (
    <nav className="flex items-center gap-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'rounded-md px-3 py-2 text-sm font-medium transition-colors',
              'hover:bg-accent hover:text-accent-foreground',
              isActive
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground'
            )}
          >
            {t(item.key)}
          </Link>
        );
      })}
    </nav>
  );
}
