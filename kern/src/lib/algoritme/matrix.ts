import { AntwoordOptie, WaardeNaam } from './types'

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
}
