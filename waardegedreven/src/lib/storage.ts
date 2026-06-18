import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  GebruikersProfiel, Intake, KernData, WekelijkseReflectie,
} from './algoritme/types'
import { reflectieGemiddelden, updateLivedNaReflecties } from './algoritme/scoring'

const SLEUTEL = 'kern_data_v1'

const MS_PER_WEEK = 1000 * 60 * 60 * 24 * 7

function genereerId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

function legeData(): KernData {
  return { userId: genereerId(), intakes: [], reflecties: [] }
}

// Eén bron van waarheid. Corrupte data valt veilig terug op een lege staat.
export async function laadData(): Promise<KernData> {
  try {
    const raw = await AsyncStorage.getItem(SLEUTEL)
    if (!raw) {
      const nieuw = legeData()
      await AsyncStorage.setItem(SLEUTEL, JSON.stringify(nieuw))
      return nieuw
    }
    const data = JSON.parse(raw) as KernData
    if (!data.userId) data.userId = genereerId()
    if (!Array.isArray(data.intakes)) data.intakes = []
    if (!Array.isArray(data.reflecties)) data.reflecties = []
    return data
  } catch {
    return legeData()
  }
}

async function bewaar(data: KernData): Promise<void> {
  await AsyncStorage.setItem(SLEUTEL, JSON.stringify(data))
}

// Append-only: elke intake wordt aan de historie toegevoegd, nooit overschreven.
export async function voegIntakeToe(intake: Intake): Promise<KernData> {
  const data = await laadData()
  data.intakes = [...data.intakes, intake]
  await bewaar(data)
  return data
}

export async function voegReflectieToe(reflectie: WekelijkseReflectie): Promise<KernData> {
  const data = await laadData()
  data.reflecties = [
    ...data.reflecties.filter((r) => r.id !== reflectie.id),
    reflectie,
  ]
  await bewaar(data)
  return data
}

export function laatsteIntake(data: KernData): Intake | null {
  return data.intakes.length ? data.intakes[data.intakes.length - 1] : null
}

export function weekIndexVan(aangemaakt: string): number {
  const verstreken = Date.now() - new Date(aangemaakt).getTime()
  return Math.max(0, Math.floor(verstreken / MS_PER_WEEK))
}

// Leidt de huidige "staat" af uit de laatste intake + reflecties.
// Hier wordt het lerend profiel (B3) toegepast: baseline-lived wordt
// verfijnd met de reflectiesignalen naarmate de weken vorderen.
export function huidigProfiel(data: KernData): GebruikersProfiel | null {
  const intake = laatsteIntake(data)
  if (!intake) return null

  const eersteIntake = data.intakes[0]
  const weekIndex = weekIndexVan(eersteIntake.timestamp)

  const reflectiesVoorIntake = data.reflecties.filter(
    (r) => r.intakeId === intake.id
  )
  const gemiddelden = reflectieGemiddelden(reflectiesVoorIntake)
  const verfijndLived = updateLivedNaReflecties(intake.lived, gemiddelden, weekIndex)

  const gapScores = Object.fromEntries(
    intake.top5.map((w) => [w, Math.round((intake.importance[w] - verfijndLived[w]) * 10) / 10])
  ) as GebruikersProfiel['gapScores']

  return {
    id: intake.id,
    userId: data.userId,
    aangemaakt: eersteIntake.timestamp,
    baselineImportance: intake.importance,
    baselineLived: verfijndLived,
    gapScores: { ...intake.gap, ...gapScores },
    top5: intake.top5,
    profielVersie: intake.profielVersie,
    weekIndex,
  }
}

export function isOnboardingKlaar(data: KernData): boolean {
  return data.intakes.length > 0
}

export async function verwijderAlles(): Promise<void> {
  await AsyncStorage.removeItem(SLEUTEL)
}

export { genereerId }
