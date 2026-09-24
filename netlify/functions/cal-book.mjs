function flattenError(payload) {
  if (!payload) return ''
  if (typeof payload === 'string') return payload
  const parts = []
  const walk = (value) => {
    if (!value) return
    if (typeof value === 'string') {
      parts.push(value)
      return
    }
    if (Array.isArray(value)) {
      value.forEach(walk)
      return
    }
    if (typeof value === 'object') {
      walk(value.message)
      walk(value.error)
      walk(value.details)
    }
  }
  walk(payload)
  return parts.join(' ')
}

function classifyError(payload) {
  const text = flattenError(payload)
  if (/maximum number of active bookings|already has an? (active )?booking|can't book because/i.test(text)) {
    return 'already-booked'
  }
  if (/conflict|already booked|slot.*taken|no longer available|not available/i.test(text)) {
    return 'slot-taken'
  }
  return 'failed'
}

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') return json(204, {})
  if (event.httpMethod !== 'POST') return json(405, { ok: false, code: 'failed' })

  let body
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return json(400, { ok: false, code: 'failed' })
  }

  const start = body.start
  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()
  const timeZone = String(body.timeZone || 'America/Bogota')
  const language = body.language === 'en' ? 'en' : 'es'
  const phone = String(body.phone || '').trim()
  const notes = String(body.notes || '').slice(0, 500)
  if (!start || !name || !email) {
    return json(400, { ok: false, code: 'failed' })
  }

  const payload = {
    start: new Date(start).toISOString(),
    eventTypeSlug: 'sesion-maribella',
    username: 'maribella',
    attendee: {
      name,
      email,
      timeZone,
      language,
      ...(phone ? { phoneNumber: phone.startsWith('+') ? phone : `+${phone}` } : {}),
    },
    bookingFieldsResponses: {
      notes,
    },
    metadata: {
      whatsapp: String(body.whatsapp || '').slice(0, 40),
      inversion: String(body.inversion || '').slice(0, 80),
      servicios: String(body.servicios || '').slice(0, 500),
    },
  }

  const headers = {
    'Content-Type': 'application/json',
    'cal-api-version': '2024-08-13',
  }
  const apiKey = String(process.env.CAL_API_KEY || '').trim()
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`

  try {
    const res = await fetch('https://api.cal.com/v2/bookings', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return json(res.status >= 400 && res.status < 600 ? res.status : 502, {
        ok: false,
        code: classifyError(data),
      })
    }
    return json(201, {
      ok: true,
      uid: data?.data?.uid || data?.uid || null,
      status: data?.data?.status || data?.status || 'accepted',
    })
  } catch {
    return json(502, { ok: false, code: 'failed' })
  }
}
