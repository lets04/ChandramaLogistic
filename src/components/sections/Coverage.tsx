import { coverageStats } from '../../data/content'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { SectionHeading } from '../ui/SectionHeading'

export function Coverage() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section id="cobertura" ref={ref} className="section-padding bg-white">
      <div className="container-page">
        <SectionHeading
          label="Alcance global"
          title="Cobertura mundial"
          description="Una red logística que conecta continentes y acerca tu negocio al mundo."
        />

        <div
          className={`grid gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-16 transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="relative overflow-hidden rounded-xl bg-primary p-6 sm:rounded-2xl sm:p-8 md:p-10">
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 800 400" className="h-full w-full" aria-hidden="true">
                <ellipse cx="400" cy="200" rx="350" ry="170" fill="none" stroke="#7CB518" strokeWidth="1" strokeDasharray="8 4" />
                <circle cx="180" cy="160" r="6" fill="#7CB518" />
                <circle cx="320" cy="140" r="6" fill="#7CB518" />
                <circle cx="450" cy="180" r="6" fill="#7CB518" />
                <circle cx="580" cy="150" r="6" fill="#7CB518" />
                <circle cx="650" cy="220" r="6" fill="#7CB518" />
                <circle cx="250" cy="250" r="6" fill="#7CB518" />
                <circle cx="520" cy="280" r="6" fill="#7CB518" />
                <path d="M180,160 Q300,100 450,180" fill="none" stroke="#1C5C9E" strokeWidth="1.5" opacity="0.6" />
                <path d="M320,140 Q500,120 650,220" fill="none" stroke="#1C5C9E" strokeWidth="1.5" opacity="0.6" />
                <path d="M250,250 Q400,200 580,150" fill="none" stroke="#1C5C9E" strokeWidth="1.5" opacity="0.6" />
              </svg>
            </div>
            <div className="relative">
              <h3 className="font-heading text-xl font-bold text-white sm:text-2xl md:text-3xl">
                Presencia en 5 continentes
              </h3>
              <p className="mt-3 text-sm text-white/80 sm:mt-4 sm:text-base">
                Operamos en América, Europa, Asia, África y Oceanía a través de alianzas
                estratégicas con los principales operadores logísticos del mundo.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-white/70 sm:mt-6 sm:text-sm">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
                  América del Norte y del Sur
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
                  Europa y Medio Oriente
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
                  Asia-Pacífico
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {coverageStats.map((stat, index) => (
              <div
                key={stat.label}
                className="card-hover flex flex-col items-center justify-center rounded-xl border border-card-border bg-surface p-4 text-center sm:p-6 md:p-8"
                style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
              >
                <span className="font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl lg:text-5xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-xs font-medium text-text-muted sm:mt-2 sm:text-sm md:text-base">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
