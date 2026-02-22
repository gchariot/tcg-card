export const SITE_CONFIG = {
  name: 'CARTATTAC',
  description: 'Expertise professionnelle pour cartes à collectionner TCG',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://cartattac.fr',
  locale: 'fr',
  locales: ['fr', 'en'] as const,
} as const;

export const NAV_ITEMS = [
  { label: 'nav.services', href: '/services' },
  { label: 'nav.methodology', href: '/methodologie' },
  { label: 'nav.individuals', href: '/particuliers' },
  { label: 'nav.professionals', href: '/professionnels' },
  { label: 'nav.blog', href: '/blog' },
  { label: 'nav.contact', href: '/contact' },
] as const;

export const FOOTER_NAV = {
  legal: [
    { label: 'footer.legal', href: '/mentions-legales' },
    { label: 'footer.privacy', href: '/politique-confidentialite' },
  ],
  social: [
    { label: 'Instagram', href: '#', icon: 'instagram' },
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
    { label: 'Twitter', href: '#', icon: 'twitter' },
  ],
} as const;

export const TCG_LIST = [
  { name: 'Pokémon', slug: 'pokemon' },
  { name: 'One Piece', slug: 'onepiece' },
  { name: 'Dragon Ball', slug: 'dragonball' },
  { name: 'Magic: The Gathering', slug: 'magic' },
  { name: 'Lorcana', slug: 'lorcana' },
] as const;

export const SERVICES = [
  {
    id: 'expertise-individuelle',
    icon: 'search',
  },
  {
    id: 'inventaire-collection',
    icon: 'list',
  },
  {
    id: 'evaluation-assurance',
    icon: 'shield',
  },
  {
    id: 'expertise-sinistre',
    icon: 'alert-triangle',
  },
  {
    id: 'authentification',
    icon: 'check-circle',
  },
] as const;

export const METHODOLOGY_STEPS = [
  { id: 'identification', icon: 'tag', number: 1 },
  { id: 'authentification', icon: 'fingerprint', number: 2 },
  { id: 'evaluation', icon: 'star', number: 3 },
  { id: 'rarete', icon: 'gem', number: 4 },
  { id: 'marche', icon: 'trending-up', number: 5 },
  { id: 'valeurs', icon: 'calculator', number: 6 },
] as const;
