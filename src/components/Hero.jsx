import { placeholder } from '../assets/placeholder.js'

// TODO: заменить на реальное фото (вертикальное 4:5)
const HERO_PHOTO = placeholder(4, 5)

export default function Hero() {
  return (
    <section className="section hero" id="hero">
      <div className="container hero__inner">
        <div className="hero__text">
          <h1>Преподаватель английского языка в конной сфере</h1>
          <p className="hero__sub">
            Помогу понять иностранных тренеров, читать FEI-правила, общаться на
            зарубежных турнирах и работать с импортными лошадьми
          </p>
          <div className="hero__actions">
            <a className="btn btn-hero" href="#contacts">Записаться на пробный урок</a>
            <a className="btn btn-hero-outline" href="#pricing">Узнать стоимость</a>
          </div>
        </div>
        {/* TODO: заменить на реальное фото */}
        <img className="ph hero__photo" src={HERO_PHOTO} alt="Фото: Дарья Борисова, преподаватель — заменить" />
      </div>
    </section>
  )
}
