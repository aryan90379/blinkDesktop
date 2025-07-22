import React from 'react';

const eyeSizeStyles: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
  sm: '120px',
  md: '160px',
  lg: '200px',
  xl: '240px',
};

interface EyeSelectorProps {
  selectedEye: string;
  setSelectedEye: (eye: string) => void;
  eyeSize: 'sm' | 'md' | 'lg' | 'xl';
  setEyeSize: (size: 'sm' | 'md' | 'lg' | 'xl') => void;
  hover: boolean;
  ref: string;
  setHover: (hover: boolean) => void;
}

const EyeSelector: React.FC<EyeSelectorProps> = ({
  ref,
  selectedEye,
  setSelectedEye,
  eyeSize,
  setEyeSize,

}) => {
  const eyeOptions = [
    { name: 'Grey', src: 'greyEye.webm', color: 'bg-gray-500' },
    { name: 'Pink', src: 'pinkEye.webm', color: 'bg-pink-500' },
    { name: 'Brown', src: 'brownEye.webm', color: 'bg-yellow-900' },
    { name: 'Green', src: 'greenEye.webm', color: 'bg-green-500' },
    { name: 'Purple', src: 'purpleEye.webm', color: 'bg-purple-600' },
  ];

  return (
    <div className="flex flex-col items-center">
      <video
        ref={ref}
        src={selectedEye}
        autoPlay
        loop
        muted
        playsInline
        className={`rounded-full object-contain ${eyeSizeStyles[eyeSize]}`}
      />
      
      {/* Eye Size Selection */}
      <div className="flex gap-2 mt-4">
        {['sm', 'md', 'lg', 'xl'].map(size => (
          <button
            key={size}
            onClick={() => setEyeSize(size as 'sm' | 'md' | 'lg' | 'xl')}
            className={`px-2 py-1 rounded-full text-xs ${eyeSize === size ? 'bg-white text-black' : 'bg-gray-500'} `}
          >
            {size.toUpperCase()}
          </button>
        ))}
      </div>
      
      {/* Eye Color Selection */}
      <div className="flex gap-2 mt-4">
        {eyeOptions.map((eye) => (
          <button
            key={eye.name}
            onClick={() => setSelectedEye(eye.src)}
            className={`px-3 py-1 rounded-full text-white text-sm hover:brightness-110 transition ${eye.color}`}
          >
            {eye.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EyeSelector;
