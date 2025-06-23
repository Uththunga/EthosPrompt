import React, { useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../hooks/useDatabaseLoader';
import { ComponentLoadingSpinner } from './LoadingSpinner';
import * as LucideIcons from 'lucide-react';

// Icon mapping for database icon names to Lucide components
const iconMap: Record<string, React.ComponentType<any>> = {
  'Megaphone': LucideIcons.Megaphone,
  'GraduationCap': LucideIcons.GraduationCap,
  'Code': LucideIcons.Code,
  'ScrollText': LucideIcons.ScrollText,
  'Stethoscope': LucideIcons.Stethoscope,
  'UserCircle': LucideIcons.UserCircle,
  'BarChart2': LucideIcons.BarChart2,
  'MessageCircle': LucideIcons.MessageCircle,
  'Video': LucideIcons.Video,
  'DollarSign': LucideIcons.DollarSign,
  'ShoppingCart': LucideIcons.ShoppingCart,
  'Server': LucideIcons.Server,
  // Default fallback
  'BookOpen': LucideIcons.BookOpen
};

const CategoriesSection: React.FC = memo(() => {
  const navigate = useNavigate();
  const { data: categories, loading, error } = useCategories();
  const filteredCategories = useMemo(() => categories || [], [categories]);

  // Handle category click navigation
  const handleCategoryClick = useCallback((categoryId: string) => {
    window.scrollTo(0, 0);
    navigate(`/categories/${categoryId}`);
  }, [navigate]);

  // Handle loading state
  if (loading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center">
            <ComponentLoadingSpinner text="Loading categories..." />
          </div>
        </div>
      </section>
    );
  }

  // Handle error state
  if (error) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-400">Failed to Load Categories</h2>
            <p className="text-gray-400">Please try refreshing the page.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.1),transparent_50%)]" />
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
            const Icon = iconMap[category.icon] || iconMap['BookOpen'];

            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="relative w-full p-4 sm:p-5 lg:p-6 rounded-lg text-left transition-all duration-300 overflow-hidden border border-gray-700/50 hover:border-purple-500/50 bg-black/50 backdrop-blur-sm hover:bg-black/60 group active:scale-[0.98]"
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
});

// Add display name for debugging
CategoriesSection.displayName = 'CategoriesSection';

export default CategoriesSection;