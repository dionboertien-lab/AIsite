// Locale-onafhankelijke dag-bepaling via getDay() (0 = zondag, 1 = maandag, 5 = vrijdag).
export type ReflectieDag = 'maandag' | 'vrijdag' | 'anders'

export function huidigeReflectieDag(): ReflectieDag {
  const dag = new Date().getDay()
  if (dag === 1) return 'maandag'
  if (dag === 5) return 'vrijdag'
  return 'anders'
}

export function isReflectieDag(): boolean {
  return huidigeReflectieDag() !== 'anders'
}
