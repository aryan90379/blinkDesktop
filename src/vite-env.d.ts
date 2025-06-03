/// <reference types="vite/client" />

export {};

declare global {
  interface Window {
    electronAPI: {
      setWindowSize: (size: { width: number; height: number }) => void; // Resizes the window
      openSettings: () => void; // Opens settings (if implemented)
      setBackgroundColor: (color: string) => void; // Sets the window background color
      onBgColorChange: (callback: (color: string) => void) => () => void; // Listens for background color changes
      onMainProcessMessage?: (callback: (message: string) => void) => void; // Listens for messages from the main process
      closeWindow: () => void; // Closes the current window
    };
  }
}
