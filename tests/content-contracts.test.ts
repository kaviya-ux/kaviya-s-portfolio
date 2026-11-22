import { existsSync, readFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { aboutAccordionItems, aboutJourneyItems } from '../src/data/about/about'
import { copy } from '../src/data/i18n/i18n'
import { legalCopy, legalPaths } from '../src/data/legal/legal'
import { contactDetails, links, resume } from '../src/data/links/links'
import { projects } from '../src/data/projects/projects'
import { services } from '../src/data/services/services'
import { type SkillTreeNode, skillsTree } from '../src/data/skills/skills'
import { stack } from '../src/data/stack/stack'

const skillNodes = (node: SkillTreeNode): SkillTreeNode[] => [
  node,
  ...(node.children ?? []).flatMap(skillNodes),
]
const nodes = skillNodes(skillsTree)

function expectUnique(values: string[]) {
  expect(values.every((value) => value.trim().length > 0)).toBe(true)
  expect(new Set(values).size).toBe(values.length)
}

// Files that make up the published site (no node_modules, no lockfile).
const publishedFiles = [
  'index.html',
  'README.md',
  'vercel.json',
  'public/robots.txt',
  'public/sitemap.xml',
  'public/og-image.html',
  '.github/workflows/update-hero-stats.yml',
  'scripts/update-hero-stats.mjs',
  'scripts/copy-404.mjs',
]

describe('published content contracts', () => {
  it('has unique identities for keyed lists and controlled regions', () => {
    expectUnique(projects.map((project) => project.title))
    expectUnique(services.map((service) => service.id))
    expectUnique(aboutJourneyItems.map((item) => item.id))
    expectUnique(aboutAccordionItems.map((item) => item.id))
    expectUnique(nodes.map((node) => node.id))
    expectUnique(stack.map((category) => category.title))
    for (const category of stack) {
      expectUnique(category.items.map((item) => item.label))
    }
  })

  it('has nonempty published text', () => {
    const strings = [
      copy.seo.title,
      copy.seo.description,
      copy.hero.role,
      copy.hero.subtitle,
      copy.about.subheading,
      copy.contact.subheading,
      ...services.flatMap((service) => [service.title, service.description]),
      ...projects.flatMap((project) => [
        project.description,
        project.highlights,
        project.imageAlt,
        project.status,
      ]),
      ...aboutJourneyItems.flatMap((item) => [
        item.title,
        item.organization,
        item.description,
        item.dateLabel,
      ]),
      ...aboutAccordionItems.flatMap((item) => [item.question, item.answer]),
      ...nodes.flatMap((node) => [node.label, ...(node.keywords ?? [])]),
    ]
    for (const value of strings) expect(value.trim()).not.toBe('')
  })

  it('keeps the initial HTML aligned with the SEO copy', () => {
    const html = readFileSync('index.html', 'utf8')
    const escaped = (value: string) => value.replaceAll('&', '&amp;')
    expect(html).toContain(`content="${copy.seo.description}"`)
    expect(html).toContain(`<title>${escaped(copy.seo.title)}</title>`)
    expect(html).toContain('<html lang="en">')
  })

  it('serves the recruiter-facing facts exactly as verified', () => {
    expect(copy.hero.name).toBe('Kaviya S')
    expect(copy.hero.role).toBe('Full Stack Developer · Chennai, India')
    expect(copy.hero.projectsCta).toBe('View live projects')
    expect(copy.hero.resumeCta).toBe('View resume')
    expect(copy.about.resumeCta).toBe('View resume')
    expect(copy.hero.contactCta).toBe('Get in touch')
    expect(copy.footer.copyright).toBe(
      '© 2026 Kaviya S. Built with React & TypeScript.',
    )
    expect(links.map((link) => link.href)).toEqual([
      'https://github.com/kaviya-ux',
      'https://www.linkedin.com/in/kaviya-ux/',
      'mailto:kaviyas.tech@gmail.com',
    ])
    expect(contactDetails).toEqual({
      phoneLabel: '+91 63800 53398',
      phoneHref: 'tel:+916380053398',
      location: 'Chennai, Tamil Nadu, India (Open to Relocation & Remote)',
    })
    expect(resume).toEqual({
      href: 'https://drive.google.com/file/d/1Rnkq4fLyU9r3YIBp5msgW6d9qCXM20ho/view',
    })
    expect(services.map((service) => service.title)).toEqual([
      'Full-stack web applications',
      'REST APIs & authentication',
      'Relational & NoSQL database design',
    ])
    expect(stack.map((category) => category.title)).toEqual([
      'Languages',
      'Frontend',
      'Backend & APIs',
      'Databases',
      'Tools & Cloud',
    ])
  })

  it('references existing, nonempty project images and responsive candidates', () => {
    for (const project of projects) {
      const candidates =
        project.imageWebpSrcSet?.split(',').map((source) => {
          const match = source.trim().match(/^(\S+) ([1-9]\d*)w$/)
          expect(match, source).not.toBeNull()
          return match?.[1] ?? ''
        }) ?? []
      for (const source of [project.imageSrc, ...candidates]) {
        expect(source.startsWith('/'), source).toBe(true)
        const path = resolve('public', source.slice(1))
        expect(existsSync(path), source).toBe(true)
        expect(statSync(path).size, source).toBeGreaterThan(0)
      }
    }
  })

  it('references the social image from the HTML', () => {
    const html = readFileSync('index.html', 'utf8')
    expect(html).toContain('/og-image.png')
    expect(existsSync(resolve('public/og-image.png'))).toBe(true)
  })

  it('publishes only HTTPS external project links and supported contact links', () => {
    for (const project of projects) {
      for (const href of [project.href, project.repositoryHref]) {
        if (href) expect(new URL(href).protocol).toBe('https:')
      }
    }
    for (const link of links) {
      expect(new URL(link.href).protocol).toBe(
        link.kind === 'email' ? 'mailto:' : 'https:',
      )
    }
    expect(new URL(contactDetails.phoneHref).protocol).toBe('tel:')
    expect(new URL(resume.href).protocol).toBe('https:')
  })

  it('revalidates stable image URLs and keeps hashed build assets immutable', () => {
    const { headers } = JSON.parse(readFileSync('vercel.json', 'utf8')) as {
      headers: { source: string; headers: { key: string; value: string }[] }[]
    }
    const policy = (source: string) =>
      headers
        .find((rule) => rule.source === source)
        ?.headers.find((header) => header.key.toLowerCase() === 'cache-control')
        ?.value
    expect(policy('/projects/generated/(.*)')).toBe('public, no-cache')
    expect(policy('/assets/(.*)')).toBe('public, max-age=31536000, immutable')
  })

  it('serves the legal pages without letting them reach search indexes', () => {
    const { headers, rewrites } = JSON.parse(
      readFileSync('vercel.json', 'utf8'),
    ) as {
      headers: { source: string; headers: { key: string; value: string }[] }[]
      rewrites: { source: string; destination: string }[]
    }
    const robots = headers.find((rule) =>
      rule.headers.some((header) => header.key === 'X-Robots-Tag'),
    )
    for (const path of Object.values(legalPaths)) {
      expect(rewrites).toContainEqual({
        source: path,
        destination: '/index.html',
      })
      expect(robots?.source).toContain(path.slice(1))
      expect(readFileSync('public/sitemap.xml', 'utf8')).not.toContain(path)
      // A robots.txt block would hide the noindex from crawlers.
      expect(readFileSync('public/robots.txt', 'utf8')).not.toContain(path)
    }
  })

  it('names Kaviya S as the only owner in the legal notice', () => {
    const text = JSON.stringify(legalCopy)
    expect(text).toContain('Kaviya S')
    expect(text).not.toMatch(/SIRET|RCS|OVH|Hostinger/i)
  })

  it('has no French copy or leftover template-author references', () => {
    const french =
      /Développeu|Projets|Accueil|À propos|Mentions|Éditeur|Hébergement|Confidentialité|Voir les|Tous droits|Envoyer|Bonjour/i
    const authors =
      /\ballen\b|kch24|crousty|naethr|thehackingproject|hacking project|diffimpact|snipstack|sokwak|questonaut|milady|\bseos\b|\bkane\b/i
    const sources = [
      ...publishedFiles,
      'src/data/i18n/i18n.ts',
      'src/data/legal/legal.ts',
      'src/data/about/about.ts',
      'src/data/projects/projects.ts',
      'src/data/services/services.ts',
      'src/data/skills/skills.ts',
      'src/data/stack/stack.ts',
    ]
    for (const file of sources) {
      const content = readFileSync(file, 'utf8')
      expect(content, `${file} contains French copy`).not.toMatch(french)
      expect(content, `${file} references the template author`).not.toMatch(
        authors,
      )
    }
  })
})
