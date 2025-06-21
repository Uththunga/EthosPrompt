import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Search, 
  User, 
  Menu,
  Heart,
  Bookmark,
  Settings,
  TrendingUp
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface BottomNavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: number;
  isActive?: boolean;
}

interface BottomNavigationProps {
  className?: string;
  onItemPress?: (item: BottomNavItem) => void;
}

const defaultNavItems: BottomNavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    path: '/',
  },
  {
    id: 'blog',
    label: 'Blog',
    icon: BookOpen,
    path: '/blog',
  },
  {
    id: 'search',
    label: 'Search',
    icon: Search,
    path: '/search',
  },
  {
    id: 'bookmarks',
    label: 'Saved',
    icon: Bookmark,
    path: '/bookmarks',
  },
  {
    id: 'menu',
    label: 'Menu',
    icon: Menu,
    path: '/menu',
  },
];

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  className,
  onItemPress,
}) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string>('home');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Auto-hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      const shouldHide = isScrollingDown && currentScrollY > 100;
      
      setIsVisible(!shouldHide);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Update active item based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    const activeNavItem = defaultNavItems.find(item => {
      if (item.path === '/' && currentPath === '/') return true;
      if (item.path !== '/' && currentPath.startsWith(item.path)) return true;
      return false;
    });
    
    if (activeNavItem) {
      setActiveItem(activeNavItem.id);
    }
  }, [location.pathname]);

  const handleItemPress = (item: BottomNavItem) => {
    setActiveItem(item.id);
    onItemPress?.(item);
    
    // Add haptic feedback on supported devices
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 md:hidden',
        'bg-gray-900/95 backdrop-blur-md border-t border-gray-800/50',
        'transition-transform duration-300 ease-in-out',
        isVisible ? 'translate-y-0' : 'translate-y-full',
        className
      )}
      style={{
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {defaultNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center',
                'min-w-[44px] min-h-[44px] px-2 py-1',
                'rounded-xl transition-all duration-200',
                'active:scale-95 active:bg-gray-800/50',
                isActive 
                  ? 'text-purple-400' 
                  : 'text-gray-400 hover:text-gray-300'
              )}
              onClick={() => handleItemPress(item)}
            >
              <div className="relative">
                <Icon 
                  className={cn(
                    'w-6 h-6 transition-all duration-200',
                    isActive && 'scale-110'
                  )} 
                />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-400 rounded-full" />
                )}
              </div>
              <span 
                className={cn(
                  'text-xs mt-1 transition-all duration-200',
                  isActive ? 'font-medium' : 'font-normal'
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
