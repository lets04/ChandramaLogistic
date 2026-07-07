import { clients } from '../../data/content'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { SectionHeading } from '../ui/SectionHeading'

export function Clients() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section id="clientes" ref={ref} className="section-padding bg-white">
      <div className="container-page">
        <SectionHeading
          label="Confianza"
          title="Nuestros clientes"
          description="Empresas líderes que confían en nosotros para mover su carga."
        />

        <div
          className={`grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:gap-6 transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {clients.map((client, index) => (
            <div
              key={client}
              className="card-hover flex h-16 items-center justify-center rounded-lg border border-card-border bg-surface px-2 sm:h-24 sm:rounded-xl sm:px-4 md:h-28"
              style={{ transitionDelay: isVisible ? `${index * 80}ms` : '0ms' }}
            >
              <span className="text-center font-heading text-xs font-bold text-primary/40 sm:text-lg md:text-xl">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
