import React from 'react';
import { FiX } from 'react-icons/fi';

// TypeScript interface for props
interface SettingsComponentProps {
  settings: boolean; // Controls visibility of settings
  setSettings: React.Dispatch<React.SetStateAction<boolean>>; // Function to toggle settings visibility
  eyeSize: 'sm' | 'md' | 'lg' | 'xl'; // Eye size options
  setEyeSize: React.Dispatch<React.SetStateAction<'sm' | 'md' | 'lg' | 'xl'>>; // Function to change eye size
  premiumColors: string[]; // Array of color strings
  selectedColor: string; // Current selected color
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>; // Function to change selected color
}

const SettingsComponent: React.FC<SettingsComponentProps> = ({
  settings,
  setSettings,
  eyeSize,
  setEyeSize,
  premiumColors,
  selectedColor,
  setSelectedColor,
}) => {
  return (
    settings && (
      <div className="p-4 z-20 rounded-xl  w-[13rem] text-center space-y-5 relative bg-gradient-to-br from-black to-gray-900 shadow-lg backdrop-blur-sm">
        {/* Eye Size Dropdown */}
        <div className='flex gap-3.5'>

        
        <div>
          <label className="block cursor-pointer text-white font-semibold text-sm">Eye</label>
          <label className="block cursor-pointer text-white font-semibold mb-1 text-sm">Size</label>
          <select
            value={eyeSize}
            onChange={(e) => setEyeSize(e.target.value as 'sm' | 'md' | 'lg' | 'xl')}
            className="w-full px-3 py-1.5 rounded-lg bg-gray-800 text-white text-sm border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Select Eye Size"
          >
            {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
              <option key={size} value={size}>
                {size.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Premium Color Dropdown */}
        <div>
          <label className="block text-white font-semibold mb-1 text-sm">Premium Color</label>
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg bg-gray-800 text-white text-base border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Select Premium Color"
          >
            {premiumColors.map((color, i) => (
              <option key={i} value={color} style={{ backgroundColor: color }} className="text-transparent">
                {/* Empty text to show only the color background */}
              </option>
            ))}
          </select>
        </div>
</div>
        {/* Close Settings Button */}
        <button
          onClick={() => setSettings(false)}
          className=" top-2 right-2 p-2 bg-red-500 rounded-full cursor-pointer transition-transform duration-150 hover:scale-110 focus:outline-none"
          aria-label="Close settings"
        >
          <FiX size={20} className="text-white" />
        </button>
      </div>  
    )
  );
};

export default SettingsComponent;
