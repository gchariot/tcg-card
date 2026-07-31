import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed',
  // Pas de redirection selon la langue du navigateur : le FR est servi par
  // défaut (marché principal + crawlers Google anglophones), l'EN reste
  // accessible via le sélecteur de langue et les URLs /en.
  localeDetection: false,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
