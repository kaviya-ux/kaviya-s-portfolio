import { copy } from '../../data/i18n/i18n'
import { services } from '../../data/services/services'

export function ServicesSection() {
  const pageCopy = copy

  return (
    <section
      className="section services-section"
      id="services"
      tabIndex={-1}
      aria-labelledby="services-title"
    >
      <div className="section-heading section-heading--split reveal">
        <div>
          <h2 className="section-title" id="services-title">
            {pageCopy.services.heading}
          </h2>
        </div>
      </div>
      <ul className="services__list reveal">
        {services.map((service) => (
          <li className="services__item" key={service.id}>
            <h3 className="services__title">{service.title}</h3>
            <p className="services__text">{service.description}</p>
          </li>
        ))}
      </ul>
      <div className="services__cta reveal">
        <a className="button button--primary" href="#contact">
          {pageCopy.hero.contactCta}
        </a>
      </div>
    </section>
  )
}
