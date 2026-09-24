function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
}

function publicError(payload) {
  const raw = typeof payload === 'string' ? payload : JSON.stringify(payload || {})
  const msg = String(raw)
    .replace(/cal_[A-Za-z0-9_]+/g, '[key]')
    .replace(/Bearer\s+\S+/gi, '[auth]')
    .slice(0, 280)
  if (/unauthorized|api key|forbidden/i.test(msg)) {
    return 'Cal.com rechazó la reserva. Revisa que el evento esté público.'
  }
  if (/conflict|already booked|slot.*taken|no longer available/i.test(msg)) {
    return 'Ese horario ya no está disponible. Elige otro.'
  }
  return msg || 'No se pudo crear la cita en Cal.com.'
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') return json(204, {})
  if (event.httpMethod !== 'POST') return json(405, { ok: false, error: 'Method not allowed' })

  let body
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return json(400, { ok: false, error: 'JSON inválido' })
  }

  const start = body.start
  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()
  const timeZone = String(body.timeZone || 'America/Bogota')
  const language = body.language === 'en' ? 'en' : 'es'
  const phone = String(body.phone || '').trim()
  const notes = String(body.notes || '').slice(0, 500)
  if (!start || !name || !email) {
    return json(400, { ok: false, error: 'Faltan start, name o email' })
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
        error: publicError(data.error || data.message || data),
      })
    }
    return json(201, {
      ok: true,
      uid: data?.data?.uid || data?.uid || null,
      status: data?.data?.status || data?.status || 'accepted',
    })
  } catch {
    return json(502, { ok: false, error: 'Cal.com no respondió' })
  }
}
