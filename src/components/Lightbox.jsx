import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const MAX_SCALE = 5
const DOUBLE_TAP_SCALE = 2.5

const clamp = (v, min, max) => Math.min(Math.max(v, min), max)
const dist = (a, b) => Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)

// Просмотр фото на весь экран.
// На компьютере: нажатие на фото переключает «вписать в экран» и «в натуральную величину»
// (с прокруткой, чтобы прочитать мелкий текст). Esc и фон закрывают, стрелки листают.
// На телефоне, как в соцсетях: щипок приближает, двойное касание приближает и возвращает,
// свайп в сторону листает, свайп вниз закрывает.
export default function Lightbox({ photos, index, onClose, onChange }) {
  const [touch] = useState(() => window.matchMedia('(pointer: coarse)').matches)
  const [zoomed, setZoomed] = useState(false)
  const [view, setView] = useState({ s: 1, x: 0, y: 0 })
  const [animate, setAnimate] = useState(true)
  const viewRef = useRef(view)
  const stageRef = useRef(null)
  const imgRef = useRef(null)
  const closeRef = useRef(null)
  const gesture = useRef({})
  const lastTap = useRef({ t: 0, x: 0, y: 0 })

  const photo = photos[index]
  const hasPrev = index > 0
  const hasNext = index < photos.length - 1

  const apply = (v) => {
    viewRef.current = v
    setView(v)
  }

  const go = (dir) => {
    setZoomed(false)
    apply({ s: 1, x: 0, y: 0 })
    onChange(index + dir)
  }

  // Свежие значения для обработчиков, которые подключены один раз
  const live = useRef({})
  useEffect(() => {
    live.current = { go, onClose, hasPrev, hasNext }
  })

  useEffect(() => {
    const onKey = (e) => {
      const l = live.current
      if (e.key === 'Escape') l.onClose()
      else if (e.key === 'ArrowLeft' && l.hasPrev) l.go(-1)
      else if (e.key === 'ArrowRight' && l.hasNext) l.go(1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    closeRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [])

  // Жесты на телефоне
  useEffect(() => {
    if (!touch) return
    const stage = stageRef.current
    const g = gesture.current

    const limits = (s) => {
      const img = imgRef.current
      return {
        mx: Math.max(0, (img.offsetWidth * s - window.innerWidth) / 2),
        my: Math.max(0, (img.offsetHeight * s - window.innerHeight) / 2),
      }
    }
    const center = () => ({ cx: window.innerWidth / 2, cy: window.innerHeight / 2 })
    const startPan = (t) => {
      g.mode = 'pan'
      g.sx = t.clientX
      g.sy = t.clientY
      g.x0 = viewRef.current.x
      g.y0 = viewRef.current.y
      g.axis = null
      g.moved = false
      g.t0 = Date.now()
    }

    const onStart = (e) => {
      setAnimate(false)
      if (e.touches.length === 2) {
        const [a, b] = e.touches
        g.mode = 'pinch'
        g.d0 = dist(a, b)
        g.s0 = viewRef.current.s
        g.mx0 = (a.clientX + b.clientX) / 2
        g.my0 = (a.clientY + b.clientY) / 2
        g.x0 = viewRef.current.x
        g.y0 = viewRef.current.y
      } else if (e.touches.length === 1) {
        startPan(e.touches[0])
      }
    }

    const onMove = (e) => {
      e.preventDefault()
      const v = viewRef.current
      const { cx, cy } = center()
      if (g.mode === 'pinch' && e.touches.length === 2) {
        const [a, b] = e.touches
        const s = clamp((g.s0 * dist(a, b)) / g.d0, 1, MAX_SCALE)
        const mx = (a.clientX + b.clientX) / 2
        const my = (a.clientY + b.clientY) / 2
        // Точка под пальцами остаётся на месте
        const qx = (g.mx0 - cx - g.x0) / g.s0
        const qy = (g.my0 - cy - g.y0) / g.s0
        const { mx: lx, my: ly } = limits(s)
        apply({ s, x: clamp(mx - cx - s * qx, -lx, lx), y: clamp(my - cy - s * qy, -ly, ly) })
        g.moved = true
      } else if (g.mode === 'pan' && e.touches.length === 1) {
        const t = e.touches[0]
        const dx = t.clientX - g.sx
        const dy = t.clientY - g.sy
        if (Math.abs(dx) > 8 || Math.abs(dy) > 8) g.moved = true
        if (v.s > 1) {
          const { mx: lx, my: ly } = limits(v.s)
          apply({ s: v.s, x: clamp(g.x0 + dx, -lx, lx), y: clamp(g.y0 + dy, -ly, ly) })
        } else {
          if (!g.axis && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
            g.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
          }
          const l = live.current
          if (g.axis === 'x') {
            const blocked = (dx > 0 && !l.hasPrev) || (dx < 0 && !l.hasNext)
            apply({ s: 1, x: blocked ? dx * 0.25 : dx, y: 0 })
          } else if (g.axis === 'y') {
            apply({ s: 1, x: 0, y: dy })
          }
        }
      }
    }

    const onEnd = (e) => {
      const v = viewRef.current
      setAnimate(true)
      if (e.touches.length === 1) {
        // Один палец остался после щипка: дальше двигаем фото им
        startPan(e.touches[0])
        return
      }
      if (e.touches.length > 0) return

      if (g.mode === 'pinch') {
        g.mode = null
        if (v.s < 1.05) apply({ s: 1, x: 0, y: 0 })
        return
      }
      if (g.mode !== 'pan') return
      g.mode = null
      const l = live.current

      if (!g.moved && Date.now() - g.t0 < 300) {
        // Касание без движения: двойное приближает или возвращает
        const t = e.changedTouches[0]
        const now = Date.now()
        const prev = lastTap.current
        if (now - prev.t < 300 && Math.hypot(t.clientX - prev.x, t.clientY - prev.y) < 30) {
          lastTap.current = { t: 0, x: 0, y: 0 }
          if (v.s > 1) {
            apply({ s: 1, x: 0, y: 0 })
          } else {
            const { cx, cy } = center()
            const s = DOUBLE_TAP_SCALE
            const { mx: lx, my: ly } = limits(s)
            apply({
              s,
              x: clamp(-(t.clientX - cx) * (s - 1), -lx, lx),
              y: clamp(-(t.clientY - cy) * (s - 1), -ly, ly),
            })
          }
        } else {
          lastTap.current = { t: now, x: t.clientX, y: t.clientY }
        }
        return
      }

      if (v.s > 1) return
      if (g.axis === 'x' && Math.abs(v.x) > 60) {
        if (v.x < 0 && l.hasNext) return l.go(1)
        if (v.x > 0 && l.hasPrev) return l.go(-1)
      }
      if (g.axis === 'y' && v.y > 100) return l.onClose()
      apply({ s: 1, x: 0, y: 0 })
    }

    stage.addEventListener('touchstart', onStart, { passive: true })
    stage.addEventListener('touchmove', onMove, { passive: false })
    stage.addEventListener('touchend', onEnd, { passive: true })
    stage.addEventListener('touchcancel', onEnd, { passive: true })
    return () => {
      stage.removeEventListener('touchstart', onStart)
      stage.removeEventListener('touchmove', onMove)
      stage.removeEventListener('touchend', onEnd)
      stage.removeEventListener('touchcancel', onEnd)
    }
  }, [touch])

  // Фон темнеет меньше, пока фото тянут вниз
  const fade = touch && view.s === 1 ? Math.min(Math.abs(view.y) / 500, 0.6) : 0

  return createPortal(
    <div
      ref={stageRef}
      className={`lightbox${touch ? ' lightbox--touch' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Фото переписки"
      style={touch ? { background: `rgba(0, 0, 0, ${0.92 * (1 - fade)})` } : undefined}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <img
        ref={imgRef}
        className={`lightbox__img${!touch && zoomed ? ' is-zoomed' : ''}`}
        src={photo.src}
        width={photo.width}
        height={photo.height}
        alt={`Скриншот отзыва ${index + 1}`}
        draggable={false}
        style={
          touch
            ? {
                transform: `translate(${view.x}px, ${view.y}px) scale(${view.s})`,
                transition: animate ? 'transform 0.2s ease-out' : 'none',
              }
            : undefined
        }
        onClick={touch ? undefined : () => setZoomed((z) => !z)}
      />
      <button ref={closeRef} type="button" className="lightbox__btn lightbox__close" aria-label="Закрыть" onClick={onClose}>
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
      {touch ? (
        <p className="lightbox__counter">{index + 1} / {photos.length}</p>
      ) : (
        <>
          {hasPrev && (
            <button type="button" className="lightbox__btn lightbox__prev" aria-label="Предыдущее фото" onClick={() => go(-1)}>
              <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <path d="m15 5-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          {hasNext && (
            <button type="button" className="lightbox__btn lightbox__next" aria-label="Следующее фото" onClick={() => go(1)}>
              <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </>
      )}
    </div>,
    document.body,
  )
}
