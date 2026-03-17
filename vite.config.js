import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    sourcemap: mode === 'production' ? false : 'inline',
    cssCodeSplit: true,
    target: 'es2022',
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'vendor'
          }
          if (id.includes('node_modules/firebase')) {
            return 'firebase'
          }
          if (id.includes('node_modules/recharts')) {
            return 'charts'
          }
          if (id.includes('node_modules/react-hook-form') || id.includes('node_modules/zod')) {
            return 'forms'
          }
          if (id.includes('@google/generative-ai')) {
            return 'gemini'
          }
          if (id.includes('node_modules/jspdf')) {
            return 'pdf'
          }
        }
      }
    }
  },
}))
