import React from 'react';
import { supabase, Prompt } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export interface PromptFilters {
  category?: string;
  subcategory?: string;
  skillLevel?: 'beginner' | 'intermediate' | 'advanced';
  accessType?: 'free' | 'paid';
  tags?: string[];
  search?: string;
}

export interface PromptQueryOptions {
  page?: number;
  limit?: number;
  sortBy?: 'created_at' | 'title' | 'category';
  sortOrder?: 'asc' | 'desc';
}

export class PromptService {
  /**
   * Get prompts with filtering and pagination
   */
  static async getPrompts(
    filters: PromptFilters = {},
    options: PromptQueryOptions = {}
  ): Promise<{ data: Prompt[]; count: number; error?: string }> {
    try {
      const {
        page = 1,
        limit = 20,
        sortBy = 'created_at',
        sortOrder = 'desc'
      } = options;

      const offset = (page - 1) * limit;

      let query = supabase
        .from('prompts')
        .select('*', { count: 'exact' });

      // Apply filters
      if (filters.category) {
        query = query.eq('category', filters.category);
      }

      if (filters.subcategory) {
        query = query.eq('subcategory', filters.subcategory);
      }

      if (filters.skillLevel) {
        query = query.eq('skill_level', filters.skillLevel);
      }

      if (filters.accessType) {
        query = query.eq('access_type', filters.accessType);
      }

      if (filters.tags && filters.tags.length > 0) {
        query = query.overlaps('tags', filters.tags);
      }

      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
      }

      // Apply sorting and pagination
      query = query
        .order(sortBy, { ascending: sortOrder === 'asc' })
        .range(offset, offset + limit - 1);

      const { data, error, count } = await query;

      if (error) {
        console.error('Error fetching prompts:', error);
        return { data: [], count: 0, error: error.message };
      }

      return { data: data || [], count: count || 0 };
    } catch (error) {
      console.error('Error in getPrompts:', error);
      return { data: [], count: 0, error: 'Failed to fetch prompts' };
    }
  }

  /**
   * Get a single prompt by ID
   */
  static async getPromptById(id: string): Promise<{ data: Prompt | null; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching prompt:', error);
        return { data: null, error: error.message };
      }

      return { data };
    } catch (error) {
      console.error('Error in getPromptById:', error);
      return { data: null, error: 'Failed to fetch prompt' };
    }
  }

  /**
   * Get prompts by category
   */
  static async getPromptsByCategory(
    category: string,
    options: PromptQueryOptions = {}
  ): Promise<{ data: Prompt[]; count: number; error?: string }> {
    return this.getPrompts({ category }, options);
  }

  /**
   * Get free prompts (accessible to all users)
   */
  static async getFreePrompts(
    options: PromptQueryOptions = {}
  ): Promise<{ data: Prompt[]; count: number; error?: string }> {
    return this.getPrompts({ accessType: 'free' }, options);
  }

  /**
   * Get paid prompts (requires lifetime access)
   */
  static async getPaidPrompts(
    options: PromptQueryOptions = {}
  ): Promise<{ data: Prompt[]; count: number; error?: string }> {
    return this.getPrompts({ accessType: 'paid' }, options);
  }

  /**
   * Search prompts
   */
  static async searchPrompts(
    searchTerm: string,
    options: PromptQueryOptions = {}
  ): Promise<{ data: Prompt[]; count: number; error?: string }> {
    return this.getPrompts({ search: searchTerm }, options);
  }

  /**
   * Get unique categories
   */
  static async getCategories(): Promise<{ data: string[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('prompts')
        .select('category')
        .order('category');

      if (error) {
        console.error('Error fetching categories:', error);
        return { data: [], error: error.message };
      }

      // Get unique categories
      const uniqueCategories = [...new Set(data?.map(item => item.category) || [])];
      return { data: uniqueCategories };
    } catch (error) {
      console.error('Error in getCategories:', error);
      return { data: [], error: 'Failed to fetch categories' };
    }
  }

  /**
   * Get unique tags
   */
  static async getTags(): Promise<{ data: string[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('prompts')
        .select('tags');

      if (error) {
        console.error('Error fetching tags:', error);
        return { data: [], error: error.message };
      }

      // Flatten and get unique tags
      const allTags = data?.flatMap(item => item.tags || []) || [];
      const uniqueTags = [...new Set(allTags)].sort();
      return { data: uniqueTags };
    } catch (error) {
      console.error('Error in getTags:', error);
      return { data: [], error: 'Failed to fetch tags' };
    }
  }

  /**
   * Get prompt statistics
   */
  static async getPromptStats(): Promise<{
    data: {
      total: number;
      free: number;
      paid: number;
      bySkillLevel: Record<string, number>;
      byCategory: Record<string, number>;
    };
    error?: string;
  }> {
    try {
      const { data, error } = await supabase
        .from('prompts')
        .select('access_type, skill_level, category');

      if (error) {
        console.error('Error fetching prompt stats:', error);
        return {
          data: { total: 0, free: 0, paid: 0, bySkillLevel: {}, byCategory: {} },
          error: error.message
        };
      }

      const stats = {
        total: data?.length || 0,
        free: data?.filter(p => p.access_type === 'free').length || 0,
        paid: data?.filter(p => p.access_type === 'paid').length || 0,
        bySkillLevel: {} as Record<string, number>,
        byCategory: {} as Record<string, number>
      };

      // Count by skill level
      data?.forEach(prompt => {
        stats.bySkillLevel[prompt.skill_level] = (stats.bySkillLevel[prompt.skill_level] || 0) + 1;
        stats.byCategory[prompt.category] = (stats.byCategory[prompt.category] || 0) + 1;
      });

      return { data: stats };
    } catch (error) {
      console.error('Error in getPromptStats:', error);
      return {
        data: { total: 0, free: 0, paid: 0, bySkillLevel: {}, byCategory: {} },
        error: 'Failed to fetch prompt statistics'
      };
    }
  }
}

// Hook for using prompt service with React
export const usePrompts = (filters: PromptFilters = {}, options: PromptQueryOptions = {}) => {
  const [prompts, setPrompts] = React.useState<Prompt[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const fetchPrompts = async () => {
      setLoading(true);
      setError(null);

      const result = await PromptService.getPrompts(filters, options);
      
      if (result.error) {
        setError(result.error);
      } else {
        setPrompts(result.data);
        setCount(result.count);
      }
      
      setLoading(false);
    };

    fetchPrompts();
  }, [JSON.stringify(filters), JSON.stringify(options)]);

  return { prompts, loading, error, count };
};

export default PromptService;
