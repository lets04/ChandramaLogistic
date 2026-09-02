import { useCallback, useEffect, useState } from 'react'
import {
  getBotReply,
  nextQuoteStep,
  parsePhoneInput,
  QUOTE_PROMPTS,
  type QuoteStep,
} from '../lib/chatBot'

export type ChatRole = 'user' | 'assistant'

export type ChatMessage = {
  id: string
  role: ChatRole
  content: string
}

type LeadDraft = {
  name: string
  email: string
  phone: string
  message: string
}

const STORAGE_KEY = 'chandrama-chat-history'
const WELCOME_MESSAGE =
  '¡Hola! Soy el asistente virtual de Chandrama Logistic. ¿En qué puedo ayudarte hoy? Puedo informarte sobre nuestros servicios, importaciones desde China o ayudarte a solicitar una cotización.'

export const QUICK_REPLIES = [
  '¿Qué servicios ofrecen?',
  '¿Importan desde China?',
  'Quiero solicitar una cotización',
  'Hablar con un asesor',
] as const

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function loadStoredMessages(): ChatMessage[] {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored) as ChatMessage[]
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (m) =>
        m &&
        typeof m.id === 'string' &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string',
    )
  } catch {
    return []
  }
}

async function submitLead(lead: LeadDraft): Promise<boolean> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'contact',
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      message: `[Solicitud desde chatbot]\n\n${lead.message}`,
      website: '',
    }),
  })

  return response.ok
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const stored = loadStoredMessages()
    if (stored.length > 0) return stored
    return [{ id: createId(), role: 'assistant', content: WELCOME_MESSAGE }]
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [quoteStep, setQuoteStep] = useState<QuoteStep | null>(null)
  const [leadDraft, setLeadDraft] = useState<LeadDraft>({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  }, [messages])

  const addAssistantMessage = useCallback((content: string) => {
    setMessages((prev) => [
      ...prev,
      { id: createId(), role: 'assistant', content },
    ])
  }, [])

  const processQuoteAnswer = useCallback(
    async (answer: string) => {
      if (!quoteStep || quoteStep === 'done') return

      const result = nextQuoteStep(quoteStep, answer)

      if (result.error) {
        setError(result.error)
        return
      }

      setError(null)

      const updated: LeadDraft = { ...leadDraft }

      if (quoteStep === 'name') updated.name = answer.trim()
      if (quoteStep === 'email') updated.email = answer.trim()
      if (quoteStep === 'phone') updated.phone = parsePhoneInput(answer)
      if (quoteStep === 'message') updated.message = answer.trim()

      setLeadDraft(updated)
      setQuoteStep(result.step)

      if (result.step === 'done') {
        setIsLoading(true)
        await delay(400)

        const success = await submitLead(updated)
        setIsLoading(false)

        if (success) {
          addAssistantMessage(
            '✅ ¡Listo! Tu solicitud de cotización fue enviada correctamente. Recibirás un correo de confirmación y nuestro equipo te contactará pronto.\n\n¿Hay algo más en lo que pueda ayudarte?',
          )
        } else {
          addAssistantMessage(
            '⚠️ No pudimos enviar tu solicitud. Por favor usa el formulario de contacto en la página o escríbenos por WhatsApp.',
          )
        }

        setQuoteStep(null)
        setLeadDraft({ name: '', email: '', phone: '', message: '' })
        return
      }

      await delay(300)
      addAssistantMessage(QUOTE_PROMPTS[result.step])
    },
    [quoteStep, leadDraft, addAssistantMessage],
  )

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim()
      if (!trimmed || isLoading) return

      setError(null)

      const userMessage: ChatMessage = {
        id: createId(),
        role: 'user',
        content: trimmed,
      }

      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)
      await delay(400)

      try {
        if (quoteStep && quoteStep !== 'done') {
          await processQuoteAnswer(trimmed)
          setIsLoading(false)
          return
        }

        const reply = getBotReply(trimmed)

        if (reply === 'QUOTE_START') {
          setQuoteStep('name')
          addAssistantMessage(
            `¡Con gusto te ayudamos con una cotización! ${QUOTE_PROMPTS.name}`,
          )
          setIsLoading(false)
          return
        }

        addAssistantMessage(reply)
      } catch {
        setError('Ocurrió un error. Intenta de nuevo.')
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, quoteStep, processQuoteAnswer, addAssistantMessage],
  )

  const clearChat = useCallback(() => {
    setMessages([{ id: createId(), role: 'assistant', content: WELCOME_MESSAGE }])
    setError(null)
    setQuoteStep(null)
    setLeadDraft({ name: '', email: '', phone: '', message: '' })
    sessionStorage.removeItem(STORAGE_KEY)
  }, [])

  return {
    messages,
    isLoading,
    error,
    quoteStep,
    sendMessage,
    clearChat,
  }
}
