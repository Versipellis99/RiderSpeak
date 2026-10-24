import about1 from '../assets/media/about1.1.webp'
import about2 from '../assets/media/about2.1.webp'
import about3 from '../assets/media/about3.1.webp'

// width/height нужны браузеру, чтобы заранее зарезервировать место и страница не «прыгала».
// Порядок: горизонтальное фото сверху, под ним два вертикальных рядом
const PHOTOS = [
  { src: about2, width: 2560, height: 1706, alt: 'Дарья Борисова с лошадью на прогулке', cls: 'about__photo--wide' },
  { src: about3, width: 1179, height: 1934, alt: 'Дарья Борисова за ноутбуком на занятии', cls: 'about__photo--laptop' },
  { src: about1, width: 1080, height: 1920, alt: 'Дарья Борисова подписывает учебник My Level', cls: 'about__photo--book' },
]

const ACHIEVEMENTS = [
  {
    title: 'Лингвистическое образование',
    text: 'Окончила МГЛУ им. Мориса Тореза.',
  },
  {
    title: 'Автор разговорных клубов',
    text: 'Создала и развиваю тематические клубы общения (включая Tea Time Club).',
  },
  {
    title: 'Эксперт в учебных материалах',
    text: 'Автор линейки учебников My Level и курса по временам Commonly used grammar tenses.',
  },
  {
    title: 'Переводчик',
    text: 'Перевела и озвучила курс Ульяны Бойко «Работа в руках и боковые».',
  },
  {
    title: 'Организатор мероприятий',
    text: 'Провела семинар «Работа с лошадью с точки зрения биомеханики» (40+ участников).',
  },
]

function CheckIcon() {
  return (
    <svg className="about__check" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        d="m5 12.5 4.5 4.5L19 7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function About() {
  return (
    <section className="section section--alt" id="about">
      <div className="container about__inner">
        <div className="about__text">
          <h2>Обо мне</h2>
          <p>
            Я — Дарья Борисова, преподаватель и методист. Специализируюсь на создании
            персонализированных курсов под профессиональные и личные запросы учеников,
            работаю по коммуникативной методике в психологически комфортной среде.
          </p>
          <p>
            По иронии судьбы 9 лет назад я стала коневладельцем и преподавателем английского
            в один день. Но даже с высоким уровнем английского языка мне было непросто
            проходить зарубежные конные обучения, так я решила объединить два этих мира
            и создать уникальный курс английского для конников.
          </p>
          <h3 className="about__subtitle">Опыт и квалификация</h3>
          <ul className="about__list">
            {ACHIEVEMENTS.map((a) => (
              <li key={a.title}>
                <CheckIcon />
                <p>
                  <strong>{a.title}</strong> — {a.text}
                </p>
              </li>
            ))}
          </ul>
          <p className="about__outro">
            Строю занятия вокруг реальных ситуаций: разговор с тренером, покупка амуниции,
            коммуникация с ветеринаром.
          </p>
        </div>
        <div className="about__photos">
          {PHOTOS.map((p) => (
            <img
              key={p.src}
              className={`ph about__photo ${p.cls}`}
              src={p.src}
              width={p.width}
              height={p.height}
              loading="lazy"
              decoding="async"
              alt={p.alt}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
