import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function AppsCarousel({ apps, prevLabel, nextLabel, countLabel }) {
  const trackRef = useRef(null)
  const hovering = useRef(false)
  const [held, setHeld] = useState(false)
  const [nudge, setNudge] = useState(0)
  const [index, setIndex] = useState(0)
  const total = apps.length
  const track = total > 1 ? [...apps, ...apps] : apps

  function pause() {
    setHeld(true)
  }

  function resume() {
    if (hovering.current) return
    setHeld(false)
  }

  function cardStep() {
    const card = trackRef.current?.children[0]
    if (!card) return 280
    const styles = window.getComputedStyle(trackRef.current)
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 17.6
    return card.getBoundingClientRect().width + gap
  }

  function go(dir) {
    if (!total) return
    pause()
    const step = cardStep()
    const loop = step * total
    setNudge((n) => {
      let next = n - dir * step
      next = ((next % loop) + loop) % loop
      if (next > 0) next -= loop
      return next
    })
    setIndex((i) => ((i + dir) % total + total) % total)
  }

  return (
    <div
      className="mt-8"
      onMouseEnter={() => {
        hovering.current = true
        pause()
      }}
      onMouseLeave={() => {
        hovering.current = false
        resume()
      }}
    >
      <div className="apps-carousel-viewport">
        <div
          ref={trackRef}
          className={`apps-carousel-track${held || total < 2 ? ' is-paused' : ''}`}
        >
          {track.map((app, i) => (
            <article
              key={`${app.k}-${i}`}
              className="card flex flex-col p-5 sm:p-6"
              style={i === 0 ? { marginLeft: `${nudge}px` } : undefined}
            >
              <p className="eyebrow">{app.eyebrow}</p>
              <h3 className="mt-2 font-serif text-2xl sm:text-[1.7rem] leading-tight">{app.title}</h3>
              <p className="mt-3 flex-1 text-sm text-beige/70 line-clamp-3">{app.lead}</p>
              <Link className="btn-primary mt-5 inline-block self-start" to={app.to}>{app.cta}</Link>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs tracking-[0.16em] uppercase text-beige/55">{countLabel(index + 1, total)}</p>
        <div className="flex gap-2">
          <button type="button" className="apps-carousel-btn" aria-label={prevLabel} onClick={() => go(-1)}>
            <ChevronLeft size={18} />
          </button>
          <button type="button" className="apps-carousel-btn" aria-label={nextLabel} onClick={() => go(1)}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
