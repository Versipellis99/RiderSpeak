import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Сайт публикуется на GitHub Pages в подпапке: https://versipellis99.github.io/RiderSpeaks/
  base: '/RiderSpeaks/',
  plugins: [react()],
})
