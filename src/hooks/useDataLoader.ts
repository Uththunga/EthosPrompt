import { useState, useEffect, useCallback, useRef } from 'react';
import { dataService } from '../services/DataService';
import { useError } from '../contexts/ErrorContext';
import type { Prompt } from '../data/prompts-data';
import type { Category } from '../data/categories-data';

interface UseDataLoaderState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

interface UsePromptsOptions {
  subcategoryId?: string;
  filters?: {
    difficulty?: string;
    promptGroupId?: string;
    searchQuery?: string;
  };
  enabled?: boolean;
}

// Generic data loader hook
function useDataLoader<T>(
  loadFn: () => Promise<T>,
  deps: React.DependencyList = [],
  enabled = true
): UseDataLoaderState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { addError } = useError();
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadData = useCallback(async () => {
    if (!enabled) return;

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setLoading(true);
    setError(null);

    try {
      const result = await loadFn();
      
      // Check if request was aborted
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      setData(result);
    } catch (err) {
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      const error = err as Error;
      setError(error);
      addError(`Failed to load data: ${error.message}`, 'error', 'DataLoader');
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setLoading(false);
      }
    }
  }, [loadFn, enabled, addError]);

  useEffect(() => {
    loadData();

    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, deps);

  const refetch = useCallback(async () => {
    await loadData();
  }, [loadData]);

  return { data, loading, error, refetch };
}

// Hook for loading prompts with filtering
export function usePrompts(options: UsePromptsOptions = {}): UseDataLoaderState<Prompt[]> {
  const { subcategoryId, filters = {}, enabled = true } = options;

  const loadFn = useCallback(async () => {
    if (subcategoryId) {
      return await dataService.filterPrompts(subcategoryId, filters);
    } else {
      return await dataService.loadPrompts();
    }
  }, [subcategoryId, filters.difficulty, filters.promptGroupId, filters.searchQuery]);

  return useDataLoader(
    loadFn,
    [subcategoryId, filters.difficulty, filters.promptGroupId, filters.searchQuery],
    enabled
  );
}

// Hook for loading categories
export function useCategories(): UseDataLoaderState<Category[]> {
  const loadFn = useCallback(async () => {
    return await dataService.loadCategories();
  }, []);

  return useDataLoader(loadFn, []);
}

// Hook for search with debouncing
export function usePromptSearch(
  query: string,
  subcategoryId?: string,
  debounceMs = 300
): UseDataLoaderState<Prompt[]> {
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Debounce search query
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, debounceMs]);

  const loadFn = useCallback(async () => {
    if (!debouncedQuery.trim()) {
      return subcategoryId ? await dataService.loadPromptsBySubcategory(subcategoryId) : [];
    }
    return await dataService.searchPrompts(debouncedQuery, subcategoryId);
  }, [debouncedQuery, subcategoryId]);

  return useDataLoader(
    loadFn,
    [debouncedQuery, subcategoryId],
    true
  );
}

// Hook for preloading data
export function useDataPreloader() {
  const { addError } = useError();

  const preloadSubcategories = useCallback(async (subcategoryIds: string[]) => {
    try {
      await dataService.preloadData(subcategoryIds);
    } catch (error) {
      addError('Failed to preload data', 'warning', 'DataPreloader');
    }
  }, [addError]);

  const preloadCategory = useCallback(async (categoryId: string) => {
    try {
      const categories = await dataService.loadCategories();
      const category = categories.find(c => c.id === categoryId);
      
      if (category) {
        const subcategoryIds = category.subcategories.map(s => s.id);
        await preloadSubcategories(subcategoryIds);
      }
    } catch (error) {
      addError('Failed to preload category data', 'warning', 'DataPreloader');
    }
  }, [addError, preloadSubcategories]);

  return {
    preloadSubcategories,
    preloadCategory
  };
}

// Hook for cache management
export function useCacheManager() {
  const [stats, setStats] = useState(dataService.getCacheStats());

  const updateStats = useCallback(() => {
    setStats(dataService.getCacheStats());
  }, []);

  const clearCache = useCallback(() => {
    dataService.clearCache();
    updateStats();
  }, [updateStats]);

  useEffect(() => {
    // Update stats periodically
    const interval = setInterval(updateStats, 10000); // Every 10 seconds
    return () => clearInterval(interval);
  }, [updateStats]);

  return {
    stats,
    clearCache,
    updateStats
  };
}

// Performance monitoring hook
export function useDataPerformance() {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    cacheHitRate: 0,
    searchResponseTime: 0
  });

  const measureLoadTime = useCallback(async <T>(operation: () => Promise<T>): Promise<T> => {
    const startTime = performance.now();
    const result = await operation();
    const endTime = performance.now();
    
    setMetrics(prev => ({
      ...prev,
      loadTime: endTime - startTime
    }));

    return result;
  }, []);

  const measureSearchTime = useCallback(async (query: string, subcategoryId?: string): Promise<Prompt[]> => {
    const startTime = performance.now();
    const results = await dataService.searchPrompts(query, subcategoryId);
    const endTime = performance.now();
    
    setMetrics(prev => ({
      ...prev,
      searchResponseTime: endTime - startTime
    }));

    return results;
  }, []);

  return {
    metrics,
    measureLoadTime,
    measureSearchTime
  };
}
