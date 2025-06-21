import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Performance monitoring utilities
export interface PerformanceMetrics {
  renderTime: number;
  componentCount: number;
  memoryUsage: number;
  cacheHitRate: number;
  lastUpdate: number;
}

// React performance optimization hooks
export const useOptimizedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T => {
  return useCallback(callback, deps);
};

export const useOptimizedMemo = <T>(
  factory: () => T,
  deps: React.DependencyList
): T => {
  return useMemo(factory, deps);
};

// Debounced value hook for performance
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Throttled callback hook
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const lastRun = useRef(Date.now());

  return useCallback(
    ((...args) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    }) as T,
    [callback, delay]
  );
};

// Performance measurement hook
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    componentCount: 0,
    memoryUsage: 0,
    cacheHitRate: 0,
    lastUpdate: Date.now()
  });

  const measureRender = useCallback((componentName: string) => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      setMetrics(prev => ({
        ...prev,
        renderTime,
        componentCount: prev.componentCount + 1,
        lastUpdate: Date.now()
      }));

      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
      }
    };
  }, []);

  const measureMemory = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      setMetrics(prev => ({
        ...prev,
        memoryUsage: memory.usedJSHeapSize / 1024 / 1024, // MB
        lastUpdate: Date.now()
      }));
    }
  }, []);

  return {
    metrics,
    measureRender,
    measureMemory
  };
};

// Virtual scrolling utilities
export interface VirtualScrollOptions {
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

export const useVirtualScroll = <T>(
  items: T[],
  options: VirtualScrollOptions
) => {
  const [scrollTop, setScrollTop] = useState(0);
  const { itemHeight, containerHeight, overscan = 5 } = options;

  const visibleRange = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );

    return { startIndex, endIndex };
  }, [scrollTop, itemHeight, containerHeight, overscan, items.length]);

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex + 1);
  }, [items, visibleRange]);

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.startIndex * itemHeight;

  return {
    visibleItems,
    totalHeight,
    offsetY,
    setScrollTop,
    visibleRange
  };
};

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setEntry(entry);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options]);

  return {
    elementRef,
    isIntersecting,
    entry
  };
};

// Component render optimization
export const shouldComponentUpdate = <T extends Record<string, any>>(
  prevProps: T,
  nextProps: T,
  keys?: (keyof T)[]
): boolean => {
  const keysToCheck = keys || Object.keys(nextProps);
  
  return keysToCheck.some(key => {
    const prevValue = prevProps[key];
    const nextValue = nextProps[key];
    
    // Deep comparison for objects and arrays
    if (typeof prevValue === 'object' && typeof nextValue === 'object') {
      return JSON.stringify(prevValue) !== JSON.stringify(nextValue);
    }
    
    return prevValue !== nextValue;
  });
};

// Memory leak prevention
export const useCleanup = (cleanup: () => void) => {
  useEffect(() => {
    return cleanup;
  }, [cleanup]);
};

// Performance budget monitoring
export interface PerformanceBudget {
  renderTime: number; // ms
  bundleSize: number; // KB
  memoryUsage: number; // MB
}

export const usePerformanceBudget = (budget: PerformanceBudget) => {
  const [violations, setViolations] = useState<string[]>([]);

  const checkBudget = useCallback((metrics: Partial<PerformanceMetrics>) => {
    const newViolations: string[] = [];

    if (metrics.renderTime && metrics.renderTime > budget.renderTime) {
      newViolations.push(`Render time exceeded: ${metrics.renderTime.toFixed(2)}ms > ${budget.renderTime}ms`);
    }

    if (metrics.memoryUsage && metrics.memoryUsage > budget.memoryUsage) {
      newViolations.push(`Memory usage exceeded: ${metrics.memoryUsage.toFixed(2)}MB > ${budget.memoryUsage}MB`);
    }

    setViolations(newViolations);

    if (newViolations.length > 0 && process.env.NODE_ENV === 'development') {
      console.warn('Performance budget violations:', newViolations);
    }
  }, [budget]);

  return {
    violations,
    checkBudget
  };
};

// Core Web Vitals measurement
export interface CoreWebVitals {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

export const useCoreWebVitals = () => {
  const [vitals, setVitals] = useState<Partial<CoreWebVitals>>({});

  useEffect(() => {
    // Measure Core Web Vitals using web-vitals library pattern
    const measureVitals = async () => {
      try {
        // FCP - First Contentful Paint
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcp = entries[entries.length - 1];
          setVitals(prev => ({ ...prev, fcp: fcp.startTime }));
        });
        fcpObserver.observe({ entryTypes: ['paint'] });

        // LCP - Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lcp = entries[entries.length - 1];
          setVitals(prev => ({ ...prev, lcp: lcp.startTime }));
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // CLS - Cumulative Layout Shift
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          setVitals(prev => ({ ...prev, cls: clsValue }));
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // TTFB - Time to First Byte
        const navigationEntries = performance.getEntriesByType('navigation');
        if (navigationEntries.length > 0) {
          const nav = navigationEntries[0] as PerformanceNavigationTiming;
          setVitals(prev => ({ ...prev, ttfb: nav.responseStart - nav.requestStart }));
        }

      } catch (error) {
        console.warn('Core Web Vitals measurement failed:', error);
      }
    };

    measureVitals();
  }, []);

  return vitals;
};
