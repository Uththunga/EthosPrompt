import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from './ui/Button';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/categories-data';

const CategoriesSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'all' | 'trending' | 'featured'>('all');
  const navigate = useNavigate();

  const filteredCategories = categories.filter((category) => {
    const matchesSearch = 
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.subcategories.some(sub => 
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.examples.some(example => 
          example.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    
    const matchesViewMode = 
      viewMode === 'all' ||
      (viewMode === 'trending' && category.trending) ||
      (viewMode === 'featured' && category.featured);

    return matchesSearch && matchesViewMode;
  });

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.1),transparent_50%)]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Unlock Your Industry's Potential
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Discover AI prompts crafted specifically for your field
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-10">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search categories..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'all' ? 'primary' : 'outline'}
                  onClick={() => setViewMode('all')}
                  className="text-sm px-3 py-1"
                >
                  All
                </Button>
                <Button
                  variant={viewMode === 'trending' ? 'primary' : 'outline'}
                  onClick={() => setViewMode('trending')}
                  className="text-sm px-3 py-1"
                >
                  Trending
                </Button>
                <Button
                  variant={viewMode === 'featured' ? 'primary' : 'outline'}
                  onClick={() => setViewMode('featured')}
                  className="text-sm px-3 py-1"
                >
                  Featured
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate(`/categories/${category.id}`);
                }}
                className="relative w-full p-6 rounded-lg text-left transition-all duration-300 overflow-hidden border border-gray-700/50 hover:border-purple-500/50 bg-gray-800/30 backdrop-blur-sm hover:bg-gray-800/50 group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-800/50 rounded-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">{category.name}</h3>
                      <p className="text-sm text-gray-400">{category.promptCount} prompts</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 mb-2">{category.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories.slice(0, 2).map(sub => (
                      <span
                        key={sub.id}
                        className="text-xs px-2 py-1 rounded-full bg-gray-700/50 text-gray-300 border border-gray-600/50 group-hover:border-purple-500/20 transition-colors"
                      >
                        {sub.name}
                      </span>
                    ))}
                    {category.subcategories.length > 2 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-700/50 text-gray-400">
                        +{category.subcategories.length - 2} more
                      </span>
                    )}
                  </div>

                  {(category.trending || category.featured) && (
                    <div className="absolute top-4 right-4">
                      {category.trending && (
                        <span className="text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-300 mr-2">
                          Trending
                        </span>
                      )}
                      {category.featured && (
                        <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">
                          Featured
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <Search size={32} className="text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No matching categories found</h3>
            <p className="text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;