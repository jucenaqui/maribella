const SITE_EMAIL = 'maribellaconexion@gmail.com'
const FROM = 'Maribella <hola@maribellaconexion.com>'
const PDF_URL = 'https://maribellaconexion.com/guia-patrones-familiares-maribella.pdf'

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
}

function configuredFrom() {
  const raw = String(process.env.GUIDE_FROM || '')
    .trim()
    .replace(/^['"]|['"]$/g, '')
  return /@maribellaconexion\.com>/i.test(raw) || /@maribellaconexion\.com$/i.test(raw) ? raw : FROM
}

function resendMessage(text) {
  try {
    const parsed = JSON.parse(text)
    const msg = parsed.message ?? parsed.error ?? parsed.name
    if (Array.isArray(msg)) return msg.map((item) => item.message || item).join(' ')
    if (msg && typeof msg === 'object') return JSON.stringify(msg)
    return String(msg || text)
  } catch {
    return String(text || '')
  }
}

function publicError(text) {
  const raw = resendMessage(text).replace(/re_[A-Za-z0-9]+/g, '[key]').slice(0, 280)
  if (/only send testing emails|not (yet )?verified|own email/i.test(raw)) {
    return 'Resend sigue en modo prueba o el dominio no está listo. En Resend revisa Domains y envía primero al correo de esa cuenta.'
  }
  if (/invalid api key|unauthorized|restricted_api_key/i.test(raw)) {
    return 'La clave de envío no es válida. Revisa RESEND_API_KEY en Netlify.'
  }
  if (raw && !/bearer|authorization/i.test(raw)) return raw
  return 'No se pudo enviar el correo'
}

async function sendResend(apiKey, payload) {
  const sent = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  const detail = await sent.text()
  return { ok: sent.ok, status: sent.status, detail }
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: { 'Access-Control-Allow-Origin': '*' } }
  }
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' })

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return json(501, {
      error: 'El envío por correo aún no está configurado en el servidor.',
    })
  }

  let email = ''
  try {
    email = String(JSON.parse(event.body || '{}').email || '').trim().toLowerCase()
  } catch {
    return json(400, { error: 'Solicitud inválida' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(400, { error: 'Correo inválido' })
  }

  const from = configuredFrom()
  const html = `<p>Hola,</p>
<p>Gracias por pedirme la guía. La encuentras adjunta y también en este enlace:</p>
<p><a href="${PDF_URL}">${PDF_URL}</a></p>
<p>Con cariño,<br>Maribella</p>`

  const base = {
    from,
    to: [email],
    reply_to: SITE_EMAIL,
    subject: 'Tu guía de Maribella: patrones familiares repetitivos',
    html,
  }

  let result = await sendResend(apiKey, {
    ...base,
    attachments: [{ filename: 'Guia-patrones-familiares-Maribella.pdf', path: PDF_URL }],
  })

  if (!result.ok) {
    console.error('resend-with-pdf', result.status, result.detail.slice(0, 500))
    result = await sendResend(apiKey, base)
  }

  if (!result.ok) {
    console.error('resend', result.status, result.detail.slice(0, 500))
    return json(502, { error: publicError(result.detail) })
  }

  sendResend(apiKey, {
    from,
    to: [SITE_EMAIL],
    subject: `Nueva solicitud de guía: ${email}`,
    html: `<p>${email} pidió la guía de patrones familiares.</p>`,
  }).catch((err) => console.error('notify', err))

  return json(200, { ok: true })
}
