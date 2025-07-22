import React from 'react';
import { FiX } from 'react-icons/fi';

interface SettingsPanelProps {
  setSettings: React.Dispatch<React.SetStateAction<boolean>>;
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  setSettings,
  selectedColor,
  setSelectedColor
}) => {
  const colors: string[] = ['#2E2E2E', '#FF6347', '#32CD32', '#8A2BE2', '#FF8C00'];

  return (
    <div className="absolute top-0 left-0 bg-white bg-opacity-80 w-full h-full flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-xl max-w-md space-y-6">Eye
      Size
      
        <button
          onClick={() => setSettings(false)}
          className="absolute top-3 right-3 text-white"
        >
          <FiX size={20} />
        </button>

        <h3 className="text-2xl text-white">Settings</h3>
        
        {/* Color Picker */}
        <div>
          <label className="block text-white">Select Color</label>
          <div className="flex gap-2 mt-4">
            {colors.map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full ${selectedColor === color ? 'border-4 border-white' : ''}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
