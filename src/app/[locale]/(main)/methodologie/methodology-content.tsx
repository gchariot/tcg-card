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
          className="text-xl font-normal leading-none transition-transform duration-200"
          style={{ fontFamily: 'var(--font-roena)' }}
        >
          <span className="group-data-[state=open]:hidden">+</span>
          <span className="hidden group-data-[state=open]:inline">−</span>
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function MethodologyPageContent() {
  const t = useTranslations('methodology');

  const steps = [
    { id: 'identification', key: 'identification', number: 1 },
    { id: 'authentication', key: 'authentication', number: 2 },
    { id: 'condition', key: 'condition', number: 3 },
    { id: 'rarity', key: 'rarity', number: 4 },
    { id: 'market', key: 'market', number: 5 },
    { id: 'valuation', key: 'valuation', number: 6 },
  ];

  const deliverables = [
    { id: 'report', key: 'report' },
    { id: 'photos', key: 'photos' },
    { id: 'certificate', key: 'certificate' },
    { id: 'inventory', key: 'inventory' },
  ];

  const commitments = [
    { id: 'independence', key: 'independence' },
    { id: 'objectivity', key: 'objectivity' },
    { id: 'transparency', key: 'transparency' },
  ];

  return (
    <div className="flex flex-1 flex-col bg-[#B3FFC7]">
      {/* Section 1: Méthodologie */}
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
                {t('heading')}
              </h1>

              {/* Why Choose Us */}
              <div className="mt-6 rounded-3xl bg-[#fff4c2] p-8 md:p-10">
                <p className="mb-8">
                  <span
                    className="text-2xl font-bold uppercase md:text-3xl"
                    style={{
                      fontFamily: 'var(--font-poppins)',
                      fontWeight: 700,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {t('commitmentsHeading')}
                  </span>
                </p>

                <div className="space-y-6">
                  {commitments.map((commitment) => (
                    <p
                      key={commitment.id}
                      className="text-sm leading-relaxed text-justify"
                      style={{ fontFamily: 'var(--font-poppins)' }}
                    >
                      <span className="font-bold">
                        <span className="relative inline-block">
                          {t(`commitments.${commitment.key}.title`)}.
                          <span className="absolute inset-0 -z-10 bg-cyan-300" />
                        </span>
                      </span>{' '}
                      {t(`commitments.${commitment.key}.description`)}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Intro Text */}
              <p
                className="mb-8 text-sm leading-relaxed text-justify"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                {t('subtitle')}
              </p>

              {/* Steps Accordion */}
              <Accordion type="single" collapsible>
                {steps.map((step) => (
                  <AccordionItem
                    key={step.id}
                    value={step.id}
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
                      {step.number}. {t(`steps.${step.key}.title`)}
                    </CustomAccordionTrigger>
                    <AccordionContent>
                      <p
                        className="mb-4 text-sm leading-relaxed text-justify"
                        style={{ fontFamily: 'var(--font-poppins)' }}
                      >
                        {t(`steps.${step.key}.description`)}
                      </p>
                      <ul className="space-y-2">
                        {(t.raw(`steps.${step.key}.details`) as string[]).map((detail, index) => (
                          <li
                            key={index}
                            className="text-sm leading-relaxed"
                            style={{ fontFamily: 'var(--font-poppins)' }}
                          >
                            • {detail}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}

                {/* Nos Livrables — aggregated last item */}
                <AccordionItem
                  value="deliverables"
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
                    7. {t('deliverablesHeading')}
                  </CustomAccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6">
                      {deliverables.map((deliverable) => (
                        <div key={deliverable.id}>
                          <h4
                            className="mb-2 text-base font-bold md:text-lg"
                            style={{
                              fontFamily: 'var(--font-poppins)',
                              fontWeight: 700,
                              letterSpacing: '0.02em',
                            }}
                          >
                            {t(`deliverables.${deliverable.key}.title`)}
                          </h4>
                          <p
                            className="text-sm leading-relaxed text-justify"
                            style={{ fontFamily: 'var(--font-poppins)' }}
                          >
                            {t(`deliverables.${deliverable.key}.description`)}
                          </p>
                        </div>
                      ))}
                    </div>
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
                  <Link href="/contact">{t('cta.button')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
