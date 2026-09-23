import { LANG_EN, LANG_ES, useLocale } from '../context/LocaleContext'

export default function LanguageSwitch({ dark = false }) {
  const { locale, setLocale, t } = useLocale()
  const idle = dark ? 'text-beige/85 hover:text-beige' : 'text-purple/85 hover:text-purple'

  return (
    <div className="flex shrink-0 items-center gap-1 text-[10px] uppercase tracking-[0.16em]" role="group" aria-label={t('nav.language')}>
      <button
        type="button"
        className={`rounded-sm px-2 py-1 ${locale === LANG_ES ? 'bg-fuchsia text-white' : idle}`}
        onClick={() => setLocale(LANG_ES)}
      >
        ES
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        className={`rounded-sm px-2 py-1 ${locale === LANG_EN ? 'bg-fuchsia text-white' : idle}`}
        onClick={() => setLocale(LANG_EN)}
      >
        EN
      </button>
    </div>
  )
}
