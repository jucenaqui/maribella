import { EMAIL, INSTAGRAM, PHONE_LABEL, WHATSAPP } from '../data'
import { useLocale } from '../context/LocaleContext'

export default function Sobre() {
  const { t } = useLocale()
  return (
    <div className="page-pad">
      <p className="eyebrow">Maribella · 2026</p>
      <img
        src="/maribel.jpg"
        alt={t('integracion.who')}
        className="mt-6 h-36 w-36 rounded-full object-cover object-[center_18%] ring-1 ring-purple/15 sm:h-44 sm:w-44"
      />
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

      <section id="contacto" className="mt-16 scroll-mt-24">
        <p className="eyebrow">{t('contact.eyebrow')}</p>
        <h2 className="display mt-3 text-purple">{t('contact.title')}</h2>
        <p className="mt-4 max-w-2xl text-lg text-purple/75">{t('contact.lead')}</p>

        <div className="mt-12 grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="card min-w-0 p-5 sm:p-8">
            <p className="eyebrow">WhatsApp</p>
            <h3 className="mt-3 font-serif text-3xl text-purple">{PHONE_LABEL}</h3>
            <p className="mt-2 text-sm text-purple/70">{t('contact.waLead')}</p>
          </a>
          <a href={`mailto:${EMAIL}`} className="card min-w-0 p-5 sm:p-8">
            <p className="eyebrow">Email</p>
            <h3 className="mt-3 font-serif text-xl sm:text-2xl text-purple break-words [overflow-wrap:anywhere]">{EMAIL}</h3>
            <p className="mt-2 text-sm text-purple/70">{t('contact.mailLead')}</p>
          </a>
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="card min-w-0 p-5 sm:p-8">
            <p className="eyebrow">Instagram</p>
            <h3 className="mt-3 font-serif text-2xl sm:text-3xl text-purple break-words">@maribella_conexion</h3>
            <p className="mt-2 text-sm text-purple/70">{t('contact.igLead')}</p>
          </a>
        </div>

        <form
          className="card mt-12 max-w-xl p-5 sm:p-8"
          onSubmit={(e) => {
            e.preventDefault()
            const data = new FormData(e.currentTarget)
            const text = `${t('contact.waPrefix')} ${data.get('nombre')}. ${data.get('mensaje')}`
            window.open(`${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank')
          }}
        >
          <p className="eyebrow">{t('contact.write')}</p>
          <label className="mt-5 block text-xs uppercase tracking-widest text-purple/60">{t('contact.name')}</label>
          <input name="nombre" required className="mt-1 w-full border-b border-purple/20 bg-transparent py-2 outline-none" />
          <label className="mt-5 block text-xs uppercase tracking-widest text-purple/60">{t('contact.message')}</label>
          <textarea name="mensaje" rows="4" required className="mt-1 w-full border-b border-purple/20 bg-transparent py-2 outline-none" />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button type="submit" className="btn-primary w-full justify-center sm:w-auto">{t('contact.send')}</button>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-ghost w-full justify-center sm:w-auto">{t('sobre.cta')}</a>
          </div>
        </form>
      </section>
    </div>
  )
}
