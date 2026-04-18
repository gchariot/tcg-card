'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const navItems = [
  { key: 'home', href: '/', hoverClass: 'hover:bg-white' },
  { key: 'services', href: '/services', hoverClass: 'hover:bg-[#C5C5FF]' },
  { key: 'methodology', href: '/methodologie', hoverClass: 'hover:bg-[#B3FFC7]' },
  { key: 'expertise', href: '/expertise', hoverClass: 'hover:bg-[#BED6FF]' },
  { key: 'prosCollectionneurs', href: '/pros-collectionneurs', hoverClass: 'hover:bg-[#FFCC99]' },
  { key: 'blog', href: '/blog', hoverClass: 'hover:bg-gray-100' },
] as const;

export function NavMain() {
  const pathname = usePathname();
  const t = useTranslations('nav');

  return (
    <nav className="flex items-center gap-1" style={{ fontFamily: 'var(--font-poppins)' }}>
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground',
              item.hoverClass,
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
