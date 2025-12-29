import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'white';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-navy text-white hover:bg-navy-dark shadow-medium hover:shadow-navy active:scale-[0.98]',
    secondary: 'bg-white text-navy border-2 border-navy hover:bg-navy hover:text-white active:scale-[0.98]',
    white: 'bg-white text-navy hover:bg-gray-50 shadow-soft active:scale-[0.98]'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
