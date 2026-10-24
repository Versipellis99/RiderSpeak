// TODO: цены будут меняться
const PLANS = [
  { title: 'Пробный урок', price: 'Бесплатно', note: 'В мини-группе, в указанное время' },
  { title: 'Разовое занятие', price: '5 000 ₽' },
  { title: 'Пакет 4 занятий', price: '12 000 ₽', note: 'Системная работа над базой' },
  { title: 'Пакет 8 занятий', price: '24 000 ₽', note: 'Для глубокого погружения в язык' },
  { title: 'Разговорный клуб', price: '2 000 ₽', note: 'Абонемент на месяц' },
  { title: 'Интенсив перед турниром', price: '10 000 ₽', note: '3 занятия с фокусом на конкретное событие' },
]

export default function Pricing() {
  return (
    <section className="section section--dark" id="pricing">
      <div className="container">
        <h2>Цены</h2>
        <div className="pricing__grid">
          {PLANS.map((p, i) => (
            <article className={`card pricing__card${i === 0 ? ' pricing__card--free' : ''}`} key={p.title}>
              <h3>{p.title}</h3>
              <p className="pricing__price">{p.price}</p>
              {p.note && <p className="pricing__note">{p.note}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
