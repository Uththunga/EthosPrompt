import { useState, useEffect, useCallback } from 'react';
import { BlogPost } from '../data/blog-posts';

interface BookmarkData {
  postId: string;
  title: string;
  path: string;
  category: string;
  difficulty: string;
  readTime: string;
  author: string;
  bookmarkedAt: string;
  tags: string[];
}

interface BookmarkStats {
  totalBookmarks: number;
  categoryCounts: Record<string, number>;
  difficultyDistribution: Record<string, number>;
  recentBookmarks: BookmarkData[];
}

const STORAGE_KEY = 'ethosprompt_bookmarks';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedBookmarks = JSON.parse(stored);
        setBookmarks(parsedBookmarks);
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save bookmarks to localStorage whenever bookmarks change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
      } catch (error) {
        console.error('Error saving bookmarks:', error);
      }
    }
  }, [bookmarks, isLoading]);

  // Check if a post is bookmarked
  const isBookmarked = useCallback((postId: string): boolean => {
    return bookmarks.some(bookmark => bookmark.postId === postId);
  }, [bookmarks]);

  // Add a bookmark
  const addBookmark = useCallback((post: BlogPost): boolean => {
    if (isBookmarked(post.id)) {
      return false; // Already bookmarked
    }

    const newBookmark: BookmarkData = {
      postId: post.id,
      title: post.title,
      path: post.path,
      category: post.category,
      difficulty: post.difficulty,
      readTime: post.readTime,
      author: post.author.name,
      bookmarkedAt: new Date().toISOString(),
      tags: post.tags
    };

    setBookmarks(prev => [newBookmark, ...prev]);
    return true;
  }, [isBookmarked]);

  // Remove a bookmark
  const removeBookmark = useCallback((postId: string): boolean => {
    const initialLength = bookmarks.length;
    setBookmarks(prev => prev.filter(bookmark => bookmark.postId !== postId));
    return bookmarks.length !== initialLength;
  }, [bookmarks.length]);

  // Toggle bookmark status
  const toggleBookmark = useCallback((post: BlogPost): boolean => {
    if (isBookmarked(post.id)) {
      return removeBookmark(post.id);
    } else {
      return addBookmark(post);
    }
  }, [isBookmarked, removeBookmark, addBookmark]);

  // Get bookmarks with filtering and sorting
  const getFilteredBookmarks = useCallback((
    category?: string,
    difficulty?: string,
    sortBy: 'recent' | 'title' | 'category' = 'recent'
  ): BookmarkData[] => {
    let filtered = [...bookmarks];

    // Apply filters
    if (category && category !== 'all') {
      filtered = filtered.filter(bookmark => bookmark.category === category);
    }

    if (difficulty && difficulty !== 'all') {
      filtered = filtered.filter(bookmark => bookmark.difficulty === difficulty);
    }

    // Apply sorting
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.bookmarkedAt).getTime() - new Date(a.bookmarkedAt).getTime());
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'category':
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
    }

    return filtered;
  }, [bookmarks]);

  // Search bookmarks
  const searchBookmarks = useCallback((query: string): BookmarkData[] => {
    if (!query.trim()) {
      return bookmarks;
    }

    const searchTerm = query.toLowerCase();
    return bookmarks.filter(bookmark =>
      bookmark.title.toLowerCase().includes(searchTerm) ||
      bookmark.author.toLowerCase().includes(searchTerm) ||
      bookmark.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      bookmark.category.toLowerCase().includes(searchTerm)
    );
  }, [bookmarks]);

  // Get bookmark statistics
  const getBookmarkStats = useCallback((): BookmarkStats => {
    const categoryCounts: Record<string, number> = {};
    const difficultyDistribution: Record<string, number> = {};

    bookmarks.forEach(bookmark => {
      // Count by category
      categoryCounts[bookmark.category] = (categoryCounts[bookmark.category] || 0) + 1;
      
      // Count by difficulty
      difficultyDistribution[bookmark.difficulty] = (difficultyDistribution[bookmark.difficulty] || 0) + 1;
    });

    // Get recent bookmarks (last 5)
    const recentBookmarks = [...bookmarks]
      .sort((a, b) => new Date(b.bookmarkedAt).getTime() - new Date(a.bookmarkedAt).getTime())
      .slice(0, 5);

    return {
      totalBookmarks: bookmarks.length,
      categoryCounts,
      difficultyDistribution,
      recentBookmarks
    };
  }, [bookmarks]);

  // Clear all bookmarks
  const clearAllBookmarks = useCallback((): void => {
    setBookmarks([]);
  }, []);

  // Export bookmarks as JSON
  const exportBookmarks = useCallback((): string => {
    return JSON.stringify(bookmarks, null, 2);
  }, [bookmarks]);

  // Import bookmarks from JSON
  const importBookmarks = useCallback((jsonData: string): boolean => {
    try {
      const importedBookmarks = JSON.parse(jsonData);
      
      // Validate the structure
      if (!Array.isArray(importedBookmarks)) {
        throw new Error('Invalid bookmark data format');
      }

      // Validate each bookmark has required fields
      const validBookmarks = importedBookmarks.filter(bookmark => 
        bookmark.postId && 
        bookmark.title && 
        bookmark.path &&
        bookmark.bookmarkedAt
      );

      // Merge with existing bookmarks, avoiding duplicates
      const existingIds = new Set(bookmarks.map(b => b.postId));
      const newBookmarks = validBookmarks.filter(b => !existingIds.has(b.postId));
      
      setBookmarks(prev => [...newBookmarks, ...prev]);
      return true;
    } catch (error) {
      console.error('Error importing bookmarks:', error);
      return false;
    }
  }, [bookmarks]);

  // Get reading list summary
  const getReadingListSummary = useCallback(() => {
    const totalReadTime = bookmarks.reduce((total, bookmark) => {
      const minutes = parseInt(bookmark.readTime.split(' ')[0]) || 0;
      return total + minutes;
    }, 0);

    const hours = Math.floor(totalReadTime / 60);
    const minutes = totalReadTime % 60;

    let readTimeText = '';
    if (hours > 0) {
      readTimeText = `${hours}h ${minutes}m`;
    } else {
      readTimeText = `${minutes}m`;
    }

    return {
      totalArticles: bookmarks.length,
      totalReadTime: readTimeText,
      totalMinutes: totalReadTime,
      categories: Object.keys(getBookmarkStats().categoryCounts).length,
      lastBookmarked: bookmarks.length > 0 ? bookmarks[0].bookmarkedAt : null
    };
  }, [bookmarks, getBookmarkStats]);

  return {
    bookmarks,
    isLoading,
    isBookmarked,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    getFilteredBookmarks,
    searchBookmarks,
    getBookmarkStats,
    clearAllBookmarks,
    exportBookmarks,
    importBookmarks,
    getReadingListSummary
  };
};
