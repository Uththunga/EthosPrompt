import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  const variantClasses = {
    default: 'bg-purple-100 bg-opacity-10 text-purple-400',
    success: 'bg-green-100 bg-opacity-10 text-green-400',
    warning: 'bg-yellow-100 bg-opacity-10 text-yellow-400',
    error: 'bg-red-100 bg-opacity-10 text-red-400',
    info: 'bg-blue-100 bg-opacity-10 text-blue-400',
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};