import React from 'react';
import './SoftButton.css';

interface SoftButtonProps {
  onClick?: () => void;
}

const SoftButton: React.FC<SoftButtonProps> = ({
  onClick

 }) => {
  return (
    <div className="soft-container">
      <div className="soft btn cursor-pointer" onClick={onClick} >
        <div className="btn-txt soft-txt">back</div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default SoftButton;
