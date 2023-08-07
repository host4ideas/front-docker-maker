import { UserConfigExport, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const userConfig: UserConfigExport = {
    plugins: [react()]
  }

  if (mode === 'android') {
    userConfig.build = {
      outDir: 'android-build'
    }
  } else if (mode === 'web') {
    userConfig.build = {
      outDir: 'web-build'
    }
  } else if (mode === 'desktop') {
    userConfig.build = {
      outDir: 'out/renderer'
    }
  }

  return userConfig
})
