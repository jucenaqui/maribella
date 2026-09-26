import { createContext, useContext, useMemo } from 'react'
import { LANG_EN } from '../lib/geo'
import { formatPrice, REGION_CO, REGION_US, regionLabel } from '../lib/region'
import { useLocale } from './LocaleContext'

const RegionContext = createContext(null)

export function RegionProvider({ children }) {
  const { t, locale } = useLocale()
  const region = locale === LANG_EN ? REGION_US : REGION_CO

  const value = useMemo(() => ({
    region,
    ready: true,
    isColombia: region === REGION_CO,
    format: (price) => formatPrice(price, region, t('price.scope')),
    label: regionLabel(region, t('price.colombia'), t('price.usa')),
  }), [region, t])

  return <RegionContext.Provider value={value}>{children}</RegionContext.Provider>
}

export function useRegion() {
  const ctx = useContext(RegionContext)
  if (!ctx) throw new Error('useRegion must be used inside RegionProvider')
  return ctx
}

export { REGION_CO, REGION_US }
