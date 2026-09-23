const SITE_EMAIL = 'maribellaconexion@gmail.com'

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: { 'Access-Control-Allow-Origin': '*' } }
  }
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' })

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return json(501, {
      error: 'Falta RESEND_API_KEY. Configúrala en Netlify para enviar la guía por correo.',
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

  const origin = process.env.URL || process.env.DEPLOY_PRIME_URL || 'https://maribellaconexion.com'
  const pdfUrl = `${origin.replace(/\/$/, '')}/guia-patrones-familiares.pdf`
  const pdfRes = await fetch(pdfUrl)
  if (!pdfRes.ok) return json(500, { error: 'No se pudo leer el PDF de la guía' })
  const pdfBase64 = Buffer.from(await pdfRes.arrayBuffer()).toString('base64')

  const from = process.env.GUIDE_FROM || 'Maribella <beth.t@example.com>'
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
          content: pdfBase64,
        },
      ],
    }),
  })

  if (!sent.ok) {
    const detail = await sent.text()
    return json(502, { error: 'No se pudo enviar el correo', detail })
  }

  return json(200, { ok: true })
}
