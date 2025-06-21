import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Loading...', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const containerClasses = {
    sm: 'gap-2 text-sm',
    md: 'gap-3 text-base',
    lg: 'gap-4 text-lg'
  };

  return (
    <div className={`flex flex-col items-center justify-center py-8 ${containerClasses[size]} ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-purple-400`} />
      {text && (
        <span className="text-gray-400 font-medium">{text}</span>
      )}
    </div>
  );
};

// Page-level loading component for route transitions
export const PageLoadingSpinner: React.FC = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <LoadingSpinner 
      size="lg" 
      text="Loading page..." 
      className="text-white"
    />
  </div>
);

// Component-level loading for smaller sections
export const ComponentLoadingSpinner: React.FC<{ text?: string }> = ({ text = 'Loading...' }) => (
  <div className="flex items-center justify-center py-4">
    <LoadingSpinner 
      size="md" 
      text={text}
      className="text-gray-300"
    />
  </div>
);

// Inline loading for buttons and small elements
export const InlineLoadingSpinner: React.FC = () => (
  <Loader2 className="w-4 h-4 animate-spin" />
);

export default LoadingSpinner;
