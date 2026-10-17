const STEPS = [
  { title: 'Диагностика', text: 'Определяем уровень и цели' },
  { title: 'Индивидуальный план', text: 'Под вашу дисциплину и задачи' },
  {
    title: 'Практика на реальных материалах',
    text: 'FEI-правила, каталоги лошадей, видео с турниров, переписка с заводчиками',
  },
  {
    title: 'Разбор кейсов',
    text: '«Что сказать вету?», «Как ответить судье?», «Как торговаться с заводчиком?»',
  },
  { title: 'Домашние задания', text: 'Аудио, видео, чтение' },
]

export default function Lessons() {
  return (
    <section className="section" id="lessons">
      <div className="container">
        <h2>Как проходят занятия</h2>
        <ol className="lessons__list">
          {STEPS.map((s, i) => (
            <li className="lessons__step" key={s.title}>
              <span className="lessons__num">{i + 1}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
