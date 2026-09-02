import {
  company,
  faqs,
  processSteps,
  services,
  strategicPartner,
  coverageStats,
} from '../data/content'

export type QuoteStep = 'name' | 'email' | 'phone' | 'message' | 'done'

export const QUOTE_PROMPTS: Record<Exclude<QuoteStep, 'done'>, string> = {
  name: 'Perfecto. ¿Cuál es tu nombre completo?',
  email: 'Gracias. ¿Cuál es tu correo electrónico?',
  phone: '¿Tu número de teléfono? (opcional — escribe "omitir" si no deseas compartirlo)',
  message:
    'Cuéntanos sobre tu envío: tipo de carga, origen, destino y cualquier detalle relevante.',
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

function includesAny(text: string, keywords: string[]): boolean {
  return keywords.some((kw) => text.includes(kw))
}

export function matchFaq(userText: string): string | null {
  const text = normalize(userText)

  for (const faq of faqs) {
    const question = normalize(faq.question)
    const questionWords = question.replace(/[¿?]/g, '').split(/\s+/).filter((w) => w.length > 3)
    const matches = questionWords.filter((word) => text.includes(word)).length
    if (matches >= 2 || text.includes(question.slice(0, 20))) {
      return faq.answer
    }
  }

  return null
}

export function getBotReply(userText: string): string {
  const text = normalize(userText)

  if (
    includesAny(text, [
      'cotizacion',
      'cotizar',
      'presupuesto',
      'solicitar cotizacion',
      'quiero cotizar',
      'quiero una cotizacion',
    ])
  ) {
    return 'QUOTE_START'
  }

  if (includesAny(text, ['hola', 'buenos dias', 'buenas tardes', 'buenas noches', 'saludos'])) {
    return `¡Hola! Bienvenido a ${company.name}. Puedo ayudarte con información sobre nuestros servicios, importaciones desde China, proceso de trabajo o una cotización. ¿Qué te gustaría saber?`
  }

  if (
    includesAny(text, ['servicio', 'servicios', 'que ofrecen', 'que hacen', 'que ofrece'])
  ) {
    const list = services.map((s) => `• ${s.title}: ${s.description}`).join('\n')
    return `Ofrecemos los siguientes servicios:\n\n${list}\n\n¿Te gustaría solicitar una cotización para alguno de ellos?`
  }

  if (includesAny(text, ['china', 'chino', 'importar de china', 'importacion china'])) {
    return `${strategicPartner.description}\n\nCapacidades de nuestro aliado:\n${strategicPartner.capabilities.map((c) => `• ${c}`).join('\n')}`
  }

  if (includesAny(text, ['proceso', 'como trabajan', 'pasos', 'como funciona'])) {
    return processSteps
      .map((p) => `${p.step}. ${p.title}: ${p.description}`)
      .join('\n\n')
  }

  if (includesAny(text, ['cobertura', 'paises', 'rutas', 'donde operan'])) {
    return `Tenemos cobertura en ${coverageStats[0]?.value} ${coverageStats[0]?.label} y ${coverageStats[1]?.value} ${coverageStats[1]?.label}. Atendemos en todo el territorio nacional desde Cochabamba y Oruro.`
  }

  if (
    includesAny(text, ['contacto', 'telefono', 'correo', 'email', 'whatsapp', 'ubicacion', 'direccion'])
  ) {
    return `Puedes contactarnos:\n\n• Teléfonos: ${company.phone} / ${company.phone2}\n• Email: ${company.email}\n• WhatsApp: ${company.whatsapp}\n• ${company.address}`
  }

  if (includesAny(text, ['aduan', 'despacho', 'aduana'])) {
    const faq = faqs.find((f) => f.question.includes('aduan'))
    if (faq) return faq.answer
  }

  if (includesAny(text, ['puerta a puerta', 'door to door'])) {
    const faq = faqs.find((f) => f.question.includes('puerta'))
    if (faq) return faq.answer
  }

  if (includesAny(text, ['licitacion', 'licitaciones'])) {
    const faq = faqs.find((f) => f.question.includes('licitacion'))
    if (faq) return faq.answer
  }

  const faqMatch = matchFaq(userText)
  if (faqMatch) return faqMatch

  return `No encontré una respuesta exacta para tu consulta. Puedes:\n\n• Escribir "servicios" para ver lo que ofrecemos\n• Escribir "cotización" para solicitar una propuesta\n• Contactarnos por WhatsApp al ${company.whatsapp}\n• Usar el formulario de contacto en la página`
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function nextQuoteStep(
  current: QuoteStep,
  answer: string,
): { step: QuoteStep; error?: string } {
  const trimmed = answer.trim()

  switch (current) {
    case 'name':
      if (trimmed.length < 2) return { step: 'name', error: 'Por favor ingresa tu nombre.' }
      return { step: 'email' }
    case 'email':
      if (!isValidEmail(trimmed)) return { step: 'email', error: 'Ingresa un correo válido.' }
      return { step: 'phone' }
    case 'phone':
      return { step: 'message' }
    case 'message':
      if (trimmed.length < 10) {
        return { step: 'message', error: 'Describe tu envío con un poco más de detalle.' }
      }
      return { step: 'done' }
    default:
      return { step: 'done' }
  }
}

export function parsePhoneInput(answer: string): string {
  const trimmed = answer.trim()
  if (normalize(trimmed) === 'omitir' || trimmed === '-') return ''
  return trimmed
}
