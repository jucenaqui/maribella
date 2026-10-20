import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { WHATSAPP } from '../data'
import { useLocale } from '../context/LocaleContext'
import {
  CITY_GROUPS,
  CITY_INDEX,
  EL_ORDER,
  EXAMPLE_CITY_ID,
  SIGN_DEFS,
  buildShareImage,
  compute,
  degText,
  drawWheel,
  elementCount,
  signOf,
} from '../lib/carta'
import '../styles/carta.css'

const WHEEL_COLORS = {
  fire: '#F7D3C2',
  earth: '#E9E0B8',
  air: '#F3E3EC',
  water: '#DCD3EA',
  line: '#D9CBA3',
  plum: '#502D73',
  soft: '#6E5888',
  flame: '#F2490C',
  fuchsia: '#BF4E83',
  gold: '#F2C335',
  paper: '#FFFCEB',
  sunInk: '#D98E04',
  glyph: '"Noto Sans Symbols", "Noto Sans Symbols 2", sans-serif',
  body: 'Outfit, "Work Sans", sans-serif',
  display: '"Cormorant Garamond", Georgia, serif',
}

export default function CartaAstral() {
  const { t, locale } = useLocale()
  const canvasRef = useRef(null)
  const [nombre, setNombre] = useState('')
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')
  const [sinHora, setSinHora] = useState(false)
  const [cityId, setCityId] = useState(EXAMPLE_CITY_ID)
  const [error, setError] = useState('')
  const [chart, setChart] = useState(null)
  const [busy, setBusy] = useState(false)

  const signNames = useMemo(
    () => Object.fromEntries(SIGN_DEFS.map((s) => [s.id, t(`carta.signs.${s.id}`)])),
    [t, locale],
  )

  const shareI18n = useMemo(
    () => ({
      signs: signNames,
      elements: {
        fuego: t('carta.elements.fuego'),
        tierra: t('carta.elements.tierra'),
        aire: t('carta.elements.aire'),
        agua: t('carta.elements.agua'),
      },
      mods: {
        cardinal: t('carta.mods.cardinal'),
        fixed: t('carta.mods.fixed'),
        mutable: t('carta.mods.mutable'),
      },
      shareKicker: t('carta.shareKicker'),
      pointLab: { sun: t('carta.sun'), moon: t('carta.moon'), asc: t('carta.asc') },
      pointShort: { sun: t('carta.sunShort'), moon: t('carta.moonShort'), asc: t('carta.ascShort') },
      unknown: t('carta.unknown'),
      needsTime: t('carta.needsTime'),
      dominant: t('carta.dominant'),
      balanced: t('carta.balanced'),
      meta: '',
    }),
    [signNames, t, locale],
  )

  const paint = (c) => {
    const cv = canvasRef.current
    if (!cv || !c) return
    const size = cv.width
    drawWheel(cv.getContext('2d'), size, c, WHEEL_COLORS, signNames)
  }

  useEffect(() => {
    if (chart) paint(chart)
  }, [chart, signNames, locale])

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    const name = nombre.trim()
    if (!name) return setError(t('carta.errName'))
    if (!fecha) return setError(t('carta.errDate'))
    if (!sinHora && !hora) return setError(t('carta.errTime'))
    const city = CITY_INDEX[cityId]
    if (!city) return setError(t('carta.errCity'))
    const c = compute({ nombre: name, fecha, hora, sinHora, city })
    setChart(c)
    requestAnimationFrame(() => paint(c))
  }

  const fillExample = () => {
    setNombre(t('carta.exampleName'))
    setFecha('1992-08-17')
    setHora('14:35')
    setSinHora(false)
    setCityId(EXAMPLE_CITY_ID)
    setError('')
    setChart(null)
  }

  const downloadPng = async () => {
    if (!chart) return
    setBusy(true)
    try {
      const blob = await buildShareImage({ ...chart, name: chart.name }, {
        ...shareI18n,
        meta: t('carta.shareMeta', {
          date: formatBirth(chart, t),
          city: chart.city.name,
          country: t(`carta.countries.${chart.city.country}`),
        }),
      })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = `maribella-${slug(chart.name)}.png`
      a.click()
      URL.revokeObjectURL(a.href)
    } finally {
      setBusy(false)
    }
  }

  const waHref = () => {
    if (!chart) return WHATSAPP
    const lines = [
      t('carta.wa1', { name: chart.name }),
      t('carta.wa2', {
        date: formatBirth(chart, t),
        city: chart.city.name,
        country: t(`carta.countries.${chart.city.country}`),
      }),
      `${t('carta.sun')}: ${signNames[signOf(chart.sun).id]} ${degText(chart.sun)}`,
      `${t('carta.moon')}: ${signNames[signOf(chart.moon).id]} ${degText(chart.moon)}${chart.moonAlt ? ` (${t('carta.moonRange')})` : ''}`,
      chart.asc !== null
        ? `${t('carta.asc')}: ${signNames[signOf(chart.asc).id]} ${degText(chart.asc)}`
        : `${t('carta.asc')}: ${t('carta.unknown')}`,
      t('carta.wa3'),
    ]
    return `${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`
  }

  const keys = chart
    ? [
        { id: 'sun', lon: chart.sun },
        { id: 'moon', lon: chart.moon },
        { id: 'asc', lon: chart.asc },
      ]
    : []
  const els = chart ? elementCount(chart) : null

  return (
    <div className="carta carta-page page-pad">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">{t('carta.eyebrow')}</p>
        <h1 className="display mt-3 text-purple">
          {t('carta.h1a')} <span className="italic text-fuchsia">{t('carta.h1b')}</span>
        </h1>
        <p className="mt-4 text-lg text-purple/75">{t('carta.lead')}</p>
      </div>

      <div className={`mx-auto mt-10 grid gap-6 ${chart ? 'max-w-5xl lg:grid-cols-2' : 'max-w-xl'}`}>
        <form className="carta-form carta-hero-card" onSubmit={onSubmit}>
          <p className="eyebrow">{t('carta.formKicker')}</p>
          <h2 className="mt-2 font-serif text-3xl text-purple">{t('carta.formTitle')}</h2>
          <p className="mt-2 text-sm text-purple/70">{t('carta.formLead')}</p>

          <div className="mt-6">
            <label htmlFor="carta-nombre">{t('carta.name')}</label>
            <input id="carta-nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} autoComplete="name" />
          </div>
          <div className="grid2 mt-4">
            <div>
              <label htmlFor="carta-fecha">{t('carta.date')}</label>
              <input id="carta-fecha" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
            </div>
            <div>
              <label htmlFor="carta-hora">{t('carta.time')}</label>
              <input id="carta-hora" type="time" value={hora} onChange={(e) => setHora(e.target.value)} disabled={sinHora} />
            </div>
          </div>
          <label className="chk mt-4">
            <input type="checkbox" checked={sinHora} onChange={(e) => setSinHora(e.target.checked)} />
            <span>{t('carta.unknownTime')}</span>
          </label>
          <div className="mt-4">
            <label htmlFor="carta-ciudad">{t('carta.city')}</label>
            <select id="carta-ciudad" value={cityId} onChange={(e) => setCityId(e.target.value)}>
              {CITY_GROUPS.map((g) => (
                <optgroup key={g.country} label={t(`carta.countries.${g.country}`)}>
                  {g.cities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          {error ? <p className="mt-3 text-sm text-fuchsia">{error}</p> : null}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button className="btn-primary" type="submit">
              {t('carta.see')}
            </button>
            <button className="btn-ghost" type="button" onClick={fillExample}>
              {t('carta.example')}
            </button>
          </div>
        </form>

        {chart ? (
          <div className="carta-result carta-hero-card is-on">
              <p className="eyebrow">{t('carta.resultKicker')}</p>
              <h2 className="mt-2 font-serif text-3xl text-purple">{chart.name}</h2>
              <p className="mt-1 text-sm text-purple/70">
                {formatBirth(chart, t)} · {chart.city.name}, {t(`carta.countries.${chart.city.country}`)}
              </p>
              <div className="carta-wheel-wrap mt-5">
                <canvas ref={canvasRef} width={640} height={640} className="mx-auto block w-full max-w-[420px]" />
                <div className="carta-legend">
                  <span>
                    <i className="carta-dot" style={{ background: '#F7D3C2' }} />
                    {t('carta.elements.fuego')}
                  </span>
                  <span>
                    <i className="carta-dot" style={{ background: '#E9E0B8' }} />
                    {t('carta.elements.tierra')}
                  </span>
                  <span>
                    <i className="carta-dot" style={{ background: '#F3E3EC' }} />
                    {t('carta.elements.aire')}
                  </span>
                  <span>
                    <i className="carta-dot" style={{ background: '#DCD3EA' }} />
                    {t('carta.elements.agua')}
                  </span>
                </div>
              </div>
              <div className="carta-keys mt-5">
                {keys.map((k) => {
                  if (k.lon === null) {
                    return (
                      <article key={k.id} className="carta-key">
                        <p className="lab">{t(`carta.${k.id}`)}</p>
                        <p className="sign">{t('carta.unknown')}</p>
                        <p className="deg">{t('carta.needsTime')}</p>
                      </article>
                    )
                  }
                  const s = signOf(k.lon)
                  return (
                    <article key={k.id} className="carta-key">
                      <p className="lab">{t(`carta.${k.id}`)}</p>
                      <p className="sign">
                        {s.glyph} {signNames[s.id]}
                      </p>
                      <p className="deg">{degText(k.lon)}</p>
                      <p className="meta">
                        {t(`carta.elements.${s.e}`)} · {t(`carta.mods.${s.m}`)}
                      </p>
                    </article>
                  )
                })}
              </div>
              {chart.moonAlt ? (
                <p className="carta-note mt-4">
                  {t('carta.moonNote', {
                    a: t(`carta.signs.${chart.moonAlt[0].id}`),
                    b: t(`carta.signs.${chart.moonAlt[1].id}`),
                  })}
                </p>
              ) : null}
              {els ? (
                <div className="mt-5">
                  <p className="text-sm text-purple/80">
                    {els.top ? `${t('carta.dominant')}: ${t(`carta.elements.${els.top}`)}` : t('carta.balanced')}
                  </p>
                  <div className="carta-elbar mt-3">
                    {EL_ORDER.map((e) => (
                      <div key={e} className="carta-el">
                        <b>{els.cnt[e]}</b>
                        <span>{t(`carta.elements.${e}`)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              <p className="mt-5 text-sm leading-relaxed text-purple/70">{t('carta.honesty')}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
                <button className="btn-primary carta-btn-gold" type="button" onClick={downloadPng} disabled={busy}>
                  {busy ? t('carta.preparing') : t('carta.download')}
                </button>
                <a className="btn-primary carta-btn-wa text-center" href={waHref()} target="_blank" rel="noreferrer">
                  {t('carta.waCta')}
                </a>
                <Link className="btn-ghost text-center" to="/servicios#astrologia">
                  {t('carta.sessionCta')}
                </Link>
              </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function formatBirth(c, t) {
  const months = t('carta.months')
  const time = c.known ? ` · ${String(c.hh).padStart(2, '0')}:${String(c.mm).padStart(2, '0')}` : ''
  return t('carta.bornOn', { d: c.d, m: months[c.m - 1], y: c.y }) + time
}

function slug(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
