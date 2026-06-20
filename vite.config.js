import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/Food-tracker-mern/' : '/',
  build: {
    outDir: 'docs',
  },
  server: {
    proxy: {
      '/foods': 'http://localhost:5000',
      '/users': 'http://localhost:5000',
    },
  },
}))
