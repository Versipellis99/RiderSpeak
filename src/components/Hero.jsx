import heroPhoto from '../assets/media/hero-photo2.webp'

const NAV = [
  { href: '#formats', label: 'Услуги' },
  { href: '#lessons', label: 'Занятия' },
  { href: '#results', label: 'Результаты' },
  { href: '#pricing', label: 'Цены' },
  { href: '#contacts', label: 'Контакты' },
]

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container hero__bar">
        <a className="brand" href="#hero">RiderSpeaks</a>
        <nav className="hero__nav" aria-label="Разделы сайта">
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
            <a className="btn btn--light" href="#contacts">Записаться на пробный урок</a>
            <a className="btn btn--ghost-light" href="#pricing">Узнать стоимость</a>
          </div>
        </div>

        <figure className="hero__media">
          {/* Первый экран: без loading="lazy", фото грузится сразу */}
          <img
            className="hero__photo"
            src={heroPhoto}
            width={1080}
            height={1920}
            fetchPriority="high"
            alt="Дарья Борисова обнимает лошадь"
          />
          <figcaption className="hero__caption">Редкая специализация: английский для конников</figcaption>
        </figure>
      </div>
    </section>
  )
}
