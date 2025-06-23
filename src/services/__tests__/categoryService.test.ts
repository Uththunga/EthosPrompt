import { describe, it, expect, vi, beforeEach } from 'vitest';
import categoryService from '../categoryService';
import { supabase } from '../../lib/supabase';

// Mock Supabase
vi.mock('../../lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => ({
          eq: vi.fn(() => Promise.resolve({ data: [], error: null }))
        }))
      }))
    }))
  }
}));

describe('CategoryService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCategories', () => {
    it('should fetch categories successfully', async () => {
      const mockCategories = [
        {
          id: 'marketing',
          name: 'Marketing & Content',
          icon: 'Megaphone',
          description: 'Marketing strategies and content creation',
          prompt_count: 10,
          bg_gradient: 'from-purple-600/20 to-pink-600/20',
          trending: false,
          featured: true,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        }
      ];

      const mockSupabaseChain = {
        select: vi.fn(() => ({
          order: vi.fn(() => Promise.resolve({ data: mockCategories, error: null }))
        }))
      };

      vi.mocked(supabase.from).mockReturnValue(mockSupabaseChain as any);

      const result = await categoryService.getCategories();

      expect(supabase.from).toHaveBeenCalledWith('categories');
      expect(mockSupabaseChain.select).toHaveBeenCalledWith('*');
      expect(result).toEqual([
        {
          ...mockCategories[0],
          subcategories: []
        }
      ]);
    });

    it('should handle database errors gracefully', async () => {
      const mockError = new Error('Database connection failed');
      
      const mockSupabaseChain = {
        select: vi.fn(() => ({
          order: vi.fn(() => Promise.resolve({ data: null, error: mockError }))
        }))
      };

      vi.mocked(supabase.from).mockReturnValue(mockSupabaseChain as any);

      await expect(categoryService.getCategories()).rejects.toThrow('Database connection failed');
    });

    it('should apply trending filter when specified', async () => {
      const mockSupabaseChain = {
        select: vi.fn(() => ({
          order: vi.fn(() => ({
            eq: vi.fn(() => Promise.resolve({ data: [], error: null }))
          }))
        }))
      };

      vi.mocked(supabase.from).mockReturnValue(mockSupabaseChain as any);

      await categoryService.getCategories({ trending: true });

      expect(mockSupabaseChain.select().order().eq).toHaveBeenCalledWith('trending', true);
    });

    it('should apply featured filter when specified', async () => {
      const mockSupabaseChain = {
        select: vi.fn(() => ({
          order: vi.fn(() => ({
            eq: vi.fn(() => Promise.resolve({ data: [], error: null }))
          }))
        }))
      };

      vi.mocked(supabase.from).mockReturnValue(mockSupabaseChain as any);

      await categoryService.getCategories({ featured: true });

      expect(mockSupabaseChain.select().order().eq).toHaveBeenCalledWith('featured', true);
    });
  });

  describe('getCategoryById', () => {
    it('should fetch a single category by ID', async () => {
      const mockCategory = {
        id: 'marketing',
        name: 'Marketing & Content',
        icon: 'Megaphone',
        description: 'Marketing strategies and content creation',
        prompt_count: 10,
        bg_gradient: 'from-purple-600/20 to-pink-600/20',
        trending: false,
        featured: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      };

      const mockSupabaseChain = {
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn(() => Promise.resolve({ data: mockCategory, error: null }))
          }))
        }))
      };

      vi.mocked(supabase.from).mockReturnValue(mockSupabaseChain as any);

      const result = await categoryService.getCategoryById('marketing');

      expect(supabase.from).toHaveBeenCalledWith('categories');
      expect(mockSupabaseChain.select).toHaveBeenCalledWith('*');
      expect(mockSupabaseChain.select().eq).toHaveBeenCalledWith('id', 'marketing');
      expect(result).toEqual({
        ...mockCategory,
        subcategories: []
      });
    });

    it('should return null when category not found', async () => {
      const mockSupabaseChain = {
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn(() => Promise.resolve({ data: null, error: null }))
          }))
        }))
      };

      vi.mocked(supabase.from).mockReturnValue(mockSupabaseChain as any);

      const result = await categoryService.getCategoryById('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('searchCategories', () => {
    it('should search categories by name and description', async () => {
      const mockCategories = [
        {
          id: 'marketing',
          name: 'Marketing & Content',
          icon: 'Megaphone',
          description: 'Marketing strategies and content creation',
          prompt_count: 10,
          bg_gradient: 'from-purple-600/20 to-pink-600/20',
          trending: false,
          featured: true,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        }
      ];

      const mockSupabaseChain = {
        select: vi.fn(() => ({
          or: vi.fn(() => ({
            order: vi.fn(() => Promise.resolve({ data: mockCategories, error: null }))
          }))
        }))
      };

      vi.mocked(supabase.from).mockReturnValue(mockSupabaseChain as any);

      const result = await categoryService.searchCategories('marketing');

      expect(supabase.from).toHaveBeenCalledWith('categories');
      expect(mockSupabaseChain.select).toHaveBeenCalledWith('*');
      expect(mockSupabaseChain.select().or).toHaveBeenCalledWith('name.ilike.%marketing%,description.ilike.%marketing%');
      expect(result).toEqual([
        {
          ...mockCategories[0],
          subcategories: []
        }
      ]);
    });
  });

  describe('updateCategoryPromptCount', () => {
    it('should update category prompt count based on actual prompts', async () => {
      // Mock count query
      const mockCountChain = {
        select: vi.fn(() => ({
          eq: vi.fn(() => Promise.resolve({ count: 5, error: null }))
        }))
      };

      // Mock update query
      const mockUpdateChain = {
        update: vi.fn(() => ({
          eq: vi.fn(() => Promise.resolve({ error: null }))
        }))
      };

      vi.mocked(supabase.from)
        .mockReturnValueOnce(mockCountChain as any) // First call for counting
        .mockReturnValueOnce(mockUpdateChain as any); // Second call for updating

      await categoryService.updateCategoryPromptCount('marketing');

      expect(supabase.from).toHaveBeenCalledWith('prompts');
      expect(mockCountChain.select).toHaveBeenCalledWith('*', { count: 'exact', head: true });
      expect(mockCountChain.select().eq).toHaveBeenCalledWith('category_id', 'marketing');

      expect(supabase.from).toHaveBeenCalledWith('categories');
      expect(mockUpdateChain.update).toHaveBeenCalledWith({ prompt_count: 5 });
      expect(mockUpdateChain.update().eq).toHaveBeenCalledWith('id', 'marketing');
    });
  });
});
