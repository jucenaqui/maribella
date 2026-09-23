import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { jsPDF } from 'jspdf'
import { useRegion } from '../context/RegionContext'
import { quoteCatalog, WHATSAPP_NUMBER } from '../data'
import { formatQuoteAmount, quoteAmount, REGION_CO } from '../lib/region'
import '../styles/cotizador.css'

const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
]
const PAISES = [
  { c: 'CO', d: '57', f: '🇨🇴' }, { c: 'MX', d: '52', f: '🇲🇽' }, { c: 'US', d: '1', f: '🇺🇸' },
  { c: 'ES', d: '34', f: '🇪🇸' }, { c: 'AR', d: '54', f: '🇦🇷' }, { c: 'PE', d: '51', f: '🇵🇪' },
  { c: 'CL', d: '56', f: '🇨🇱' }, { c: 'EC', d: '593', f: '🇪🇨' }, { c: 'VE', d: '58', f: '🇻🇪' },
]
const HORAS = ['9:00 a.m.', '10:00 a.m.', '11:00 a.m.', '12:00 m.', '2:00 p.m.', '3:00 p.m.', '4:00 p.m.', '5:00 p.m.']
const HORAS24 = { '9:00 a.m.': 9, '10:00 a.m.': 10, '11:00 a.m.': 11, '12:00 m.': 12, '2:00 p.m.': 14, '3:00 p.m.': 15, '4:00 p.m.': 16, '5:00 p.m.': 17 }

function notifyLead(payload) {
  const body = new URLSearchParams()
  body.set('form-name', 'cotizador')
  Object.entries(payload).forEach(([k, v]) => body.set(k, String(v ?? '')))
  return fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
    signal: AbortSignal.timeout(4000),
  }).catch(() => {})
}

export default function Cotizador() {
  const { region } = useRegion()
  const [params] = useSearchParams()
  const preset = params.get('servicio')
  const [step, setStep] = useState(0)
  const [logged, setLogged] = useState(false)
  const [nombre, setNombre] = useState('')
  const [dia, setDia] = useState('')
  const [mes, setMes] = useState('')
  const [foto, setFoto] = useState(null)
  const [paisIdx, setPaisIdx] = useState(region === REGION_CO ? 0 : 2)
  const [tel, setTel] = useState('')
  const [mail, setMail] = useState('')
  const [giro, setGiro] = useState('')
  const [sel, setSel] = useState(() => new Set(preset && quoteCatalog.some((s) => s.id === preset) ? [preset] : []))
  const [calRef, setCalRef] = useState(() => {
    const d = new Date()
    d.setDate(1)
    return d
  })
  const [fecha, setFecha] = useState(null)
  const [hora, setHora] = useState(null)

  useEffect(() => {
    setPaisIdx(region === REGION_CO ? 0 : 2)
  }, [region])

  const pais = PAISES[paisIdx]
  const telFull = `${pais.d}${tel.replace(/\D/g, '')}`
  const cumple = dia !== '' && mes !== '' ? `${dia} de ${MESES[Number(mes)]}` : ''
  const okTel = tel.replace(/\D/g, '').length >= 7
  const okMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.trim())
  const okGiro = giro.trim().length >= 2
  const canLogin = nombre.trim() && dia !== '' && mes !== ''
  const canStep1 = okTel && okMail && okGiro

  const chosen = useMemo(() => quoteCatalog.filter((s) => sel.has(s.id)), [sel])
  const total = chosen.reduce((sum, s) => sum + (quoteAmount(s.price, region) || 0), 0)
  const totalLabel = formatQuoteAmount(total, region)

  function toggle(id) {
    setSel((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function fechaTxt(d) {
    return `${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`
  }

  function resumenTexto() {
    const servs = chosen.map((i) => `• ${i.title} (${formatQuoteAmount(quoteAmount(i.price, region), region)})`).join('\n')
    return `¡Hola Maribella! Quiero reservar mi sesión.\n\n` +
      `Nombre: ${nombre}\nNací el: ${cumple}\nWhatsApp: +${telFull}\nCorreo: ${mail}\n` +
      `Qué me trae: ${giro}\n\nMi camino:\n${servs || '• Por confirmar'}\n\n` +
      `Inversión estimada: ${totalLabel}\nSesión: ${fecha ? fechaTxt(fecha) : ''} a las ${hora || ''}`
  }

  function confirmar() {
    try {
      const leads = JSON.parse(localStorage.getItem('maribella_leads') || '[]')
      leads.push({
        nombre, cumple, tel: telFull, mail, giro,
        sel: [...sel], total: totalLabel, fecha: fecha?.toISOString(), hora, ts: new Date().toISOString(),
      })
      localStorage.setItem('maribella_leads', JSON.stringify(leads))
    } catch {
      /* ignore */
    }
    notifyLead({
      nombre, cumple, whatsapp: `+${telFull}`, email: mail, giro,
      servicios: chosen.map((s) => s.title).join(', '), inversion: totalLabel,
      sesion: fecha && hora ? `${fechaTxt(fecha)} · ${hora}` : '',
    })
    setStep(5)
  }

  function enviarWhatsApp() {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(resumenTexto())}`, '_blank')
  }

  function agendarCalendario() {
    if (!fecha || !hora) return
    const h = HORAS24[hora]
    const ini = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), h, 0)
    const fin = new Date(ini.getTime() + 75 * 60000)
    const z = (n) => String(n).padStart(2, '0')
    const fmtDT = (d) => `${d.getFullYear()}${z(d.getMonth() + 1)}${z(d.getDate())}T${z(d.getHours())}${z(d.getMinutes())}00`
    const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Maribella//ES\nBEGIN:VEVENT\n` +
      `UID:${Date.now()}@maribellaconexion.com\nDTSTAMP:${fmtDT(new Date())}\nDTSTART:${fmtDT(ini)}\nDTEND:${fmtDT(fin)}\n` +
      `SUMMARY:Sesión con Maribella\nDESCRIPTION:${giro}. Contacto: ${mail} / +${telFull}\nEND:VEVENT\nEND:VCALENDAR`
    const blob = new Blob([ics], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sesion-maribella.ics'
    a.click()
    URL.revokeObjectURL(url)
  }

  function descargarPDF() {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' })
    const W = doc.internal.pageSize.getWidth()
    doc.setFillColor(75, 46, 99)
    doc.rect(0, 0, W, 120, 'F')
    doc.setFillColor(214, 35, 107)
    doc.rect(0, 110, W, 10, 'F')
    if (foto) {
      try { doc.addImage(foto, 'PNG', 40, 32, 56, 56) } catch { /* ignore */ }
    }
    doc.setTextColor(255)
    doc.setFont('times', 'bold')
    doc.setFontSize(22)
    doc.text('Maribella', foto ? 112 : 40, 58)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.text('Sanar el origen para disfrutar tu presente', foto ? 112 : 40, 78)
    let y = 160
    doc.setTextColor(42, 24, 56)
    doc.setFont('times', 'bold')
    doc.setFontSize(17)
    doc.text(`Tu camino, ${nombre}`, 40, y)
    y += 26
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.setTextColor(122, 106, 133)
    doc.text(`WhatsApp: +${telFull}   ·   Correo: ${mail}`, 40, y)
    y += 16
    doc.text(`Nacimiento: ${cumple}`, 40, y)
    y += 34
    doc.setDrawColor(231, 221, 207)
    doc.line(40, y, W - 40, y)
    y += 24
    doc.setTextColor(42, 24, 56)
    doc.setFont('times', 'bold')
    doc.setFontSize(13)
    doc.text('Tu camino incluye', 40, y)
    y += 22
    chosen.forEach((i) => {
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(42, 24, 56)
      doc.text(i.title, 48, y)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(214, 35, 107)
      doc.text(formatQuoteAmount(quoteAmount(i.price, region), region), W - 48, y, { align: 'right' })
      y += 20
    })
    y += 8
    doc.setDrawColor(75, 46, 99)
    doc.setLineWidth(1.5)
    doc.line(40, y, W - 40, y)
    y += 26
    doc.setFont('times', 'bold')
    doc.setFontSize(15)
    doc.setTextColor(42, 24, 56)
    doc.text('Inversion estimada', 48, y)
    doc.setTextColor(214, 35, 107)
    doc.text(totalLabel, W - 48, y, { align: 'right' })
    y += 38
    if (fecha && hora) {
      doc.setFillColor(251, 247, 240)
      doc.roundedRect(40, y, W - 80, 56, 10, 10, 'F')
      doc.setTextColor(42, 24, 56)
      doc.setFont('times', 'bold')
      doc.setFontSize(12)
      doc.text('Tu sesion agendada', 56, y + 24)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(122, 106, 133)
      doc.text(`${fechaTxt(fecha)} · ${hora}`, 56, y + 42)
    }
    doc.save(`propuesta-${nombre || 'maribella'}.pdf`)
  }

  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)
  const y = calRef.getFullYear()
  const m = calRef.getMonth()
  const primer = new Date(y, m, 1).getDay()
  const diasMes = new Date(y, m + 1, 0).getDate()
  const days = []
  for (let i = 0; i < primer; i += 1) days.push(null)
  for (let d = 1; d <= diasMes; d += 1) days.push(d)

  return (
    <div className="cotizador mx-auto max-w-6xl px-4 py-8 sm:px-5 sm:py-10">
      {!logged && (
        <div className="cotizador-overlay">
          <div className="cotizador-modal">
            <p className="eyebrow">Antes de empezar</p>
            <h2 className="mt-3 font-serif text-3xl text-purple">¿Cómo te gusta que te llamen?</h2>
            <label className="f" style={{ textAlign: 'left' }}>Nombre</label>
            <input className="inp" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" />
            <label className="f" style={{ textAlign: 'left' }}>¿Cuándo naciste?</label>
            <div className="cotizador-bday">
              <select className="sel" value={dia} onChange={(e) => setDia(e.target.value)}>
                <option value="">Día</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
              <select className="sel" value={mes} onChange={(e) => setMes(e.target.value)}>
                <option value="">Mes</option>
                {MESES.map((name, i) => <option key={name} value={i}>{name}</option>)}
              </select>
            </div>
            <div className="cotizador-avatar">
              <div className="ph">{foto ? <img src={foto} alt="" /> : '🙂'}</div>
              <div>
                <b>Foto (opcional)</b>
                <small className="block text-purple/60">Aparece en tu propuesta PDF.</small>
                <label className="text-fuchsia text-sm font-semibold cursor-pointer">
                  Subir foto
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      const reader = new FileReader()
                      reader.onload = (ev) => setFoto(ev.target.result)
                      reader.readAsDataURL(file)
                    }}
                  />
                </label>
              </div>
            </div>
            <button className="btn-primary mt-6 w-full justify-center" disabled={!canLogin} onClick={() => setLogged(true)}>
              Entrar
            </button>
          </div>
        </div>
      )}

      {step === 0 && (
        <div className="cotizador-hero">
          <span className="cotizador-kicker">Hola, <b>{nombre || 'alma'}</b></span>
          <h1 className="display text-purple">
            Deja de repetir <em className="italic text-fuchsia">la misma historia</em>
          </h1>
          <p className="cotizador-sub mt-5">Arma tu propuesta con los precios de tu zona y confírmala por WhatsApp.</p>
          <div className="cotizador-benes">
            <div className="cotizador-bene"><h3>Entiende por qué se repite</h3><p>El patrón detrás de lo que vives en pareja, dinero y familia.</p></div>
            <div className="cotizador-bene"><h3>Suelta lo que no es tuyo</h3><p>Heridas y mandatos que arrastras sin darte cuenta.</p></div>
            <div className="cotizador-bene"><h3>Vuelve a ti</h3><p>Reconecta con quién eres y con lo que viniste a hacer.</p></div>
          </div>
          <button className="btn-primary w-full sm:w-auto" onClick={() => setStep(1)}>Empezar mi camino →</button>
        </div>
      )}

      {step === 1 && (
        <>
          <div className="cotizador-wizhead">
            <h2>Cuéntame de ti</h2>
            <p className="cotizador-sub">Con esto preparo tu propuesta y te escribo por WhatsApp.</p>
          </div>
          <div className="cotizador-steps">{[0, 1, 2, 3].map((i) => <div key={i} className={`cotizador-dot${i === 0 ? ' on' : ''}`} />)}</div>
          <div className="cotizador-panel">
            <label className="f">WhatsApp <span className="req">*</span></label>
            <div className="phone">
              <select className="sel" value={paisIdx} onChange={(e) => setPaisIdx(Number(e.target.value))}>
                {PAISES.map((p, i) => <option key={p.c} value={i}>{p.f} +{p.d}</option>)}
              </select>
              <input className="inp" type="tel" inputMode="numeric" placeholder="Tu número" value={tel} onChange={(e) => setTel(e.target.value)} />
            </div>
            {tel && !okTel && <p className="err">Escribe un número de WhatsApp válido.</p>}
            <label className="f">Correo <span className="req">*</span></label>
            <input className="inp" type="email" placeholder="tucorreo@ejemplo.com" value={mail} onChange={(e) => setMail(e.target.value)} />
            {mail && !okMail && <p className="err">Ese correo no parece válido.</p>}
            <label className="f">¿Qué te trae aquí hoy? <span className="req">*</span></label>
            <input className="inp" value={giro} onChange={(e) => setGiro(e.target.value)} placeholder="Ej: siento que repito lo mismo en mis relaciones…" />
          </div>
          <div className="cotizador-nav">
            <button className="btn-ghost" onClick={() => setStep(0)}>← Atrás</button>
            <button className="btn-primary" disabled={!canStep1} onClick={() => setStep(2)}>Siguiente →</button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="cotizador-wizhead">
            <h2>¿Qué quieres transformar?</h2>
            <p className="cotizador-sub">Precios según {region === REGION_CO ? 'Colombia (COP)' : 'Estados Unidos (USD)'}.</p>
          </div>
          <div className="cotizador-steps">{[0, 1, 2, 3].map((i) => <div key={i} className={`cotizador-dot${i <= 1 ? ' on' : ''}`} />)}</div>
          <div className="cotizador-panel">
            <div className="cotizador-svc">
              {quoteCatalog.map((s) => {
                const amount = quoteAmount(s.price, region)
                const active = sel.has(s.id)
                return (
                  <button key={s.id} type="button" className={`cotizador-svc-item${active ? ' sel' : ''}`} onClick={() => toggle(s.id)}>
                    <span className="cotizador-chk" />
                    <span className="cotizador-svc-body">
                      <h4>{s.title}</h4>
                      <p>{s.desc}</p>
                    </span>
                    <span className="cotizador-svc-price">{amount != null ? `+ ${formatQuoteAmount(amount, region)}` : 'Consultar'}</span>
                  </button>
                )
              })}
            </div>
            <div className="cotizador-mini">
              <div className="text-sm opacity-80">Tu inversión estimada</div>
              <div className="val">{totalLabel}</div>
            </div>
            {region !== REGION_CO && <p className="hint mt-3">En EE.UU. usamos el inicio del rango; el alcance se confirma en sesión.</p>}
          </div>
          <div className="cotizador-nav">
            <button className="btn-ghost" onClick={() => setStep(1)}>← Atrás</button>
            <button className="btn-primary" disabled={sel.size === 0} onClick={() => setStep(3)}>Ver mi propuesta →</button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <div className="cotizador-wizhead">
            <h2>Tu camino, tu inversión</h2>
            <p className="cotizador-sub">Todo claro. Tú decides hasta dónde llegar.</p>
          </div>
          <div className="cotizador-steps">{[0, 1, 2, 3].map((i) => <div key={i} className={`cotizador-dot${i <= 2 ? ' on' : ''}`} />)}</div>
          <div className="cotizador-panel">
            <div className="cotizador-total">
              <div className="text-sm text-purple/60">Inversión estimada</div>
              <div className="num">{totalLabel}</div>
            </div>
            <div className="mt-6">
              {chosen.map((i) => (
                <div key={i.id} className="cotizador-drow">
                  <span>{i.title}</span>
                  <span className="p">{formatQuoteAmount(quoteAmount(i.price, region), region)}</span>
                </div>
              ))}
              <div className="cotizador-drow sum">
                <span>Total</span>
                <span className="p">{totalLabel}</span>
              </div>
            </div>
          </div>
          <div className="cotizador-nav">
            <button className="btn-ghost" onClick={() => setStep(2)}>← Ajustar</button>
            <button className="btn-primary" onClick={() => setStep(4)}>Agendar mi sesión →</button>
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <div className="cotizador-wizhead">
            <h2>Agenda tu sesión</h2>
            <p className="cotizador-sub">Elige el día y la hora. Luego confirma por WhatsApp.</p>
          </div>
          <div className="cotizador-steps">{[0, 1, 2, 3].map((i) => <div key={i} className="cotizador-dot on" />)}</div>
          <div className="cotizador-panel">
            <div className="cotizador-calwrap">
              <div className="cotizador-cal">
                <div className="cotizador-calnav">
                  <button type="button" className="btn-ghost !px-3 !py-2" disabled={y === hoy.getFullYear() && m <= hoy.getMonth()} onClick={() => setCalRef(new Date(y, m - 1, 1))}>‹</button>
                  <b>{MESES[m]} {y}</b>
                  <button type="button" className="btn-ghost !px-3 !py-2" onClick={() => setCalRef(new Date(y, m + 1, 1))}>›</button>
                </div>
                <div className="cotizador-calgrid">
                  {['D', 'L', 'Ma', 'Mi', 'J', 'V', 'S'].map((d) => <div key={d} className="dow">{d === 'Ma' ? 'M' : d === 'Mi' ? 'M' : d}</div>)}
                  {days.map((d, i) => {
                    if (!d) return <div key={`e-${i}`} />
                    const date = new Date(y, m, d)
                    const off = date < hoy || date.getDay() === 0
                    const isSel = fecha && fecha.getTime() === date.getTime()
                    return (
                      <button
                        key={d}
                        type="button"
                        className={`cotizador-day${off ? ' off' : ''}${isSel ? ' sel' : ''}`}
                        disabled={off}
                        onClick={() => { setFecha(date); setHora(null) }}
                      >
                        {d}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div>
                <h4 className="font-serif text-xl text-purple mb-3">{fecha ? `Horarios para el ${fecha.getDate()} de ${MESES[fecha.getMonth()]}` : 'Elige un día primero'}</h4>
                <div className="cotizador-slotgrid">
                  {fecha && HORAS.map((h) => (
                    <button key={h} type="button" className={`cotizador-slot${hora === h ? ' sel' : ''}`} onClick={() => setHora(h)}>{h}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="cotizador-nav">
            <button className="btn-ghost" onClick={() => setStep(3)}>← Atrás</button>
            <button className="btn-primary" disabled={!(fecha && hora)} onClick={confirmar}>Confirmar mi sesión →</button>
          </div>
        </>
      )}

      {step === 5 && (
        <div className="cotizador-done">
          <p className="eyebrow">Reserva lista</p>
          <h2 className="mt-3 font-serif text-4xl text-purple">Tu lugar está reservado, {nombre}</h2>
          <p className="cotizador-sub mt-3">Descarga tu propuesta y confírmame por WhatsApp para asegurar el espacio.</p>
          <div className="cotizador-resumen">
            <div className="r"><span>Nombre</span><span>{nombre}</span></div>
            <div className="r"><span>WhatsApp</span><span>+{telFull}</span></div>
            <div className="r"><span>Correo</span><span>{mail}</span></div>
            <div className="r"><span>Qué te trae</span><span>{giro}</span></div>
            <div className="r"><span>Tu camino</span><span>{chosen.map((s) => s.title).join(', ')}</span></div>
            <div className="r"><span>Inversión</span><span>{totalLabel}</span></div>
            <div className="r"><span>Sesión</span><span>{fecha && hora ? `${fechaTxt(fecha)} · ${hora}` : ''}</span></div>
          </div>
          <div className="cotizador-acts">
            <button className="btn-primary w-full justify-center" onClick={enviarWhatsApp}>Confirmar por WhatsApp</button>
            <button className="btn-ghost w-full justify-center" onClick={descargarPDF}>Descargar mi propuesta en PDF</button>
            <button className="btn-ghost w-full justify-center" onClick={agendarCalendario}>Agregar a mi calendario</button>
          </div>
        </div>
      )}
    </div>
  )
}
