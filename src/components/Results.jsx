import { placeholder } from '../assets/placeholder.js'

// TODO: заменить на реальные цифры
const STATS = [
  { value: '50+', label: 'учеников' },
  { value: '10+', label: 'выездов за рубеж' },
  { value: '100+', label: 'часов практики' },
]

const CASES = [
  {
    name: 'Анна, выездка', // TODO: заменить на реальное имя
    text: 'За 3 месяца подготовилась к турниру в Польше — сама зарегистрировалась и прошла мандатную комиссию.',
  },
  // TODO: заменить на реальные кейсы
  { name: 'Имя, дисциплина', text: 'Текст кейса: задача, срок, результат.' },
  { name: 'Имя, дисциплина', text: 'Текст кейса: задача, срок, результат.' },
]

// TODO: заменить на реальные видео-отзывы (16:9) и скриншоты переписок (вертикальные, разной высоты)
const VIDEOS = [placeholder(16, 9), placeholder(16, 9)]
const SCREENSHOTS = [placeholder(9, 16), placeholder(3, 4), placeholder(9, 14)]

export default function Results() {
  return (
    <section className="section section--alt" id="results">
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
              <p>«{c.text}»</p>
              <p className="results__name">{c.name}</p>
            </article>
          ))}
        </div>

        <h3 className="results__subtitle">Видео-отзывы</h3>
        <div className="results__videos">
          {VIDEOS.map((src, i) => (
            // TODO: заменить на видео
            <img key={i} className="ph" src={src} alt="Фото: превью видео-отзыва ученика — заменить" />
          ))}
        </div>

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
