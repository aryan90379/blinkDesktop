// preload.ts or preload.mjs
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  setWindowSize: (size: { width: number; height: number }) => {
    ipcRenderer.send('set-window-size', size)
  }
})
