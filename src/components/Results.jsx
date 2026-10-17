import { useCallback, useEffect, useRef, useState } from 'react'
import { placeholder } from '../assets/placeholder.js'

// TODO: заменить на реальные цифры
const STATS = [
  { value: '50+', label: 'учеников' },
  { value: '10+', label: 'выездов за рубеж' },
  { value: '100+', label: 'часов практики' },
]

const CASES = [
  {
    name: 'Алиса Таракановская',
    role: 'Ветеринарный врач, тренер по мягким методикам',
    text: '«Такой курс конного английского — уникальная возможность для конников! Темы выстроены последовательно: новые слова и фразы сразу можно применять на практике. Особенно понравились блоки по анатомии лошади и работе в руках. Но самое главное — это атмосфера. Мне не страшно совершать ошибки и пробовать говорить, потому что Дарья не осудит, а спокойно подскажет и объяснит»',
  },
  {
    name: 'Ксения Болотина',
    role: 'Троеборец национальной сборной России, тренер и берейтор',
    text: '«Курс помог мне преодолеть языковой барьер: теперь я уверенно общаюсь с тренером на английском и понимаю тонкости тренировочного процесса. Особенно ценю реальную практическую пользу — разбор терминологии и диалогов со спортсменами»',
  },
  // TODO: заменить на реальный кейс
  { name: 'Имя, дисциплина', role: '', text: 'Текст кейса: задача, срок, результат.' },
]

// TODO: заменить на реальные видео-отзывы (вертикальные 9:16) и скриншоты переписок (вертикальные, разной высоты)
const VIDEOS = Array.from({ length: 6 }, () => placeholder(9, 16))
const SCREENSHOTS = [placeholder(9, 16), placeholder(3, 4), placeholder(9, 14)]

function VideoCarousel() {
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
      className="results__carousel"
      role="group"
      aria-roledescription="карусель"
      aria-label="Видео-отзывы"
    >
      <div className="results__carousel-head">
        <h3 className="results__subtitle">Видео-отзывы</h3>
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
      <div className="results__videos" ref={trackRef} onScroll={update} tabIndex={0}>
        {VIDEOS.map((src, i) => (
          <div className="results__video" key={i}>
            {/* TODO: заменить на видео */}
            <img className="ph" src={src} alt="Фото: превью видео-отзыва ученика — заменить" />
            <svg className="results__play" viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
              <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M20 16.5v15l12-7.5z" fill="currentColor" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Results() {
  return (
    <section className="section section--dark" id="results">
      <div className="container">
        <h2>Результаты учеников</h2>

        <ul className="results__stats">
          {STATS.map((s) => (
            <li key={s.label}>
              <span className="results__value">{s.value}</span>
              <span className="results__label">{s.label}</span>
            </li>
          ))}
        </ul>

        <div className="results__cases">
          {CASES.map((c, i) => (
            <article className="card results__case" key={i}>
              <p className="results__text">{c.text}</p>
              <div className="results__author">
                <p className="results__name">{c.name}</p>
                {c.role && <p className="results__role">{c.role}</p>}
              </div>
            </article>
          ))}
        </div>

        <VideoCarousel />

        <h3 className="results__subtitle">Переписки</h3>
        <div className="results__shots">
          {SCREENSHOTS.map((src, i) => (
            // TODO: заменить на скриншот
            <img key={i} className="ph" src={src} alt="Фото: скриншот переписки с учеником — заменить" />
          ))}
        </div>
      </div>
    </section>
  )
}
