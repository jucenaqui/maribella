import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { detectGeo, LANG_EN, LANG_ES, persistLang } from '../lib/geo'
import { fill, messages } from '../i18n/messages'

const LocaleContext = createContext(null)

function lookup(dict, key) {
  return key.split('.').reduce((acc, part) => (acc == null ? acc : acc[part]), dict)
}

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(LANG_ES)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let active = true
    detectGeo().then(({ locale: next }) => {
      if (!active) return
      setLocaleState(next)
      setReady(true)
    })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo(() => {
    const dict = messages[locale] || messages.es
    const fallback = messages.es
    const t = (key, vars) => {
      const found = lookup(dict, key)
      const es = lookup(fallback, key)
      const val = found != null ? found : es
      if (Array.isArray(val) || (val && typeof val === 'object')) return val
      const str = typeof val === 'string' ? val : key
      return vars ? fill(str, vars) : str
    }
    const setLocale = (next) => {
      setLocaleState(next)
      persistLang(next)
    }
    return { locale, ready, setLocale, t, dict, isEn: locale === LANG_EN }
  }, [locale, ready])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used inside LocaleProvider')
  return ctx
}

export { LANG_EN, LANG_ES }
