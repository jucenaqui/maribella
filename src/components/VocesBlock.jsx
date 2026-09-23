import { Link } from 'react-router-dom'
import { voces, WHATSAPP } from '../data'
import VideoCard from './VideoCard.jsx'
import { useLocale } from '../context/LocaleContext'

const TAG_KEY = {
  Diagnóstico: 'voces.tagDx',
  Proceso: 'voces.tagProcess',
  Honestidad: 'voces.tagHonesty',
  Linaje: 'voces.tagLineage',
}

const VIDEO_TITLE = {
  diagnostico: 'voces.v1',
  proceso: 'voces.v2',
  'testimonio-3': 'voces.v3',
  'testimonio-4': 'voces.v4',
}

export default function VocesBlock({ compact = false }) {
  const { t } = useLocale()
  const quotes = compact ? voces.quotes.slice(0, 3) : voces.quotes
  const videos = compact ? voces.videos.slice(0, 2) : voces.videos
  const Heading = compact ? 'h2' : 'h1'

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-5 sm:py-16" id="voces">
      <p className="eyebrow">{t('voces.eyebrow')}</p>
      <Heading className="display mt-2 text-purple">{t('voces.title')}</Heading>
      <p className="mt-4 max-w-2xl text-purple/75">{t('voces.lead')}</p>

      <article className="mt-10 grid overflow-hidden rounded-2xl shadow-soft lg:grid-cols-2 lg:items-stretch">
        <div className="min-h-[240px] bg-[#e8dcc8] lg:min-h-[420px]">
          <img
            src={voces.featured.image}
            alt={t('voces.featuredAlt')}
            className="block h-full w-full object-cover"
          />
        </div>
        <div className="card flex flex-col justify-center rounded-none p-5 sm:p-8 lg:p-10">
          <p className="eyebrow">{t('voces.featuredName')}</p>
          <h3 className="mt-3 font-serif text-2xl text-purple sm:text-3xl">{t('voces.featuredTitle')}</h3>
          <p className="mt-4 leading-relaxed text-purple/80">{t('voces.featuredLead')}</p>
          <p className="mt-6 text-sm leading-relaxed text-purple/70">{voces.featured.note}</p>
        </div>
      </article>

      <div className="mt-10 grid items-stretch justify-items-center gap-6 sm:grid-cols-2">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={{ ...video, title: t(VIDEO_TITLE[video.id] || 'voces.v1') }}
          />
        ))}
      </div>

      <div className="mt-10 grid items-stretch gap-4 md:grid-cols-3">
        {quotes.map((q) => (
          <blockquote key={q.text} className="card flex h-full min-h-[200px] flex-col rounded-2xl p-6">
            <p className="eyebrow">{t(TAG_KEY[q.tag] || 'voces.tagDx')}</p>
            <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-purple/85">“{q.text}”</p>
          </blockquote>
        ))}
      </div>

      {!compact && (
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2">
          <figure className="card overflow-hidden rounded-2xl p-0">
            <img src="/voz-decision.jpg" alt="" className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]" />
          </figure>
          <figure className="card overflow-hidden rounded-2xl p-0">
            <img
              src="/voz-diagnostico.jpg"
              alt=""
              className="h-full min-h-[240px] w-full object-cover lg:min-h-[320px]"
            />
          </figure>
        </div>
      )}

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a className="btn-primary w-full sm:w-auto" href={WHATSAPP} target="_blank" rel="noreferrer">
          {t('voces.cta')}
        </a>
        {compact && (
          <Link className="btn-ghost w-full sm:w-auto" to="/voces">
            {t('voces.more')}
          </Link>
        )}
      </div>
    </section>
  )
}
