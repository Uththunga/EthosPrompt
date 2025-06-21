import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils';

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  action: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

interface LongPressMenuProps {
  children: React.ReactNode;
  items: MenuItem[];
  disabled?: boolean;
  longPressDelay?: number;
  className?: string;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

interface MenuPosition {
  x: number;
  y: number;
  visible: boolean;
}

const LongPressMenu: React.FC<LongPressMenuProps> = ({
  children,
  items,
  disabled = false,
  longPressDelay = 500,
  className,
  onMenuOpen,
  onMenuClose,
}) => {
  const [menuPosition, setMenuPosition] = useState<MenuPosition>({
    x: 0,
    y: 0,
    visible: false,
  });
  const [isLongPressing, setIsLongPressing] = useState(false);
  
  const elementRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<NodeJS.Timeout>();
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const showMenu = useCallback((x: number, y: number) => {
    // Calculate menu position to keep it within viewport
    const menuWidth = 200;
    const menuHeight = items.length * 48 + 16; // Approximate height
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let adjustedX = x;
    let adjustedY = y;

    // Adjust horizontal position
    if (x + menuWidth > viewportWidth - 16) {
      adjustedX = viewportWidth - menuWidth - 16;
    }
    if (adjustedX < 16) {
      adjustedX = 16;
    }

    // Adjust vertical position
    if (y + menuHeight > viewportHeight - 16) {
      adjustedY = y - menuHeight - 16;
    }
    if (adjustedY < 16) {
      adjustedY = 16;
    }

    setMenuPosition({
      x: adjustedX,
      y: adjustedY,
      visible: true,
    });

    onMenuOpen?.();

    // Add haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }, [items.length, onMenuOpen]);

  const hideMenu = useCallback(() => {
    setMenuPosition(prev => ({ ...prev, visible: false }));
    setIsLongPressing(false);
    onMenuClose?.();
  }, [onMenuClose]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (disabled || items.length === 0) return;

    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
    setIsLongPressing(true);

    longPressTimer.current = setTimeout(() => {
      if (touchStart.current) {
        showMenu(touchStart.current.x, touchStart.current.y);
      }
    }, longPressDelay);
  }, [disabled, items.length, longPressDelay, showMenu]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!touchStart.current) return;

    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStart.current.x);
    const deltaY = Math.abs(touch.clientY - touchStart.current.y);

    // Cancel long press if moved too much
    if (deltaX > 10 || deltaY > 10) {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
      setIsLongPressing(false);
      touchStart.current = null;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    setIsLongPressing(false);
    touchStart.current = null;
  }, []);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (disabled || items.length === 0) return;

    // Only handle right-click for desktop
    if (e.button === 2) {
      e.preventDefault();
      showMenu(e.clientX, e.clientY);
    }
  }, [disabled, items.length, showMenu]);

  const handleContextMenu = useCallback((e: Event) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const options = { passive: false };

    element.addEventListener('touchstart', handleTouchStart, options);
    element.addEventListener('touchmove', handleTouchMove, options);
    element.addEventListener('touchend', handleTouchEnd, options);
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('contextmenu', handleContextMenu);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('contextmenu', handleContextMenu);
      
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, handleMouseDown, handleContextMenu]);

  // Close menu on outside click
  useEffect(() => {
    if (!menuPosition.visible) return;

    const handleClickOutside = () => hideMenu();
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') hideMenu();
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [menuPosition.visible, hideMenu]);

  const handleItemClick = (item: MenuItem) => {
    if (item.disabled) return;
    
    item.action();
    hideMenu();

    // Add haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  return (
    <>
      <div
        ref={elementRef}
        className={cn(
          'relative select-none',
          isLongPressing && 'opacity-80 scale-95 transition-all duration-200',
          className
        )}
      >
        {children}
      </div>

      {/* Context Menu Portal */}
      {menuPosition.visible && createPortal(
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-[9998]" onClick={hideMenu} />
          
          {/* Menu */}
          <div
            className={cn(
              'fixed z-[9999] min-w-[200px] max-w-[280px]',
              'bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-2xl',
              'py-2 animate-in fade-in-0 zoom-in-95 duration-200'
            )}
            style={{
              left: menuPosition.x,
              top: menuPosition.y,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {items.map((item, index) => (
              <React.Fragment key={item.id}>
                {index > 0 && item.id.startsWith('separator') && (
                  <div className="h-px bg-gray-700/50 mx-2 my-1" />
                )}
                <button
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 text-left',
                    'transition-colors duration-200 touch-target',
                    item.disabled
                      ? 'opacity-50 cursor-not-allowed'
                      : item.destructive
                      ? 'text-red-400 hover:bg-red-500/10 hover:text-red-300'
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white',
                    'focus:outline-none focus:bg-gray-800/50'
                  )}
                >
                  {item.icon && (
                    <div className="w-5 h-5 flex-shrink-0">
                      {item.icon}
                    </div>
                  )}
                  <span className="font-medium">{item.label}</span>
                </button>
              </React.Fragment>
            ))}
          </div>
        </>,
        document.body
      )}
    </>
  );
};

// Hook for long press detection
export const useLongPress = (
  callback: (event: TouchEvent | MouseEvent) => void,
  options: {
    delay?: number;
    moveThreshold?: number;
    disabled?: boolean;
  } = {}
) => {
  const { delay = 500, moveThreshold = 10, disabled = false } = options;
  
  const timeoutRef = useRef<NodeJS.Timeout>();
  const startPos = useRef<{ x: number; y: number } | null>(null);
  const isLongPressing = useRef(false);

  const start = useCallback((event: TouchEvent | MouseEvent) => {
    if (disabled) return;

    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    
    startPos.current = { x: clientX, y: clientY };
    isLongPressing.current = false;

    timeoutRef.current = setTimeout(() => {
      isLongPressing.current = true;
      callback(event);
    }, delay);
  }, [callback, delay, disabled]);

  const move = useCallback((event: TouchEvent | MouseEvent) => {
    if (!startPos.current || disabled) return;

    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    
    const deltaX = Math.abs(clientX - startPos.current.x);
    const deltaY = Math.abs(clientY - startPos.current.y);

    if (deltaX > moveThreshold || deltaY > moveThreshold) {
      clear();
    }
  }, [moveThreshold, disabled]);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    startPos.current = null;
    isLongPressing.current = false;
  }, []);

  useEffect(() => {
    return clear;
  }, [clear]);

  return {
    onTouchStart: start,
    onTouchMove: move,
    onTouchEnd: clear,
    onMouseDown: start,
    onMouseMove: move,
    onMouseUp: clear,
    onMouseLeave: clear,
  };
};

export default LongPressMenu;
