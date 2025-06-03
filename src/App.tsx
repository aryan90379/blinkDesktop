import './App.css'
import { FiX } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import eyeGif from './assets/eye.gif'
// import eyeGif from './assets/eye2.webm'
// import eyeGif from './assets/eye3.webm'
import SoftButton from './components/SoftButton'
import Card from './components/Card'
// import eyeGif from './assets/eye4.gif'

function App() {
  const [hover, setHover] = useState(false)
  const [Drag, setDrag] = useState(false)
  const [settings, setSettings] = useState(false)
  const [dragHover, setDragHover] = useState(false)
  const [close, setClose] = useState(false)

  const windowWidth = 164
  const [selectedColor, setSelectedColor] = useState<string>('transparent') // premium dark default bg
  const [settingsHover, setSettingsHover] = useState(false) // to track hover on settings button

  const premiumColors = [
    'transparent',                        // ✅ add this as the first option
    'rgba(30 30 30 / 0.85)',              // dark default
    'rgba(255 99 71 / 0.8)',              // Tomato
    'rgba(60 179 113 / 0.8)',             // Sea Green
    'rgba(65 105 225 / 0.8)',             // Royal Blue
    'rgba(255 215 0 / 0.8)',              // Gold
    'rgba(138 43 226 / 0.8)',             // Violet
  ]

  const toggleSettings = () => {
    setSettings(prev => !prev)
    if (settings) setDrag(false);


  }

  useEffect(() => {
    if (window.electronAPI?.setWindowSize) {
      window.electronAPI.setWindowSize({
        width: settings ? 500 : windowWidth,
        height: 500,
      })
    }
  }, [settings, windowWidth])

  return (
    <>

      {/* <div
      className="app-wrapper draggable-window w-screen h-screen flex flex-col items-center justify-center space-y-6"
      style={{ backgroundColor: selectedColor }}
    > */}
      <div className={`${(Drag || close) ? 'draggable-window' : ''}`}>


        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => {
            setHover(false)
            setSettingsHover(false)
          }}
          className={`relative  backdrop-blur-lg rounded-2xl  flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105`}
          style={{
            width: windowWidth * 0.8,
            backgroundColor: selectedColor,
          }}
        >
          {
            close ? (
              <div className="flex flex-col items-center gap-4">
                {/* <div className="bg-gradient-to-t from-black to-[#1e9e8e] p-1 rounded-xl shadow-md text-[15px] font-medium ">
                  <div className='from'>
                    Right click and choose <span className="underline decoration-dotted">Close</span>
                  </div>
                </div> */}
                <Card />

                <button

                  className="absolute -bottom-19 cursor-pointer text-xs left-1 right-1 mx-auto w-fit px-6 py-2  text-white font-medium rounded-xl  transition-all duration-200 ease-in-out transform hover:scale-105"
                >
                  <SoftButton onClick={() => setClose(false)} />
                </button>


              </div>


            ) : (
              // <video
              //   src={eyeGif}
              //   autoPlay
              //   loop
              //   muted
              //   playsInline
              //   className="rounded-full object-contain"
              //  
              // />

              <img
                src={eyeGif}
                alt="Eye animation"
                className="rounded-full p-5 object-contain w-full h-auto"
                style={{ width: '100%', height: 'auto' }}
              />


            )


          }



          {/* Settings button + tooltip on hover */}
          {hover && !close && (
            <div
              className="absolute top-2 right-2 flex items-center space-x-2"
              onMouseEnter={() => setSettingsHover(true)}
              onMouseLeave={() => setSettingsHover(false)}
            >
              {/* Tooltip */}
              {settingsHover && !settings && (
                <div className="absolute top-5 right-8 rounded-md bg-black/100 text-white text-[12px] font-medium  transition-opacity duration-200">
                  Change Theme
                </div>
              )}

              {/* Settings Button */}
              <button
                className="cursor-pointer text-white bg-black/40 hover:bg-black/70 rounded-full p-2 flex items-center justify-center transition duration-200"
                onClick={toggleSettings}
                aria-expanded={settings}
                aria-label="Toggle settings"
              >

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ff0000"} fill={"none"} >
                  <path d="M10 4C10 2.89543 10.8954 2 12 2H13C14.1046 2 15 2.89543 15 4V6.55337C15 7.86603 15.8534 9.02626 17.1065 9.41722L17.8935 9.66278C19.1466 10.0537 20 11.214 20 12.5266V14C20 14.5523 19.5523 15 19 15H6C5.44772 15 5 14.5523 5 14V12.5266C5 11.214 5.85339 10.0537 7.10648 9.66278L7.89352 9.41722C9.14661 9.02626 10 7.86603 10 6.55337V4Z" stroke="#ff0000" strokeWidth="1.5"></path>
                  <path d="M6.00217 15C6.15797 16.3082 5.4957 19.5132 4 21.8679C4 21.8679 14.2924 23.0594 15.6851 17.9434V19.8712C15.6851 20.8125 15.6851 21.2831 15.9783 21.5755C16.5421 22.1377 19.1891 22.1531 19.7538 21.5521C20.0504 21.2363 20.0207 20.7819 19.9611 19.8731C19.8629 18.3746 19.5932 16.4558 18.8523 15" stroke="#ff0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>



              </button>
            </div>
          )}

          {/* CANCEL BUTTON */}
          {
            hover && !close && (
              <div
                onClick={() => {
                  setClose(true);
                }}
                className='absolute top-3 left-3 bg-black/20 p-1 rounded-full cursor-pointer '>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#d0021b"} fill={"none"} >
                  <path d="M10.2471 6.7402C11.0734 7.56657 11.4866 7.97975 12.0001 7.97975C12.5136 7.97975 12.9268 7.56658 13.7531 6.74022L13.7532 6.7402L15.5067 4.98669L15.5067 4.98668C15.9143 4.5791 16.1182 4.37524 16.3302 4.25283C17.3966 3.63716 18.2748 4.24821 19.0133 4.98669C19.7518 5.72518 20.3628 6.60345 19.7472 7.66981C19.6248 7.88183 19.421 8.08563 19.0134 8.49321L17.26 10.2466C16.4336 11.073 16.0202 11.4864 16.0202 11.9999C16.0202 12.5134 16.4334 12.9266 17.2598 13.7529L19.0133 15.5065C19.4209 15.9141 19.6248 16.1179 19.7472 16.3299C20.3628 17.3963 19.7518 18.2746 19.0133 19.013C18.2749 19.7516 17.3965 20.3626 16.3302 19.7469C16.1182 19.6246 15.9143 19.4208 15.5067 19.013L13.7534 17.2598L13.7533 17.2597C12.9272 16.4336 12.5136 16.02 12.0001 16.02C11.4867 16.02 11.073 16.4336 10.2469 17.2598L10.2469 17.2598L8.49353 19.013C8.0859 19.4208 7.88208 19.6246 7.67005 19.7469C6.60377 20.3626 5.72534 19.7516 4.98693 19.013C4.2484 18.2746 3.63744 17.3963 4.25307 16.3299C4.37549 16.1179 4.5793 15.9141 4.98693 15.5065L6.74044 13.7529C7.56681 12.9266 7.98 12.5134 7.98 11.9999C7.98 11.4864 7.5666 11.073 6.74022 10.2466L4.98685 8.49321C4.57928 8.08563 4.37548 7.88183 4.25307 7.66981C3.63741 6.60345 4.24845 5.72518 4.98693 4.98669C5.72542 4.24821 6.60369 3.63716 7.67005 4.25283C7.88207 4.37524 8.08593 4.5791 8.49352 4.98668L8.49353 4.98669L10.2471 6.7402Z" stroke="#d0021b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>

            )
          }


          {(hover || Drag) && !close && (
            <div>
              {(dragHover || Drag) && (
                <>
                  <div className=" absolute bottom-7 right-7 left-3 p-1 rounded-md bg-black/95 text-white text-[12px] font-medium  transition-opacity duration-200">
                    {Drag ? 'Click here and Drag around the screen' : 'Click to Drag'}
                    {/* Click to Expand */}
                  </div>
                  {Drag && (


                    <div className=" absolute -bottom-12 right-7 left-3 p-1 rounded-md bg-black/95 text-white text-[12px] font-medium  transition-opacity duration-200">
                      Click to cancel Drag
                    </div>
                  )
                  }
                </>
              )
              }

              <button
                onClick={() => {
                  setDrag(!Drag)
                  setSettings(false)
                }}
                onMouseEnter={() => setDragHover(true)}
                onMouseLeave={() => setDragHover(false)}
                className={` bg-white cursor-pointer ${Drag ? '-bottom-12' : 'bottom-2'} absolute  right-2 rounded-full  P-1`}>





                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} >
                  <path d="M12 3.00006V9.00006" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M3 12.0001H9" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M21 12.0001H15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M12 21.0001V14.5001" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M9 6L10.705 4.04824C11.3155 3.34941 11.6207 3 12 3C12.3793 3 12.6845 3.34941 13.295 4.04824L15 6" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M15 18L13.295 19.9518C12.6845 20.6506 12.3793 21 12 21C11.6207 21 11.3155 20.6506 10.705 19.9518L9 18" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M18 9L19.9518 10.705C20.6506 11.3155 21 11.6207 21 12C21 12.3793 20.6506 12.6845 19.9518 13.295L18 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M6 15L4.04824 13.295C3.34941 12.6845 3 12.3793 3 12C3 11.6207 3.34941 11.3155 4.04824 10.705L6 9" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>


              </button>
            </div>
          )}
        </div>

        {/* Color palette and controls below the eye container */}
        {settings && (
          <div
            className="  p-4 rounded-xl max-w-xs w-full text-center  space-y-4 relative"
          >
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
                      className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 
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
