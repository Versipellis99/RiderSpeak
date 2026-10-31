import { useEffect, useRef, useState } from 'react'

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const TELEGRAM = 'https://t.me/DariaTTC'
const EMAIL = 'dariaborisovattc@gmail.com'

// Копирование в буфер. navigator.clipboard работает только по https и на localhost,
// поэтому для просмотра с телефона по адресу в локальной сети есть запасной способ
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    const ok = document.execCommand('copy')
    area.remove()
    return ok
  }
}

// Почта копируется по нажатию: без ссылки и перехода в почтовую программу
function EmailCopy() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const onClick = async () => {
    if (!(await copyText(EMAIL))) return
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button type="button" className="contacts__email" title="Нажмите, чтобы скопировать" onClick={onClick}>
      {EMAIL}
      <span className={`contacts__copied${copied ? ' is-shown' : ''}`} role="status">
        {copied ? 'Почта скопирована' : ''}
      </span>
    </button>
  )
}

const GROUP = { label: 'Блог о конном мире', href: 'https://t.me/daria_teatimeclub' }

// Telegram вынесен в главную кнопку выше, поэтому в ряду иконок его нет
const SOCIALS = [
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
    href: 'https://vk.ru/club241698666',
    external: true,
    icon: (
      <text x="12" y="16" textAnchor="middle" fontSize="11" fontWeight="600" fill="currentColor">
        VK
      </text>
    ),
  },
]

const externalProps = { target: '_blank', rel: 'noopener noreferrer' }

export default function Contacts() {
  return (
    <section className="section" id="contacts">
      <div className="container contacts__inner">
        <h2>Контакты</h2>
        <p className="contacts__lead">Проще всего написать мне в Telegram</p>

        <a className="btn btn-primary contacts__tg" href={TELEGRAM} {...externalProps}>
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path d="M21 4 3 11l5.5 2L10 19l3-4 5 4z M8.5 13 21 4" {...stroke} />
          </svg>
          Написать в Telegram
        </a>

        <div className="contacts__direct">
          <EmailCopy />
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
