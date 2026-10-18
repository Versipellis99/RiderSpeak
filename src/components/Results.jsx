import { useCallback, useEffect, useRef, useState } from 'react'
import photo1 from '../assets/reviews/ФотоОтзыв1.webp'
import photo2 from '../assets/reviews/ФотоОтзыв2.webp'
import photo3 from '../assets/reviews/ФотоОтзыв3.webp'
import photo4 from '../assets/reviews/ФотоОтзыв4.webp'
import video1 from '../assets/reviews/ВидеоОтзыв1.mp4'
import video2 from '../assets/reviews/ВидеоОтзыв2.mp4'
import video3 from '../assets/reviews/ВидеоОтзыв3.mp4'
import video4 from '../assets/reviews/ВидеоОтзыв4.mp4'
import video5 from '../assets/reviews/ВидеоОтзыв5.mp4'

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

const VIDEOS = [video1, video2, video3, video4, video5]

// width/height нужны браузеру, чтобы заранее зарезервировать место и страница не «прыгала»
const SCREENSHOTS = [
  { src: photo1, width: 720, height: 1280 },
  { src: photo2, width: 1080, height: 1920 },
  { src: photo3, width: 1080, height: 1920 },
  { src: photo4, width: 1080, height: 1920 },
]

function VideoCarousel() {
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const videoRefs = useRef([])
  const [near, setNear] = useState(false)
  const [edge, setEdge] = useState({ start: true, end: false })
  const [playing, setPlaying] = useState(null)
  const [started, setStarted] = useState([])

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setEdge({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
    })
  }, [])

  // Адреса видео подставляем, только когда карусель подходит к экрану: до этого ничего не грузится
  useEffect(() => {
    const el = rootRef.current
    if (!el || !('IntersectionObserver' in window)) {
      setNear(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '400px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  // Одновременно играет только одно видео
  const handlePlay = (i) => {
    videoRefs.current.forEach((v, j) => {
      if (v && j !== i) v.pause()
    })
    setPlaying(i)
  }

  const handlePause = (i) => setPlaying((cur) => (cur === i ? null : cur))

  const startVideo = (i) => {
    setStarted((s) => (s.includes(i) ? s : [...s, i]))
    videoRefs.current[i]?.play()
  }

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
          <div className="results__video" key={src}>
            {/* preload="metadata": грузятся только метаданные и первый кадр (он служит постером).
                #t=0.001 нужен iOS Safari, чтобы показать первый кадр. */}
            <video
              ref={(el) => {
                videoRefs.current[i] = el
              }}
              className="ph results__media"
              src={near ? `${src}#t=0.001` : undefined}
              preload="metadata"
              playsInline
              controls={started.includes(i)}
              aria-label={`Видео-отзыв ${i + 1}`}
              onPlay={() => handlePlay(i)}
              onPause={() => handlePause(i)}
              onEnded={() => handlePause(i)}
            />
            {playing !== i && (
              <button
                type="button"
                className="results__play"
                aria-label={`Воспроизвести видео-отзыв ${i + 1}`}
                onClick={() => startVideo(i)}
              >
                <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
                  <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M20 16.5v15l12-7.5z" fill="currentColor" />
                </svg>
              </button>
            )}
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
          {SCREENSHOTS.map((s, i) => (
            <img
              key={s.src}
              className="ph"
              src={s.src}
              width={s.width}
              height={s.height}
              loading="lazy"
              decoding="async"
              alt={`Скриншот отзыва ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
