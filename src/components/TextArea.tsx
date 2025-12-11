import React, { forwardRef } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ className = '', ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`w-full resize-none p-2 text-sm font-mono border-2 border-t-black border-l-black border-r-white border-b-white bg-white focus:outline-none focus:bg-white selection:bg-[#000080] selection:text-white ${className}`}
      {...props}
    />
  );
});

TextArea.displayName = 'TextArea';