import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface MobileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'compact' | 'elevated' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const MobileCard = forwardRef<HTMLDivElement, MobileCardProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md',
    interactive = false,
    loading = false,
    children, 
    ...props 
  }, ref) => {
    const baseClasses = cn(
      'relative overflow-hidden transition-all duration-200 ease-in-out',
      'bg-gray-800/40 backdrop-blur-sm border border-gray-700/50',
      // Touch target optimization
      interactive && 'touch-target cursor-pointer select-none',
      // Loading state
      loading && 'mobile-loading',
      // Interactive states
      interactive && [
        'active:scale-[0.98] active:shadow-sm',
        'hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10',
        'focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-gray-900'
      ]
    );

    const variantClasses = {
      default: 'rounded-xl shadow-lg',
      compact: 'rounded-lg shadow-md',
      elevated: 'rounded-xl shadow-2xl shadow-purple-500/5',
      outlined: 'rounded-xl border-2 shadow-sm'
    };

    const sizeClasses = {
      sm: 'p-3',
      md: 'p-4 sm:p-6',
      lg: 'p-6 sm:p-8'
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

MobileCard.displayName = 'MobileCard';

// Specialized card components for common use cases
export const MobileArticleCard = forwardRef<HTMLDivElement, {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  difficulty?: string;
  tags?: string[];
  image?: string;
  href?: string;
  className?: string;
  onPress?: () => void;
}>(({ 
  title, 
  excerpt, 
  author, 
  date, 
  readTime, 
  category, 
  difficulty,
  tags = [],
  image,
  href,
  className,
  onPress,
  ...props 
}, ref) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (href) {
      window.location.href = href;
    }
  };

  return (
    <MobileCard
      ref={ref}
      variant="default"
      size="md"
      interactive
      className={cn('group', className)}
      onClick={handlePress}
      {...props}
    >
      {/* Image/Visual */}
      {image && (
        <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-blue-900/20">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      {/* Category & Difficulty */}
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
          {category}
        </span>
        {difficulty && (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-700/50 text-gray-300 border border-gray-600/50">
            {difficulty}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="mobile-heading-sm text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
        {title}
      </h3>

      {/* Excerpt */}
      <p className="mobile-body-sm text-gray-300 mb-4 line-clamp-3">
        {excerpt}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-700/30 text-gray-400 border border-gray-600/30"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-700/30 text-gray-400 border border-gray-600/30">
              +{tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Meta */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
            <span className="text-white font-medium text-xs">
              {author.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <span className="mobile-caption text-gray-400">{author}</span>
        </div>
        <div className="flex items-center gap-3 mobile-caption text-gray-500">
          <span>{date}</span>
          <span>•</span>
          <span>{readTime}</span>
        </div>
      </div>
    </MobileCard>
  );
});

MobileArticleCard.displayName = 'MobileArticleCard';

export const MobileFeatureCard = forwardRef<HTMLDivElement, {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}>(({ icon, title, description, action, className, ...props }, ref) => {
  return (
    <MobileCard
      ref={ref}
      variant="default"
      size="md"
      className={cn('text-center', className)}
      {...props}
    >
      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="mobile-heading-sm text-white mb-3">{title}</h3>
      <p className="mobile-body-sm text-gray-300 mb-4">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </MobileCard>
  );
});

MobileFeatureCard.displayName = 'MobileFeatureCard';

export const MobileStatsCard = forwardRef<HTMLDivElement, {
  value: string | number;
  label: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}>(({ value, label, change, trend = 'neutral', className, ...props }, ref) => {
  const trendColors = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-gray-400'
  };

  return (
    <MobileCard
      ref={ref}
      variant="compact"
      size="sm"
      className={cn('text-center', className)}
      {...props}
    >
      <div className="mobile-heading-lg text-white mb-1">{value}</div>
      <div className="mobile-caption text-gray-400 mb-2">{label}</div>
      {change && (
        <div className={cn('mobile-caption font-medium', trendColors[trend])}>
          {change}
        </div>
      )}
    </MobileCard>
  );
});

MobileStatsCard.displayName = 'MobileStatsCard';

export default MobileCard;
