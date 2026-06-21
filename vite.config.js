import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src-react',
      '@components': '/src-react/components',
      '@pages': '/src-react/pages',
      '@hooks': '/src-react/hooks',
      '@contexts': '/src-react/contexts',
      '@utils': '/src-react/utils',
      '@assets': '/src/assets',
      '@products': '/src/products'
    }
  }
})
