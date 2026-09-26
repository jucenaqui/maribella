export const WHATSAPP_NUMBER = '573127442664'
export const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}`
export const EMAIL = 'maribellaconexion@gmail.com'
export const INSTAGRAM = 'https://instagram.com/maribella_conexion'
export const PHONE_LABEL = '312 744 2664'
export const GUIDE_PDF = '/guia-patrones-familiares-maribella.pdf'

export const nav = [
  { to: '/', key: 'nav.home' },
  { to: '/servicios', key: 'nav.services' },
  { to: '/integracion', key: 'nav.integration' },
  { to: '/tu-terapia', key: 'nav.therapy' },
  { to: WHATSAPP, key: 'nav.quote', external: true },
  { to: '/voces', key: 'nav.voices' },
  { to: '/mentoria', key: 'nav.mentorship' },
  { to: '/taller', key: 'nav.workshop' },
  { to: '/recursos', key: 'nav.resources' },
  { to: '/sobre', key: 'nav.about' },
  { to: '/contacto', key: 'nav.contact' },
]

export const navPrimary = [
  { to: '/servicios', key: 'nav.services' },
  { to: '/integracion', key: 'nav.integration' },
  { to: '/tu-terapia', key: 'nav.therapy' },
  { to: WHATSAPP, key: 'nav.quote', external: true },
  { to: '/mentoria', key: 'nav.mentorship' },
]

export const navGroups = [
  {
    titleKey: 'nav.start',
    items: [
      { to: '/tu-terapia', key: 'nav.quiz' },
      { to: WHATSAPP, key: 'nav.quote', external: true },
      { to: '/servicios', key: 'nav.services' },
    ],
  },
  {
    titleKey: 'nav.deepen',
    items: [
      { to: '/voces', key: 'nav.voices' },
      { to: '/mentoria', key: 'nav.mentorship' },
      { to: '/taller', key: 'nav.workshop' },
      { to: '/integracion', key: 'nav.integration' },
      { to: '/recursos', key: 'nav.resources' },
    ],
  },
  {
    titleKey: 'nav.brand',
    items: [
      { to: '/sobre', key: 'nav.about' },
      { to: '/contacto', key: 'nav.contact' },
    ],
  },
]

export const navMore = [
  { to: '/voces', key: 'nav.voices' },
  { to: '/taller', key: 'nav.workshop' },
  { to: '/recursos', key: 'nav.resources' },
  { to: '/sobre', key: 'nav.about' },
  { to: '/contacto', key: 'nav.contact' },
]

export const services = [
  {
    slug: 'constelaciones',
    category: 'Sistémico',
    title: 'Constelaciones Familiares',
    summary:
      'Identifica y sana patrones, conflictos o bloqueos heredados. Restaura el equilibrio, el amor y la paz en el sistema familiar.',
    detail:
      'Terapia sistémica que, a través de representaciones, devela desórdenes o exclusiones en el árbol familiar. El objetivo no es “arreglar” a nadie, sino devolverle un lugar a lo que fue excluido, para que el amor pueda fluir de nuevo.',
    price: {
      cop: 170000,
      usd: { from: 130, to: 180 },
    },
  },
  {
    slug: 'feng-shui',
    category: 'Espacio',
    title: 'Feng Shui',
    summary:
      'Armoniza hogar u oficina: distribución, colores y objetos para que el Chi circule y sostenga abundancia, salud y relaciones.',
    detail:
      'Ocupación consciente del espacio. Estudiamos cómo tu entorno cotidiano influye en tu estado emocional y en las oportunidades que se abren — o se estancan — en la vida diaria.',
    price: {
      cop: 500000,
      usd: { from: 200, to: 350, note: 'scope' },
    },
  },
  {
    slug: 'astrologia',
    category: 'Autoconocimiento',
    title: 'Astrología terapéutica',
    summary:
      'Carta natal como mapa de personalidad, ciclos vitales y propósito. Herramienta de claridad, no de destino cerrado.',
    detail:
      'Utilizada de forma holística y psicológica: comprende tus patrones, ventanas de cambio y el “por qué ahora” de una crisis, sin recetas genéricas ni fatalismo.',
    price: {
      cop: 450000,
      usd: { from: 150, to: 220 },
    },
  },
  {
    slug: 'limpieza',
    category: 'Energético',
    title: 'Limpieza energética',
    summary:
      'Libera densidades en el campo áurico y en espacios físicos con plantas sagradas, cuencos, cristales y decretos.',
    detail:
      'Práctica para restablecer un flujo ligero cuando un lugar o un proceso personal se siente “cargado”. Complementa el trabajo sistémico; no lo sustituye.',
  },
  {
    slug: 'angelical',
    category: 'Espiritual',
    title: 'Terapias angelicales',
    summary:
      'Canalización de consuelo, mensajes y frecuencias de guía para soltar miedos y ganar claridad emocional.',
    detail:
      'Un espacio de contención espiritual. El terapeuta actúa como canal para transmitir guía, no como autoridad sobre tu historia.',
    price: {
      cop: 140000,
      usd: { from: 90, to: 130 },
    },
  },
  {
    slug: 'acompanamiento',
    category: 'Proceso',
    title: 'Acompañamiento terapéutico',
    summary:
      'Guía continua en crisis, transiciones o sanación profunda. Escucha activa + herramientas holísticas a tu ritmo.',
    detail:
      'Caminar al lado, no delante. Integramos lo vivido en constelación, carta o espacio, para que el insight se vuelva vida cotidiana.',
  },
]

export const PRICE_ORDER = ['constelaciones', 'angelical', 'astrologia', 'feng-shui']

export const pricedServices = PRICE_ORDER.map((slug) => services.find((service) => service.slug === slug)).filter(Boolean)

export const quoteCatalog = [
  ...pricedServices.map((service) => ({
    id: service.slug,
    title: service.title,
    desc: service.summary,
    price: service.price,
    tipo: 'unico',
  })),
]

export const voces = {
  eyebrow: 'Voces · diagnóstico y procesos',
  title: 'Quienes ya se sentaron aquí',
  lead:
    'No son recomendaciones de un producto. Son personas que tomaron una sesión de diagnóstico o un proceso con Maribella: claridad, no magia.',
  featured: {
    name: 'Consultante · 6 meses de proceso',
    quote:
      'Llevo 6 meses trabajando con Maribella y hoy entendí algo que 3 años de terapia convencional no me habían mostrado. No era yo la que repetía ese patrón con mi pareja. Era algo de mi familia que yo estaba cargando sin saberlo.',
    note: 'Aviso real: la primera sesión de constelaciones remueve bastante (te lo avisan antes). Si dudas, quédate.',
    image: '/voz-retrato.jpg',
  },
  quotes: [
    {
      tag: 'Diagnóstico',
      text: 'Llevaba años sintiendo que algo no encajaba en mí. Con Maribella entendí que era un patrón de mi abuela, no mío.',
    },
    {
      tag: 'Proceso',
      text: 'Escéptica total al inicio. Terapia de años y sentía que faltaba algo. Esto conectó piezas que nadie más había conectado.',
    },
    {
      tag: 'Diagnóstico',
      text: 'Entendí en 2 sesiones algo que 3 años de terapia no me habían mostrado.',
    },
    {
      tag: 'Proceso',
      text: 'Después de probar de todo, esto es lo único que fue directo a la raíz. Sigo en proceso, pero ya veo el cambio.',
    },
    {
      tag: 'Honestidad',
      text: 'Gracias por ser honesta desde el principio. No prometiste magia, prometiste claridad, y eso cumplió.',
    },
    {
      tag: 'Linaje',
      text: '¿Esto es lo que hizo mi hermana? Me cambió la forma de ver a mi familia.',
    },
  ],
  videos: [
    {
      id: 'diagnostico',
      label: 'Video 1',
      title: 'Después de la sesión de diagnóstico',
      poster: '/voz-diagnostico.jpg',
      youtubeId: '',
      src: '/videos/despues-del-diagnostico.mp4',
    },
    {
      id: 'proceso',
      label: 'Video 2',
      title: 'Un proceso, en sus palabras',
      poster: '/voz-mensajes.jpg',
      youtubeId: '',
      src: '/videos/un-proceso.mp4',
    },
    {
      id: 'testimonio-3',
      label: 'Video 3',
      title: 'Otra voz, después de sentarse aquí',
      poster: '/voz-retrato.jpg',
      youtubeId: '',
      src: '/videos/testimonio-3.mp4',
    },
    {
      id: 'testimonio-4',
      label: 'Video 4',
      title: 'Lo que se entiende cuando se va a la raíz',
      poster: '/voz-decision.jpg',
      youtubeId: '',
      src: '/videos/testimonio-4.mp4',
    },
  ],
}
