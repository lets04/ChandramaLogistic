import { useEffect, useRef, useState, type FormEvent } from 'react'
import { MessageCircle, Send, X, RotateCcw, ExternalLink } from 'lucide-react'
import { company } from '../../data/content'
import { useChat, QUICK_REPLIES } from '../../hooks/useChat'

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const { messages, isLoading, error, quoteStep, sendMessage, clearChat } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const whatsappUrl = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(company.whatsappMessage)}`

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      inputRef.current?.focus()
    }
  }, [isOpen, messages, isLoading])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    const text = input
    setInput('')
    await sendMessage(text)
  }

  const handleQuickReply = async (text: string) => {
    if (text === 'Hablar con un asesor') {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
      return
    }
    await sendMessage(text)
  }

  return (
    <>
      {isOpen && (
        <div
          className="safe-bottom fixed bottom-36 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-card-border bg-white shadow-2xl sm:bottom-40 sm:right-6 md:bottom-44 md:right-8"
          style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
          role="dialog"
          aria-label="Chat de asistencia"
        >
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <MessageCircle size={18} />
              </div>
              <div>
                <p className="font-heading text-sm font-semibold">Asistente Virtual</p>
                <p className="text-xs text-white/80">{company.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={clearChat}
                className="rounded-lg p-2 transition-colors hover:bg-white/10"
                aria-label="Reiniciar conversación"
                title="Reiniciar conversación"
              >
                <RotateCcw size={16} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 transition-colors hover:bg-white/10"
                aria-label="Cerrar chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex max-h-[min(420px,50vh)] min-h-[280px] flex-1 flex-col">
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      message.role === 'user'
                        ? 'rounded-br-md bg-primary text-white'
                        : 'rounded-bl-md bg-surface-muted text-text-heading'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-surface-muted px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-text-muted [animation-delay:0ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-text-muted [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-text-muted [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <p className="rounded-lg bg-error/10 px-3 py-2 text-center text-xs text-error">
                  {error}
                </p>
              )}

              <div ref={messagesEndRef} />
            </div>

            {!isLoading && !quoteStep && messages.length <= 2 && (
              <div className="flex flex-wrap gap-2 border-t border-card-border px-4 py-3">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    onClick={() => handleQuickReply(reply)}
                    className="rounded-full border border-card-border bg-white px-3 py-1.5 text-xs text-primary transition-colors hover:border-secondary hover:bg-surface"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-card-border px-3 py-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  quoteStep === 'email'
                    ? 'tu@correo.com'
                    : quoteStep === 'phone'
                      ? 'Teléfono o "omitir"'
                      : quoteStep
                        ? 'Escribe tu respuesta...'
                        : 'Escribe tu mensaje...'
                }
                disabled={isLoading}
                maxLength={500}
                className="min-w-0 flex-1 rounded-xl border border-card-border bg-surface px-3 py-2.5 text-sm outline-none transition-colors focus:border-secondary disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
                aria-label="Enviar mensaje"
              >
                <Send size={18} />
              </button>
            </form>

            <div className="border-t border-card-border px-4 py-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 text-xs text-secondary transition-colors hover:text-primary"
              >
                <ExternalLink size={12} />
                Hablar con un asesor por WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="safe-bottom fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-white shadow-lg shadow-secondary/40 transition-transform duration-300 active:scale-95 sm:bottom-28 sm:right-6 sm:hover:scale-110 md:bottom-32 md:right-8 md:h-16 md:w-16"
        style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat de asistencia'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={26} />}
      </button>
    </>
  )
}
