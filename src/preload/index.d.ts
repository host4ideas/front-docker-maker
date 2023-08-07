import { ElectronAPI } from '@electron-toolkit/preload'
import type { CustomAPI } from './types'

declare global {
  interface Window {
    electron: ElectronAPI
    renderer: CustomAPI
  }
}
