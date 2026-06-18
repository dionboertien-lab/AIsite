import {
  ALLE_WAARDEN, CommitmentResultaat, TEGENGESTELDEN,
  VraagAntwoord, WaardeNaam, WaardenScores, WekelijkseReflectie,
} from './types'
import { WEIGHTING_MATRIX, THEORETISCH_MAX } from './matrix'

export type IntakeResultaat = {
  berekendImportance: WaardenScores
  berekendLived: WaardenScores
  top5: WaardeNaam[]
}

function legeScores(): WaardenScores {
  return Object.fromEntries(ALLE_WAARDEN.map((w) => [w, 0])) as WaardenScores
}

function afronden(n: number): number {
  return Math.round(n * 10) / 10
}

export function berekenProfiel(antwoorden: VraagAntwoord[]): IntakeResultaat {
  const rawImportance = legeScores()
  const rawLived = legeScores()

  for (const { vraagNummer, voorkeursOptie, gedragsOptie } of antwoorden) {
    const vraagMatrix = WEIGHTING_MATRIX[vraagNummer]
    if (!vraagMatrix) continue

    for (const [waarde, gewicht] of Object.entries(vraagMatrix[voorkeursOptie] ?? {})) {
      rawImportance[waarde as WaardeNaam] += gewicht
    }
    for (const [waarde, gewicht] of Object.entries(vraagMatrix[gedragsOptie] ?? {})) {
      rawLived[waarde as WaardeNaam] += gewicht
    }
  }

  // Gedeelde-schaal normalisatie: importance én lived worden door de ZELFDE
  // noemer (theoretische max per waarde) gedeeld. Daardoor is de gap een
  // echte importance-vs-lived afstand op één schaal, niet het verschil tussen
  // twee onafhankelijk genormaliseerde assen.
  const importance = legeScores()
  const lived = legeScores()
  for (const w of ALLE_WAARDEN) {
    const noemer = THEORETISCH_MAX[w] || 1
    importance[w] = afronden((rawImportance[w] / noemer) * 10)
    lived[w] = afronden((rawLived[w] / noemer) * 10)
  }

  const top5 = [...ALLE_WAARDEN]
    .sort((a, b) => importance[b] - importance[a])
    .slice(0, 5)

  return { berekendImportance: importance, berekendLived: lived, top5 }
}

export function berekenGap(
  importance: WaardenScores,
  lived: WaardenScores
): WaardenScores {
  return Object.fromEntries(
    ALLE_WAARDEN.map((w) => [w, afronden(importance[w] - lived[w])])
  ) as WaardenScores
}

// Circumplex-validatie (B2): vindt tegengestelde waarden die beide hoog
// scoren — een spanning die de gebruiker waardevolle inzichten geeft.
export function vindSpanningen(
  importance: WaardenScores,
  drempel = 6.5
): [WaardeNaam, WaardeNaam][] {
  return TEGENGESTELDEN.filter(
    ([a, b]) => importance[a] >= drempel && importance[b] >= drempel
  )
}

// Vertaalt commitment-resultaten naar een "geleefd"-signaal per waarde,
// gemiddeld over alle reflecties voor die waarde.
const RESULTAAT_SCORE: Record<CommitmentResultaat, number> = {
  Ja: 8.5,
  Deels: 5.5,
  Nee: 2.5,
}

export function reflectieGemiddelden(
  reflecties: WekelijkseReflectie[]
): Partial<WaardenScores> {
  const som: Partial<Record<WaardeNaam, number>> = {}
  const aantal: Partial<Record<WaardeNaam, number>> = {}

  for (const r of reflecties) {
    if (!r.commitmentResultaat) continue
    const score = RESULTAAT_SCORE[r.commitmentResultaat]
    som[r.waarde] = (som[r.waarde] ?? 0) + score
    aantal[r.waarde] = (aantal[r.waarde] ?? 0) + 1
  }

  const gemiddelden: Partial<WaardenScores> = {}
  for (const w of ALLE_WAARDEN) {
    if (aantal[w]) gemiddelden[w] = afronden(som[w]! / aantal[w]!)
  }
  return gemiddelden
}

// Lerend profiel (B3): mengt de baseline-lived met de reflectiesignalen.
// Baseline weegt zwaarder in het begin, reflecties zwaarder na ~12 weken.
export function updateLivedNaReflecties(
  baseline: WaardenScores,
  reflectieScores: Partial<WaardenScores>,
  weekIndex: number
): WaardenScores {
  const reflectieGewicht = Math.min(weekIndex / 12, 0.7)
  const baselineGewicht = 1 - reflectieGewicht

  return Object.fromEntries(
    ALLE_WAARDEN.map((w) => {
      const reflectieScore = reflectieScores[w]
      if (reflectieScore === undefined) return [w, baseline[w]]
      return [w, afronden(baseline[w] * baselineGewicht + reflectieScore * reflectieGewicht)]
    })
  ) as WaardenScores
}
