import { Mail, MapPin, Phone } from 'lucide-react'
import { company, navLinks } from '../../data/content'
import { Logo } from '../ui/Logo'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="safe-bottom bg-footer text-footer-text">
      <div className="container-page py-12 sm:py-16">
        <div className="grid gap-8 text-center sm:gap-10 sm:text-left md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center sm:items-start lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-footer-text/80 sm:max-w-none sm:text-sm">
              {company.description}
            </p>
          </div>

          <div>
            <h3 className="font-heading text-base font-semibold text-white sm:text-lg">Enlaces</h3>
            <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-block py-1 text-xs transition-colors duration-300 hover:text-accent active:text-accent sm:text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-base font-semibold text-white sm:text-lg">Servicios</h3>
            <ul className="mt-3 space-y-2 text-xs sm:mt-4 sm:space-y-3 sm:text-sm">
              <li>Transporte Terrestre</li>
              <li>Transporte Marítimo</li>
              <li>Transporte Aéreo</li>
              <li>Aduanas y Almacenaje</li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-base font-semibold text-white sm:text-lg">Contacto</h3>
            <ul className="mt-3 space-y-3 text-xs sm:mt-4 sm:space-y-4 sm:text-sm">
              <li className="flex items-start justify-center gap-2 sm:justify-start sm:gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent sm:hidden" />
                <MapPin size={18} className="mt-0.5 hidden shrink-0 text-accent sm:block" />
                <span className="text-left">{company.address}</span>
              </li>
              <li className="flex items-center justify-center gap-2 sm:justify-start sm:gap-3">
                <Phone size={16} className="shrink-0 text-accent sm:hidden" />
                <Phone size={18} className="hidden shrink-0 text-accent sm:block" />
                <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="hover:text-white active:text-white">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-center justify-center gap-2 sm:justify-start sm:gap-3">
                <Mail size={16} className="shrink-0 text-accent sm:hidden" />
                <Mail size={18} className="hidden shrink-0 text-accent sm:block" />
                <a href={`mailto:${company.email}`} className="break-all hover:text-white active:text-white">
                  {company.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center sm:mt-12 sm:flex-row sm:gap-4 sm:pt-8 sm:text-left">
          <p className="text-xs text-footer-text/70 sm:text-sm">
            © {currentYear} {company.name}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-footer-text/70 sm:text-sm">
            Soluciones logísticas de clase mundial
          </p>
        </div>
      </div>
    </footer>
  )
}
