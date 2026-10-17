const RAD = Math.PI / 180
const norm = (x) => ((x % 360) + 360) % 360
const sind = (x) => Math.sin(x * RAD)
const cosd = (x) => Math.cos(x * RAD)

export const SIGN_DEFS = [
  { id: 'aries', glyph: '♈︎', e: 'fuego', m: 'cardinal' },
  { id: 'taurus', glyph: '♉︎', e: 'tierra', m: 'fixed' },
  { id: 'gemini', glyph: '♊︎', e: 'aire', m: 'mutable' },
  { id: 'cancer', glyph: '♋︎', e: 'agua', m: 'cardinal' },
  { id: 'leo', glyph: '♌︎', e: 'fuego', m: 'fixed' },
  { id: 'virgo', glyph: '♍︎', e: 'tierra', m: 'mutable' },
  { id: 'libra', glyph: '♎︎', e: 'aire', m: 'cardinal' },
  { id: 'scorpio', glyph: '♏︎', e: 'agua', m: 'fixed' },
  { id: 'sagittarius', glyph: '♐︎', e: 'fuego', m: 'mutable' },
  { id: 'capricorn', glyph: '♑︎', e: 'tierra', m: 'cardinal' },
  { id: 'aquarius', glyph: '♒︎', e: 'aire', m: 'fixed' },
  { id: 'pisces', glyph: '♓︎', e: 'agua', m: 'mutable' },
]

export const EL_ORDER = ['fuego', 'tierra', 'aire', 'agua']

export function signOf(lon) {
  return SIGN_DEFS[Math.floor(norm(lon) / 30)]
}

export function degText(lon) {
  const d = lon % 30
  const g = Math.floor(d)
  const m = Math.floor((d - g) * 60)
  return `${g}° ${String(m).padStart(2, '0')}′`
}

function julianDay(utcMs) {
  return utcMs / 86400000 + 2440587.5
}

function sunLongitude(jd) {
  const d = jd - 2451545.0
  const L = norm(280.460 + 0.9856474 * d)
  const g = norm(357.528 + 0.9856003 * d)
  return norm(L + 1.915 * sind(g) + 0.020 * sind(2 * g))
}

function moonLongitude(jd) {
  const d = jd - 2451545.0
  const L = norm(218.3165 + 13.17639648 * d)
  const M = norm(134.9634 + 13.06499295 * d)
  const Ms = norm(357.5291 + 0.98560028 * d)
  const D = norm(297.8502 + 12.19074912 * d)
  const F = norm(93.2721 + 13.22935024 * d)
  return norm(
    L +
      6.289 * sind(M) +
      1.274 * sind(2 * D - M) +
      0.658 * sind(2 * D) +
      0.214 * sind(2 * M) -
      0.186 * sind(Ms) -
      0.114 * sind(2 * F) +
      0.059 * sind(2 * D - 2 * M) +
      0.057 * sind(2 * D - Ms - M) +
      0.053 * sind(2 * D + M) +
      0.046 * sind(2 * D - Ms) -
      0.041 * sind(Ms - M) -
      0.035 * sind(D) -
      0.030 * sind(M + Ms),
  )
}

function ascendant(jd, lat, lon) {
  const d = jd - 2451545.0
  const T = d / 36525
  const gmst = norm(280.46061837 + 360.98564736629 * d + 0.000387933 * T * T)
  const ramc = norm(gmst + lon)
  const eps = 23.4393 - 0.0130 * T
  const y = cosd(ramc)
  const x = -(sind(ramc) * cosd(eps) + Math.tan(lat * RAD) * sind(eps))
  return norm(Math.atan2(y, x) / RAD)
}

function tzOffsetMin(utcMs, tz) {
  const f = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  const p = {}
  for (const part of f.formatToParts(new Date(utcMs))) p[part.type] = part.value
  const asUTC = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute, +p.second)
  return (asUTC - utcMs) / 60000
}

function localToUTC(y, m, d, hh, mm, tz) {
  const guess = Date.UTC(y, m - 1, d, hh, mm)
  let utc = guess - tzOffsetMin(guess, tz) * 60000
  utc = guess - tzOffsetMin(utc, tz) * 60000
  return utc
}

const RAW = {
  Colombia: [
    ['Bogotá', 4.711, -74.072],
    ['Medellín', 6.244, -75.581],
    ['Cali', 3.452, -76.532],
    ['Barranquilla', 10.964, -74.796],
    ['Cartagena', 10.391, -75.479],
    ['Bucaramanga', 7.119, -73.122],
    ['Cúcuta', 7.893, -72.507],
    ['Pereira', 4.813, -75.696],
    ['Manizales', 5.07, -75.517],
    ['Armenia', 4.534, -75.681],
    ['Ibagué', 4.438, -75.232],
    ['Santa Marta', 11.241, -74.199],
    ['Villavicencio', 4.142, -73.626],
    ['Pasto', 1.214, -77.281],
    ['Neiva', 2.927, -75.282],
    ['Montería', 8.748, -75.881],
    ['Popayán', 2.444, -76.614],
    ['Tunja', 5.535, -73.367],
    ['Valledupar', 10.463, -73.253],
    ['Sincelejo', 9.304, -75.397],
    ['Riohacha', 11.544, -72.907],
    ['Quibdó', 5.694, -76.661],
    ['Florencia', 1.614, -75.606],
    ['Yopal', 5.337, -72.395],
    ['Rionegro', 6.155, -75.374],
    ['Palmira', 3.539, -76.303],
    ['Tuluá', 4.084, -76.195],
    ['Girardot', 4.303, -74.803],
    ['Envigado', 6.171, -75.583],
    ['Bello', 6.337, -75.558],
  ].map((c) => [...c, 'America/Bogota']),
  Argentina: [
    ['Buenos Aires', -34.604, -58.382],
    ['Córdoba', -31.42, -64.188],
    ['Rosario', -32.944, -60.65],
    ['Mendoza', -32.889, -68.845],
  ].map((c) => [...c, 'America/Argentina/Buenos_Aires']),
  Bolivia: [
    ['La Paz', -16.49, -68.119],
    ['Santa Cruz', -17.783, -63.182],
    ['Cochabamba', -17.389, -66.157],
  ].map((c) => [...c, 'America/La_Paz']),
  Brasil: [
    ['São Paulo', -23.551, -46.633],
    ['Río de Janeiro', -22.907, -43.173],
    ['Brasilia', -15.794, -47.882],
  ].map((c) => [...c, 'America/Sao_Paulo']),
  Chile: [
    ['Santiago', -33.449, -70.669],
    ['Valparaíso', -33.047, -71.613],
    ['Concepción', -36.827, -73.05],
    ['Antofagasta', -23.65, -70.4],
  ].map((c) => [...c, 'America/Santiago']),
  CostaRica: [['San José', 9.928, -84.091, 'America/Costa_Rica']],
  Cuba: [['La Habana', 23.113, -82.366, 'America/Havana']],
  Ecuador: [
    ['Quito', -0.18, -78.468],
    ['Guayaquil', -2.171, -79.922],
    ['Cuenca', -2.901, -79.005],
  ].map((c) => [...c, 'America/Guayaquil']),
  ElSalvador: [['San Salvador', 13.692, -89.218, 'America/El_Salvador']],
  Espana: [
    ['Madrid', 40.417, -3.704],
    ['Barcelona', 41.385, 2.173],
    ['Valencia', 39.47, -0.376],
    ['Sevilla', 37.389, -5.984],
    ['Málaga', 36.721, -4.421],
    ['Bilbao', 43.263, -2.935],
    ['Zaragoza', 41.649, -0.889],
    ['Alicante', 38.346, -0.491],
    ['Murcia', 37.992, -1.131],
    ['Palma de Mallorca', 39.57, 2.65],
    ['Valladolid', 41.652, -4.724],
    ['Granada', 37.177, -3.599],
  ]
    .map((c) => [...c, 'Europe/Madrid'])
    .concat([
      ['Las Palmas de Gran Canaria', 28.124, -15.43, 'Atlantic/Canary'],
      ['Santa Cruz de Tenerife', 28.464, -16.252, 'Atlantic/Canary'],
    ]),
  EstadosUnidos: [
    ['Miami', 25.762, -80.192, 'America/New_York'],
    ['Nueva York', 40.713, -74.006, 'America/New_York'],
    ['Orlando', 28.538, -81.379, 'America/New_York'],
    ['Houston', 29.76, -95.37, 'America/Chicago'],
    ['Chicago', 41.878, -87.63, 'America/Chicago'],
    ['Los Ángeles', 34.052, -118.244, 'America/Los_Angeles'],
  ],
  Guatemala: [['Ciudad de Guatemala', 14.634, -90.507, 'America/Guatemala']],
  Honduras: [
    ['Tegucigalpa', 14.072, -87.193],
    ['San Pedro Sula', 15.505, -88.025],
  ].map((c) => [...c, 'America/Tegucigalpa']),
  Mexico: [
    ['Ciudad de México', 19.433, -99.133],
    ['Guadalajara', 20.66, -103.35],
    ['Monterrey', 25.687, -100.316],
    ['Puebla', 19.041, -98.206],
    ['Querétaro', 20.588, -100.39],
    ['Mérida', 20.967, -89.623],
    ['León', 21.122, -101.684],
  ]
    .map((c) => [...c, 'America/Mexico_City'])
    .concat([
      ['Tijuana', 32.514, -117.038, 'America/Tijuana'],
      ['Cancún', 21.161, -86.851, 'America/Cancun'],
    ]),
  Nicaragua: [['Managua', 12.115, -86.236, 'America/Managua']],
  Panama: [['Ciudad de Panamá', 8.983, -79.517, 'America/Panama']],
  Paraguay: [['Asunción', -25.264, -57.576, 'America/Asuncion']],
  Peru: [
    ['Lima', -12.046, -77.043],
    ['Arequipa', -16.409, -71.537],
    ['Trujillo', -8.112, -79.029],
    ['Cusco', -13.532, -71.967],
  ].map((c) => [...c, 'America/Lima']),
  PuertoRico: [['San Juan', 18.466, -66.106, 'America/Puerto_Rico']],
  RepublicaDominicana: [
    ['Santo Domingo', 18.486, -69.931],
    ['Santiago de los Caballeros', 19.451, -70.697],
  ].map((c) => [...c, 'America/Santo_Domingo']),
  Uruguay: [['Montevideo', -34.901, -56.165, 'America/Montevideo']],
  Venezuela: [
    ['Caracas', 10.481, -66.904],
    ['Maracaibo', 10.654, -71.64],
    ['Valencia (Venezuela)', 10.162, -68.008],
    ['Barquisimeto', 10.068, -69.324],
  ].map((c) => [...c, 'America/Caracas']),
}

export const COUNTRY_ORDER = Object.keys(RAW)

export const CITY_GROUPS = COUNTRY_ORDER.map((country) => {
  const list = RAW[country].map((c) => ({
    id: `${country}:${c[0]}`,
    name: c[0],
    country,
    lat: c[1],
    lon: c[2],
    tz: c[3],
  }))
  return { country, cities: country === 'Colombia' ? list : list.slice().sort((a, b) => a.name.localeCompare(b.name, 'es')) }
})

export const CITY_INDEX = Object.fromEntries(CITY_GROUPS.flatMap((g) => g.cities.map((c) => [c.id, c])))

export const EXAMPLE_CITY_ID = 'Colombia:Medellín'

export function compute(input) {
  const [y, m, d] = input.fecha.split('-').map(Number)
  const known = !input.sinHora
  const [hh, mm] = known ? input.hora.split(':').map(Number) : [12, 0]
  const city = input.city
  const utc = localToUTC(y, m, d, hh, mm, city.tz)
  const jd = julianDay(utc)
  const sun = sunLongitude(jd)
  const moon = moonLongitude(jd)
  let asc = null
  let moonAlt = null
  if (known) asc = ascendant(jd, city.lat, city.lon)
  else {
    const m0 = moonLongitude(julianDay(localToUTC(y, m, d, 0, 0, city.tz)))
    const m1 = moonLongitude(julianDay(localToUTC(y, m, d, 23, 59, city.tz)))
    if (Math.floor(m0 / 30) !== Math.floor(m1 / 30)) moonAlt = [signOf(m0), signOf(m1)]
  }
  return { name: input.nombre, y, m, d, hh, mm, known, city, sun, moon, asc, moonAlt }
}

export function elementCount(c) {
  const pts = [c.sun, c.moon].concat(c.asc !== null ? [c.asc] : [])
  const cnt = { fuego: 0, tierra: 0, aire: 0, agua: 0 }
  pts.forEach((p) => {
    cnt[signOf(p).e] += 1
  })
  const max = Math.max(...Object.values(cnt))
  const top = EL_ORDER.filter((e) => cnt[e] === max)
  return { cnt, total: pts.length, top: top.length === 1 ? top[0] : null }
}

export function drawWheel(ctx, size, c, colors, signNames) {
  const cx = size / 2
  const cy = size / 2
  const R = size * 0.47
  const rIn = R * 0.7
  const rCore = R * 0.32
  const offset = c.asc !== null ? c.asc : 0
  const ang = (lon) => Math.PI + ((lon - offset) * Math.PI) / 180
  const pt = (lon, r) => [cx + r * Math.cos(ang(lon)), cy - r * Math.sin(ang(lon))]
  ctx.clearRect(0, 0, size, size)
  const elFill = { fuego: colors.fire, tierra: colors.earth, aire: colors.air, agua: colors.water }
  for (let i = 0; i < 12; i++) {
    const a0 = ang(i * 30)
    const a1 = ang(i * 30 + 30)
    ctx.beginPath()
    ctx.moveTo(cx + rIn * Math.cos(a0), cy - rIn * Math.sin(a0))
    ctx.arc(cx, cy, R, -a0, -a1, true)
    ctx.arc(cx, cy, rIn, -a1, -a0, false)
    ctx.closePath()
    ctx.fillStyle = elFill[SIGN_DEFS[i].e]
    ctx.fill()
    ctx.strokeStyle = colors.line
    ctx.lineWidth = size * 0.002
    ctx.stroke()
    const [mx, my] = pt(i * 30 + 15, (R + rIn) / 2)
    ctx.fillStyle = colors.plum
    ctx.font = `${size * 0.042}px ${colors.glyph}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(SIGN_DEFS[i].glyph, mx, my - size * 0.022)
    const name = signNames[SIGN_DEFS[i].id]
    ctx.font = `600 ${size * (name.length > 9 ? 0.022 : 0.025)}px ${colors.body}`
    ctx.fillText(name, mx, my + size * 0.026)
  }
  for (let l = 0; l < 360; l += 5) {
    const [x0, y0] = pt(l, rIn)
    const [x1, y1] = pt(l, rIn - (l % 30 === 0 ? size * 0.03 : l % 10 === 0 ? size * 0.018 : size * 0.009))
    ctx.beginPath()
    ctx.moveTo(x0, y0)
    ctx.lineTo(x1, y1)
    ctx.strokeStyle = colors.soft
    ctx.lineWidth = size * 0.0018
    ctx.stroke()
  }
  ctx.beginPath()
  ctx.arc(cx, cy, R, 0, Math.PI * 2)
  ctx.strokeStyle = colors.plum
  ctx.lineWidth = size * 0.004
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(cx, cy, rCore, 0, Math.PI * 2)
  ctx.strokeStyle = colors.line
  ctx.lineWidth = size * 0.002
  ctx.stroke()

  if (c.asc !== null) {
    const [ax, ay] = pt(c.asc, R)
    const [dx, dy] = pt(c.asc + 180, R)
    ctx.setLineDash([size * 0.01, size * 0.008])
    ctx.beginPath()
    ctx.moveTo(ax, ay)
    ctx.lineTo(dx, dy)
    ctx.strokeStyle = colors.flame
    ctx.lineWidth = size * 0.003
    ctx.stroke()
    ctx.setLineDash([])
    const [lx, ly] = pt(c.asc - 5, rIn - size * 0.05)
    ctx.fillStyle = colors.flame
    ctx.font = `600 ${size * 0.034}px ${colors.body}`
    ctx.fillText('AC', lx, ly)
  }
  const planet = (lon, glyph, color, r) => {
    const [x0, y0] = pt(lon, rIn)
    const [x1, y1] = pt(lon, r + size * 0.035)
    ctx.beginPath()
    ctx.moveTo(x0, y0)
    ctx.lineTo(x1, y1)
    ctx.strokeStyle = color
    ctx.lineWidth = size * 0.003
    ctx.stroke()
    const [px, py] = pt(lon, r)
    ctx.beginPath()
    ctx.arc(px, py, size * 0.036, 0, Math.PI * 2)
    ctx.fillStyle = colors.paper
    ctx.fill()
    ctx.lineWidth = size * 0.004
    ctx.strokeStyle = color
    ctx.stroke()
    ctx.fillStyle = color
    ctx.font = `${size * 0.044}px ${colors.glyph}`
    ctx.fillText(glyph, px, py + size * 0.002)
  }
  const sep = Math.abs(((c.sun - c.moon + 540) % 360) - 180)
  const rSun = rIn - size * 0.075
  const rMoon = sep < 12 ? rIn - size * 0.16 : rIn - size * 0.075
  planet(c.sun, '☉︎', colors.sunInk, rSun)
  planet(c.moon, '☽︎', colors.fuchsia, rMoon)
  ctx.beginPath()
  ctx.arc(cx, cy, rCore, 0, Math.PI * 2)
  ctx.fillStyle = colors.paper
  ctx.fill()
  ctx.strokeStyle = colors.line
  ctx.lineWidth = size * 0.002
  ctx.stroke()
  ctx.fillStyle = colors.plum
  ctx.font = `italic 500 ${size * 0.042}px ${colors.display}`
  ctx.fillText('Maribella', cx, cy)
}

function wrapText(ctx, text, x, y, maxW, lh) {
  const words = text.split(' ')
  let line = ''
  const lines = []
  for (const w of words) {
    const t = line ? `${line} ${w}` : w
    if (ctx.measureText(t).width > maxW && line) {
      lines.push(line)
      line = w
    } else line = t
  }
  lines.push(line)
  lines.forEach((l, i) => ctx.fillText(l, x, y + i * lh))
  return lines.length
}

function loadLogo() {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = '/logo.jpg'
  })
}

export async function buildShareImage(c, i18n) {
  await document.fonts.ready
  const logo = await loadLogo()
  const W = 1080
  const H = 1350
  const cv = document.createElement('canvas')
  cv.width = W
  cv.height = H
  const ctx = cv.getContext('2d')
  const P = {
    cream: '#F7F1D8',
    paper: '#FFFCEB',
    plum: '#502D73',
    fuchsia: '#BF4E83',
    gold: '#F2C335',
    flame: '#F2490C',
    soft: '#6E5888',
  }
  const signName = (id) => i18n.signs[id]
  const elName = (e) => i18n.elements[e]
  const modName = (m) => i18n.mods[m]
  ctx.fillStyle = P.cream
  ctx.fillRect(0, 0, W, H)
  const g = ctx.createLinearGradient(0, 0, W, 0)
  g.addColorStop(0, P.plum)
  g.addColorStop(1, P.fuchsia)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, 14)
  ctx.fillRect(0, H - 14, W, 14)
  ctx.save()
  ctx.beginPath()
  ctx.arc(130, 130, 72, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fillStyle = '#FDFACA'
  ctx.fill()
  ctx.clip()
  if (logo) ctx.drawImage(logo, 58, 58, 144, 144)
  ctx.restore()
  ctx.beginPath()
  ctx.arc(130, 130, 73, 0, Math.PI * 2)
  ctx.strokeStyle = P.gold
  ctx.lineWidth = 4
  ctx.stroke()
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = P.fuchsia
  ctx.font = '600 24px Outfit, Work Sans, sans-serif'
  ctx.fillText(i18n.shareKicker, 232, 112)
  ctx.fillStyle = P.plum
  ctx.font = '700 62px "Cormorant Garamond", Georgia, serif'
  ctx.fillText(c.name.length > 22 ? `${c.name.slice(0, 21)}…` : c.name, 230, 170)
  ctx.fillStyle = P.soft
  ctx.font = '400 24px Outfit, Work Sans, sans-serif'
  wrapText(ctx, i18n.meta, 232, 210, W - 290, 32)
  const wc = document.createElement('canvas')
  wc.width = 640
  wc.height = 640
  drawWheel(wc.getContext('2d'), 640, c, {
    fire: '#F7D3C2',
    earth: '#E9E0B8',
    air: '#F3E3EC',
    water: '#DCD3EA',
    line: '#D9CBA3',
    plum: P.plum,
    soft: P.soft,
    flame: P.flame,
    fuchsia: P.fuchsia,
    gold: P.gold,
    paper: P.paper,
    sunInk: '#D98E04',
    glyph: '"Noto Sans Symbols", "Noto Sans Symbols 2", sans-serif',
    body: 'Outfit, "Work Sans", sans-serif',
    display: '"Cormorant Garamond", Georgia, serif',
  }, i18n.signs)
  ctx.fillStyle = P.paper
  ctx.beginPath()
  ctx.arc(W / 2, 600, 336, 0, Math.PI * 2)
  ctx.fill()
  ctx.drawImage(wc, W / 2 - 320, 280)
  const items = [
    ['sun', c.sun],
    ['moon', c.moon],
    ['asc', c.asc],
  ]
  const cw = 316
  const gap = 24
  const x0 = (W - cw * 3 - gap * 2) / 2
  const y0 = 960
  items.forEach(([lab, lon], i) => {
    const x = x0 + i * (cw + gap)
    ctx.fillStyle = P.paper
    ctx.beginPath()
    if (typeof ctx.roundRect === 'function') ctx.roundRect(x, y0, cw, 200, 22)
    else ctx.rect(x, y0, cw, 200)
    ctx.fill()
    ctx.strokeStyle = '#E3D7B4'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.textAlign = 'left'
    ctx.fillStyle = P.soft
    ctx.font = '600 20px Outfit, Work Sans, sans-serif'
    ctx.fillText(i18n.pointLab[lab], x + 24, y0 + 44)
    const lw = ctx.measureText(`${i18n.pointLab[lab]} `).width
    ctx.font = 'italic 400 19px Outfit, Work Sans, sans-serif'
    ctx.fillText(`· ${i18n.pointShort[lab]}`, x + 24 + lw, y0 + 44)
    if (lon === null) {
      ctx.fillStyle = P.soft
      ctx.font = '700 38px "Cormorant Garamond", Georgia, serif'
      ctx.fillText(i18n.unknown, x + 24, y0 + 104)
      ctx.font = '400 19px Outfit, Work Sans, sans-serif'
      ctx.fillText(i18n.needsTime, x + 24, y0 + 146)
      return
    }
    const s = signOf(lon)
    const n = signName(s.id)
    ctx.fillStyle = P.plum
    ctx.font = `700 ${n.length > 9 ? 40 : 48}px "Cormorant Garamond", Georgia, serif`
    ctx.fillText(n, x + 24, y0 + 106)
    ctx.fillStyle = P.soft
    ctx.font = '400 20px Outfit, Work Sans, sans-serif'
    ctx.fillText(degText(lon), x + 24, y0 + 140)
    ctx.fillStyle = P.fuchsia
    ctx.font = '600 20px Outfit, Work Sans, sans-serif'
    ctx.fillText(`${elName(s.e)} · ${modName(s.m)}`, x + 24, y0 + 174)
  })
  const ec = elementCount(c)
  ctx.textAlign = 'center'
  ctx.fillStyle = P.plum
  ctx.font = 'italic 500 34px "Cormorant Garamond", Georgia, serif'
  ctx.fillText(ec.top ? `${i18n.dominant}: ${elName(ec.top)}` : i18n.balanced, W / 2, 1222)
  ctx.fillStyle = P.soft
  ctx.font = '500 22px Outfit, Work Sans, sans-serif'
  ctx.fillText('@maribella_conexion · maribellaconexion.com', W / 2, 1290)
  return new Promise((res) => cv.toBlob(res, 'image/png'))
}
