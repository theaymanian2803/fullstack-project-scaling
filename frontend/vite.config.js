import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  envDir: '../',
  server: {
    host: true,
    proxy: {
      '/uploads': 'http://localhost:5000',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Group core React vendor files together
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Group Redux and state management
          'vendor-state': ['@reduxjs/toolkit', 'react-redux'],
          // Group UI or payment utilities
          'vendor-utils': ['@paypal/react-paypal-js', 'lucide-react'],
        },
      },
    },
  },
})
