import React from 'react';
import './Timer.css';
interface TimerProps {
    title: string;
    onClick?: () => void;
}
declare const Timer: React.FC<TimerProps>;
export default Timer;
