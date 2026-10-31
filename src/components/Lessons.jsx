import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const STEPS = [
  { title: 'Диагностика', text: 'Определяем ваш текущий уровень и цели.' },
  { title: 'План обучения', text: 'Выбираем подходящий формат и программу под ваши задачи.' },
  {
    title: 'Практика на реальных материалах',
    text:
      'Учимся на том, что реально окружает конника: правила FEI, семинары и интервью ' +
      'с тренерами и чемпионами, видео и статьи о биомеханике, посадке и работе в руках, ' +
      'гайды по подбору седла и устройству конюшни.',
    materials: true,
  },
]

// title — тема или тип материала, source — источник (подпись приглушённым цветом)
// TODO: уточнить у заказчика написание Amelia Necomb (возможно, Newcomb) и формат материала Diana Porsche
const MATERIALS = [
  {
    title: 'Упражнения для улучшения посадки',
    source: 'интервью с Ингрид Климке (Ingrid Klimke), двукратной олимпийской чемпионкой',
  },
  {
    title: 'Боковые элементы: плечо, траверс, ранверс, принимание',
    source:
      'семинар Беттины Бьолик (Bettina Biolik), лицензированного тренера по Академическому искусству верховой езды',
  },
  { title: 'Биомеханика движений', source: 'статья Mel Fleming' },
  { title: 'Инструкции по сбору лошади и базовая анатомия', source: 'видео This Esme' },
  { title: 'Сбор лошади', source: 'видео Amelia Necomb' },
  { title: 'Подготовка к работе в руках', source: 'статья Marijke de Jong' },
  { title: 'Подбор седла', source: 'гайд Horse&Country' },
  { title: 'Инфраструктура конюшни', source: 'Diana Porsche' },
  { title: 'Вентиляция, освещение и оснащение конюшни', source: 'гайд British Horse Society' },
]

const MODULES = [
  { label: 'Module I', title: 'Tack', text: 'Термины по конной амуниции' },
  { label: 'Module II', title: 'Anatomy', text: 'Базовая анатомия лошади' },
  { label: 'Module III', title: 'Ground Work', text: 'Термины для работы в руках' },
  { label: 'Module IV', title: 'Riding', text: 'Термины для работы верхом' },
  { label: 'Module V', title: 'Stable', text: 'Термины для ориентирования в конюшне' },
]

// Общая оболочка поп-апа: заголовок, крестик, Esc, блокировка прокрутки страницы
function Modal({ title, titleId, onClose, children }) {
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
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
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
        <h3 id={titleId}>{title}</h3>
        {children}
      </div>
    </div>,
    document.body,
  )
}

function ModulesModal({ onClose }) {
  return (
    <Modal title="Примеры модулей" titleId="modules-title" onClose={onClose}>
      <div className="modules__grid">
        {MODULES.map((m) => (
          <article className="module-item" key={m.label}>
            <p className="module-item__num">{m.label}</p>
            <h4 className="module-item__title">{m.title}</h4>
            <p className="module-item__descr">{m.text}</p>
          </article>
        ))}
      </div>
    </Modal>
  )
}

function MaterialsModal({ onClose }) {
  return (
    <Modal title="Примеры материалов" titleId="materials-title" onClose={onClose}>
      <ul className="materials__list">
        {MATERIALS.map((m) => (
          <li className="material" key={m.title}>
            <p className="material__title">{m.title}</p>
            <p className="material__source">{m.source}</p>
          </li>
        ))}
      </ul>
    </Modal>
  )
}

export default function Lessons() {
  const [open, setOpen] = useState(false)
  const [materialsOpen, setMaterialsOpen] = useState(false)

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
                {s.materials && (
                  <button
                    type="button"
                    className="lessons__link"
                    onClick={() => setMaterialsOpen(true)}
                  >
                    Примеры материалов
                  </button>
                )}
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
        {materialsOpen && <MaterialsModal onClose={() => setMaterialsOpen(false)} />}
      </div>
    </section>
  )
}
