import React from 'react';
import { VALIDATION } from '../../config/constants';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  const charCount = value.length;
  const isNearLimit = charCount > VALIDATION.MAX_CHARS * 0.9;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-900">Your text</h3>
      </div>
      
      <div className="p-6 relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Paste your text here..."
          className="w-full h-64 resize-none text-sm bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#134686] focus:border-transparent p-4"
          maxLength={VALIDATION.MAX_CHARS}
        />
        
        <div className={`absolute bottom-8 right-8 text-xs px-3 py-1.5 rounded-md font-medium ${
          isNearLimit 
            ? 'bg-red-50 text-red-700 border border-red-200' 
            : 'bg-gray-100 text-gray-600 border border-gray-200'
        }`}>
          {charCount} / {VALIDATION.MAX_CHARS}
        </div>
      </div>
    </div>
  );
};
