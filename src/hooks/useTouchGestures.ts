import { useEffect, useRef, useCallback } from 'react';

interface TouchPoint {
  x: number;
  y: number;
  timestamp: number;
}

interface SwipeGesture {
  direction: 'left' | 'right' | 'up' | 'down';
  distance: number;
  velocity: number;
  duration: number;
}

interface TouchGestureOptions {
  onSwipe?: (gesture: SwipeGesture) => void;
  onPinch?: (scale: number, center: { x: number; y: number }) => void;
  onLongPress?: (point: TouchPoint) => void;
  onTap?: (point: TouchPoint) => void;
  onDoubleTap?: (point: TouchPoint) => void;
  
  // Thresholds
  swipeThreshold?: number;
  longPressThreshold?: number;
  doubleTapThreshold?: number;
  pinchThreshold?: number;
  
  // Options
  preventDefault?: boolean;
  passive?: boolean;
}

interface TouchState {
  startPoint: TouchPoint | null;
  lastPoint: TouchPoint | null;
  isLongPress: boolean;
  longPressTimer: NodeJS.Timeout | null;
  lastTapTime: number;
  tapCount: number;
  initialDistance: number;
  lastScale: number;
}

export const useTouchGestures = (
  elementRef: React.RefObject<HTMLElement>,
  options: TouchGestureOptions = {}
) => {
  const {
    onSwipe,
    onPinch,
    onLongPress,
    onTap,
    onDoubleTap,
    swipeThreshold = 50,
    longPressThreshold = 500,
    doubleTapThreshold = 300,
    pinchThreshold = 0.1,
    preventDefault = false,
    passive = true,
  } = options;

  const touchState = useRef<TouchState>({
    startPoint: null,
    lastPoint: null,
    isLongPress: false,
    longPressTimer: null,
    lastTapTime: 0,
    tapCount: 0,
    initialDistance: 0,
    lastScale: 1,
  });

  const getDistance = useCallback((touch1: Touch, touch2: Touch): number => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }, []);

  const getCenter = useCallback((touch1: Touch, touch2: Touch) => {
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2,
    };
  }, []);

  const clearLongPressTimer = useCallback(() => {
    if (touchState.current.longPressTimer) {
      clearTimeout(touchState.current.longPressTimer);
      touchState.current.longPressTimer = null;
    }
  }, []);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (preventDefault) {
      e.preventDefault();
    }

    const touch = e.touches[0];
    const now = Date.now();
    
    touchState.current.startPoint = {
      x: touch.clientX,
      y: touch.clientY,
      timestamp: now,
    };
    
    touchState.current.lastPoint = touchState.current.startPoint;
    touchState.current.isLongPress = false;

    // Handle multi-touch for pinch gestures
    if (e.touches.length === 2) {
      touchState.current.initialDistance = getDistance(e.touches[0], e.touches[1]);
      touchState.current.lastScale = 1;
      clearLongPressTimer();
      return;
    }

    // Start long press timer
    if (onLongPress) {
      touchState.current.longPressTimer = setTimeout(() => {
        touchState.current.isLongPress = true;
        onLongPress(touchState.current.startPoint!);
        
        // Add haptic feedback for long press
        if ('vibrate' in navigator) {
          navigator.vibrate(50);
        }
      }, longPressThreshold);
    }
  }, [onLongPress, longPressThreshold, preventDefault, getDistance, clearLongPressTimer]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (preventDefault) {
      e.preventDefault();
    }

    if (!touchState.current.startPoint) return;

    const touch = e.touches[0];
    const now = Date.now();

    touchState.current.lastPoint = {
      x: touch.clientX,
      y: touch.clientY,
      timestamp: now,
    };

    // Handle pinch gesture
    if (e.touches.length === 2 && onPinch) {
      const currentDistance = getDistance(e.touches[0], e.touches[1]);
      const scale = currentDistance / touchState.current.initialDistance;
      
      if (Math.abs(scale - touchState.current.lastScale) > pinchThreshold) {
        const center = getCenter(e.touches[0], e.touches[1]);
        onPinch(scale, center);
        touchState.current.lastScale = scale;
      }
      return;
    }

    // Cancel long press if moved too much
    const dx = touch.clientX - touchState.current.startPoint.x;
    const dy = touch.clientY - touchState.current.startPoint.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 10) {
      clearLongPressTimer();
    }
  }, [onPinch, pinchThreshold, preventDefault, getDistance, getCenter, clearLongPressTimer]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (preventDefault) {
      e.preventDefault();
    }

    clearLongPressTimer();

    if (!touchState.current.startPoint || !touchState.current.lastPoint) {
      return;
    }

    const now = Date.now();
    const startPoint = touchState.current.startPoint;
    const endPoint = touchState.current.lastPoint;
    
    const dx = endPoint.x - startPoint.x;
    const dy = endPoint.y - startPoint.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const duration = endPoint.timestamp - startPoint.timestamp;
    const velocity = distance / duration;

    // Handle swipe gesture
    if (distance > swipeThreshold && onSwipe) {
      let direction: SwipeGesture['direction'];
      
      if (Math.abs(dx) > Math.abs(dy)) {
        direction = dx > 0 ? 'right' : 'left';
      } else {
        direction = dy > 0 ? 'down' : 'up';
      }

      onSwipe({
        direction,
        distance,
        velocity,
        duration,
      });

      // Add haptic feedback for swipe
      if ('vibrate' in navigator) {
        navigator.vibrate(20);
      }
    }
    // Handle tap gestures
    else if (distance < 10 && !touchState.current.isLongPress) {
      const timeSinceLastTap = now - touchState.current.lastTapTime;
      
      if (timeSinceLastTap < doubleTapThreshold) {
        touchState.current.tapCount++;
      } else {
        touchState.current.tapCount = 1;
      }
      
      touchState.current.lastTapTime = now;

      // Handle double tap
      if (touchState.current.tapCount === 2 && onDoubleTap) {
        onDoubleTap(endPoint);
        touchState.current.tapCount = 0;
        
        // Add haptic feedback for double tap
        if ('vibrate' in navigator) {
          navigator.vibrate([10, 50, 10]);
        }
      }
      // Handle single tap (with delay to check for double tap)
      else if (touchState.current.tapCount === 1 && onTap) {
        setTimeout(() => {
          if (touchState.current.tapCount === 1) {
            onTap!(endPoint);
            touchState.current.tapCount = 0;
          }
        }, doubleTapThreshold);
      }
    }

    // Reset state
    touchState.current.startPoint = null;
    touchState.current.lastPoint = null;
    touchState.current.isLongPress = false;
  }, [
    onSwipe,
    onTap,
    onDoubleTap,
    swipeThreshold,
    doubleTapThreshold,
    preventDefault,
    clearLongPressTimer,
  ]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const options = { passive };

    element.addEventListener('touchstart', handleTouchStart, options);
    element.addEventListener('touchmove', handleTouchMove, options);
    element.addEventListener('touchend', handleTouchEnd, options);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      clearLongPressTimer();
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, passive, clearLongPressTimer]);

  return {
    clearGestures: () => {
      touchState.current = {
        startPoint: null,
        lastPoint: null,
        isLongPress: false,
        longPressTimer: null,
        lastTapTime: 0,
        tapCount: 0,
        initialDistance: 0,
        lastScale: 1,
      };
      clearLongPressTimer();
    },
  };
};

export default useTouchGestures;
