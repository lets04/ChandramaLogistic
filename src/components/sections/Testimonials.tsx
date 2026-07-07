import { Star, Quote } from 'lucide-react'
import { testimonials } from '../../data/content'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { SectionHeading } from '../ui/SectionHeading'

export function Testimonials() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section ref={ref} className="section-padding bg-surface">
      <div className="container-page">
        <SectionHeading
          label="Testimonios"
          title="Lo que dicen nuestros clientes"
          description="La satisfacción de quienes confían en nosotros es nuestra mejor carta de presentación."
        />

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.name}
              className={`card-hover relative min-w-[85vw] shrink-0 snap-center rounded-xl border border-card-border bg-white p-5 transition-all duration-700 sm:min-w-0 sm:p-6 md:p-8 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: isVisible ? `${index * 120}ms` : '0ms' }}
            >
              <Quote size={28} className="text-accent/30 sm:hidden" />
              <Quote size={32} className="hidden text-accent/30 sm:block" />
              <div className="mt-3 flex gap-1 sm:mt-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-warning text-warning sm:h-4 sm:w-4" />
                ))}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-text-muted sm:mt-4 sm:text-sm md:text-base">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="mt-4 border-t border-card-border pt-3 sm:mt-6 sm:pt-4">
                <p className="font-heading text-sm font-semibold text-primary sm:text-base">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-[11px] text-text-muted sm:text-xs md:text-sm">
                  {testimonial.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
