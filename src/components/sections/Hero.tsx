import { ArrowRight, ChevronDown } from 'lucide-react'
import { company } from '../../data/content'
import { Button } from '../ui/SectionHeading'

import heroImage from '../../assets/images/hero-bg.png'

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      {/* Imagen de fondo */}
      <img
        src={heroImage}
        alt="Puerto logístico Chandrama"
        className="absolute inset-0 h-full w-full object-cover object-center"
        fetchPriority="high"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#041B46]/95 via-[#0A2E63]/78 to-[#0A2E63]/50 sm:from-[#041B46]/90 sm:via-[#0A2E63]/70 sm:to-[#0A2E63]/35" />

      {/* Contenido */}
      <div className="relative z-10 container-page w-full pb-20 pt-28 sm:py-32">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-white/20 bg-[#7CB518] px-4 py-2 text-xs font-semibold text-white shadow-lg sm:px-5 sm:text-sm">
            Soluciones logísticas integrales
          </span>

          <h1 className="mt-6 font-heading text-4xl font-extrabold leading-tight text-white sm:mt-8 sm:text-5xl lg:text-7xl">
            {company.tagline}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 sm:mt-6 sm:text-lg sm:leading-8">
            {company.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-5">
            <Button href="#contacto" variant="secondary">
              Cotizar ahora
              <ArrowRight size={20} />
            </Button>

            <Button href="#contacto" variant="outline">
              Contactar asesor
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll */}
      <a
        href="#nosotros"
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce text-white"
      >
        <ChevronDown size={34} />
      </a>
    </section>
  )
}
