export const REGION_CO = 'CO'
export const REGION_US = 'US'
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

export function formatQuoteAmount(amount, region, ask = 'Consultar') {
  if (amount == null) return ask
  if (region === REGION_CO) return `$${Number(amount).toLocaleString('es-CO')} COP`
  return `$${Number(amount).toLocaleString('en-US')} USD`
}

export function formatPrice(price, region, noteText) {
  if (!price) return ''

  if (region === REGION_CO) {
    if (typeof price.cop !== 'number') return ''
    return `$${price.cop.toLocaleString('es-CO')} COP`
  }

  const usd = price.usd
  if (usd == null) return ''
  if (typeof usd === 'number') return `$${usd.toLocaleString('en-US')} USD`

  const range = `$${usd.from} – ${usd.to}`
  const note = usd.note === 'scope' ? noteText : usd.note
  return note ? `${range} (${note})` : `${range} USD`
}

export function regionLabel(region, colombia = 'Colombia', usa = 'Estados Unidos') {
  return region === REGION_CO ? colombia : usa
}
