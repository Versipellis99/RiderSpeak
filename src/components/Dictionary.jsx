import glossaryPdf from '../assets/documents/Glossary.pdf'

const TOPICS = [
  'Названия амуниции',
  'Движения лошади',
  'Элементы выездки',
  'Конкурные препятствия',
]

export default function Dictionary() {
  return (
    <section className="section" id="dictionary">
      <div className="container dictionary__inner">
        <div>
          <h2>Конный словарь</h2>
          <p className="dictionary__lead">PDF-словарь: 50 главных терминов конного мира</p>
          <ul className="dictionary__list">
            {TOPICS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        {/* PDF открывается в новой вкладке (просмотр в браузере, оттуда его можно сохранить) */}
        <a className="btn btn-primary" href={glossaryPdf} target="_blank" rel="noopener noreferrer">
          Скачать PDF
        </a>
      </div>
    </section>
  )
}
