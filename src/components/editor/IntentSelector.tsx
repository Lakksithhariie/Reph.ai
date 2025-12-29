import React from 'react';
import { Intent } from '../../types';
import { INTENT_OPTIONS } from '../../config/constants';

interface IntentSelectorProps {
  selectedIntent: Intent | null;
  onChange: (intent: Intent) => void;
  disabled?: boolean;
}

export const IntentSelector: React.FC<IntentSelectorProps> = ({
  selectedIntent,
  onChange,
  disabled = false
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-900">
          Select your intent
        </h3>
        <p className="text-xs text-gray-600 mt-1">
          This helps us protect your original meaning
        </p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {INTENT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              disabled={disabled}
              className={`
                p-4 rounded-lg border-2 transition-all text-left
                ${selectedIntent === option.value
                  ? 'border-[#134686] bg-[#e8f2ff]'
                  : 'border-gray-200 bg-white hover:border-gray-300'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <div className="font-semibold text-sm text-gray-900 mb-1">
                {option.label}
              </div>
              <div className="text-xs text-gray-600">
                {option.description}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
