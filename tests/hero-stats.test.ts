import { describe, expect, it } from 'vitest'

import { heroStats } from '../src/data/hero/heroStats'
import { copy } from '../src/data/i18n/i18n'
import { projects } from '../src/data/projects/projects'

describe('hero stats', () => {
  it('derives the project stat from the projects data source', () => {
    const projectStat = heroStats.find((stat) => stat.id === 'projects')

    expect(projectStat?.value).toBe(projects.length)
    expect(projectStat?.value).toBe(3)
  })

  it('reports the verified CGPA and training length', () => {
    expect(heroStats.find((stat) => stat.id === 'cgpa')?.value).toBe(
      '8.8 / 10',
    )
    expect(heroStats.find((stat) => stat.id === 'training')?.value).toBe(5)
  })

  it('has a label for every hero stat', () => {
    for (const stat of heroStats) {
      expect(copy.hero.statLabels[stat.id]).toBeTruthy()
    }
  })

  it('keeps the profile title consistent across hero, footer and SEO copy', () => {
    expect(copy.hero.role).toContain('Full Stack Developer')
    expect(copy.footer.brand).toContain('Full Stack Developer')
    expect(copy.seo.title).toContain('Full Stack Developer')
  })
})
