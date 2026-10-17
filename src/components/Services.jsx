const SERVICES = [
  { title: 'Конный английский с нуля', who: 'Новички', what: 'Базовая лексика, команды, амуниция' },
  { title: 'Английский для выездки и конкура', who: 'Спортсмены', what: 'Терминология дисциплины, общение с судьями' },
  { title: 'Английский для соревнований за рубежом', who: 'Выезжающие спортсмены', what: 'Регистрация, FEI-правила' },
]

const FORMATS = ['Онлайн (Zoom/Skype)', 'Офлайн на конюшне', 'Комбинированно']

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
