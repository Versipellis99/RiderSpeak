// Стрелка в правом нижнем углу: возвращает туда, откуда человек нажал кнопку, ведущую в «Контакты»
export default function BackButton({ visible, onClick }) {
  return (
    <button
      type="button"
      className={`back-btn${visible ? ' is-visible' : ''}`}
      aria-label="Вернуться к месту, откуда вы перешли"
      title="Вернуться назад"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
        <path
          d="M12 19V5M6 11l6-6 6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
