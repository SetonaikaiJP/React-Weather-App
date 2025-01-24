import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // I want to change dev server to localhost3000
  server: {
    host: 'localhost',
    port: 3000
  },
  build: {
    rollupOptions: {
      external: ['react-router-dom']
    }
  }
})
