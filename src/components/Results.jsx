import { useEffect, useRef, useState } from 'react'
import Carousel from './Carousel.jsx'
import Lightbox from './Lightbox.jsx'
import photo1 from '../assets/reviews/review1.webp'
import photo2 from '../assets/reviews/review2.webp'
import photo3 from '../assets/reviews/review3.webp'
import photo4 from '../assets/reviews/review4.webp'
import photo5 from '../assets/reviews/review5.webp'
import video1 from '../assets/reviews/ВидеоОтзыв1.mp4'
import video2 from '../assets/reviews/ВидеоОтзыв2.mp4'
import video3 from '../assets/reviews/ВидеоОтзыв3.mp4'
import video4 from '../assets/reviews/ВидеоОтзыв4.mp4'
import video5 from '../assets/reviews/ВидеоОтзыв5.mp4'

// TODO: заменить на реальные цифры
const STAT = { value: '50+', label: 'учеников' }

// text — строка с кавычками «» или массив абзацев (тогда кавычки ставятся при выводе)
const CASES = [
  {
    name: 'Ульяна Бойко',
    role: 'Специалист по биомеханике лошадей и выездке',
    text: [
      'Я могу с уверенностью рекомендовать Дарью как организатора мероприятий и как переводчика. Это человек, которому можно передать часть своей работы и действительно перестать о ней беспокоиться.',
      'На одном из моих мастер-классов было около 30 участников и благодаря Дарье я могла полностью сосредоточиться на своей работе с лошадьми и проведении самого мероприятия. Мне не приходилось встречать участников, контролировать организационные вопросы или постоянно отвлекаться на возникающие задачи. Всё это было полностью в её руках.',
      'Дарья не просто следует поставленным инструкциям, но и активно включается в процесс, предлагает собственные идеи и дополняет работу своими знаниями и опытом.',
    ],
  },
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
]

const VIDEOS = [video1, video2, video3, video4, video5]

// width/height нужны браузеру, чтобы заранее зарезервировать место и страница не «прыгала»
const SCREENSHOTS = [
  { src: photo1, width: 720, height: 1280 },
  { src: photo2, width: 720, height: 1280 },
  { src: photo3, width: 720, height: 1280 },
  { src: photo4, width: 720, height: 1280 },
  { src: photo5, width: 720, height: 1280 },
]

function VideoCarousel() {
  const rootRef = useRef(null)
  const videoRefs = useRef([])
  const [near, setNear] = useState(false)
  const [playing, setPlaying] = useState(null)
  const [started, setStarted] = useState([])

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

  return (
    <Carousel title="Видео-отзывы" label="Видео-отзывы" rootRef={rootRef}>
      {VIDEOS.map((src, i) => (
        <div className="results__slide" key={src}>
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
    </Carousel>
  )
}

function PhotoCarousel() {
  // Номер фото, открытого на весь экран, или null
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <>
      <Carousel title="Переписки" label="Переписки с учениками">
        {SCREENSHOTS.map((s, i) => (
          <div className="results__slide" key={s.src}>
            <button
              type="button"
              className="results__zoom"
              aria-label={`Открыть скриншот отзыва ${i + 1} на весь экран`}
              onClick={() => setOpenIndex(i)}
            >
              <img
                className="ph"
                src={s.src}
                width={s.width}
                height={s.height}
                loading="lazy"
                decoding="async"
                alt={`Скриншот отзыва ${i + 1}`}
              />
            </button>
          </div>
        ))}
      </Carousel>
      {openIndex !== null && (
        <Lightbox
          photos={SCREENSHOTS}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onChange={setOpenIndex}
        />
      )}
    </>
  )
}

export default function Results() {
  return (
    <section className="section section--dark" id="results">
      <div className="container">
        <h2>Результаты учеников</h2>

        <ul className="results__stats">
          <li>
            <span className="results__value">{STAT.value}</span>
            <span className="results__label">{STAT.label}</span>
          </li>
          <li className="results__phrase">
            Ученики курса тренируются на Кипре у олимпийского всадника Antonis Petris, участвуют
            в семинаре Lucie Klaassen во Франции и тренируют англоговорящих конников на Филиппинах.
          </li>
        </ul>

        <div className="results__cases">
          {CASES.map((c, i) => (
            <article className="card results__case" key={i}>
              {Array.isArray(c.text) ? (
                c.text.map((para, j) => (
                  <p className="results__text" key={j}>
                    {j === 0 && '«'}
                    {para}
                    {j === c.text.length - 1 && '»'}
                  </p>
                ))
              ) : (
                <p className="results__text">{c.text}</p>
              )}
              <div className="results__author">
                <p className="results__name">{c.name}</p>
                {c.role && <p className="results__role">{c.role}</p>}
              </div>
            </article>
          ))}
        </div>

        <VideoCarousel />

        <PhotoCarousel />
      </div>
    </section>
  )
}
