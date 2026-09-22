export const REGION_CO = 'CO'
export const REGION_US = 'US'
export const STORAGE_KEY = 'maribella-region'

export function isRegion(value) {
  return value === REGION_CO || value === REGION_US
}

export function quoteAmount(price, region) {
  if (!price) return null
  if (region === REGION_CO) return typeof price.cop === 'number' ? price.cop : null
  if (typeof price.usd === 'number') return price.usd
  if (price.usd && typeof price.usd.from === 'number') return price.usd.from
  return null
}

export function formatQuoteAmount(amount, region) {
  if (amount == null) return 'Consultar'
  if (region === REGION_CO) return `$${Number(amount).toLocaleString('es-CO')} COP`
  return `$${Number(amount).toLocaleString('en-US')} USD`
}

export function formatPrice(price, region) {
  if (!price) return ''

  if (region === REGION_CO) {
    if (typeof price.cop !== 'number') return ''
    return `$${price.cop.toLocaleString('es-CO')} COP`
  }

  const usd = price.usd
  if (usd == null) return ''
  if (typeof usd === 'number') return `$${usd.toLocaleString('en-US')} USD`

  const range = `$${usd.from} – ${usd.to}`
  return usd.note ? `${range} (${usd.note})` : `${range} USD`
}

export function regionLabel(region) {
  return region === REGION_CO ? 'Colombia' : 'Estados Unidos'
}

function timezoneHint() {
  try {
    if (Intl.DateTimeFormat().resolvedOptions().timeZone === 'America/Bogota') {
      return REGION_CO
    }
  } catch {
    /* ignore */
  }
  return null
}

export async function detectRegion() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isRegion(stored)) return stored
  } catch {
    /* ignore */
  }

  try {
    const res = await fetch('https://ipwho.is/?fields=country_code,success')
    const data = await res.json()
    if (data?.success && data.country_code === 'CO') return REGION_CO
    if (data?.success && data.country_code === 'US') return REGION_US
  } catch {
    /* ignore */
  }

  return timezoneHint() || REGION_US
}

export function persistRegion(region) {
  if (!isRegion(region)) return
  try {
    localStorage.setItem(STORAGE_KEY, region)
  } catch {
    /* ignore */
  }
}
