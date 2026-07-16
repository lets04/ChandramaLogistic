import { Award, CheckCircle, Eye, Heart, Target } from 'lucide-react'
import { values, whatWeDo } from '../../data/content'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { SectionHeading } from '../ui/SectionHeading'

const icons = [Target, Eye, Heart, Award]

export function About() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section id="nosotros" ref={ref} className="section-padding bg-white">
      <div className="container-page">
        <SectionHeading
          label="Nosotros"
          title="Tu aliado estratégico en logística y comercio exterior"
          description="Acompañamos operaciones nacionales e internacionales con soluciones seguras, eficientes y personalizadas."
        />

        <div
          className={`grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div>
            <div className="overflow-hidden rounded-xl shadow-xl shadow-primary/10 sm:rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
                alt="Operaciones logísticas de Chandrama"
                className="h-52 w-full object-cover sm:h-72 md:h-96"
                loading="lazy"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="font-heading text-xl font-bold text-primary sm:text-2xl md:text-3xl">
              Nuestra historia
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-text-muted sm:mt-4 sm:text-base">
              Chandrama Logistic S.R.L. nació con la visión de ofrecer soluciones logísticas
              integrales que superen las expectativas de nuestros clientes. Desde nuestros inicios,
              hemos construido una red global de aliados estratégicos que nos permite operar en más
              de 50 países.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text-muted sm:mt-4 sm:text-base">
              Hoy somos referentes en transporte multimodal, gestión aduanera y distribución,
              respaldados por un equipo de profesionales comprometidos con la excelencia operativa.
            </p>

            <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6">
              <div className="rounded-xl border border-card-border bg-surface p-4 sm:p-5">
                <h4 className="font-heading text-sm font-semibold text-primary sm:text-base">Misión</h4>
                <p className="mt-2 text-xs leading-relaxed text-text-muted sm:text-sm">
                  Conectar mercados globales con soluciones logísticas seguras, eficientes y
                  personalizadas.
                </p>
              </div>
              <div className="rounded-xl border border-card-border bg-surface p-4 sm:p-5">
                <h4 className="font-heading text-sm font-semibold text-primary sm:text-base">Visión</h4>
                <p className="mt-2 text-xs leading-relaxed text-text-muted sm:text-sm">
                  Ser la empresa logística líder en la región, reconocida por innovación y
                  confianza.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`mt-10 rounded-xl border border-card-border bg-surface p-5 transition-all duration-700 sm:mt-14 sm:p-6 md:p-8 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h3 className="font-heading text-xl font-bold text-primary sm:text-2xl">¿Qué hacemos?</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {whatWeDo.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-lg bg-white p-3">
                <CheckCircle size={18} className="mt-0.5 shrink-0 text-accent" />
                <span className="text-sm leading-relaxed text-text-muted">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = icons[index]
            return (
              <div
                key={value.title}
                className={`card-hover rounded-xl border border-card-border bg-white p-5 text-center transition-all duration-700 sm:p-6 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 sm:h-14 sm:w-14">
                  <Icon size={24} className="text-secondary sm:hidden" />
                  <Icon size={28} className="hidden text-secondary sm:block" />
                </div>
                <h4 className="mt-3 font-heading text-sm font-semibold text-primary sm:mt-4 sm:text-base">
                  {value.title}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-text-muted sm:text-sm">
                  {value.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
