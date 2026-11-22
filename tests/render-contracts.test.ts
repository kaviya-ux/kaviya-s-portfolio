import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import App from '../src/App'
import { AboutSection } from '../src/components/AboutSection/AboutSection'
import { ContactSection } from '../src/components/ContactSection/ContactSection'
import { Footer } from '../src/components/Footer/Footer'
import { Hero } from '../src/components/Hero/Hero'
import { LegalNotices } from '../src/components/LegalNotices/LegalNotices'
import { Navbar } from '../src/components/Navbar/Navbar'
import { ProjectCard } from '../src/components/ProjectCard/ProjectCard'
import { ProjectsSection } from '../src/components/ProjectsSection/ProjectsSection'
import { ServicesSection } from '../src/components/ServicesSection/ServicesSection'
import { StackSection } from '../src/components/StackSection/StackSection'
import { copy } from '../src/data/i18n/i18n'
import { legalPaths, publisher } from '../src/data/legal/legal'
import { contactDetails, resume } from '../src/data/links/links'
import { navItems } from '../src/data/links/navigation'
import { type Project, projects } from '../src/data/projects/projects'
import { services } from '../src/data/services/services'

const page = renderToStaticMarkup(createElement(App))
const escape = (value: string) => renderToStaticMarkup(value)
const fixture: Project = {
  category: 'personal',
  title: 'Fixture project',
  description: 'Fixture description',
  highlights: 'Fixture highlights',
  imageAlt: 'Fixture image',
  status: 'Fixture prototype',
  imageSrc: '/fixture.svg',
  stack: ['TypeScript'],
}

// These contracts cover HTML output, not effects, events or computed styles.
describe('page render contracts', () => {
  it('has unique IDs and targets for every internal link and ARIA reference', () => {
    const ids = [...page.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1])
    expect(new Set(ids).size).toBe(ids.length)
    const references = [
      ...[...page.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]),
      ...[...page.matchAll(/aria-(?:controls|labelledby)="([^"]+)"/g)].flatMap(
        (match) => match[1].split(/\s+/),
      ),
    ]
    for (const target of references) expect(ids).toContain(target)
    for (const item of navItems) expect(ids).toContain(item.href.slice(1))
    expect(page.match(/<h1[\s>]/g)).toHaveLength(1)
    for (const id of [
      'main-content',
      ...navItems.map((item) => item.href.slice(1)),
    ]) {
      expect(page).toMatch(new RegExp(`id="${id}"[^>]*tabindex="-1"`))
    }
    expect(
      [
        ...page.matchAll(
          /<section[^>]*id="(home|services|projects|stack|about|contact)"/g,
        ),
      ].map((match) => `#${match[1]}`),
    ).toEqual(navItems.map((item) => item.href))
  })

  it('renders the heading hierarchy', () => {
    const hero = renderToStaticMarkup(createElement(Hero))
    expect(hero).toContain(
      `<h1 class="hero__title"><span class="hero__name">${escape(copy.hero.name)}</span></h1>`,
    )
    expect(hero).toContain(
      `<h2 class="hero__heading">${escape(copy.hero.role)}</h2>`,
    )
    expect(hero).not.toContain('hero__role')
    const sections = [
      ServicesSection,
      ProjectsSection,
      StackSection,
      AboutSection,
      ContactSection,
    ].map((section) => renderToStaticMarkup(createElement(section)))
    const titles = sections.map(
      (html) =>
        html.match(/<h2 class="section-title"[^>]*>([^<]*)<\/h2>/g) ?? [],
    )
    // The "01 /" prefix comes from a CSS counter on .section-title, one per section.
    expect(titles.map((matches) => matches.length)).toEqual([1, 1, 1, 1, 1])
    expect(titles.map((matches) => matches[0].replace(/<[^>]+>/g, ''))).toEqual(
      [
        copy.services.heading,
        copy.projects.heading,
        copy.stack.heading,
        copy.about.heading,
        copy.contact.heading,
      ].map(escape),
    )
    expect(copy.stack.heading).toBe('Stack & skills')
    expect(sections[0]).toContain('id="services-title"')
    for (const html of sections) expect(html).not.toContain('eyebrow')
    const [, , , about, contact] = sections
    expect(about).toContain(
      `<h3 class="about-content__subtitle">${escape(copy.about.subheading)}</h3>`,
    )
    expect(about).toContain(`aria-label="${escape(copy.about.heading)}"`)
    expect(about).toContain(
      '<h3 id="about-journey-title">My Coding Journey</h3>',
    )
    expect(about.match(/<h4 class="about-journey__title">/g)).toHaveLength(3)
    expect(about).not.toMatch(/<h2(?! class="section-title")/)
    expect(contact).toContain(
      `<h3 class="contact-panel__title">${escape(copy.contact.subheading)}</h3>`,
    )
  })

  it('renders three services and one contact CTA', () => {
    const html = renderToStaticMarkup(createElement(ServicesSection))
    expect(html.match(/<h3[\s>]/g)).toHaveLength(3)
    expect(html.match(/<a[\s>]/g)).toHaveLength(1)
    expect(html).toContain(
      `href="#contact">${escape(copy.hero.contactCta)}</a>`,
    )
    for (const service of services) {
      expect(html).toContain(escape(service.title))
      expect(html).toContain(escape(service.description))
    }
  })

  it('renders every featured project with its live demo and repository links', () => {
    expect(page.match(/project-card--feature/g)).toHaveLength(3)
    expect(page.match(/project-card--compact/g)).toBeNull()
    expect(page).not.toContain('projects-grid')
    for (const project of projects) {
      expect(page).toContain(escape(project.title))
      expect(page).toContain(escape(project.description))
      expect(page).toContain(escape(project.highlights))
      for (const href of [project.href, project.repositoryHref]) {
        if (href) expect(page).toContain(`href="${href}"`)
      }
    }
    expect(page).toContain('personal-projects-title')
    expect(page).not.toContain('client-projects-title')
    expect(page).toContain('/ 03')
    expect(page).not.toContain('href="#"')
  })

  it('shows the category index above compact cards', () => {
    const html = renderToStaticMarkup(
      createElement(ProjectCard, {
        project: fixture,
        index: 3,
        total: 8,
        variant: 'compact',
      }),
    )
    expect(html).toContain('04<span class="project-card__total">/ 08</span></p>')
    expect(html.indexOf('project-card__index')).toBeLessThan(
      html.indexOf('project-card__media'),
    )
    expect(html).toContain(
      `<p class="project-card__meta">${fixture.status}</p>`,
    )
  })

  it('limits the category to three scroll cards and a toggle', () => {
    const originalLength = projects.length
    try {
      projects.push(
        ...['A', 'B', 'C'].map((title): Project => ({ ...fixture, title })),
      )
      const html = renderToStaticMarkup(createElement(ProjectsSection))
      expect(html.match(/project-card--feature/g)).toHaveLength(3)
      expect(html).toContain('/ 06')
      expect(html).toContain(
        'aria-controls="personal-projects-grid" aria-expanded="false"',
      )
    } finally {
      projects.splice(originalLength)
    }
  })

  it('renders English navigation with a resume link and no language switcher', () => {
    const nav = renderToStaticMarkup(
      createElement(Navbar, { theme: 'light', onToggleTheme: () => {} }),
    )
    expect(nav).toContain(`aria-label="${escape(copy.nav.mainLabel)}"`)
    expect(nav).toContain(`aria-label="${escape(copy.nav.openMenuLabel)}"`)
    for (const item of navItems) {
      expect(nav).toContain(`href="${item.href}">${copy.nav[item.key]}</a>`)
    }
    expect(navItems.map((item) => copy.nav[item.key])).toEqual([
      'Home',
      'Services',
      'Projects',
      'Stack',
      'About',
      'Contact',
    ])
    expect(nav.match(/aria-current="location"/g)).toHaveLength(1)
    expect(nav).toContain(`href="${resume.href}"`)
    expect(nav).not.toContain('download=')
    expect(nav).toContain('rel="noopener noreferrer"')
    expect(nav).toContain('target="_blank"')
    expect(nav).toContain('RESUME')
    expect(nav).not.toMatch(/language-toggle|>FR<|>EN</)
    expect(nav).toContain('class="icon-toggle"')
  })

  it('renders the hero pitch, resume download and social links', () => {
    const hero = renderToStaticMarkup(createElement(Hero))
    expect(hero).toContain(
      `class="button button--primary" href="#projects">${escape(copy.hero.projectsCta)}</a>`,
    )
    expect(hero).toContain(
      `class="button button--secondary" href="${resume.href}" rel="noopener noreferrer" target="_blank">${escape(copy.hero.resumeCta)}</a>`,
    )
    expect(hero).toContain(
      `class="button button--secondary" href="#contact">${escape(copy.hero.contactCta)}</a>`,
    )
    expect(hero).toContain(escape(copy.hero.subtitle))
    for (const href of [
      'https://github.com/kaviya-ux',
      'https://www.linkedin.com/in/kaviya-ux/',
      'mailto:kaviyas.tech@gmail.com',
    ]) {
      expect(hero).toContain(`href="${href}"`)
    }
    expect(hero).toContain('8.8 / 10')
  })

  it('renders the footer, about and project section copy', () => {
    const footer = renderToStaticMarkup(createElement(Footer))
    expect(footer).toContain(escape(copy.footer.navHeading))
    expect(footer).toContain(escape(copy.footer.linksHeading))
    expect(footer).toContain(escape(copy.footer.legalHeading))
    expect(footer).toContain(escape(copy.footer.copyright))
    const about = renderToStaticMarkup(createElement(AboutSection))
    expect(about).toContain(`alt="${escape(copy.about.alt)}"`)
    expect(about).toContain(`href="${resume.href}"`)
    expect(about).not.toContain('download=')
    expect(about).toContain(escape(copy.about.resumeCta))
    const projectsHtml = renderToStaticMarkup(createElement(ProjectsSection))
    expect(projectsHtml).toContain(
      `href="#contact">${escape(copy.projects.ctaLink)}</a>`,
    )
  })

  it('renders real contact details and no template-author form endpoint', () => {
    const contact = renderToStaticMarkup(createElement(ContactSection))
    expect(contact).toContain('href="mailto:kaviyas.tech@gmail.com"')
    expect(contact).toContain(`href="${contactDetails.phoneHref}"`)
    expect(contact).toContain(contactDetails.phoneLabel)
    expect(contact).toContain(escape(contactDetails.location))
    // Without a Web3Forms key the form is not rendered at all.
    expect(contact).not.toContain('<form')
    expect(contact).not.toContain('api.web3forms.com')
  })
})

describe('project card contracts', () => {
  it.each([
    {
      name: 'demo and repository',
      href: 'https://example.com/demo',
      repositoryHref: 'https://example.com/repository',
    },
    {
      name: 'demo only',
      href: 'https://example.com/demo',
      repositoryHref: undefined,
    },
    {
      name: 'repository only',
      href: undefined,
      repositoryHref: 'https://example.com/repository',
    },
    { name: 'no links', href: undefined, repositoryHref: undefined },
  ])('renders $name without empty links', ({ href, repositoryHref }) => {
    for (const variant of ['feature', 'compact'] as const) {
      const html = renderToStaticMarkup(
        createElement(ProjectCard, {
          project: { ...fixture, href, repositoryHref },
          variant,
          index: 0,
          total: 1,
        }),
      )
      expect(html).toContain(fixture.description)
      expect(html).toContain(fixture.highlights)
      expect(html).toContain(`alt="${fixture.imageAlt}"`)
      expect(html).toContain(fixture.status)
      const urls = [...html.matchAll(/\shref="([^"]*)"/g)].map(
        (match) => match[1],
      )
      expect(urls).toEqual([
        ...(href ? [href, href] : []),
        ...(repositoryHref ? [repositoryHref] : []),
      ])
      expect(html).not.toContain('href="undefined"')
      for (const link of html.matchAll(/<a\s[^>]*>/g)) {
        expect(link[0]).toContain('rel="noopener noreferrer"')
        expect(link[0]).toContain('target="_blank"')
      }
    }
  })
})

describe('legal information and optional captcha', () => {
  it('makes legal information reachable without loading a captcha', () => {
    const footer = renderToStaticMarkup(createElement(Footer))
    const legal = renderToStaticMarkup(
      createElement(LegalNotices, { page: 'legal' }),
    )
    const privacy = renderToStaticMarkup(
      createElement(LegalNotices, { page: 'privacy' }),
    )
    expect(legalPaths).toEqual({ legal: '/legal', privacy: '/privacy' })
    expect(footer).toContain(`href="${legalPaths.legal}"`)
    expect(footer).toContain(`href="${legalPaths.privacy}"`)
    expect(footer).not.toContain('mailto:')
    expect(legal).toContain('<meta name="robots" content="noindex"/>')
    expect(legal).toContain('id="legal-title"')
    expect(legal).toContain(`mailto:${publisher.email}`)
    expect(legal).toContain('Kaviya S')
    expect(legal).toContain('Chennai, Tamil Nadu, India')
    expect(legal).not.toContain('id="privacy-title"')
    expect(privacy).toContain('<meta name="robots" content="noindex"/>')
    expect(privacy).toContain('id="privacy-title"')
    expect(privacy).toContain('https://web3forms.com/privacy')
    expect(privacy).toContain('https://www.hcaptcha.com/privacy')
    expect(privacy).not.toContain('id="legal-title"')
    expect(footer + legal + privacy).not.toContain('<iframe')
  })

  it('points the footer back at the home sections from a legal page', () => {
    const footer = renderToStaticMarkup(
      createElement(Footer, { linkBase: '/' }),
    )
    expect(footer).toContain('href="/#services"')
  })
})
