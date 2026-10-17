import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Сайт публикуется на GitHub Pages в подпапке: https://Versipellis99.github.io/riderspeak/
  base: '/riderspeak/',
  plugins: [react()],
})
