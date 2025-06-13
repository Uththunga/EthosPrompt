import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/categories-data';

const CategoriesSection: React.FC = () => {
  const navigate = useNavigate();
  const filteredCategories = categories;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.1),transparent_50%)]"></div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 sm:mb-12 px-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-white">
            Unlock Your Industry's Potential
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Discover AI prompts crafted specifically for your field
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate(`/categories/${category.id}`);
                }}
                className="relative w-full p-4 sm:p-5 lg:p-6 rounded-lg text-left transition-all duration-300 overflow-hidden border border-gray-700/50 hover:border-purple-500/50 bg-gray-800/30 backdrop-blur-sm hover:bg-gray-800/50 group active:scale-[0.98]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div className="p-1.5 sm:p-2 bg-gray-800/50 rounded-lg">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-purple-300 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400">{category.promptCount} prompts</p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 mb-2 sm:mb-3 line-clamp-2">
                    {category.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {category.subcategories.slice(0, 2).map(sub => (
                      <span
                        key={sub.id}
                        className="text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded-full bg-gray-700/50 text-gray-300 border border-gray-600/50 group-hover:border-purple-500/20 transition-colors"
                      >
                        {sub.name}
                      </span>
                    ))}
                    {category.subcategories.length > 2 && (
                      <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded-full bg-gray-700/50 text-gray-400">
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


      </div>
    </section>
  );
};

export default CategoriesSection;