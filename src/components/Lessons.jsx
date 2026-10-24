import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const STEPS = [
  { title: 'Диагностика', text: 'Определяем ваш текущий уровень и цели.' },
  { title: 'План обучения', text: 'Выбираем подходящий формат и программу под ваши задачи.' },
  {
    title: 'Практика на реальных материалах',
    text:
      'Учимся на том, что реально окружает конника: FEI-правила, семинар Беттины Бьолик ' +
      '(Bettina Biolik) — лицензированного тренера по Академическому искусству верховой езды, ' +
      'интервью с Ингрид Климке (Ingrid Klimke) — двукратной олимпийской чемпионкой.',
  },
]

const MODULES = [
  { label: 'Module I', title: 'Tack', text: 'Термины по конной амуниции' },
  { label: 'Module II', title: 'Anatomy', text: 'Базовая анатомия лошади' },
  { label: 'Module III', title: 'Ground Work', text: 'Термины для работы в руках' },
  { label: 'Module IV', title: 'Riding', text: 'Термины для работы верхом' },
  { label: 'Module V', title: 'Stable', text: 'Термины для ориентирования в конюшне' },
]

function ModulesModal({ onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    // Блокируем прокрутку страницы под открытым окном
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return createPortal(
    <div
      className="modal__overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modules-title">
        <button
          ref={closeRef}
          type="button"
          className="modal__close"
          aria-label="Закрыть"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6 6 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <h3 id="modules-title">Примеры модулей</h3>
        <div className="modules__grid">
          {MODULES.map((m) => (
            <article className="module-item" key={m.label}>
              <p className="module-item__num">{m.label}</p>
              <h4 className="module-item__title">{m.title}</h4>
              <p className="module-item__descr">{m.text}</p>
            </article>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default function Lessons() {
  const [open, setOpen] = useState(false)

  return (
    <section className="section" id="lessons">
      <div className="container">
        <h2>Как проходят занятия</h2>
        <p className="lessons__intro">
          Моя главная задача — не просто дать вам слова, а научить использовать их. Поэтому
          каждый урок имеет практическую цель, занятия строятся по коммуникативной методике:
          мы много говорим на конные темы и отрабатываем ключевые навыки — восприятие речи
          на слух, чтение профессиональных текстов и разговорную речь.
        </p>
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
        <button
          type="button"
          className="btn btn-outline lessons__modules-btn"
          onClick={() => setOpen(true)}
        >
          Посмотреть примеры модулей
        </button>
        {open && <ModulesModal onClose={() => setOpen(false)} />}
      </div>
    </section>
  )
}
