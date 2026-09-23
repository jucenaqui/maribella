import { WHATSAPP } from '../data'
import { useLocale } from '../context/LocaleContext'

export default function Sobre() {
  const { t } = useLocale()
  return (
    <div className="page-pad">
      <p className="eyebrow">Maribella · 2026</p>
      <h1 className="display mt-3 max-w-3xl text-purple">
        {t('sobre.titleA')} <span className="italic text-fuchsia">{t('sobre.titleB')}</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-purple/80">{t('sobre.lead')}</p>

      <section className="mt-16 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl text-purple">{t('sobre.look')}</h2>
          <p className="mt-4 leading-relaxed text-purple/80">{t('sobre.p1')}</p>
          <p className="mt-4 leading-relaxed text-purple/80">{t('sobre.p2')}</p>
        </div>
        <ul className="space-y-4">
          {[
            [t('sobre.a1k'), t('sobre.a1v')],
            [t('sobre.a2k'), t('sobre.a2v')],
            [t('sobre.a3k'), t('sobre.a3v')],
            [t('sobre.a4k'), t('sobre.a4v')],
          ].map(([k, v]) => (
            <li key={k} className="card p-5">
              <p className="eyebrow">{k}</p>
              <p className="mt-2 font-serif text-xl text-purple">{v}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-3xl text-purple">{t('sobre.how')}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {[
            { t: t('sobre.h1t'), d: t('sobre.h1d') },
            { t: t('sobre.h2t'), d: t('sobre.h2d') },
            { t: t('sobre.h3t'), d: t('sobre.h3d') },
          ].map((x) => (
            <div key={x.t} className="card p-6">
              <h3 className="font-serif text-2xl">{x.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-purple/75">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16 text-center">
        <a className="btn-primary" href={WHATSAPP} target="_blank" rel="noreferrer">{t('sobre.cta')}</a>
      </div>
    </div>
  )
}
