import React, { forwardRef } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  showCharCount?: boolean;
  currentCount?: number;
  maxCount?: number;
  isNearLimit?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ 
    className = '', 
    showCharCount = false, 
    currentCount = 0, 
    maxCount, 
    isNearLimit = false, 
    ...props 
  }, ref) => {
    return (
      <div className="relative flex flex-col">
        <textarea
          ref={ref}
          className={`w-full resize-none p-2 text-xs font-mono border-2 border-black bg-white text-black focus:outline-none focus:ring-2 focus:ring-black ${className}`}
          style={{ lineHeight: '1.4' }}
          {...props}
        />
        {showCharCount && maxCount && (
          <div className={`absolute bottom-1 right-1 text-[10px] px-2 py-1 bg-black text-[#e8e8d0] border border-black font-mono ${isNearLimit ? 'animate-pulse' : ''}`}>
            {currentCount}/{maxCount}
          </div>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
