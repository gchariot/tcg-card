'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';
import { Loader2, CheckCircle } from 'lucide-react';

const subjectOptions = ['renseignements', 'devis', 'autre'] as const;
const professionOptions = ['insurance', 'notary', 'auction', 'shop', 'other'] as const;
const professionValues: Record<(typeof professionOptions)[number], string> = {
  insurance: 'assurance',
  notary: 'notaire',
  auction: 'vente-encheres',
  shop: 'boutique',
  other: 'autre',
};

export function ContactForm() {
  const t = useTranslations('contact.form');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      website: '',
      name: '',
      email: '',
      phone: '',
      type: undefined,
      company: '',
      profession: undefined,
      subject: undefined,
      message: '',
      consent: false,
    },
  });

  const watchType = form.watch('type');

  async function onSubmit(data: ContactFormData) {
    if (data.website) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Send failed');
      }

      setIsSubmitted(true);
      toast.success(t('toast.success'));
    } catch {
      toast.error(t('toast.error'));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="rounded-lg border bg-muted/30 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h3
          className="mb-2 text-xl font-semibold"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          {t('success.title')}
        </h3>
        <p className="text-muted-foreground">{t('success.description')}</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="hidden" aria-hidden="true">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input {...field} tabIndex={-1} autoComplete="off" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fields.type.label')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('fields.type.placeholder')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="particulier">{t('fields.type.individual')}</SelectItem>
                  <SelectItem value="professionnel">{t('fields.type.professional')}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {watchType === 'professionnel' && (
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fields.company.label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('fields.company.placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fields.profession.label')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('fields.profession.placeholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {professionOptions.map((key) => (
                        <SelectItem key={key} value={professionValues[key]}>
                          {t(`fields.profession.options.${key}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('fields.name.label')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('fields.name.placeholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('fields.email.label')}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t('fields.email.placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fields.phone.label')}</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder={t('fields.phone.placeholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fields.subject.label')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('fields.subject.placeholder')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subjectOptions.map((key) => (
                    <SelectItem key={key} value={key}>
                      {t(`fields.subject.options.${key}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fields.message.label')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('fields.message.placeholder')}
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="mt-1 h-4 w-4 rounded border-gray-300"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-normal">
                  {t('fields.consent.label')}{' '}
                  <Link
                    href="/politique-confidentialite"
                    className="underline hover:text-primary"
                  >
                    {t('fields.consent.link')}
                  </Link>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('submitting')}
            </>
          ) : (
            t('submit')
          )}
        </Button>
      </form>
    </Form>
  );
}
