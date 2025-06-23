import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { UISubcategory } from '../../services/DatabaseService';

interface SwipeSubcategoryNavProps {
  subcategories: UISubcategory[];
  selectedSubcategory: UISubcategory | null;
  onSubcategorySelect: (subcategory: UISubcategory) => void;
  className?: string;
}

const SwipeSubcategoryNav: React.FC<SwipeSubcategoryNavProps> = ({
  subcategories,
  selectedSubcategory,
  onSubcategorySelect,
  className = ''
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Check scroll position and update arrow visibility
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, [subcategories]);

  // Scroll to selected subcategory
  useEffect(() => {
    if (selectedSubcategory && scrollContainerRef.current) {
      const selectedElement = scrollContainerRef.current.querySelector(
        `[data-subcategory-id="${selectedSubcategory.id}"]`
      ) as HTMLElement;
      
      if (selectedElement) {
        const container = scrollContainerRef.current;
        const containerRect = container.getBoundingClientRect();
        const elementRect = selectedElement.getBoundingClientRect();
        
        if (elementRect.left < containerRect.left || elementRect.right > containerRect.right) {
          selectedElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        }
      }
    }
  }, [selectedSubcategory]);

  const scrollTo = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Touch/Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - (scrollContainerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className={cn('relative', className)}>
      {/* Left Arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scrollTo('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-full shadow-lg hover:bg-gray-800/80 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>
      )}

      {/* Right Arrow */}
      {canScrollRight && (
        <button
          onClick={() => scrollTo('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-full shadow-lg hover:bg-gray-800/80 transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className={cn(
          'flex gap-3 overflow-x-auto scrollbar-hide py-2 px-4',
          'mobile-scroll-smooth mobile-scroll-snap',
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        )}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleDragEnd}
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {subcategories.map((subcategory) => (
          <button
            key={subcategory.id}
            data-subcategory-id={subcategory.id}
            onClick={() => onSubcategorySelect(subcategory)}
            className={cn(
              'flex-shrink-0 px-4 py-3 rounded-xl transition-all duration-200 touch-target mobile-scroll-snap-item',
              'min-w-[140px] text-center',
              selectedSubcategory?.id === subcategory.id
                ? 'bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white shadow-md shadow-purple-500/20'
                : 'bg-gray-800/60 text-gray-300 hover:bg-gray-800/80 hover:text-white active:bg-gray-700/80'
            )}
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="flex flex-col items-center gap-1">
              {subcategory.icon && (
                <span className="text-lg">{subcategory.icon}</span>
              )}
              <span className="font-medium text-sm truncate w-full">
                {subcategory.name}
              </span>
              <span className={cn(
                'text-xs',
                selectedSubcategory?.id === subcategory.id 
                  ? 'text-purple-100' 
                  : 'text-gray-500'
              )}>
                {subcategory.skillLevel}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Scroll Indicators */}
      <div className="flex justify-center mt-2 gap-1">
        {subcategories.map((_, index) => {
          const isActive = selectedSubcategory && 
            subcategories.findIndex(sub => sub.id === selectedSubcategory.id) === index;
          return (
            <div
              key={index}
              className={cn(
                'w-1.5 h-1.5 rounded-full transition-colors',
                isActive ? 'bg-purple-400' : 'bg-gray-600'
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SwipeSubcategoryNav;
