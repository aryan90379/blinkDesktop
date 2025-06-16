import React from 'react';
import './Timer.css'; // Make sure this file exists and styles the component

interface TimerProps {
  title: string;
  onClick?: () => void;
}

const Timer: React.FC<TimerProps> = ({ title, onClick }) => {
  return (
    <div className="timer-container cursor-pointer" onClick={onClick}>
      <a href="#" className="button">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {title}
      </a>
    </div>
  );
};

export default Timer;
