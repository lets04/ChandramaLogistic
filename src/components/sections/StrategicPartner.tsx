import { ArrowLeftRight, CheckCircle } from 'lucide-react'
import { strategicPartner } from '../../data/content'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { SectionHeading } from '../ui/SectionHeading'

export function StrategicPartner() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section ref={ref} className="section-padding bg-primary text-white">
      <div className="container-page">
        <SectionHeading
          label="Socios estratégicos internacionales"
          title={strategicPartner.title}
          description={strategicPartner.description}
          light
        />

        <div
          className={`transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="rounded-xl border border-white/15 bg-white/10 p-4 shadow-2xl shadow-black/10 sm:p-6 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-white/15 bg-white/10 p-5 text-center sm:flex-row sm:p-6">
                  <span className="font-heading text-xl font-bold sm:text-2xl">Bolivia</span>
                  <div className="flex items-center gap-3 text-accent-light">
                    <span className="hidden h-px w-16 bg-accent-light sm:block" />
                    <ArrowLeftRight size={34} />
                    <span className="hidden h-px w-16 bg-accent-light sm:block" />
                  </div>
                  <span className="font-heading text-xl font-bold sm:text-2xl">China</span>
                </div>

                <div className="mt-4 rounded-xl bg-accent px-5 py-4 text-center shadow-lg shadow-black/10">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
                    {strategicPartner.label}
                  </p>
                  <p className="mt-1 font-heading text-xl font-bold text-white">
                    Origen, compra, inspección y logística hacia Bolivia
                  </p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {strategicPartner.capabilities.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-lg bg-white/10 p-3">
                      <CheckCircle size={18} className="mt-0.5 shrink-0 text-accent-light" />
                      <span className="text-sm text-white/85">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex min-h-56 w-full items-center justify-center rounded-xl border border-white/15 bg-white p-6 text-center text-primary shadow-lg shadow-black/10 sm:p-8">
                  {strategicPartner.logo ? (
                    <img
                      src={strategicPartner.logo}
                      alt="Logo de la empresa aliada en China"
                      className="max-h-36 w-auto object-contain"
                    />
                  ) : (
                    <div>
                      <p className="font-heading text-lg font-bold">Logo empresa china</p>
                      <p className="mt-2 text-sm text-text-muted">Espacio para el logo del aliado.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-heading text-xl font-bold sm:text-2xl">¿Por qué importar con nosotros?</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {strategicPartner.reasons.map((reason) => (
                <div key={reason} className="rounded-xl border border-white/15 bg-white p-5 text-primary">
                  <CheckCircle size={22} className="text-accent" />
                  <p className="mt-3 font-heading text-sm font-semibold leading-snug">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
