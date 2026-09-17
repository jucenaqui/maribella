import { useRegion } from '../context/RegionContext'

export default function Price({ value, className = '' }) {
  const { format } = useRegion()
  const label = format(value)
  if (!label) return null
  return <span className={className}>{label}</span>
}
