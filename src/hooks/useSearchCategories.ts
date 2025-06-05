import { useState, useCallback, useMemo } from 'react';
import type { LucideIcon } from 'lucide-react';
import { categories } from '../data/categories-data';

interface Subcategory {
  id: string;
  name: string;
  description: string;
  examples: string[];
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  promptCount: number;
  subcategories: Subcategory[];
  bgGradient: string;
  trending?: boolean;
  featured?: boolean;
}

interface SearchResult {
  searchQuery: string;
  handleSearch: (query: string) => void;
  filteredCategories: Category[];
  totalResults: number;
  hasResults: boolean;
}

export const useSearchCategories = (): SearchResult => {
  const [searchQuery, setSearchQuery] = useState('');

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
  }, [searchQuery]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return {
    searchQuery,
    handleSearch,
    filteredCategories,
    totalResults: filteredCategories.length,
    hasResults: filteredCategories.length > 0
  };
};
