import { useCallback, useEffect, useRef, useState } from 'react'

// Горизонтальная карусель на нативном scroll-snap: свайп на тач-экранах, стрелки на ПК.
// Ширину слайдов задаёт CSS (.results__slide).
export default function Carousel({ title, label, rootRef, children }) {
  const trackRef = useRef(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setEdge({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
    })
  }, [])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  const scrollByCard = (dir) => {
    const el = trackRef.current
    const card = el.firstElementChild
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' })
  }

  return (
    <div
      ref={rootRef}
      className="results__carousel"
      role="group"
      aria-roledescription="карусель"
      aria-label={label}
    >
      <div className="results__carousel-head">
        <h3 className="results__subtitle">{title}</h3>
        <div className="results__arrows">
          <button
            type="button"
            className="results__arrow"
            aria-label="Назад"
            disabled={edge.start}
            onClick={() => scrollByCard(-1)}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path
                d="m15 5-7 7 7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="results__arrow"
            aria-label="Вперёд"
            disabled={edge.end}
            onClick={() => scrollByCard(1)}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path
                d="m9 5 7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="results__track" ref={trackRef} onScroll={update} tabIndex={0}>
        {children}
      </div>
    </div>
  )
}
