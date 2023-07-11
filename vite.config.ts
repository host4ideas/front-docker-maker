import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  if (mode && mode === 'android') {
    return {
      plugins: [react()],
      build: {
        outDir: 'android-build'
      }
    }
  } else {
    return {
      plugins: [react()],
      build: {
        outDir: 'web-build'
      }
    }
  }
})
