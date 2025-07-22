import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import './App.css';
import { FiX } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import eyeGif from './assets/bravo.webm';
import logo from './assets/icon.png';
import audio from './assets/alarm.wav';
import stopAudioFile from './assets/alarmStop.wav';
// import eyeGif from './assets/eye2.webm'
// import eyeGif from './assets/eye3.webm'
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
const eyeSizeStyles = {
    sm: '120px',
    md: '160px',
    lg: '200px',
    xl: '240px',
};
function App() {
    const [hover, setHover] = useState(false);
    const [showPomo, setShowPomo] = useState(true);
    const [Drag, setDrag] = useState(false);
    const [settings, setSettings] = useState(false);
    const [timerShow, setTimerShow] = useState(false);
    //confetti
    const [showConfetti, setShowConfetti] = useState(false);
    const [width, height] = useWindowSize();
    // 
    const videoRef = useRef(null);
    const timeoutRef = useRef(null);
    const [close, setClose] = useState(false);
    const [pomo, setPomo] = useState(false);
    const [visible, setVisible] = useState(true);
    const durationOptions = [5, 10, 15, 20, 25];
    const windowWidth = 164;
    const premiumColors = [
        'transparent', // transparent
        'rgba(24, 24, 27, 0.8)', // Onyx Black
        'rgba(234, 202, 255, 0.35)', // Soft Lavender
        'rgba(217, 136, 128, 0.4)', // Rose Gold
        'rgba(255, 215, 160, 0.3)', // Champagne Gold
        'rgba(88, 101, 242, 0.35)', // Royal Indigo
        'rgba(170, 142, 214, 0.35)', // Amethyst
        'rgba(64, 224, 208, 0.3)', // Turquoise Mist
        'rgba(255, 255, 255, 0.08)', // Subtle Frosted
    ];
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
    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    const pomodoroOptions = [1 / 2, ...Array.from({ length: 12 }, (_, i) => (i + 1) * 5)];
    const [pomodoroDuration, setPomodoroDuration] = useState(getSafeNumber('pomodoroDuration', 25)); // default 25 min
    const [breakDuration, setBreakDuration] = useState(getSafeNumber('breakDuration', 5)); // default 5 min
    const [isPomodoroRunning, setIsPomodoroRunning] = useState(false);
    const [isOnBreak, setIsOnBreak] = useState(false);
    const [timeLeft, setTimeLeft] = useState(pomodoroDuration * 60); // seconds
    useEffect(() => {
        if (!isPomodoroRunning)
            return;
        const beepAudio = new Audio(audio);
        const stopAudio = new Audio(stopAudioFile);
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    if (isOnBreak) {
                        stopAudio.play().catch(() => { });
                        setIsOnBreak(false);
                        setShowConfetti(true); // Show confetti when break ends (work session starts)
                        setTimeout(() => setShowConfetti(false), 4000); // Hide after 4 seconds
                        return pomodoroDuration * 60;
                    }
                    else {
                        beepAudio.play().catch(() => { });
                        setIsOnBreak(true);
                        setShowConfetti(true); // Show confetti when work session ends (break starts)
                        setTimeout(() => setShowConfetti(false), 4000); // Hide after 4 seconds
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
    const [selectedColor, setSelectedColor] = useState(localStorage.getItem('selectedColor') || 'rgba(24, 24, 27, 0.8)');
    const [eyeSize, setEyeSize] = useState(localStorage.getItem('eyeSize') || 'md');
    function getSafeNumber(key, fallback) {
        const val = localStorage.getItem(key);
        const parsed = parseFloat(val || '');
        return isNaN(parsed) || parsed <= 0 ? fallback : parsed;
    }
    const [onDuration, setOnDuration] = useState(getSafeNumber('onDuration', 5));
    const [offDuration, setOffDuration] = useState(getSafeNumber('offDuration', 5));
    const [timer, setTimer] = useState(localStorage.getItem('timer') === 'true');
    // notification start
    useEffect(() => {
        let intervalId = null;
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
        }
        else if (Notification.permission === 'default') {
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
        localStorage.setItem('selectedColor', selectedColor);
    }, [selectedColor]);
    useEffect(() => {
        localStorage.setItem('eyeSize', eyeSize);
    }, [eyeSize]);
    useEffect(() => {
        localStorage.setItem('onDuration', onDuration.toString());
    }, [onDuration]);
    useEffect(() => {
        localStorage.setItem('offDuration', offDuration.toString());
    }, [offDuration]);
    useEffect(() => {
        localStorage.setItem('timer', timer.toString());
    }, [timer]);
    useEffect(() => {
        const interval = setInterval(() => {
            if (videoRef.current && videoRef.current.readyState >= 2) {
                videoRef.current.playbackRate = 0.25;
                clearInterval(interval);
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);
    // Timer logic
    useEffect(() => {
        if (!timer) {
            setVisible(true);
            return;
        }
        let isVisible = true;
        setVisible(true);
        const loop = () => {
            isVisible = !isVisible;
            setVisible(isVisible);
            const nextTime = (isVisible ? onDuration : offDuration) * 60 * 1000;
            timeoutRef.current = setTimeout(loop, nextTime);
        };
        const initialTimeout = setTimeout(loop, onDuration * 60 * 1000);
        return () => {
            clearTimeout(initialTimeout);
            if (timeoutRef.current)
                clearTimeout(timeoutRef.current);
        };
    }, [timer, onDuration, offDuration]);
    // Window resizing via Electron API
    useEffect(() => {
        if (window.electronAPI?.setWindowSize) {
            window.electronAPI.setWindowSize({
                width: settings ? 500 : windowWidth,
                height: 500,
            });
        }
    }, [settings, windowWidth]);
    const toggleSettings = () => {
        setSettings(prev => !prev);
        if (settings)
            setDrag(false);
    };
    return (_jsxs(_Fragment, { children: [showConfetti && _jsx(Confetti, { width: width, height: height, numberOfPieces: 300 }), _jsxs("div", { className: `app-wrapper ${visible ? '' : 'hidden'} rounded-md ${settings ? '' : 'draggable-window'}  w-screen h-screen flex flex-col items-center justify-center ${!close ? 'space-y-6' : ''}`, style: { backgroundColor: selectedColor }, children: [_jsx("div", { className: `${(Drag || close) ? 'draggable-window' : ''}  hover:border-2 ${!close ? 'p-2' : ''} border-white rounded-3xl`, children: _jsxs("div", { onMouseEnter: () => setHover(true), onMouseLeave: () => {
                                setHover(false);
                            }, className: `relative no-drag  rounded-2xl ${hover ? 'border-red-500 ' : ''}  flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105`, style: {
                                width: settings ? '300px' : '40vw', // Responsive based on window width
                                maxWidth: '500px',
                                minWidth: eyeSizeStyles[eyeSize],
                            }, children: [close ? (_jsx("div", { className: "flex flex-col items-center gap-4" })) : (_jsx(_Fragment, { children: _jsx("video", { ref: videoRef, src: eyeGif, autoPlay: true, loop: true, muted: true, playsInline: true, style: { transform: 'rotate(4deg)' }, className: "rounded-full object-contain" }) })
                                // <>
                                //   <img
                                //     src={eyeGif}
                                //     alt="Eye animation"
                                //     className={`rounded-full p-5 object-contain w-[${eyeSizeStyles[eyeSize]}]`}
                                //   />
                                // </>
                                ), hover && !close && (_jsx("div", { className: "absolute top-1 right-1 flex items-center space-x-2", children: _jsx("button", { className: "cursor-pointer text-white bg-black hover:bg-black/20 rounded-full p-1 flex items-center justify-center transition duration-200", onClick: toggleSettings, "aria-expanded": settings, "aria-label": "Toggle settings", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: 16, height: 16, color: "#ff0000", fill: "none", children: [_jsx("path", { d: "M10 4C10 2.89543 10.8954 2 12 2H13C14.1046 2 15 2.89543 15 4V6.55337C15 7.86603 15.8534 9.02626 17.1065 9.41722L17.8935 9.66278C19.1466 10.0537 20 11.214 20 12.5266V14C20 14.5523 19.5523 15 19 15H6C5.44772 15 5 14.5523 5 14V12.5266C5 11.214 5.85339 10.0537 7.10648 9.66278L7.89352 9.41722C9.14661 9.02626 10 7.86603 10 6.55337V4Z", stroke: "#ff0000", strokeWidth: "1.5" }), _jsx("path", { d: "M6.00217 15C6.15797 16.3082 5.4957 19.5132 4 21.8679C4 21.8679 14.2924 23.0594 15.6851 17.9434V19.8712C15.6851 20.8125 15.6851 21.2831 15.9783 21.5755C16.5421 22.1377 19.1891 22.1531 19.7538 21.5521C20.0504 21.2363 20.0207 20.7819 19.9611 19.8731C19.8629 18.3746 19.5932 16.4558 18.8523 15", stroke: "#ff0000", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })] }) }) })), hover && !close && (_jsx("div", { className: 'absolute bottom-1  right-1 \r\n              \r\n              ', onClick: () => setPomo(false), children: _jsx("button", { className: 'cursor-pointer', children: timerShow ? (_jsx("div", { onClick: () => {
                                                setTimerShow(false);
                                            }, className: 'bg-black  hover:bg-black/45 p-1 rounded-full', children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: 16, height: 16, color: "#02d024", fill: "none", children: [_jsx("path", { d: "M11.0809 13.152L8 7L13.4196 11.2796C14.1901 11.888 14.1941 13.0472 13.4277 13.6607C12.6614 14.2743 11.5189 14.0266 11.0809 13.152Z", stroke: "#02d024", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("path", { d: "M5 4.82C3.14864 6.63902 2 9.17385 2 11.9776C2 17.5129 6.47715 22.0001 12 22.0001C17.5228 22.0001 22 17.5129 22 11.9776C22 7.1242 18.5581 3.07656 13.9872 2.15288C13.1512 1.98394 12.7332 1.89947 12.3666 2.20022C12 2.50097 12 2.98714 12 3.95949V4.96175", stroke: "#02d024", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })] }) })) : (_jsx("div", { onClick: () => setTimerShow(true), className: 'bg-black hover:bg-black/45 p-1 rounded-full', children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: 16, height: 16, color: "#d0021b", fill: "none", children: [_jsx("path", { d: "M11.0809 13.152L8 7L13.4196 11.2796C14.1901 11.888 14.1941 13.0472 13.4277 13.6607C12.6614 14.2743 11.5189 14.0266 11.0809 13.152Z", stroke: "#d0021b", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("path", { d: "M5 4.82C3.14864 6.63902 2 9.17385 2 11.9776C2 17.5129 6.47715 22.0001 12 22.0001C17.5228 22.0001 22 17.5129 22 11.9776C22 7.1242 18.5581 3.07656 13.9872 2.15288C13.1512 1.98394 12.7332 1.89947 12.3666 2.20022C12 2.50097 12 2.98714 12 3.95949V4.96175", stroke: "#d0021b", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })] }) })) }) })), hover && !close && (_jsx("div", { onClick: () => {
                                        setClose(true);
                                    }, className: 'absolute top-1 left-1 bg-black hover:bg-black/45 p-1 rounded-full cursor-pointer ', children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: 16, height: 16, color: "#d0021b", fill: "none", children: _jsx("path", { d: "M10.2471 6.7402C11.0734 7.56657 11.4866 7.97975 12.0001 7.97975C12.5136 7.97975 12.9268 7.56658 13.7531 6.74022L13.7532 6.7402L15.5067 4.98669L15.5067 4.98668C15.9143 4.5791 16.1182 4.37524 16.3302 4.25283C17.3966 3.63716 18.2748 4.24821 19.0133 4.98669C19.7518 5.72518 20.3628 6.60345 19.7472 7.66981C19.6248 7.88183 19.421 8.08563 19.0134 8.49321L17.26 10.2466C16.4336 11.073 16.0202 11.4864 16.0202 11.9999C16.0202 12.5134 16.4334 12.9266 17.2598 13.7529L19.0133 15.5065C19.4209 15.9141 19.6248 16.1179 19.7472 16.3299C20.3628 17.3963 19.7518 18.2746 19.0133 19.013C18.2749 19.7516 17.3965 20.3626 16.3302 19.7469C16.1182 19.6246 15.9143 19.4208 15.5067 19.013L13.7534 17.2598L13.7533 17.2597C12.9272 16.4336 12.5136 16.02 12.0001 16.02C11.4867 16.02 11.073 16.4336 10.2469 17.2598L10.2469 17.2598L8.49353 19.013C8.0859 19.4208 7.88208 19.6246 7.67005 19.7469C6.60377 20.3626 5.72534 19.7516 4.98693 19.013C4.2484 18.2746 3.63744 17.3963 4.25307 16.3299C4.37549 16.1179 4.5793 15.9141 4.98693 15.5065L6.74044 13.7529C7.56681 12.9266 7.98 12.5134 7.98 11.9999C7.98 11.4864 7.5666 11.073 6.74022 10.2466L4.98685 8.49321C4.57928 8.08563 4.37548 7.88183 4.25307 7.66981C3.63741 6.60345 4.24845 5.72518 4.98693 4.98669C5.72542 4.24821 6.60369 3.63716 7.67005 4.25283C7.88207 4.37524 8.08593 4.5791 8.49352 4.98668L8.49353 4.98669L10.2471 6.7402Z", stroke: "#d0021b", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) })), hover && !close && (_jsx("div", { className: 'absolute bottom-1 left-1 bg-black hover:bg-black/45 p-1 rounded-full cursor-pointer ', onClick: () => setTimerShow(false), children: pomo ?
                                        (_jsxs("div", { onClick: () => setPomo(false), className: "relative group cursor-pointer", children: [_jsx("div", { className: "absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity", children: "Pomodoro" }), _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "16", height: "16", color: "#12de23", fill: "none", children: [_jsx("path", { d: "M4 3H20", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("path", { d: "M5.5 3V5.03039C5.5 6.27227 6.07682 7.4437 7.06116 8.20089L12 12L16.9388 8.20089C17.9232 7.44371 18.5 6.27227 18.5 5.03039V3", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("path", { d: "M5.5 21V18.9696C5.5 17.7277 6.07682 16.5563 7.06116 15.7991L12 12L16.9388 15.7991C17.9232 16.5563 18.5 17.7277 18.5 18.9696V21", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("path", { d: "M4 21H20", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })] })] })) :
                                        (_jsxs("div", { onClick: () => setPomo(true), className: "relative group cursor-pointer", children: [_jsx("div", { className: "absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity", children: "Pomodoro" }), _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "16", height: "16", color: "#d0021b", fill: "none", children: [_jsx("path", { d: "M4 3H20", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("path", { d: "M5.5 3V5.03039C5.5 6.27227 6.07682 7.4437 7.06116 8.20089L12 12L16.9388 8.20089C17.9232 7.44371 18.5 6.27227 18.5 5.03039V3", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("path", { d: "M5.5 21V18.9696C5.5 17.7277 6.07682 16.5563 7.06116 15.7991L12 12L16.9388 15.7991C17.9232 16.5563 18.5 17.7277 18.5 18.9696V21", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("path", { d: "M4 21H20", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })] })] })) }))] }) }), !isPomodoroRunning && !pomo && (_jsx("div", { className: "absolute bottom-2/3 left-[4rem] transition duration-300 z-20", children: close && (_jsx("div", { className: "relative group", children: _jsx("div", { className: "absolute bottom-1 left-1 no-drag bg-white/10 hover:bg-white/20 backdrop-blur-lg p-1.5 rounded-full cursor-pointer border border-/20 shadow-md hover:shadow-xl transition duration-200", onClick: () => setTimerShow(false), children: _jsx("div", { onClick: () => setPomo(!pomo), className: "relative group cursor-pointer", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "18", height: "18", fill: "none", className: "text-white transition-transform duration-200 group-hover:scale-110", children: [_jsx("path", { d: "M4 3H20", stroke: pomo ? "#12de23" : "#d0021b", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("path", { d: "M5.5 3V5.03039C5.5 6.27227 6.07682 7.4437 7.06116 8.20089L12 12L16.9388 8.20089C17.9232 7.44371 18.5 6.27227 18.5 5.03039V3", stroke: pomo ? "#12de23" : "#d0021b", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("path", { d: "M5.5 21V18.9696C5.5 17.7277 6.07682 16.5563 7.06116 15.7991L12 12L16.9388 15.7991C17.9232 16.5563 18.5 17.7277 18.5 18.9696V21", stroke: pomo ? "#12de23" : "#d0021b", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("path", { d: "M4 21H20", stroke: pomo ? "#12de23" : "#d0021b", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })] }) }) }) })) })), pomo && (_jsxs("div", { className: "pomodoro-container relative no-drag bg-black/30 backdrop-blur-lg rounded-2xl p-6 w-full max-w-md text-white flex flex-col items-center space-y-6 select-none border border-white/10", children: [_jsx("button", { onClick: () => setPomo(false), className: "absolute top-3 right-3 text-white hover:text-red-400 transition", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), _jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] }) }), _jsxs("div", { className: "flex gap-6 w-full justify-center", children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("label", { htmlFor: "pomodoroDuration", className: "mb-1 text-sm font-semibold text-white/90", children: "Work Duration" }), _jsx("select", { id: "pomodoroDuration", className: "rounded px-2 py-1 bg-black/60 text-white border border-white/10 focus:outline-none", value: pomodoroDuration, onChange: (e) => {
                                                    const val = Number(e.target.value);
                                                    setPomodoroDuration(val);
                                                    if (!isPomodoroRunning && !isOnBreak) {
                                                        setTimeLeft(val * 60);
                                                    }
                                                    localStorage.setItem('pomodoroDuration', val.toString());
                                                }, children: pomodoroOptions.map((d) => (_jsxs("option", { value: d, children: [d, " min"] }, d))) })] }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx("label", { htmlFor: "breakDuration", className: "mb-1 text-sm font-semibold text-blue-300", children: "Break Duration" }), _jsx("select", { id: "breakDuration", className: "rounded px-2 py-1 bg-black/60 text-white border border-blue-400/20 focus:outline-none", value: breakDuration, onChange: (e) => {
                                                    const val = Number(e.target.value);
                                                    setBreakDuration(val);
                                                    if (!isPomodoroRunning && isOnBreak) {
                                                        setTimeLeft(val * 60);
                                                    }
                                                    localStorage.setItem('breakDuration', val.toString());
                                                }, children: pomodoroOptions.map((d) => (_jsxs("option", { value: d, children: [d, " min"] }, d))) })] })] }), _jsxs("div", { className: "flex gap-4", children: [isPomodoroRunning ? (_jsx("button", { className: "bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold transition duration-200", onClick: () => setIsPomodoroRunning(false), children: "Pause" })) : (_jsx("button", { className: "bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold transition duration-200", onClick: () => {
                                            setIsPomodoroRunning(true);
                                            setShowPomo(true);
                                        }, children: "Start" })), _jsx("button", { className: "bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded font-semibold transition duration-200", onClick: () => {
                                            setIsPomodoroRunning(false);
                                            setIsOnBreak(false);
                                            setTimeLeft(pomodoroDuration * 60);
                                        }, children: "Reset" })] }), _jsxs("button", { className: "bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded font-semibold transition duration-200", onClick: () => {
                                    setShowPomo((prev) => !prev);
                                    setIsPomodoroRunning(false);
                                }, children: ["Visibility : ", showPomo ? 'on' : 'off'] })] })), timerShow && !close && (_jsxs(_Fragment, { children: [_jsx("button", { className: `relative px-5 py-2.5 rounded-full font-medium shadow-md border transition-all duration-300 ease-in-out 
    ${timer
                                    ? 'bg-gradient-to-r from-emerald-400 to-emerald-600 text-white border-emerald-700 hover:shadow-emerald-500/50'
                                    : 'bg-gradient-to-r from-rose-400 to-rose-600 text-white border-rose-700 hover:shadow-rose-500/50'} 
    hover:scale-105 hover:ring-2 hover:ring-opacity-50 cursor-pointer no-drag`, onClick: () => {
                                    setTimer(!timer);
                                    // setPomo(false)
                                }, children: _jsx("span", { className: "inline-flex items-center gap-2", children: timer ? (_jsxs(_Fragment, { children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4l3 3" }) }), "Timer: ON"] })) : (_jsxs(_Fragment, { children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }), "Timer: OFF"] })) }) }), !timer && (_jsxs("div", { className: "p-6 rounded-2xl cursor-pointer max-w-sm w-full text-center flex flex-col items-center space-y-4 mx-auto bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-lg shadow-xl border border-gray-200", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-800", children: "\u23F1\uFE0F Timer Settings" }), _jsxs("div", { className: "timer-settings no-drag bg-white/80 rounded-xl p-4 w-full space-y-4 shadow-inner border border-gray-100", children: [_jsxs("div", { className: "offduration border-b border-gray-300 pb-3", children: [_jsx("label", { htmlFor: "offDuration", className: "block text-sm font-medium text-gray-600 mb-1", children: "Off Duration:" }), _jsx("select", { id: "offDuration", value: offDuration, onChange: (e) => setOffDuration(Number(e.target.value)), className: "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none transition-all", children: durationOptions.map((duration) => (_jsxs("option", { value: duration, children: [duration, " minutes"] }, duration))) })] }), _jsxs("div", { className: "onduration", children: [_jsx("label", { htmlFor: "onDuration", className: "block text-sm font-medium text-gray-600 mb-1", children: "On Duration:" }), _jsx("select", { id: "onDuration", value: onDuration, onChange: (e) => setOnDuration(Number(e.target.value)), className: "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none transition-all", children: durationOptions.map((duration) => (_jsxs("option", { value: duration, children: [duration, " minutes"] }, duration))) })] })] })] }))] })), settings && (_jsxs("div", { className: "  p-4 rounded-xl max-w-xs w-full text-center  space-y-4 relative", children: [_jsx("div", { className: "flex justify-center gap-2 mb-4", children: ['sm', 'md', 'lg', 'xl'].map(size => (_jsx("button", { onClick: () => setEyeSize(size), className: `text-xs px-3 py-1 rounded-full border 
        ${eyeSize === size ? 'bg-white text-black' : 'bg-black/40 text-white'} 
        hover:scale-105 transition`, children: size.toUpperCase() }, size))) }), _jsx("label", { className: "block text-white font-semibold mb-2 text-sm", children: "Choose Premium Color" }), _jsx("div", { className: "flex justify-between relative gap-3", children: premiumColors.map((color, i) => {
                                    const isTransparent = color === 'transparent';
                                    const isSelected = selectedColor === color;
                                    return (_jsx("div", { className: `rounded-full ${isTransparent && isSelected ? 'p-[2px] border-animation' : ''}`, children: _jsx("button", { onClick: () => setSelectedColor(color), style: {
                                                backgroundColor: isTransparent ? 'transparent' : color,
                                            }, className: `w-10 h-10 rounded-full border transition-transform hover:scale-110 
            ${isSelected && !isTransparent ? 'border-white' : 'border-transparent'} 
            ${isTransparent ? 'bg-checkered' : ''}
          `, "aria-label": `Select color ${i + 1}` }) }, i));
                                }) }), _jsx("button", { onClick: () => setSettings(false), className: "absolute top-0 right-2 p-1 transition", "aria-label": "Close settings", style: {
                                    color: 'white',
                                    // filter: 'drop-shadow(0 0 4px rgb(255 0 0)) drop-shadow(0 0 6px rgb(0 255 0)) drop-shadow(0 0 8px rgb(0 0 255))',
                                    // alternatively use textShadow:
                                    // textShadow: '0 0 5px red, 0 0 10px green, 0 0 15px blue',
                                    cursor: 'pointer',
                                }, children: _jsx(FiX, { size: 20 }) })] })), !pomo && showPomo && !timerShow && !settings && (_jsxs("div", { className: "relative group w-40 h-40 no-drag  rounded-full transition-all duration-150 active:scale-95 shadow-md hover:shadow-xl", onClick: () => setIsPomodoroRunning(!isPomodoroRunning), children: [_jsxs("svg", { className: "w-full h-full rotate-[-90deg]", viewBox: "0 0 100 100", children: [_jsx("circle", { cx: "50", cy: "50", r: "45", stroke: "rgba(255,255,255,0.08)", strokeWidth: "8", fill: "none" }), _jsx("circle", { cx: "50", cy: "50", r: "45", stroke: isOnBreak ? "url(#blueGradient)" : "url(#greenGradient)", strokeWidth: "8", fill: "none", strokeDasharray: 2 * Math.PI * 45, strokeDashoffset: 2 * Math.PI * 45 *
                                            (1 - timeLeft / ((isOnBreak ? breakDuration : pomodoroDuration) * 60)), strokeLinecap: "round", className: "transition-all duration-500 " }), _jsxs("defs", { children: [_jsxs("linearGradient", { id: "greenGradient", x1: "1", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "#00ffcc" }), _jsx("stop", { offset: "100%", stopColor: "#22c55e" })] }), _jsxs("linearGradient", { id: "blueGradient", x1: "1", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "#3b82f6" }), _jsx("stop", { offset: "100%", stopColor: "#60a5fa" })] })] })] }), _jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center text-center", children: [_jsx("div", { className: "text-4xl font-mono tracking-wide text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]", children: formatTime(timeLeft) }), _jsx("div", { className: `text-xs mt-1 font-semibold uppercase tracking-wide ${isOnBreak ? 'text-blue-400' : 'text-green-400'}`, children: isOnBreak ? 'Break Time' : 'Focus Time' })] })] }))] })] }));
}
export default App;
