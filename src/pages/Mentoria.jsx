import { WHATSAPP } from '../data'

const levels = [
  { name: 'Básico', price: '85 USD', d: 'Carta natal terapéutica o Feng Shui personal · 60 min' },
  { name: 'Intermedio', price: '180 USD', d: 'Constelación individual: 2 sesiones profundas + integración por WhatsApp' },
  { name: 'Premium', price: '390 USD', d: "Mentoría «De la Herida a la Paz» · 4 semanas, 4 sesiones + ejercicios diarios" },
  { name: 'VIP', price: '750 USD', d: '8 semanas: mapa astrológico, constelación familiar y armonización de espacios' },
]

export default function Mentoria() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="eyebrow">✦ Producto flagship</p>
      <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-tight md:text-6xl">
        De la herida <span className="italic text-fuchsia">a la paz</span>
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-beige/80">
        Cambia tu vida desde la raíz. Programa de acompañamiento sistémico con sesiones en vivo, mapa personalizado y contención ética. Haz de la reconciliación un camino, no un evento.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-4">
        {['4–8 semanas', 'Sesiones 1:1', 'WhatsApp de integración', 'A tu ritmo'].map((x) => (
          <div key={x} className="card px-4 py-5 text-center text-sm tracking-wide">
            {x}
          </div>
        ))}
      </div>

      <section className="mt-16 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl">Una mentoría completa, no una sesión suelta</h2>
          <ul className="mt-6 space-y-3 text-beige/80">
            <li>Diagnóstico multidimensional: qué herramienta pide tu sistema ahora</li>
            <li>Trabajo con linaje, culpa heredada y autosabotaje</li>
            <li>Astrología del alma para leer ciclos, no para predecir miedo</li>
            <li>Pautas de asimilación post-constelación</li>
            <li>Posible armonización del espacio cuando el bloqueo vive también en la casa</li>
          </ul>
        </div>
        <div className="card p-8">
          <p className="eyebrow">Para quién</p>
          <ul className="mt-4 space-y-4 text-sm leading-relaxed">
            <li><strong className="text-fuchsia">Perfil 1</strong> · Personas en inflexión que ya probaron lo convencional</li>
            <li><strong className="text-fuchsia">Perfil 2</strong> · Quienes sienten lealtad invisible al dolor familiar</li>
            <li><strong className="text-fuchsia">Perfil 3</strong> · Consultantes que buscan ética, no espectáculo esotérico</li>
            <li><strong className="text-fuchsia">Perfil 4</strong> · Quienes desean paz cotidiana, no solo un insight</li>
          </ul>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-3xl">Anclaje de inversión</h2>
        <p className="mt-2 max-w-xl text-beige/70">
          Las tarifas reflejan el valor de desatar un nudo de décadas, no los minutos del reloj. Se presenta primero el proceso integral.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {levels.map((l, i) => (
            <article key={l.name} className={`card p-6 ${i === 3 ? 'ring-1 ring-fuchsia' : ''}`}>
              <p className="eyebrow">{l.name}</p>
              <p className="mt-3 font-serif text-4xl">{l.price}</p>
              <p className="mt-3 text-sm text-beige/75">{l.d}</p>
            </article>
          ))}
        </div>
        <a className="btn-primary mt-10" href={WHATSAPP} target="_blank" rel="noreferrer">
          Solicitar entrevista de ingreso
        </a>
      </section>
    </div>
  )
}
