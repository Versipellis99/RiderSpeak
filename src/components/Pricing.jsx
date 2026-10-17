// TODO: цены будут меняться
const PLANS = [
  { title: 'Пробный урок', price: 'Бесплатно', note: 'В группе, в указанное время' },
  { title: 'Разовое занятие', price: '5 000 ₽' },
  { title: 'Пакет 5 занятий', price: '5 000 ₽', note: 'за занятие' },
  { title: 'Пакет 10 занятий', price: '5 000 ₽', note: 'за занятие' },
  { title: 'Интенсив перед турниром', price: '5 000 ₽', note: 'за занятие, 3 занятия за неделю' },
  { title: 'Разговорный клуб', price: '5 000 ₽', note: 'абонемент на месяц' },
]

export default function Pricing() {
  return (
    <section className="section section--alt" id="pricing">
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
