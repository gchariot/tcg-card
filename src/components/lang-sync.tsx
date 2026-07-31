'use client';

import { useEffect } from 'react';

/**
 * Aligne l'attribut lang de <html> sur la locale courante.
 * Le layout racine (au-dessus du segment [locale]) fixe lang="fr" par défaut ;
 * ce composant le met à jour pour les pages /en.
 */
export function LangSync({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
