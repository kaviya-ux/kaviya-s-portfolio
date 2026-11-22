import { useEffect, useState } from 'react'
import { AboutSection } from './components/AboutSection/AboutSection'
import { BackToTopButton } from './components/BackToTopButton/BackToTopButton'
import { ContactSection } from './components/ContactSection/ContactSection'
import { Footer } from './components/Footer/Footer'
import { Hero } from './components/Hero/Hero'
import { LegalNotices } from './components/LegalNotices/LegalNotices'
import { Navbar } from './components/Navbar/Navbar'
import { ProjectsSection } from './components/ProjectsSection/ProjectsSection'
import { ServicesSection } from './components/ServicesSection/ServicesSection'
import { StackSection } from './components/StackSection/StackSection'
import { copy, type Theme } from './data/i18n/i18n'
import { type LegalPage, legalCopy, legalPaths } from './data/legal/legal'
import {
  getSectionCover,
  getSectionPins,
  type SectionPin,
} from './utils/sectionStack'
import { readStoredPreference, writeStoredPreference } from './utils/storage'

const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  return readStoredPreference(
    () => window.localStorage,
    'theme',
    (value): value is Theme => value === 'dark' || value === 'light',
    'light',
  )
}

// Legal links are plain page loads, so the path never changes while mounted.
const getLegalPage = (): LegalPage | undefined => {
  if (typeof window === 'undefined') {
    return undefined
  }

  const path = window.location.pathname.replace(/\/$/, '')
  return (Object.keys(legalPaths) as LegalPage[]).find(
    (page) => legalPaths[page] === path,
  )
}

const legalPage = getLegalPage()

function App() {
  const [theme, setTheme] = useState<Theme>(getStoredTheme)
  const pageCopy = copy
  const sectionsBase = legalPage ? '/' : ''

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    writeStoredPreference(() => window.localStorage, 'theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = 'en'
    document.title = legalPage
      ? `${legalPage === 'legal' ? legalCopy.legalTitle : legalCopy.privacyTitle} | Kaviya S`
      : copy.seo.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', copy.seo.description)
  }, [])

  useEffect(() => {
    // A noindexed page must not point search engines at the home page.
    if (legalPage) document.querySelector('link[rel="canonical"]')?.remove()
  }, [])

  useEffect(() => {
    let id: string
    try {
      id = decodeURIComponent(window.location.hash.slice(1))
    } catch {
      return
    }

    // React creates the anchor targets after the browser's initial fragment lookup.
    if (id) {
      const target = document.getElementById(id)
      target?.scrollIntoView({ behavior: 'instant' })
      target?.focus({ preventScroll: true })
    }
  }, [])

  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      return
    }

    // Sections now transition through the scroll stack below; only the rail keeps its one-time fade.
    const scrollSections = document.querySelectorAll<HTMLElement>(
      '.about-journey__list',
    )

    scrollSections.forEach((section) => {
      section.classList.add('section--scroll-fade')
    })

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          entry.target.classList.add('section--scroll-visible')
          sectionObserver.unobserve(entry.target)
        })
      },
      {
        threshold: 0,
      },
    )

    scrollSections.forEach((section) => {
      sectionObserver.observe(section)
    })

    return () => {
      sectionObserver.disconnect()
      scrollSections.forEach((section) => {
        section.classList.remove(
          'section--scroll-fade',
          'section--scroll-visible',
        )
      })
    }
  }, [])

  useEffect(() => {
    const main = document.querySelector('main')
    if (
      !main ||
      legalPage ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('ResizeObserver' in window) ||
      !CSS.supports('selector(:has(*))')
    ) {
      return
    }

    const sections = Array.from(
      main.querySelectorAll<HTMLElement>(':scope > .section'),
    )
    const covers: number[] = []
    let pins: SectionPin[] = []
    let mainTop = 0
    let frameId = 0

    const update = () => {
      frameId = 0
      const scrollOffset = window.scrollY - mainTop
      pins.forEach((pin, index) => {
        const cover =
          Math.round(getSectionCover(pin, scrollOffset) * 1000) / 1000
        if (cover === covers[index]) return
        covers[index] = cover
        sections[index].style.setProperty('--section-cover', String(cover))
        // Near-transparent (opacity under 5 %) sections stop catching clicks.
        sections[index].classList.toggle('section--covered', cover >= 0.95)
      })
    }

    const scheduleUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(update)
    }

    // Reads first, then writes: runs on size changes only, never per scroll frame.
    const measure = () => {
      mainTop = main.getBoundingClientRect().top + window.scrollY
      pins = getSectionPins(
        sections.map((section) => section.offsetHeight),
        window.innerHeight,
        Number.parseFloat(
          window.getComputedStyle(document.documentElement).scrollPaddingTop,
        ),
        // A section's last content scrolls a quarter screen up before it gets covered.
        window.innerHeight / 4,
      )
      pins.forEach((pin, index) => {
        sections[index].style.setProperty('--section-pin-top', `${pin.top}px`)
      })
      // Sticky boxes report their pinned offset, so slots add up from the heights.
      let slotTop = 0
      sections.forEach((section) => {
        main.style.setProperty(`--${section.id}-top`, `${slotTop}px`)
        slotTop += section.offsetHeight
      })
      update()
    }

    // Fragment scrolling (links and history traversal) aims at a pinned box's
    // current spot; unpin the target while the browser resolves where to scroll.
    const unpinTarget = (hash: string | undefined) => {
      const target = document
        .getElementById(hash?.slice(1) ?? '')
        ?.closest('main > .section')
      if (!target) return
      target.classList.add('section--unpinned')
      window.requestAnimationFrame(() =>
        target.classList.remove('section--unpinned'),
      )
    }
    const unpinLinkTarget = (event: MouseEvent) => {
      if (event.target instanceof Element) {
        unpinTarget(
          event.target.closest<HTMLAnchorElement>('a[href^="#"]')?.hash,
        )
      }
    }
    const unpinHistoryTarget = () => unpinTarget(window.location.hash)

    main.classList.add('section-stack')
    const resizeObserver = new ResizeObserver(measure)
    sections.forEach((section) => {
      resizeObserver.observe(section)
    })
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', measure)
    document.addEventListener('click', unpinLinkTarget)
    window.addEventListener('popstate', unpinHistoryTarget)

    return () => {
      resizeObserver.disconnect()
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', measure)
      document.removeEventListener('click', unpinLinkTarget)
      window.removeEventListener('popstate', unpinHistoryTarget)
      main.classList.remove('section-stack')
      sections.forEach((section) => {
        section.classList.remove('section--covered', 'section--unpinned')
        section.style.removeProperty('--section-pin-top')
        section.style.removeProperty('--section-cover')
        main.style.removeProperty(`--${section.id}-top`)
      })
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content">
        {pageCopy.skipLink}
      </a>
      <Navbar
        linkBase={sectionsBase}
        onToggleTheme={() =>
          setTheme((currentTheme) =>
            currentTheme === 'dark' ? 'light' : 'dark',
          )
        }
        theme={theme}
      />
      <main id="main-content" tabIndex={-1}>
        {legalPage ? (
          <LegalNotices page={legalPage} />
        ) : (
          <>
            <Hero />
            <ServicesSection />
            <ProjectsSection />
            <StackSection />
            <AboutSection />
            <ContactSection theme={theme} />
          </>
        )}
      </main>
      <Footer linkBase={sectionsBase} />
      <BackToTopButton />
    </>
  )
}

export default App
