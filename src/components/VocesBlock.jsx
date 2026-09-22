import { Link } from 'react-router-dom'
import { voces, WHATSAPP } from '../data'
import VideoCard from './VideoCard.jsx'

export default function VocesBlock({ compact = false }) {
  const quotes = compact ? voces.quotes.slice(0, 3) : voces.quotes
  const Heading = compact ? 'h2' : 'h1'

  return (
    <section className="mx-auto max-w-6xl px-5 py-16" id="voces">
      <p className="eyebrow">{voces.eyebrow}</p>
      <Heading className="mt-2 font-serif text-4xl text-purple md:text-5xl">{voces.title}</Heading>
      <p className="mt-4 max-w-2xl text-purple/75">{voces.lead}</p>

      <article className="mt-10 grid overflow-hidden rounded-sm shadow-soft lg:grid-cols-2 lg:items-start">
        <div className="bg-[#e8dcc8]">
          <img
            src={voces.featured.image}
            alt="Mensaje de una consultante después de 6 meses de proceso"
            className="block h-auto w-full"
          />
        </div>
        <div className="card rounded-none p-8 lg:p-10">
          <p className="eyebrow">{voces.featured.name}</p>
          <h3 className="mt-3 font-serif text-3xl text-purple">No era ella. Era el linaje.</h3>
          <p className="mt-4 leading-relaxed text-purple/80">
            El recuadro de la izquierda es su mensaje, tal como lo escribió. Lo transcribimos aquí para que se pueda leer y para no tratarlo como una reseña anónima de un producto.
          </p>
          <p className="mt-6 text-sm leading-relaxed text-purple/70">{voces.featured.note}</p>
        </div>
      </article>

      <div className="mt-10 grid justify-items-center gap-6 lg:grid-cols-2">
        {voces.videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quotes.map((q) => (
          <blockquote key={q.text} className="card p-6">
            <p className="eyebrow">{q.tag}</p>
            <p className="mt-3 leading-relaxed text-purple/85">“{q.text}”</p>
          </blockquote>
        ))}
      </div>

      {!compact && (
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <figure className="card overflow-hidden p-0">
            <img src="/voz-decision.jpg" alt="Terapia de siempre versus constelaciones con Maribella" className="w-full" />
          </figure>
          <figure className="card overflow-hidden p-0">
            <img
              src="/voz-diagnostico.jpg"
              alt="Sesión de diagnóstico de constelaciones familiares: 75 minutos, sin promesa de magia"
              className="w-full"
            />
          </figure>
        </div>
      )}

      <div className="mt-10 flex flex-wrap gap-3">
        <a className="btn-primary" href={WHATSAPP} target="_blank" rel="noreferrer">
          Agendar diagnóstico
        </a>
        {compact && (
          <Link className="btn-ghost" to="/voces">
            Leer más voces
          </Link>
        )}
      </div>
    </section>
  )
}
