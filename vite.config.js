import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

const root = import.meta.dirname

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(root, './src'),
      '@components': resolve(root, './src/components'),
      '@pages': resolve(root, './src/pages'),
      '@data': resolve(root, './src/data'),
      '@context': resolve(root, './src/context'),
      '@hooks': resolve(root, './src/hooks'),
      '@theme': resolve(root, './src/theme'),
      '@utils': resolve(root, './src/utils'),
    },
  },
})
