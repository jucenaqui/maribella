import { useState } from 'react'
import { EMAIL } from '../data'
import AppsCarousel from '../components/AppsCarousel.jsx'
import { useLocale } from '../context/LocaleContext'

async function sendGuide(email) {
  const res = await fetch('/.netlify/functions/send-guide', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || 'fail')
  }
}

export default function Recursos() {
  const { t } = useLocale()
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const lessons = [
    { n: '01', t: t('recursos.l1t'), d: t('recursos.l1d') },
    { n: '02', t: t('recursos.l2t'), d: t('recursos.l2d') },
    { n: '03', t: t('recursos.l3t'), d: t('recursos.l3d') },
  ]
  const apps = [
    {
      k: 'ancla',
      to: '/app/ancla-3-minutos',
      eyebrow: t('recursos.appAnclaEyebrow'),
      title: t('recursos.appAnclaTitle'),
      lead: t('recursos.appAnclaLead'),
      cta: t('recursos.appOpen'),
    },
    {
      k: 'arbol',
      to: '/app/arbol-familiar',
      eyebrow: t('recursos.appArbolEyebrow'),
      title: t('recursos.appArbolTitle'),
      lead: t('recursos.appArbolLead'),
      cta: t('recursos.appOpen'),
    },
    {
      k: 'perdon',
      to: '/app/auto-perdon-7-dias',
      eyebrow: t('recursos.appPerdonEyebrow'),
      title: t('recursos.appPerdonTitle'),
      lead: t('recursos.appPerdonLead'),
      cta: t('recursos.appOpen'),
    },
    {
      k: 'balanza',
      to: '/app/balanza-dar-y-recibir',
      eyebrow: t('recursos.appBalanzaEyebrow'),
      title: t('recursos.appBalanzaTitle'),
      lead: t('recursos.appBalanzaLead'),
      cta: t('recursos.appOpen'),
    },
    {
      k: 'soltar',
      to: '/app/carta-para-soltar',
      eyebrow: t('recursos.appSoltarEyebrow'),
      title: t('recursos.appSoltarTitle'),
      lead: t('recursos.appSoltarLead'),
      cta: t('recursos.appOpen'),
    },
    {
      k: 'cartaDia',
      to: '/app/carta-del-dia',
      eyebrow: t('recursos.appCartaDiaEyebrow'),
      title: t('recursos.appCartaDiaTitle'),
      lead: t('recursos.appCartaDiaLead'),
      cta: t('recursos.appOpen'),
    },
    {
      k: 'lunar',
      to: '/app/calendario-lunar',
      eyebrow: t('recursos.appLunarEyebrow'),
      title: t('recursos.appLunarTitle'),
      lead: t('recursos.appLunarLead'),
      cta: t('recursos.appOpen'),
    },
    {
      k: 'bagua',
      to: '/app/mapa-bagua',
      eyebrow: t('recursos.appBaguaEyebrow'),
      title: t('recursos.appBaguaTitle'),
      lead: t('recursos.appBaguaLead'),
      cta: t('recursos.appOpen'),
    },
    {
      k: 'limpieza',
      to: '/app/limpieza-de-tu-espacio',
      eyebrow: t('recursos.appLimpiezaEyebrow'),
      title: t('recursos.appLimpiezaTitle'),
      lead: t('recursos.appLimpiezaLead'),
      cta: t('recursos.appOpen'),
    },
    {
      k: 'fechas',
      to: '/app/fechas-que-se-repiten',
      eyebrow: t('recursos.appFechasEyebrow'),
      title: t('recursos.appFechasTitle'),
      lead: t('recursos.appFechasLead'),
      cta: t('recursos.appOpen'),
    },
    {
      k: 'cuaderno',
      to: '/app/cuaderno-semanal',
      eyebrow: t('recursos.appCuadernoEyebrow'),
      title: t('recursos.appCuadernoTitle'),
      lead: t('recursos.appCuadernoLead'),
      cta: t('recursos.appOpen'),
    },
    {
      k: 'rueda',
      to: '/app/rueda-4-dimensiones',
      eyebrow: t('recursos.appRuedaEyebrow'),
      title: t('recursos.appRuedaTitle'),
      lead: t('recursos.appRuedaLead'),
      cta: t('recursos.appOpen'),
    },
    {
      k: 'orden',
      to: '/app/que-orden-esta-movido',
      eyebrow: t('recursos.appOrdenEyebrow'),
      title: t('recursos.appOrdenTitle'),
      lead: t('recursos.appOrdenLead'),
      cta: t('recursos.appOpen'),
    },
    {
      k: 'prepara',
      to: '/app/prepara-tu-sesion',
      eyebrow: t('recursos.appPreparaEyebrow'),
      title: t('recursos.appPreparaTitle'),
      lead: t('recursos.appPreparaLead'),
      cta: t('recursos.appOpen'),
    },
    {
      k: 'kua',
      to: '/app/numero-kua',
      eyebrow: t('recursos.appKuaEyebrow'),
      title: t('recursos.appKuaTitle'),
      lead: t('recursos.appKuaLead'),
      cta: t('recursos.appOpen'),
    },
    {
      k: 'mio',
      to: '/app/mio-o-aprendido',
      eyebrow: t('recursos.appMioEyebrow'),
      title: t('recursos.appMioTitle'),
      lead: t('recursos.appMioLead'),
      cta: t('recursos.appOpen'),
    },
    {
      k: 'arbolVida',
      to: '/app/mi-arbol-de-vida',
      eyebrow: t('recursos.appArbolVidaEyebrow'),
      title: t('recursos.appArbolVidaTitle'),
      lead: t('recursos.appArbolVidaLead'),
      cta: t('recursos.appOpen'),
    },
    {
      k: 'carta',
      to: '/carta-astral',
      eyebrow: t('nav.chart'),
      title: t('recursos.chartTitle'),
      lead: t('recursos.chartLead'),
      cta: t('recursos.chartCta'),
    },
  ]

  return (
    <div className="page-pad">
      <p className="eyebrow">{t('recursos.eyebrow')}</p>
      <h1 className="display mt-4">
        {t('recursos.titleA')} <span className="italic text-fuchsia">{t('recursos.titleB')}</span>
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-beige/80">{t('recursos.lead')}</p>

      <section className="mt-10">
        <p className="eyebrow">{t('recursos.apps')}</p>
        <h2 className="mt-2 font-serif text-3xl sm:text-4xl">{t('recursos.appsTitle')}</h2>
        <AppsCarousel
          apps={apps}
          prevLabel={t('recursos.appPrev')}
          nextLabel={t('recursos.appNext')}
          countLabel={(n, total) => t('recursos.appCount', { n: String(n), total: String(total) })}
        />
      </section>

      <section className="card mt-10 p-5 sm:mt-12 sm:p-8">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="eyebrow">{t('recursos.magnet')}</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl">{t('recursos.guideTitle')}</h2>
            <p className="mt-4 text-beige/75">{t('recursos.guideLead')}</p>
          </div>
          {status === 'sent' ? (
            <p className="flex items-center font-serif text-2xl text-beige">{t('recursos.sent')}</p>
          ) : (
            <form
              className="flex flex-col justify-center gap-3"
              onSubmit={async (e) => {
                e.preventDefault()
                const email = e.currentTarget.email.value.trim()
                setError('')
                setStatus('sending')
                try {
                  await sendGuide(email)
                  setStatus('sent')
                } catch {
                  setStatus('idle')
                  setError(t('recursos.fail'))
                }
              }}
            >
              <input
                name="email"
                type="email"
                required
                placeholder={t('recursos.email')}
                className="border-b border-beige/30 bg-transparent py-3 outline-none placeholder:text-beige/40"
              />
              <button className="btn-primary w-full sm:w-auto" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? t('recursos.sending') : t('recursos.receive')}
              </button>
              {error ? <p className="text-xs text-fuchsia">{error}</p> : null}
              <p className="text-xs text-beige/50">{t('recursos.hint', { email: EMAIL })}</p>
            </form>
          )}
        </div>

        <div className="mt-10 border-t border-beige/15 pt-8">
          <p className="eyebrow">{t('recursos.guideInside')}</p>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            {lessons.map((l) => (
              <article key={l.n}>
                <p className="text-xs tracking-[0.2em] text-fuchsia">{t('recursos.lesson')} {l.n}</p>
                <h3 className="mt-3 font-serif text-2xl">{l.t}</h3>
                <p className="mt-2 text-sm text-beige/70">{l.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="card p-5 sm:p-8">
          <p className="eyebrow">{t('recursos.notebook')}</p>
          <h3 className="mt-2 font-serif text-3xl">{t('recursos.nTitle')}</h3>
          <p className="mt-3 text-beige/70">{t('recursos.nLead')}</p>
        </div>
        <div className="card p-5 sm:p-8">
          <p className="eyebrow">{t('recursos.mini')}</p>
          <h3 className="mt-2 font-serif text-3xl">{t('recursos.mTitle')}</h3>
          <p className="mt-3 text-beige/70">{t('recursos.mLead')}</p>
        </div>
      </section>
    </div>
  )
}
