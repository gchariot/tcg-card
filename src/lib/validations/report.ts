import { z } from 'zod';

export const objectTypes = ['carte', 'item', 'collection'] as const;
export const games = [
  'pokemon',
  'onepiece',
  'dragonball',
  'magic',
  'lorcana',
  'yugioh',
  'autre',
] as const;
export const languages = [
  'fr',
  'en',
  'jp',
  'de',
  'es',
  'it',
  'kr',
  'cn',
  'autre',
] as const;
export const authMethods = [
  'trame',
  'typographie',
  'texture',
  'comparaison',
  'uv',
  'caracteristiques',
] as const;
export const authConclusions = ['authentique', 'contrefacon', 'doute'] as const;
export const conditionClassifications = [
  'gem-mint',
  'mint',
  'near-mint',
  'excellent',
  'very-good',
  'good',
  'light-played',
  'played',
  'poor',
] as const;
export const gradingCompanies = ['psa', 'bgs', 'cgc', 'sgc', 'ace', 'autre'] as const;
export const liquidities = ['tres-haute', 'haute', 'moyenne', 'faible', 'tres-faible'] as const;

export const transactionSchema = z.object({
  date: z.string().optional().default(''),
  price: z.string().optional().default(''),
  platform: z.string().optional().default(''),
  photo: z.string().optional().default(''),
});

export type Transaction = z.infer<typeof transactionSchema>;

export const reportFormSchema = z.object({
  // Section 1 - general
  reportNumber: z.string().optional().default(''),
  expertiseDate: z.string().optional().default(''),
  expertiseLocation: z.string().optional().default(''),
  expert: z.string().optional().default(''),
  client: z.string().optional().default(''),
  subject: z.string().optional().default(''),
  objectType: z.enum(objectTypes).optional(),

  // Section 2 - identification
  game: z.enum(games).optional(),
  set: z.string().optional().default(''),
  cardName: z.string().optional().default(''),
  rarity: z.string().optional().default(''),
  cardNumber: z.string().optional().default(''),
  year: z.string().optional().default(''),
  language: z.enum(languages).optional(),
  version: z.string().optional().default(''),
  identificationNotes: z.string().optional().default(''),

  // Section 3 - photos
  photoRecto: z.array(z.string()).optional().default([]),
  photoVerso: z.array(z.string()).optional().default([]),
  photoDefauts: z.array(z.string()).optional().default([]),
  photosNotes: z.string().optional().default(''),

  // Section 4 - authentication
  authMethods: z.array(z.enum(authMethods)).optional().default([]),
  authNotes: z.string().optional().default(''),
  authConclusion: z.enum(authConclusions).optional(),

  // Section 5 - condition
  graded: z.boolean().optional().default(false),
  centering: z.number().min(0).max(10).optional(),
  corners: z.number().min(0).max(10).optional(),
  edges: z.number().min(0).max(10).optional(),
  surface: z.number().min(0).max(10).optional(),
  gradingCompany: z.enum(gradingCompanies).optional(),
  gradingScore: z.string().optional().default(''),
  conditionNotes: z.string().optional().default(''),
  conditionClassification: z.enum(conditionClassifications).optional(),

  // Section 6 - rarity
  gradedPopulation: z.string().optional().default(''),
  marketAvailability: z.string().optional().default(''),
  setPopularity: z.number().min(0).max(10).optional(),
  characterPopularity: z.number().min(0).max(10).optional(),
  salesFrequency: z.string().optional().default(''),

  // Section 7 - market
  transactions: z.array(transactionSchema).optional().default([]),

  // Section 8 - financial
  marketValue: z.coerce.number().optional(),
  replacementValue: z.coerce.number().optional(),
  liquidationValue: z.coerce.number().optional(),
  liquidity: z.enum(liquidities).optional(),
  financialComment: z.string().optional().default(''),
  finalEstimate: z.coerce.number().optional(),
});

export type ReportFormData = z.infer<typeof reportFormSchema>;
