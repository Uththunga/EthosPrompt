import type { Prompt } from '../data/prompts-data';
import type { Category } from '../data/categories-data';

// Cache configuration
interface CacheConfig {
  maxSize: number;
  ttl: number; // Time to live in milliseconds
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  accessCount: number;
  lastAccessed: number;
}

// LRU Cache implementation
class LRUCache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private config: CacheConfig;

  constructor(config: CacheConfig) {
    this.config = config;
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Check if entry has expired
    if (Date.now() - entry.timestamp > this.config.ttl) {
      this.cache.delete(key);
      return null;
    }

    // Update access statistics
    entry.accessCount++;
    entry.lastAccessed = Date.now();
    
    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, entry);
    
    return entry.data;
  }

  set(key: string, data: T): void {
    // Remove oldest entries if cache is full
    if (this.cache.size >= this.config.maxSize) {
      this.evictLeastRecentlyUsed();
    }

    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      accessCount: 1,
      lastAccessed: Date.now()
    };

    this.cache.set(key, entry);
  }

  private evictLeastRecentlyUsed(): void {
    let oldestKey = '';
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  getStats() {
    const entries = Array.from(this.cache.values());
    return {
      size: this.cache.size,
      totalAccesses: entries.reduce((sum, entry) => sum + entry.accessCount, 0),
      averageAge: entries.length > 0 
        ? entries.reduce((sum, entry) => sum + (Date.now() - entry.timestamp), 0) / entries.length 
        : 0
    };
  }
}

// Data loading utilities
class DataService {
  private promptCache = new LRUCache<Prompt[]>({
    maxSize: 50, // Cache up to 50 different prompt queries
    ttl: 5 * 60 * 1000 // 5 minutes
  });

  private categoryCache = new LRUCache<Category[]>({
    maxSize: 10, // Cache category data
    ttl: 10 * 60 * 1000 // 10 minutes
  });

  private searchCache = new LRUCache<Prompt[]>({
    maxSize: 100, // Cache search results
    ttl: 2 * 60 * 1000 // 2 minutes (shorter for search)
  });

  // Lazy load prompts data
  async loadPrompts(): Promise<Prompt[]> {
    const cacheKey = 'all-prompts';
    const cached = this.promptCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    // Dynamic import for prompts data
    const { prompts } = await import('../data/prompts-data');
    this.promptCache.set(cacheKey, prompts);
    
    return prompts;
  }

  // Load prompts by subcategory with caching
  async loadPromptsBySubcategory(subcategoryId: string): Promise<Prompt[]> {
    const cacheKey = `subcategory-${subcategoryId}`;
    const cached = this.promptCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const allPrompts = await this.loadPrompts();
    const filtered = allPrompts.filter(p => p.subcategoryId === subcategoryId);
    
    this.promptCache.set(cacheKey, filtered);
    return filtered;
  }

  // Load categories with caching
  async loadCategories(): Promise<Category[]> {
    const cacheKey = 'all-categories';
    const cached = this.categoryCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    // Dynamic import for categories data
    const { categories } = await import('../data/categories-data');
    this.categoryCache.set(cacheKey, categories);
    
    return categories;
  }

  // Search prompts with caching and optimization
  async searchPrompts(query: string, subcategoryId?: string): Promise<Prompt[]> {
    if (!query.trim()) {
      return subcategoryId ? await this.loadPromptsBySubcategory(subcategoryId) : [];
    }

    const cacheKey = `search-${query.toLowerCase()}-${subcategoryId || 'all'}`;
    const cached = this.searchCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const prompts = subcategoryId 
      ? await this.loadPromptsBySubcategory(subcategoryId)
      : await this.loadPrompts();

    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    
    const results = prompts.filter(prompt => {
      const searchableText = [
        prompt.title,
        prompt.description || '',
        prompt.prompt,
        ...(prompt.tags || [])
      ].join(' ').toLowerCase();

      // Score-based search for better relevance
      return searchTerms.some(term => searchableText.includes(term));
    });

    this.searchCache.set(cacheKey, results);
    return results;
  }

  // Filter prompts with caching
  async filterPrompts(
    subcategoryId: string,
    filters: {
      difficulty?: string;
      promptGroupId?: string;
      searchQuery?: string;
    }
  ): Promise<Prompt[]> {
    const { difficulty, promptGroupId, searchQuery } = filters;
    const cacheKey = `filter-${subcategoryId}-${difficulty || 'all'}-${promptGroupId || 'all'}-${searchQuery || ''}`;
    
    const cached = this.promptCache.get(cacheKey);
    if (cached) {
      return cached;
    }

    let prompts = await this.loadPromptsBySubcategory(subcategoryId);

    // Apply search filter first (most selective)
    if (searchQuery?.trim()) {
      prompts = await this.searchPrompts(searchQuery, subcategoryId);
    }

    // Apply difficulty filter
    if (difficulty) {
      const { getDifficultyLevel } = await import('../utils/difficultyUtils');
      prompts = prompts.filter(p => getDifficultyLevel(p.difficulty) === difficulty);
    }

    // Apply prompt group filter
    if (promptGroupId) {
      prompts = prompts.filter(p => p.promptGroupId === promptGroupId);
    }

    this.promptCache.set(cacheKey, prompts);
    return prompts;
  }

  // Preload data for better performance
  async preloadData(subcategoryIds: string[]): Promise<void> {
    const promises = subcategoryIds.map(id => this.loadPromptsBySubcategory(id));
    await Promise.all(promises);
  }

  // Get cache statistics for monitoring
  getCacheStats() {
    return {
      prompts: this.promptCache.getStats(),
      categories: this.categoryCache.getStats(),
      search: this.searchCache.getStats()
    };
  }

  // Clear all caches
  clearCache(): void {
    this.promptCache.clear();
    this.categoryCache.clear();
    this.searchCache.clear();
  }
}

// Singleton instance
export const dataService = new DataService();

// Export types
export type { CacheConfig, CacheEntry };
export { LRUCache };
