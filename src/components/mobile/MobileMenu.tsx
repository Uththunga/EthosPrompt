import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  X, 
  Home, 
  BookOpen, 
  Search, 
  User, 
  Settings,
  Heart,
  Bookmark,
  Bell,
  ChevronRight,
  LogOut,
  Moon,
  Sun,
  Globe,
  HelpCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  action?: () => void;
  badge?: number;
  divider?: boolean;
  children?: MenuItem[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  className,
}) => {
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const menuItems: MenuItem[] = [
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
      label: 'Bookmarks',
      icon: Bookmark,
      path: '/bookmarks',
      badge: 3,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      path: '/notifications',
      badge: 5,
      divider: true,
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      path: '/profile',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/settings',
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: HelpCircle,
      path: '/help',
      divider: true,
    },
    {
      id: 'logout',
      label: 'Sign Out',
      icon: LogOut,
      action: () => {
        // Handle logout
        console.log('Logout action');
      },
    },
  ];

  // Close menu on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleItemClick = (item: MenuItem) => {
    if (item.action) {
      item.action();
    }
    
    // Add haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
    
    // Close menu after action
    setTimeout(() => onClose(), 150);
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
          'transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        ref={menuRef}
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw]',
          'bg-gray-900/95 backdrop-blur-md border-l border-gray-800/50',
          'transform transition-transform duration-300 ease-out',
          'overflow-y-auto overscroll-contain',
          isOpen ? 'translate-x-0' : 'translate-x-full',
          className
        )}
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <div>
              <h2 className="text-white font-semibold">EthosPrompt</h2>
              <p className="text-gray-400 text-xs">user@example.com</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path && location.pathname === item.path;
            
            return (
              <React.Fragment key={item.id}>
                {item.divider && <div className="h-px bg-gray-800/50 mx-4 my-2" />}
                
                {item.path ? (
                  <Link
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 mx-2 rounded-lg',
                      'transition-all duration-200 active:scale-95',
                      isActive
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                    )}
                    onClick={() => handleItemClick(item)}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="flex-1 font-medium">{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                        {item.badge > 99 ? '99+' : item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </Link>
                ) : (
                  <button
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 mx-2 rounded-lg w-full text-left',
                      'transition-all duration-200 active:scale-95',
                      'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                    )}
                    onClick={() => handleItemClick(item)}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="flex-1 font-medium">{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                        {item.badge > 99 ? '99+' : item.badge}
                      </span>
                    )}
                  </button>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-auto p-4 border-t border-gray-800/50">
          <div className="text-center text-gray-500 text-xs">
            <p>EthosPrompt v1.0.0</p>
            <p className="mt-1">© 2024 All rights reserved</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
