const FORMATS = [
  {
    title: 'Полный курс',
    text: 'Системная программа под вашу дисциплину и задачи. Оптимально 8–12 занятий.',
  },
  {
    title: 'Разовые консультации',
    text: 'Точечная помощь по конкретному вопросу: перевод документа, разбор письма, подготовка к звонку.',
  },
  {
    title: 'Подготовка к соревнованиям',
    text: 'Регистрация, FEI-правила, общение с судьями и организаторами.',
  },
  {
    title: 'Разговорный клуб',
    text: 'Групповая практика в неформальной обстановке, разбор реальных ситуаций.',
  },
  {
    title: 'Интенсив перед турниром',
    text: '3 занятия за неделю с фокусом на конкретное событие.',
  },
]

export default function Formats() {
  return (
    <section className="section section--dark" id="formats">
      <div className="container">
        <h2>Услуги</h2>
        <div className="formats__grid">
          {FORMATS.map((f) => (
            <article className="card formats__card" key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
