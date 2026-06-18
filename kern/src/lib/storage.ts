import AsyncStorage from '@react-native-async-storage/async-storage'
import { GebruikersProfiel, WekelijkseReflectie } from './algoritme/types'

const SLEUTELS = {
  PROFIEL: 'kern_profiel',
  REFLECTIES: 'kern_reflecties',
  ONBOARDING_KLAAR: 'kern_onboarding_klaar',
}

export async function slaProfielOp(profiel: GebruikersProfiel): Promise<void> {
  await AsyncStorage.setItem(SLEUTELS.PROFIEL, JSON.stringify(profiel))
}

export async function laadProfiel(): Promise<GebruikersProfiel | null> {
  const data = await AsyncStorage.getItem(SLEUTELS.PROFIEL)
  return data ? JSON.parse(data) : null
}

export async function slaReflectieOp(reflectie: WekelijkseReflectie): Promise<void> {
  const bestaand = await laadReflecties()
  const bijgewerkt = [...bestaand.filter((r) => r.id !== reflectie.id), reflectie]
  await AsyncStorage.setItem(SLEUTELS.REFLECTIES, JSON.stringify(bijgewerkt))
}

export async function laadReflecties(): Promise<WekelijkseReflectie[]> {
  const data = await AsyncStorage.getItem(SLEUTELS.REFLECTIES)
  return data ? JSON.parse(data) : []
}

export async function isOnboardingKlaar(): Promise<boolean> {
  const waarde = await AsyncStorage.getItem(SLEUTELS.ONBOARDING_KLAAR)
  return waarde === 'true'
}

export async function markeerOnboardingKlaar(): Promise<void> {
  await AsyncStorage.setItem(SLEUTELS.ONBOARDING_KLAAR, 'true')
}

export async function verwijderAlles(): Promise<void> {
  await Promise.all(Object.values(SLEUTELS).map((k) => AsyncStorage.removeItem(k)))
}
