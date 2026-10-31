import { useEffect, useRef, useState } from 'react'
import footerPhoto from '../assets/media/footer-photo.webp'

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

// Telegram вынесен в главную кнопку, поэтому среди ссылок его нет
const SOCIALS = [
  { name: 'Instagram', href: 'https://instagram.com/daria_teatimeclub' },
  { name: 'ВКонтакте', href: 'https://vk.ru/club241698666' },
]

const externalProps = { target: '_blank', rel: 'noopener noreferrer' }

export default function Contacts() {
  return (
    <section className="section" id="contacts">
      <div className="container">
        <div className="contacts__panel">
          <div className="contacts__text">
            <div className="contacts__head">
              <h2>Напишите мне там, где вам удобнее</h2>
              {/* TODO: подтвердить у владельца фразу «Отвечу и подскажу, с чего начать» */}
              <p className="contacts__lead">Отвечу и подскажу, с чего начать.</p>
            </div>

            <div className="contacts__actions">
              <a className="btn btn-primary contacts__tg" href={TELEGRAM} {...externalProps}>
                <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                  <path d="M21 4 3 11l5.5 2L10 19l3-4 5 4z M8.5 13 21 4" {...stroke} />
                </svg>
                Написать в Telegram
              </a>

              <div className="contacts__socials">
                {SOCIALS.map((s) => (
                  <a className="btn contacts__social" key={s.name} href={s.href} {...externalProps}>
                    {s.name}
                  </a>
                ))}
              </div>

              <EmailCopy />
            </div>

            <a className="contacts__blog" href={GROUP.href} {...externalProps}>
              Или почитайте блог о конном мире
            </a>
          </div>

          <div className="contacts__photo">
            <img
              src={footerPhoto}
              width={941}
              height={1070}
              loading="lazy"
              decoding="async"
              alt="Дарья Борисова на фоне конюшни"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
