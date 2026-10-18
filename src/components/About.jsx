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
    text: 'Окончила престижный Московский государственный лингвистический университет им. Мориса Тореза (МГЛУ).',
  },
  {
    title: 'Автор разговорных клубов',
    text: 'Создала и развиваю тематические клубы общения (включая Tea Time Club).',
  },
  {
    title: 'Эксперт в учебных материалах',
    text: 'Приняла участие в разработке линейки учебников английского языка My Level.',
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
          {/* TODO: указать точное количество лет */}
          <p>
            Я Дарья Борисова. С лошадьми связана более X лет: у меня своя лошадь,
            регулярные тренировки и ежедневная работа на конюшне.
          </p>
          <p>
            По иронии судьбы, вот уже 8 лет я совмещаю две главные страсти: преподавание
            английского и лошадей. Проводя параллели между занятиями в седле и уроками
            языка, я пришла к логичному решению — объединить эти миры и создать
            специализированный курс английского для конников.
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
            Строю занятия вокруг реальных ситуаций: разговор с тренером, документы на лошадь,
            регистрация на турнир.
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
