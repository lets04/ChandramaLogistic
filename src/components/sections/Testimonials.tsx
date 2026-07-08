import { useState, type FormEvent } from 'react'
import { Send, Star } from 'lucide-react'
import { company, testimonials } from '../../data/content'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Button, SectionHeading } from '../ui/SectionHeading'

export function Testimonials() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()
  const [form, setForm] = useState({ name: '', company: '', rating: 5, message: '' })

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const subject = encodeURIComponent(`Comentario de cliente - ${form.name}`)
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nEmpresa: ${form.company || 'No especificada'}\nCalificación: ${form.rating}/5\n\nComentario:\n${form.message}`,
    )

    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`
  }

  return (
    <section ref={ref} className="section-padding bg-surface">
      <div className="container-page">
        <SectionHeading
          label="Opiniones"
          title="Comparte tu experiencia"
          description="Tus comentarios nos ayudan a mejorar y a seguir cuidando cada operación logística."
        />

        <div
          className={`mx-auto grid max-w-5xl gap-6 transition-all duration-700 ${
            testimonials.length > 0 ? 'lg:grid-cols-[1fr_0.9fr]' : 'lg:max-w-2xl'
          } ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          {testimonials.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.name}
                  className="rounded-xl border border-card-border bg-white p-5 shadow-sm shadow-primary/5"
                >
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, index) => (
                      <Star key={index} size={15} className="fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="mt-4 border-t border-card-border pt-3">
                    <p className="font-heading text-sm font-semibold text-primary">
                      {testimonial.name}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">{testimonial.role}</p>
                  </div>
                </article>
              ))}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-card-border bg-white p-5 shadow-lg shadow-primary/5 sm:p-6 md:p-8"
          >
            <h3 className="font-heading text-lg font-bold text-primary sm:text-xl">
              Deja tu comentario
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Se abrirá tu correo con el mensaje listo para enviarlo a Chandrama Logistic.
            </p>

            <div className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="testimonial-name" className="mb-1.5 block text-sm font-medium text-text-dark">
                    Nombre
                  </label>
                  <input
                    id="testimonial-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    className="w-full rounded-lg border border-card-border bg-surface px-4 py-3 text-base outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label htmlFor="testimonial-company" className="mb-1.5 block text-sm font-medium text-text-dark">
                    Empresa
                  </label>
                  <input
                    id="testimonial-company"
                    type="text"
                    value={form.company}
                    onChange={(event) => setForm({ ...form, company: event.target.value })}
                    className="w-full rounded-lg border border-card-border bg-surface px-4 py-3 text-base outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                    placeholder="Nombre de empresa"
                  />
                </div>
              </div>

              <div>
                <span className="mb-2 block text-sm font-medium text-text-dark">Calificación</span>
                <div className="flex gap-2" role="radiogroup" aria-label="Calificación">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setForm({ ...form, rating })}
                      className={`flex h-11 w-11 items-center justify-center rounded-lg border transition-colors ${
                        rating <= form.rating
                          ? 'border-warning bg-warning/10 text-warning'
                          : 'border-card-border bg-surface text-text-muted'
                      }`}
                      aria-label={`${rating} de 5`}
                      aria-pressed={rating <= form.rating}
                    >
                      <Star size={19} className={rating <= form.rating ? 'fill-warning' : ''} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="testimonial-message" className="mb-1.5 block text-sm font-medium text-text-dark">
                  Comentario
                </label>
                <textarea
                  id="testimonial-message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  className="w-full resize-none rounded-lg border border-card-border bg-surface px-4 py-3 text-base outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  placeholder="Cuéntanos cómo fue tu experiencia..."
                />
              </div>
            </div>

            <Button type="submit" variant="primary" fullWidth className="mt-5">
              Enviar comentario
              <Send size={18} />
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
