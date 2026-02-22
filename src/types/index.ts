export type Locale = 'fr' | 'en';

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  icon: string;
}

export interface TCG {
  name: string;
  slug: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  type: 'particulier' | 'professionnel';
  company?: string;
  sector?: string;
  tcg?: string[];
  volume?: string;
  message: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  locale: Locale;
  readingTime: number;
  category?: string;
}
