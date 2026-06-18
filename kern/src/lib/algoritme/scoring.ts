import { ALLE_WAARDEN, IntakeResultaat, VraagAntwoord, WaardeNaam, WaardenScores } from './types'
import { WEIGHTING_MATRIX } from './matrix'

function legeScores(): WaardenScores {
  return Object.fromEntries(ALLE_WAARDEN.map((w) => [w, 0])) as WaardenScores
}

function normaliseer(scores: WaardenScores): WaardenScores {
  const max = Math.max(...Object.values(scores))
  if (max === 0) return scores
  return Object.fromEntries(
    ALLE_WAARDEN.map((w) => [w, Math.round((scores[w] / max) * 100) / 10])
  ) as WaardenScores
}

export function berekenProfiel(antwoorden: VraagAntwoord[]): IntakeResultaat {
  const rawImportance = legeScores()
  const rawLived = legeScores()

  for (const { vraagNummer, voorkeursOptie, gedragsOptie } of antwoorden) {
    const vraagMatrix = WEIGHTING_MATRIX[vraagNummer]
    if (!vraagMatrix) continue

    // Voorkeur → importance-signaal
    const voorkeursGewichten = vraagMatrix[voorkeursOptie] ?? {}
    for (const [waarde, gewicht] of Object.entries(voorkeursGewichten)) {
      rawImportance[waarde as WaardeNaam] += gewicht
    }

    // Werkelijk gedrag → lived-signaal
    const gedragsGewichten = vraagMatrix[gedragsOptie] ?? {}
    for (const [waarde, gewicht] of Object.entries(gedragsGewichten)) {
      rawLived[waarde as WaardeNaam] += gewicht
    }
  }

  const importance = normaliseer(rawImportance)
  const lived = normaliseer(rawLived)

  const top5 = [...ALLE_WAARDEN]
    .sort((a, b) => importance[b] - importance[a])
    .slice(0, 5) as WaardeNaam[]

  return { berekendImportance: importance, berekendLived: lived, top5 }
}

export function berekenGap(importance: WaardenScores, lived: WaardenScores): WaardenScores {
  return Object.fromEntries(
    ALLE_WAARDEN.map((w) => [w, Math.round((importance[w] - lived[w]) * 10) / 10])
  ) as WaardenScores
}

export function updateLivedNaReflecties(
  baseline: WaardenScores,
  reflectieGemiddelden: Partial<WaardenScores>,
  weekCount: number
): WaardenScores {
  // Baseline weegt zwaarder in het begin, reflecties zwaarder na 12 weken
  const reflectieGewicht = Math.min(weekCount / 12, 0.7)
  const baselineGewicht = 1 - reflectieGewicht

  return Object.fromEntries(
    ALLE_WAARDEN.map((w) => {
      const reflectieScore = reflectieGemiddelden[w]
      if (reflectieScore === undefined) return [w, baseline[w]]
      const updated = baseline[w] * baselineGewicht + reflectieScore * reflectieGewicht
      return [w, Math.round(updated * 10) / 10]
    })
  ) as WaardenScores
}
