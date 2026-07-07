import { processSteps } from '../../data/content'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { SectionHeading } from '../ui/SectionHeading'

export function Process() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section id="proceso" ref={ref} className="section-padding bg-surface">
      <div className="container-page">
        <SectionHeading
          label="Cómo trabajamos"
          title="Proceso logístico"
          description="Un flujo claro y eficiente desde la consulta hasta la entrega final."
        />

        {/* Mobile timeline */}
        <div className="relative md:hidden">
          <div className="absolute bottom-0 left-[1.125rem] top-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />
          <div className="space-y-6">
            {processSteps.map((step, index) => (
              <div
                key={step.step}
                className={`relative pl-12 transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: isVisible ? `${index * 120}ms` : '0ms' }}
              >
                <div className="absolute left-0 flex h-9 w-9 items-center justify-center rounded-full gradient-corporate font-heading text-sm font-bold text-white shadow-lg">
                  {step.step}
                </div>
                <div className="card-hover rounded-xl border border-card-border bg-white p-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Paso {step.step}
                  </span>
                  <h3 className="mt-1 font-heading text-lg font-bold text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-text-muted sm:text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop timeline */}
        <div className="relative hidden md:block">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary via-secondary to-accent" />

          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <div
                key={step.step}
                className={`relative flex items-center ${
                  index % 2 === 1 ? 'flex-row-reverse' : ''
                } transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }}
              >
                <div className={`flex-1 ${index % 2 === 1 ? 'text-right' : ''}`}>
                  <div
                    className={`card-hover max-w-lg rounded-xl border border-card-border bg-white p-8 ${
                      index % 2 === 1 ? 'ml-auto' : 'mr-auto'
                    }`}
                  >
                    <span className="text-sm font-semibold uppercase tracking-wider text-accent">
                      Paso {step.step}
                    </span>
                    <h3 className="mt-2 font-heading text-2xl font-bold text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-text-muted">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="absolute left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full gradient-corporate font-heading text-lg font-bold text-white shadow-lg">
                  {step.step}
                </div>

                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
