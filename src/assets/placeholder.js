// Прозрачная SVG-заглушка с нужной пропорцией; фон задаётся классом .ph в CSS.
// TODO: заменить вызовы placeholder(...) на импорты реальных фото
export const placeholder = (w, h) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"/>`,
  )}`
