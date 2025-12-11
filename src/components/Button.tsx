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
  const baseStyles = "px-4 py-1 text-sm bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-black border-b-black active:border-t-black active:border-l-black active:border-r-white active:border-b-white focus:outline-none focus:ring-1 focus:ring-black focus:ring-offset-1 focus:ring-offset-[#c0c0c0]";
  const variantStyles = variant === 'primary' ? "font-bold text-black" : "text-black";

  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${className} disabled:text-gray-500 disabled:active:border-t-white disabled:active:border-l-white disabled:active:border-r-black disabled:active:border-b-black`} 
      {...props}
    >
      {children}
    </button>
  );
};