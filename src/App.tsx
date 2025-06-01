import Draggable from 'react-draggable'
import './App.css'
import { FiSettings } from 'react-icons/fi'
import { useState } from 'react'

const widthSizes = ['20', '40', '60', '80', '100']

const colors = [
  { label: 'Frosted White', value: 'bg-white/20' },
  { label: 'Midnight Black', value: 'bg-black/20' },
  { label: 'Sky Blue', value: 'bg-blue-500/20' },
  { label: 'Rose Pink', value: 'bg-rose-500/20' },
  { label: 'Emerald Green', value: 'bg-emerald-500/20' },
  { label: 'Royal Purple', value: 'bg-purple-500/20' },
  { label: 'Sunshine Yellow', value: 'bg-yellow-400/20' },
  { label: 'Cyber Cyan', value: 'bg-cyan-500/20' },
  { label: 'Fuchsia Pulse', value: 'bg-fuchsia-500/20' },
  { label: 'Deep Gray', value: 'bg-gray-800/50' }
]

function App() {
  const [show, setShow] = useState(false)
  const [width, setWidth] = useState('64') // default width 64px
  const [settings, setSettings] = useState(false)

  // Function to handle width input change
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = e.target.value
    setWidth(newWidth)

    // Send IPC message to main process to resize the window
    if (window.electronAPI?.setWindowSize) {
      window.electronAPI.setWindowSize({ width: Number(newWidth), height: 200 }) // Keep height fixed here, or add input for it too
    }
  }

  return (
    <Draggable>
      <div className="fixed top-6 right-6 z-50 cursor-move">
        <div
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          className="relative backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl rounded-2xl p-3 flex flex-col items-center transition-all duration-300 hover:scale-105"
        >
          <img
            src="/eye.gif"
            alt="Eye Widget"
            width={Number(width) || 64}
            className="rounded-full"
          />
          {show && (
            <div
              className="cursor-pointer absolute top-0 right-0 p-1"
              onClick={() => setSettings(!settings)}
            >
              <FiSettings />
            </div>
          )}

          {/* Settings Panel */}
          {settings && (
            <div className="mt-3 w-full text-center">
              <label className="block text-white mb-1">Window Width (px)</label>
              <input
                type="number"
                min="20"
                max="500"
                value={width}
                onChange={handleWidthChange}
                className="w-24 p-1 rounded text-black"
              />
            </div>
          )}
        </div>
      </div>
    </Draggable>
  )
}

export default App
