import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // sets default port to localhost:3000 
    port: 3000,
    proxy: {
      '/api/v1': 'http://localhost:8000/',
    }
  }
})
