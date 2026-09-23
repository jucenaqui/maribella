import { REGION_CO, REGION_US } from './region'

export const LANG_ES = 'es'
export const LANG_EN = 'en'
export const LANG_KEY = 'maribella-lang'

const ES_COUNTRIES = new Set([
  'CO', 'MX', 'ES', 'AR', 'PE', 'CL', 'EC', 'VE', 'GT', 'CR', 'PA',
  'BO', 'PY', 'UY', 'HN', 'SV', 'NI', 'DO', 'CU', 'PR', 'GQ',
])

let pending = null

export function isLang(value) {
  return value === LANG_ES || value === LANG_EN
}

function browserLang() {
  try {
    const lang = String(navigator.language || navigator.userLanguage || '').toLowerCase()
    if (lang.startsWith('es')) return LANG_ES
  } catch {
    /* ignore */
  }
  return LANG_EN
}

export async function detectGeo() {
  if (!pending) {
    pending = (async () => {
      let country = null
      try {
        const res = await fetch('https://ipwho.is/?fields=country_code,success')
        const data = await res.json()
        if (data?.success && data.country_code) country = String(data.country_code).toUpperCase()
      } catch {
        /* ignore */
      }

      let region = REGION_US
      if (country === 'CO') region = REGION_CO
      else if (country === 'US') region = REGION_US
      else {
        try {
          if (Intl.DateTimeFormat().resolvedOptions().timeZone === 'America/Bogota') region = REGION_CO
        } catch {
          /* ignore */
        }
      }

      let locale = LANG_EN
      try {
        const stored = localStorage.getItem(LANG_KEY)
        if (isLang(stored)) locale = stored
        else if (country) locale = ES_COUNTRIES.has(country) ? LANG_ES : LANG_EN
        else locale = browserLang()
      } catch {
        locale = country && ES_COUNTRIES.has(country) ? LANG_ES : browserLang()
      }

      return { region, locale, country }
    })()
  }
  return pending
}

export function persistLang(lang) {
  if (!isLang(lang)) return
  try {
    localStorage.setItem(LANG_KEY, lang)
  } catch {
    /* ignore */
  }
}
