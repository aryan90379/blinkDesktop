import './App.css'

import { useEffect, useRef, useState } from 'react'
import greyEye from './assets/grey.webm'
import blueEye from './assets/blue.webm'
import pinkEye from './assets/pink.webm'
import brownEye from './assets/brown.webm'
import greenEye from './assets/green.webm'
import purpleEye from './assets/purple.webm'
import logo from './assets/icon.png'
import audio from './assets/alarm.wav'
import stopAudioFile from './assets/alarmStop.wav'
import './Pallete.scss'
import Confetti from 'react-confetti';

import { useWindowSize } from '@react-hook/window-size';
import SettingsComponent from './components/SettingsComponent'

const eyeSizeStyles = {
  sm: '120px',
  md: '160px',
  lg: '200px',
  xl: '240px',
}



function App() {
  const [hover, setHover] = useState(false)
  const [showPomo, setShowPomo] = useState(false)
  const [Drag, setDrag] = useState(false)
  const [settings, setSettings] = useState(false)
  const [timerShow, setTimerShow] = useState(false)
  const [showEyes, setShowEyes] = useState(false)




  // EYE SELECT
  const [selectedEye, setSelectedEye] = useState(blueEye);


  const eyeOptions = [
    {
      name: 'Grey',
      src: greyEye,
      color: 'rgb(146,148,151)',
      bgColor: 'rgba(146,148,151, 0.3)',
    },
    {
      name: 'Blue',
      src: blueEye,
      color: 'rgb(122,181,227)',
      bgColor: 'rgba(122,181,227, 0.3)',
    },
    {
      name: 'Pink',
      src: pinkEye,
      color: 'rgb(226,103,166)',
      bgColor: 'rgba(226,103,166, 0.3)',
    },
    {
      name: 'Brown',
      src: brownEye,
      color: 'rgb(205,153,102)',
      bgColor: 'rgba(205,153,102, 0.3)',
    },
    {
      name: 'Green',
      src: greenEye,
      color: 'rgb(62,164,167)',
      bgColor: 'rgba(62,164,167, 0.3)',
    },
    {
      name: 'Purple',
      src: purpleEye,
      color: 'rgb(214,123,203)',
      bgColor: 'rgba(214,123,203, 0.3)',
    },
  ];

  const sortedEyeOptions = [...eyeOptions].sort((a, b) => {
    if (a.src === selectedEye) return 1;  // Move selected eye to the last
    if (b.src === selectedEye) return -1; // Move selected eye to the last
    return 0;
  });


  const selectedOption = eyeOptions.find(opt => opt.src === selectedEye);
  const eyeBgColor = selectedOption?.bgColor || 'transparent';

  // 


  //confetti
  const [showConfetti, setShowConfetti] = useState(false);
  const [width, height] = useWindowSize();

  // 
  const videoRef = useRef<HTMLVideoElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [close, setClose] = useState(false)
  const [pomo, setPomo] = useState(false)
  const [visible, setVisible] = useState(true)
  const durationOptions = [5, 10, 15, 20, 25]
  const windowWidth = 164

  const premiumColors = [
    'transparent',        // transparent
    'rgba(24, 24, 27, 0.8)',        // Onyx Black
    'rgba(234, 202, 255, 0.35)',    // Soft Lavender
    'rgba(217, 136, 128, 0.4)',     // Rose Gold
    'rgba(255, 215, 160, 0.3)',     // Champagne Gold
    'rgba(88, 101, 242, 0.35)',     // Royal Indigo
    'rgba(170, 142, 214, 0.35)',    // Amethyst
    'rgba(64, 224, 208, 0.3)',      // Turquoise Mist
    'rgba(255, 255, 255, 0.08)',    // Subtle Frosted
  ]
  const messages = [
    "Remember the 20-20-20 rule: Look 20 feet away for 20 seconds every 20 minutes.",
    "Give your eyes a break—look into the distance for a few seconds.",
    "It's time to rest your eyes and reset your focus.",
    "Staring too long? Take a moment to blink and look away.",
    "Reduce eye strain—look up and around for 20 seconds.",
    "Keep your eyes healthy: take regular screen breaks.",
    "A short break now can prevent long-term eye discomfort.",
    "Blink consciously—hydrated eyes are healthier eyes.",
    "Protect your vision. Pause and look far for a few seconds.",
    "Give your eyes some rest—they’re working hard.",
    "Taking a moment to relax your eyes helps prevent fatigue.",
    "Pause. Blink. Refocus. Your eyes will thank you.",
    "Good vision habits begin with short, regular breaks.",
    "Long screen time? Look at something 20 feet away.",
    "Maintaining eye comfort starts with mindful breaks.",
    "Don’t ignore eye strain—look away now.",
    "Your focus needs recovery. Take a brief eye break.",
    "Healthy eyes need movement—look around.",
    "Looking into the distance helps reset your vision.",
    "It’s okay to pause. Your vision matters.",
    "A 20-second break now avoids strain later.",
    "Your screen can wait—focus on your well-being.",
    "Prevent digital eye strain with a short break.",
    "Short breaks help you work better and see better.",
    "Blink often and rest your eyes regularly.",
    "Healthy screen habits include time for eye care.",
    "Your productivity improves when your eyes are rested.",
    "Look out a window or across the room for 20 seconds.",
    "Protect your eyes like you protect your time.",
    "Vision is precious. Care for it consistently.",
    "Even a short break can refresh tired eyes.",
    "Focus on something far away, then return.",
    "Just 20 seconds of rest improves your eye comfort.",
    "BlinkBuddy Reminder: It's time to look away.",
    "Keeping your eyes relaxed improves focus and clarity.",
    "Let your eyes reset. Take a 20-second breather.",
    "Avoid dry eyes—pause and blink often.",
    "A simple break supports long-term eye health.",
    "Keep your vision clear with regular screen breaks.",
    "Break time for your eyes—stay consistent.",
    "Frequent blinking keeps your vision comfortable.",
    "Working long hours? Rest your eyes now.",
    "Support your eye muscles—look into the distance.",
    "Eyes feeling tired? Look away for clarity.",
    "Short eye breaks help prevent long-term strain.",
    "Pause the screen. Restore your visual focus.",
    "Give your eyes the care they deserve.",
    "Prevent screen fatigue with consistent habits.",
    "Healthy habits start with small changes—like this one.",
    "Be kind to your eyes. Take a moment now."
  ];



  //Pomodoro starts
  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }


  const pomodoroOptions = [...Array.from({ length: 12 }, (_, i) => (i + 1) * 5)];

  const [pomodoroDuration, setPomodoroDuration] = useState<number>(
    getSafeNumber('pomodoroDuration', 25)
  ); // default 25 min

  const [breakDuration, setBreakDuration] = useState<number>(
    getSafeNumber('breakDuration', 5)
  ); // default 5 min

  const [isPomodoroRunning, setIsPomodoroRunning] = useState<boolean>(false);
  const [isOnBreak, setIsOnBreak] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(pomodoroDuration * 60); // seconds



  useEffect(() => {
    if (!isPomodoroRunning) return;

    const beepAudio = new Audio(audio);
    const stopAudio = new Audio(stopAudioFile);

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (isOnBreak) {
            stopAudio.play().catch(() => { });
            setIsOnBreak(false);
            setShowConfetti(true);          // Show confetti when break ends (work session starts)
            setTimeout(() => setShowConfetti(false), 4000);  // Hide after 4 seconds
            return pomodoroDuration * 60;
          } else {
            beepAudio.play().catch(() => { });
            setIsOnBreak(true);
            setShowConfetti(true);          // Show confetti when work session ends (break starts)
            setTimeout(() => setShowConfetti(false), 4000);  // Hide after 4 seconds
            return breakDuration * 60;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPomodoroRunning, isOnBreak, pomodoroDuration, breakDuration]);



  // Pomodoro Ends

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

  // notification start

  useEffect(() => {


    let intervalId: NodeJS.Timeout | null = null;


    const startInterval = () => {
      if (!intervalId) {
        intervalId = setInterval(() => {
          const randomMessage = messages[Math.floor(Math.random() * messages.length)];
          new Notification('👁️Blinkbuddy Reminder', {
            body: randomMessage,
            icon: logo, // Ensure this is resolved correctly
          });
        }, 20 * 60 * 1000); // every 10 seconds
        // }, 6*1000); // every 10 seconds
      }
    };

    if (Notification.permission === 'granted') {
      startInterval();
    } else if (Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          startInterval();
        }
      });
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);


  // notifciation end



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
        videoRef.current.playbackRate = 1
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
      {showConfetti && <Confetti width={width} height={height} numberOfPieces={300} />}

      <div
        className={`app-wrapper ${visible ? '' : 'hidden'} ${hover ? 'bg-amber-600' : ''}  rounded-md ${settings ? '' : 'draggable-window'}  w-screen h-screen flex flex-col items-center justify-center ${!close ? 'space-y-6' : ''}`}
        style={{ backgroundColor: selectedColor }}
      >

        <div
          className={`${(Drag || close) ? 'draggable-window' : ''} hover:border-2 ${!close ? 'p-2' : ''} border-white rounded-3xl`}
          style={{ backgroundColor: eyeBgColor }}
        >

          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => {
              setHover(false)
            }}
            className={`relative no-drag   rounded-2xl ${hover ? 'border-red-500 ' : ''}  flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105`}
            style={{
              width: settings ? '40vw' : '40vw', // Responsive based on window width
              minWidth: eyeSizeStyles[eyeSize],
            }}

          >
            {
              close ? (
                <div className="flex  flex-col  items-center gap-4">



                </div>


              ) : (
                <>
                  {!settings &&

                    <video
                      ref={videoRef}
                      src={selectedEye}
                      autoPlay
                      loop
                      muted
                      playsInline
                      // style={{ transform: 'rotate(0deg)' }}
                      // className="rounded-full object-contain bg-transparent"
                      className={`rounded-full  -p-3 -m-5 object-contain w-[${eyeSizeStyles[eyeSize]}]`}
                    />
                  }
                  {
                    settings && (
                      <SettingsComponent
                        settings={settings}             // Control visibility
                        setSettings={setSettings}       // Function to close settings
                        eyeSize={eyeSize}               // Current eye size
                        setEyeSize={setEyeSize}         // Function to change eye size
                        premiumColors={premiumColors}  // List of available premium colors
                        selectedColor={selectedColor}  // Current selected color
                        setSelectedColor={setSelectedColor}  // Function to change selected color
                      />
                    )
                  }


                </>


              )
            }





            {/* Settings button + tooltip on hover */}
            {hover && !close && (
              <div
                className="absolute top-1 right-1 flex items-center space-x-2"
              >


                {/* Settings Button */}
                <button
                  className="cursor-pointer text-white bg-black hover:bg-black/20 rounded-full p-1 flex items-center justify-center transition duration-200"
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
              <div className='absolute bottom-1  right-1 
                
                '
                onClick={() => setPomo(false)}
              >
                <button className='cursor-pointer'>
                  {
                    timerShow ? (
                      <div onClick={() => {
                        setTimerShow(false)

                      }}
                        className='bg-black  hover:bg-black/45 p-1 rounded-full'
                      >

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16} color={"#02d024"} fill={"none"} >
                          <path d="M11.0809 13.152L8 7L13.4196 11.2796C14.1901 11.888 14.1941 13.0472 13.4277 13.6607C12.6614 14.2743 11.5189 14.0266 11.0809 13.152Z" stroke="#02d024" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M5 4.82C3.14864 6.63902 2 9.17385 2 11.9776C2 17.5129 6.47715 22.0001 12 22.0001C17.5228 22.0001 22 17.5129 22 11.9776C22 7.1242 18.5581 3.07656 13.9872 2.15288C13.1512 1.98394 12.7332 1.89947 12.3666 2.20022C12 2.50097 12 2.98714 12 3.95949V4.96175" stroke="#02d024" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </div>
                    ) : (
                      <div onClick={() => setTimerShow(true)}
                        className='bg-black hover:bg-black/45 p-1 rounded-full'
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
                  className='absolute top-1 left-1 bg-black hover:bg-black/45 p-1 rounded-full cursor-pointer '>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ff0000" fill="none">
                    <path d="M19.439 15.439C20.3636 14.5212 21.0775 13.6091 21.544 12.955C21.848 12.5287 22 12.3155 22 12C22 11.6845 21.848 11.4713 21.544 11.045C20.1779 9.12944 16.6892 5 12 5C11.0922 5 10.2294 5.15476 9.41827 5.41827M6.74742 6.74742C4.73118 8.1072 3.24215 9.94266 2.45604 11.045C2.15201 11.4713 2 11.6845 2 12C2 12.3155 2.15201 12.5287 2.45604 12.955C3.8221 14.8706 7.31078 19 12 19C13.9908 19 15.7651 18.2557 17.2526 17.2526" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M9.85786 10C9.32783 10.53 9 11.2623 9 12.0711C9 13.6887 10.3113 15 11.9289 15C12.7377 15 13.47 14.6722 14 14.1421" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round"></path>
                    <path d="M3 3L21 21" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </div>

              )
            }

            {/* EYE BUTTON */}
            {/* toggle eye visibility */}

            {
              hover && !close && (
                <div
                  onClick={() => {
                    setShowEyes(!showEyes);
                    // setShowPomo(!showPomo);

                  }}
                  className='absolute bottom-1 left-5/12
                    bg-black hover:bg-black/45 p-1 rounded-full cursor-pointer '>

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#d0021b" fill="none">
                    <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="#ff0000" stroke-width="1.5"></path>
                    <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="#ff0000" stroke-width="1.5"></path>
                  </svg>
                </div>

              )
            }




            {
              hover && !close && (
                <div
                  className='absolute bottom-1 left-1 bg-black hover:bg-black/45 p-1 rounded-full cursor-pointer '
                  onClick={() => setTimerShow(false)}
                >
                  {pomo ?

                    (

                      <div
                        onClick={() => setPomo(false)}
                        className="relative group cursor-pointer"
                      >
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
                          Pomodoro
                        </div>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          color="#12de23"
                          fill="none"
                        >
                          <path
                            d="M4 3H20"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M5.5 3V5.03039C5.5 6.27227 6.07682 7.4437 7.06116 8.20089L12 12L16.9388 8.20089C17.9232 7.44371 18.5 6.27227 18.5 5.03039V3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M5.5 21V18.9696C5.5 17.7277 6.07682 16.5563 7.06116 15.7991L12 12L16.9388 15.7991C17.9232 16.5563 18.5 17.7277 18.5 18.9696V21"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M4 21H20"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </div>
                    ) :
                    (
                      <div
                        onClick={() => setPomo(true)}
                        className="relative group cursor-pointer"
                      >
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
                          Pomodoro
                        </div>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          color="#d0021b"
                          fill="none"
                        >
                          <path
                            d="M4 3H20"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M5.5 3V5.03039C5.5 6.27227 6.07682 7.4437 7.06116 8.20089L12 12L16.9388 8.20089C17.9232 7.44371 18.5 6.27227 18.5 5.03039V3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M5.5 21V18.9696C5.5 17.7277 6.07682 16.5563 7.06116 15.7991L12 12L16.9388 15.7991C17.9232 16.5563 18.5 17.7277 18.5 18.9696V21"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M4 21H20"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </div>
                    )



                  }
                </div>
              )
            }



          </div>

          {
            hover && close && (
              <div
                onClick={() => {
                  setClose(false);
                }}
                className='absolute no-drag top-1 left-1 bg-black/40 hover:bg-black/45 p-1 rounded-full cursor-pointer '>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#00ec37" fill="none">
                  <path d="M22 8C22 8 18 14 12 14C6 14 2 8 2 8" stroke="#00ec37" stroke-width="1.5" stroke-linecap="round"></path>
                  <path d="M15 13.5L16.5 16" stroke="#00ec37" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M20 11L22 13" stroke="#00ec37" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M2 13L4 11" stroke="#00ec37" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M9 13.5L7.5 16" stroke="#00ec37" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </div>

            )
          }

        </div>
        {!isPomodoroRunning && !pomo && (
          <div className="absolute bottom-2/3 left-[4rem] transition duration-300 z-20">
            {close && (
              <div
                className="relative group"
              >
                <div
                  className="absolute bottom-1 left-1 bg0 no-drag bg-white/10 hover:bg-white/20 backdrop-blur-lg p-1.5 rounded-full cursor-pointer border border-/20 shadow-md hover:shadow-xl transition duration-200"
                  onClick={() => setTimerShow(false)}
                >
                  <div
                    onClick={() => setPomo(!pomo)}
                    className="relative group cursor-pointer"
                  >


                    {/* Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      className="text-white transition-transform duration-200 group-hover:scale-110"
                    >
                      <path
                        d="M4 3H20"
                        stroke={pomo ? "#12de23" : "#d0021b"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.5 3V5.03039C5.5 6.27227 6.07682 7.4437 7.06116 8.20089L12 12L16.9388 8.20089C17.9232 7.44371 18.5 6.27227 18.5 5.03039V3"
                        stroke={pomo ? "#12de23" : "#d0021b"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.5 21V18.9696C5.5 17.7277 6.07682 16.5563 7.06116 15.7991L12 12L16.9388 15.7991C17.9232 16.5563 18.5 17.7277 18.5 18.9696V21"
                        stroke={pomo ? "#12de23" : "#d0021b"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 21H20"
                        stroke={pomo ? "#12de23" : "#d0021b"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}



        {pomo && (
          <div className="pomodoro-container  relative no-drag bg-black/40 backdrop-blur-lg rounded-lg p-3 w-full text-white flex flex-col items-center border border-white/30 shadow-2xl transform transition-all duration-500 hover:bg-black/50">

            {/* Close Button */}
            <button
              onClick={() => setPomo(false)}
              className="absolute top-2 right-2 text-white hover:text-red-400 transition transform hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Control and Visibility Buttons */}
            <div className="flex gap-3 w-full justify-center mb-3">
              {/* Start / Pause Button */}
              <button
                className={`px-5 py-2 rounded-md font-semibold text-base transition duration-300 ease-in-out shadow-lg hover:scale-105 ${isPomodoroRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                onClick={() => {
                  if (isPomodoroRunning) {
                    setIsPomodoroRunning(false);
                  } else {
                    setIsPomodoroRunning(true);
                    setShowPomo(true);
                  }
                }}
              >
                {isPomodoroRunning ? 'Pause' : 'Start'}
              </button>

              {/* Reset Button */}
              <button
                className="bg-gray-700 hover:bg-gray-800 px-5 py-2 rounded-md font-semibold text-base transition duration-300 ease-in-out shadow-lg hover:scale-105"
                onClick={() => {
                  setIsPomodoroRunning(false);
                  setIsOnBreak(false);
                  setTimeLeft(pomodoroDuration * 60);
                }}
              >
                Reset
              </button>

              {/* Visibility Button */}
              <button
                className="bg-gray-700 hover:bg-gray-800 px-5 py-2 rounded-md font-semibold text-base transition duration-300 ease-in-out shadow-lg hover:scale-105"
                onClick={() => {
                  setShowPomo((prev) => !prev);
                  setIsPomodoroRunning(false);
                }}
              >
                {showPomo ? 'Hide' : 'Show'}
              </button>
            </div>

            {/* Duration Selectors */}
            <div className="flex gap-4 w-full justify-center mb-3">
              {/* Work Duration */}
              <div className="flex flex-col items-center">
                <label htmlFor="pomodoroDuration" className="mb-1 text-xs font-semibold text-white/90">
                  Work Duration
                </label>
                <select
                  id="pomodoroDuration"
                  className="rounded-md px-3 py-1.5 bg-black/60 text-white border border-white/40 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  value={pomodoroDuration}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setPomodoroDuration(val);
                    if (!isPomodoroRunning && !isOnBreak) {
                      setTimeLeft(val * 60);
                    }
                    localStorage.setItem('pomodoroDuration', val.toString());
                  }}
                >
                  {pomodoroOptions.map((d) => (
                    <option key={d} value={d}>{d} min</option>
                  ))}
                </select>
              </div>

              {/* Break Duration */}
              <div className="flex flex-col items-center">
                <label htmlFor="breakDuration" className="mb-1 text-xs font-semibold text-blue-300">
                  Break Duration
                </label>
                <select
                  id="breakDuration"
                  className="rounded-md px-3 py-1.5 bg-black/60 text-white border border-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={breakDuration}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setBreakDuration(val);
                    if (!isPomodoroRunning && isOnBreak) {
                      setTimeLeft(val * 60);
                    }
                    localStorage.setItem('breakDuration', val.toString());
                  }}
                >
                  {pomodoroOptions.map((d) => (
                    <option key={d} value={d}>{d} min</option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        )}








        {timerShow && !close && (
          <>
            {/* Timer Button (Smaller Size) */}
            <button
              className={`relative px-4 py-2 rounded-full font-medium text-md shadow-md border transition-all duration-300 ease-in-out
        ${timer
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-700 text-white border-emerald-800 hover:shadow-emerald-600/60'
                  : 'bg-gradient-to-r from-rose-500 to-rose-700 text-white border-rose-800 hover:shadow-rose-600/60'}
        hover:scale-110 hover:ring-2 hover:ring-opacity-50 cursor-pointer no-drag`}
              onClick={() => setTimer(!timer)}
            >
              <span className="inline-flex items-center gap-1">
                {timer ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
                    </svg>
                    Timer: ON
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Timer: OFF
                  </>
                )}
              </span>
            </button>

            {/* Settings Modal for Timer (only visible when timer is OFF) */}
            {!timer && (
              <div className="p-4 rounded-2xl cursor-pointer max-w-xs w-full text-center flex flex-col items-center space-y-6 mx-auto bg-gradient-to-br from-gray-900 to-black backdrop-blur-lg shadow-lg border-2 border-gray-800">
                {/* Header */}
                <h3 className="text-2xl font-semibold text-white drop-shadow-md mb-4">
                  ⏱️ Timer Settings
                </h3>

                {/* Settings Container */}
                <div className="timer-settings no-drag bg-gray-800/90 rounded-2xl p-4 w-full space-y-4 shadow-xl border border-gray-700">
                  {/* Off Duration */}
                  <div className="offduration">
                    <label htmlFor="offDuration" className="block text-sm font-medium text-gray-300 mb-2">
                      Off Duration:
                    </label>
                    <select
                      id="offDuration"
                      value={offDuration}
                      onChange={(e) => setOffDuration(Number(e.target.value))}
                      className="w-full rounded-lg border border-gray-600 px-4 py-2 text-sm text-white bg-gray-700 shadow-md focus:ring-2 focus:ring-indigo-600 focus:outline-none transition-all"
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
                    <label htmlFor="onDuration" className="block text-sm font-medium text-gray-300 mb-2">
                      On Duration:
                    </label>
                    <select
                      id="onDuration"
                      value={onDuration}
                      onChange={(e) => setOnDuration(Number(e.target.value))}
                      className="w-full rounded-lg border border-gray-600 px-4 py-2 text-sm text-white bg-gray-700 shadow-md focus:ring-2 focus:ring-indigo-600 focus:outline-none transition-all"
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
            )}

          </>
        )}






        {showEyes ? (
          <div className="flex no-drag gap-8 -mt-12 flex-wrap justify-center">

            <div id="customPaletteContainer">
              <div className="customMain">
                {sortedEyeOptions.map((eye) => (
                  <div
                    key={eye.name}
                    onClick={() => setSelectedEye(eye.src)}
                    className="customSup"
                  >
                    <div className="customSub" style={{ backgroundColor: eye.color }}>
                      <div className="customPoint"></div>
                      <a href="#" className="customLink">
                        {eye.name}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>




        ) : (
          <>

            {!pomo && showPomo && !timerShow && !settings && (
              <div
                className="relative -mt-6 group w-40 h-40 no-drag rounded-full transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg hover:bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                onClick={() => setIsPomodoroRunning(!isPomodoroRunning)}
              >
                <svg className="w-full h-full transform rotate-[-90deg]" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke={isOnBreak ? "url(#blueGradient)" : "url(#greenGradient)"}
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 45}
                    strokeDashoffset={
                      2 * Math.PI * 45 *
                      (1 - timeLeft / ((isOnBreak ? breakDuration : pomodoroDuration) * 60))
                    }
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-in-out"
                  />
                  <defs>
                    <linearGradient id="greenGradient" x1="1" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00ffcc" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                    <linearGradient id="blueGradient" x1="1" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Centered Time Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div className="text-5xl font-extrabold tracking-wide text-white drop-shadow-lg transition-all duration-300">
                    {formatTime(timeLeft)}
                  </div>
                  <div className={`text-xs mt-2 font-semibold uppercase tracking-wide ${isOnBreak ? 'text-blue-400' : 'text-green-400'} transition-all ease-in-out`}>
                    {isOnBreak ? 'Break Time' : 'Focus Time'}
                  </div>
                </div>

                {/* Hover effect for extra visual */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-all duration-300 rounded-full"></div>
              </div>
            )}

          </>
        )

        }
      </div>

    </>
  )
}

export default App