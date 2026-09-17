import { REGION_CO, REGION_US, useRegion } from '../context/RegionContext'

export default function RegionSwitch({ dark = false }) {
  const { region, setRegion } = useRegion()
  const idle = dark ? 'text-beige/85 hover:text-beige' : 'text-purple/85 hover:text-purple'

  return (
    <div className="flex shrink-0 items-center gap-1 text-[10px] uppercase tracking-[0.16em]" role="group" aria-label="Zona de precios">
      <button
        type="button"
        className={`rounded-sm px-2 py-1 ${region === REGION_CO ? 'bg-fuchsia text-white' : idle}`}
        onClick={() => setRegion(REGION_CO)}
      >
        CO · COP
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        className={`rounded-sm px-2 py-1 ${region === REGION_US ? 'bg-fuchsia text-white' : idle}`}
        onClick={() => setRegion(REGION_US)}
      >
        US · USD
      </button>
    </div>
  )
}
