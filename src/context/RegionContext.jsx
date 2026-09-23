import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { detectGeo } from '../lib/geo'
import { formatPrice, REGION_CO, REGION_US, regionLabel } from '../lib/region'
import { useLocale } from './LocaleContext'

const RegionContext = createContext(null)

export function RegionProvider({ children }) {
  const [region, setRegion] = useState(REGION_US)
  const [ready, setReady] = useState(false)
  const { t } = useLocale()

  useEffect(() => {
    let active = true
    detectGeo().then(({ region: next }) => {
      if (!active) return
      setRegion(next)
      setReady(true)
    })
    return () => {
      active = false
    }
  }, [])

  const value = useMemo(() => ({
    region,
    ready,
    isColombia: region === REGION_CO,
    format: (price) => formatPrice(price, region, t('price.scope')),
    label: regionLabel(region, t('price.colombia'), t('price.usa')),
  }), [region, ready, t])

  return <RegionContext.Provider value={value}>{children}</RegionContext.Provider>
}

export function useRegion() {
  const ctx = useContext(RegionContext)
  if (!ctx) throw new Error('useRegion must be used inside RegionProvider')
  return ctx
}

export { REGION_CO, REGION_US }
