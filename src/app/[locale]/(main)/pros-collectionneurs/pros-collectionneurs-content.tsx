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
          style={{ fontFamily: 'var(--font-roena)' }}
        >
          <span className="group-data-[state=open]:hidden">+</span>
          <span className="hidden group-data-[state=open]:inline">−</span>
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function ProsCollectionneursContent() {
  const tIndividuals = useTranslations('individuals');
  const tProfessionals = useTranslations('professionals');
  const tCommon = useTranslations('common');

  return (
    <div className="flex flex-1 flex-col bg-[#FFCC99]">
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left Column */}
            <div>
              {/* Title */}
              <h1
                className="relative mb-0 break-words text-2xl font-bold uppercase md:text-5xl lg:text-[8rem]"
                style={{
                  fontFamily: 'var(--font-roena)',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                }}
              >
                {tIndividuals('pageTitle')}
              </h1>

            </div>

            {/* Right Column */}
            <div>
              {/* Intro Text */}
              <p
                className="mb-8 text-sm leading-relaxed text-justify"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                {tIndividuals('pageIntro')}
              </p>

              {/* Accordion Section */}
              <Accordion type="single" collapsible>
            {/* Particuliers et Collectionneurs */}
            <AccordionItem
              value="collectors"
              className="border-t-[5px] border-black border-b-0"
            >
              <CustomAccordionTrigger
                className="text-left text-lg font-bold uppercase hover:no-underline md:text-xl"
                style={{
                  fontFamily: 'var(--font-poppins)',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                }}
              >
                {tIndividuals('collectorsAccordion.title')}
              </CustomAccordionTrigger>
              <AccordionContent>
                <p
                  className="mb-4 text-sm leading-relaxed text-justify"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  {tIndividuals('collectorsAccordion.intro')}
                </p>
                <ul className="space-y-2">
                  <li
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    • {tIndividuals('useCases.insurance.title')} : {tIndividuals('useCases.insurance.description')}
                  </li>
                  <li
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    • {tIndividuals('useCases.damage.title')} : {tIndividuals('useCases.damage.description')}
                  </li>
                  <li
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    • {tIndividuals('useCases.patrimony.title')} : {tIndividuals('useCases.patrimony.description')}
                  </li>
                  <li
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    • {tIndividuals('useCases.transaction.title')} : {tIndividuals('useCases.transaction.description')}
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Assurances et Courtiers */}
            <AccordionItem
              value="insurance"
              className="border-t-[5px] border-black border-b-0"
            >
              <CustomAccordionTrigger
                className="text-left text-lg font-bold uppercase hover:no-underline md:text-xl"
                style={{
                  fontFamily: 'var(--font-poppins)',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                }}
              >
                {tProfessionals('domains.insurance.title')}
              </CustomAccordionTrigger>
              <AccordionContent>
                <p
                  className="mb-4 text-sm leading-relaxed text-justify"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  {tProfessionals('domains.insurance.description')}
                </p>
                <ul className="space-y-2">
                  {(tProfessionals.raw('domains.insurance.services') as string[]).map((service, index) => (
                    <li
                      key={index}
                      className="text-sm leading-relaxed"
                      style={{ fontFamily: 'var(--font-poppins)' }}
                    >
                      • {service}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Notaires et Avocats */}
            <AccordionItem
              value="notary"
              className="border-t-[5px] border-black border-b-0"
            >
              <CustomAccordionTrigger
                className="text-left text-lg font-bold uppercase hover:no-underline md:text-xl"
                style={{
                  fontFamily: 'var(--font-poppins)',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                }}
              >
                {tProfessionals('domains.notary.title')}
              </CustomAccordionTrigger>
              <AccordionContent>
                <p
                  className="mb-4 text-sm leading-relaxed text-justify"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  {tProfessionals('domains.notary.description')}
                </p>
                <ul className="space-y-2">
                  {(tProfessionals.raw('domains.notary.services') as string[]).map((service, index) => (
                    <li
                      key={index}
                      className="text-sm leading-relaxed"
                      style={{ fontFamily: 'var(--font-poppins)' }}
                    >
                      • {service}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Maisons de vente aux enchères */}
            <AccordionItem
              value="auction"
              className="border-t-[5px] border-black border-b-0"
            >
              <CustomAccordionTrigger
                className="text-left text-lg font-bold uppercase hover:no-underline md:text-xl"
                style={{
                  fontFamily: 'var(--font-poppins)',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                }}
              >
                {tProfessionals('domains.auction.title')}
              </CustomAccordionTrigger>
              <AccordionContent>
                <p
                  className="mb-4 text-sm leading-relaxed text-justify"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  {tProfessionals('domains.auction.description')}
                </p>
                <ul className="space-y-2">
                  {(tProfessionals.raw('domains.auction.services') as string[]).map((service, index) => (
                    <li
                      key={index}
                      className="text-sm leading-relaxed"
                      style={{ fontFamily: 'var(--font-poppins)' }}
                    >
                      • {service}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Boutique TCG */}
            <AccordionItem
              value="shop"
              className="border-t-[5px] border-black border-b-0 last:border-b-[5px]"
            >
              <CustomAccordionTrigger
                className="text-left text-lg font-bold uppercase hover:no-underline md:text-xl"
                style={{
                  fontFamily: 'var(--font-poppins)',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                }}
              >
                {tProfessionals('domains.shop.title')}
              </CustomAccordionTrigger>
              <AccordionContent>
                <p
                  className="mb-4 text-sm leading-relaxed text-justify"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  {tProfessionals('domains.shop.description')}
                </p>
                <ul className="space-y-2">
                  {(tProfessionals.raw('domains.shop.services') as string[]).map((service, index) => (
                    <li
                      key={index}
                      className="text-sm leading-relaxed"
                      style={{ fontFamily: 'var(--font-poppins)' }}
                    >
                      • {service}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

              {/* CTA Button */}
              <div className="mt-12 flex justify-end">
                <Button
                  asChild
                  size="lg"
                  className="min-w-[200px] rounded-full bg-black px-8 py-6 text-base font-bold uppercase text-white hover:bg-black/90 md:min-w-[280px] md:px-10 md:py-7 md:text-lg"
                  style={{
                    fontFamily: 'var(--font-poppins)',
                    fontWeight: 400,
                    letterSpacing: '0.02em',
                  }}
                >
                  <Link href="/contact">{tCommon('orderExpertise')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
