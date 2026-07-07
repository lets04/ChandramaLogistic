import { Shield, Globe, MapPin, Clock, type LucideIcon } from 'lucide-react'
import { whyChooseUs } from '../../data/content'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { SectionHeading } from '../ui/SectionHeading'

const iconMap: Record<string, LucideIcon> = {
  shield: Shield,
  globe: Globe,
  mapPin: MapPin,
  clock: Clock,
}

export function WhyChooseUs() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      <div className="gradient-corporate absolute inset-0 opacity-95" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

      <div className="container-page relative">
        <SectionHeading
          label="Ventajas"
          title="¿Por qué elegirnos?"
          description="Experiencia, tecnología y compromiso en cada envío."
          light
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {whyChooseUs.map((item, index) => {
            const Icon = iconMap[item.icon]
            return (
              <div
                key={item.title}
                className={`rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm transition-all duration-700 sm:p-6 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 sm:h-12 sm:w-12">
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="mt-3 font-heading text-base font-semibold text-white sm:mt-4 sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/80 sm:text-sm">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
