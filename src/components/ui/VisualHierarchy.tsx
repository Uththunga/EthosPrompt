import React from 'react';
import { cn } from '../../lib/utils';

// Typography Components with consistent hierarchy
interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'default' | 'gradient' | 'accent';
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  level = 1,
  variant = 'default',
  className = ''
}) => {
  const baseClasses = 'font-bold tracking-tight';
  
  const sizeClasses = {
    1: 'text-4xl lg:text-5xl',
    2: 'text-3xl lg:text-4xl',
    3: 'text-2xl lg:text-3xl',
    4: 'text-xl lg:text-2xl',
    5: 'text-lg lg:text-xl',
    6: 'text-base lg:text-lg'
  };

  const variantClasses = {
    default: 'text-white',
    gradient: 'bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent',
    accent: 'text-purple-400'
  };

  const Component = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Component
      className={cn(
        baseClasses,
        sizeClasses[level],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </Component>
  );
};

// Text Components
interface TextProps {
  children: React.ReactNode;
  variant?: 'body' | 'caption' | 'small' | 'large';
  color?: 'default' | 'muted' | 'accent' | 'success' | 'warning' | 'error';
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  color = 'default',
  className = ''
}) => {
  const sizeClasses = {
    small: 'text-xs',
    caption: 'text-sm',
    body: 'text-base',
    large: 'text-lg'
  };

  const colorClasses = {
    default: 'text-white',
    muted: 'text-gray-400',
    accent: 'text-purple-400',
    success: 'text-green-400',
    warning: 'text-yellow-400',
    error: 'text-red-400'
  };

  return (
    <p className={cn(
      sizeClasses[variant],
      colorClasses[color],
      'leading-relaxed',
      className
    )}>
      {children}
    </p>
  );
};

// Section Components for consistent spacing
interface SectionProps {
  children: React.ReactNode;
  spacing?: 'tight' | 'normal' | 'loose' | 'extra-loose';
  className?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  spacing = 'normal',
  className = ''
}) => {
  const spacingClasses = {
    tight: 'space-y-4',
    normal: 'space-y-6',
    loose: 'space-y-8',
    'extra-loose': 'space-y-12'
  };

  return (
    <section className={cn(spacingClasses[spacing], className)}>
      {children}
    </section>
  );
};

// Card Components with consistent styling
interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  padding?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'medium',
  className = '',
  hover = false
}) => {
  const variantClasses = {
    default: 'bg-gray-800/60 border border-gray-700/40',
    elevated: 'bg-gray-800/80 border border-gray-700/50 shadow-xl shadow-black/20',
    outlined: 'bg-transparent border-2 border-gray-700/60',
    glass: 'bg-gray-800/40 backdrop-blur-sm border border-gray-700/30'
  };

  const paddingClasses = {
    none: '',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  };

  const hoverClasses = hover ? 'transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 hover:border-purple-500/30' : '';

  return (
    <div className={cn(
      'rounded-xl',
      variantClasses[variant],
      paddingClasses[padding],
      hoverClasses,
      className
    )}>
      {children}
    </div>
  );
};

// Badge Components
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  className = ''
}) => {
  const variantClasses = {
    default: 'bg-gray-700/50 text-gray-300 border-gray-600/50',
    success: 'bg-green-900/40 text-green-300 border-green-800/50',
    warning: 'bg-yellow-900/40 text-yellow-300 border-yellow-800/50',
    error: 'bg-red-900/40 text-red-300 border-red-800/50',
    info: 'bg-blue-900/40 text-blue-300 border-blue-800/50',
    purple: 'bg-purple-900/40 text-purple-300 border-purple-800/50'
  };

  const sizeClasses = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-2.5 py-1 text-xs',
    large: 'px-3 py-1.5 text-sm'
  };

  return (
    <span className={cn(
      'inline-flex items-center rounded-full font-medium border',
      variantClasses[variant],
      sizeClasses[size],
      className
    )}>
      {children}
    </span>
  );
};

// Divider Component
interface DividerProps {
  variant?: 'solid' | 'dashed' | 'gradient';
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'tight' | 'normal' | 'loose';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  variant = 'solid',
  orientation = 'horizontal',
  spacing = 'normal',
  className = ''
}) => {
  const variantClasses = {
    solid: 'border-gray-700/50',
    dashed: 'border-gray-700/50 border-dashed',
    gradient: 'border-0 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent'
  };

  const spacingClasses = {
    tight: orientation === 'horizontal' ? 'my-4' : 'mx-4',
    normal: orientation === 'horizontal' ? 'my-6' : 'mx-6',
    loose: orientation === 'horizontal' ? 'my-8' : 'mx-8'
  };

  const orientationClasses = orientation === 'horizontal' 
    ? 'w-full border-t' 
    : 'h-full border-l';

  if (variant === 'gradient') {
    return (
      <div className={cn(
        'w-full h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent',
        spacingClasses,
        className
      )} />
    );
  }

  return (
    <div className={cn(
      orientationClasses,
      variantClasses[variant],
      spacingClasses,
      className
    )} />
  );
};

// Container Component for consistent max-widths and centering
interface ContainerProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'full';
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'large',
  className = ''
}) => {
  const sizeClasses = {
    small: 'max-w-2xl',
    medium: 'max-w-4xl',
    large: 'max-w-7xl',
    full: 'max-w-full'
  };

  return (
    <div className={cn(
      'mx-auto px-4 sm:px-6 lg:px-8',
      sizeClasses[size],
      className
    )}>
      {children}
    </div>
  );
};
