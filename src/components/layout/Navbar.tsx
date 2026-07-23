import { useEffect, useState } from 'react'
import { ChevronRight, MessageSquarePlus, Menu, X } from 'lucide-react'
import { navLinks } from '../../data/content'
import { Logo } from '../ui/Logo'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleNavClick = () => setIsOpen(false)

  return (
    <>
      <header
        className={`safe-top fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'shadow-lg shadow-primary/20' : ''
        }`}
        style={{ backgroundColor: 'rgba(10, 46, 99, 0.95)' }}
      >
        <nav className="container-page flex items-center justify-between py-2.5 sm:py-4">
          <Logo />

          <ul className="hidden items-center gap-4 lg:flex xl:gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-white transition-colors duration-300 hover:text-accent lg:text-base"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#comentarios"
                className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                <MessageSquarePlus size={17} />
                <span>Comparte tu experiencia</span>
              </a>
            </li>
            <li>
              <a
                href="#contacto"
                className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-accent-hover"
              >
                Cotizar
              </a>
            </li>
          </ul>

          <button
            type="button"
            className={`touch-target flex items-center justify-center rounded-lg border border-white/15 p-2 text-white transition-colors lg:hidden ${
              isOpen ? 'bg-white/15' : 'bg-white/5 active:bg-white/15'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>
      </header>

      {isOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-30 bg-primary/35 backdrop-blur-[2px] lg:hidden"
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar menú"
          />
          <nav
            id="mobile-menu"
            className="safe-top fixed right-4 top-20 z-40 w-[min(calc(100vw-2rem),22rem)] overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl shadow-primary/25 lg:hidden"
          >
            <div className="border-b border-card-border bg-primary px-5 py-4 text-white">
              <p className="font-heading text-base font-semibold">Chandrama Logistic</p>
              <p className="mt-1 text-xs text-white/75">Navegación rápida</p>
            </div>

            <ul className="max-h-[calc(100svh-12rem)] overflow-y-auto p-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleNavClick}
                    className="flex min-h-[48px] items-center justify-between rounded-xl px-4 text-sm font-semibold text-primary transition-colors active:bg-surface-muted"
                  >
                    <span>{link.label}</span>
                    <ChevronRight size={18} className="text-accent" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="border-t border-card-border p-3">
              <a
                href="#comentarios"
                onClick={handleNavClick}
                className="mb-2 flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-secondary/20 bg-secondary/10 px-4 text-sm font-semibold text-primary active:bg-secondary/15"
              >
                <MessageSquarePlus size={18} />
                Comparte tu experiencia
              </a>

              <a
                href="#contacto"
                onClick={handleNavClick}
                className="flex min-h-[48px] items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-white shadow-lg shadow-accent/20 active:bg-accent-hover"
              >
                Cotizar ahora
              </a>
            </div>
          </nav>
        </>
      )}
    </>
  )
}
