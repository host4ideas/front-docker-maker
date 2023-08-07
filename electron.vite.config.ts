import { resolve } from 'path'
import {
  UserConfigSchema,
  defineConfig,
  externalizeDepsPlugin
} from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const userConfig: UserConfigSchema = {
    main: {
      plugins: [externalizeDepsPlugin()]
    },
    preload: {
      plugins: [externalizeDepsPlugin()]
    }
  }

  if (mode === 'android') {
    userConfig.renderer = {
      resolve: {
        alias: {
          '@renderer': resolve('src/renderer/src')
        }
      },
      plugins: [react()],
      build: {
        outDir: 'android-build'
      }
    }
  } else if (mode === 'web') {
    userConfig.renderer = {
      resolve: {
        alias: {
          '@renderer': resolve('src/renderer/src')
        }
      },
      plugins: [react()],
      build: {
        outDir: 'web-build'
      }
    }
  } else if (mode === 'desktop') {
    userConfig.renderer = {
      resolve: {
        alias: {
          '@renderer': resolve('src/renderer/src')
        }
      },
      plugins: [react()],
      build: {
        outDir: 'out/renderer'
      }
    }
  }

  return userConfig
})
