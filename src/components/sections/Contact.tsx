import { useState, type FormEvent } from 'react'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { company } from '../../data/content'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Button, SectionHeading } from '../ui/SectionHeading'

const initialForm = { name: '', email: '', phone: '', message: '', website: '' }

export function Contact() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()
  const [form, setForm] = useState(initialForm)
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (isSending) return

    setIsSending(true)
    setStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', ...form }),
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      setForm(initialForm)
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section id="contacto" ref={ref} className="section-padding bg-surface pb-24 sm:pb-28">
      <div className="container-page">
        <SectionHeading
          label="Contacto"
          title="¿Listo para mover tu carga?"
          description="Contáctanos y recibe una cotización personalizada en menos de 24 horas."
        />

        <div
          className={`grid gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16 transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="order-2 lg:order-1">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-3 rounded-xl border border-card-border bg-white p-4 sm:gap-4 sm:p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 sm:h-12 sm:w-12">
                  <MapPin size={20} className="text-secondary sm:hidden" />
                  <MapPin size={22} className="hidden text-secondary sm:block" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-heading text-sm font-semibold text-primary sm:text-base">
                    Oficinas
                  </h4>
                  <p className="mt-1 text-xs text-text-muted sm:text-sm">{company.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-card-border bg-white p-4 sm:gap-4 sm:p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 sm:h-12 sm:w-12">
                  <Phone size={20} className="text-secondary sm:hidden" />
                  <Phone size={22} className="hidden text-secondary sm:block" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-heading text-sm font-semibold text-primary sm:text-base">
                    Teléfonos
                  </h4>
                  <p className="mt-1 text-xs text-text-muted sm:text-sm">
                    <a
                      href={`tel:${company.phone.replace(/\s/g, '')}`}
                      className="block py-0.5 hover:text-primary active:text-primary"
                    >
                      {company.phone}
                    </a>
                    <a
                      href={`tel:${company.phone2.replace(/\s/g, '')}`}
                      className="block py-0.5 hover:text-primary active:text-primary"
                    >
                      {company.phone2}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-card-border bg-white p-4 sm:gap-4 sm:p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 sm:h-12 sm:w-12">
                  <Mail size={20} className="text-secondary sm:hidden" />
                  <Mail size={22} className="hidden text-secondary sm:block" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-heading text-sm font-semibold text-primary sm:text-base">
                    Correo electrónico
                  </h4>
                  <p className="mt-1 break-all text-xs text-text-muted sm:text-sm">
                    <a href={`mailto:${company.email}`} className="hover:text-primary active:text-primary">
                      {company.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 overflow-hidden rounded-xl border border-card-border shadow-lg sm:mt-8">
              <iframe
                title="Ubicación de Chandrama Logistic"
                src={company.mapUrl}
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full sm:h-[250px]"
              />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="order-1 rounded-xl border border-card-border bg-white p-5 shadow-lg shadow-primary/5 sm:p-6 md:p-8 lg:order-2"
          >
            <h3 className="font-heading text-lg font-bold text-primary sm:text-xl md:text-2xl">
              Envíanos un mensaje
            </h3>
            <p className="mt-2 text-xs text-text-muted sm:text-sm">
              Completa el formulario y nos pondremos en contacto contigo a la brevedad.
            </p>

            <div className="mt-5 space-y-4 sm:mt-6">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />

              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-text-dark">
                  Nombre completo
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-card-border bg-surface px-4 py-3.5 text-base outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text-dark">
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-lg border border-card-border bg-surface px-4 py-3.5 text-base outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-text-dark">
                    Teléfono
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-lg border border-card-border bg-surface px-4 py-3.5 text-base outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                    placeholder="Teléfono de contacto"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-text-dark">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-lg border border-card-border bg-surface px-4 py-3.5 text-base outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  placeholder="Cuéntanos sobre tu envío o consulta..."
                />
              </div>
            </div>

            <Button type="submit" variant="primary" fullWidth className="mt-5 sm:mt-6" disabled={isSending}>
              {isSending ? 'Enviando...' : 'Enviar mensaje'}
              {!isSending && <Send size={18} />}
            </Button>

            {status === 'success' && (
              <p className="mt-4 rounded-lg border border-secondary/20 bg-secondary/10 px-4 py-3 text-sm leading-relaxed text-primary">
                ¡Solicitud enviada! Te enviaremos una confirmación a tu correo.
              </p>
            )}

            {status === 'error' && (
              <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-700">
                No pudimos enviar tu solicitud. Intenta nuevamente.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
