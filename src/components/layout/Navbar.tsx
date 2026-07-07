import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
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
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
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
        <nav className="container-page flex items-center justify-between py-3 sm:py-4">
          <Logo />

          <ul className="hidden items-center gap-6 lg:flex lg:gap-8">
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
                href="#contacto"
                className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-accent-hover"
              >
                Cotizar
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="touch-target flex items-center justify-center rounded-lg p-2 text-white lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>
      </header>

      {isOpen && (
        <div
          className="safe-top fixed inset-0 z-40 flex flex-col bg-primary/98 backdrop-blur-sm lg:hidden"
          style={{ paddingTop: 'calc(3.75rem + env(safe-area-inset-top, 0px))' }}
        >
          <nav className="flex flex-1 flex-col px-4 pb-8">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleNavClick}
                    className="flex min-h-[52px] items-center rounded-xl px-4 text-lg font-medium text-white transition-colors active:bg-white/10"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contacto"
              onClick={handleNavClick}
              className="mt-6 flex min-h-[52px] items-center justify-center rounded-xl bg-accent px-4 text-lg font-semibold text-white active:bg-accent-hover"
            >
              Cotizar ahora
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
