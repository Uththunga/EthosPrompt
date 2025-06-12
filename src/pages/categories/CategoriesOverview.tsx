import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useSearchCategories } from '../../hooks/useSearchCategories';
import type { LucideIcon } from 'lucide-react';

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

const CategoriesOverview: React.FC = () => {
  const navigate = useNavigate();
  const { searchQuery, handleSearch, filteredCategories, totalResults } = useSearchCategories();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pb-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          All Categories
        </h1>
        <p className="text-lg sm:text-xl text-gray-400">
          Browse our complete collection of AI prompt categories
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-10">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
          <div className="relative">
            <input
              type="text"
              placeholder="Search all categories..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          {searchQuery && (
            <div className="mt-2 text-sm text-gray-400">
              Found {totalResults} {totalResults === 1 ? 'category' : 'categories'}
            </div>
          )}
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((category: Category) => {
          const Icon = category.icon;
          return (
            <Card
              key={category.id}
              className="relative overflow-hidden hover:border-purple-500/50 transition-all duration-300 group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
              
              <div className="relative p-4 sm:p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gray-800/50">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {category.name}
                    </h2>
                    <p className="text-gray-400">
                      {category.promptCount} prompts available
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-300 mb-3">
                  {category.description}
                </p>

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Popular Categories:</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories.map((sub: Subcategory) => (
                      <span
                        key={sub.id}
                        className="text-sm px-3 py-1 rounded-full bg-gray-700/50 text-gray-300 border border-gray-600/50 group-hover:border-purple-500/20 transition-colors"
                      >
                        {sub.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">                  <Button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate(`/categories/${category.id}`);
                    }}
                    className="group hover:bg-purple-500"
                  >
                    Explore Prompts
                  </Button>
                  <div className="flex gap-2">
                    {category.trending && (
                      <span className="text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-300">
                        Trending
                      </span>
                    )}
                    {category.featured && (
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-16">
          <Search size={48} className="text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">No matching categories found</h3>
          <p className="text-gray-400">
            Try adjusting your search terms or browse all categories
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoriesOverview;
