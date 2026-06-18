import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import {
  GebruikersProfiel, Intake, KernData, WekelijkseReflectie,
} from '../lib/algoritme/types'
import {
  laadData, voegIntakeToe as opslaanIntake, voegReflectieToe as opslaanReflectie,
  huidigProfiel, isOnboardingKlaar,
} from '../lib/storage'

type KernContextType = {
  laden: boolean
  data: KernData | null
  profiel: GebruikersProfiel | null
  onboardingKlaar: boolean
  voegIntakeToe: (intake: Intake) => Promise<void>
  voegReflectieToe: (reflectie: WekelijkseReflectie) => Promise<void>
  herlaad: () => Promise<void>
}

const KernContext = createContext<KernContextType | null>(null)

export function KernProvider({ children }: { children: React.ReactNode }) {
  const [laden, setLaden] = useState(true)
  const [data, setData] = useState<KernData | null>(null)

  const herlaad = useCallback(async () => {
    const verse = await laadData()
    setData(verse)
  }, [])

  useEffect(() => {
    laadData().then((d) => {
      setData(d)
      setLaden(false)
    })
  }, [])

  const voegIntakeToe = useCallback(async (intake: Intake) => {
    const bijgewerkt = await opslaanIntake(intake)
    setData(bijgewerkt)
  }, [])

  const voegReflectieToe = useCallback(async (reflectie: WekelijkseReflectie) => {
    const bijgewerkt = await opslaanReflectie(reflectie)
    setData(bijgewerkt)
  }, [])

  const profiel = data ? huidigProfiel(data) : null
  const onboardingKlaar = data ? isOnboardingKlaar(data) : false

  return (
    <KernContext.Provider
      value={{ laden, data, profiel, onboardingKlaar, voegIntakeToe, voegReflectieToe, herlaad }}
    >
      {children}
    </KernContext.Provider>
  )
}

export function useKern(): KernContextType {
  const ctx = useContext(KernContext)
  if (!ctx) throw new Error('useKern moet binnen een KernProvider gebruikt worden')
  return ctx
}
