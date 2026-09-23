import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { GUIDE_PDF, WHATSAPP_NUMBER } from '../data'
import '../styles/tu-terapia.css'

const SHEET_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbxZnRJaqICFl3JxY1XKupIV92--qcP0pKsrWmWN2Q5DQHykFnx3SwKep_Qkk9OBm9Q/exec'

const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
]

const PAISES = [
  { c: 'CO', d: '57', f: '🇨🇴' }, { c: 'MX', d: '52', f: '🇲🇽' }, { c: 'US', d: '1', f: '🇺🇸' },
  { c: 'ES', d: '34', f: '🇪🇸' }, { c: 'AR', d: '54', f: '🇦🇷' }, { c: 'PE', d: '51', f: '🇵🇪' },
  { c: 'CL', d: '56', f: '🇨🇱' }, { c: 'EC', d: '593', f: '🇪🇨' }, { c: 'VE', d: '58', f: '🇻🇪' },
  { c: 'GT', d: '502', f: '🇬🇹' }, { c: 'CR', d: '506', f: '🇨🇷' }, { c: 'PA', d: '507', f: '🇵🇦' },
  { c: 'BO', d: '591', f: '🇧🇴' }, { c: 'PY', d: '595', f: '🇵🇾' }, { c: 'UY', d: '598', f: '🇺🇾' },
  { c: 'HN', d: '504', f: '🇭🇳' }, { c: 'SV', d: '503', f: '🇸🇻' }, { c: 'NI', d: '505', f: '🇳🇮' },
  { c: 'DO', d: '1', f: '🇩🇴' }, { c: 'BR', d: '55', f: '🇧🇷' },
]

const QUESTIONS = [
  {
    q: '¿Qué describe mejor lo que estás sintiendo ahora?',
    step: 'Tu momento',
    options: [
      { t: 'Repito los mismos ciclos y no entiendo por qué', w: { cons: 3 } },
      { t: 'Cargo algo que siento heredado de mi familia', w: { cons: 2, akas: 1 } },
      { t: 'Vivo en automático; no sé quién soy ni mi propósito', w: { astro: 2, akas: 1 } },
      { t: 'Tengo logros, pero por dentro siento un vacío', w: { acomp: 2, akas: 1 } },
      { t: 'Mi casa u oficina se siente pesada y me afecta', w: { feng: 3 } },
    ],
  },
  {
    q: 'Cuando imaginas sanar, ¿qué te llama más?',
    step: 'Lo que buscas',
    options: [
      { t: 'Entender la raíz en mi historia familiar', w: { cons: 3 } },
      { t: 'Conocerme a través de mi carta y mis ciclos', w: { astro: 3 } },
      { t: 'Reconectar con mi alma y mi propósito', w: { akas: 2, angel: 1 } },
      { t: 'Un acompañamiento cercano y sostenido', w: { acomp: 3 } },
      { t: 'Armonizar mi espacio físico', w: { feng: 3 } },
      { t: 'Sentir protección y paz espiritual', w: { angel: 3 } },
    ],
  },
  {
    q: '¿Cómo te relacionas con lo espiritual?',
    step: 'Tu mirada',
    options: [
      { t: 'Quiero método y fundamento, sin “magia”', w: { cons: 1, acomp: 2 } },
      { t: 'Me atraen los astros y los ciclos de la vida', w: { astro: 3 } },
      { t: 'Creo en guías, ángeles o una fuerza mayor', w: { angel: 3 } },
      { t: 'Me interesa el registro del alma', w: { akas: 3 } },
      { t: 'Siento que el lugar y su energía influyen', w: { feng: 2 } },
    ],
  },
  {
    q: '¿Qué vínculo te pesa más hoy?',
    step: 'Tus vínculos',
    options: [
      { t: 'Mi familia de origen (padres, hermanos)', w: { cons: 3 } },
      { t: 'Mi pareja o mis relaciones', w: { cons: 2, acomp: 1 } },
      { t: 'La relación conmigo misma o mismo', w: { acomp: 2, astro: 1 } },
      { t: 'Mi entorno y mi hogar', w: { feng: 3 } },
      { t: 'Lo trascendente y mi fe', w: { angel: 2, akas: 1 } },
    ],
  },
  {
    q: '¿Cómo prefieres transitar tu proceso?',
    step: 'Tu ritmo',
    options: [
      { t: 'En un espacio íntimo, uno a uno', w: { acomp: 2, cons: 1 } },
      { t: 'En grupo, con personas que me entiendan', w: { taller: 3 } },
      { t: 'Con una experiencia vivencial y dinámica', w: { taller: 2, cons: 1 } },
      { t: 'A mi ritmo, con una guía puntual', w: { astro: 1, akas: 1, acomp: 1 } },
    ],
  },
  {
    q: '¿Qué te gustaría lograr primero?',
    step: 'Tu meta',
    options: [
      { t: 'Cortar un patrón que se repite', w: { cons: 3 } },
      { t: 'Encontrar sentido y dirección', w: { astro: 1, akas: 2 } },
      { t: 'Calma emocional y sostén', w: { acomp: 3 } },
      { t: 'Que mi casa y mi vida vuelvan a fluir', w: { feng: 3 } },
      { t: 'Sentirme acompañada o acompañado espiritualmente', w: { angel: 3 } },
      { t: 'Pertenecer a una comunidad', w: { taller: 3 } },
    ],
  },
]

const RESULTS = {
  cons: {
    name: 'Constelaciones Familiares',
    tag: 'Desenreda lo que se repite',
    desc: 'Miramos el sistema familiar al que perteneces para reconocer los patrones, lealtades y cargas que arrastras sin darte cuenta. Al devolver a cada quien su lugar, lo que se repetía empieza a soltarse y recuperas tu propia fuerza.',
    why: 'Tus respuestas apuntan a ciclos y cargas con raíz familiar. Este es el trabajo que va directo a esa raíz.',
    next: '/cotizador?servicio=constelaciones',
  },
  astro: {
    name: 'Astrología Terapéutica',
    tag: 'Tu carta como mapa, no como horóscopo',
    desc: 'Leemos tu carta natal como un mapa de tu forma de ser, tus ciclos y tu potencial. Es una herramienta para reconocerte, entender el momento que atraviesas y reencontrar tu dirección cuando sientes que vives en automático.',
    why: 'Buscas conocerte y encontrar sentido. La astrología terapéutica te da un lenguaje para leerte con más claridad.',
    next: '/cotizador?servicio=astrologia',
  },
  akas: {
    name: 'Registros Akáshicos',
    tag: 'Preguntas de alma y propósito',
    desc: 'Una lectura del registro de tu alma para las preguntas más profundas: por qué estás aquí, qué viniste a aprender y qué patrones traes de más atrás. Un espacio para el sentido, más allá de lo material.',
    why: 'Lo que te mueve son preguntas de propósito y trascendencia. Los registros abren justo esa puerta.',
    next: '/cotizador',
  },
  acomp: {
    name: 'Acompañamiento Terapéutico Integrativo',
    tag: 'Alguien que camina a tu lado',
    desc: 'Un proceso cercano y sostenido en el tiempo para atravesar la ansiedad, el vacío o los momentos de cambio. No una respuesta rápida, sino un acompañamiento continuo que integra distintas herramientas según lo que necesites.',
    why: 'Describes un momento que pide sostén y continuidad, no una sesión aislada. Este acompañamiento es esa base.',
    next: '/mentoria',
  },
  feng: {
    name: 'Feng Shui · Armonización de Espacios',
    tag: 'Tu entorno también sana',
    desc: 'Tu casa u oficina influyen en tu ánimo, tus relaciones y tu prosperidad más de lo que crees. Limpiamos y reordenamos la energía de tu espacio para que deje de drenarte y vuelva a acompañarte.',
    why: 'Señalaste que tu espacio pesa o te afecta. El feng shui trabaja exactamente ahí, en tu entorno.',
    next: '/cotizador?servicio=feng-shui',
  },
  angel: {
    name: 'Terapias Angelicales',
    tag: 'Sostén desde lo trascendente',
    desc: 'Un espacio de conexión, protección y paz espiritual para cuando necesitas apoyarte en algo más grande. Un acompañamiento suave para recuperar la calma y la confianza.',
    why: 'Buscas paz y sostén espiritual. Esta terapia te ofrece ese refugio y esa conexión.',
    next: '/cotizador?servicio=angelical',
  },
  taller: {
    name: 'Talleres Vivenciales',
    tag: 'Sanar en comunidad',
    desc: 'Experiencias grupales para crecer y sanar junto a otras personas que transitan procesos parecidos al tuyo. El grupo sostiene, refleja y acompaña de un modo que el camino en soledad no logra.',
    why: 'Prefieres transitar en compañía y sentir comunidad. Los talleres vivenciales son ese espacio compartido.',
    next: '/taller',
  },
}

const PRIORITY = ['cons', 'acomp', 'astro', 'feng', 'akas', 'angel', 'taller']

function postSheet(payload) {
  try {
    fetch(SHEET_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    })
  } catch {
    /* fire-and-forget */
  }
}

function notifyNetlify(payload) {
  const body = new URLSearchParams()
  body.set('form-name', 'tu-terapia')
  Object.entries(payload).forEach(([k, v]) => body.set(k, String(v ?? '')))
  return fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
    signal: AbortSignal.timeout(4000),
  }).catch(() => {})
}

function sendGuide(email) {
  return fetch('/.netlify/functions/send-guide', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  }).catch(() => {})
}

export default function TuTerapia() {
  const [screen, setScreen] = useState('intro')
  const [i, setI] = useState(0)
  const [answers, setAnswers] = useState([])
  const [leadId, setLeadId] = useState('')
  const [nombre, setNombre] = useState('')
  const [dia, setDia] = useState('')
  const [mes, setMes] = useState('')
  const [paisIdx, setPaisIdx] = useState(0)
  const [tel, setTel] = useState('')
  const [mail, setMail] = useState('')
  const [giro, setGiro] = useState('')
  const [guideStatus, setGuideStatus] = useState('idle')

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mb_quiz_lead') || 'null')
      if (saved) {
        if (saved.nombre) setNombre(saved.nombre)
        if (saved.tel) setTel(saved.tel)
        if (saved.mail) setMail(saved.mail)
      }
    } catch {
      /* ignore */
    }
  }, [])

  const digits = tel.replace(/\D/g, '')
  const okTel = digits.length >= 7
  const okMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.trim())
  const canQuiz = nombre.trim().length >= 2 && okTel && okMail && giro.trim().length >= 2
  const pais = PAISES[paisIdx]
  const telFull = `${pais.d}${digits}`
  const nacimiento = dia !== '' && mes !== '' ? `${dia} de ${MESES[Number(mes)]}` : ''

  const outcome = useMemo(() => {
    if (answers.length < QUESTIONS.length) return null
    const scores = Object.fromEntries(PRIORITY.map((k) => [k, 0]))
    answers.forEach((choiceIdx, qi) => {
      const w = QUESTIONS[qi].options[choiceIdx].w
      Object.entries(w).forEach(([k, n]) => {
        scores[k] = (scores[k] || 0) + n
      })
    })
    const ranked = PRIORITY.slice().sort((a, b) => {
      if (scores[b] !== scores[a]) return scores[b] - scores[a]
      return PRIORITY.indexOf(a) - PRIORITY.indexOf(b)
    })
    return { top: ranked[0], second: ranked[1], scores }
  }, [answers])

  function startQuiz() {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
    setLeadId(id)
    try {
      localStorage.setItem('mb_quiz_lead', JSON.stringify({ nombre: nombre.trim(), tel: digits, mail: mail.trim() }))
    } catch {
      /* ignore */
    }
    const payload = {
      leadId: id,
      fecha: new Date().toISOString(),
      nombre: nombre.trim(),
      whatsapp: `+${telFull}`,
      correo: mail.trim(),
      nacimiento,
      motivo: giro.trim(),
      estado: 'inició',
    }
    postSheet(payload)
    notifyNetlify(payload)
    setI(0)
    setAnswers([])
    setScreen('quiz')
    window.scrollTo(0, 0)
  }

  function choose(idx) {
    const next = answers.slice(0, i)
    next[i] = idx
    if (i < QUESTIONS.length - 1) {
      setAnswers(next)
      setI(i + 1)
      window.scrollTo(0, 0)
      return
    }
    setAnswers(next)
    const scores = Object.fromEntries(PRIORITY.map((k) => [k, 0]))
    next.forEach((choiceIdx, qi) => {
      Object.entries(QUESTIONS[qi].options[choiceIdx].w).forEach(([k, n]) => {
        scores[k] = (scores[k] || 0) + n
      })
    })
    const ranked = PRIORITY.slice().sort((a, b) => {
      if (scores[b] !== scores[a]) return scores[b] - scores[a]
      return PRIORITY.indexOf(a) - PRIORITY.indexOf(b)
    })
    const top = ranked[0]
    const second = ranked[1]
    const R = RESULTS[top]
    const seg = scores[second] > 0 ? RESULTS[second].name : ''
    postSheet({ leadId, terapia: R.name, segunda: seg, estado: 'completó' })
    notifyNetlify({
      nombre: nombre.trim(),
      email: mail.trim(),
      whatsapp: `+${telFull}`,
      giro: giro.trim(),
      terapia: R.name,
      segunda: seg,
    })
    setGuideStatus('sending')
    sendGuide(mail.trim()).then((res) => {
      setGuideStatus(res && res.ok ? 'sent' : 'error')
    })
    setScreen('result')
    window.scrollTo(0, 0)
  }

  const Q = QUESTIONS[i]
  const R = outcome ? RESULTS[outcome.top] : null
  const secondName = outcome && outcome.scores[outcome.second] > 0 ? RESULTS[outcome.second].name : ''

  const waHref = useMemo(() => {
    if (!R) return `https://wa.me/${WHATSAPP_NUMBER}`
    const lines = [
      `Hola Maribella, soy ${nombre.trim()}.`,
      `Hice el test ¿Qué terapia necesitas? y me orientó hacia: ${R.name}.`,
    ]
    if (giro.trim()) lines.push(`Lo que me trae: ${giro.trim()}.`)
    let dl = `Mis datos — WhatsApp: +${telFull} · Correo: ${mail.trim()}`
    if (nacimiento) dl += ` · Nacimiento: ${nacimiento}`
    lines.push(`${dl}.`)
    lines.push('Me gustaría saber más.')
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`
  }, [R, nombre, giro, telFull, mail, nacimiento])

  return (
    <div className="tu-terapia">
      {screen === 'intro' && (
        <section>
          <div className="divider">
            <span className="l" />
            <span className="d" />
            <span className="l" />
          </div>
          <h1 className="h1-intro">¿Qué terapia necesitas?</h1>
          <p className="lead">
            Tantas herramientas —constelaciones, astrología, feng shui, registros akáshicos— y no siempre es claro por dónde empezar. Responde 6 preguntas y descubre el camino que mejor acompaña tu momento.
          </p>
          <div className="giftnote">
            <span>
              De regalo: al terminar te enviamos gratis la <b>Guía para identificar patrones familiares repetitivos</b>.
            </span>
          </div>
          <button className="btn btn-wide" type="button" onClick={() => { setScreen('datos'); window.scrollTo(0, 0) }}>
            Comenzar
          </button>
          <p className="meta">Toma menos de 2 minutos · Es una orientación, no un diagnóstico</p>
        </section>
      )}

      {screen === 'datos' && (
        <section>
          <div className="progress-head">
            <span className="step">Paso 1 de 2 · Tus datos</span>
            <span className="count">Casi empezamos</span>
          </div>
          <div className="bar"><span style={{ width: '20%' }} /></div>
          <h2 className="q">Antes de empezar, cuéntame de ti</h2>
          <p className="lead lead-left">
            Con esto te envío tu resultado y tu guía de regalo, y Maribella puede acompañarte en el siguiente paso.
          </p>
          <label className="f first" htmlFor="dNombre">
            ¿Cómo te gusta que te llamen? <span className="req">*</span>
          </label>
          <input className="inp" id="dNombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" autoComplete="name" />

          <label className="f">
            ¿Cuándo naciste? <small style={{ fontWeight: 400, color: 'var(--muted)' }}>(opcional)</small>
          </label>
          <div className="bday">
            <select className="sel" aria-label="Día de nacimiento" value={dia} onChange={(e) => setDia(e.target.value)}>
              <option value="">Día</option>
              {Array.from({ length: 31 }, (_, n) => (
                <option key={n + 1} value={n + 1}>{n + 1}</option>
              ))}
            </select>
            <select className="sel" aria-label="Mes de nacimiento" value={mes} onChange={(e) => setMes(e.target.value)}>
              <option value="">Mes</option>
              {MESES.map((x, idx) => (
                <option key={x} value={idx}>{x.charAt(0).toUpperCase() + x.slice(1)}</option>
              ))}
            </select>
          </div>
          <p className="hint">Tu fecha ayuda a Maribella a leer tu energía (astrología).</p>

          <label className="f" htmlFor="dTel">
            WhatsApp <span className="req">*</span>
          </label>
          <div className="phone">
            <select className="sel" aria-label="Código de país" value={paisIdx} onChange={(e) => setPaisIdx(Number(e.target.value))}>
              {PAISES.map((x, idx) => (
                <option key={x.c + x.d} value={idx}>{x.f} +{x.d}</option>
              ))}
            </select>
            <input className="inp" id="dTel" type="tel" inputMode="numeric" value={tel} onChange={(e) => setTel(e.target.value)} placeholder="Tu número" autoComplete="tel" />
          </div>
          <p className="hint">Por aquí Maribella te envía tu orientación y responde tus dudas.</p>
          {digits.length > 0 && !okTel ? <p className="err">Escribe un número de WhatsApp válido.</p> : null}

          <label className="f" htmlFor="dMail">
            Correo <span className="req">*</span>
          </label>
          <input className="inp" id="dMail" type="email" value={mail} onChange={(e) => setMail(e.target.value)} placeholder="tucorreo@ejemplo.com" autoComplete="email" />
          <p className="hint">Aquí te llega tu guía de regalo.</p>
          {mail.length > 0 && !okMail ? <p className="err">Ese correo no parece válido.</p> : null}

          <label className="f" htmlFor="dGiro">
            ¿Qué te trae aquí hoy? <span className="req">*</span>
          </label>
          <input className="inp" id="dGiro" value={giro} onChange={(e) => setGiro(e.target.value)} placeholder="Ej: siento que repito lo mismo en mis relaciones…" />
          <p className="hint">En una frase. No hay respuestas correctas ni incorrectas.</p>

          <button className="btn btn-wide" type="button" disabled={!canQuiz} onClick={startQuiz}>
            Ir al test →
          </button>
          <button className="back" type="button" onClick={() => setScreen('intro')}>← Volver</button>
          <p className="disclaimer">Tus datos se comparten solo con Maribella para acompañarte. Nada se publica.</p>
        </section>
      )}

      {screen === 'quiz' && (
        <section>
          <div className="progress-head">
            <span className="step">Paso 2 · {Q.step}</span>
            <span className="count">Pregunta {i + 1} de {QUESTIONS.length}</span>
          </div>
          <div className="bar"><span style={{ width: `${20 + (i / QUESTIONS.length) * 80}%` }} /></div>
          <h2 className="q">{Q.q}</h2>
          <div className="opts">
            {Q.options.map((opt, idx) => (
              <button key={opt.t} className="opt" type="button" onClick={() => choose(idx)}>
                <span className="dot" />
                <span>{opt.t}</span>
              </button>
            ))}
          </div>
          <button
            className="back"
            type="button"
            onClick={() => {
              if (i > 0) setI(i - 1)
              else setScreen('datos')
            }}
          >
            ← Anterior
          </button>
        </section>
      )}

      {screen === 'result' && R && (
        <section>
          <p className="res-eyebrow">Tu camino sugerido</p>
          {nombre.trim() ? <p className="res-hi">Para ti, {nombre.trim()}:</p> : null}
          <div className="result-card">
            <h2 className="rname">{R.name}</h2>
            <p className="rtag">{R.tag}</p>
            <div className="rgold" />
            <p className="rdesc">{R.desc}</p>
            <div className="rwhy"><b>Por qué esta recomendación:</b> {R.why}</div>
          </div>
          {secondName ? (
            <p className="secondary">
              También podría acompañarte muy bien: <b>{secondName}</b>.
            </p>
          ) : null}

          <div className="gift">
            <div className="gk">Tu regalo de bienvenida</div>
            <div className="gt">Guía de patrones familiares repetitivos</div>
            <p className="gd">
              {guideStatus === 'sent'
                ? 'Ya te la enviamos al correo que dejaste. Revisa también la carpeta de spam.'
                : guideStatus === 'sending'
                  ? 'Estamos enviando la guía a tu correo…'
                  : 'Un primer paso para reconocer eso que se repite en tu historia. Si no llega el correo, ábrela aquí.'}
            </p>
            <a className="dl" href={GUIDE_PDF}>
              Abrir la guía
            </a>
          </div>

          <div className="cta">
            <a className="wa" href={waHref} target="_blank" rel="noreferrer">Escríbele a Maribella</a>
            <Link className="alt" to={R.next}>Cotiza tu proceso</Link>
            <Link className="web" to="/">Explorar el sitio →</Link>
          </div>
          <p className="disclaimer">
            Este test es una guía de autoconocimiento inspirada en las terapias holísticas de Maribella. No sustituye un diagnóstico ni un tratamiento clínico.
          </p>
          <button
            className="restart"
            type="button"
            onClick={() => {
              setScreen('intro')
              setI(0)
              setAnswers([])
              setLeadId('')
              setGuideStatus('idle')
            }}
          >
            Volver a empezar
          </button>
        </section>
      )}
    </div>
  )
}
