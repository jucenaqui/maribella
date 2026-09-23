const SITE_EMAIL = 'maribellaconexion@gmail.com'

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
}

function publicError(resendText) {
  const raw = String(resendText || '')
  if (/only send testing emails/i.test(raw)) {
    return 'Resend sigue en modo prueba: por ahora solo envía al correo de esa cuenta.'
  }
  if (/invalid api key|unauthorized/i.test(raw)) {
    return 'La clave de envío no es válida. Revisa RESEND_API_KEY en Netlify.'
  }
  if (/domain is not verified|from domain/i.test(raw)) {
    return 'El dominio de envío no está verificado en Resend.'
  }
  if (/from/i.test(raw) && /invalid|must/i.test(raw)) {
    return 'El remitente GUIDE_FROM no está autorizado en Resend.'
  }
  return 'No se pudo enviar el correo'
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

  const origin = (process.env.URL || process.env.DEPLOY_PRIME_URL || 'https://maribellaconexion.com').replace(
    /\/$/,
    '',
  )
  const pdfUrl = `${origin}/guia-patrones-familiares.pdf`
  const from = process.env.GUIDE_FROM || 'Maribella <hola@maribellaconexion.com>'

  const sent = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [email],
      bcc: [SITE_EMAIL],
      reply_to: SITE_EMAIL,
      subject: 'Tu guía de Maribella: patrones familiares repetitivos',
      html: `<p>Hola,</p>
<p>Gracias por pedirme la guía. Te la adjunto en este correo.</p>
<p>Si no ves el archivo, también puedes abrirla aquí:<br>
<a href="${pdfUrl}">${pdfUrl}</a></p>
<p>Con cariño,<br>Maribella</p>`,
      attachments: [
        {
          filename: 'Guia-patrones-familiares-Maribella.pdf',
          path: pdfUrl,
        },
      ],
    }),
  })

  if (!sent.ok) {
    const detail = await sent.text()
    console.error('resend', sent.status, detail.slice(0, 500))
    return json(502, { error: publicError(detail) })
  }

  return json(200, { ok: true })
}
