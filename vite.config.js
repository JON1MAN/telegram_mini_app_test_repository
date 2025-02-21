import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: "telegram_mini_app_test_repository/",
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    https: true,
    allowedHosts: ['.ngrok-free.app'] // Разрешаем все ngrok-домены
  },
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
