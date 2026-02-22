'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const navItems = [
  { key: 'home', href: '/' },
  { key: 'services', href: '/services' },
  { key: 'methodology', href: '/methodologie' },
  { key: 'individuals', href: '/particuliers' },
  { key: 'professionals', href: '/professionnels' },
  { key: 'blog', href: '/blog' },
  { key: 'about', href: '/a-propos' },
] as const;

interface NavMobileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NavMobile({ open, onOpenChange }: NavMobileProps) {
  const pathname = usePathname();
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');

  const handleLinkClick = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[300px] sm:w-[350px]">
        <SheetHeader className="text-left">
          <SheetTitle className="text-xl font-bold">CARTATTAC</SheetTitle>
        </SheetHeader>

        <nav className="mt-8 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className={cn(
                  'rounded-md px-4 py-3 text-base font-medium transition-colors',
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

        <Separator className="my-6" />

        <div className="px-4">
          <Button asChild className="w-full">
            <Link href="/contact" onClick={handleLinkClick}>
              {tCommon('requestQuote')}
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
