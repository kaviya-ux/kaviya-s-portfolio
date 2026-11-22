import {
  type LegalPage,
  legalCopy,
  privacySources,
  publisher,
} from '../../data/legal/legal'

type LegalNoticesProps = { page: LegalPage }

export function LegalNotices({ page }: LegalNoticesProps) {
  const text = legalCopy
  return (
    <div className="section legal-notices">
      {/* React hoists this into <head>; vercel.json sends the same rule as a header. */}
      <meta name="robots" content="noindex" />
      {page === 'legal' ? (
        <section aria-labelledby="legal-title">
          <h1 id="legal-title">{text.legalTitle}</h1>
          <p>{text.publisher}</p>
          <p>{text.status}</p>
          <p>
            {publisher.name}. {text.locationLabel} {publisher.location}.
          </p>
          <p>
            <a href={`mailto:${publisher.email}`}>{publisher.email}</a>
          </p>
        </section>
      ) : (
        <section aria-labelledby="privacy-title">
          <h1 id="privacy-title">{text.privacyTitle}</h1>
          <p>{text.updated}</p>
          {text.sections.map((section) => (
            <div key={section.title}>
              <h3>{section.title}</h3>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ))}
          <h3>{text.sources}</h3>
          <ul>
            {privacySources.map((source) => (
              <li key={source.href}>
                <a href={source.href}>{source.label}</a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
