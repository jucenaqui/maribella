import { Link } from 'react-router-dom'
import Price from '../components/Price.jsx'
import VocesBlock from '../components/VocesBlock.jsx'
import { useRegion } from '../context/RegionContext'
import { pricedServices, services } from '../data'

export default function Home() {
  const { label } = useRegion()
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:px-5 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:py-24">
        <div>
          <p className="eyebrow">✦ Terapeuta holística · Constelaciones y astrología</p>
          <h1 className="display mt-4 text-purple sm:mt-5">
            Sanar el origen
            <span className="mt-1 block italic text-fuchsia">para disfrutar tu presente.</span>
          </h1>
          <div className="mt-5 h-px w-16 bg-fuchsia" />
          <p className="mt-6 max-w-md text-base leading-relaxed text-purple/80">
            Acompaño a personas listas para dejar de cargar una culpa invisible y comenzar a vivir con claridad, liviandad y paz — a través de constelaciones familiares, astrología terapéutica y armonización de espacios.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link className="btn-primary w-full sm:w-auto" to="/tu-terapia">
              ¿Qué terapia necesitas?
            </Link>
            <Link className="btn-ghost w-full sm:w-auto" to="/cotizador">
              Armar mi propuesta
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-sm shadow-soft">
            <img src="/bg-light.jpg" alt="" className="h-[240px] w-full object-cover sm:h-[520px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple/50 to-transparent" />
          <img
            src="/logo.jpg"
            alt="Maribella, la sanación en todas tus dimensiones"
            className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover ring-4 ring-beige/80 sm:h-64 sm:w-64"
          />
          <p className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.2em] text-beige">
            ✦ Maribella · 2026
          </p>
        </div>
      </section>

      <section className="border-y border-purple/10 bg-beige/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
          {[
            { n: '01', t: 'Diagnóstico preciso', d: 'No hay receta genérica: leemos el sistema, la carta y el momento vital.' },
            { n: '02', t: 'Servicios holísticos', d: 'Constelaciones, astrología, feng shui, limpieza y terapias sutiles.' },
            { n: '03', t: 'Procesos de mentoría', d: 'De la herida a la paz: acompañamiento ético, sereno y sostenido.' },
          ].map((item) => (
            <div key={item.n}>
              <p className="text-[11px] tracking-[0.2em] text-fuchsia">{item.n}</p>
              <h3 className="mt-2 font-serif text-3xl text-purple">{item.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-purple/75">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-5 sm:py-16">
        <p className="eyebrow">Caminos</p>
        <h2 className="mt-2 font-serif text-3xl text-purple sm:text-4xl">Herramientas para tu transformación</h2>
        <p className="mt-3 max-w-2xl text-purple/75">
          Sanación sistémica, autoconocimiento y orden en el espacio. Encuentra el camino que resuena contigo.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link key={s.slug} to="/servicios" className="card block p-6 transition hover:-translate-y-0.5">
              <p className="eyebrow">{s.category}</p>
              <h3 className="mt-3 font-serif text-2xl text-purple">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-purple/75">{s.summary}</p>
              <span className="mt-4 inline-block text-xs uppercase tracking-[0.16em] text-fuchsia">Descubrir →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-8 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Sobre Maribella</p>
          <h2 className="mt-2 font-serif text-3xl text-purple sm:text-4xl">Del observador sabio al espacio seguro</h2>
          <p className="mt-4 leading-relaxed text-purple/80">
            Voz de marca serena, fundamentada y ética. Desmitifico lo esotérico para convertirlo en herramientas comprensibles: el porqué y el cómo de cada proceso, con respeto absoluto a tus tiempos.
          </p>
          <Link className="btn-ghost mt-6" to="/sobre">
            Conoce mi historia
          </Link>
        </div>
        <ul className="space-y-3 text-sm text-purple/85">
          <li className="border-b border-purple/10 pb-3">Eneatipo 5 · rigor analítico + sabiduría integrativa</li>
          <li className="border-b border-purple/10 pb-3">Arquetipos: el Sabio y el Sanador</li>
          <li className="border-b border-purple/10 pb-3">Categoría: mentoría holística sistémica para el auto-perdón</li>
          <li>Diferenciador: claridad pedagógica, sin promesas mágicas</li>
        </ul>
      </section>

      <VocesBlock compact />

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-5 sm:py-16">
        <p className="eyebrow">Inversión · {label}</p>
        <h2 className="font-serif text-3xl text-purple sm:text-4xl">Empieza por lo que tu momento pide</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {pricedServices.map((s) => (
            <Link key={s.slug} to={`/servicios#${s.slug}`} className="card block p-5 transition hover:-translate-y-0.5">
              <p className="text-xs uppercase tracking-widest text-fuchsia">{s.category}</p>
              <h3 className="mt-2 font-serif text-2xl">{s.title}</h3>
              <p className="mt-4 font-serif text-3xl text-purple">
                <Price value={s.price} />
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-8 text-center">
        <h2 className="font-serif text-3xl text-purple sm:text-4xl md:text-5xl">Tu paz no está en huir del origen.</h2>
        <p className="mx-auto mt-4 max-w-xl text-purple/75">
          Está en comprenderlo, perdonarlo y habitar tus días con confianza interior.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link className="btn-primary w-full sm:w-auto" to="/mentoria">
            Ver mentoría
          </Link>
          <Link className="btn-ghost w-full sm:w-auto" to="/recursos">
            Guía gratuita
          </Link>
        </div>
      </section>
    </>
  )
}
