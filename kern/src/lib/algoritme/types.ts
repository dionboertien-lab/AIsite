export type WaardeNaam =
  | 'Self-Direction'
  | 'Stimulation'
  | 'Hedonism'
  | 'Achievement'
  | 'Power'
  | 'Security'
  | 'Conformity'
  | 'Tradition'
  | 'Benevolence'
  | 'Universalism'

export const ALLE_WAARDEN: WaardeNaam[] = [
  'Self-Direction',
  'Stimulation',
  'Hedonism',
  'Achievement',
  'Power',
  'Security',
  'Conformity',
  'Tradition',
  'Benevolence',
  'Universalism',
]

// Waarden die tegenover elkaar staan op het Schwartz-circumplex
export const TEGENGESTELDEN: [WaardeNaam, WaardeNaam][] = [
  ['Self-Direction', 'Conformity'],
  ['Self-Direction', 'Security'],
  ['Stimulation', 'Security'],
  ['Stimulation', 'Conformity'],
  ['Achievement', 'Benevolence'],
  ['Achievement', 'Universalism'],
  ['Power', 'Benevolence'],
  ['Power', 'Universalism'],
]

export type WaardenScores = Record<WaardeNaam, number>

export type AntwoordOptie = 'A' | 'B' | 'C' | 'D'

export type VraagAntwoord = {
  vraagNummer: number
  voorkeursOptie: AntwoordOptie
  gedragsOptie: AntwoordOptie
}

export type IntakeResultaat = {
  berekendImportance: WaardenScores
  berekendLived: WaardenScores
  top5: WaardeNaam[]
}

export type GebruikersProfiel = {
  id: string
  aangemaakt: string          // ISO datum
  baselineImportance: WaardenScores
  baselineLived: WaardenScores
  gapScores: WaardenScores
  top5: WaardeNaam[]
  profielVersie: number
  weekCount: number
}

export type WekelijkseReflectie = {
  id: string
  week: number
  waarde: WaardeNaam
  uitgedrukt: boolean
  tekst: string
  commitmentTekst: string
  commitmentResultaat?: 'Ja' | 'Deels' | 'Nee'
  aangemaakt: string
}
