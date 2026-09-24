import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { jsPDF } from 'jspdf'
import { useRegion } from '../context/RegionContext'
import { useLocale } from '../context/LocaleContext'
import { useCatalog } from '../lib/catalog'
import { WHATSAPP_NUMBER } from '../data'
import { formatQuoteAmount, quoteAmount, REGION_CO } from '../lib/region'
import { dateKey, formatSlotLabel, icsStamp, isPastDay, SESSION_MINUTES } from '../lib/schedule'
import { fetchCalSlots } from '../lib/cal'
import '../styles/cotizador.css'

const PAISES = [
  { c: 'CO', d: '57', f: '🇨🇴' }, { c: 'MX', d: '52', f: '🇲🇽' }, { c: 'US', d: '1', f: '🇺🇸' },
  { c: 'ES', d: '34', f: '🇪🇸' }, { c: 'AR', d: '54', f: '🇦🇷' }, { c: 'PE', d: '51', f: '🇵🇪' },
  { c: 'CL', d: '56', f: '🇨🇱' }, { c: 'EC', d: '593', f: '🇪🇨' }, { c: 'VE', d: '58', f: '🇻🇪' },
]

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
  const { t, locale } = useLocale()
  const { quoteCatalog } = useCatalog()
  const months = t('quote.months')
  const dow = t('quote.dow')
  const ask = t('price.ask')
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
  const [sel, setSel] = useState(() => new Set(preset ? [preset] : []))
  const [calRef, setCalRef] = useState(() => {
    const d = new Date()
    d.setDate(1)
    return d
  })
  const [fecha, setFecha] = useState(null)
  const [hora, setHora] = useState(null)
  const [slotMap, setSlotMap] = useState({})
  const [slotsReady, setSlotsReady] = useState(false)

  useEffect(() => {
    setPaisIdx(region === REGION_CO ? 0 : 2)
  }, [region])

  useEffect(() => {
    if (preset) setSel(new Set([preset]))
  }, [preset])

  useEffect(() => {
    if (step < 4) return undefined
    const start = `${calRef.getFullYear()}-${String(calRef.getMonth() + 1).padStart(2, '0')}-01`
    const last = new Date(calRef.getFullYear(), calRef.getMonth() + 1, 0).getDate()
    const end = `${calRef.getFullYear()}-${String(calRef.getMonth() + 1).padStart(2, '0')}-${String(last).padStart(2, '0')}`
    let live = true
    setSlotsReady(false)
    fetchCalSlots(start, end).then((map) => {
      if (!live) return
      setSlotMap(map)
      setSlotsReady(true)
    })
    return () => {
      live = false
    }
  }, [step, calRef])

  const pais = PAISES[paisIdx]
  const telFull = `${pais.d}${tel.replace(/\D/g, '')}`
  const cumple = dia !== '' && mes !== '' ? t('quote.bornOnDate', { d: dia, m: months[Number(mes)] }) : ''
  const okTel = tel.replace(/\D/g, '').length >= 7
  const okMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.trim())
  const okGiro = giro.trim().length >= 2
  const canLogin = nombre.trim() && dia !== '' && mes !== ''
  const canStep1 = okTel && okMail && okGiro

  const horaLabel = formatSlotLabel(hora)
  const daySlots = fecha ? (slotMap[dateKey(fecha)] || []) : []
  const chosen = useMemo(() => quoteCatalog.filter((s) => sel.has(s.id)), [quoteCatalog, sel])
  const total = chosen.reduce((sum, s) => sum + (quoteAmount(s.price, region) || 0), 0)
  const totalLabel = formatQuoteAmount(total, region, ask)

  function money(price) {
    return formatQuoteAmount(quoteAmount(price, region), region, ask)
  }

  function toggle(id) {
    setSel((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function fechaTxt(d) {
    return t('quote.dateFull', { d: d.getDate(), m: months[d.getMonth()], y: d.getFullYear() })
  }

  function resumenTexto() {
    const servs = chosen.map((i) => `• ${i.title} (${money(i.price)})`).join('\n')
    return `${t('quote.waBody')}\n\n` +
      `${t('quote.name')}: ${nombre}\n${t('quote.bornOn')}: ${cumple}\nWhatsApp: +${telFull}\n${t('quote.email')}: ${mail}\n` +
      `${t('quote.reasonLine')}: ${giro}\n\n${t('quote.myPath')}:\n${servs || `• ${t('quote.pending')}`}\n\n` +
      `${t('quote.investLine')}: ${totalLabel}\n${t('quote.sessionLine')}: ${fecha ? fechaTxt(fecha) : ''} ${t('quote.at')} ${horaLabel || ''}`
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
      sesion: fecha && hora ? `${fechaTxt(fecha)} · ${horaLabel}` : '',
    })
    setStep(5)
  }

  function enviarWhatsApp() {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(resumenTexto())}`, '_blank')
  }

  function agendarCalendario() {
    if (!fecha || !hora) return
    const picked = daySlots.find((slot) => slot.start === hora)
    const startStamp = icsStamp(hora)
    const endStamp = picked?.end ? icsStamp(picked.end) : icsStamp(hora, SESSION_MINUTES)
    const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Maribella//${locale.toUpperCase()}\nBEGIN:VEVENT\n` +
      `UID:${Date.now()}@maribellaconexion.com\nDTSTAMP:${icsStamp(new Date().toISOString())}\n` +
      `DTSTART;TZID=America/Bogota:${startStamp}\nDTEND;TZID=America/Bogota:${endStamp}\n` +
      `SUMMARY:${t('quote.icsSummary')}\nDESCRIPTION:${giro}. ${t('quote.icsContact')}: ${mail} / +${telFull}\nEND:VEVENT\nEND:VCALENDAR`
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
    doc.text(t('quote.tagline'), foto ? 112 : 40, 78)
    let y = 160
    doc.setTextColor(42, 24, 56)
    doc.setFont('times', 'bold')
    doc.setFontSize(17)
    doc.text(t('quote.pdfPath', { name: nombre }), 40, y)
    y += 26
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.setTextColor(122, 106, 133)
    doc.text(`WhatsApp: +${telFull}   ·   ${t('quote.email')}: ${mail}`, 40, y)
    y += 16
    doc.text(`${t('quote.born')}: ${cumple}`, 40, y)
    y += 34
    doc.setDrawColor(231, 221, 207)
    doc.line(40, y, W - 40, y)
    y += 24
    doc.setTextColor(42, 24, 56)
    doc.setFont('times', 'bold')
    doc.setFontSize(13)
    doc.text(t('quote.pdfIncludes'), 40, y)
    y += 22
    chosen.forEach((i) => {
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(42, 24, 56)
      doc.text(i.title, 48, y)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(214, 35, 107)
      doc.text(money(i.price), W - 48, y, { align: 'right' })
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
    doc.text(t('quote.pdfInvest'), 48, y)
    doc.setTextColor(214, 35, 107)
    doc.text(totalLabel, W - 48, y, { align: 'right' })
    y += 38
    if (fecha && hora) {
      doc.setFillColor(251, 247, 240)
      doc.roundedRect(40, y, W - 80, 56, 10, 10, 'F')
      doc.setTextColor(42, 24, 56)
      doc.setFont('times', 'bold')
      doc.setFontSize(12)
      doc.text(t('quote.pdfSession'), 56, y + 24)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(122, 106, 133)
      doc.text(`${fechaTxt(fecha)} · ${horaLabel}`, 56, y + 42)
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
            <p className="eyebrow">{t('quote.before')}</p>
            <h2 className="mt-3 font-serif text-3xl text-purple">{t('quote.howName')}</h2>
            <label className="f" style={{ textAlign: 'left' }}>{t('quote.name')}</label>
            <input className="inp" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder={t('quote.namePh')} />
            <label className="f" style={{ textAlign: 'left' }}>{t('quote.born')}</label>
            <div className="cotizador-bday">
              <select className="sel" value={dia} onChange={(e) => setDia(e.target.value)}>
                <option value="">{t('quote.day')}</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
              <select className="sel" value={mes} onChange={(e) => setMes(e.target.value)}>
                <option value="">{t('quote.month')}</option>
                {months.map((name, i) => <option key={name} value={i}>{name}</option>)}
              </select>
            </div>
            <div className="cotizador-avatar">
              <div className="ph">{foto ? <img src={foto} alt="" /> : '🙂'}</div>
              <div>
                <b>{t('quote.photo')}</b>
                <small className="block text-purple/60">{t('quote.photoHint')}</small>
                <label className="text-fuchsia text-sm font-semibold cursor-pointer">
                  {t('quote.upload')}
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
              {t('quote.enter')}
            </button>
          </div>
        </div>
      )}

      {step === 0 && (
        <div className="cotizador-hero">
          <span className="cotizador-kicker">{t('quote.hello')} <b>{nombre || t('quote.soul')}</b></span>
          <h1 className="display text-purple">
            {t('quote.h1a')} <em className="italic text-fuchsia">{t('quote.h1b')}</em>
          </h1>
          <p className="cotizador-sub mt-5">{t('quote.heroLead')}</p>
          <div className="cotizador-benes">
            <div className="cotizador-bene"><h3>{t('quote.b1t')}</h3><p>{t('quote.b1d')}</p></div>
            <div className="cotizador-bene"><h3>{t('quote.b2t')}</h3><p>{t('quote.b2d')}</p></div>
            <div className="cotizador-bene"><h3>{t('quote.b3t')}</h3><p>{t('quote.b3d')}</p></div>
          </div>
          <button className="btn-primary w-full sm:w-auto" onClick={() => setStep(1)}>{t('quote.start')}</button>
        </div>
      )}

      {step === 1 && (
        <>
          <div className="cotizador-wizhead">
            <h2>{t('quote.aboutYou')}</h2>
            <p className="cotizador-sub">{t('quote.aboutLead')}</p>
          </div>
          <div className="cotizador-steps">{[0, 1, 2, 3].map((i) => <div key={i} className={`cotizador-dot${i === 0 ? ' on' : ''}`} />)}</div>
          <div className="cotizador-panel">
            <label className="f">WhatsApp <span className="req">*</span></label>
            <div className="phone">
              <select className="sel" value={paisIdx} onChange={(e) => setPaisIdx(Number(e.target.value))}>
                {PAISES.map((p, i) => <option key={p.c} value={i}>{p.f} +{p.d}</option>)}
              </select>
              <input className="inp" type="tel" inputMode="numeric" placeholder={t('quote.phonePh')} value={tel} onChange={(e) => setTel(e.target.value)} />
            </div>
            {tel && !okTel && <p className="err">{t('quote.badPhone')}</p>}
            <label className="f">{t('quote.email')} <span className="req">*</span></label>
            <input className="inp" type="email" placeholder="tucorreo@ejemplo.com" value={mail} onChange={(e) => setMail(e.target.value)} />
            {mail && !okMail && <p className="err">{t('quote.badEmail')}</p>}
            <label className="f">{t('quote.reason')} <span className="req">*</span></label>
            <input className="inp" value={giro} onChange={(e) => setGiro(e.target.value)} placeholder={t('quote.reasonPh')} />
          </div>
          <div className="cotizador-nav">
            <button className="cotizador-back" onClick={() => setStep(0)}>{t('quote.back')}</button>
            <button className="btn-primary" disabled={!canStep1} onClick={() => setStep(2)}>{t('quote.next')}</button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="cotizador-wizhead">
            <h2>{t('quote.transform')}</h2>
            <p className="cotizador-sub">{region === REGION_CO ? t('quote.pricesCo') : t('quote.pricesUs')}</p>
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
                    <span className="cotizador-svc-price">{amount != null ? `+ ${formatQuoteAmount(amount, region, ask)}` : ask}</span>
                  </button>
                )
              })}
            </div>
            <div className="cotizador-mini">
              <div className="text-sm opacity-80">{t('quote.estimated')}</div>
              <div className="val">{totalLabel}</div>
            </div>
            {region !== REGION_CO && <p className="hint mt-3">{t('quote.usHint')}</p>}
          </div>
          <div className="cotizador-nav">
            <button className="cotizador-back" onClick={() => setStep(1)}>{t('quote.back')}</button>
            <button className="btn-primary" disabled={sel.size === 0} onClick={() => setStep(3)}>{t('quote.seeQuote')}</button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <div className="cotizador-wizhead">
            <h2>{t('quote.pathTitle')}</h2>
            <p className="cotizador-sub">{t('quote.pathLead')}</p>
          </div>
          <div className="cotizador-steps">{[0, 1, 2, 3].map((i) => <div key={i} className={`cotizador-dot${i <= 2 ? ' on' : ''}`} />)}</div>
          <div className="cotizador-panel">
            <div className="cotizador-total">
              <div className="text-sm text-purple/60">{t('quote.invest')}</div>
              <div className="num">{totalLabel}</div>
            </div>
            <div className="mt-6">
              {chosen.map((i) => (
                <div key={i.id} className="cotizador-drow">
                  <span>{i.title}</span>
                  <span className="p">{money(i.price)}</span>
                </div>
              ))}
              <div className="cotizador-drow sum">
                <span>{t('quote.total')}</span>
                <span className="p">{totalLabel}</span>
              </div>
            </div>
          </div>
          <div className="cotizador-nav">
            <button className="cotizador-back" onClick={() => setStep(2)}>{t('quote.adjust')}</button>
            <button className="btn-primary" onClick={() => setStep(4)}>{t('quote.book')}</button>
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <div className="cotizador-wizhead">
            <h2>{t('quote.agenda')}</h2>
            <p className="cotizador-sub">{t('quote.agendaLead')}</p>
          </div>
          <div className="cotizador-steps">{[0, 1, 2, 3].map((i) => <div key={i} className="cotizador-dot on" />)}</div>
          <div className="cotizador-panel">
            <div className="cotizador-calwrap">
              <div className="cotizador-cal">
                <div className="cotizador-calnav">
                  <button
                    type="button"
                    className="cotizador-calbtn"
                    aria-label="Previous month"
                    disabled={y === hoy.getFullYear() && m <= hoy.getMonth()}
                    onClick={() => setCalRef(new Date(y, m - 1, 1))}
                  >
                    ‹
                  </button>
                  <b>{months[m]} {y}</b>
                  <button
                    type="button"
                    className="cotizador-calbtn"
                    aria-label="Next month"
                    onClick={() => setCalRef(new Date(y, m + 1, 1))}
                  >
                    ›
                  </button>
                </div>
                <div className="cotizador-calgrid">
                  {dow.map((d, i) => <div key={`${d}-${i}`} className="dow">{d}</div>)}
                  {days.map((d, i) => {
                    if (!d) return <div key={`e-${i}`} />
                    const date = new Date(y, m, d)
                    const key = dateKey(date)
                    const off = isPastDay(date, hoy) || (slotsReady && !(slotMap[key]?.length))
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
                <h4 className="font-serif text-xl text-purple mb-3">
                  {fecha ? t('quote.slotsFor', { d: fecha.getDate(), m: months[fecha.getMonth()] }) : t('quote.pickDay')}
                </h4>
                <div className="cotizador-slotgrid">
                  {fecha && daySlots.map((slot) => (
                    <button
                      key={slot.start}
                      type="button"
                      className={`cotizador-slot${hora === slot.start ? ' sel' : ''}`}
                      onClick={() => setHora(slot.start)}
                    >
                      {formatSlotLabel(slot.start)}
                    </button>
                  ))}
                </div>
                {fecha && slotsReady && daySlots.length === 0 ? (
                  <p className="hint mt-3">{t('quote.noSlots')}</p>
                ) : null}
              </div>
            </div>
          </div>
          <div className="cotizador-nav">
            <button className="cotizador-back" onClick={() => setStep(3)}>{t('quote.back')}</button>
            <button className="btn-primary" disabled={!(fecha && hora)} onClick={confirmar}>{t('quote.confirm')}</button>
          </div>
        </>
      )}

      {step === 5 && (
        <div className="cotizador-done">
          <p className="eyebrow">{t('quote.ready')}</p>
          <h2 className="mt-3 font-serif text-4xl text-purple">{t('quote.reserved', { name: nombre })}</h2>
          <p className="cotizador-sub mt-3">{t('quote.readyLead')}</p>
          <div className="cotizador-resumen">
            <div className="r"><span>{t('quote.name')}</span><span>{nombre}</span></div>
            <div className="r"><span>WhatsApp</span><span>+{telFull}</span></div>
            <div className="r"><span>{t('quote.email')}</span><span>{mail}</span></div>
            <div className="r"><span>{t('quote.whatBrings')}</span><span>{giro}</span></div>
            <div className="r"><span>{t('quote.yourPath')}</span><span>{chosen.map((s) => s.title).join(', ')}</span></div>
            <div className="r"><span>{t('quote.invest')}</span><span>{totalLabel}</span></div>
            <div className="r"><span>{t('quote.session')}</span><span>{fecha && hora ? `${fechaTxt(fecha)} · ${horaLabel}` : ''}</span></div>
          </div>
          <div className="cotizador-acts">
            <button className="btn-primary w-full justify-center" onClick={enviarWhatsApp}>{t('quote.waConfirm')}</button>
            <button className="btn-ghost w-full justify-center" onClick={descargarPDF}>{t('quote.pdf')}</button>
            <button className="btn-ghost w-full justify-center" onClick={agendarCalendario}>{t('quote.calendar')}</button>
          </div>
        </div>
      )}
    </div>
  )
}
