import { EMAIL } from '../data'

const lessons = [
  { n: '01', t: '¿Por qué se repite lo mismo en tu linaje?', d: 'Micro-lección sobre lealtades invisibles y el “no tengo derecho a estar mejor que…”.' },
  { n: '02', t: 'La casa también guarda el patrón', d: 'Cómo el desorden del Chi refleja un desorden sistémico, sin magia barata.' },
  { n: '03', t: 'Tu carta no te condena', d: 'Astrología terapéutica: ciclos, no fatalismo. Leer el momento, no el miedo.' },
]

export default function Recursos() {
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
          <p className="mt-4 text-beige/75">PDF de 12 páginas. Carta de presentación de Maribella: pedagógica, ética, aplicable a pareja, deudas emocionales y autoestima.</p>
        </div>
        <form
          className="flex flex-col justify-center gap-3"
          onSubmit={(e) => {
            e.preventDefault()
            const email = e.currentTarget.email.value
            window.location.href = `mailto:${EMAIL}?subject=Quiero la guía de patrones&body=Hola Maribella, mi correo es ${email}. Deseo la guía gratuita.`
          }}
        >
          <input
            name="email"
            type="email"
            required
            placeholder="Tu correo"
            className="border-b border-beige/30 bg-transparent py-3 outline-none placeholder:text-beige/40"
          />
          <button className="btn-primary" type="submit">
            Recibir la guía
          </button>
        </form>
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
          <p className="mt-3 text-beige/70">eBook · 27 USD</p>
        </div>
        <div className="card p-8">
          <p className="eyebrow">Mini-curso</p>
          <h3 className="mt-2 font-serif text-3xl">Astrología básica para comprender tus bloqueos inconscientes</h3>
          <p className="mt-3 text-beige/70">4 módulos grabados · 67 USD</p>
        </div>
      </section>
    </div>
  )
}
