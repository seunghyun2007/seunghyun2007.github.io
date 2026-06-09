export interface ElementData {
  symbol: string
  name: string
  group: number
  period: number
  atomicNumber: number
}

export interface GroupBatch {
  name: string
  groupNumbers: number[]
  elements: ElementData[]
}

export interface GridPosition {
  col: number
  row: number
}

export const ELEMENTS: ElementData[] = [
  // Group 1 — Alkali Metals
  { symbol: 'H',  name: 'Hydrogen',  group: 1,  period: 1, atomicNumber: 1 },
  { symbol: 'Li', name: 'Lithium',   group: 1,  period: 2, atomicNumber: 3 },
  { symbol: 'Na', name: 'Sodium',    group: 1,  period: 3, atomicNumber: 11 },
  { symbol: 'K',  name: 'Potassium', group: 1,  period: 4, atomicNumber: 19 },
  { symbol: 'Rb', name: 'Rubidium',  group: 1,  period: 5, atomicNumber: 37 },
  { symbol: 'Cs', name: 'Cesium',    group: 1,  period: 6, atomicNumber: 55 },
  // Group 2 — Alkaline Earth Metals
  { symbol: 'Be', name: 'Beryllium', group: 2,  period: 2, atomicNumber: 4 },
  { symbol: 'Mg', name: 'Magnesium', group: 2,  period: 3, atomicNumber: 12 },
  { symbol: 'Ca', name: 'Calcium',   group: 2,  period: 4, atomicNumber: 20 },
  { symbol: 'Sr', name: 'Strontium', group: 2,  period: 5, atomicNumber: 38 },
  { symbol: 'Ba', name: 'Barium',    group: 2,  period: 6, atomicNumber: 56 },
  // Group 3
  { symbol: 'Sc', name: 'Scandium',  group: 3,  period: 4, atomicNumber: 21 },
  { symbol: 'Y',  name: 'Yttrium',   group: 3,  period: 5, atomicNumber: 39 },
  // Group 4
  { symbol: 'Ti', name: 'Titanium',  group: 4,  period: 4, atomicNumber: 22 },
  { symbol: 'Zr', name: 'Zirconium', group: 4,  period: 5, atomicNumber: 40 },
  { symbol: 'Hf', name: 'Hafnium',   group: 4,  period: 6, atomicNumber: 72 },
  // Group 5
  { symbol: 'V',  name: 'Vanadium',  group: 5,  period: 4, atomicNumber: 23 },
  { symbol: 'Nb', name: 'Niobium',   group: 5,  period: 5, atomicNumber: 41 },
  { symbol: 'Ta', name: 'Tantalum',  group: 5,  period: 6, atomicNumber: 73 },
  // Group 6
  { symbol: 'Cr', name: 'Chromium',  group: 6,  period: 4, atomicNumber: 24 },
  { symbol: 'Mo', name: 'Molybdenum',group: 6,  period: 5, atomicNumber: 42 },
  { symbol: 'W',  name: 'Tungsten',  group: 6,  period: 6, atomicNumber: 74 },
  // Group 7
  { symbol: 'Mn', name: 'Manganese', group: 7,  period: 4, atomicNumber: 25 },
  { symbol: 'Tc', name: 'Technetium',group: 7,  period: 5, atomicNumber: 43 },
  { symbol: 'Re', name: 'Rhenium',   group: 7,  period: 6, atomicNumber: 75 },
  // Group 8
  { symbol: 'Fe', name: 'Iron',      group: 8,  period: 4, atomicNumber: 26 },
  { symbol: 'Ru', name: 'Ruthenium', group: 8,  period: 5, atomicNumber: 44 },
  { symbol: 'Os', name: 'Osmium',    group: 8,  period: 6, atomicNumber: 76 },
  // Group 9
  { symbol: 'Co', name: 'Cobalt',    group: 9,  period: 4, atomicNumber: 27 },
  { symbol: 'Rh', name: 'Rhodium',   group: 9,  period: 5, atomicNumber: 45 },
  { symbol: 'Ir', name: 'Iridium',   group: 9,  period: 6, atomicNumber: 77 },
  // Group 10
  { symbol: 'Ni', name: 'Nickel',    group: 10, period: 4, atomicNumber: 28 },
  { symbol: 'Pd', name: 'Palladium', group: 10, period: 5, atomicNumber: 46 },
  { symbol: 'Pt', name: 'Platinum',  group: 10, period: 6, atomicNumber: 78 },
  // Group 11
  { symbol: 'Cu', name: 'Copper',    group: 11, period: 4, atomicNumber: 29 },
  { symbol: 'Ag', name: 'Silver',    group: 11, period: 5, atomicNumber: 47 },
  { symbol: 'Au', name: 'Gold',      group: 11, period: 6, atomicNumber: 79 },
  // Group 12
  { symbol: 'Zn', name: 'Zinc',      group: 12, period: 4, atomicNumber: 30 },
  { symbol: 'Cd', name: 'Cadmium',   group: 12, period: 5, atomicNumber: 48 },
  { symbol: 'Hg', name: 'Mercury',   group: 12, period: 6, atomicNumber: 80 },
  // Group 13
  { symbol: 'B',  name: 'Boron',     group: 13, period: 2, atomicNumber: 5 },
  { symbol: 'Al', name: 'Aluminum',  group: 13, period: 3, atomicNumber: 13 },
  { symbol: 'Ga', name: 'Gallium',   group: 13, period: 4, atomicNumber: 31 },
  { symbol: 'In', name: 'Indium',    group: 13, period: 5, atomicNumber: 49 },
  { symbol: 'Tl', name: 'Thallium',  group: 13, period: 6, atomicNumber: 81 },
  // Group 14
  { symbol: 'C',  name: 'Carbon',    group: 14, period: 2, atomicNumber: 6 },
  { symbol: 'Si', name: 'Silicon',   group: 14, period: 3, atomicNumber: 14 },
  { symbol: 'Ge', name: 'Germanium', group: 14, period: 4, atomicNumber: 32 },
  { symbol: 'Sn', name: 'Tin',       group: 14, period: 5, atomicNumber: 50 },
  { symbol: 'Pb', name: 'Lead',      group: 14, period: 6, atomicNumber: 82 },
  // Group 15
  { symbol: 'N',  name: 'Nitrogen',  group: 15, period: 2, atomicNumber: 7 },
  { symbol: 'P',  name: 'Phosphorus',group: 15, period: 3, atomicNumber: 15 },
  { symbol: 'As', name: 'Arsenic',   group: 15, period: 4, atomicNumber: 33 },
  { symbol: 'Sb', name: 'Antimony',  group: 15, period: 5, atomicNumber: 51 },
  { symbol: 'Bi', name: 'Bismuth',   group: 15, period: 6, atomicNumber: 83 },
  // Group 16
  { symbol: 'O',  name: 'Oxygen',    group: 16, period: 2, atomicNumber: 8 },
  { symbol: 'S',  name: 'Sulfur',    group: 16, period: 3, atomicNumber: 16 },
  { symbol: 'Se', name: 'Selenium',  group: 16, period: 4, atomicNumber: 34 },
  { symbol: 'Te', name: 'Tellurium', group: 16, period: 5, atomicNumber: 52 },
  { symbol: 'Po', name: 'Polonium',  group: 16, period: 6, atomicNumber: 84 },
  // Group 17 — Halogens
  { symbol: 'F',  name: 'Fluorine',  group: 17, period: 2, atomicNumber: 9 },
  { symbol: 'Cl', name: 'Chlorine',  group: 17, period: 3, atomicNumber: 17 },
  { symbol: 'Br', name: 'Bromine',   group: 17, period: 4, atomicNumber: 35 },
  { symbol: 'I',  name: 'Iodine',    group: 17, period: 5, atomicNumber: 53 },
  { symbol: 'At', name: 'Astatine',  group: 17, period: 6, atomicNumber: 85 },
  // Group 18 — Noble Gases
  { symbol: 'He', name: 'Helium',    group: 18, period: 1, atomicNumber: 2 },
  { symbol: 'Ne', name: 'Neon',      group: 18, period: 2, atomicNumber: 10 },
  { symbol: 'Ar', name: 'Argon',     group: 18, period: 3, atomicNumber: 18 },
  { symbol: 'Kr', name: 'Krypton',   group: 18, period: 4, atomicNumber: 36 },
  { symbol: 'Xe', name: 'Xenon',     group: 18, period: 5, atomicNumber: 54 },
  { symbol: 'Rn', name: 'Radon',     group: 18, period: 6, atomicNumber: 86 },
]

export const TOTAL_ELEMENTS = ELEMENTS.length

// Grid position is trivially (col = group, row = period).
// This map exists for O(1) lookup in the grid renderer.
export const GRID_POSITIONS: Record<string, GridPosition> = Object.fromEntries(
  ELEMENTS.map(el => [el.symbol, { col: el.group, row: el.period }])
)

// isOuterMainGroup: groups 1, 2, 11–18 — position is tested/highlighted
export function isOuterMainGroup(group: number): boolean {
  return group === 1 || group === 2 || group >= 11
}

// s block: groups 1–2
// p block: groups 13–18
export function isSpBlock(group: number): boolean {
  return group === 1 || group === 2 || group >= 13
}

// d block: groups 3–12
export function isDBlock(group: number): boolean {
  return group >= 3 && group <= 12
}

const byGroups = (...groups: number[]) =>
  ELEMENTS.filter(el => groups.includes(el.group))

export const GROUP_BATCHES: GroupBatch[] = [
  {
    name: 'Alkali Metals — Group 1',
    groupNumbers: [1],
    elements: byGroups(1),
  },
  {
    name: 'Alkaline Earth Metals — Group 2',
    groupNumbers: [2],
    elements: byGroups(2),
  },
  {
    name: 'Halogens — Group 17',
    groupNumbers: [17],
    elements: byGroups(17),
  },
  {
    name: 'Noble Gases — Group 18',
    groupNumbers: [18],
    elements: byGroups(18),
  },
  {
    name: 'Chalcogens — Group 16',
    groupNumbers: [16],
    elements: byGroups(16),
  },
  {
    name: 'Pnictogens — Group 15',
    groupNumbers: [15],
    elements: byGroups(15),
  },
  {
    name: 'Carbon Group — Group 14',
    groupNumbers: [14],
    elements: byGroups(14),
  },
  {
    name: 'Boron Group — Group 13',
    groupNumbers: [13],
    elements: byGroups(13),
  },
  {
    name: 'Coinage Metals — Group 11',
    groupNumbers: [11],
    elements: byGroups(11),
  },
  {
    name: 'Volatile Metals — Group 12',
    groupNumbers: [12],
    elements: byGroups(12),
  },
  {
    name: 'Transition Metals — Groups 3–10',
    groupNumbers: [3, 4, 5, 6, 7, 8, 9, 10],
    elements: [
      // Period 4
      ...byGroups(3, 4, 5, 6, 7, 8, 9, 10).filter(el => el.period === 4),
      // Period 5
      ...byGroups(3, 4, 5, 6, 7, 8, 9, 10).filter(el => el.period === 5),
      // Period 6
      ...byGroups(3, 4, 5, 6, 7, 8, 9, 10).filter(el => el.period === 6),
    ],
  },
]
