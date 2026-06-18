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

// Eén volledige intake — append-only opgeslagen, vormt de historie
// die de longitudinale tijdlijn en kwartaal-herintake mogelijk maakt.
export type Intake = {
  id: string
  userId: string
  timestamp: string            // ISO datum
  antwoorden: VraagAntwoord[]
  importance: WaardenScores    // genormaliseerd, gedeelde schaal
  lived: WaardenScores         // genormaliseerd, gedeelde schaal
  gap: WaardenScores
  top5: WaardeNaam[]
  profielVersie: number        // 1 = eerste intake, +1 per kwartaal-herintake
}

// Afgeleide "huidige staat" die de schermen tonen.
// Niet los opgeslagen — berekend uit de laatste intake + reflecties.
export type GebruikersProfiel = {
  id: string                   // id van de laatste intake
  userId: string
  aangemaakt: string           // timestamp van de éérste intake
  baselineImportance: WaardenScores
  baselineLived: WaardenScores // verfijnd door reflecties (lerend profiel)
  gapScores: WaardenScores
  top5: WaardeNaam[]
  profielVersie: number
  weekIndex: number            // afgeleid van aangemaakt-datum (0-based)
}

export type CommitmentResultaat = 'Ja' | 'Deels' | 'Nee'

export type WekelijkseReflectie = {
  id: string
  week: number
  intakeId: string             // koppelt reflectie aan de actieve intake
  profielVersie: number
  waarde: WaardeNaam
  uitgedrukt: boolean
  tekst: string
  commitmentTekst: string
  commitmentResultaat?: CommitmentResultaat
  aangemaakt: string
}

// Volledige opgeslagen staat — de single source of truth in storage.
export type KernData = {
  userId: string
  intakes: Intake[]            // append-only
  reflecties: WekelijkseReflectie[]
}
