'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const socialLinks = [
  { label: 'Instagram', href: '#', icon: Instagram },
  { label: 'LinkedIn', href: '#', icon: Linkedin },
  { label: 'Twitter', href: '#', icon: Twitter },
];

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: 'Expertise individuelle', href: '/services#expertise-individuelle' },
      { label: 'Inventaire collection', href: '/services#inventaire-collection' },
      { label: 'Évaluation assurance', href: '/services#evaluation-assurance' },
      { label: 'Expertise sinistre', href: '/services#expertise-sinistre' },
      { label: 'Authentification', href: '/services#authentification' },
    ],
    company: [
      { key: 'methodology', href: '/methodologie' },
      { key: 'blog', href: '/blog' },
      { key: 'contact', href: '/contact' },
    ],
    legal: [
      { key: 'legalNotice', href: '/mentions-legales' },
      { key: 'privacy', href: '/politique-confidentialite' },
    ],
  };

  return (
    <footer
      className="bg-black text-white"
      style={{ fontFamily: 'var(--font-poppins)' }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="text-xl font-bold"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              KAMI
            </Link>
            <p className="text-sm text-white/70">
              {t('description')}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 transition-colors hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3
              className="mb-4 text-sm font-semibold"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              {tNav('services')}
            </h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3
              className="mb-4 text-sm font-semibold"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              {t('navigation')}
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3
              className="mb-4 text-sm font-semibold"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              {t('legal')}
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p className="text-sm text-white/70">
            © {currentYear} KAMI. {t('rights')}
          </p>
          <p className="text-sm text-white/70">
            Multi-TCG : Pokémon • One Piece • Dragon Ball • Magic • Lorcana
          </p>
        </div>
      </div>
    </footer>
  );
}
