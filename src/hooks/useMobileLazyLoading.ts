import { useState, useEffect, useRef, useCallback } from 'react';

interface LazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  disabled?: boolean;
}

interface LazyLoadResult {
  isIntersecting: boolean;
  hasIntersected: boolean;
  ref: React.RefObject<HTMLElement>;
}

// Enhanced lazy loading hook optimized for mobile
export const useMobileLazyLoading = (options: LazyLoadOptions = {}): LazyLoadResult => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true,
    delay = 0,
    disabled = false
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (disabled || !elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              timeoutRef.current = setTimeout(() => {
                setIsIntersecting(true);
                setHasIntersected(true);
              }, delay);
            } else {
              setIsIntersecting(true);
              setHasIntersected(true);
            }

            if (triggerOnce) {
              observer.disconnect();
            }
          } else if (!triggerOnce) {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
            setIsIntersecting(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [threshold, rootMargin, triggerOnce, delay, disabled]);

  return {
    isIntersecting,
    hasIntersected,
    ref: elementRef,
  };
};

// Hook for lazy loading lists with virtual scrolling
export const useMobileVirtualList = <T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
  overscan: number = 5
) => {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollElementRef = useRef<HTMLElement>(null);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex + 1).map((item, index) => ({
    item,
    index: startIndex + index,
  }));

  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  const handleScroll = useCallback((e: Event) => {
    const target = e.target as HTMLElement;
    setScrollTop(target.scrollTop);
  }, []);

  useEffect(() => {
    const element = scrollElementRef.current;
    if (!element) return;

    element.addEventListener('scroll', handleScroll, { passive: true });
    return () => element.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return {
    visibleItems,
    totalHeight,
    offsetY,
    scrollElementRef,
  };
};

// Hook for progressive image loading
export const useProgressiveImage = (src: string, placeholder?: string) => {
  const [currentSrc, setCurrentSrc] = useState(placeholder || '');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) return;

    setIsLoading(true);
    setHasError(false);

    const img = new Image();
    
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoading(false);
    };
    
    img.onerror = () => {
      setHasError(true);
      setIsLoading(false);
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return {
    src: currentSrc,
    isLoading,
    hasError,
  };
};

// Hook for adaptive loading based on network conditions
export const useAdaptiveLoading = () => {
  const [networkInfo, setNetworkInfo] = useState({
    effectiveType: '4g',
    saveData: false,
    downlink: 10,
  });

  useEffect(() => {
    const updateNetworkInfo = () => {
      const connection = (navigator as any).connection;
      if (connection) {
        setNetworkInfo({
          effectiveType: connection.effectiveType || '4g',
          saveData: connection.saveData || false,
          downlink: connection.downlink || 10,
        });
      }
    };

    updateNetworkInfo();

    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connection.addEventListener('change', updateNetworkInfo);
      
      return () => {
        connection.removeEventListener('change', updateNetworkInfo);
      };
    }
  }, []);

  const shouldLoadHighQuality = useCallback(() => {
    if (networkInfo.saveData) return false;
    return networkInfo.effectiveType === '4g' && networkInfo.downlink > 1.5;
  }, [networkInfo]);

  const shouldPreload = useCallback(() => {
    if (networkInfo.saveData) return false;
    return networkInfo.effectiveType === '4g' && networkInfo.downlink > 5;
  }, [networkInfo]);

  const getImageQuality = useCallback(() => {
    if (networkInfo.saveData) return 50;
    if (networkInfo.effectiveType === 'slow-2g' || networkInfo.effectiveType === '2g') return 30;
    if (networkInfo.effectiveType === '3g') return 60;
    return 80;
  }, [networkInfo]);

  return {
    networkInfo,
    shouldLoadHighQuality,
    shouldPreload,
    getImageQuality,
  };
};

// Hook for batched loading to reduce network requests
export const useBatchedLoading = <T>(
  items: T[],
  batchSize: number = 10,
  delay: number = 100
) => {
  const [loadedBatches, setLoadedBatches] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const loadNextBatch = useCallback(() => {
    if (loadedBatches * batchSize >= items.length || isLoading) return;

    setIsLoading(true);
    
    timeoutRef.current = setTimeout(() => {
      setLoadedBatches(prev => prev + 1);
      setIsLoading(false);
    }, delay);
  }, [loadedBatches, batchSize, items.length, isLoading, delay]);

  const loadedItems = items.slice(0, loadedBatches * batchSize);
  const hasMore = loadedBatches * batchSize < items.length;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    loadedItems,
    hasMore,
    isLoading,
    loadNextBatch,
    progress: items.length > 0 ? (loadedItems.length / items.length) * 100 : 0,
  };
};

// Hook for memory-aware loading
export const useMemoryAwareLoading = () => {
  const [memoryInfo, setMemoryInfo] = useState({
    available: 0,
    used: 0,
    total: 0,
  });

  useEffect(() => {
    const updateMemoryInfo = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        setMemoryInfo({
          available: memory.jsHeapSizeLimit - memory.usedJSHeapSize,
          used: memory.usedJSHeapSize,
          total: memory.jsHeapSizeLimit,
        });
      }
    };

    updateMemoryInfo();
    const interval = setInterval(updateMemoryInfo, 5000);

    return () => clearInterval(interval);
  }, []);

  const shouldReduceQuality = useCallback(() => {
    const usageRatio = memoryInfo.used / memoryInfo.total;
    return usageRatio > 0.8; // Reduce quality if using more than 80% of available memory
  }, [memoryInfo]);

  const getMaxConcurrentLoads = useCallback(() => {
    const usageRatio = memoryInfo.used / memoryInfo.total;
    if (usageRatio > 0.9) return 1;
    if (usageRatio > 0.7) return 2;
    if (usageRatio > 0.5) return 3;
    return 5;
  }, [memoryInfo]);

  return {
    memoryInfo,
    shouldReduceQuality,
    getMaxConcurrentLoads,
  };
};

export default useMobileLazyLoading;
