import { app, shell, BrowserWindow, ipcMain, globalShortcut } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import AuthProvider from './AuthProvider'
import { protectedResources, msalConfig } from './authConfig'
import getGraphClient from './graph'
import { IPC_MESSAGES } from './ipcMessages'

let authProvider: AuthProvider
let mainWindow: BrowserWindow

async function loadHtmlFile() {
  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    await mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    await mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      // Allow devtools only in dev mode
      devTools: is.dev
    }
  })

  authProvider = new AuthProvider(msalConfig)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  loadHtmlFile()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  if (!is.dev)
    // Register a shortcut listener for Ctrl + Shift + I in prod
    globalShortcut.register('Control+Shift+I', () => {
      // When the user presses Ctrl + Shift + I, this function will get called
      // You can modify this function to do other things, but if you just want
      // to disable the shortcut, you can just return false
      return false
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on(IPC_MESSAGES.LOGIN, async () => {
  const account = await authProvider.login()
  mainWindow.webContents.send(IPC_MESSAGES.SET_ACCOUNT, account)
})

ipcMain.on(IPC_MESSAGES.LOGOUT, async () => {
  await authProvider.logout()
  await loadHtmlFile()
  mainWindow.webContents.send(IPC_MESSAGES.SET_ACCOUNT, undefined)
})

ipcMain.on(IPC_MESSAGES.GET_PROFILE, async () => {
  const tokenRequest = {
    scopes: protectedResources.graphMe.scopes
  }

  const tokenResponse = await authProvider.getToken(tokenRequest)

  try {
    const graphResponse = await getGraphClient(tokenResponse.accessToken)
      .api(protectedResources.graphMe.endpoint)
      .get()
    mainWindow.webContents.send(IPC_MESSAGES.SET_PROFILE, graphResponse)
  } catch (error) {
    mainWindow.webContents.send(IPC_MESSAGES.SET_PROFILE, null)
  }

  try {
    const profileImage = await getGraphClient(tokenResponse.accessToken)
      .api(protectedResources.graphMe.endpoint + '/photo/$value')
      .get()
    mainWindow.webContents.send(IPC_MESSAGES.SET_PROFILE_IMAGE, profileImage)
  } catch (error) {
    mainWindow.webContents.send(IPC_MESSAGES.SET_PROFILE_IMAGE, null)
  }
})

ipcMain.on(IPC_MESSAGES.GET_API_TOKEN, async () => {
  const tokenRequest = {
    scopes: protectedResources.api.scopes
  }

  const tokenResponse = await authProvider.getToken(tokenRequest)

  mainWindow.webContents.send(
    IPC_MESSAGES.SET_API_TOKEN,
    tokenResponse.accessToken
  )
})

ipcMain.on(IPC_MESSAGES.GET_ACCOUNT, async () => {
  const account = await authProvider.getAccount()
  mainWindow.webContents.send(IPC_MESSAGES.SET_ACCOUNT, account)
})
