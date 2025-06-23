import { useState, useEffect, useCallback, useMemo } from 'react';
import categoryService, { CategoryWithSubcategories } from '../services/categoryService';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Map icon names to actual Lucide icons
const iconMap: { [key: string]: LucideIcon } = {
  'Megaphone': LucideIcons.Megaphone,
  'Video': LucideIcons.Video,
  'GraduationCap': LucideIcons.GraduationCap,
  'Code': LucideIcons.Code,
  'MessageCircle': LucideIcons.MessageCircle,
  'ScrollText': LucideIcons.ScrollText,
  'UserCircle': LucideIcons.UserCircle,
  'Stethoscope': LucideIcons.Stethoscope,
  'BarChart2': LucideIcons.BarChart2,
  'DollarSign': LucideIcons.DollarSign,
  'ShoppingCart': LucideIcons.ShoppingCart,
  'Server': LucideIcons.Server,
  'BookOpen': LucideIcons.BookOpen, // fallback
};

// Transform database category to match UI expectations
interface UICategory {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  promptCount: number;
  subcategories: UISubcategory[];
  bgGradient: string;
  trending?: boolean;
  featured?: boolean;
}

interface UISubcategory {
  id: string;
  name: string;
  description: string;
  examples: string[];
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface UseDatabaseCategoriesResult {
  categories: UICategory[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  handleSearch: (query: string) => void;
  filteredCategories: UICategory[];
  totalResults: number;
  hasResults: boolean;
  refetch: () => Promise<void>;
}

export const useDatabaseCategories = (): UseDatabaseCategoriesResult => {
  const [categories, setCategories] = useState<UICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Transform database category to UI category
  const transformCategory = useCallback((dbCategory: CategoryWithSubcategories): UICategory => {
    return {
      id: dbCategory.id,
      name: dbCategory.name,
      icon: iconMap[dbCategory.icon] || LucideIcons.BookOpen,
      description: dbCategory.description,
      promptCount: dbCategory.prompt_count,
      bgGradient: dbCategory.bg_gradient,
      trending: dbCategory.trending,
      featured: dbCategory.featured,
      subcategories: dbCategory.subcategories.map(sub => ({
        id: sub.id,
        name: sub.name,
        description: sub.description,
        examples: sub.examples,
        skillLevel: (sub.skill_level.charAt(0).toUpperCase() + sub.skill_level.slice(1)) as 'Beginner' | 'Intermediate' | 'Advanced'
      }))
    };
  }, []);

  // Fetch categories from database
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const dbCategories = await categoryService.getCategories(
        {}, // no filters
        { includeSubcategories: true } // include subcategories for display
      );

      const uiCategories = dbCategories.map(transformCategory);
      setCategories(uiCategories);

    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  }, [transformCategory]);

  // Initial load
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Filter categories based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories;

    const query = searchQuery.toLowerCase();
    return categories.filter((category) => {
      const matchesBasic = 
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query);

      const matchesSubcategories = category.subcategories.some((sub) => 
        sub.name.toLowerCase().includes(query) ||
        sub.description.toLowerCase().includes(query) ||
        sub.examples.some((example) => example.toLowerCase().includes(query))
      );

      return matchesBasic || matchesSubcategories;
    });
  }, [categories, searchQuery]);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Refetch function for manual refresh
  const refetch = useCallback(async () => {
    await fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    searchQuery,
    handleSearch,
    filteredCategories,
    totalResults: filteredCategories.length,
    hasResults: filteredCategories.length > 0,
    refetch
  };
};
