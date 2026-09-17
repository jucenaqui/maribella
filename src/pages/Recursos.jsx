import { useState } from 'react'
import { EMAIL, GUIDE_PDF } from '../data'

const lessons = [
  { n: '01', t: '¿Por qué se repite lo mismo en tu linaje?', d: 'Micro-lección sobre lealtades invisibles y el “no tengo derecho a estar mejor que…”.' },
  { n: '02', t: 'La casa también guarda el patrón', d: 'Cómo el desorden del Chi refleja un desorden sistémico, sin magia barata.' },
  { n: '03', t: 'Tu carta no te condena', d: 'Astrología terapéutica: ciclos, no fatalismo. Leer el momento, no el miedo.' },
]

function downloadGuide() {
  const link = document.createElement('a')
  link.href = GUIDE_PDF
  link.download = 'Guia-patrones-familiares-Maribella.pdf'
  link.rel = 'noopener'
  document.body.appendChild(link)
  link.click()
  link.remove()
}

async function notifyLead(email) {
  const body = new URLSearchParams()
  body.set('form-name', 'guia')
  body.set('email', email)
  await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
    signal: AbortSignal.timeout(4000),
  })
}

export default function Recursos() {
  const [status, setStatus] = useState('idle')

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="eyebrow">Sabiduría ordenada</p>
      <h1 className="mt-4 font-serif text-5xl leading-tight">
        Micro-lecciones para <span className="italic text-fuchsia">comprender el origen</span>
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-beige/80">
        Valor contundente, sin exponer de más. Guías claras para quien busca transformación real: el porqué y el cómo, en dosis que se pueden asimilar.
      </p>

      <section className="card mt-12 grid gap-8 p-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="eyebrow">Lead magnet</p>
          <h2 className="mt-2 font-serif text-4xl">Guía práctica para identificar patrones familiares repetitivos</h2>
          <p className="mt-4 text-beige/75">PDF de presentación de Maribella: pedagógica, ética, aplicable a pareja, deudas emocionales y autoestima.</p>
        </div>
        {status === 'sent' ? (
          <p className="flex items-center font-serif text-2xl text-beige">
            La guía se está descargando. Revisa tu carpeta de descargas.
          </p>
        ) : (
          <form
            className="flex flex-col justify-center gap-3"
            name="guia"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={(e) => {
              e.preventDefault()
              const email = e.currentTarget.email.value.trim()
              setStatus('sending')
              downloadGuide()
              notifyLead(email).catch(() => {})
              setStatus('sent')
            }}
          >
            <input type="hidden" name="form-name" value="guia" />
            <p className="hidden" aria-hidden="true">
              <label>
                No completar
                <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>
            <input
              name="email"
              type="email"
              required
              placeholder="Tu correo"
              className="border-b border-beige/30 bg-transparent py-3 outline-none placeholder:text-beige/40"
            />
            <button className="btn-primary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Enviando…' : 'Recibir la guía'}
            </button>
            <p className="text-xs text-beige/50">
              El PDF se descarga al instante. El correo se registra para enviarte novedades a {EMAIL}.
            </p>
          </form>
        )}
      </section>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {lessons.map((l) => (
          <article key={l.n} className="card p-6">
            <p className="text-xs tracking-[0.2em] text-fuchsia">Lección {l.n}</p>
            <h3 className="mt-3 font-serif text-2xl">{l.t}</h3>
            <p className="mt-2 text-sm text-beige/70">{l.d}</p>
          </article>
        ))}
      </div>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="card p-8">
          <p className="eyebrow">Cuaderno</p>
          <h3 className="mt-2 font-serif text-3xl">Manual de auto-perdón y reordenamiento emocional</h3>
          <p className="mt-3 text-beige/70">eBook · inversión a convenir</p>
        </div>
        <div className="card p-8">
          <p className="eyebrow">Mini-curso</p>
          <h3 className="mt-2 font-serif text-3xl">Astrología básica para comprender tus bloqueos inconscientes</h3>
          <p className="mt-3 text-beige/70">4 módulos grabados · inversión a convenir</p>
        </div>
      </section>
    </div>
  )
}
