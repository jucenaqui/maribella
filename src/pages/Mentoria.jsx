import Price from '../components/Price.jsx'
import { useRegion } from '../context/RegionContext'
import { useLocale } from '../context/LocaleContext'
import { useCatalog } from '../lib/catalog'
import { WHATSAPP } from '../data'

export default function Mentoria() {
  const { label } = useRegion()
  const { t } = useLocale()
  const { pricedServices } = useCatalog()
  return (
    <div className="page-pad">
      <p className="eyebrow">{t('mentoria.eyebrow')}</p>
      <h1 className="display mt-4 max-w-3xl">
        {t('mentoria.h1a')} <span className="italic text-fuchsia">{t('mentoria.h1b')}</span>
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-beige/80">{t('mentoria.lead')}</p>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {[t('mentoria.b1'), t('mentoria.b2'), t('mentoria.b3'), t('mentoria.b4')].map((x) => (
          <div key={x} className="card px-4 py-5 text-center text-sm tracking-wide">{x}</div>
        ))}
      </div>

      <section className="mt-16 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl">{t('mentoria.complete')}</h2>
          <ul className="mt-6 space-y-3 text-beige/80">
            <li>{t('mentoria.l1')}</li>
            <li>{t('mentoria.l2')}</li>
            <li>{t('mentoria.l3')}</li>
            <li>{t('mentoria.l4')}</li>
            <li>{t('mentoria.l5')}</li>
          </ul>
        </div>
        <div className="card p-8">
          <p className="eyebrow">{t('mentoria.who')}</p>
          <ul className="mt-4 space-y-4 text-sm leading-relaxed">
            <li><strong className="text-fuchsia">1</strong> · {t('mentoria.p1')}</li>
            <li><strong className="text-fuchsia">2</strong> · {t('mentoria.p2')}</li>
            <li><strong className="text-fuchsia">3</strong> · {t('mentoria.p3')}</li>
            <li><strong className="text-fuchsia">4</strong> · {t('mentoria.p4')}</li>
          </ul>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-3xl">{t('mentoria.investTitle')} · {label}</h2>
        <p className="mt-2 max-w-xl text-beige/70">{t('mentoria.investLead')}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {pricedServices.map((s, i) => (
            <article key={s.slug} className={`card p-6 ${i === 0 ? 'ring-1 ring-fuchsia' : ''}`}>
              <p className="eyebrow">{s.category}</p>
              <p className="mt-3 font-serif text-3xl leading-tight">{s.title}</p>
              <p className="mt-3 font-serif text-3xl text-fuchsia">
                <Price value={s.price} />
              </p>
            </article>
          ))}
        </div>
        <a className="btn-primary mt-10 w-full sm:w-auto" href={WHATSAPP} target="_blank" rel="noreferrer">
          {t('mentoria.cta')}
        </a>
      </section>
    </div>
  )
}
