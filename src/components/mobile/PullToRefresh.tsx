import React, { useState, useRef, useCallback, useEffect } from 'react';
import { RefreshCw, ArrowDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  maxPullDistance?: number;
  refreshingText?: string;
  pullText?: string;
  releaseText?: string;
  disabled?: boolean;
}

type RefreshState = 'idle' | 'pulling' | 'ready' | 'refreshing';

const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  children,
  className,
  threshold = 80,
  maxPullDistance = 120,
  refreshingText = 'Refreshing...',
  pullText = 'Pull to refresh',
  releaseText = 'Release to refresh',
  disabled = false,
}) => {
  const [refreshState, setRefreshState] = useState<RefreshState>('idle');
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const canPull = useCallback(() => {
    if (disabled || isRefreshing) return false;
    
    // Only allow pull when at the top of the page
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return scrollTop === 0;
  }, [disabled, isRefreshing]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!canPull()) return;
    
    startY.current = e.touches[0].clientY;
    currentY.current = startY.current;
    isDragging.current = true;
  }, [canPull]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging.current || !canPull()) return;
    
    currentY.current = e.touches[0].clientY;
    const deltaY = currentY.current - startY.current;
    
    if (deltaY > 0) {
      e.preventDefault();
      
      // Apply resistance curve for natural feel
      const resistance = Math.min(deltaY / 2.5, maxPullDistance);
      setPullDistance(resistance);
      
      if (resistance >= threshold) {
        setRefreshState('ready');
        // Add haptic feedback when ready
        if ('vibrate' in navigator) {
          navigator.vibrate(10);
        }
      } else {
        setRefreshState('pulling');
      }
    }
  }, [canPull, threshold, maxPullDistance]);

  const handleTouchEnd = useCallback(async () => {
    if (!isDragging.current) return;
    
    isDragging.current = false;
    
    if (refreshState === 'ready' && !isRefreshing) {
      setRefreshState('refreshing');
      setIsRefreshing(true);
      
      try {
        await onRefresh();
        // Add success haptic feedback
        if ('vibrate' in navigator) {
          navigator.vibrate([10, 50, 10]);
        }
      } catch (error) {
        console.error('Refresh failed:', error);
        // Add error haptic feedback
        if ('vibrate' in navigator) {
          navigator.vibrate([50, 50, 50]);
        }
      } finally {
        setIsRefreshing(false);
        setRefreshState('idle');
        setPullDistance(0);
      }
    } else {
      // Animate back to original position
      setRefreshState('idle');
      setPullDistance(0);
    }
  }, [refreshState, isRefreshing, onRefresh]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const options = { passive: false };
    
    container.addEventListener('touchstart', handleTouchStart, options);
    container.addEventListener('touchmove', handleTouchMove, options);
    container.addEventListener('touchend', handleTouchEnd, options);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  const getRefreshText = () => {
    switch (refreshState) {
      case 'pulling':
        return pullText;
      case 'ready':
        return releaseText;
      case 'refreshing':
        return refreshingText;
      default:
        return pullText;
    }
  };

  const getIconRotation = () => {
    if (refreshState === 'refreshing') return 'animate-spin';
    if (refreshState === 'ready') return 'rotate-180';
    return '';
  };

  const pullProgress = Math.min(pullDistance / threshold, 1);

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
    >
      {/* Pull to refresh indicator */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 z-10',
          'flex flex-col items-center justify-center',
          'bg-gray-900/95 backdrop-blur-sm border-b border-gray-800/50',
          'transition-all duration-300 ease-out',
          refreshState === 'idle' ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        )}
        style={{
          height: Math.max(pullDistance, refreshState === 'refreshing' ? 60 : 0),
        }}
      >
        <div className="flex items-center gap-2 text-gray-300">
          {refreshState === 'refreshing' ? (
            <RefreshCw className={cn('w-5 h-5', getIconRotation())} />
          ) : (
            <ArrowDown 
              className={cn('w-5 h-5 transition-transform duration-200', getIconRotation())} 
            />
          )}
          <span className="text-sm font-medium">{getRefreshText()}</span>
        </div>
        
        {/* Progress indicator */}
        {refreshState !== 'refreshing' && (
          <div className="w-8 h-1 bg-gray-700 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-purple-500 rounded-full transition-all duration-100"
              style={{ width: `${pullProgress * 100}%` }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className="transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${refreshState === 'refreshing' ? 60 : pullDistance}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PullToRefresh;
