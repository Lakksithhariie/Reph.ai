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
  const baseStyles = 'px-4 py-2 text-xs font-bold border-2 border-black font-mono uppercase tracking-wide transition-all';
  const variantStyles = variant === 'primary' 
    ? 'bg-black text-[#e8e8d0] hover:bg-[#333] active:bg-[#555]' 
    : 'bg-[#d0d0b8] text-black hover:bg-[#c0c0a8] active:bg-[#b0b098]';
  const disabledStyles = 'disabled:bg-[#999] disabled:text-[#666] disabled:cursor-not-allowed disabled:border-[#666]';

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${disabledStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
