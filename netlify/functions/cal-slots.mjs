function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=60',
    },
    body: JSON.stringify(body),
  }
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') return json(204, {})
  const start = event.queryStringParameters?.start
  const end = event.queryStringParameters?.end
  if (!start || !end) return json(400, { status: 'error', message: 'start and end required' })

  const params = new URLSearchParams({
    eventTypeSlug: 'sesion-maribella',
    username: 'maribella',
    start,
    end,
    timeZone: 'America/Bogota',
    format: 'range',
  })
  try {
    const res = await fetch(`https://api.cal.com/v2/slots?${params}`, {
      headers: { 'cal-api-version': '2024-09-04' },
    })
    const data = await res.json()
    return json(res.ok ? 200 : res.status, data)
  } catch {
    return json(502, { status: 'error', message: 'Cal.com no respondió' })
  }
}
