import { supabase } from '../lib/supabase';
import type { Category, Subcategory, PromptGroup, Prompt } from '../lib/supabase';

export interface CategoryWithSubcategories extends Category {
  subcategories: SubcategoryWithPromptGroups[];
}

export interface SubcategoryWithPromptGroups extends Subcategory {
  promptGroups?: PromptGroup[];
}

export interface CategoryFilters {
  trending?: boolean;
  featured?: boolean;
  skillLevel?: 'beginner' | 'intermediate' | 'advanced';
}

export interface CategoryQueryOptions {
  includeSubcategories?: boolean;
  includePromptGroups?: boolean;
  includePromptCounts?: boolean;
}

class CategoryService {
  /**
   * Get all categories with optional filtering
   */
  async getCategories(
    filters: CategoryFilters = {},
    options: CategoryQueryOptions = {}
  ): Promise<CategoryWithSubcategories[]> {
    try {
      let query = supabase
        .from('categories')
        .select('*')
        .order('name');

      // Apply filters
      if (filters.trending !== undefined) {
        query = query.eq('trending', filters.trending);
      }
      if (filters.featured !== undefined) {
        query = query.eq('featured', filters.featured);
      }

      const { data: categories, error } = await query;

      if (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }

      if (!categories) {
        return [];
      }

      // If we need subcategories, fetch them
      if (options.includeSubcategories) {
        const categoriesWithSubcategories = await Promise.all(
          categories.map(async (category) => {
            const subcategories = await this.getSubcategoriesByCategory(
              category.id,
              { includePromptGroups: options.includePromptGroups }
            );
            
            // Filter subcategories by skill level if specified
            const filteredSubcategories = filters.skillLevel
              ? subcategories.filter(sub => sub.skill_level === filters.skillLevel)
              : subcategories;

            return {
              ...category,
              subcategories: filteredSubcategories
            };
          })
        );

        return categoriesWithSubcategories;
      }

      return categories.map(category => ({
        ...category,
        subcategories: []
      }));

    } catch (error) {
      console.error('Error in getCategories:', error);
      throw error;
    }
  }

  /**
   * Get a single category by ID
   */
  async getCategoryById(
    id: string,
    options: CategoryQueryOptions = {}
  ): Promise<CategoryWithSubcategories | null> {
    try {
      const { data: category, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching category:', error);
        throw error;
      }

      if (!category) {
        return null;
      }

      // Get subcategories if requested
      const subcategories = options.includeSubcategories
        ? await this.getSubcategoriesByCategory(
            category.id,
            { includePromptGroups: options.includePromptGroups }
          )
        : [];

      return {
        ...category,
        subcategories
      };

    } catch (error) {
      console.error('Error in getCategoryById:', error);
      throw error;
    }
  }

  /**
   * Get subcategories for a specific category
   */
  async getSubcategoriesByCategory(
    categoryId: string,
    options: { includePromptGroups?: boolean } = {}
  ): Promise<SubcategoryWithPromptGroups[]> {
    try {
      const { data: subcategories, error } = await supabase
        .from('subcategories')
        .select('*')
        .eq('category_id', categoryId)
        .order('name');

      if (error) {
        console.error('Error fetching subcategories:', error);
        throw error;
      }

      if (!subcategories) {
        return [];
      }

      // Get prompt groups if requested
      if (options.includePromptGroups) {
        const subcategoriesWithGroups = await Promise.all(
          subcategories.map(async (subcategory) => {
            const promptGroups = await this.getPromptGroupsBySubcategory(subcategory.id);
            return {
              ...subcategory,
              promptGroups
            };
          })
        );

        return subcategoriesWithGroups;
      }

      return subcategories.map(subcategory => ({
        ...subcategory,
        promptGroups: []
      }));

    } catch (error) {
      console.error('Error in getSubcategoriesByCategory:', error);
      throw error;
    }
  }

  /**
   * Get prompt groups for a specific subcategory
   */
  async getPromptGroupsBySubcategory(subcategoryId: string): Promise<PromptGroup[]> {
    try {
      const { data: promptGroups, error } = await supabase
        .from('prompt_groups')
        .select('*')
        .eq('subcategory_id', subcategoryId)
        .order('name');

      if (error) {
        console.error('Error fetching prompt groups:', error);
        throw error;
      }

      return promptGroups || [];

    } catch (error) {
      console.error('Error in getPromptGroupsBySubcategory:', error);
      throw error;
    }
  }

  /**
   * Get prompts for a specific category
   */
  async getPromptsByCategory(
    categoryId: string,
    options: {
      subcategoryId?: string;
      promptGroupId?: string;
      skillLevel?: 'beginner' | 'intermediate' | 'advanced';
      accessType?: 'free' | 'paid';
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<Prompt[]> {
    try {
      let query = supabase
        .from('prompts')
        .select('*')
        .eq('category_id', categoryId);

      // Apply filters
      if (options.subcategoryId) {
        query = query.eq('subcategory_id', options.subcategoryId);
      }
      if (options.promptGroupId) {
        query = query.eq('prompt_group_id', options.promptGroupId);
      }
      if (options.skillLevel) {
        query = query.eq('skill_level', options.skillLevel);
      }
      if (options.accessType) {
        query = query.eq('access_type', options.accessType);
      }

      // Apply pagination
      if (options.limit) {
        query = query.limit(options.limit);
      }
      if (options.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
      }

      query = query.order('created_at', { ascending: false });

      const { data: prompts, error } = await query;

      if (error) {
        console.error('Error fetching prompts:', error);
        throw error;
      }

      return prompts || [];

    } catch (error) {
      console.error('Error in getPromptsByCategory:', error);
      throw error;
    }
  }

  /**
   * Search categories by name or description
   */
  async searchCategories(searchTerm: string): Promise<CategoryWithSubcategories[]> {
    try {
      const { data: categories, error } = await supabase
        .from('categories')
        .select('*')
        .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .order('name');

      if (error) {
        console.error('Error searching categories:', error);
        throw error;
      }

      return (categories || []).map(category => ({
        ...category,
        subcategories: []
      }));

    } catch (error) {
      console.error('Error in searchCategories:', error);
      throw error;
    }
  }

  /**
   * Update category prompt count
   */
  async updateCategoryPromptCount(categoryId: string): Promise<void> {
    try {
      // Count prompts in this category
      const { count, error: countError } = await supabase
        .from('prompts')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', categoryId);

      if (countError) {
        console.error('Error counting prompts:', countError);
        throw countError;
      }

      // Update the category
      const { error: updateError } = await supabase
        .from('categories')
        .update({ prompt_count: count || 0 })
        .eq('id', categoryId);

      if (updateError) {
        console.error('Error updating category prompt count:', updateError);
        throw updateError;
      }

    } catch (error) {
      console.error('Error in updateCategoryPromptCount:', error);
      throw error;
    }
  }
}

export default new CategoryService();
