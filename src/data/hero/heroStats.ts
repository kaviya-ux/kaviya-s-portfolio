import { projects } from '../projects/projects'

export type HeroStatId = 'projects' | 'cgpa' | 'training'

export type NumericHeroStat = {
  id: Exclude<HeroStatId, 'cgpa'>
  prefix: string
  suffix: string
  value: number
}

export type TextHeroStat = {
  id: 'cgpa'
  value: string
}

export type HeroStat = NumericHeroStat | TextHeroStat

// Counts come from verifiable facts: the projects data file, the B.C.A.
// transcript and the Jun–Oct 2026 Python Full Stack program.
export const heroStats: HeroStat[] = [
  {
    id: 'projects',
    prefix: '',
    suffix: '',
    value: projects.length,
  },
  {
    id: 'cgpa',
    value: '8.8 / 10',
  },
  {
    id: 'training',
    prefix: '',
    suffix: '',
    value: 5,
  },
]
