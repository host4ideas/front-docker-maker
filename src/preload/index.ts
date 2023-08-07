import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { IPC_MESSAGES } from './ipcMessages'

const rendererFuncs = {
  sendLoginMessage: () => {
    ipcRenderer.send(IPC_MESSAGES.LOGIN)
  },
  sendSignoutMessage: () => {
    ipcRenderer.send(IPC_MESSAGES.LOGOUT)
  },
  requestProfileData: () => {
    ipcRenderer.send(IPC_MESSAGES.GET_PROFILE)
  },
  handleProfileData: (func) => {
    ipcRenderer.on(IPC_MESSAGES.SET_PROFILE, (event, ...args) =>
      func(event, ...args)
    )
  },
  handleProfileImage: (func) => {
    ipcRenderer.on(IPC_MESSAGES.SET_PROFILE_IMAGE, (event, ...args) =>
      func(event, ...args)
    )
  },
  requestApiToken: () => {
    ipcRenderer.send(IPC_MESSAGES.GET_API_TOKEN)
  },
  handleApiToken: (func) => {
    ipcRenderer.on(IPC_MESSAGES.SET_API_TOKEN, (event, ...args) =>
      func(event, ...args)
    )
  },
  requestGetAccount: () => {
    ipcRenderer.send(IPC_MESSAGES.GET_ACCOUNT)
  },
  handleGetAccount: (func) => {
    ipcRenderer.on(IPC_MESSAGES.SET_ACCOUNT, (event, ...args) =>
      func(event, ...args)
    )
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('renderer', rendererFuncs)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.renderer = rendererFuncs
}
