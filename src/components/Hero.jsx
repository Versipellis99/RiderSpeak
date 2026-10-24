import heroPhoto from '../assets/media/hero-photo2.webp'

export default function Hero() {
  return (
    <section className="section hero" id="hero">
      <div className="container hero__inner">
        <div className="hero__text">
          <h1>Преподаватель английского языка в конной сфере</h1>
          <p className="hero__sub">
            Помогу преодолеть языковой барьер для учебы у иностранных тренеров, работы
            с англоязычными спортсменами, свободного общения в конных путешествиях
            и вывода ваших продуктов на международный рынок
          </p>
          <p className="hero__tagline">Редкая специализация: английский для конников</p>
          <div className="hero__actions">
            <a className="btn btn-hero" href="#contacts">Записаться на пробный урок</a>
            <a className="btn btn-hero-outline" href="#pricing">Узнать стоимость</a>
          </div>
        </div>
        {/* Первый экран: без loading="lazy", фото грузится сразу */}
        <img
          className="ph hero__photo"
          src={heroPhoto}
          width={1080}
          height={1920}
          fetchPriority="high"
          alt="Дарья Борисова обнимает лошадь"
        />
      </div>
    </section>
  )
}
