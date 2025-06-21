import { useCallback, useRef, useEffect, useState } from 'react';

interface SmoothScrollOptions {
  duration?: number;
  easing?: 'linear' | 'easeInOut' | 'easeIn' | 'easeOut';
  offset?: number;
  behavior?: 'auto' | 'smooth';
}

interface ScrollToOptions extends SmoothScrollOptions {
  element?: HTMLElement | string;
  top?: number;
  left?: number;
}

const easingFunctions = {
  linear: (t: number) => t,
  easeInOut: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeIn: (t: number) => t * t,
  easeOut: (t: number) => t * (2 - t),
};

export const useSmoothScroll = () => {
  const animationRef = useRef<number | null>(null);

  const cancelScroll = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const scrollTo = useCallback((options: ScrollToOptions = {}) => {
    const {
      element,
      top,
      left,
      duration = 800,
      easing = 'easeInOut',
      offset = 0,
      behavior = 'smooth',
    } = options;

    // Cancel any existing animation
    cancelScroll();

    // Use native smooth scrolling if supported and requested
    if (behavior === 'smooth' && 'scrollBehavior' in document.documentElement.style) {
      if (element) {
        const targetElement = typeof element === 'string' 
          ? document.querySelector(element) as HTMLElement
          : element;
        
        if (targetElement) {
          const elementTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementTop + offset,
            behavior: 'smooth',
          });
          return;
        }
      } else if (top !== undefined || left !== undefined) {
        window.scrollTo({
          top: top ?? window.pageYOffset,
          left: left ?? window.pageXOffset,
          behavior: 'smooth',
        });
        return;
      }
    }

    // Fallback to custom animation
    const startTime = performance.now();
    const startTop = window.pageYOffset;
    const startLeft = window.pageXOffset;

    let targetTop = startTop;
    let targetLeft = startLeft;

    if (element) {
      const targetElement = typeof element === 'string' 
        ? document.querySelector(element) as HTMLElement
        : element;
      
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        targetTop = rect.top + startTop + offset;
      }
    } else {
      if (top !== undefined) targetTop = top + offset;
      if (left !== undefined) targetLeft = left;
    }

    const distanceTop = targetTop - startTop;
    const distanceLeft = targetLeft - startLeft;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easingFunctions[easing](progress);

      const currentTop = startTop + distanceTop * easedProgress;
      const currentLeft = startLeft + distanceLeft * easedProgress;

      window.scrollTo(currentLeft, currentTop);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [cancelScroll]);

  const scrollToTop = useCallback((options: SmoothScrollOptions = {}) => {
    scrollTo({ top: 0, ...options });
  }, [scrollTo]);

  const scrollToElement = useCallback((
    element: HTMLElement | string,
    options: SmoothScrollOptions = {}
  ) => {
    scrollTo({ element, ...options });
  }, [scrollTo]);

  const scrollIntoView = useCallback((
    element: HTMLElement | string,
    options: SmoothScrollOptions & { block?: 'start' | 'center' | 'end' } = {}
  ) => {
    const { block = 'start', ...scrollOptions } = options;
    
    const targetElement = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement
      : element;
    
    if (!targetElement) return;

    const rect = targetElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    let offset = 0;
    
    switch (block) {
      case 'center':
        offset = -(viewportHeight / 2) + (rect.height / 2);
        break;
      case 'end':
        offset = -viewportHeight + rect.height;
        break;
      case 'start':
      default:
        offset = -80; // Account for fixed header
        break;
    }

    scrollTo({ element: targetElement, offset, ...scrollOptions });
  }, [scrollTo]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelScroll();
    };
  }, [cancelScroll]);

  return {
    scrollTo,
    scrollToTop,
    scrollToElement,
    scrollIntoView,
    cancelScroll,
  };
};

// Hook for scroll position tracking
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({
        x: window.pageXOffset,
        y: window.pageYOffset,
      });

      setIsScrolling(true);

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set scrolling to false after scroll ends
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return { scrollPosition, isScrolling };
};

// Hook for scroll direction detection
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollDirection;
};

export default useSmoothScroll;
