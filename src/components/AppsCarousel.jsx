import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function AppsCarousel({ apps, prevLabel, nextLabel, countLabel }) {
  const scroller = useRef(null)
  const [index, setIndex] = useState(0)
  const last = apps.length - 1

  function go(next) {
    const el = scroller.current
    if (!el) return
    const clamped = Math.max(0, Math.min(last, next))
    const card = el.children[clamped]
    if (card) {
      el.scrollTo({ left: card.offsetLeft, behavior: 'smooth' })
    }
    setIndex(clamped)
  }

  useEffect(() => {
    const el = scroller.current
    if (!el) return
    const onScroll = () => {
      const cards = [...el.children]
      let best = 0
      let dist = Infinity
      cards.forEach((card, i) => {
        const d = Math.abs(card.offsetLeft - el.scrollLeft)
        if (d < dist) {
          dist = d
          best = i
        }
      })
      setIndex(best)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="mt-8">
      <div
        className="apps-carousel"
        ref={scroller}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault()
            go(index + 1)
          }
          if (e.key === 'ArrowLeft') {
            e.preventDefault()
            go(index - 1)
          }
        }}
      >
        {apps.map((app) => (
          <article key={app.k} className="card flex flex-col p-5 sm:p-6">
            <p className="eyebrow">{app.eyebrow}</p>
            <h3 className="mt-2 font-serif text-2xl sm:text-[1.7rem] leading-tight">{app.title}</h3>
            <p className="mt-3 flex-1 text-sm text-beige/70 line-clamp-3">{app.lead}</p>
            <Link className="btn-primary mt-5 inline-block self-start" to={app.to}>{app.cta}</Link>
          </article>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs tracking-[0.16em] uppercase text-beige/55">{countLabel(index + 1, apps.length)}</p>
        <div className="flex gap-2">
          <button
            type="button"
            className="apps-carousel-btn"
            aria-label={prevLabel}
            disabled={index <= 0}
            onClick={() => go(index - 1)}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="apps-carousel-btn"
            aria-label={nextLabel}
            disabled={index >= last}
            onClick={() => go(index + 1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
