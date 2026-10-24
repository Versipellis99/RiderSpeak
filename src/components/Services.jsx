const SERVICES = [
  {
    title: 'Старт и основы',
    who: 'Новички',
    what: 'Базовая лексика, команды, амуниция и комфортное общение на конюшне.',
  },
  {
    title: 'Тренировки и семинары',
    who: 'Спортсмены',
    what: 'Язык для общения с тренером, понимания терминологии и участия в профильных мероприятиях.',
  },
  {
    title: 'Турниры',
    who: 'Выезжающие за рубеж',
    what: 'Регистрация на соревнования, понимание правил и уверенная коммуникация с судьями.',
  },
  {
    title: 'Работа с иностранцами',
    who: 'Тренеры и бизнес',
    what: 'Проведение тренировок, развитие международной практики, помощь в переводе авторских курсов.',
  },
]

const FORMATS = ['Индивидуально', 'В мини-группе / паре', 'В большой группе']

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <h2>Для кого</h2>
        {/* Разметка и стили перенесены из LandingV2 */}
        <div className="audience">
          {SERVICES.map((s) => (
            <article className="audience__item" key={s.title}>
              <p className="audience__who">{s.who}</p>
              <h3>{s.title}</h3>
              <p className="audience__what">{s.what}</p>
            </article>
          ))}
        </div>
        <div className="formats-row">
          <h3>Форматы проведения</h3>
          <ul>
            {FORMATS.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
