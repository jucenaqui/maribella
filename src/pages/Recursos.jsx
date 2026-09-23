import { useState } from 'react'
import { EMAIL } from '../data'
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

  return (
    <div className="page-pad">
      <p className="eyebrow">{t('recursos.eyebrow')}</p>
      <h1 className="display mt-4">
        {t('recursos.titleA')} <span className="italic text-fuchsia">{t('recursos.titleB')}</span>
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-beige/80">{t('recursos.lead')}</p>

      <section className="card mt-10 grid gap-6 p-5 sm:mt-12 sm:gap-8 sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">
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
      </section>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {lessons.map((l) => (
          <article key={l.n} className="card p-6">
            <p className="text-xs tracking-[0.2em] text-fuchsia">{t('recursos.lesson')} {l.n}</p>
            <h3 className="mt-3 font-serif text-2xl">{l.t}</h3>
            <p className="mt-2 text-sm text-beige/70">{l.d}</p>
          </article>
        ))}
      </div>

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
