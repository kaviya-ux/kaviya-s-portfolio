import { useState } from 'react'
import { aboutAccordionItems } from '../../data/about/about'

export function AboutAccordion() {
  const [openItemId, setOpenItemId] = useState(
    () => aboutAccordionItems[0]?.id ?? '',
  )

  return (
    <div className="about-accordion reveal">
      {aboutAccordionItems.map((item) => {
        const panelId = `about-accordion-${item.id}-panel`
        const isOpen = openItemId === item.id

        return (
          <div className="about-accordion__item" key={item.id}>
            <h3 className="about-accordion__heading">
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className="about-accordion__trigger"
                onClick={() =>
                  setOpenItemId((currentId) =>
                    currentId === item.id ? '' : item.id,
                  )
                }
                type="button"
              >
                <span>{item.question}</span>
                <span aria-hidden="true" className="about-accordion__sign">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h3>

            <div
              className="about-accordion__panel"
              hidden={!isOpen}
              id={panelId}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
