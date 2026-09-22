import { Link } from 'react-router-dom'
import Price from '../components/Price.jsx'
import { useRegion } from '../context/RegionContext'
import { services } from '../data'

export default function Servicios() {
  const { label } = useRegion()
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="eyebrow">Portafolio</p>
      <h1 className="mt-3 font-serif text-4xl sm:text-5xl text-purple">Caminos para tu transformación</h1>
      <p className="mt-4 max-w-2xl text-lg text-purple/75">
        Espacio holístico multidisciplinario: sanación emocional, autoconocimiento y despertar de conciencia con herramientas energéticas y ancestrales.
      </p>
      <p className="mt-6 text-sm tracking-widest text-fuchsia">{services.length} servicios</p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map((s) => (
          <article key={s.slug} id={s.slug} className="card min-w-0 p-5 sm:p-8">
            <p className="eyebrow">{s.category}</p>
            <h2 className="mt-3 font-serif text-3xl text-purple">{s.title}</h2>
            {s.price ? (
              <p className="mt-3 font-serif text-2xl text-fuchsia">
                <Price value={s.price} />
                <span className="ml-2 text-xs font-sans uppercase tracking-[0.16em] text-purple/50">{label}</span>
              </p>
            ) : null}
            <p className="mt-3 leading-relaxed text-purple/80">{s.detail}</p>
            <Link className="mt-6 inline-block text-xs uppercase tracking-[0.16em] text-fuchsia" to={`/cotizador?servicio=${s.slug}`}>
              Cotizar este camino →
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-16 grid gap-6 border-t border-purple/10 pt-12 md:grid-cols-2">
        <div className="card p-8">
          <p className="eyebrow">Taller insignia</p>
          <h3 className="mt-2 font-serif text-3xl">El Camino del Perdón Sistémico</h3>
          <p className="mt-3 text-purple/75">Encuentro íntimo de 4 horas, máximo 15 personas. También: Sanar el Linaje, 12 plazas.</p>
          <Link className="btn-primary mt-6" to="/taller">
            Ver taller
          </Link>
        </div>
        <div className="card p-8">
          <p className="eyebrow">Proceso profundo</p>
          <h3 className="mt-2 font-serif text-3xl">Mentoría De la Herida a la Paz</h3>
          <p className="mt-3 text-purple/75">4 u 8 semanas. Mapa astrológico, constelación y armonización según lo que tu sistema pida.</p>
          <Link className="btn-ghost mt-6" to="/mentoria">
            Ver mentoría
          </Link>
        </div>
      </div>
    </div>
  )
}
