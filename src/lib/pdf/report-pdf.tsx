import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  renderToBuffer,
} from '@react-pdf/renderer';
import type { ReportFormData } from '@/lib/validations/report';

const colors = {
  black: '#000000',
  darkGray: '#333333',
  mid: '#666666',
  light: '#999999',
  border: '#e5e5e5',
  bg: '#fafafa',
  accent: '#79E8B3',
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: colors.darkGray,
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: colors.black,
    paddingBottom: 12,
    marginBottom: 20,
  },
  brand: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 4,
    color: colors.black,
    marginBottom: 4,
  },
  headerSub: {
    fontSize: 9,
    color: colors.mid,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
    color: colors.black,
  },
  meta: {
    fontSize: 9,
    color: colors.mid,
    marginBottom: 20,
  },
  section: {
    marginBottom: 16,
    break: false,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.black,
    backgroundColor: colors.bg,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  label: {
    width: 150,
    fontSize: 9,
    color: colors.mid,
    fontFamily: 'Helvetica-Bold',
  },
  value: {
    flex: 1,
    fontSize: 10,
    color: colors.darkGray,
  },
  note: {
    fontSize: 9,
    color: colors.darkGray,
    marginTop: 4,
    fontStyle: 'italic',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  photo: {
    width: 120,
    height: 120,
    objectFit: 'cover',
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: 3,
  },
  photoLabel: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.mid,
    marginTop: 10,
    marginBottom: 4,
  },
  transactionCard: {
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: 4,
    padding: 8,
    marginBottom: 6,
  },
  transactionHeader: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    color: colors.mid,
    marginBottom: 4,
  },
  transactionRow: {
    flexDirection: 'row',
    gap: 12,
    fontSize: 9,
  },
  transactionPhoto: {
    width: 80,
    height: 80,
    marginTop: 6,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: 3,
  },
  estimateBox: {
    marginTop: 10,
    padding: 10,
    backgroundColor: colors.black,
    color: '#ffffff',
    borderRadius: 4,
  },
  estimateLabel: {
    fontSize: 9,
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  estimateValue: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
  },
  signatureBlock: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 40,
  },
  signatureBox: {
    flex: 1,
  },
  signatureLabel: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.mid,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  signatureLine: {
    borderTopWidth: 0.5,
    borderTopColor: colors.darkGray,
    marginTop: 60,
    paddingTop: 4,
    fontSize: 8,
    color: colors.mid,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
    fontSize: 8,
    color: colors.light,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const gameLabels: Record<string, string> = {
  pokemon: 'Pokémon',
  onepiece: 'One Piece',
  dragonball: 'Dragon Ball',
  magic: 'Magic',
  lorcana: 'Lorcana',
  yugioh: 'Yu-Gi-Oh!',
  autre: 'Autre',
};

const languageLabels: Record<string, string> = {
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

const authMethodLabels: Record<string, string> = {
  trame: 'Analyse de trame',
  typographie: 'Typographie',
  texture: 'Texture',
  comparaison: 'Comparaison',
  uv: 'Lumière UV',
  caracteristiques: 'Caractéristiques physiques',
};

const authConclusionLabels: Record<string, string> = {
  authentique: 'Authentique',
  contrefacon: 'Contrefaçon',
  doute: 'Doute subsistant',
};

const conditionLabels: Record<string, string> = {
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

const gradingCompanyLabels: Record<string, string> = {
  psa: 'PSA',
  bgs: 'BGS (Beckett)',
  cgc: 'CGC',
  sgc: 'SGC',
  ace: 'ACE',
  autre: 'Autre',
};

const liquidityLabels: Record<string, string> = {
  'tres-haute': 'Très haute',
  haute: 'Haute',
  moyenne: 'Moyenne',
  faible: 'Faible',
  'tres-faible': 'Très faible',
};

const objectTypeLabels: Record<string, string> = {
  carte: 'Carte',
  item: 'Item',
  collection: 'Collection',
};

function fmtEuro(n: number | undefined | null): string {
  if (n == null || Number.isNaN(n)) return '—';
  const rounded = Math.round(n);
  const withSpaces = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${withSpaces} €`;
}

function fmtDate(s: string | undefined): string {
  if (!s) return '—';
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return s;
  return d.toLocaleDateString('fr-FR');
}

function Row({ label, value }: { label: string; value?: string | number | null }) {
  if (value == null || value === '' || value === undefined) return null;
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{String(value)}</Text>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section} wrap={false}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function PhotoGrid({ urls, label }: { urls: string[] | undefined; label: string }) {
  if (!urls || urls.length === 0) return null;
  return (
    <View wrap={false}>
      <Text style={styles.photoLabel}>{label}</Text>
      <View style={styles.photoGrid}>
        {urls.map((u, i) => (
          <Image key={i} src={u} style={styles.photo} />
        ))}
      </View>
    </View>
  );
}

export function ReportPDF({
  data,
  createdAt,
  adminEmail,
}: {
  data: ReportFormData;
  createdAt: string;
  adminEmail: string;
}) {
  const generatedAt = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Document
      author="KAMI"
      title={`Rapport d'expertise${data.reportNumber ? ` n°${data.reportNumber}` : ''}`}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>KAMI</Text>
          <Text style={styles.headerSub}>Expertise et authentification de cartes à collectionner</Text>
        </View>

        <Text style={styles.title}>
          {data.reportNumber ? `Rapport d'expertise n°${data.reportNumber}` : "Rapport d'expertise"}
        </Text>
        <Text style={styles.meta}>
          Généré le {generatedAt} · Expert : {data.expert || adminEmail}
          {createdAt ? ` · Créé le ${fmtDate(createdAt)}` : ''}
        </Text>

        <Section title="Général">
          <Row label="Numéro" value={data.reportNumber} />
          <Row label="Date d'expertise" value={fmtDate(data.expertiseDate)} />
          <Row label="Lieu" value={data.expertiseLocation} />
          <Row label="Expert" value={data.expert} />
          <Row label="Client / Mandant" value={data.client} />
          <Row label="Objet de l'expertise" value={data.subject} />
          <Row
            label="Type d'objet"
            value={data.objectType ? objectTypeLabels[data.objectType] : undefined}
          />
        </Section>

        <Section title="Identification">
          <Row label="Jeu" value={data.game ? gameLabels[data.game] : undefined} />
          <Row label="Set / extension" value={data.set} />
          <Row label="Nom de la carte" value={data.cardName} />
          <Row label="Rareté" value={data.rarity} />
          <Row label="Numéro de carte" value={data.cardNumber} />
          <Row label="Année" value={data.year} />
          <Row
            label="Langue"
            value={data.language ? languageLabels[data.language] : undefined}
          />
          <Row label="Version / édition" value={data.version} />
          {data.identificationNotes ? (
            <Text style={styles.note}>{data.identificationNotes}</Text>
          ) : null}
        </Section>

        <Section title="Authentification">
          <Row
            label="Méthodes utilisées"
            value={data.authMethods?.map((m) => authMethodLabels[m]).join(', ')}
          />
          <Row
            label="Conclusion"
            value={data.authConclusion ? authConclusionLabels[data.authConclusion] : undefined}
          />
          {data.authNotes ? <Text style={styles.note}>{data.authNotes}</Text> : null}
        </Section>

        <Section title="État (condition)">
          <Row label="Carte gradée" value={data.graded ? 'Oui' : 'Non'} />
          <Row label="Centrage" value={data.centering != null ? `${data.centering}/10` : undefined} />
          <Row label="Coins" value={data.corners != null ? `${data.corners}/10` : undefined} />
          <Row label="Bords" value={data.edges != null ? `${data.edges}/10` : undefined} />
          <Row label="Surface" value={data.surface != null ? `${data.surface}/10` : undefined} />
          <Row
            label="Société de grading"
            value={
              data.gradingCompany ? gradingCompanyLabels[data.gradingCompany] : undefined
            }
          />
          <Row label="Score de grading" value={data.gradingScore} />
          <Row
            label="Classification"
            value={
              data.conditionClassification
                ? conditionLabels[data.conditionClassification]
                : undefined
            }
          />
          {data.conditionNotes ? <Text style={styles.note}>{data.conditionNotes}</Text> : null}
        </Section>

        <Section title="Rareté et demande">
          <Row label="Population gradée" value={data.gradedPopulation} />
          <Row label="Disponibilité sur le marché" value={data.marketAvailability} />
          <Row
            label="Popularité du set"
            value={data.setPopularity != null ? `${data.setPopularity}/10` : undefined}
          />
          <Row
            label="Popularité du perso."
            value={
              data.characterPopularity != null ? `${data.characterPopularity}/10` : undefined
            }
          />
          <Row label="Fréquence de vente" value={data.salesFrequency} />
        </Section>

        {data.transactions && data.transactions.length > 0 && (
          <Section title="Analyse du marché — transactions comparables">
            {data.transactions.map((tx, i) => (
              <View key={i} style={styles.transactionCard} wrap={false}>
                <Text style={styles.transactionHeader}>Transaction #{i + 1}</Text>
                <View style={styles.transactionRow}>
                  <Text>Date : {fmtDate(tx.date)}</Text>
                  <Text>Prix : {tx.price ? `${tx.price} €` : '—'}</Text>
                  <Text>Plateforme : {tx.platform || '—'}</Text>
                </View>
                {tx.photo ? <Image src={tx.photo} style={styles.transactionPhoto} /> : null}
              </View>
            ))}
          </Section>
        )}

        <Section title="Évaluation financière">
          <Row label="Valeur de marché" value={fmtEuro(data.marketValue)} />
          <Row label="Valeur de remplacement" value={fmtEuro(data.replacementValue)} />
          <Row label="Valeur de liquidation" value={fmtEuro(data.liquidationValue)} />
          <Row
            label="Liquidité de la carte"
            value={data.liquidity ? liquidityLabels[data.liquidity] : undefined}
          />
          {data.financialComment ? (
            <Text style={styles.note}>{data.financialComment}</Text>
          ) : null}
          {data.finalEstimate != null && !Number.isNaN(data.finalEstimate) && (
            <View style={styles.estimateBox}>
              <Text style={styles.estimateLabel}>Estimation finale</Text>
              <Text style={styles.estimateValue}>{fmtEuro(data.finalEstimate)}</Text>
            </View>
          )}

          <View style={styles.signatureBlock} wrap={false}>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureLabel}>Signature de l&apos;expert</Text>
              <Text style={styles.signatureLine}>{data.expert || adminEmail}</Text>
            </View>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureLabel}>Tampon / cachet</Text>
              <Text style={styles.signatureLine}> </Text>
            </View>
          </View>
        </Section>

        {((data.photoRecto && data.photoRecto.length > 0) ||
          (data.photoVerso && data.photoVerso.length > 0) ||
          (data.photoDefauts && data.photoDefauts.length > 0)) && (
          <View break>
            <Text style={styles.sectionTitle}>Documentation photographique</Text>
            <PhotoGrid urls={data.photoRecto} label="Recto" />
            <PhotoGrid urls={data.photoVerso} label="Verso" />
            <PhotoGrid urls={data.photoDefauts} label="Défauts" />
            {data.photosNotes ? <Text style={styles.note}>{data.photosNotes}</Text> : null}
          </View>
        )}

        <View style={styles.footer} fixed>
          <Text>KAMI · Expertise et authentification</Text>
          <Text
            render={({ pageNumber, totalPages }) => `Page ${pageNumber} / ${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  );
}

export function renderReportPdf(args: {
  data: ReportFormData;
  createdAt: string;
  adminEmail: string;
}) {
  return renderToBuffer(<ReportPDF {...args} />);
}
