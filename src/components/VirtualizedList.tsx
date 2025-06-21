import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';

interface VirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
  className?: string;
  onScroll?: (scrollTop: number) => void;
}

interface VisibleRange {
  start: number;
  end: number;
}

function VirtualizedList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5,
  className = '',
  onScroll
}: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);

  // Calculate visible range
  const visibleRange = useMemo((): VisibleRange => {
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const end = Math.min(items.length, start + visibleCount + overscan * 2);
    
    return { start, end };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);

  // Calculate total height
  const totalHeight = useMemo(() => items.length * itemHeight, [items.length, itemHeight]);

  // Handle scroll events
  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const newScrollTop = event.currentTarget.scrollTop;
    setScrollTop(newScrollTop);
    onScroll?.(newScrollTop);
  }, [onScroll]);

  // Render visible items
  const visibleItems = useMemo(() => {
    const result = [];
    for (let i = visibleRange.start; i < visibleRange.end; i++) {
      const item = items[i];
      if (item) {
        result.push(
          <div
            key={i}
            style={{
              position: 'absolute',
              top: i * itemHeight,
              left: 0,
              right: 0,
              height: itemHeight,
            }}
          >
            {renderItem(item, i)}
          </div>
        );
      }
    }
    return result;
  }, [items, visibleRange, itemHeight, renderItem]);

  return (
    <div
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div
        style={{
          height: totalHeight,
          position: 'relative',
        }}
      >
        {visibleItems}
      </div>
    </div>
  );
}

// Memoized version for performance
export default memo(VirtualizedList) as <T>(props: VirtualizedListProps<T>) => JSX.Element;

// Hook for managing virtualized list state
export function useVirtualizedList<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number
) {
  const [scrollTop, setScrollTop] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Debounce scroll end detection
  useEffect(() => {
    if (isScrolling) {
      const timer = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isScrolling, scrollTop]);

  const handleScroll = useCallback((newScrollTop: number) => {
    setScrollTop(newScrollTop);
    setIsScrolling(true);
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const targetScrollTop = index * itemHeight;
    setScrollTop(targetScrollTop);
  }, [itemHeight]);

  const scrollToTop = useCallback(() => {
    setScrollTop(0);
  }, []);

  const scrollToBottom = useCallback(() => {
    const maxScrollTop = Math.max(0, items.length * itemHeight - containerHeight);
    setScrollTop(maxScrollTop);
  }, [items.length, itemHeight, containerHeight]);

  return {
    scrollTop,
    isScrolling,
    handleScroll,
    scrollToIndex,
    scrollToTop,
    scrollToBottom
  };
}

// Optimized list item component
export const VirtualizedListItem = memo<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}>(({ children, className = '', style = {} }) => (
  <div className={`flex items-center ${className}`} style={style}>
    {children}
  </div>
));

VirtualizedListItem.displayName = 'VirtualizedListItem';

// Grid virtualization for 2D layouts
interface VirtualizedGridProps<T> {
  items: T[];
  itemWidth: number;
  itemHeight: number;
  containerWidth: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  gap?: number;
  overscan?: number;
  className?: string;
}

export function VirtualizedGrid<T>({
  items,
  itemWidth,
  itemHeight,
  containerWidth,
  containerHeight,
  renderItem,
  gap = 0,
  overscan = 5,
  className = ''
}: VirtualizedGridProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);

  // Calculate grid dimensions
  const columnsPerRow = Math.floor((containerWidth + gap) / (itemWidth + gap));
  const totalRows = Math.ceil(items.length / columnsPerRow);
  const rowHeight = itemHeight + gap;

  // Calculate visible range
  const visibleRange = useMemo(() => {
    const startRow = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
    const visibleRows = Math.ceil(containerHeight / rowHeight);
    const endRow = Math.min(totalRows, startRow + visibleRows + overscan * 2);
    
    return { startRow, endRow };
  }, [scrollTop, rowHeight, containerHeight, totalRows, overscan]);

  // Handle scroll
  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, []);

  // Render visible items
  const visibleItems = useMemo(() => {
    const result = [];
    
    for (let row = visibleRange.startRow; row < visibleRange.endRow; row++) {
      for (let col = 0; col < columnsPerRow; col++) {
        const index = row * columnsPerRow + col;
        if (index >= items.length) break;
        
        const item = items[index];
        const x = col * (itemWidth + gap);
        const y = row * rowHeight;
        
        result.push(
          <div
            key={index}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: itemWidth,
              height: itemHeight,
            }}
          >
            {renderItem(item, index)}
          </div>
        );
      }
    }
    
    return result;
  }, [items, visibleRange, columnsPerRow, itemWidth, itemHeight, gap, rowHeight, renderItem]);

  return (
    <div
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div
        style={{
          height: totalRows * rowHeight,
          position: 'relative',
          width: '100%',
        }}
      >
        {visibleItems}
      </div>
    </div>
  );
}

// Performance monitoring for virtualized components
export function useVirtualizationPerformance() {
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    visibleItems: 0,
    totalItems: 0,
    scrollFPS: 0
  });

  const measureRender = useCallback((startTime: number, visibleCount: number, totalCount: number) => {
    const renderTime = performance.now() - startTime;
    
    setMetrics(prev => ({
      ...prev,
      renderTime,
      visibleItems: visibleCount,
      totalItems: totalCount
    }));
  }, []);

  const measureScrollFPS = useCallback(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFrame = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        setMetrics(prev => ({
          ...prev,
          scrollFPS: frameCount
        }));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFrame);
    };
    
    requestAnimationFrame(measureFrame);
  }, []);

  return {
    metrics,
    measureRender,
    measureScrollFPS
  };
}
