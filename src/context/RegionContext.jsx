import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { detectRegion, formatPrice, persistRegion, REGION_CO, REGION_US, regionLabel } from '../lib/region'

const RegionContext = createContext(null)

export function RegionProvider({ children }) {
  const [region, setRegionState] = useState(REGION_US)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let active = true
    detectRegion().then((next) => {
      if (!active) return
      setRegionState(next)
      setReady(true)
    })
    return () => {
      active = false
    }
  }, [])

  const value = useMemo(() => {
    const setRegion = (next) => {
      setRegionState(next)
      persistRegion(next)
    }
    return {
      region,
      ready,
      setRegion,
      isColombia: region === REGION_CO,
      format: (price) => formatPrice(price, region),
      label: regionLabel(region),
    }
  }, [region, ready])

  return <RegionContext.Provider value={value}>{children}</RegionContext.Provider>
}

export function useRegion() {
  const ctx = useContext(RegionContext)
  if (!ctx) throw new Error('useRegion must be used inside RegionProvider')
  return ctx
}

export { REGION_CO, REGION_US }
