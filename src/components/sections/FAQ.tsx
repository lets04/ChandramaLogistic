import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqs } from '../../data/content'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { SectionHeading } from '../ui/SectionHeading'

export function FAQ() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" ref={ref} className="section-padding bg-white">
      <div className="container-page max-w-3xl">
        <SectionHeading
          label="FAQ"
          title="Preguntas frecuentes"
          description="Resolvemos las dudas más comunes sobre nuestros servicios."
        />

        <div
          className={`space-y-2 sm:space-y-3 transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-xl border border-card-border bg-surface"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex min-h-[52px] w-full items-center justify-between gap-3 px-4 py-3 text-left sm:gap-4 sm:px-6 sm:py-5"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-sm font-semibold leading-snug text-primary sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-secondary transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-4 text-xs leading-relaxed text-text-muted sm:px-6 sm:pb-5 sm:text-sm md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
