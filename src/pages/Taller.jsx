import { WHATSAPP } from '../data'
import { useLocale } from '../context/LocaleContext'

export default function Taller() {
  const { t } = useLocale()
  return (
    <div className="page-pad">
      <p className="eyebrow">{t('taller.eyebrow')}</p>
      <h1 className="display mt-4">
        {t('taller.h1a')} <span className="italic text-fuchsia">{t('taller.h1b')}</span>
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-beige/80">{t('taller.lead')}</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { k: t('taller.k1'), v: t('taller.v1') },
          { k: t('taller.k2'), v: t('taller.v2') },
          { k: t('taller.k3'), v: t('taller.v3') },
        ].map((x) => (
          <div key={x.k} className="card p-6 text-center">
            <p className="eyebrow">{x.k}</p>
            <p className="mt-2 font-serif text-3xl">{x.v}</p>
          </div>
        ))}
      </div>

      <section className="mt-16 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl">{t('taller.what')}</h2>
          <p className="mt-4 leading-relaxed text-beige/80">{t('taller.whatLead')}</p>
          <ul className="mt-6 space-y-3 text-beige/80">
            <li>{t('taller.l1')}</li>
            <li>{t('taller.l2')}</li>
            <li>{t('taller.l3')}</li>
          </ul>
        </div>
        <div className="card p-8">
          <p className="eyebrow">{t('taller.also')}</p>
          <h3 className="mt-2 font-serif text-3xl">{t('taller.lineage')}</h3>
          <p className="mt-3 text-beige/75">{t('taller.lineageLead')}</p>
          <p className="mt-6 text-sm text-beige/60">{t('taller.retreat')}</p>
        </div>
      </section>

      <a className="btn-primary mt-12 w-full sm:w-auto" href={WHATSAPP} target="_blank" rel="noreferrer">
        {t('taller.cta')}
      </a>
    </div>
  )
}
