import { WHATSAPP } from '../data'

export default function Sobre() {
  return (
    <div className="page-pad">
      <p className="eyebrow">Maribella · 2026</p>
      <h1 className="display mt-3 max-w-3xl text-purple">
        La sanación en <span className="italic text-fuchsia">todas tus dimensiones</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-purple/80">
        Acompaño a personas en búsqueda de sentido y paz interior a descifrar los bloqueos emocionales y genealógicos que frenan su bienestar, integrando astrología reflexiva, constelaciones familiares y terapias energéticas en un método claro, ético y personalizado.
      </p>

      <section className="mt-16 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl text-purple">Una mirada estructurada a lo sutil</h2>
          <p className="mt-4 leading-relaxed text-purple/80">
            Como observadora e investigadora, aporto rigor analítico a la astrología, las constelaciones y el feng shui: desmitificar lo esotérico para volverlo aplicable. Mi voz es serena, fundamentada y reflexiva. Genero confianza en quien busca transformación real, sin superficialidades ni urgencia digital.
          </p>
          <p className="mt-4 leading-relaxed text-purple/80">
            Explico el porqué y el cómo de cada terapia con analogías cotidianas. Valido tu proceso emocional con honestidad y respeto absoluto a tus tiempos de asimilación.
          </p>
        </div>
        <ul className="space-y-4">
          {[
            ['Arquetipos', 'El Sabio + El Sanador / Cuidador'],
            ['Categoría', 'Mentoría holística sistémica para el auto-perdón y la reconciliación vital'],
            ['Promesa', 'Compréndete, perdónate y reconcíliate con tu destino'],
            ['Ética', 'Espacio seguro: sin recetas genéricas ni promesas instantáneas'],
          ].map(([k, v]) => (
            <li key={k} className="card p-5">
              <p className="eyebrow">{k}</p>
              <p className="mt-2 font-serif text-xl text-purple">{v}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-3xl text-purple">Cómo trabajo</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {[
            { t: 'Diagnóstico multidimensional', d: 'La terapia exacta que el alma y el momento vital requieren, no un paquete cerrado.' },
            { t: 'Espiritualidad aterrizada', d: 'Une profundidad con aplicación práctica: pareja, deudas emocionales, autoestima, casa.' },
            { t: 'Contención ética', d: 'Perdón consciente y respeto incondicional por la historia de cada consultante.' },
          ].map((x) => (
            <div key={x.t} className="card p-6">
              <h3 className="font-serif text-2xl">{x.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-purple/75">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16 text-center">
        <a className="btn-primary" href={WHATSAPP} target="_blank" rel="noreferrer">
          Conversemos por WhatsApp
        </a>
      </div>
    </div>
  )
}
