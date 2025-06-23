import React from 'react';
import { Crown, Lock, Check } from 'lucide-react';
import { usePromptAccess } from '../../hooks/usePromptAccess';

interface AccessBadgeProps {
  accessType: 'free' | 'paid';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const AccessBadge: React.FC<AccessBadgeProps> = ({ 
  accessType, 
  size = 'md', 
  showText = true,
  className = '' 
}) => {
  const { hasLifetimeAccess } = usePromptAccess();

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  };

  if (accessType === 'free') {
    return (
      <span className={`inline-flex items-center gap-1.5 ${sizeClasses[size]} bg-green-600/20 text-green-400 border border-green-600/30 rounded-full font-medium ${className}`}>
        <Check size={iconSizes[size]} />
        {showText && 'Free'}
      </span>
    );
  }

  // Paid content
  if (hasLifetimeAccess) {
    return (
      <span className={`inline-flex items-center gap-1.5 ${sizeClasses[size]} bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 text-yellow-400 border border-yellow-600/30 rounded-full font-medium ${className}`}>
        <Crown size={iconSizes[size]} />
        {showText && 'Premium'}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 ${sizeClasses[size]} bg-gray-600/20 text-gray-400 border border-gray-600/30 rounded-full font-medium ${className}`}>
      <Lock size={iconSizes[size]} />
      {showText && 'Premium'}
    </span>
  );
};

export default AccessBadge;
