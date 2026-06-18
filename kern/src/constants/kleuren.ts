export const KLEUREN = {
  // Primaire kleuren
  primair: '#1A1A2E',       // Diepblauw — rust, diepgang
  accent: '#E94560',        // Warmrood — energie, gap-indicator
  accentZacht: '#FF6B6B',   // Zacht rood — highlights

  // Achtergronden
  achtergrond: '#F8F7F4',   // Warm wit
  kaart: '#FFFFFF',
  kaartSchaduw: '#E8E6E0',

  // Tekst
  tekstPrimair: '#1A1A2E',
  tekstSecundair: '#6B7280',
  tekstLicht: '#9CA3AF',

  // Gap-indicator kleuren (groen = klein gap, rood = groot gap)
  gapKlein: '#10B981',      // Groen — gap < 2
  gapMiddel: '#F59E0B',     // Oranje — gap 2-4
  gapGroot: '#EF4444',      // Rood — gap > 4

  // Waarden kleuren (voor visuele identiteitskaarten)
  waardeKleuren: {
    'Self-Direction': '#6366F1',
    'Stimulation': '#F97316',
    'Hedonism': '#EC4899',
    'Achievement': '#EAB308',
    'Power': '#8B5CF6',
    'Security': '#06B6D4',
    'Conformity': '#64748B',
    'Tradition': '#92400E',
    'Benevolence': '#22C55E',
    'Universalism': '#14B8A6',
  } as Record<string, string>,

  // UI
  border: '#E5E7EB',
  succes: '#10B981',
  wit: '#FFFFFF',
}

export function gapKleur(gap: number): string {
  if (gap < 2) return KLEUREN.gapKlein
  if (gap < 4) return KLEUREN.gapMiddel
  return KLEUREN.gapGroot
}
