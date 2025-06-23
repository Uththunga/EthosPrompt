import React, { useState, useEffect } from 'react';
import { Clock, X, RotateCcw } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Heading, Text, Badge } from '../ui/VisualHierarchy';
import type { UICategory, UISubcategory } from '../../services/DatabaseService';

interface RecentItem {
  id: string;
  type: 'category' | 'subcategory' | 'prompt';
  title: string;
  description?: string;
  categoryName?: string;
  subcategoryName?: string;
  skillLevel?: string;
  timestamp: number;
  href: string;
}

interface RecentlyViewedProps {
  maxItems?: number;
  variant?: 'sidebar' | 'section' | 'compact';
  className?: string;
  onItemClick?: (item: RecentItem) => void;
}

const STORAGE_KEY = 'recently_viewed_items';

const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
  maxItems = 10,
  variant = 'sidebar',
  className = '',
  onItemClick
}) => {
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);

  // Load recent items from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const items = JSON.parse(stored) as RecentItem[];
        // Filter out items older than 30 days
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        const validItems = items.filter(item => item.timestamp > thirtyDaysAgo);
        setRecentItems(validItems.slice(0, maxItems));
      }
    } catch (error) {
      console.error('Error loading recent items:', error);
    }
  }, [maxItems]);

  // Add item to recent history
  const addRecentItem = (item: Omit<RecentItem, 'timestamp'>) => {
    const newItem: RecentItem = {
      ...item,
      timestamp: Date.now()
    };

    setRecentItems(prev => {
      // Remove existing item with same id and type
      const filtered = prev.filter(existing => 
        !(existing.id === item.id && existing.type === item.type)
      );
      
      // Add new item at the beginning
      const updated = [newItem, ...filtered].slice(0, maxItems);
      
      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Error saving recent items:', error);
      }
      
      return updated;
    });
  };

  // Remove specific item
  const removeItem = (itemId: string, itemType: string) => {
    setRecentItems(prev => {
      const updated = prev.filter(item => 
        !(item.id === itemId && item.type === itemType)
      );
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Error saving recent items:', error);
      }
      
      return updated;
    });
  };

  // Clear all recent items
  const clearAll = () => {
    setRecentItems([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing recent items:', error);
    }
  };

  // Format relative time
  const formatRelativeTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  // Get icon for item type
  const getItemIcon = (type: string) => {
    switch (type) {
      case 'category':
        return '📁';
      case 'subcategory':
        return '📂';
      case 'prompt':
        return '💡';
      default:
        return '📄';
    }
  };

  // Get color for skill level
  const getSkillLevelColor = (skillLevel?: string) => {
    switch (skillLevel) {
      case 'Basic':
        return 'success';
      case 'Intermediate':
        return 'warning';
      case 'Advanced':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleItemClick = (item: RecentItem) => {
    onItemClick?.(item);
    // You could also navigate here if needed
    // navigate(item.href);
  };

  if (recentItems.length === 0) {
    return null;
  }

  if (variant === 'compact') {
    return (
      <div className={cn('space-y-3', className)}>
        <div className="flex items-center justify-between">
          <Heading level={5} className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            Recent
          </Heading>
          {recentItems.length > 0 && (
            <button
              onClick={clearAll}
              className="text-xs text-gray-500 hover:text-gray-400 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        
        <div className="space-y-2">
          {recentItems.slice(0, 3).map((item) => (
            <button
              key={`${item.type}-${item.id}`}
              onClick={() => handleItemClick(item)}
              className="w-full text-left p-2 rounded-lg hover:bg-gray-800/50 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{getItemIcon(item.type)}</span>
                <div className="flex-1 min-w-0">
                  <Text variant="caption" className="font-medium truncate">
                    {item.title}
                  </Text>
                  <Text variant="small" color="muted" className="truncate">
                    {formatRelativeTime(item.timestamp)}
                  </Text>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className={cn('space-y-4', className)}>
        <div className="flex items-center justify-between">
          <Heading level={4} className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" />
            Recently Viewed
          </Heading>
          {recentItems.length > 0 && (
            <button
              onClick={clearAll}
              className="text-xs text-gray-500 hover:text-gray-400 transition-colors flex items-center gap-1"
              title="Clear all"
            >
              <RotateCcw className="w-3 h-3" />
              Clear
            </button>
          )}
        </div>
        
        <div className="space-y-2">
          {recentItems.slice(0, 5).map((item) => (
            <div
              key={`${item.type}-${item.id}`}
              className="group relative bg-gray-800/40 rounded-lg p-3 hover:bg-gray-800/60 transition-colors"
            >
              <button
                onClick={() => handleItemClick(item)}
                className="w-full text-left"
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">{getItemIcon(item.type)}</span>
                  <div className="flex-1 min-w-0">
                    <Text variant="caption" className="font-medium mb-1 line-clamp-1">
                      {item.title}
                    </Text>
                    {item.description && (
                      <Text variant="small" color="muted" className="line-clamp-2 mb-2">
                        {item.description}
                      </Text>
                    )}
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.skillLevel && (
                        <Badge variant={getSkillLevelColor(item.skillLevel)} size="small">
                          {item.skillLevel}
                        </Badge>
                      )}
                      <Text variant="small" color="muted">
                        {formatRelativeTime(item.timestamp)}
                      </Text>
                    </div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => removeItem(item.id, item.type)}
                className="absolute top-2 right-2 p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-gray-700/50 transition-all"
                title="Remove from recent"
              >
                <X className="w-3 h-3 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
        
        {recentItems.length > 5 && (
          <Text variant="caption" color="muted" className="text-center">
            +{recentItems.length - 5} more items
          </Text>
        )}
      </div>
    );
  }

  // Default section variant
  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center justify-between">
        <Heading level={3} className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-blue-400" />
          Recently Viewed
        </Heading>
        {recentItems.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-gray-500 hover:text-gray-400 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentItems.map((item) => (
          <div
            key={`${item.type}-${item.id}`}
            className="group relative bg-gray-800/60 rounded-xl p-4 hover:bg-gray-800/80 transition-all duration-200 border border-gray-700/40 hover:border-gray-600/50"
          >
            <button
              onClick={() => handleItemClick(item)}
              className="w-full text-left"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-xl">{getItemIcon(item.type)}</span>
                <div className="flex-1 min-w-0">
                  <Text className="font-semibold mb-1 line-clamp-1">
                    {item.title}
                  </Text>
                  {item.description && (
                    <Text variant="caption" color="muted" className="line-clamp-2">
                      {item.description}
                    </Text>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {item.skillLevel && (
                    <Badge variant={getSkillLevelColor(item.skillLevel)} size="small">
                      {item.skillLevel}
                    </Badge>
                  )}
                  <Badge variant="default" size="small">
                    {item.type}
                  </Badge>
                </div>
                <Text variant="small" color="muted">
                  {formatRelativeTime(item.timestamp)}
                </Text>
              </div>
            </button>
            
            <button
              onClick={() => removeItem(item.id, item.type)}
              className="absolute top-3 right-3 p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-gray-700/50 transition-all"
              title="Remove from recent"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export utility function to add items from other components
export const addToRecentlyViewed = (item: Omit<RecentItem, 'timestamp'>) => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const existing = stored ? JSON.parse(stored) as RecentItem[] : [];
    
    const newItem: RecentItem = {
      ...item,
      timestamp: Date.now()
    };
    
    // Remove existing item with same id and type
    const filtered = existing.filter(existingItem => 
      !(existingItem.id === item.id && existingItem.type === item.type)
    );
    
    // Add new item at the beginning
    const updated = [newItem, ...filtered].slice(0, 10);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error adding to recent items:', error);
  }
};

export default RecentlyViewed;
