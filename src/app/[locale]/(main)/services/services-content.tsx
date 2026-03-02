'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '@/lib/utils';

// Custom Accordion Trigger with + and -
function CustomAccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          'group flex flex-1 items-center justify-between py-4 text-left transition-all outline-none',
          className
        )}
        {...props}
      >
        {children}
        <span
          className="text-4xl font-normal leading-none transition-transform duration-200"
          style={{ fontFamily: 'var(--font-montserrat)' }}
        >
          <span className="group-data-[state=open]:hidden">+</span>
          <span className="hidden group-data-[state=open]:inline">−</span>
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function ServicesPageContent() {
  const t = useTranslations('services');

  const services = [
    { id: 'individual', key: 'individual' },
    { id: 'inventory', key: 'inventory' },
    { id: 'damage', key: 'damage' },
    { id: 'insurance', key: 'insurance' },
    { id: 'authentication', key: 'authentication' },
  ];

  const whyItems = [
    { id: 'protection', key: 'protection' },
    { id: 'insurance', key: 'insurance' },
    { id: 'patrimony', key: 'patrimony' },
    { id: 'authentication', key: 'authentication' },
  ];

  return (
    <div className="flex flex-col">
      {/* Section 1: Nos Services */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left Column */}
            <div>
              {/* Title */}
              <h1
                className="relative mb-0 text-4xl font-bold uppercase md:text-5xl lg:text-6xl"
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 900,
                  letterSpacing: '0.02em',
                }}
              >
                <span className="relative z-10">N</span>
                <span className="relative">
                  <span className="relative z-10">OS SERVICE</span>
                  <span
                    className="absolute left-0 top-0 -z-10 h-[120%] w-full"
                    style={{ backgroundColor: '#87CEEB' }}
                  />
                </span>
                <span className="relative z-10">S</span>
              </h1>

              {/* Why Choose Us */}
              <div className="mt-6 rounded-3xl bg-gray-100 p-8 md:p-10">
                <p className="mb-8">
                  <span
                    className="text-2xl font-bold uppercase md:text-3xl"
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontWeight: 900,
                      letterSpacing: '0.02em',
                    }}
                  >
                    POURQUOI NOUS CHOISIR ?
                  </span>
                </p>

                <div className="space-y-6">
                  {/* Independence */}
                  <p
                    className="text-sm leading-relaxed text-justify"
                    style={{ fontFamily: '"Courier New", Courier, monospace' }}
                  >
                    <span className="font-bold">
                      <span className="relative inline-block">
                        Indépendance.
                        <span className="absolute inset-0 -z-10 bg-cyan-300" />
                      </span>
                    </span>{' '}
                    aucun conflit d'intérêt, nous n'achetons ni ne vendons de cartes.
                  </p>

                  {/* Objectivity */}
                  <p
                    className="text-sm leading-relaxed text-justify"
                    style={{ fontFamily: '"Courier New", Courier, monospace' }}
                  >
                    <span className="font-bold">
                      <span className="relative inline-block">
                        Objectivité.
                        <span className="absolute inset-0 -z-10 bg-cyan-300" />
                      </span>
                    </span>{' '}
                    Analyse basée sur des critères mesurables et des données de marché.
                  </p>

                  {/* Transparency */}
                  <p
                    className="text-sm leading-relaxed text-justify"
                    style={{ fontFamily: '"Courier New", Courier, monospace' }}
                  >
                    <span className="font-bold">
                      <span className="relative inline-block">
                        Transparence.
                        <span className="absolute inset-0 -z-10 bg-cyan-300" />
                      </span>
                    </span>{' '}
                    méthodologie documentée et justification de chaque conclusion.
                  </p>

                  {/* Confidentiality */}
                  <p
                    className="text-sm leading-relaxed text-justify"
                    style={{ fontFamily: '"Courier New", Courier, monospace' }}
                  >
                    <span className="font-bold">
                      <span className="relative inline-block">
                        Confidentialité.
                        <span className="absolute inset-0 -z-10 bg-cyan-300" />
                      </span>
                    </span>{' '}
                    vos informations et la composition de votre collection restent strictement
                    confidentielles.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Intro Text */}
              <p
                className="mb-8 text-sm leading-relaxed text-justify"
                style={{ fontFamily: '"Courier New", Courier, monospace' }}
              >
                {t('intro')}
              </p>

              {/* Services Accordion */}
              <Accordion type="single" collapsible>
                {services.map((service) => (
                  <AccordionItem
                    key={service.id}
                    value={service.id}
                    className="border-t-[5px] border-black border-b-0 last:border-b-[5px]"
                  >
                    <CustomAccordionTrigger
                      className="text-left text-lg font-bold uppercase hover:no-underline md:text-xl"
                      style={{
                        fontFamily: 'var(--font-montserrat)',
                        fontWeight: 900,
                        letterSpacing: '0.02em',
                      }}
                    >
                      {t(`${service.key}.title`)}
                    </CustomAccordionTrigger>
                    <AccordionContent>
                      <p
                        className="mb-4 text-sm leading-relaxed text-justify"
                        style={{ fontFamily: '"Courier New", Courier, monospace' }}
                      >
                        {t(`${service.key}.description`)}
                      </p>
                      <ul className="space-y-2">
                        {(t.raw(`${service.key}.details`) as string[]).map((detail, index) => (
                          <li
                            key={index}
                            className="text-sm leading-relaxed"
                            style={{ fontFamily: '"Courier New", Courier, monospace' }}
                          >
                            • {detail}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Why Expertise is Essential */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left Column */}
            <div>
              <h2
                className="relative mb-0 text-4xl font-bold uppercase md:text-5xl lg:text-6xl"
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 900,
                  letterSpacing: '0.02em',
                }}
              >
                <span className="relative z-10">P</span>
                <span className="relative">
                  <span className="relative z-10">OURQUOI UN</span>
                  <span
                    className="absolute left-0 top-0 -z-10 h-[280%] w-full"
                    style={{ backgroundColor: '#86efac' }}
                  />
                </span>
                <span className="relative z-10">E</span>
                <br />
                <span className="relative z-10">EXPERTISE EST</span>
                <br />
                <span className="relative z-10">ESSENTIELLE ?</span>
              </h2>
            </div>

            {/* Right Column */}
            <div>
              {/* Why Accordion */}
              <Accordion type="single" collapsible>
                {whyItems.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="border-t-[5px] border-black border-b-0 last:border-b-[5px]"
                  >
                    <CustomAccordionTrigger
                      className="text-left text-lg font-bold uppercase hover:no-underline md:text-xl"
                      style={{
                        fontFamily: 'var(--font-montserrat)',
                        fontWeight: 900,
                        letterSpacing: '0.02em',
                      }}
                    >
                      {t(`whyExpertise.${item.key}.title`)}
                    </CustomAccordionTrigger>
                    <AccordionContent>
                      <p
                        className="text-sm leading-relaxed text-justify"
                        style={{ fontFamily: '"Courier New", Courier, monospace' }}
                      >
                        {t(`whyExpertise.${item.key}.description`)}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* CTA Button */}
              <div className="mt-12 flex justify-end">
                <Button
                  asChild
                  size="lg"
                  className="min-w-[200px] rounded-full bg-black px-8 py-6 text-base font-bold uppercase text-white hover:bg-black/90 md:min-w-[280px] md:px-10 md:py-7 md:text-lg"
                  style={{
                    fontFamily: 'var(--font-montserrat)',
                    fontWeight: 900,
                    letterSpacing: '0.02em',
                  }}
                >
                  <Link href="/contact">Commander une expertise</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
