const TOPICS = [
  '100 главных терминов выездки на английском',
  'Как называются части амуниции: полный глоссарий',
  'FEI-правила: ключевые фразы для соревнований',
  'Команды для работы с лошадью на английском',
]

export default function Dictionary() {
  return (
    <section className="section" id="dictionary">
      <div className="container dictionary__inner">
        <div>
          <h2>Конный словарь</h2>
          <p className="dictionary__lead">PDF-словарь с ключевыми терминами</p>
          <ul className="dictionary__list">
            {TOPICS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        {/* TODO: положить файл в public/, указать путь (href="/dictionary.pdf") и убрать onClick */}
        <a className="btn btn-primary" href="#" onClick={(e) => e.preventDefault()}>
          Скачать PDF
        </a>
      </div>
    </section>
  )
}
