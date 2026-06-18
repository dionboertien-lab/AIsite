import { ALLE_WAARDEN, AntwoordOptie, WaardeNaam, WaardenScores } from './types'

// Gewichten per vraag per antwoordoptie
// SD=Self-Direction, ST=Stimulation, HE=Hedonism, AC=Achievement,
// PO=Power, SE=Security, CO=Conformity, TR=Tradition, BE=Benevolence, UN=Universalism
type GewichtenMap = Partial<Record<WaardeNaam, number>>
type VraagMatrix = Record<AntwoordOptie, GewichtenMap>

export const WEIGHTING_MATRIX: Record<number, VraagMatrix> = {
  1: {
    A: { 'Stimulation': 3, 'Self-Direction': 2 },
    B: { 'Hedonism': 3, 'Security': 1 },
    C: { 'Achievement': 3, 'Self-Direction': 1 },
    D: { 'Benevolence': 3, 'Security': 1 },
  },
  2: {
    A: { 'Self-Direction': 3, 'Stimulation': 1 },
    B: { 'Benevolence': 2, 'Universalism': 2 },
    C: { 'Conformity': 3, 'Security': 1 },
    D: { 'Achievement': 2, 'Power': 2 },
  },
  3: {
    A: { 'Achievement': 3, 'Self-Direction': 1 },
    B: { 'Benevolence': 3, 'Universalism': 1 },
    C: { 'Power': 2, 'Achievement': 2 },
    D: { 'Stimulation': 2, 'Self-Direction': 2 },
  },
  4: {
    A: { 'Universalism': 3, 'Self-Direction': 1 },
    B: { 'Conformity': 2, 'Benevolence': 2 },
    C: { 'Security': 3, 'Conformity': 1 },
    D: { 'Achievement': 2, 'Power': 2 },
  },
  5: {
    A: { 'Stimulation': 3, 'Self-Direction': 2 },
    B: { 'Security': 3, 'Tradition': 1 },
    C: { 'Tradition': 2, 'Conformity': 2 },
    D: { 'Self-Direction': 2, 'Power': 2 },
  },
  6: {
    A: { 'Self-Direction': 3, 'Achievement': 1 },
    B: { 'Benevolence': 3, 'Security': 1 },
    C: { 'Universalism': 3, 'Benevolence': 1 },
    D: { 'Hedonism': 3, 'Self-Direction': 1 },
  },
  // Vragen 7-10 verbeteren de dekking van Tradition, Hedonism, Conformity,
  // Universalism en Power zodat elke waarde minstens vier keer bereikbaar is.
  7: {
    A: { 'Hedonism': 3, 'Self-Direction': 1 },
    B: { 'Security': 3, 'Tradition': 1 },
    C: { 'Achievement': 3, 'Self-Direction': 1 },
    D: { 'Stimulation': 3, 'Hedonism': 1 },
  },
  8: {
    A: { 'Tradition': 3, 'Security': 1 },
    B: { 'Self-Direction': 3, 'Stimulation': 1 },
    C: { 'Conformity': 2, 'Benevolence': 2 },
    D: { 'Hedonism': 3, 'Benevolence': 1 },
  },
  9: {
    A: { 'Universalism': 3, 'Benevolence': 1 },
    B: { 'Power': 3, 'Achievement': 1 },
    C: { 'Security': 3, 'Conformity': 1 },
    D: { 'Benevolence': 3, 'Universalism': 1 },
  },
  10: {
    A: { 'Hedonism': 3, 'Stimulation': 1 },
    B: { 'Achievement': 3, 'Conformity': 1 },
    C: { 'Conformity': 3, 'Tradition': 1 },
    D: { 'Self-Direction': 3, 'Hedonism': 1 },
  },
}

// Theoretische maximale ruwe score per waarde, berekend uit de matrix:
// per vraag de hoogste haalbare bijdrage voor die waarde, gesommeerd over
// alle vragen. Dit is de gedeelde noemer voor normalisatie (lost de
// vertekening op van normaliseren op de eigen as-max).
export const THEORETISCH_MAX: WaardenScores = (() => {
  const max = Object.fromEntries(ALLE_WAARDEN.map((w) => [w, 0])) as WaardenScores
  for (const vraagMatrix of Object.values(WEIGHTING_MATRIX)) {
    for (const waarde of ALLE_WAARDEN) {
      const besteOptie = Math.max(
        ...(['A', 'B', 'C', 'D'] as AntwoordOptie[]).map(
          (optie) => vraagMatrix[optie][waarde] ?? 0
        )
      )
      max[waarde] += besteOptie
    }
  }
  return max
})()
