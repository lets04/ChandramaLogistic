import {
  ClipboardCheck,
  FileCheck,
  Globe,
  Handshake,
  Network,
  Package,
  Plane,
  Ship,
  ShoppingCart,
  Truck,
  Warehouse,
  type LucideIcon,
} from 'lucide-react'
import { services } from '../../data/content'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { SectionHeading } from '../ui/SectionHeading'

const iconMap: Record<string, LucideIcon> = {
  truck: Truck,
  ship: Ship,
  plane: Plane,
  fileCheck: FileCheck,
  warehouse: Warehouse,
  package: Package,
  globe: Globe,
  shoppingCart: ShoppingCart,
  network: Network,
  clipboardCheck: ClipboardCheck,
  handshake: Handshake,
}

export function Services() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section id="servicios" ref={ref} className="section-padding bg-surface">
      <div className="container-page">
        <SectionHeading
          label="Servicios"
          title="Servicios logísticos y comercio exterior"
          description="Soluciones integrales para transporte, importación, exportación, abastecimiento y coordinación internacional."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon]
            return (
              <article
                key={service.title}
                className={`card-hover rounded-xl border border-card-border bg-white p-5 transition-all duration-700 sm:p-6 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 80}ms` : '0ms',
                  borderTop: '4px solid #7CB518',
                }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 sm:h-14 sm:w-14">
                  <Icon size={24} className="text-secondary sm:hidden" />
                  <Icon size={28} className="hidden text-secondary sm:block" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-primary sm:mt-5 sm:text-xl">
                  {service.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-text-muted sm:mt-3 sm:text-sm">
                  {service.description}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}