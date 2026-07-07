import { useEffect, useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { company } from '../../data/content'
import { Button } from '../ui/SectionHeading'

export function Hero() {
  const [useVideo, setUseVideo] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    setUseVideo(!prefersReducedMotion && !isMobile)
  }, [])

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100dvh] items-center overflow-hidden"
    >
      {useVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1ea?w=1920&q=80"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/4482432/4482432-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>
      ) : (
        <img
          src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1ea?w=1200&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
      )}

      <div className="hero-overlay absolute inset-0" />

      <div className="relative z-10 container-page w-full pt-20 pb-24 sm:pt-24 sm:pb-20">
        <div className="max-w-3xl animate-slide-up">
          <span className="mb-3 inline-block max-w-full rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm sm:mb-4 sm:px-4 sm:py-1.5 sm:text-sm">
            Soluciones logísticas integrales
          </span>
          <h1 className="font-heading text-[1.75rem] font-bold leading-[1.15] text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            {company.tagline}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/90 sm:mt-6 sm:text-base md:text-lg lg:text-xl">
            {company.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <Button href="#contacto" variant="secondary" fullWidth>
              Cotizar ahora
              <ArrowRight size={20} />
            </Button>
            <Button href="#contacto" variant="outline" fullWidth>
              Contactar
            </Button>
          </div>
        </div>
      </div>

      <a
        href="#nosotros"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 animate-bounce text-white/70 transition-colors hover:text-white sm:bottom-8 sm:block"
        aria-label="Desplazarse hacia abajo"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  )
}
