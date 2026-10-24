import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function AppsCarousel({ apps, prevLabel, nextLabel, countLabel }) {
  const scroller = useRef(null)
  const indexRef = useRef(0)
  const paused = useRef(false)
  const [index, setIndex] = useState(0)
  const total = apps.length

  function go(next) {
    const el = scroller.current
    if (!el || !total) return
    const clamped = ((next % total) + total) % total
    const card = el.children[clamped]
    if (card) {
      el.scrollTo({ left: card.offsetLeft, behavior: 'smooth' })
    }
    indexRef.current = clamped
    setIndex(clamped)
  }

  function pause() {
    paused.current = true
  }

  function resume() {
    paused.current = false
  }

  useEffect(() => {
    indexRef.current = index
  }, [index])

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
      indexRef.current = best
      setIndex(best)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (total < 2) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduce.matches) return
    const id = window.setInterval(() => {
      if (paused.current || document.hidden) return
      go(indexRef.current + 1)
    }, 4200)
    return () => window.clearInterval(id)
  }, [total])

  return (
    <div
      className="mt-8"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      onPointerDown={pause}
      onPointerUp={resume}
    >
      <div
        className="apps-carousel"
        ref={scroller}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault()
            pause()
            go(index + 1)
          }
          if (e.key === 'ArrowLeft') {
            e.preventDefault()
            pause()
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
        <p className="text-xs tracking-[0.16em] uppercase text-beige/55">{countLabel(index + 1, total)}</p>
        <div className="flex gap-2">
          <button
            type="button"
            className="apps-carousel-btn"
            aria-label={prevLabel}
            onClick={() => {
              pause()
              go(index - 1)
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="apps-carousel-btn"
            aria-label={nextLabel}
            onClick={() => {
              pause()
              go(index + 1)
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
