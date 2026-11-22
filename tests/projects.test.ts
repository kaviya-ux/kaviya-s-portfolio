import { describe, expect, it } from 'vitest'

import { projects } from '../src/data/projects/projects'

describe('projects data', () => {
  it('features the three verified full stack projects in order', () => {
    expect(projects.map((project) => project.title)).toEqual([
      'Job Application Tracker',
      'QuickDesk — Helpdesk Ticket System',
      'Appointment Booking System',
    ])
  })

  it('links the live demos and repositories', () => {
    expect(projects.map((project) => project.href)).toEqual([
      'https://job-application-tracker1-liart.vercel.app',
      'https://helpdesk-ticket-system-peach.vercel.app',
      'https://appointment-booking-system-gamma-ruby.vercel.app/',
    ])
    expect(projects.map((project) => project.repositoryHref)).toEqual([
      'https://github.com/kaviya-ux/job-application-tracker',
      'https://github.com/kaviya-ux/helpdesk-ticket-system',
      'https://github.com/kaviya-ux/appointment-booking-system',
    ])
  })

  it('lists the verified tech stack for each project', () => {
    expect(projects[0].stack).toEqual([
      'React',
      'Tailwind CSS',
      'Django',
      'Django REST Framework',
      'PostgreSQL',
    ])
    expect(projects[1].stack).toEqual([
      'React',
      'Tailwind CSS',
      'Django REST Framework',
      'JWT',
      'PostgreSQL',
    ])
    expect(projects[2].stack).toEqual([
      'React',
      'Tailwind CSS',
      'Django',
      'REST API',
      'PostgreSQL',
    ])
  })

  it('never ships placeholder or hash links', () => {
    for (const project of projects) {
      for (const href of [project.href, project.repositoryHref]) {
        if (href) expect(href.startsWith('https://')).toBe(true)
      }
    }
  })
})
