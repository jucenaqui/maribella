import { PRICE_ORDER, services as baseServices } from '../data'
import { useLocale } from '../context/LocaleContext'

export function useCatalog() {
  const { dict } = useLocale()
  const list = baseServices.map((s) => ({ ...s, ...(dict.svc?.[s.slug] || {}) }))
  const priced = PRICE_ORDER.map((slug) => list.find((s) => s.slug === slug)).filter(Boolean)
  const quotes = priced.map((service) => ({
    id: service.slug,
    title: service.title,
    desc: service.summary,
    price: service.price,
    tipo: 'unico',
  }))
  return { services: list, pricedServices: priced, quoteCatalog: quotes }
}
