import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  server: {
    proxy: {
      '/foods': 'http://localhost:5000',
      '/users': 'http://localhost:5000',
    },
  },
})
