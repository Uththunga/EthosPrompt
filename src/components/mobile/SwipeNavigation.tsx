import React, { useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTouchGestures } from '../../hooks/useTouchGestures';

interface SwipeNavigationProps {
  children: React.ReactNode;
  previousPath?: string;
  nextPath?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
  showIndicators?: boolean;
  swipeThreshold?: number;
  disabled?: boolean;
}

const SwipeNavigation: React.FC<SwipeNavigationProps> = ({
  children,
  previousPath,
  nextPath,
  onSwipeLeft,
  onSwipeRight,
  className,
  showIndicators = true,
  swipeThreshold = 100,
  disabled = false,
}) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSwipe = useCallback((gesture: any) => {
    if (disabled) return;

    const { direction, distance, velocity } = gesture;
    
    // Require minimum distance and velocity for navigation
    if (distance < swipeThreshold || velocity < 0.3) return;

    if (direction === 'left') {
      // Swipe left - go to next
      if (onSwipeLeft) {
        onSwipeLeft();
      } else if (nextPath) {
        navigate(nextPath);
      }
    } else if (direction === 'right') {
      // Swipe right - go to previous
      if (onSwipeRight) {
        onSwipeRight();
      } else if (previousPath) {
        navigate(previousPath);
      }
    }
  }, [disabled, swipeThreshold, onSwipeLeft, onSwipeRight, nextPath, previousPath, navigate]);

  useTouchGestures(containerRef, {
    onSwipe: handleSwipe,
    swipeThreshold,
    preventDefault: false,
  });

  return (
    <div
      ref={containerRef}
      className={cn('relative touch-pan-y', className)}
    >
      {/* Swipe indicators */}
      {showIndicators && !disabled && (
        <>
          {/* Previous indicator */}
          {(previousPath || onSwipeRight) && (
            <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-900/80 backdrop-blur-sm rounded-full text-gray-400 text-xs">
                <ChevronLeft className="w-3 h-3" />
                <span>Previous</span>
              </div>
            </div>
          )}

          {/* Next indicator */}
          {(nextPath || onSwipeLeft) && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-900/80 backdrop-blur-sm rounded-full text-gray-400 text-xs">
                <span>Next</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          )}
        </>
      )}

      {/* Content */}
      {children}
    </div>
  );
};

export default SwipeNavigation;
