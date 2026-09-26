import { EMAIL, INSTAGRAM, PHONE_LABEL, WHATSAPP } from '../data'
import { useLocale } from '../context/LocaleContext'

export default function Contacto() {
  const { t } = useLocale()
  return (
    <div className="page-pad">
      <p className="eyebrow">{t('contact.eyebrow')}</p>
      <h1 className="display mt-3 text-purple">{t('contact.title')}</h1>
      <p className="mt-4 max-w-2xl text-lg text-purple/75">{t('contact.lead')}</p>

      <div className="mt-12 grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
        <a href={WHATSAPP} target="_blank" rel="noreferrer" className="card min-w-0 p-5 sm:p-8">
          <p className="eyebrow">WhatsApp</p>
          <h2 className="mt-3 font-serif text-3xl text-purple">{PHONE_LABEL}</h2>
          <p className="mt-2 text-sm text-purple/70">{t('contact.waLead')}</p>
        </a>
        <a href={`mailto:${EMAIL}`} className="card min-w-0 p-5 sm:p-8">
          <p className="eyebrow">Email</p>
          <h2 className="mt-3 font-serif text-xl sm:text-2xl text-purple break-words [overflow-wrap:anywhere]">{EMAIL}</h2>
          <p className="mt-2 text-sm text-purple/70">{t('contact.mailLead')}</p>
        </a>
        <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="card min-w-0 p-5 sm:p-8">
          <p className="eyebrow">Instagram</p>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl text-purple break-words">@maribella_conexion</h2>
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
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-ghost w-full justify-center sm:w-auto">{t('contact.quote')}</a>
        </div>
      </form>
    </div>
  )
}
