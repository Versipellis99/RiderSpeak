const PROBLEMS = [
  'Купили импортную лошадь, но не понимаете документы и вет-протоколы?',
  'Приезжает иностранный тренер, а вы боитесь сказать что-то не так?',
  'Хотите выступать за рубежом, но не знаете, как общаться с судьями и организаторами?',
  'Читаете зарубежные статьи по тренингу, но переводчик путает термины?',
  'Нужно вести переписку с иностранными заводчиками или ветврачами?',
]

export default function Problems() {
  return (
    <section className="section" id="problems">
      <div className="container">
        <h2>Знакомо?</h2>
        <ul className="problems__list">
          {PROBLEMS.map((text, i) => (
            <li className="card problems__item" key={text}>
              <span className="problems__num">{String(i + 1).padStart(2, '0')}</span>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
