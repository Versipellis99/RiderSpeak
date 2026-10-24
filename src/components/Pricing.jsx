// TODO: цены будут меняться
// Прайс-лист: пробный урок — первая строка в золотой рамке, дальше две группы
const FREE = { title: 'Пробный урок', price: 'Бесплатно', note: 'В мини-группе, в указанное время' }

const GROUPS = [
  {
    title: 'Занятия',
    items: [
      { title: 'Разовое занятие', price: '5 000 ₽' },
      { title: 'Пакет 4 занятий', price: '12 000 ₽', note: 'Системная работа над базой' },
      { title: 'Пакет 8 занятий', price: '24 000 ₽', note: 'Для глубокого погружения в язык' },
    ],
  },
  {
    title: 'Клуб и интенсив',
    items: [
      { title: 'Разговорный клуб', price: '2 000 ₽', note: 'Абонемент на месяц' },
      { title: 'Интенсив перед турниром', price: '10 000 ₽', note: '3 занятия с фокусом на конкретное событие' },
    ],
  },
]

function PriceRow({ item, free = false }) {
  return (
    <li className="price-item">
      <div className={`price-row${free ? ' price-row--free' : ''}`}>
        <span className="price-row__name">{item.title}</span>
        <span className="price-row__dots" aria-hidden="true" />
        <span className="price-row__value">{item.price}</span>
      </div>
      {item.note && <p className="price-row__note">{item.note}</p>}
    </li>
  )
}

export default function Pricing() {
  return (
    <section className="section section--dark" id="pricing">
      <div className="container">
        <h2>Цены</h2>
        <div className="price-list">
          <ul>
            <PriceRow item={FREE} free />
          </ul>
          {GROUPS.map((g) => (
            <div className="price-group" key={g.title}>
              <h3 className="price-group__title">{g.title}</h3>
              <ul>
                {g.items.map((item) => (
                  <PriceRow item={item} key={item.title} />
                ))}
              </ul>
            </div>
          ))}
          <a className="btn btn-primary price-list__cta" href="#contacts">Записаться на пробный урок</a>
        </div>
      </div>
    </section>
  )
}
