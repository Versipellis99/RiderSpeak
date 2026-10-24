const PROBLEMS = [
  'Приехали на конную прогулку за рубежом, но не понимаете инструкции тренера на английском?',
  'Приезжает иностранный тренер, а вы боитесь сказать что-то не так?',
  'Хотели бы выступать за рубежом, но боитесь, что не сможете поддержать беседу с иностранными всадниками?',
  'Читаете конную литературу в оригинале, но переводчик путает термины?',
  'Хотите выйти на международный рынок, но знаний языка не хватает для переговоров?',
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
