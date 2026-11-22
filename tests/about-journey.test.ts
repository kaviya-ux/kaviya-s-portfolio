import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { AboutJourney } from '../src/components/AboutJourney/AboutJourney'
import { aboutJourneyItems } from '../src/data/about/about'

describe('about journey', () => {
  it('keeps the date range accessible', () => {
    const html = renderToStaticMarkup(createElement(AboutJourney))
    const bounds = html.match(
      /<div[^>]*class="about-journey__bounds"[^>]*>[\s\S]*?<\/div>/,
    )?.[0]
    expect(bounds).toBeDefined()
    expect(bounds).not.toContain('aria-hidden')
    expect(bounds).toContain('2023')
    expect(bounds).toContain('Today')
  })

  it('lists exactly the three verified milestones, oldest first', () => {
    expect(aboutJourneyItems.map((item) => item.id)).toEqual([
      'bca',
      'python-internship',
      'full-stack-program',
    ])
    expect(aboutJourneyItems[0]).toMatchObject({
      dateLabel: '2023 – 2026',
      title: 'Bachelor of Computer Applications (B.C.A.)',
      organization:
        'K.M.G. College of Arts and Science (Thiruvalluvar University), Vellore',
    })
    expect(aboutJourneyItems[0].description).toContain('8.8 / 10 CGPA')
    expect(aboutJourneyItems[1]).toMatchObject({
      dateLabel: 'May 2025',
      title: 'Python Development Intern',
      organization: 'Redback IT Solutions Pvt. Ltd., Vellore',
    })
    expect(aboutJourneyItems[2]).toMatchObject({
      dateLabel: 'Jun 2026 – Oct 2026',
      title: 'Python Full Stack Development Program',
      organization: 'Hejex Technology, Pallavaram, Chennai',
    })
  })
})
