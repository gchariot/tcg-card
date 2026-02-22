'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
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

const tcgOptions = [
  { value: 'pokemon', label: 'Pokémon' },
  { value: 'onepiece', label: 'One Piece' },
  { value: 'dragonball', label: 'Dragon Ball' },
  { value: 'magic', label: 'Magic: The Gathering' },
  { value: 'lorcana', label: 'Disney Lorcana' },
  { value: 'multiple', label: 'Plusieurs TCG' },
  { value: 'autre', label: 'Autre' },
];

const volumeOptions = [
  { value: '1-5', label: '1 à 5 cartes' },
  { value: '6-20', label: '6 à 20 cartes' },
  { value: '21-100', label: '21 à 100 cartes' },
  { value: '100+', label: 'Plus de 100 cartes' },
  { value: 'collection', label: 'Collection complète' },
];

const serviceOptions = [
  { value: 'expertise-individuelle', label: 'Expertise de carte individuelle' },
  { value: 'inventaire-collection', label: 'Inventaire et valorisation de collection' },
  { value: 'evaluation-assurance', label: 'Évaluation pour assurance' },
  { value: 'expertise-sinistre', label: 'Expertise après sinistre' },
  { value: 'authentification', label: 'Authentification' },
  { value: 'autre', label: 'Autre demande' },
];

const professionOptions = [
  { value: 'assurance', label: 'Assurance / Courtier' },
  { value: 'notaire', label: 'Notaire / Avocat' },
  { value: 'vente-encheres', label: 'Maison de vente aux enchères' },
  { value: 'boutique', label: 'Boutique / Marchand TCG' },
  { value: 'autre', label: 'Autre' },
];

export function ContactForm() {
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
      tcg: undefined,
      volume: undefined,
      service: undefined,
      message: '',
      consent: false,
    },
  });

  const watchType = form.watch('type');

  async function onSubmit(data: ContactFormData) {
    // Honeypot check
    if (data.website) {
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implement actual form submission with Resend
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Form data:', data);
      setIsSubmitted(true);
      toast.success('Votre demande a été envoyée avec succès !');
    } catch {
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
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
        <h3 className="mb-2 text-xl font-semibold">Demande envoyée !</h3>
        <p className="text-muted-foreground">
          Merci pour votre demande. Nous vous recontacterons sous 48h.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Honeypot - hidden from users */}
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

        {/* Type selection */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vous êtes *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre profil" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="particulier">Un particulier</SelectItem>
                  <SelectItem value="professionnel">Un professionnel</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Professional fields */}
        {watchType === 'professionnel' && (
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entreprise</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom de l'entreprise" {...field} />
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
                  <FormLabel>Secteur d'activité</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {professionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
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

        {/* Name and Email */}
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom *</FormLabel>
                <FormControl>
                  <Input placeholder="Votre nom" {...field} />
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
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="votre@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="06 00 00 00 00" {...field} />
              </FormControl>
              <FormDescription>Optionnel, pour un rappel rapide</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Service, TCG, Volume */}
        <div className="grid gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service souhaité *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {serviceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
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
            name="tcg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TCG concerné *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {tcgOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
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
            name="volume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Volume estimé *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {volumeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Votre message *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Décrivez votre projet ou votre demande..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Consent */}
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
                  J'accepte que mes données soient traitées conformément à la{' '}
                  <Link href="/politique-confidentialite" className="underline hover:text-primary">
                    politique de confidentialité
                  </Link>{' '}
                  *
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            'Envoyer ma demande'
          )}
        </Button>
      </form>
    </Form>
  );
}
