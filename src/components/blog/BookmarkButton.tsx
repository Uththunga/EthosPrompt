import React, { useState } from 'react';
import { Bookmark, BookmarkCheck, Heart } from 'lucide-react';
import { Button } from '../ui/Button';
import { useBookmarks } from '../../hooks/useBookmarks';
import { BlogPost } from '../../data/blog-posts';

interface BookmarkButtonProps {
  post: BlogPost;
  variant?: 'default' | 'icon' | 'minimal';
  size?: 'sm' | 'default' | 'lg';
  showText?: boolean;
  className?: string;
  onBookmarkChange?: (isBookmarked: boolean) => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  post,
  variant = 'default',
  size = 'default',
  showText = true,
  className = '',
  onBookmarkChange
}) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const bookmarked = isBookmarked(post.id);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAnimating(true);
    const success = toggleBookmark(post);
    
    if (success && onBookmarkChange) {
      onBookmarkChange(!bookmarked);
    }

    // Reset animation after a short delay
    setTimeout(() => setIsAnimating(false), 300);
  };

  const getButtonContent = () => {
    const IconComponent = bookmarked ? BookmarkCheck : Bookmark;
    
    switch (variant) {
      case 'icon':
        return (
          <IconComponent 
            className={`w-4 h-4 transition-all duration-200 ${
              isAnimating ? 'scale-125' : ''
            } ${bookmarked ? 'text-purple-400' : 'text-gray-400'}`} 
          />
        );
      
      case 'minimal':
        return (
          <div className="flex items-center gap-2">
            <IconComponent 
              className={`w-4 h-4 transition-all duration-200 ${
                isAnimating ? 'scale-125' : ''
              } ${bookmarked ? 'text-purple-400' : 'text-gray-400'}`} 
            />
            {showText && (
              <span className="text-sm">
                {bookmarked ? 'Saved' : 'Save'}
              </span>
            )}
          </div>
        );
      
      default:
        return (
          <div className="flex items-center gap-2">
            <IconComponent 
              className={`w-4 h-4 transition-all duration-200 ${
                isAnimating ? 'scale-125' : ''
              }`} 
            />
            {showText && (
              <span>
                {bookmarked ? 'Bookmarked' : 'Bookmark'}
              </span>
            )}
          </div>
        );
    }
  };

  const getButtonProps = () => {
    const baseProps = {
      onClick: handleBookmarkClick,
      size,
      className: `transition-all duration-200 ${
        isAnimating ? 'scale-105' : ''
      } ${className}`,
      'aria-label': bookmarked ? 'Remove bookmark' : 'Add bookmark',
      title: bookmarked ? 'Remove from reading list' : 'Add to reading list'
    };

    switch (variant) {
      case 'icon':
        return {
          ...baseProps,
          variant: 'ghost' as const,
          className: `${baseProps.className} p-2 hover:bg-gray-700/50 ${
            bookmarked ? 'text-purple-400 hover:text-purple-300' : 'text-gray-400 hover:text-gray-300'
          }`
        };
      
      case 'minimal':
        return {
          ...baseProps,
          variant: 'ghost' as const,
          className: `${baseProps.className} ${
            bookmarked ? 'text-purple-400 hover:text-purple-300' : 'text-gray-400 hover:text-gray-300'
          }`
        };
      
      default:
        return {
          ...baseProps,
          variant: bookmarked ? 'default' as const : 'outline' as const,
          className: `${baseProps.className} ${
            bookmarked 
              ? 'bg-purple-600 hover:bg-purple-700 text-white border-purple-600' 
              : 'border-gray-600 text-gray-300 hover:border-purple-500/50 hover:text-purple-300'
          }`
        };
    }
  };

  return (
    <Button {...getButtonProps()}>
      {getButtonContent()}
    </Button>
  );
};

export default BookmarkButton;
