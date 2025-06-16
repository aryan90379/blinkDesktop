// main.ts
import { app, BrowserWindow, screen, ipcMain } from 'electron'
// import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

// const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
app.whenReady().then(() => {
  app.setLoginItemSettings({
    openAtLogin: true,
    path: app.getPath('exe'),
  })
})

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

let win: BrowserWindow | null = null

function createWindow() {
  const display = screen.getPrimaryDisplay()
  const { width: screenWidth } = display.workAreaSize

  const winWidth = 300
  const winHeight = 300

  const windowX = screenWidth - winWidth
  const windowY = 0
 


  win = new BrowserWindow({
    width: winWidth,
    height: winHeight,
    x: windowX,
    y: windowY,
    frame: false,
    transparent: true,
    resizable: true,
    skipTaskbar: true,
    focusable: true,
    alwaysOnTop: true,
    hasShadow: false,
    type: 'toolbar',
    minWidth: 140,   // ⬅️ Set minimum width
    minHeight: 120,  // ⬅️ Set minimum height
    maxWidth: 400,   // ⬅️ Set maximum width
    maxHeight: 500,  // ⬅️ Set maximum height
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // Keep window always on top with specific mode
  win.setAlwaysOnTop(true, 'screen-saver')

  // Show window on all workspaces and visible on fullscreen apps
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })

  win.setFullScreenable(false)
//  win.webContents.openDevTools()
  // Load URL or file depending on dev or prod
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  // Send a message after content is loaded
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Clean up reference on window close
  win.on('closed', () => {
    win = null
  })
}

// Aspect ratio for resizing
const ASPECT_RATIO = 4 / 3 // width / height

// Listen for resize requests from renderer
ipcMain.on('resize-window', (_event, { width }) => {
  // Calculate height based on aspect ratio
  const height = Math.round(width / ASPECT_RATIO)

  const display = screen.getPrimaryDisplay()
  const { width: screenWidth } = display.workAreaSize

  const newX = screenWidth - width
  const newY = 0

  if (win) {
    win.setBounds({
      width,
      height,
      x: newX,
      y: newY
    })
  }
})

// Listen for close window requests from renderer
ipcMain.on('close-window', () => {
  if (win) {
    win.close()
    win = null
  }
})



// Quit app when all windows closed (except macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

// Re-create window on macOS when dock icon clicked and no windows open
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// Create window when app ready
app.whenReady().then(() => {
  createWindow()
})
ipcMain.on('close-window', (event) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  if (window) window.close();
});