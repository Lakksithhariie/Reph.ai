import React from 'react';

interface SubmitButtonProps {
  onClick: () => void;
  disabled: boolean;
  isProcessing: boolean;
  intentSelected: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  onClick,
  disabled,
  isProcessing,
  intentSelected
}) => {
  let buttonText = 'Check & Fix';
  
  if (isProcessing) {
    buttonText = 'Editing safely...';
  } else if (!intentSelected) {
    buttonText = 'Select intent first';
  }

  return (
    <div className="flex flex-col items-center space-y-3">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          px-8 py-4 rounded-lg font-semibold text-base transition-all
          ${disabled 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-[#134686] text-white hover:bg-[#0f3666] active:scale-95'
          }
        `}
      >
        {buttonText}
      </button>
      
      {!intentSelected && !isProcessing && (
        <p className="text-xs text-gray-500">
          Select an intent to protect your meaning
        </p>
      )}
      
      {isProcessing && (
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-[#134686]"></div>
          <p className="text-xs text-gray-600">
            Preserving intent...
          </p>
        </div>
      )}
    </div>
  );
};
