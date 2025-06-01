/// <reference types="vite/client" />

interface Window {
  electronAPI: {
    setWindowSize: (size: { width: number; height: number }) => void
  }
}
