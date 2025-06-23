import { useState, useEffect, useCallback, useRef } from 'react';
import { databaseService } from '../services/DatabaseService';
import { useError } from '../contexts/ErrorContext';
import type { UICategory, UIPrompt } from '../services/DatabaseService';

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
  dependencies: any[],
  enabled: boolean = true
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
      addError(`Failed to load data: ${error.message}`, 'error', 'DatabaseLoader');
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setLoading(false);
      }
    }
  }, [loadFn, enabled, addError]);

  const refetch = useCallback(async () => {
    await loadData();
  }, [loadData]);

  useEffect(() => {
    loadData();

    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, dependencies);

  return { data, loading, error, refetch };
}

// Hook for loading categories
export function useCategories(): UseDataLoaderState<UICategory[]> {
  const loadFn = useCallback(async () => {
    return await databaseService.loadCategories();
  }, []);

  return useDataLoader(loadFn, [], true);
}

// Hook for loading prompts with filtering
export function usePrompts(options: UsePromptsOptions = {}): UseDataLoaderState<UIPrompt[]> {
  const { subcategoryId, filters = {}, enabled = true } = options;

  const loadFn = useCallback(async () => {
    if (!subcategoryId) {
      return [];
    }

    // If we have filters, use the filter method
    if (filters.difficulty || filters.promptGroupId || filters.searchQuery) {
      return await databaseService.filterPrompts(subcategoryId, filters);
    }

    // Otherwise, just load by subcategory
    return await databaseService.loadPromptsBySubcategory(subcategoryId);
  }, [subcategoryId, filters.difficulty, filters.promptGroupId, filters.searchQuery]);

  return useDataLoader(
    loadFn,
    [subcategoryId, filters.difficulty, filters.promptGroupId, filters.searchQuery],
    enabled && !!subcategoryId
  );
}

// Hook for searching prompts
export function usePromptSearch(query: string, subcategoryId?: string): UseDataLoaderState<UIPrompt[]> {
  const loadFn = useCallback(async () => {
    if (!query.trim()) {
      return subcategoryId ? await databaseService.loadPromptsBySubcategory(subcategoryId) : [];
    }
    return await databaseService.searchPrompts(query, subcategoryId);
  }, [query, subcategoryId]);

  return useDataLoader(
    loadFn,
    [query, subcategoryId],
    true
  );
}

// Hook for preloading data (simplified for database version)
export function useDataPreloader() {
  const { addError } = useError();

  const preloadCategory = useCallback(async (categoryId: string) => {
    try {
      // Preload categories (this will cache them)
      await databaseService.loadCategories();
    } catch (error) {
      addError('Failed to preload category data', 'warning', 'DatabasePreloader');
    }
  }, [addError]);

  const preloadSubcategories = useCallback(async (subcategoryIds: string[]) => {
    try {
      // Preload prompts for each subcategory
      const promises = subcategoryIds.map(id => databaseService.loadPromptsBySubcategory(id));
      await Promise.all(promises);
    } catch (error) {
      addError('Failed to preload subcategory data', 'warning', 'DatabasePreloader');
    }
  }, [addError]);

  return {
    preloadCategory,
    preloadSubcategories
  };
}

// Hook for updating prompt counts
export function usePromptCounts() {
  const [updating, setUpdating] = useState(false);
  const { addError } = useError();

  const updateCounts = useCallback(async () => {
    try {
      setUpdating(true);
      await databaseService.updateCategoryPromptCounts();
      // Clear cache to force reload with updated counts
      databaseService.clearCache();
    } catch (error) {
      addError('Failed to update prompt counts', 'error', 'PromptCounts');
    } finally {
      setUpdating(false);
    }
  }, [addError]);

  return {
    updateCounts,
    updating
  };
}
