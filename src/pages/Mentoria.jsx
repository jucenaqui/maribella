import Price from '../components/Price.jsx'
import { useRegion } from '../context/RegionContext'
import { pricedServices, WHATSAPP } from '../data'

export default function Mentoria() {
  const { label } = useRegion()
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
        <h2 className="font-serif text-3xl">Anclaje de inversión · {label}</h2>
        <p className="mt-2 max-w-xl text-beige/70">
          Sesiones individuales según zona. El proceso de mentoría de 4 u 8 semanas se cotiza por WhatsApp.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {pricedServices.map((s, i) => (
            <article key={s.slug} className={`card p-6 ${i === 0 ? 'ring-1 ring-fuchsia' : ''}`}>
              <p className="eyebrow">{s.category}</p>
              <p className="mt-3 font-serif text-3xl leading-tight">{s.title}</p>
              <p className="mt-3 font-serif text-3xl text-fuchsia">
                <Price value={s.price} />
              </p>
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
