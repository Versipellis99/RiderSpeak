import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

// Просмотр фото на весь экран. Нажатие на фото переключает «вписать в экран» и «в натуральную величину»
// (в натуральную — с прокруткой, чтобы прочитать мелкий текст). Esc и фон закрывают, стрелки листают.
export default function Lightbox({ photos, index, onClose, onChange }) {
  const [zoomed, setZoomed] = useState(false)
  const closeRef = useRef(null)
  const photo = photos[index]
  const hasPrev = index > 0
  const hasNext = index < photos.length - 1

  const go = (dir) => {
    setZoomed(false)
    onChange(index + dir)
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft' && hasPrev) go(-1)
      else if (e.key === 'ArrowRight' && hasNext) go(1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  useEffect(() => {
    closeRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [])

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Фото переписки"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <img
        className={`lightbox__img${zoomed ? ' is-zoomed' : ''}`}
        src={photo.src}
        width={photo.width}
        height={photo.height}
        alt={`Скриншот отзыва ${index + 1}`}
        onClick={() => setZoomed((z) => !z)}
      />
      <button ref={closeRef} type="button" className="lightbox__btn lightbox__close" aria-label="Закрыть" onClick={onClose}>
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
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
    </div>,
    document.body,
  )
}
