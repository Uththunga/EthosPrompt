import React, { useState, useCallback, useMemo } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { usePromptSearch, useDataPerformance } from '../hooks/useDataLoader';
import { useError } from '../contexts/ErrorContext';

interface OptimizedSearchProps {
  subcategoryId?: string;
  onSearchChange?: (query: string) => void;
  placeholder?: string;
  className?: string;
  showPerformanceMetrics?: boolean;
}

export const OptimizedSearch: React.FC<OptimizedSearchProps> = ({
  subcategoryId,
  onSearchChange,
  placeholder = 'Search prompts...',
  className = '',
  showPerformanceMetrics = false
}) => {
  const [query, setQuery] = useState('');
  const { addError } = useError();
  const { metrics, measureSearchTime } = useDataPerformance();

  // Use optimized search hook with debouncing
  const { data: searchResults, loading: searchLoading, error: searchError } = usePromptSearch(
    query,
    subcategoryId,
    300 // 300ms debounce
  );

  // Handle search input change
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearchChange?.(newQuery);
  }, [onSearchChange]);

  // Clear search
  const clearSearch = useCallback(() => {
    setQuery('');
    onSearchChange?.('');
  }, [onSearchChange]);

  // Handle search error
  React.useEffect(() => {
    if (searchError) {
      addError('Search failed. Please try again.', 'warning', 'OptimizedSearch');
    }
  }, [searchError, addError]);

  // Performance metrics display
  const performanceDisplay = useMemo(() => {
    if (!showPerformanceMetrics) return null;

    return (
      <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
        <span>Search: {metrics.searchResponseTime.toFixed(0)}ms</span>
        {searchResults && (
          <span>• {searchResults.length} results</span>
        )}
      </div>
    );
  }, [showPerformanceMetrics, metrics.searchResponseTime, searchResults]);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {searchLoading ? (
            <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />
          ) : (
            <Search className="w-4 h-4 text-gray-500" />
          )}
        </div>
        
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          className="w-full pl-10 pr-10 py-2.5 text-sm bg-gray-700/50 border border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
          aria-label="Search prompts"
        />
        
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-300 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </div>
      
      {performanceDisplay}
      
      {/* Search suggestions/results preview could go here */}
      {query && searchResults && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          <div className="p-2 text-xs text-gray-400 border-b border-gray-700">
            {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
          </div>
          {searchResults.slice(0, 5).map((prompt) => (
            <div
              key={prompt.id}
              className="p-3 hover:bg-gray-700/50 cursor-pointer border-b border-gray-700/50 last:border-b-0"
            >
              <div className="font-medium text-white text-sm truncate">
                {prompt.title}
              </div>
              {prompt.description && (
                <div className="text-gray-400 text-xs mt-1 truncate">
                  {prompt.description}
                </div>
              )}
            </div>
          ))}
          {searchResults.length > 5 && (
            <div className="p-2 text-xs text-gray-400 text-center">
              +{searchResults.length - 5} more results
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Hook for search analytics
export const useSearchAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    totalSearches: 0,
    averageResponseTime: 0,
    popularQueries: new Map<string, number>(),
    cacheHitRate: 0
  });

  const trackSearch = useCallback((query: string, responseTime: number, fromCache: boolean) => {
    setAnalytics(prev => {
      const newPopularQueries = new Map(prev.popularQueries);
      newPopularQueries.set(query, (newPopularQueries.get(query) || 0) + 1);

      const newTotalSearches = prev.totalSearches + 1;
      const newAverageResponseTime = (prev.averageResponseTime * prev.totalSearches + responseTime) / newTotalSearches;
      const newCacheHitRate = fromCache 
        ? (prev.cacheHitRate * prev.totalSearches + 1) / newTotalSearches
        : (prev.cacheHitRate * prev.totalSearches) / newTotalSearches;

      return {
        totalSearches: newTotalSearches,
        averageResponseTime: newAverageResponseTime,
        popularQueries: newPopularQueries,
        cacheHitRate: newCacheHitRate
      };
    });
  }, []);

  const getTopQueries = useCallback((limit = 10) => {
    return Array.from(analytics.popularQueries.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([query, count]) => ({ query, count }));
  }, [analytics.popularQueries]);

  return {
    analytics,
    trackSearch,
    getTopQueries
  };
};

export default OptimizedSearch;
