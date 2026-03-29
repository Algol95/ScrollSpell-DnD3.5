export interface Spell {
  id: string;
  name: string;
  subtitle?: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
  target?: string;
  savingThrow?: string;
  spellResistance?: string;
}

export interface SpellbookPage {
  id: string;
  pageNumber: number;
  spells: Spell[];
}

export const SPELL_SCHOOLS = [
  "Abjuración",
  "Conjuración",
  "Adivinación",
  "Encantamiento",
  "Evocación",
  "Ilusión",
  "Nigromancia",
  "Transmutación",
] as const;

export const SPELL_LEVELS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
