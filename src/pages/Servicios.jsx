import { Link } from 'react-router-dom'
import { WHATSAPP } from '../data'
import Price from '../components/Price.jsx'
import { useRegion } from '../context/RegionContext'
import { useLocale } from '../context/LocaleContext'
import { useCatalog } from '../lib/catalog'

export default function Servicios() {
  const { label } = useRegion()
  const { t } = useLocale()
  const { services } = useCatalog()
  return (
    <div className="page-pad">
      <p className="eyebrow">{t('servicesPage.eyebrow')}</p>
      <h1 className="display mt-3 text-purple">{t('servicesPage.title')}</h1>
      <p className="mt-4 max-w-2xl text-lg text-purple/75">{t('servicesPage.lead')}</p>
      <p className="mt-6 text-sm tracking-widest text-fuchsia">{t('servicesPage.count', { n: services.length })}</p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map((s) => (
          <article key={s.slug} id={s.slug} className="card min-w-0 p-5 sm:p-8">
            <p className="eyebrow">{s.category}</p>
            <h2 className="mt-3 font-serif text-2xl text-purple sm:text-3xl">{s.title}</h2>
            {s.price ? (
              <p className="mt-3 font-serif text-2xl text-fuchsia">
                <Price value={s.price} />
                <span className="ml-2 text-xs font-sans uppercase tracking-[0.16em] text-purple/50">{label}</span>
              </p>
            ) : null}
            <p className="mt-3 leading-relaxed text-purple/80">{s.detail}</p>
            <a className="mt-6 inline-block text-xs uppercase tracking-[0.16em] text-fuchsia" href={WHATSAPP} target="_blank" rel="noreferrer">
              {t('servicesPage.quoteThis')}
            </a>
          </article>
        ))}
      </div>

      <div className="mt-16 grid gap-6 border-t border-purple/10 pt-12 md:grid-cols-2">
        <div className="card p-5 sm:p-8">
          <p className="eyebrow">{t('servicesPage.workshopEyebrow')}</p>
          <h3 className="mt-2 font-serif text-3xl">{t('servicesPage.workshopTitle')}</h3>
          <p className="mt-3 text-purple/75">{t('servicesPage.workshopLead')}</p>
          <Link className="btn-primary mt-6" to="/taller">{t('servicesPage.workshopCta')}</Link>
        </div>
        <div className="card p-5 sm:p-8">
          <p className="eyebrow">{t('servicesPage.deepEyebrow')}</p>
          <h3 className="mt-2 font-serif text-3xl">{t('servicesPage.deepTitle')}</h3>
          <p className="mt-3 text-purple/75">{t('servicesPage.deepLead')}</p>
          <Link className="btn-ghost mt-6" to="/mentoria">{t('home.ctaMentorship')}</Link>
        </div>
      </div>
    </div>
  )
}
