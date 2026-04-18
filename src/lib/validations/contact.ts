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

  // Subject
  subject: z.enum(['renseignements', 'devis', 'autre'], {
    message: 'Veuillez sélectionner un objet',
  }),

  // Message
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),

  // GDPR consent
  consent: z.boolean().refine((val) => val === true, {
    message: 'Vous devez accepter la politique de confidentialité',
  }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
