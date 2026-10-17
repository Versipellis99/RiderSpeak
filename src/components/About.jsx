import { placeholder } from '../assets/placeholder.js'

// TODO: заменить на реальные фото (разные форматы)
const PHOTOS = [
  { src: placeholder(4, 5), alt: 'Фото: Дарья на конюшне — заменить', cls: 'about__photo--tall' },
  { src: placeholder(3, 2), alt: 'Фото: Дарья на турнире — заменить', cls: 'about__photo--wide' },
  { src: placeholder(1, 1), alt: 'Фото: Дарья с учениками — заменить', cls: 'about__photo--square' },
]

export default function About() {
  return (
    <section className="section section--alt" id="about">
      <div className="container about__inner">
        <div className="about__text">
          <h2>Обо мне</h2>
          {/* TODO: заменить на реальный текст и цифры */}
          <p>
            Я Дарья Борисова. С лошадьми связана более X лет: у меня своя лошадь,
            регулярные тренировки и ежедневная работа на конюшне. Я бываю на турнирах и
            сборах, живу внутри конного сообщества и знаю его людей и ритм не понаслышке.
            Конную среду я знаю изнутри — не по учебникам, а по практике.
            {/* TODO: уточнить реальные факты (лошадь, дисциплина, турниры, сборы) */}
          </p>
          <p>
            Свободно владею английским (уровень C1/C2, сертификат IELTS/TOEFL — X баллов).
            Работала с иностранными тренерами и спортсменами, переводила на сборах и
            соревнованиях.
          </p>
          <p>
            Преподаю более X лет, обучила X учеников. Строю занятия вокруг реальных
            ситуаций: разговор с тренером, документы на лошадь, регистрация на турнир.
          </p>
        </div>
        <div className="about__photos">
          {PHOTOS.map((p) => (
            // TODO: заменить на реальное фото
            <img key={p.alt} className={`ph about__photo ${p.cls}`} src={p.src} alt={p.alt} />
          ))}
        </div>
      </div>
    </section>
  )
}
