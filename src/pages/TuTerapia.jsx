import { useEffect, useMemo, useState } from 'react'
import { WHATSAPP, WHATSAPP_NUMBER } from '../data'
import { useLocale } from '../context/LocaleContext'
import { quizGift, quizQuestions, quizResult } from '../i18n/quiz'
import '../styles/tu-terapia.css'

const SHEET_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbyLXc5mnmF6dK8D2m62fzbCjjeamcmP3TG_GSkajgtpQh5isXpWHILGe86JaKCnEn9P/exec'

const PAISES = [
  { c: 'CO', d: '57', f: '🇨🇴' }, { c: 'MX', d: '52', f: '🇲🇽' }, { c: 'US', d: '1', f: '🇺🇸' },
  { c: 'ES', d: '34', f: '🇪🇸' }, { c: 'AR', d: '54', f: '🇦🇷' }, { c: 'PE', d: '51', f: '🇵🇪' },
  { c: 'CL', d: '56', f: '🇨🇱' }, { c: 'EC', d: '593', f: '🇪🇨' }, { c: 'VE', d: '58', f: '🇻🇪' },
  { c: 'GT', d: '502', f: '🇬🇹' }, { c: 'CR', d: '506', f: '🇨🇷' }, { c: 'PA', d: '507', f: '🇵🇦' },
  { c: 'BO', d: '591', f: '🇧🇴' }, { c: 'PY', d: '595', f: '🇵🇾' }, { c: 'UY', d: '598', f: '🇺🇾' },
  { c: 'HN', d: '504', f: '🇭🇳' }, { c: 'SV', d: '503', f: '🇸🇻' }, { c: 'NI', d: '505', f: '🇳🇮' },
  { c: 'DO', d: '1', f: '🇩🇴' }, { c: 'BR', d: '55', f: '🇧🇷' },
]

const PRIORITY = ['cons', 'acomp', 'astro', 'feng', 'akas', 'angel', 'taller']

function postSheet(payload) {
  try {
    fetch(SHEET_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    })
  } catch {
    /* fire-and-forget */
  }
}

function notifyNetlify(payload) {
  const body = new URLSearchParams()
  body.set('form-name', 'tu-terapia')
  Object.entries(payload).forEach(([k, v]) => body.set(k, String(v ?? '')))
  return fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
    signal: AbortSignal.timeout(4000),
  }).catch(() => {})
}

function GiftLine({ text }) {
  const parts = String(text).split(/\{\/?b\}/)
  return parts.map((part, idx) => (idx % 2 === 1 ? <b key={idx}>{part}</b> : <span key={idx}>{part}</span>))
}

export default function TuTerapia() {
  const { t, locale } = useLocale()
  const QUESTIONS = quizQuestions(locale)
  const months = t('quiz.months')
  const [screen, setScreen] = useState('intro')
  const [i, setI] = useState(0)
  const [answers, setAnswers] = useState([])
  const [leadId, setLeadId] = useState('')
  const [nombre, setNombre] = useState('')
  const [dia, setDia] = useState('')
  const [mes, setMes] = useState('')
  const [paisIdx, setPaisIdx] = useState(0)
  const [tel, setTel] = useState('')
  const [mail, setMail] = useState('')
  const [giro, setGiro] = useState('')

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mb_quiz_lead') || 'null')
      if (saved) {
        if (saved.nombre) setNombre(saved.nombre)
        if (saved.tel) setTel(saved.tel)
        if (saved.mail) setMail(saved.mail)
      }
    } catch {
      /* ignore */
    }
  }, [])

  const digits = tel.replace(/\D/g, '')
  const okTel = digits.length >= 7
  const okMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.trim())
  const canQuiz = nombre.trim().length >= 2 && okTel && okMail && giro.trim().length >= 2
  const pais = PAISES[paisIdx]
  const telFull = `${pais.d}${digits}`
  const nacimiento = dia !== '' && mes !== '' ? t('quiz.bornOnDate', { d: dia, m: months[Number(mes)] }) : ''

  const outcome = useMemo(() => {
    if (answers.length < QUESTIONS.length) return null
    const scores = Object.fromEntries(PRIORITY.map((k) => [k, 0]))
    answers.forEach((choiceIdx, qi) => {
      const w = QUESTIONS[qi].options[choiceIdx].w
      Object.entries(w).forEach(([k, n]) => {
        scores[k] = (scores[k] || 0) + n
      })
    })
    const ranked = PRIORITY.slice().sort((a, b) => {
      if (scores[b] !== scores[a]) return scores[b] - scores[a]
      return PRIORITY.indexOf(a) - PRIORITY.indexOf(b)
    })
    return { top: ranked[0], second: ranked[1], scores }
  }, [answers, QUESTIONS])

  function startQuiz() {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
    setLeadId(id)
    try {
      localStorage.setItem('mb_quiz_lead', JSON.stringify({ nombre: nombre.trim(), tel: digits, mail: mail.trim() }))
    } catch {
      /* ignore */
    }
    const payload = {
      leadId: id,
      fecha: new Date().toISOString(),
      nombre: nombre.trim(),
      whatsapp: `+${telFull}`,
      correo: mail.trim(),
      nacimiento,
      motivo: giro.trim(),
      estado: 'inició',
    }
    postSheet(payload)
    notifyNetlify(payload)
    setI(0)
    setAnswers([])
    setScreen('quiz')
    window.scrollTo(0, 0)
  }

  function choose(idx) {
    const next = answers.slice(0, i)
    next[i] = idx
    if (i < QUESTIONS.length - 1) {
      setAnswers(next)
      setI(i + 1)
      window.scrollTo(0, 0)
      return
    }
    setAnswers(next)
    const scores = Object.fromEntries(PRIORITY.map((k) => [k, 0]))
    next.forEach((choiceIdx, qi) => {
      Object.entries(QUESTIONS[qi].options[choiceIdx].w).forEach(([k, n]) => {
        scores[k] = (scores[k] || 0) + n
      })
    })
    const ranked = PRIORITY.slice().sort((a, b) => {
      if (scores[b] !== scores[a]) return scores[b] - scores[a]
      return PRIORITY.indexOf(a) - PRIORITY.indexOf(b)
    })
    const top = ranked[0]
    const second = ranked[1]
    const R = quizResult(top, locale)
    const seg = scores[second] > 0 ? quizResult(second, locale).name : ''
    postSheet({ leadId, terapia: R.name, segunda: seg, estado: 'completó' })
    notifyNetlify({
      nombre: nombre.trim(),
      email: mail.trim(),
      whatsapp: `+${telFull}`,
      giro: giro.trim(),
      terapia: R.name,
      segunda: seg,
    })
    setScreen('result')
    window.scrollTo(0, 0)
  }

  const Q = QUESTIONS[i]
  const R = outcome ? quizResult(outcome.top, locale) : null
  const gift = outcome ? quizGift(outcome.top, locale) : null
  const tallerGift = quizGift('taller', locale)
  const wantsGroup = Boolean(outcome && (outcome.scores.taller || 0) >= 3)
  const secondName = outcome && outcome.scores[outcome.second] > 0 ? quizResult(outcome.second, locale).name : ''

  const waHref = useMemo(() => {
    if (!R) return `https://wa.me/${WHATSAPP_NUMBER}`
    const lines = [
      t('quiz.wa1', { name: nombre.trim() }),
      t('quiz.wa2', { therapy: R.name }),
    ]
    if (giro.trim()) lines.push(t('quiz.wa3', { giro: giro.trim() }))
    if (wantsGroup) lines.push(t('quiz.waGroup'))
    let dl = t('quiz.wa4', { tel: telFull, mail: mail.trim() })
    if (nacimiento) dl += t('quiz.waBorn', { born: nacimiento })
    lines.push(`${dl}.`)
    lines.push(t('quiz.wa5'))
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`
  }, [R, nombre, giro, telFull, mail, nacimiento, t, wantsGroup])

  return (
    <div className="tu-terapia">
      {screen === 'intro' && (
        <section>
          <div className="divider">
            <span className="l" />
            <span className="d" />
            <span className="l" />
          </div>
          <h1 className="h1-intro">{t('quiz.title')}</h1>
          <p className="lead">{t('quiz.lead')}</p>
          <div className="giftnote">
            <span>
              <GiftLine text={t('quiz.gift')} />
            </span>
          </div>
          <button className="btn btn-wide" type="button" onClick={() => { setScreen('datos'); window.scrollTo(0, 0) }}>
            {t('quiz.start')}
          </button>
          <p className="meta">{t('quiz.meta')}</p>
        </section>
      )}

      {screen === 'datos' && (
        <section>
          <div className="progress-head">
            <span className="step">{t('quiz.step1')}</span>
            <span className="count">{t('quiz.almost')}</span>
          </div>
          <div className="bar"><span style={{ width: '20%' }} /></div>
          <h2 className="q">{t('quiz.tell')}</h2>
          <p className="lead lead-left">{t('quiz.tellLead')}</p>
          <label className="f first" htmlFor="dNombre">
            {t('quiz.call')} <span className="req">*</span>
          </label>
          <input className="inp" id="dNombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder={t('quiz.namePh')} autoComplete="name" />

          <label className="f">
            {t('quiz.born')} <small style={{ fontWeight: 400, color: 'var(--muted)' }}>{t('quiz.optional')}</small>
          </label>
          <div className="bday">
            <select className="sel" aria-label={t('quiz.day')} value={dia} onChange={(e) => setDia(e.target.value)}>
              <option value="">{t('quiz.day')}</option>
              {Array.from({ length: 31 }, (_, n) => (
                <option key={n + 1} value={n + 1}>{n + 1}</option>
              ))}
            </select>
            <select className="sel" aria-label={t('quiz.month')} value={mes} onChange={(e) => setMes(e.target.value)}>
              <option value="">{t('quiz.month')}</option>
              {months.map((x, idx) => (
                <option key={x} value={idx}>{x.charAt(0).toUpperCase() + x.slice(1)}</option>
              ))}
            </select>
          </div>
          <p className="hint">{t('quiz.bornHint')}</p>

          <label className="f" htmlFor="dTel">
            WhatsApp <span className="req">*</span>
          </label>
          <div className="phone">
            <select className="sel" aria-label="Código de país" value={paisIdx} onChange={(e) => setPaisIdx(Number(e.target.value))}>
              {PAISES.map((x, idx) => (
                <option key={x.c + x.d} value={idx}>{x.f} +{x.d}</option>
              ))}
            </select>
            <input className="inp" id="dTel" type="tel" inputMode="numeric" value={tel} onChange={(e) => setTel(e.target.value)} placeholder={t('quiz.phonePh')} autoComplete="tel" />
          </div>
          <p className="hint">{t('quiz.waHint')}</p>
          {digits.length > 0 && !okTel ? <p className="err">{t('quiz.badPhone')}</p> : null}

          <label className="f" htmlFor="dMail">
            {t('quiz.email')} <span className="req">*</span>
          </label>
          <input className="inp" id="dMail" type="email" value={mail} onChange={(e) => setMail(e.target.value)} placeholder={t('quiz.emailPh')} autoComplete="email" />
          <p className="hint">{t('quiz.mailHint')}</p>
          {mail.length > 0 && !okMail ? <p className="err">{t('quiz.badEmail')}</p> : null}

          <label className="f" htmlFor="dGiro">
            {t('quiz.reason')} <span className="req">*</span>
          </label>
          <input className="inp" id="dGiro" value={giro} onChange={(e) => setGiro(e.target.value)} placeholder={t('quiz.reasonPh')} />
          <p className="hint">{t('quiz.reasonHint')}</p>

          <button className="btn btn-wide" type="button" disabled={!canQuiz} onClick={startQuiz}>
            {t('quiz.toQuiz')}
          </button>
          <button className="back" type="button" onClick={() => setScreen('intro')}>{t('quiz.back')}</button>
          <p className="disclaimer">{t('quiz.privacy')}</p>
        </section>
      )}

      {screen === 'quiz' && (
        <section>
          <div className="progress-head">
            <span className="step">{t('quiz.step2', { step: Q.step })}</span>
            <span className="count">{t('quiz.qCount', { n: i + 1, total: QUESTIONS.length })}</span>
          </div>
          <div className="bar"><span style={{ width: `${20 + (i / QUESTIONS.length) * 80}%` }} /></div>
          <h2 className="q">{Q.q}</h2>
          <div className="opts">
            {Q.options.map((opt, idx) => (
              <button key={opt.t} className="opt" type="button" onClick={() => choose(idx)}>
                <span className="dot" />
                <span>{opt.t}</span>
              </button>
            ))}
          </div>
          <button
            className="back"
            type="button"
            onClick={() => {
              if (i > 0) setI(i - 1)
              else setScreen('datos')
            }}
          >
            {t('quiz.prev')}
          </button>
        </section>
      )}

      {screen === 'result' && R && (
        <section>
          <p className="res-eyebrow">{t('quiz.path')}</p>
          {nombre.trim() ? <p className="res-hi">{t('quiz.forYou', { name: nombre.trim() })}</p> : null}
          <div className="result-card">
            <h2 className="rname">{R.name}</h2>
            <p className="rtag">{R.tag}</p>
            <div className="rgold" />
            <p className="rdesc">{R.desc}</p>
            <div className="rwhy"><b>{t('quiz.why')}</b> {R.why}</div>
          </div>
          {secondName ? (
            <p className="secondary">
              {t('quiz.also')} <b>{secondName}</b>.
            </p>
          ) : null}

          {wantsGroup ? (
            <div className="taller-note">
              <div>
                <span><GiftLine text={t('quiz.tallerNote')} /></span>
                <a className="taller-dl" href={tallerGift.file} download={tallerGift.file.replace(/^\//, '')}>
                  {t('quiz.tallerDl')}
                </a>
              </div>
            </div>
          ) : null}

          <div className="gift">
            <div className="gk">{t('quiz.giftK')}</div>
            <div className="gt">{gift.title}</div>
            <p className="gd">{gift.desc}</p>
            <a className="dl" href={gift.file} download={gift.file.replace(/^\//, '')}>
              {t('quiz.openGuide')}
            </a>
          </div>

          <div className="cta">
            <a className="wa" href={waHref} target="_blank" rel="noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15.5c-2.5 0-4.9-.8-6.9-2.3a11 11 0 0 1-3.3-3.3C9.3 7.9 8.5 5.5 8.5 3a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 3 18.5 18.5 0 0 0 21 21.5a1.5 1.5 0 0 0 1.5-1.5V17a1.5 1.5 0 0 0-1.5-1.5z" />
              </svg>
              {t('quiz.write')}
            </a>
            <a className="alt" href={WHATSAPP} target="_blank" rel="noreferrer">{t('quiz.quote')}</a>
          </div>
          <p className="disclaimer">{t('quiz.disclaimer')}</p>
          <button
            className="restart"
            type="button"
            onClick={() => {
              setScreen('intro')
              setI(0)
              setAnswers([])
              setLeadId('')
            }}
          >
            {t('quiz.restart')}
          </button>
        </section>
      )}
    </div>
  )
}
