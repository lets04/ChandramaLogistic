export const company = {
  name: 'Chandrama Logistic S.R.L.',
  tagline: 'Movemos tu carga con seguridad',
  description:
    'Soluciones logísticas integrales con cobertura internacional. Transporte terrestre, marítimo, aéreo, aduanas, almacenaje y distribución.',
  email: 'chandrama.logisticsrl@gmail.com',
  phone: '+591 72472346',
  phone2: '+591 71461707',
  whatsapp: '59172472346',
  whatsappMessage:
    'Hola, me interesa solicitar información sobre sus servicios logísticos.',
    mapUrl:'https://www.google.com/maps/place/Cochabamba/@-17.3938783,-66.2464487,12z/data=!4m6!3m5!1s0x93e373e0d9e4ab27:0xa2719ae9532c3e65!8m2!3d-17.3820091!4d-66.1595813!16zL20vMDNrZ2N0?entry=ttu&g_ep=EgoyMDI2MDcwNS4wIKXMDSoASAFQAw%3D%3D',
  address: 'Oficina principal en Cochabamba y atención operativa en Oruro. Atendemos proyectos en todo el territorio nacional e internacional.',
}

export const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Equipo', href: '#equipo' },
  { label: 'Contacto', href: '#contacto' },
]

export const services = [
  {
    title: 'Transporte Terrestre',
    description:
      'Flota moderna para carga nacional e internacional con seguimiento GPS en tiempo real y entregas puntuales.',
    icon: 'truck' as const,
  },
  {
    title: 'Transporte Marítimo',
    description:
      'Contenedores FCL y LCL hacia cualquier puerto del mundo con gestión documental completa.',
    icon: 'ship' as const,
  },
  {
    title: 'Transporte Aéreo',
    description:
      'Envíos urgentes y de alto valor con los mejores tiempos de tránsito y máxima seguridad.',
    icon: 'plane' as const,
  },
  {
    title: 'Aduanas',
    description:
      'Despacho aduanero ágil y cumplimiento normativo para importaciones y exportaciones sin contratiempos.',
    icon: 'fileCheck' as const,
  },
  {
    title: 'Almacenaje',
    description:
      'Centros de distribución seguros con control de inventario, picking y gestión de stock.',
    icon: 'warehouse' as const,
  },
  {
    title: 'Distribución',
    description:
      'Última milla eficiente con rutas optimizadas y entrega garantizada a destino final.',
    icon: 'package' as const,
  },
]

export const values = [
  { title: 'Integridad', description: 'Actuamos con transparencia y ética en cada operación.' },
  { title: 'Excelencia', description: 'Buscamos la mejora continua en cada servicio.' },
  { title: 'Compromiso', description: 'Tu carga es nuestra responsabilidad hasta el destino.' },
  { title: 'Innovación', description: 'Tecnología y procesos que optimizan tu cadena logística.' },
]

export const whyChooseUs = [
  {
    title: 'Seguridad',
    description: 'Protocolos estrictos y seguros para proteger tu mercancía en todo el trayecto.',
    icon: 'shield' as const,
  },
  {
    title: 'Cobertura Internacional',
    description: 'Red de aliados en más de 50 países para mover tu carga a cualquier destino.',
    icon: 'globe' as const,
  },
  {
    title: 'Seguimiento',
    description: 'Visibilidad total de tu envío con actualizaciones en tiempo real.',
    icon: 'mapPin' as const,
  },
  {
    title: 'Puntualidad',
    description: 'Compromiso con los plazos acordados y entregas a tiempo, siempre.',
    icon: 'clock' as const,
  },
]

export const coverageStats = [
  { value: '50+', label: 'Países' },
  { value: '200+', label: 'Rutas activas' },
  { value: '15+', label: 'Años de experiencia' },
  { value: '1,000+', label: 'Clientes satisfechos' },
]

export const processSteps = [
  {
    step: 1,
    title: 'Consulta y cotización',
    description: 'Analizamos tus necesidades y te entregamos una propuesta personalizada.',
  },
  {
    step: 2,
    title: 'Planificación',
    description: 'Diseñamos la ruta óptima y gestionamos toda la documentación requerida.',
  },
  {
    step: 3,
    title: 'Recojo y transporte',
    description: 'Coordinamos el recojo y ejecutamos el transporte con seguimiento continuo.',
  },
  {
    step: 4,
    title: 'Aduanas y entrega',
    description: 'Gestionamos trámites aduaneros y entregamos en destino final.',
  },
]

export const clients = [
  {
    name: 'Nueva Occidental',
    logo: 'src/assets/images/clients/nuevaOccidental.png',
  },
  {
    name: 'MACEGERT',
    logo: 'src/assets/images/clients/macegert.jpg',
  },
]

export const testimonials: Array<{ name: string; role: string; text: string; rating: number }> = []

export const teamMembers = [
  {
    name: 'Lic. Rosmery Salazar',
    role: 'Agente Logistico',
    phone: '+591 72472346',
    image: '',
    initials: 'RS',
  },
  {
    name: 'Abogada Sonia Salazar',
    role: 'Asesor Legal',
    phone: '+591 71461707',
    image: '',
    initials: 'SS',
  },
  {
    name: 'Lic. Marlen Salazar',
    role: 'Agente Logistico',
    phone: '+591 71461707',
    image: '',
    initials: 'MS',
  },
]
export const faqs = [
  {
    question: '¿Qué tipos de carga transportan?',
    answer:
      'Transportamos carga general, contenedores, mercancía peligrosa (con certificación), carga refrigerada y proyectos especiales de gran tonelaje.',
  },
  {
    question: '¿Cuánto tiempo tarda una cotización?',
    answer:
      'Entregamos cotizaciones en un plazo máximo de 24 horas hábiles después de recibir los detalles de tu envío.',
  },
  {
    question: '¿Ofrecen seguro de carga?',
    answer:
      'Sí, ofrecemos pólizas de seguro de carga adaptadas al valor y tipo de mercancía que transportes.',
  },
  {
    question: '¿Puedo rastrear mi envío en tiempo real?',
    answer:
      'Absolutamente. Todos nuestros servicios incluyen seguimiento en tiempo real accesible desde nuestra plataforma o por contacto directo con tu ejecutivo.',
  },
  {
    question: '¿En qué países operan?',
    answer:
      'Operamos en más de 50 países a través de nuestra red de aliados estratégicos en América, Europa, Asia y Oceanía.',
  },
]
