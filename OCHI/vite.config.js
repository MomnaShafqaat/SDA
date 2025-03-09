import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Change to your desired port
    strictPort: true, // Ensures it doesn't switch to another port
  },
})
