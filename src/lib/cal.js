import { BOOKING_SLOTS, SESSION_TZ, dateKey, isOpenDay, isPastDay } from './schedule'

export const CAL_USERNAME = 'maribella'
export const CAL_EVENT_SLUG = 'sesion-maribella'

function query(start, end) {
  return `eventTypeSlug=${encodeURIComponent(CAL_EVENT_SLUG)}&username=${encodeURIComponent(CAL_USERNAME)}&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}&timeZone=${encodeURIComponent(SESSION_TZ)}&format=range`
}

function normalize(payload) {
  const data = payload?.data && typeof payload.data === 'object' ? payload.data : {}
  const map = {}
  Object.entries(data).forEach(([day, slots]) => {
    if (!Array.isArray(slots) || !slots.length) return
    map[day] = slots.map((slot) => {
      if (typeof slot === 'string') return { start: slot, end: null }
      return { start: slot.start, end: slot.end || null }
    }).filter((slot) => slot.start)
  })
  return map
}

function fallbackMonth(start, end) {
  const map = {}
  const from = new Date(`${start}T12:00:00`)
  const to = new Date(`${end}T12:00:00`)
  for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
    const day = new Date(d.getFullYear(), d.getMonth(), d.getDate())
    if (!isOpenDay(day) || isPastDay(day)) continue
    const key = dateKey(day)
    map[key] = BOOKING_SLOTS.map((slot) => {
      const hh = String(slot.hour).padStart(2, '0')
      const mm = String(slot.minute).padStart(2, '0')
      return { start: `${key}T${hh}:${mm}:00.000-05:00`, end: null }
    })
  }
  return map
}

export async function fetchCalSlots(start, end) {
  const qs = query(start, end)
  const tries = [
    `/api/cal-slots?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`,
    `https://api.cal.com/v2/slots?${qs}`,
  ]
  for (const url of tries) {
    try {
      const res = await fetch(url, {
        headers: url.includes('api.cal.com') ? { 'cal-api-version': '2024-09-04' } : {},
      })
      if (!res.ok) continue
      const parsed = normalize(await res.json())
      if (Object.keys(parsed).length) return parsed
    } catch {
      /* try next */
    }
  }
  return fallbackMonth(start, end)
}
