import portraitSrc from '../../assets/images/kaviya-portrait.jpg'
import portrait360Src from '../../assets/images/generated/kaviya-portrait-360.webp'
import portrait640Src from '../../assets/images/generated/kaviya-portrait-640.webp'
import portrait900Src from '../../assets/images/generated/kaviya-portrait-900.webp'
import { copy } from '../../data/i18n/i18n'
import { links, resume } from '../../data/links/links'
import { AboutAccordion } from '../AboutAccordion/AboutAccordion'
import { AboutJourney } from '../AboutJourney/AboutJourney'

export function AboutSection() {
  const socialLinks = links.filter((link) => link.kind === 'social')
  const aboutCopy = copy.about

  return (
    <section className="section about-section" id="about" tabIndex={-1}>
      <div className="about-layout">
        <div className="about-visual reveal">
          <figure className="portrait-card">
            <picture>
              <source
                sizes="(max-width: 760px) calc(100vw - 2.5rem), (max-width: 1040px) 26rem, 38vw"
                srcSet={`${portrait360Src} 360w, ${portrait640Src} 640w, ${portrait900Src} 900w`}
                type="image/webp"
              />
              <img
                src={portraitSrc}
                alt={aboutCopy.alt}
                height="900"
                loading="lazy"
                sizes="(max-width: 760px) calc(100vw - 2.5rem), (max-width: 1040px) 26rem, 38vw"
                width="900"
              />
            </picture>
          </figure>
        </div>

        <div className="about-content reveal">
          <h2 className="section-title">{aboutCopy.heading}</h2>
          <h3 className="about-content__subtitle">{aboutCopy.subheading}</h3>
          <ul className="chip-list about-badges" aria-label={aboutCopy.heading}>
            {aboutCopy.badges.map((badge) => (
              <li className="chip" key={badge}>
                {badge}
              </li>
            ))}
          </ul>
          <div className="about-copy">
            {aboutCopy.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="social-row">
            {socialLinks.map((link) => (
              <a
                href={link.href}
                key={link.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {link.label}
              </a>
            ))}
          </div>

          <p className="about-resume">
            <a
              className="button button--primary"
              href={resume.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {aboutCopy.resumeCta}
            </a>
          </p>

          <AboutAccordion />
        </div>
      </div>

      <AboutJourney />
    </section>
  )
}
