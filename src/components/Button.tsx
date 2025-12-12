import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'px-6 py-3 rounded-xl font-semibold text-sm shadow-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';
  
  const variantStyles = variant === 'primary' 
    ? 'bg-gradient-to-b from-[#4a90e2] via-[#3a7bc8] to-[#2e5c8a] text-white border border-[#2e5c8a] shadow-[0_4px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] active:shadow-[0_2px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]' 
    : 'bg-gradient-to-b from-[#f0f0f0] via-[#d8d8d8] to-[#c0c0c0] text-gray-800 border border-gray-400 shadow-[0_3px_5px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.5)] active:shadow-[0_1px_2px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3)]';

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
