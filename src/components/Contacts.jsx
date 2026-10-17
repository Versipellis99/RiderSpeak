const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const PHONE = { label: '+7 915 198 2782', href: 'tel:+79151982782' }
const EMAIL = { label: 'dolinrose@mail.ru', href: 'mailto:dolinrose@mail.ru' }

// TODO: добавить ссылку на сообщество
const GROUP = { label: 'Блог о конном мире', href: '#' }

const SOCIALS = [
  {
    name: 'Telegram',
    title: 'Telegram',
    href: 'https://t.me/DariaTTC',
    external: true,
    icon: <path d="M21 4 3 11l5.5 2L10 19l3-4 5 4z M8.5 13 21 4" {...stroke} />,
  },
  {
    name: 'Instagram',
    title: 'Instagram',
    href: 'https://instagram.com/daria_teatimeclub',
    external: true,
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="5" {...stroke} />
        <circle cx="12" cy="12" r="3.6" {...stroke} />
        <circle cx="16.8" cy="7.2" r="0.6" fill="currentColor" />
      </>
    ),
  },
  {
    name: 'ВКонтакте',
    title: 'ВКонтакте',
    href: 'https://vk.ru/id36231583',
    external: true,
    icon: (
      <text x="12" y="16" textAnchor="middle" fontSize="11" fontWeight="600" fill="currentColor">
        VK
      </text>
    ),
  },
  {
    name: 'Написать на почту',
    title: EMAIL.label,
    href: EMAIL.href,
    external: false,
    icon: (
      <>
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" {...stroke} />
        <path d="m4 7 8 6 8-6" {...stroke} />
      </>
    ),
  },
]

const externalProps = { target: '_blank', rel: 'noopener noreferrer' }

export default function Contacts() {
  return (
    <section className="section" id="contacts">
      <div className="container contacts__inner">
        <h2>Контакты</h2>
        <p className="contacts__lead">Свяжитесь удобным способом</p>

        <div className="contacts__direct">
          <a className="contacts__phone" href={PHONE.href}>{PHONE.label}</a>
          <a className="contacts__email" href={EMAIL.href}>{EMAIL.label}</a>
        </div>

        <ul className="contacts__socials">
          {SOCIALS.map((s) => (
            <li key={s.name}>
              <a
                className="contacts__icon"
                href={s.href}
                aria-label={s.name}
                title={s.title}
                {...(s.external ? externalProps : {})}
              >
                <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
                  {s.icon}
                </svg>
              </a>
            </li>
          ))}
        </ul>

        <div className="contacts__group">
          <a className="btn btn-outline" href={GROUP.href} {...externalProps}>
            {GROUP.label}
          </a>
        </div>
      </div>
    </section>
  )
}
