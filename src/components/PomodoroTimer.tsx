import React, { useState, useEffect } from 'react';

const PomodoroTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isPomodoroRunning, setIsPomodoroRunning] = useState<boolean>(false);
  const [isOnBreak, setIsOnBreak] = useState<boolean>(false);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!isPomodoroRunning) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (isOnBreak) {
            setIsOnBreak(false);
            return 25 * 60;  // reset to Pomodoro time
          } else {
            setIsOnBreak(true);
            return 5 * 60;  // break time
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPomodoroRunning, isOnBreak]);

  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl font-semibold text-white">{formatTime(timeLeft)}</div>
      <button
        onClick={() => setIsPomodoroRunning(prev => !prev)}
        className="mt-4 bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600"
      >
        {isPomodoroRunning ? 'Pause' : 'Start'}
      </button>
    </div>
  );
};

export default PomodoroTimer;
