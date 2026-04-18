'use client';

import { useRef, useState } from 'react';
import type { Resolver } from 'react-hook-form';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { PhotoUpload } from './photo-upload';
import { RatingButtons } from './rating-buttons';
import {
  reportFormSchema,
  type ReportFormData,
  games,
  languages,
  authMethods,
  authConclusions,
  conditionClassifications,
  gradingCompanies,
  liquidities,
  objectTypes,
} from '@/lib/validations/report';
import { cn } from '@/lib/utils';

const stepDefs: {
  id: string;
  title: string;
  fields: (keyof ReportFormData)[];
}[] = [
  {
    id: 'general',
    title: "Rapport d'expertise",
    fields: [
      'reportNumber',
      'expertiseDate',
      'expertiseLocation',
      'expert',
      'client',
      'subject',
      'objectType',
    ],
  },
  {
    id: 'identification',
    title: 'Identification de la carte',
    fields: [
      'game',
      'set',
      'cardName',
      'rarity',
      'cardNumber',
      'year',
      'language',
      'version',
      'identificationNotes',
    ],
  },
  {
    id: 'photos',
    title: 'Documentation photographique',
    fields: ['photoRecto', 'photoVerso', 'photoDefauts', 'photosNotes'],
  },
  {
    id: 'authentication',
    title: 'Authentification',
    fields: ['authMethods', 'authNotes', 'authConclusion'],
  },
  {
    id: 'condition',
    title: "Évaluation de l'état (condition)",
    fields: [
      'graded',
      'centering',
      'corners',
      'edges',
      'surface',
      'gradingCompany',
      'gradingScore',
      'conditionNotes',
      'conditionClassification',
    ],
  },
  {
    id: 'rarity',
    title: 'Rareté et demande',
    fields: [
      'gradedPopulation',
      'marketAvailability',
      'setPopularity',
      'characterPopularity',
      'salesFrequency',
    ],
  },
  {
    id: 'market',
    title: 'Analyse du marché',
    fields: ['transactions'],
  },
  {
    id: 'financial',
    title: 'Évaluation financière',
    fields: [
      'marketValue',
      'replacementValue',
      'liquidationValue',
      'liquidity',
      'financialComment',
      'finalEstimate',
    ],
  },
];

export function ReportWizard({
  adminEmail,
  initialData,
  reportId,
}: {
  adminEmail: string;
  initialData?: Partial<ReportFormData>;
  reportId?: string;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitIntentRef = useRef(false);

  const methods = useForm<ReportFormData>({
    resolver: zodResolver(reportFormSchema) as Resolver<ReportFormData>,
    mode: 'onBlur',
    defaultValues: {
      expert: adminEmail,
      expertiseDate: new Date().toISOString().slice(0, 10),
      photoRecto: [],
      photoVerso: [],
      photoDefauts: [],
      transactions: [],
      authMethods: [],
      graded: false,
      ...initialData,
    },
  });

  const handleNext = async () => {
    const fields = stepDefs[currentStep].fields;
    const valid = await methods.trigger(fields as never);
    if (valid) {
      setCurrentStep((s) => Math.min(s + 1, stepDefs.length - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLast = currentStep === stepDefs.length - 1;

  const onSubmit = async (data: ReportFormData) => {
    if (!isLast || !submitIntentRef.current) {
      return;
    }
    submitIntentRef.current = false;
    setIsSubmitting(true);
    try {
      const url = reportId ? `/api/reports/${reportId}` : '/api/reports';
      const method = reportId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed');
      toast.success(reportId ? 'Rapport mis à jour' : 'Rapport enregistré');
      if (reportId) {
        window.location.href = `/admin/rapports/${reportId}`;
      } else {
        methods.reset();
        setCurrentStep(0);
      }
    } catch {
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (
            e.key === 'Enter' &&
            e.target instanceof HTMLElement &&
            e.target.tagName !== 'TEXTAREA'
          ) {
            e.preventDefault();
          }
        }}
        className="space-y-8"
      >
        <Stepper current={currentStep} steps={stepDefs} />

        <div className="rounded-xl border bg-white p-6 md:p-8">
          <h2
            className="mb-6 text-2xl font-bold uppercase"
            style={{ fontFamily: 'var(--font-roena)', fontWeight: 400 }}
          >
            {stepDefs[currentStep].title}
          </h2>

          {currentStep === 0 && <StepGeneral />}
          {currentStep === 1 && <StepIdentification />}
          {currentStep === 2 && <StepPhotos />}
          {currentStep === 3 && <StepAuthentication />}
          {currentStep === 4 && <StepCondition />}
          {currentStep === 5 && <StepRarity />}
          {currentStep === 6 && <StepMarket />}
          {currentStep === 7 && <StepFinancial />}
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Précédent
          </Button>

          {!isLast ? (
            <Button type="button" onClick={handleNext} className="bg-black hover:bg-black/90">
              Suivant <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              onClick={() => {
                submitIntentRef.current = true;
              }}
              className="bg-black hover:bg-black/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Envoi…
                </>
              ) : (
                <>
                  Soumettre <Check className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}

function Stepper({
  current,
  steps,
}: {
  current: number;
  steps: { id: string; title: string }[];
}) {
  return (
    <ol className="flex flex-wrap items-center gap-2 text-xs">
      {steps.map((step, i) => (
        <li key={step.id} className="flex items-center gap-2">
          <span
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold',
              i === current && 'border-black bg-black text-white',
              i < current && 'border-green-600 bg-green-600 text-white',
              i > current && 'border-gray-300 bg-white text-gray-500'
            )}
          >
            {i < current ? <Check className="h-3 w-3" /> : i + 1}
          </span>
          <span
            className={cn(
              'hidden uppercase md:inline',
              i === current ? 'font-semibold text-black' : 'text-gray-500'
            )}
          >
            {step.title}
          </span>
          {i < steps.length - 1 && <span className="text-gray-300">—</span>}
        </li>
      ))}
    </ol>
  );
}

function FieldError({ name }: { name: string }) {
  const {
    formState: { errors },
  } = useFormContext();
  const err = (errors as Record<string, { message?: string } | undefined>)[name];
  if (!err?.message) return null;
  return <p className="mt-1 text-xs text-red-600">{err.message}</p>;
}

function StepGeneral() {
  const { register, setValue, watch } = useFormContext<ReportFormData>();
  const objectType = watch('objectType');

  return (
    <div className="space-y-5">
      <div>
        <Label>Numéro du rapport</Label>
        <Input {...register('reportNumber')} />
        <FieldError name="reportNumber" />
      </div>
      <div>
        <Label>Date d'expertise</Label>
        <Input type="date" {...register('expertiseDate')} />
        <FieldError name="expertiseDate" />
      </div>
      <div>
        <Label>Lieu d'expertise</Label>
        <Input {...register('expertiseLocation')} />
        <FieldError name="expertiseLocation" />
      </div>
      <div>
        <Label>Expert</Label>
        <Input {...register('expert')} />
        <FieldError name="expert" />
      </div>
      <div>
        <Label>Client / Mandant</Label>
        <Input {...register('client')} />
        <FieldError name="client" />
      </div>
      <div>
        <Label>Objet de l'expertise</Label>
        <Textarea rows={3} {...register('subject')} />
        <FieldError name="subject" />
      </div>
      <div>
        <Label>Type d'objet</Label>
        <Select
          value={objectType ?? ''}
          onValueChange={(v) => setValue('objectType', v as typeof objectTypes[number])}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="carte">Carte</SelectItem>
            <SelectItem value="item">Item</SelectItem>
            <SelectItem value="collection">Collection</SelectItem>
          </SelectContent>
        </Select>
        <FieldError name="objectType" />
      </div>
    </div>
  );
}

function StepIdentification() {
  const { register, setValue, watch } = useFormContext<ReportFormData>();
  const game = watch('game');
  const language = watch('language');

  const gameLabels: Record<string, string> = {
    pokemon: 'Pokémon',
    onepiece: 'One Piece',
    dragonball: 'Dragon Ball',
    magic: 'Magic: The Gathering',
    lorcana: 'Disney Lorcana',
    yugioh: 'Yu-Gi-Oh!',
    autre: 'Autre',
  };
  const langLabels: Record<string, string> = {
    fr: 'Français',
    en: 'Anglais',
    jp: 'Japonais',
    de: 'Allemand',
    es: 'Espagnol',
    it: 'Italien',
    kr: 'Coréen',
    cn: 'Chinois',
    autre: 'Autre',
  };

  return (
    <div className="space-y-5">
      <div>
        <Label>Jeu</Label>
        <Select
          value={game ?? ''}
          onValueChange={(v) => setValue('game', v as typeof games[number])}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            {games.map((g) => (
              <SelectItem key={g} value={g}>
                {gameLabels[g]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError name="game" />
      </div>
      <div>
        <Label>Set</Label>
        <Input {...register('set')} />
        <FieldError name="set" />
      </div>
      <div>
        <Label>Nom</Label>
        <Input {...register('cardName')} />
        <FieldError name="cardName" />
      </div>
      <div>
        <Label>Rareté</Label>
        <Input {...register('rarity')} />
        <FieldError name="rarity" />
      </div>
      <div>
        <Label>Numéro</Label>
        <Input {...register('cardNumber')} />
        <FieldError name="cardNumber" />
      </div>
      <div>
        <Label>Année</Label>
        <Input {...register('year')} />
        <FieldError name="year" />
      </div>
      <div>
        <Label>Langue</Label>
        <Select
          value={language ?? ''}
          onValueChange={(v) => setValue('language', v as typeof languages[number])}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((l) => (
              <SelectItem key={l} value={l}>
                {langLabels[l]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError name="language" />
      </div>
      <div>
        <Label>Version</Label>
        <Input {...register('version')} />
        <FieldError name="version" />
      </div>
      <div>
        <Label>Remarque</Label>
        <Textarea rows={3} {...register('identificationNotes')} />
      </div>
    </div>
  );
}

function StepPhotos() {
  const { setValue, watch, register } = useFormContext<ReportFormData>();
  const recto = watch('photoRecto') ?? [];
  const verso = watch('photoVerso') ?? [];
  const defauts = watch('photoDefauts') ?? [];

  return (
    <div className="space-y-6">
      <div>
        <Label>Recto</Label>
        <PhotoUpload value={recto} onChange={(v) => setValue('photoRecto', v)} />
      </div>
      <div>
        <Label>Verso</Label>
        <PhotoUpload value={verso} onChange={(v) => setValue('photoVerso', v)} />
      </div>
      <div>
        <Label>Défauts éventuels</Label>
        <PhotoUpload value={defauts} onChange={(v) => setValue('photoDefauts', v)} />
      </div>
      <div>
        <Label>Remarque</Label>
        <Textarea rows={3} {...register('photosNotes')} />
      </div>
    </div>
  );
}

function StepAuthentication() {
  const { register, setValue, watch } = useFormContext<ReportFormData>();
  const selected = watch('authMethods') ?? [];
  const conclusion = watch('authConclusion');

  const methodLabels: Record<string, string> = {
    trame: "Trame d'impression",
    typographie: 'Vérification typographique',
    texture: 'Texture et rigidité du support',
    comparaison: 'Comparaison avec exemplaires authentiques',
    uv: 'Lumière UV',
    caracteristiques: 'Vérification des caractéristiques spécifiques',
  };

  const toggleMethod = (value: typeof authMethods[number]) => {
    const next = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    setValue('authMethods', next);
  };

  return (
    <div className="space-y-5">
      <div>
        <Label>Méthodes utilisées</Label>
        <div className="mt-2 space-y-2">
          {authMethods.map((method) => (
            <label key={method} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={selected.includes(method)}
                onCheckedChange={() => toggleMethod(method)}
              />
              {methodLabels[method]}
            </label>
          ))}
        </div>
        <FieldError name="authMethods" />
      </div>
      <div>
        <Label>Remarque</Label>
        <Textarea rows={3} {...register('authNotes')} />
      </div>
      <div>
        <Label>Conclusion</Label>
        <Select
          value={conclusion ?? ''}
          onValueChange={(v) => setValue('authConclusion', v as typeof authConclusions[number])}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="authentique">Authentique</SelectItem>
            <SelectItem value="contrefacon">Contrefaçon</SelectItem>
            <SelectItem value="doute">Doute nécessitant analyses complémentaires</SelectItem>
          </SelectContent>
        </Select>
        <FieldError name="authConclusion" />
      </div>
    </div>
  );
}

function StepCondition() {
  const { register, setValue, watch } = useFormContext<ReportFormData>();
  const graded = watch('graded');
  const centering = watch('centering');
  const corners = watch('corners');
  const edges = watch('edges');
  const surface = watch('surface');
  const gradingCompany = watch('gradingCompany');
  const classification = watch('conditionClassification');

  const companyLabels: Record<string, string> = {
    psa: 'PSA',
    bgs: 'Beckett (BGS)',
    cgc: 'CGC',
    sgc: 'SGC',
    ace: 'ACE Grading',
    autre: 'Autre',
  };
  const classificationLabels: Record<string, string> = {
    'gem-mint': 'Gem Mint',
    mint: 'Mint',
    'near-mint': 'Near Mint',
    excellent: 'Excellent',
    'very-good': 'Very Good',
    good: 'Good',
    'light-played': 'Light Played',
    played: 'Played',
    poor: 'Poor',
  };

  return (
    <div className="space-y-5">
      <div>
        <Label>Carte gradée</Label>
        <div className="mt-2 flex gap-2">
          <Button
            type="button"
            variant={graded ? 'default' : 'outline'}
            onClick={() => setValue('graded', true)}
            className={cn('min-w-20', graded && 'bg-black hover:bg-black/90')}
          >
            Oui
          </Button>
          <Button
            type="button"
            variant={!graded ? 'default' : 'outline'}
            onClick={() => setValue('graded', false)}
            className={cn('min-w-20', !graded && 'bg-black hover:bg-black/90')}
          >
            Non
          </Button>
        </div>
      </div>

      {!graded ? (
        <>
          <div>
            <Label>Centrage</Label>
            <RatingButtons value={centering} onChange={(v) => setValue('centering', v)} />
            <FieldError name="centering" />
          </div>
          <div>
            <Label>Coins</Label>
            <RatingButtons value={corners} onChange={(v) => setValue('corners', v)} />
            <FieldError name="corners" />
          </div>
          <div>
            <Label>Bords</Label>
            <RatingButtons value={edges} onChange={(v) => setValue('edges', v)} />
            <FieldError name="edges" />
          </div>
          <div>
            <Label>Surface</Label>
            <RatingButtons value={surface} onChange={(v) => setValue('surface', v)} />
            <FieldError name="surface" />
          </div>
        </>
      ) : (
        <>
          <div>
            <Label>Société de gradation</Label>
            <Select
              value={gradingCompany ?? ''}
              onValueChange={(v) => setValue('gradingCompany', v as typeof gradingCompanies[number])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                {gradingCompanies.map((c) => (
                  <SelectItem key={c} value={c}>
                    {companyLabels[c]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError name="gradingCompany" />
          </div>
          <div>
            <Label>Note</Label>
            <Input {...register('gradingScore')} />
            <FieldError name="gradingScore" />
          </div>
        </>
      )}

      <div>
        <Label>Remarque</Label>
        <Textarea rows={3} {...register('conditionNotes')} />
      </div>

      <div>
        <Label>Classification de l'état</Label>
        <Select
          value={classification ?? ''}
          onValueChange={(v) =>
            setValue('conditionClassification', v as typeof conditionClassifications[number])
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            {conditionClassifications.map((c) => (
              <SelectItem key={c} value={c}>
                {classificationLabels[c]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError name="conditionClassification" />
      </div>
    </div>
  );
}

function StepRarity() {
  const { register, setValue, watch } = useFormContext<ReportFormData>();
  const setPop = watch('setPopularity');
  const charPop = watch('characterPopularity');

  return (
    <div className="space-y-5">
      <div>
        <Label>Population gradée connue</Label>
        <Input {...register('gradedPopulation')} />
        <FieldError name="gradedPopulation" />
      </div>
      <div>
        <Label>Disponibilité sur le marché</Label>
        <Input {...register('marketAvailability')} />
        <FieldError name="marketAvailability" />
      </div>
      <div>
        <Label>Popularité du set</Label>
        <RatingButtons value={setPop} onChange={(v) => setValue('setPopularity', v)} />
        <FieldError name="setPopularity" />
      </div>
      <div>
        <Label>Popularité du personnage</Label>
        <RatingButtons
          value={charPop}
          onChange={(v) => setValue('characterPopularity', v)}
        />
        <FieldError name="characterPopularity" />
      </div>
      <div>
        <Label>Fréquence des ventes</Label>
        <Textarea rows={3} {...register('salesFrequency')} />
      </div>
    </div>
  );
}

function StepMarket() {
  const { setValue, watch } = useFormContext<ReportFormData>();
  const transactions = watch('transactions') ?? [];

  const addTransaction = () => {
    setValue('transactions', [
      ...transactions,
      { date: '', price: '', platform: '', photo: '' },
    ]);
  };

  const removeTransaction = (index: number) => {
    setValue(
      'transactions',
      transactions.filter((_, i) => i !== index)
    );
  };

  const updateTransaction = (index: number, field: 'date' | 'price' | 'platform' | 'photo', value: string) => {
    const next = [...transactions];
    next[index] = { ...next[index], [field]: value };
    setValue('transactions', next);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Label className="text-base">Transactions comparables</Label>
        <Button type="button" variant="outline" size="sm" onClick={addTransaction}>
          + Ajouter une transaction
        </Button>
      </div>

      {transactions.length === 0 && (
        <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          Aucune transaction. Cliquez sur « Ajouter une transaction ».
        </div>
      )}

      <div className="space-y-4">
        {transactions.map((tx, i) => (
          <div key={i} className="rounded-lg border p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold">Transaction #{i + 1}</div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeTransaction(i)}
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                Supprimer
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={tx.date ?? ''}
                  onChange={(e) => updateTransaction(i, 'date', e.target.value)}
                />
              </div>
              <div>
                <Label>Prix (€)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={tx.price ?? ''}
                  onChange={(e) => updateTransaction(i, 'price', e.target.value)}
                />
              </div>
              <div>
                <Label>Plateforme</Label>
                <Input
                  value={tx.platform ?? ''}
                  onChange={(e) => updateTransaction(i, 'platform', e.target.value)}
                />
              </div>
            </div>

            <div className="mt-4">
              <Label>Photo</Label>
              <PhotoUpload
                value={tx.photo ? [tx.photo] : []}
                onChange={(v) => updateTransaction(i, 'photo', v[0] ?? '')}
                multiple={false}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepFinancial() {
  const { register, setValue, watch } = useFormContext<ReportFormData>();
  const liquidity = watch('liquidity');
  const liquidityLabels: Record<string, string> = {
    'tres-haute': 'Très haute',
    haute: 'Haute',
    moyenne: 'Moyenne',
    faible: 'Faible',
    'tres-faible': 'Très faible',
  };

  return (
    <div className="space-y-5">
      <div>
        <Label>Valeur de marché (€)</Label>
        <Input type="number" step="0.01" {...register('marketValue')} />
        <FieldError name="marketValue" />
      </div>
      <div>
        <Label>Valeur de remplacement (€)</Label>
        <Input type="number" step="0.01" {...register('replacementValue')} />
        <FieldError name="replacementValue" />
      </div>
      <div>
        <Label>Valeur de liquidation (€)</Label>
        <Input type="number" step="0.01" {...register('liquidationValue')} />
        <FieldError name="liquidationValue" />
      </div>
      <div>
        <Label>Liquidité de la carte</Label>
        <Select
          value={liquidity ?? ''}
          onValueChange={(v) => setValue('liquidity', v as typeof liquidities[number])}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            {liquidities.map((l) => (
              <SelectItem key={l} value={l}>
                {liquidityLabels[l]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError name="liquidity" />
      </div>
      <div>
        <Label>Commentaire</Label>
        <Textarea rows={3} {...register('financialComment')} />
      </div>
      <div>
        <Label>Estimation finale (€)</Label>
        <Input type="number" step="0.01" {...register('finalEstimate')} />
        <FieldError name="finalEstimate" />
      </div>
    </div>
  );
}
