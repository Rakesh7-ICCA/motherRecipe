import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  server: {
    host: true,
    allowedHosts: ['.ngrok-free.app'],
    watch: {
      usePolling: true, // Fixes filesystem events on Windows
    },
  },
  optimizeDeps: {
    include: ['react-icons'], // Pre-bundle frequently changing deps
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})