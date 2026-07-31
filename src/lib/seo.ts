import type { Metadata } from 'next';

/**
 * Canonical + hreflang pour une page localisée.
 * `path` commence par '/' (utiliser '/' pour l'accueil).
 * Avec localePrefix 'as-needed', le FR (locale par défaut) n'a pas de préfixe.
 */
export function pageAlternates(locale: string, path: string): Metadata['alternates'] {
  const clean = path === '/' ? '' : path;
  const prefix = locale === 'fr' ? '' : `/${locale}`;
  return {
    canonical: `${prefix}${clean}` || '/',
    languages: {
      fr: clean || '/',
      en: `/en${clean}`,
      'x-default': clean || '/',
    },
  };
}
