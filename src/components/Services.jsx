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
        <div className="services__grid">
          {SERVICES.map((s) => (
            <article className="card services__card" key={s.title}>
              <p className="services__who">{s.who}</p>
              <h3>{s.title}</h3>
              <p>{s.what}</p>
            </article>
          ))}
        </div>
        <h3 className="services__formats-title">Форматы проведения</h3>
        <ul className="services__formats">
          {FORMATS.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
