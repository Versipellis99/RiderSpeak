const FORMATS = [
  {
    title: 'Полный курс',
    text: 'Системная программа обучения из 19 уроков.',
  },
  {
    title: 'Подготовка к выезду',
    text: 'Специальный модуль из 4–5 занятий для тех, кто готовится к турниру, сборам или поездке за рубеж.',
  },
  {
    title: 'Разговорный клуб',
    text: 'Групповая практика в неформальной обстановке: обсуждаем реальные ситуации из конной жизни и учимся говорить свободно.',
  },
  {
    title: 'Перевод и озвучка',
    text: 'Перевод и озвучка авторских курсов, вебинаров и обучающих материалов для конной сферы.',
  },
  {
    title: 'Разовая консультация',
    text: 'Индивидуальная помощь с вопросом, где требуется английский язык и знание конной специфики.',
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
