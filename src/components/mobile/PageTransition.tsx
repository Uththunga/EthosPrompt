import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface PageTransitionProps {
  children: React.ReactNode;
  type?: 'slide' | 'fade' | 'scale' | 'slideUp' | 'slideDown';
  duration?: number;
  className?: string;
}

type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited';

const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  type = 'slide',
  duration = 300,
  className,
}) => {
  const location = useLocation();
  const [transitionState, setTransitionState] = useState<TransitionState>('entered');
  const [displayChildren, setDisplayChildren] = useState(children);
  const previousLocation = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== previousLocation.current) {
      // Start exit transition
      setTransitionState('exiting');
      
      setTimeout(() => {
        setTransitionState('exited');
        setDisplayChildren(children);
        previousLocation.current = location.pathname;
        
        // Start enter transition
        setTimeout(() => {
          setTransitionState('entering');
          
          setTimeout(() => {
            setTransitionState('entered');
          }, 50);
        }, 50);
      }, duration);
    } else {
      setDisplayChildren(children);
    }
  }, [location.pathname, children, duration]);

  const getTransitionClasses = () => {
    const baseClasses = 'transition-all ease-out';
    
    switch (type) {
      case 'slide':
        return cn(
          baseClasses,
          transitionState === 'entering' && 'transform translate-x-full opacity-0',
          transitionState === 'entered' && 'transform translate-x-0 opacity-100',
          transitionState === 'exiting' && 'transform -translate-x-full opacity-0',
          transitionState === 'exited' && 'transform translate-x-full opacity-0'
        );
      
      case 'fade':
        return cn(
          baseClasses,
          transitionState === 'entering' && 'opacity-0',
          transitionState === 'entered' && 'opacity-100',
          transitionState === 'exiting' && 'opacity-0',
          transitionState === 'exited' && 'opacity-0'
        );
      
      case 'scale':
        return cn(
          baseClasses,
          transitionState === 'entering' && 'transform scale-95 opacity-0',
          transitionState === 'entered' && 'transform scale-100 opacity-100',
          transitionState === 'exiting' && 'transform scale-105 opacity-0',
          transitionState === 'exited' && 'transform scale-95 opacity-0'
        );
      
      case 'slideUp':
        return cn(
          baseClasses,
          transitionState === 'entering' && 'transform translate-y-full opacity-0',
          transitionState === 'entered' && 'transform translate-y-0 opacity-100',
          transitionState === 'exiting' && 'transform -translate-y-full opacity-0',
          transitionState === 'exited' && 'transform translate-y-full opacity-0'
        );
      
      case 'slideDown':
        return cn(
          baseClasses,
          transitionState === 'entering' && 'transform -translate-y-full opacity-0',
          transitionState === 'entered' && 'transform translate-y-0 opacity-100',
          transitionState === 'exiting' && 'transform translate-y-full opacity-0',
          transitionState === 'exited' && 'transform -translate-y-full opacity-0'
        );
      
      default:
        return baseClasses;
    }
  };

  return (
    <div
      className={cn(
        getTransitionClasses(),
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
      }}
    >
      {displayChildren}
    </div>
  );
};

// Route-based transition wrapper
export const RouteTransition: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <PageTransition type="slide" duration={300} className={className}>
      {children}
    </PageTransition>
  );
};

// Modal transition component
export const ModalTransition: React.FC<{
  isOpen: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}> = ({ isOpen, children, onClose, className }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div
        className={cn(
          'fixed inset-x-4 top-1/2 z-50 max-h-[90vh] overflow-y-auto',
          'transform -translate-y-1/2 transition-all duration-300 ease-out',
          isOpen 
            ? 'scale-100 opacity-100' 
            : 'scale-95 opacity-0',
          className
        )}
      >
        {children}
      </div>
    </>
  );
};

// Drawer transition component
export const DrawerTransition: React.FC<{
  isOpen: boolean;
  children: React.ReactNode;
  position?: 'bottom' | 'top' | 'left' | 'right';
  onClose?: () => void;
  className?: string;
}> = ({ isOpen, children, position = 'bottom', onClose, className }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
        document.body.style.overflow = '';
      }, 300);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom':
        return {
          container: 'bottom-0 left-0 right-0',
          transform: isOpen ? 'translate-y-0' : 'translate-y-full',
        };
      case 'top':
        return {
          container: 'top-0 left-0 right-0',
          transform: isOpen ? 'translate-y-0' : '-translate-y-full',
        };
      case 'left':
        return {
          container: 'left-0 top-0 bottom-0',
          transform: isOpen ? 'translate-x-0' : '-translate-x-full',
        };
      case 'right':
        return {
          container: 'right-0 top-0 bottom-0',
          transform: isOpen ? 'translate-x-0' : 'translate-x-full',
        };
      default:
        return {
          container: 'bottom-0 left-0 right-0',
          transform: isOpen ? 'translate-y-0' : 'translate-y-full',
        };
    }
  };

  const positionClasses = getPositionClasses();

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />
      
      {/* Drawer Content */}
      <div
        className={cn(
          'fixed z-50 max-h-[90vh] overflow-y-auto',
          'transform transition-transform duration-300 ease-out',
          positionClasses.container,
          positionClasses.transform,
          className
        )}
        style={{
          paddingBottom: position === 'bottom' ? 'env(safe-area-inset-bottom)' : undefined,
          paddingTop: position === 'top' ? 'env(safe-area-inset-top)' : undefined,
        }}
      >
        {children}
      </div>
    </>
  );
};

// Loading transition component
export const LoadingTransition: React.FC<{
  isLoading: boolean;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  className?: string;
}> = ({ isLoading, children, loadingComponent, className }) => {
  const [showContent, setShowContent] = useState(!isLoading);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowContent(true), 150);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isLoading]);

  return (
    <div className={cn('relative', className)}>
      {/* Loading State */}
      <div
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        {loadingComponent || (
          <div className="flex items-center justify-center p-8">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className={cn(
          'transition-opacity duration-300',
          showContent ? 'opacity-100' : 'opacity-0'
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default PageTransition;
