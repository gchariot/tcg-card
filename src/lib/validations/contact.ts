import { z } from 'zod';

export const contactFormSchema = z.object({
  // Honeypot field - should be empty
  website: z.string().max(0, 'Invalid submission'),

  // Required fields
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),

  // Optional phone
  phone: z.string().optional(),

  // Type of request
  type: z.enum(['particulier', 'professionnel'], {
    message: 'Veuillez sélectionner un type',
  }),

  // Professional fields (conditional)
  company: z.string().optional(),
  profession: z.enum(['assurance', 'notaire', 'vente-encheres', 'boutique', 'autre']).optional(),

  // TCG and details
  tcg: z.enum(['pokemon', 'onepiece', 'dragonball', 'magic', 'lorcana', 'autre', 'multiple'], {
    message: 'Veuillez sélectionner un TCG',
  }),
  volume: z.enum(['1-5', '6-20', '21-100', '100+', 'collection'], {
    message: 'Veuillez estimer le volume',
  }),

  // Service type
  service: z.enum([
    'expertise-individuelle',
    'inventaire-collection',
    'evaluation-assurance',
    'expertise-sinistre',
    'authentification',
    'autre',
  ], {
    message: 'Veuillez sélectionner un service',
  }),

  // Message
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),

  // GDPR consent
  consent: z.boolean().refine((val) => val === true, {
    message: 'Vous devez accepter la politique de confidentialité',
  }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
