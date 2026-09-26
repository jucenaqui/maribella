export const QUIZ_WEIGHTS = [
  {
    stepEs: 'Tu momento',
    stepEn: 'Your moment',
    qEs: '¿Qué describe mejor lo que estás sintiendo ahora?',
    qEn: 'What best describes what you are feeling now?',
    options: [
      { es: 'Repito los mismos ciclos y no entiendo por qué', en: 'I repeat the same cycles and do not understand why', w: { cons: 3 } },
      { es: 'Cargo algo que siento heredado de mi familia', en: 'I carry something I feel I inherited from my family', w: { cons: 2, akas: 1 } },
      { es: 'Vivo en automático; no sé quién soy ni mi propósito', en: 'I live on autopilot; I do not know who I am or my purpose', w: { astro: 2, akas: 1 } },
      { es: 'Tengo logros, pero por dentro siento un vacío', en: 'I have achievements, but inside I feel empty', w: { acomp: 2, akas: 1 } },
      { es: 'Mi casa u oficina se siente pesada y me afecta', en: 'My home or office feels heavy and it affects me', w: { feng: 3 } },
    ],
  },
  {
    stepEs: 'Lo que buscas',
    stepEn: 'What you seek',
    qEs: 'Cuando imaginas sanar, ¿qué te llama más?',
    qEn: 'When you imagine healing, what calls you most?',
    options: [
      { es: 'Entender la raíz en mi historia familiar', en: 'Understanding the root in my family history', w: { cons: 3 } },
      { es: 'Conocerme a través de mi carta y mis ciclos', en: 'Knowing myself through my chart and cycles', w: { astro: 3 } },
      { es: 'Reconectar con mi alma y mi propósito', en: 'Reconnecting with my soul and purpose', w: { akas: 2, angel: 1 } },
      { es: 'Un acompañamiento cercano y sostenido', en: 'Close, sustained accompaniment', w: { acomp: 3 } },
      { es: 'Armonizar mi espacio físico', en: 'Harmonizing my physical space', w: { feng: 3 } },
      { es: 'Sentir protección y paz espiritual', en: 'Feeling spiritual protection and peace', w: { angel: 3 } },
    ],
  },
  {
    stepEs: 'Tu mirada',
    stepEn: 'Your gaze',
    qEs: '¿Cómo te relacionas con lo espiritual?',
    qEn: 'How do you relate to the spiritual?',
    options: [
      { es: 'Quiero método y fundamento, sin “magia”', en: 'I want method and ground, without “magic”', w: { cons: 1, acomp: 2 } },
      { es: 'Me atraen los astros y los ciclos de la vida', en: 'I am drawn to the stars and life cycles', w: { astro: 3 } },
      { es: 'Creo en guías, ángeles o una fuerza mayor', en: 'I believe in guides, angels or a greater force', w: { angel: 3 } },
      { es: 'Me interesa el registro del alma', en: 'I am interested in the record of the soul', w: { akas: 3 } },
      { es: 'Siento que el lugar y su energía influyen', en: 'I feel that place and its energy have influence', w: { feng: 2 } },
    ],
  },
  {
    stepEs: 'Tus vínculos',
    stepEn: 'Your bonds',
    qEs: '¿Qué vínculo te pesa más hoy?',
    qEn: 'Which bond weighs most on you today?',
    options: [
      { es: 'Mi familia de origen (padres, hermanos)', en: 'My family of origin (parents, siblings)', w: { cons: 3 } },
      { es: 'Mi pareja o mis relaciones', en: 'My partner or my relationships', w: { cons: 2, acomp: 1 } },
      { es: 'La relación conmigo misma o mismo', en: 'The relationship with myself', w: { acomp: 2, astro: 1 } },
      { es: 'Mi entorno y mi hogar', en: 'My environment and my home', w: { feng: 3 } },
      { es: 'Lo trascendente y mi fe', en: 'The transcendent and my faith', w: { angel: 2, akas: 1 } },
    ],
  },
  {
    stepEs: 'Tu ritmo',
    stepEn: 'Your pace',
    qEs: '¿Cómo prefieres transitar tu proceso?',
    qEn: 'How do you prefer to walk your process?',
    options: [
      { es: 'En un espacio íntimo, uno a uno', en: 'In an intimate, one-to-one space', w: { acomp: 2, cons: 1 } },
      { es: 'En grupo, con personas que me entiendan', en: 'In a group, with people who understand me', w: { taller: 3 } },
      { es: 'Con una experiencia vivencial y dinámica', en: 'With a lived, dynamic experience', w: { taller: 2, cons: 1 } },
      { es: 'A mi ritmo, con una guía puntual', en: 'At my own pace, with timely guidance', w: { astro: 1, akas: 1, acomp: 1 } },
    ],
  },
  {
    stepEs: 'Tu meta',
    stepEn: 'Your aim',
    qEs: '¿Qué te gustaría lograr primero?',
    qEn: 'What would you like to achieve first?',
    options: [
      { es: 'Cortar un patrón que se repite', en: 'Cut a pattern that repeats', w: { cons: 3 } },
      { es: 'Encontrar sentido y dirección', en: 'Find meaning and direction', w: { astro: 1, akas: 2 } },
      { es: 'Calma emocional y sostén', en: 'Emotional calm and holding', w: { acomp: 3 } },
      { es: 'Que mi casa y mi vida vuelvan a fluir', en: 'That my home and my life flow again', w: { feng: 3 } },
      { es: 'Sentirme acompañada o acompañado espiritualmente', en: 'Feel spiritually accompanied', w: { angel: 3 } },
      { es: 'Pertenecer a una comunidad', en: 'Belong to a community', w: { taller: 3 } },
    ],
  },
]

export const QUIZ_RESULTS = {
  cons: {
    next: 'https://wa.me/573127442664',
    es: { name: 'Constelaciones Familiares', tag: 'Desenreda lo que se repite', desc: 'Miramos el sistema familiar al que perteneces para reconocer los patrones, lealtades y cargas que arrastras sin darte cuenta. Al devolver a cada quien su lugar, lo que se repetía empieza a soltarse y recuperas tu propia fuerza.', why: 'Tus respuestas apuntan a ciclos y cargas con raíz familiar. Este es el trabajo que va directo a esa raíz.' },
    en: { name: 'Family Constellations', tag: 'Untangle what repeats', desc: 'We look at the family system you belong to, to recognize patterns, loyalties and loads you carry without noticing. By giving each person their place, what was repeating begins to release and you recover your own strength.', why: 'Your answers point to cycles and loads with a family root. This is the work that goes straight there.' },
  },
  astro: {
    next: 'https://wa.me/573127442664',
    es: { name: 'Astrología Terapéutica', tag: 'Tu carta como mapa, no como horóscopo', desc: 'Leemos tu carta natal como un mapa de tu forma de ser, tus ciclos y tu potencial. Es una herramienta para reconocerte, entender el momento que atraviesas y reencontrar tu dirección cuando sientes que vives en automático.', why: 'Buscas conocerte y encontrar sentido. La astrología terapéutica te da un lenguaje para leerte con más claridad.' },
    en: { name: 'Therapeutic Astrology', tag: 'Your chart as a map, not a horoscope', desc: 'We read your natal chart as a map of how you are, your cycles and your potential. It is a tool to recognize yourself, understand this moment and find direction again when you feel you live on autopilot.', why: 'You want to know yourself and find meaning. Therapeutic astrology gives you a language to read yourself more clearly.' },
  },
  akas: {
    next: 'https://wa.me/573127442664',
    es: { name: 'Registros Akáshicos', tag: 'Preguntas de alma y propósito', desc: 'Una lectura del registro de tu alma para las preguntas más profundas: por qué estás aquí, qué viniste a aprender y qué patrones traes de más atrás. Un espacio para el sentido, más allá de lo material.', why: 'Lo que te mueve son preguntas de propósito y trascendencia. Los registros abren justo esa puerta.' },
    en: { name: 'Akashic Records', tag: 'Soul and purpose questions', desc: 'A reading of your soul’s record for the deeper questions: why you are here, what you came to learn and which patterns you bring from further back. A space for meaning, beyond the material.', why: 'What moves you are questions of purpose and transcendence. The records open exactly that door.' },
  },
  acomp: {
    next: '/mentoria',
    es: { name: 'Acompañamiento Terapéutico Integrativo', tag: 'Alguien que camina a tu lado', desc: 'Un proceso cercano y sostenido en el tiempo para atravesar la ansiedad, el vacío o los momentos de cambio. No una respuesta rápida, sino un acompañamiento continuo que integra distintas herramientas según lo que necesites.', why: 'Describes un momento que pide sostén y continuidad, no una sesión aislada. Este acompañamiento es esa base.' },
    en: { name: 'Integrative Therapeutic Accompaniment', tag: 'Someone who walks beside you', desc: 'A close process sustained over time to move through anxiety, emptiness or change. Not a quick answer, but ongoing accompaniment that weaves tools as you need them.', why: 'You describe a moment that asks for holding and continuity, not an isolated session. This accompaniment is that base.' },
  },
  feng: {
    next: 'https://wa.me/573127442664',
    es: { name: 'Feng Shui · Armonización de Espacios', tag: 'Tu entorno también sana', desc: 'Tu casa u oficina influyen en tu ánimo, tus relaciones y tu prosperidad más de lo que crees. Limpiamos y reordenamos la energía de tu espacio para que deje de drenarte y vuelva a acompañarte.', why: 'Señalaste que tu espacio pesa o te afecta. El feng shui trabaja exactamente ahí, en tu entorno.' },
    en: { name: 'Feng Shui · Space Harmonization', tag: 'Your environment heals too', desc: 'Your home or office influence mood, relationships and prosperity more than you think. We clean and reorder the energy of your space so it stops draining you and begins to support you again.', why: 'You pointed to space that feels heavy or affecting. Feng shui works exactly there, in your environment.' },
  },
  angel: {
    next: 'https://wa.me/573127442664',
    es: { name: 'Terapias Angelicales', tag: 'Sostén desde lo trascendente', desc: 'Un espacio de conexión, protección y paz espiritual para cuando necesitas apoyarte en algo más grande. Un acompañamiento suave para recuperar la calma y la confianza.', why: 'Buscas paz y sostén espiritual. Esta terapia te ofrece ese refugio y esa conexión.' },
    en: { name: 'Angel Therapies', tag: 'Holding from the transcendent', desc: 'A space of connection, protection and spiritual peace when you need to lean on something larger. Gentle accompaniment to recover calm and trust.', why: 'You seek peace and spiritual holding. This therapy offers that refuge and that connection.' },
  },
  taller: {
    next: '/taller',
    es: { name: 'Talleres Vivenciales', tag: 'Sanar en comunidad', desc: 'Experiencias grupales para crecer y sanar junto a otras personas que transitan procesos parecidos al tuyo. El grupo sostiene, refleja y acompaña de un modo que el camino en soledad no logra.', why: 'Prefieres transitar en compañía y sentir comunidad. Los talleres vivenciales son ese espacio compartido.' },
    en: { name: 'Experiential Workshops', tag: 'Heal in community', desc: 'Group experiences to grow and heal with others walking processes like yours. The group holds, mirrors and accompanies in a way the solitary path cannot.', why: 'You prefer to walk with company and feel community. Experiential workshops are that shared space.' },
  },
}

export const QUIZ_GIFTS = {
  cons: {
    file: '/guia-patrones-familiares-maribella.pdf',
    es: { title: 'Guía: Patrones familiares repetitivos', desc: 'Para reconocer eso que se repite en tu historia y empezar a soltarlo.' },
    en: { title: 'Guide: Repeating family patterns', desc: 'To recognize what repeats in your story and begin to let it go.' },
  },
  feng: {
    file: '/guia-feng-shui-maribella.pdf',
    es: { title: 'Guía de Feng Shui: limpia tu casa en un fin de semana', desc: 'Un método simple para despejar tu espacio y devolverle el flujo.' },
    en: { title: 'Feng Shui guide: clear your home in a weekend', desc: 'A simple method to clear your space and bring the flow back.' },
  },
  astro: {
    file: '/guia-astrologia-maribella.pdf',
    es: { title: 'Guía: Tus 3 llaves — Sol, Luna y Ascendente', desc: 'Descubre las tres piezas que mejor explican quién eres.' },
    en: { title: 'Guide: Your 3 keys — Sun, Moon and Ascendant', desc: 'Discover the three pieces that best explain who you are.' },
  },
  acomp: {
    file: '/guia-acompanamiento-maribella.pdf',
    es: { title: 'Guía: 5 anclas para los días de ansiedad o vacío', desc: 'Prácticas sencillas para volver a ti cuando todo pesa.' },
    en: { title: 'Guide: 5 anchors for days of anxiety or emptiness', desc: 'Simple practices to come back to yourself when everything feels heavy.' },
  },
  akas: {
    file: '/guia-akashicos-maribella.pdf',
    es: { title: 'Guía: Preguntas para tu alma', desc: 'Cómo prepararte para una lectura akáshica y qué preguntar.' },
    en: { title: 'Guide: Questions for your soul', desc: 'How to prepare for an akashic reading and what to ask.' },
  },
  angel: {
    file: '/guia-angelicales-maribella.pdf',
    es: { title: 'Ritual de calma y protección', desc: 'Una práctica breve para serenar el corazón y sentirte acompañada.' },
    en: { title: 'Ritual of calm and protection', desc: 'A short practice to soothe the heart and feel accompanied.' },
  },
  taller: {
    file: '/guia-talleres-maribella.pdf',
    es: { title: 'Guía: Sanar en compañía', desc: 'Cómo saber si es tu momento de un proceso grupal y qué esperar.' },
    en: { title: 'Guide: Healing in company', desc: 'How to know if it is your moment for a group process and what to expect.' },
  },
}

const GIFT_FALLBACK = QUIZ_GIFTS.cons

export function quizQuestions(lang) {
  const en = lang === 'en'
  return QUIZ_WEIGHTS.map((q) => ({
    step: en ? q.stepEn : q.stepEs,
    q: en ? q.qEn : q.qEs,
    options: q.options.map((opt) => ({ t: en ? opt.en : opt.es, w: opt.w })),
  }))
}

export function quizResult(key, lang) {
  const item = QUIZ_RESULTS[key]
  const copy = lang === 'en' ? item.en : item.es
  return { ...copy, next: item.next }
}

export function quizGift(key, lang) {
  const item = QUIZ_GIFTS[key] || GIFT_FALLBACK
  const copy = lang === 'en' ? item.en : item.es
  return { ...copy, file: item.file }
}
