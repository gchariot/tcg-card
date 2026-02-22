'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Méthodologie', href: '/methodologie' },
  { label: 'Particuliers', href: '/particuliers' },
  { label: 'Professionnels', href: '/professionnels' },
  { label: 'Blog', href: '/blog' },
  { label: 'À propos', href: '/a-propos' },
];

interface NavMobileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NavMobile({ open, onOpenChange }: NavMobileProps) {
  const pathname = usePathname();

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
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Separator className="my-6" />

        <div className="px-4">
          <Button asChild className="w-full">
            <Link href="/contact" onClick={handleLinkClick}>
              Demander un devis
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
