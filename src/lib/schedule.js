export const SESSION_TZ = 'America/Bogota'
export const SESSION_MINUTES = 75

/** Lunes a viernes. 0 = domingo, 6 = sábado. */
export const OPEN_WEEKDAYS = [1, 2, 3, 4, 5]

/** Inicios de sesión, hora de Bogotá: 5:00 p.m. a 9:00 p.m. */
export const BOOKING_SLOTS = [
  { hour: 17, minute: 0 },
  { hour: 18, minute: 0 },
  { hour: 19, minute: 0 },
  { hour: 20, minute: 0 },
  { hour: 21, minute: 0 },
]

function pad(n) {
  return String(n).padStart(2, '0')
}

export function slotKey(slot) {
  return `${pad(slot.hour)}:${pad(slot.minute)}`
}

export function slotLabel(slot) {
  const hour12 = slot.hour % 12 || 12
  const suffix = slot.hour >= 12 ? 'p.m.' : 'a.m.'
  return `${hour12}:${pad(slot.minute)} ${suffix}`
}

export function parseSlot(label) {
  return BOOKING_SLOTS.find((slot) => slotLabel(slot) === label) || null
}

export function isOpenDay(date) {
  return OPEN_WEEKDAYS.includes(date.getDay())
}

export function isPastDay(date, now = new Date()) {
  const a = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const b = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return a < b
}

export function slotsForDate(date, now = new Date()) {
  if (!date || !isOpenDay(date) || isPastDay(date, now)) return []
  const sameDay = date.getFullYear() === now.getFullYear()
    && date.getMonth() === now.getMonth()
    && date.getDate() === now.getDate()
  return BOOKING_SLOTS.filter((slot) => {
    if (!sameDay) return true
    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), slot.hour, slot.minute)
    return start.getTime() > now.getTime()
  }).map(slotLabel)
}
