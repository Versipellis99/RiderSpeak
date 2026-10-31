import { useEffect, useRef, useState } from 'react'
import heroPhoto from '../assets/media/hero-photo2.webp'
import heroPhotoSmall from '../assets/media/hero-photo2-800.webp'

const NAV = [
  { href: '#formats', label: 'Услуги' },
  { href: '#lessons', label: 'Занятия' },
  { href: '#results', label: 'Результаты' },
  { href: '#pricing', label: 'Цены' },
  { href: '#contacts', label: 'Контакты' },
]

export default function Hero() {
  // На телефоне и планшете меню прячется за кнопкой-бургером; на ПК (от 961px) видно сразу
  const [open, setOpen] = useState(false)
  const barRef = useRef(null)

  // Меню закрывается по Esc и по нажатию вне него
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onPointer = (e) => {
      if (barRef.current && !barRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <section className="hero" id="hero">
      <div className="container hero__bar" ref={barRef}>
        <a className="brand" href="#hero">RiderSpeaks</a>
        <button
          type="button"
          className="hero__burger"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
          aria-controls="hero-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path
              d={open ? 'M6 6l12 12M18 6 6 18' : 'M4 7h16M4 12h16M4 17h16'}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <nav
          id="hero-nav"
          className={`hero__nav${open ? ' is-open' : ''}`}
          aria-label="Разделы сайта"
          onClick={(e) => {
            if (e.target.closest('a')) setOpen(false)
          }}
        >
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
      </div>

      <div className="container hero__body">
        <div className="hero__text">
          <h1>Преподаватель английского языка в конной сфере</h1>
          <p className="hero__sub">
            Помогу преодолеть языковой барьер для учебы у иностранных тренеров, работы
            с англоязычными спортсменами, свободного общения в конных путешествиях
            и вывода ваших продуктов на международный рынок
          </p>
          <div className="hero__actions">
            <a className="btn btn--light" href="#contacts">Записаться на бесплатный пробный урок</a>
            <a className="btn btn--ghost-light" href="#pricing">Узнать стоимость</a>
          </div>
        </div>

        <figure className="hero__media">
          {/* Первый экран: без loading="lazy", фото грузится сразу */}
          <img
            className="hero__photo"
            src={heroPhoto}
            srcSet={`${heroPhotoSmall} 800w, ${heroPhoto} 1080w`}
            sizes="(max-width: 600px) 100vw, 520px"
            width={1080}
            height={1920}
            fetchPriority="high"
            alt="Дарья Борисова обнимает лошадь"
          />
          <figcaption className="hero__caption">9 лет — коневладелец и преподаватель английского</figcaption>
        </figure>
      </div>
    </section>
  )
}
