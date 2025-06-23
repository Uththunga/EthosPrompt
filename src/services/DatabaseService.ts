import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';
import { LRUCache } from '../utils/cache';

// Database types
type DbCategory = Database['public']['Tables']['categories']['Row'];
type DbSubcategory = Database['public']['Tables']['subcategories']['Row'];
type DbPromptGroup = Database['public']['Tables']['prompt_groups']['Row'];
type DbPrompt = Database['public']['Tables']['prompts']['Row'];

// UI-compatible types
export interface UICategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  promptCount: number;
  subcategories: UISubcategory[];
  bgGradient: string;
  trending?: boolean;
  featured?: boolean;
}

export interface UISubcategory {
  id: string;
  name: string;
  description: string;
  examples: string[];
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  promptGroups?: UIPromptGroup[];
}

export interface UIPromptGroup {
  id: string;
  name: string;
}

export interface UIPrompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  categoryId: string;
  subcategoryId?: string;
  promptGroupId?: string;
  tags: string[];
  industry?: string;
  useCase?: string;
  difficulty: string;
  accessType: 'free' | 'paid';
  estimatedTime?: string;
  prerequisites?: string[];
}

// Cache configuration
interface CacheConfig {
  maxSize: number;
  ttl: number;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class SimpleCache<T> {
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
    
    return entry.data;
  }

  set(key: string, data: T): void {
    // Simple eviction: clear cache if it gets too large
    if (this.cache.size >= this.config.maxSize) {
      this.cache.clear();
    }

    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now()
    };

    this.cache.set(key, entry);
  }

  clear(): void {
    this.cache.clear();
  }
}

class DatabaseService {
  private categoryCache = new SimpleCache<UICategory[]>({
    maxSize: 10,
    ttl: 10 * 60 * 1000 // 10 minutes
  });

  private promptCache = new SimpleCache<UIPrompt[]>({
    maxSize: 50,
    ttl: 5 * 60 * 1000 // 5 minutes
  });

  // Transform database category to UI category
  private transformCategory(dbCategory: DbCategory, subcategories: UISubcategory[] = []): UICategory {
    return {
      id: dbCategory.id,
      name: dbCategory.name,
      icon: dbCategory.icon,
      description: dbCategory.description,
      promptCount: dbCategory.prompt_count,
      bgGradient: dbCategory.bg_gradient,
      trending: dbCategory.trending || false,
      featured: dbCategory.featured || false,
      subcategories
    };
  }

  // Transform database subcategory to UI subcategory
  private transformSubcategory(dbSubcategory: DbSubcategory, promptGroups: UIPromptGroup[] = []): UISubcategory {
    const skillLevelMap: Record<string, 'Beginner' | 'Intermediate' | 'Advanced'> = {
      'beginner': 'Beginner',
      'intermediate': 'Intermediate',
      'advanced': 'Advanced'
    };

    return {
      id: dbSubcategory.id,
      name: dbSubcategory.name,
      description: dbSubcategory.description,
      examples: dbSubcategory.examples || [],
      skillLevel: skillLevelMap[dbSubcategory.skill_level] || 'Beginner',
      promptGroups
    };
  }

  // Transform database prompt group to UI prompt group
  private transformPromptGroup(dbPromptGroup: DbPromptGroup): UIPromptGroup {
    return {
      id: dbPromptGroup.id,
      name: dbPromptGroup.name
    };
  }

  // Transform database prompt to UI prompt
  private transformPrompt(dbPrompt: DbPrompt): UIPrompt {
    const skillLevelMap: Record<string, string> = {
      'beginner': 'Beginner',
      'intermediate': 'Intermediate',
      'advanced': 'Advanced'
    };

    return {
      id: dbPrompt.id,
      title: dbPrompt.title,
      description: dbPrompt.description,
      prompt: dbPrompt.content,
      categoryId: dbPrompt.category_id,
      subcategoryId: dbPrompt.subcategory_id || undefined,
      promptGroupId: dbPrompt.prompt_group_id || undefined,
      tags: dbPrompt.tags || [],
      industry: dbPrompt.industry || undefined,
      useCase: dbPrompt.use_case || undefined,
      difficulty: skillLevelMap[dbPrompt.skill_level] || 'Beginner',
      accessType: dbPrompt.access_type,
      estimatedTime: '10-15 minutes', // Default value
      prerequisites: [] // Default value
    };
  }

  // Load all categories with subcategories
  async loadCategories(): Promise<UICategory[]> {
    const cacheKey = 'all-categories';
    const cached = this.categoryCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      // Fetch categories
      const { data: categories, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (categoriesError) {
        throw new Error(`Failed to load categories: ${categoriesError.message}`);
      }

      // Fetch subcategories
      const { data: subcategories, error: subcategoriesError } = await supabase
        .from('subcategories')
        .select('*')
        .order('name');

      if (subcategoriesError) {
        throw new Error(`Failed to load subcategories: ${subcategoriesError.message}`);
      }

      // Fetch prompt groups
      const { data: promptGroups, error: promptGroupsError } = await supabase
        .from('prompt_groups')
        .select('*')
        .order('name');

      if (promptGroupsError) {
        throw new Error(`Failed to load prompt groups: ${promptGroupsError.message}`);
      }

      // Group subcategories by category
      const subcategoriesByCategory = new Map<string, UISubcategory[]>();
      
      for (const subcategory of subcategories || []) {
        const categoryId = subcategory.category_id;
        if (!subcategoriesByCategory.has(categoryId)) {
          subcategoriesByCategory.set(categoryId, []);
        }
        
        // Find prompt groups for this subcategory
        const subPromptGroups = (promptGroups || [])
          .filter(pg => pg.subcategory_id === subcategory.id)
          .map(pg => this.transformPromptGroup(pg));
        
        const uiSubcategory = this.transformSubcategory(subcategory, subPromptGroups);
        subcategoriesByCategory.get(categoryId)!.push(uiSubcategory);
      }

      // Transform categories with their subcategories
      const uiCategories = (categories || []).map(category => {
        const categorySubcategories = subcategoriesByCategory.get(category.id) || [];
        return this.transformCategory(category, categorySubcategories);
      });

      this.categoryCache.set(cacheKey, uiCategories);
      return uiCategories;

    } catch (error) {
      console.error('Error loading categories:', error);
      throw error;
    }
  }

  // Load prompts by subcategory
  async loadPromptsBySubcategory(subcategoryId: string): Promise<UIPrompt[]> {
    const cacheKey = `prompts-subcategory-${subcategoryId}`;
    const cached = this.promptCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const { data: prompts, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('subcategory_id', subcategoryId)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Failed to load prompts: ${error.message}`);
      }

      const uiPrompts = (prompts || []).map(prompt => this.transformPrompt(prompt));
      this.promptCache.set(cacheKey, uiPrompts);
      
      return uiPrompts;

    } catch (error) {
      console.error('Error loading prompts by subcategory:', error);
      throw error;
    }
  }

  // Search prompts
  async searchPrompts(query: string, subcategoryId?: string): Promise<UIPrompt[]> {
    if (!query.trim()) {
      return subcategoryId ? await this.loadPromptsBySubcategory(subcategoryId) : [];
    }

    try {
      let dbQuery = supabase
        .from('prompts')
        .select('*');

      if (subcategoryId) {
        dbQuery = dbQuery.eq('subcategory_id', subcategoryId);
      }

      // Use text search for title, description, and content
      dbQuery = dbQuery.or(`title.ilike.%${query}%,description.ilike.%${query}%,content.ilike.%${query}%`);

      const { data: prompts, error } = await dbQuery
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Failed to search prompts: ${error.message}`);
      }

      return (prompts || []).map(prompt => this.transformPrompt(prompt));

    } catch (error) {
      console.error('Error searching prompts:', error);
      throw error;
    }
  }

  // Filter prompts with multiple criteria
  async filterPrompts(
    subcategoryId: string,
    filters: {
      difficulty?: string;
      promptGroupId?: string;
      searchQuery?: string;
    }
  ): Promise<UIPrompt[]> {
    const { difficulty, promptGroupId, searchQuery } = filters;
    const cacheKey = `filter-${subcategoryId}-${difficulty || 'all'}-${promptGroupId || 'all'}-${searchQuery || ''}`;

    const cached = this.promptCache.get(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      let dbQuery = supabase
        .from('prompts')
        .select('*')
        .eq('subcategory_id', subcategoryId);

      // Apply difficulty filter
      if (difficulty) {
        const dbDifficulty = difficulty.toLowerCase();
        dbQuery = dbQuery.eq('skill_level', dbDifficulty);
      }

      // Apply prompt group filter
      if (promptGroupId) {
        dbQuery = dbQuery.eq('prompt_group_id', promptGroupId);
      }

      // Apply search filter
      if (searchQuery?.trim()) {
        dbQuery = dbQuery.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
      }

      const { data: prompts, error } = await dbQuery
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Failed to filter prompts: ${error.message}`);
      }

      const uiPrompts = (prompts || []).map(prompt => this.transformPrompt(prompt));
      this.promptCache.set(cacheKey, uiPrompts);

      return uiPrompts;

    } catch (error) {
      console.error('Error filtering prompts:', error);
      throw error;
    }
  }

  // Get prompt count for a category
  async getCategoryPromptCount(categoryId: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('prompts')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', categoryId);

      if (error) {
        throw new Error(`Failed to get prompt count: ${error.message}`);
      }

      return count || 0;

    } catch (error) {
      console.error('Error getting prompt count:', error);
      return 0;
    }
  }

  // Update category prompt counts
  async updateCategoryPromptCounts(): Promise<void> {
    try {
      const { data: categories, error: categoriesError } = await supabase
        .from('categories')
        .select('id');

      if (categoriesError) {
        throw new Error(`Failed to load categories: ${categoriesError.message}`);
      }

      for (const category of categories || []) {
        const count = await this.getCategoryPromptCount(category.id);

        const { error: updateError } = await supabase
          .from('categories')
          .update({ prompt_count: count })
          .eq('id', category.id);

        if (updateError) {
          console.error(`Failed to update prompt count for category ${category.id}:`, updateError);
        }
      }

      // Clear cache to force reload with updated counts
      this.clearCache();

    } catch (error) {
      console.error('Error updating category prompt counts:', error);
      throw error;
    }
  }

  // Get real-time prompt count for a subcategory
  async getSubcategoryPromptCount(subcategoryId: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('prompts')
        .select('*', { count: 'exact', head: true })
        .eq('subcategory_id', subcategoryId);

      if (error) {
        throw new Error(`Failed to get subcategory prompt count: ${error.message}`);
      }

      return count || 0;

    } catch (error) {
      console.error('Error getting subcategory prompt count:', error);
      return 0;
    }
  }

  // Clear all caches
  clearCache(): void {
    this.categoryCache.clear();
    this.promptCache.clear();
  }
}

// Singleton instance
export const databaseService = new DatabaseService();
