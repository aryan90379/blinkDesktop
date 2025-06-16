import './App.css'
import { FiX } from 'react-icons/fi'
import { useEffect, useRef, useState } from 'react'
import eyeGif from './assets/bravo.webm'
// import eyeGif from './assets/eye2.webm'
// import eyeGif from './assets/eye3.webm'

const eyeSizeStyles = {
  sm: '120px',
  md: '160px',
  lg: '200px',
  xl: '240px',
}

function App() {
  const [hover, setHover] = useState(false)
  const [Drag, setDrag] = useState(false)
  const [settings, setSettings] = useState(false)
  const [timerShow, setTimerShow] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [close, setClose] = useState(false)
  const [visible, setVisible] = useState(true)
  const durationOptions = [5, 10, 15, 20, 25]
  const windowWidth = 164

  const premiumColors = [
    'rgba(24, 24, 27, 0.8)',        // Onyx Black
    'rgba(234, 202, 255, 0.35)',    // Soft Lavender
    'rgba(217, 136, 128, 0.4)',     // Rose Gold
    'rgba(255, 215, 160, 0.3)',     // Champagne Gold
    'rgba(88, 101, 242, 0.35)',     // Royal Indigo
    'rgba(170, 142, 214, 0.35)',    // Amethyst
    'rgba(64, 224, 208, 0.3)',      // Turquoise Mist
    'rgba(255, 255, 255, 0.08)',    // Subtle Frosted
  ]

  // Load from localStorage on initial mount
  const [selectedColor, setSelectedColor] = useState<string>(
    localStorage.getItem('selectedColor') || 'rgba(24, 24, 27, 0.8)'
  )
  const [eyeSize, setEyeSize] = useState<'sm' | 'md' | 'lg' | 'xl'>(
    (localStorage.getItem('eyeSize') as 'sm' | 'md' | 'lg' | 'xl') || 'md'
  )
  function getSafeNumber(key: string, fallback: number): number {
    const val = localStorage.getItem(key)
    const parsed = parseFloat(val || '')
    return isNaN(parsed) || parsed <= 0 ? fallback : parsed
  }

  const [onDuration, setOnDuration] = useState<number>(getSafeNumber('onDuration', 5))
  const [offDuration, setOffDuration] = useState<number>(getSafeNumber('offDuration', 5))
  const [timer, setTimer] = useState<boolean>(localStorage.getItem('timer') === 'true')


  // Persist to localStorage when values change
  useEffect(() => {
    localStorage.setItem('selectedColor', selectedColor)
  }, [selectedColor])

  useEffect(() => {
    localStorage.setItem('eyeSize', eyeSize)
  }, [eyeSize])

  useEffect(() => {
    localStorage.setItem('onDuration', onDuration.toString())
  }, [onDuration])

  useEffect(() => {
    localStorage.setItem('offDuration', offDuration.toString())
  }, [offDuration])

  useEffect(() => {
    localStorage.setItem('timer', timer.toString())
  }, [timer])

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && videoRef.current.readyState >= 2) {
        videoRef.current.playbackRate = 0.25
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])


  // Timer logic
  useEffect(() => {
    if (!timer) {
      setVisible(true)
      return
    }

    let isVisible = true
    setVisible(true)

    const loop = () => {
      isVisible = !isVisible
      setVisible(isVisible)

      const nextTime = (isVisible ? onDuration : offDuration) * 60 * 1000
      timeoutRef.current = setTimeout(loop, nextTime)
    }

    const initialTimeout = setTimeout(loop, onDuration * 60 * 1000)

    return () => {
      clearTimeout(initialTimeout)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [timer, onDuration, offDuration])

  // Window resizing via Electron API
  useEffect(() => {
    if (window.electronAPI?.setWindowSize) {
      window.electronAPI.setWindowSize({
        width: settings ? 500 : windowWidth,
        height: 500,
      })
    }
  }, [settings, windowWidth])

  const toggleSettings = () => {
    setSettings(prev => !prev)
    if (settings) setDrag(false)
  }

  return (
    <>

      <div
        className={`app-wrapper ${visible ? '' : 'hidden'} rounded-md ${settings ? '' : 'draggable-window'}  w-screen h-screen flex flex-col items-center justify-center space-y-6`}
        style={{ backgroundColor: selectedColor }}
      >
        <div className={`${(Drag || close) ? 'draggable-window' : ''}  hover:border-2 p-2 border-white rounded-xl`}>


          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => {
              setHover(false)
            }}
            className={`relative no-drag  rounded-2xl ${hover ? 'border-red-500 ' : ''}  flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105`}
            style={{
              width: settings ? '300px' : '40vw', // Responsive based on window width
              maxWidth: '500px',
              minWidth: eyeSizeStyles[eyeSize],
            }}

          >
            {
              close ? (
                <div className="flex flex-col items-center gap-4">



                </div>


              ) : (
                <video
                  ref={videoRef}
                  src={eyeGif}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ transform: 'rotate(4deg)' }}
                  className="rounded-full object-contain"
                />

                // <>
                //   <img
                //     src={eyeGif}
                //     alt="Eye animation"
                //     className={`rounded-full p-5 object-contain w-[${eyeSizeStyles[eyeSize]}]`}
                //   />

                // </>

              )
            }



            {/* Settings button + tooltip on hover */}
            {hover && !close && (
              <div
                className="absolute top-1 right-1 flex items-center space-x-2"
              
              >


                {/* Settings Button */}
                <button
                  className="cursor-pointer text-white bg-black/40 hover:bg-black/70 rounded-full p-1 flex items-center justify-center transition duration-200"
                  onClick={toggleSettings}
                  aria-expanded={settings}
                  aria-label="Toggle settings"
                >

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16} color={"#ff0000"} fill={"none"} >
                    <path d="M10 4C10 2.89543 10.8954 2 12 2H13C14.1046 2 15 2.89543 15 4V6.55337C15 7.86603 15.8534 9.02626 17.1065 9.41722L17.8935 9.66278C19.1466 10.0537 20 11.214 20 12.5266V14C20 14.5523 19.5523 15 19 15H6C5.44772 15 5 14.5523 5 14V12.5266C5 11.214 5.85339 10.0537 7.10648 9.66278L7.89352 9.41722C9.14661 9.02626 10 7.86603 10 6.55337V4Z" stroke="#ff0000" strokeWidth="1.5"></path>
                    <path d="M6.00217 15C6.15797 16.3082 5.4957 19.5132 4 21.8679C4 21.8679 14.2924 23.0594 15.6851 17.9434V19.8712C15.6851 20.8125 15.6851 21.2831 15.9783 21.5755C16.5421 22.1377 19.1891 22.1531 19.7538 21.5521C20.0504 21.2363 20.0207 20.7819 19.9611 19.8731C19.8629 18.3746 19.5932 16.4558 18.8523 15" stroke="#ff0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>



                </button>
              </div>
            )}
            {/* --------------------------------TIMER --------------------------------*/}
            {hover && !close && (
              <div className='absolute bottom-1  right-1 '>
                <button className='cursor-pointer'>
                  {
                    timerShow ? (
                      <div onClick={() => setTimerShow(false)}
                        className='bg-black/20  hover:bg-black/45 p-1 rounded-full'
                      >

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16} color={"#02d024"} fill={"none"} >
                          <path d="M11.0809 13.152L8 7L13.4196 11.2796C14.1901 11.888 14.1941 13.0472 13.4277 13.6607C12.6614 14.2743 11.5189 14.0266 11.0809 13.152Z" stroke="#02d024" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M5 4.82C3.14864 6.63902 2 9.17385 2 11.9776C2 17.5129 6.47715 22.0001 12 22.0001C17.5228 22.0001 22 17.5129 22 11.9776C22 7.1242 18.5581 3.07656 13.9872 2.15288C13.1512 1.98394 12.7332 1.89947 12.3666 2.20022C12 2.50097 12 2.98714 12 3.95949V4.96175" stroke="#02d024" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </div>
                    ) : (
                      <div onClick={() => setTimerShow(true)}
                        className='bg-black/20 hover:bg-black/45 p-1 rounded-full'
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16} color={"#d0021b"} fill={"none"} >
                          <path d="M11.0809 13.152L8 7L13.4196 11.2796C14.1901 11.888 14.1941 13.0472 13.4277 13.6607C12.6614 14.2743 11.5189 14.0266 11.0809 13.152Z" stroke="#d0021b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M5 4.82C3.14864 6.63902 2 9.17385 2 11.9776C2 17.5129 6.47715 22.0001 12 22.0001C17.5228 22.0001 22 17.5129 22 11.9776C22 7.1242 18.5581 3.07656 13.9872 2.15288C13.1512 1.98394 12.7332 1.89947 12.3666 2.20022C12 2.50097 12 2.98714 12 3.95949V4.96175" stroke="#d0021b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>

                      </div>
                    )
                  }
                </button>

              </div>
            )
            }

            {/* CANCEL BUTTON */}
            {
              hover && !close && (
                <div
                  onClick={() => {
                    setClose(true);
                  }}
                  className='absolute top-1 left-1 bg-black/20 hover:bg-black/45 p-1 rounded-full cursor-pointer '>

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16} color={"#d0021b"} fill={"none"} >
                    <path d="M10.2471 6.7402C11.0734 7.56657 11.4866 7.97975 12.0001 7.97975C12.5136 7.97975 12.9268 7.56658 13.7531 6.74022L13.7532 6.7402L15.5067 4.98669L15.5067 4.98668C15.9143 4.5791 16.1182 4.37524 16.3302 4.25283C17.3966 3.63716 18.2748 4.24821 19.0133 4.98669C19.7518 5.72518 20.3628 6.60345 19.7472 7.66981C19.6248 7.88183 19.421 8.08563 19.0134 8.49321L17.26 10.2466C16.4336 11.073 16.0202 11.4864 16.0202 11.9999C16.0202 12.5134 16.4334 12.9266 17.2598 13.7529L19.0133 15.5065C19.4209 15.9141 19.6248 16.1179 19.7472 16.3299C20.3628 17.3963 19.7518 18.2746 19.0133 19.013C18.2749 19.7516 17.3965 20.3626 16.3302 19.7469C16.1182 19.6246 15.9143 19.4208 15.5067 19.013L13.7534 17.2598L13.7533 17.2597C12.9272 16.4336 12.5136 16.02 12.0001 16.02C11.4867 16.02 11.073 16.4336 10.2469 17.2598L10.2469 17.2598L8.49353 19.013C8.0859 19.4208 7.88208 19.6246 7.67005 19.7469C6.60377 20.3626 5.72534 19.7516 4.98693 19.013C4.2484 18.2746 3.63744 17.3963 4.25307 16.3299C4.37549 16.1179 4.5793 15.9141 4.98693 15.5065L6.74044 13.7529C7.56681 12.9266 7.98 12.5134 7.98 11.9999C7.98 11.4864 7.5666 11.073 6.74022 10.2466L4.98685 8.49321C4.57928 8.08563 4.37548 7.88183 4.25307 7.66981C3.63741 6.60345 4.24845 5.72518 4.98693 4.98669C5.72542 4.24821 6.60369 3.63716 7.67005 4.25283C7.88207 4.37524 8.08593 4.5791 8.49352 4.98668L8.49353 4.98669L10.2471 6.7402Z" stroke="#d0021b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>

              )
            }



          </div>

          {/* Color palette and controls below the eye container */}


        </div>
        {timerShow && !close  && (
          <>
            <button
              className={`relative px-5 py-2.5 rounded-full font-medium shadow-md border transition-all duration-300 ease-in-out 
    ${timer
                  ? 'bg-gradient-to-r from-emerald-400 to-emerald-600 text-white border-emerald-700 hover:shadow-emerald-500/50'
                  : 'bg-gradient-to-r from-rose-400 to-rose-600 text-white border-rose-700 hover:shadow-rose-500/50'} 
    hover:scale-105 hover:ring-2 hover:ring-opacity-50 cursor-pointer no-drag`}
              onClick={() => setTimer(!timer)}
            >

              <span className="inline-flex items-center gap-2">

                {timer  ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
                    </svg>
                    Timer: ON
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Timer: OFF
                  </>
                )}
              </span>
            </button>


            {!timer && (


              <div className="p-6 rounded-2xl cursor-pointer max-w-sm w-full text-center flex flex-col items-center space-y-4 mx-auto bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-lg shadow-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">⏱️ Timer Settings</h3>

                <div className="timer-settings no-drag bg-white/80 rounded-xl p-4 w-full space-y-4 shadow-inner border border-gray-100">
                  {/* Off Duration */}
                  <div className="offduration border-b border-gray-300 pb-3">
                    <label htmlFor="offDuration" className="block text-sm font-medium text-gray-600 mb-1">
                      Off Duration:
                    </label>
                    <select
                      id="offDuration"
                      value={offDuration}
                      onChange={(e) => setOffDuration(Number(e.target.value))}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none transition-all"
                    >
                      {durationOptions.map((duration) => (
                        <option key={duration} value={duration}>
                          {duration} minutes
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* On Duration */}
                  <div className="onduration">
                    <label htmlFor="onDuration" className="block text-sm font-medium text-gray-600 mb-1">
                      On Duration:
                    </label>
                    <select
                      id="onDuration"
                      value={onDuration}
                      onChange={(e) => setOnDuration(Number(e.target.value))}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none transition-all"
                    >
                      {durationOptions.map((duration) => (
                        <option key={duration} value={duration}>
                          {duration} minutes
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )

            }
          </>
        )}




        {settings && (
          <div
            className="  p-4 rounded-xl max-w-xs w-full text-center  space-y-4 relative"
          >
            <div className="flex justify-center gap-2 mb-4">
              {(['sm', 'md', 'lg', 'xl'] as const).map(size => (
                <button
                  key={size}
                  onClick={() => setEyeSize(size)}
                  className={`text-xs px-3 py-1 rounded-full border 
        ${eyeSize === size ? 'bg-white text-black' : 'bg-black/40 text-white'} 
        hover:scale-105 transition`}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>
            <label className="block text-white font-semibold mb-2 text-sm">
              Choose Premium Color
            </label>

            <div className="flex justify-between relative gap-3">
              {premiumColors.map((color, i) => {
                const isTransparent = color === 'transparent';
                const isSelected = selectedColor === color;

                return (
                  <div
                    key={i}
                    className={`rounded-full ${isTransparent && isSelected ? 'p-[2px] border-animation' : ''}`}
                  >
                    <button
                      onClick={() => setSelectedColor(color)}
                      style={{
                        backgroundColor: isTransparent ? 'transparent' : color,
                      }}
                      className={`w-10 h-10 rounded-full border transition-transform hover:scale-110 
            ${isSelected && !isTransparent ? 'border-white' : 'border-transparent'} 
            ${isTransparent ? 'bg-checkered' : ''}
          `}
                      aria-label={`Select color ${i + 1}`}
                    />
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setSettings(false)}
              className="absolute top-0 right-2 p-1 transition"
              aria-label="Close settings"
              style={{
                color: 'white',
                // filter: 'drop-shadow(0 0 4px rgb(255 0 0)) drop-shadow(0 0 6px rgb(0 255 0)) drop-shadow(0 0 8px rgb(0 0 255))',
                // alternatively use textShadow:
                // textShadow: '0 0 5px red, 0 0 10px green, 0 0 15px blue',
                cursor: 'pointer',
              }}
            >
              <FiX size={20} />
            </button>

          </div>
        )}
      </div>

    </>
  )
}

export default App