import about1 from '../assets/media/about-1.webp'
import about2 from '../assets/media/about-2.webp'
import about3 from '../assets/media/about-3.webp'

// width/height нужны браузеру, чтобы заранее зарезервировать место и страница не «прыгала»
const PHOTOS = [
  { src: about3, width: 360, height: 640, alt: 'Дарья Борисова на занятии', cls: 'about__photo--tall' },
  { src: about2, width: 5184, height: 3456, alt: 'Дарья Борисова ведёт лошадь в поводу на лугу', cls: 'about__photo--wide' },
  { src: about1, width: 3024, height: 4032, alt: 'Дарья Борисова кормит лошадь с руки', cls: 'about__photo--square' },
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
