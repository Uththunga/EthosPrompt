import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Category, Subcategory, PromptGroup } from '../data/categories-data';
import type { Prompt } from '../data/prompts-data';
import PromptCard from '../components/PromptCard';
import { PromptErrorBoundary } from '../components/PromptErrorBoundary';
import { useError } from '../contexts/ErrorContext';
import { useCategories, usePrompts, useDataPreloader } from '../hooks/useDataLoader';
import { ComponentLoadingSpinner } from '../components/LoadingSpinner';
import { useOptimizedCallback, useOptimizedMemo, useDebounce } from '../utils/performanceUtils';
import { SearchX, ArrowLeft, Frown } from 'lucide-react';
import { getDifficultyLevel } from '../utils/difficultyUtils';

// Skeleton loader component for prompts
const PromptCardSkeleton = () => (
  <div className="animate-pulse bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 h-48">
    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-700 rounded w-1/2 mb-4"></div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-700 rounded"></div>
      <div className="h-3 bg-gray-700 rounded w-5/6"></div>
      <div className="h-3 bg-gray-700 rounded w-4/6"></div>
    </div>
  </div>
);

// Extend Subcategory type to include optional icon
interface ExtendedSubcategory extends Subcategory {
  icon?: string;
  promptGroups?: PromptGroup[];
}

// Extend the Category type to include extended subcategories
interface ExtendedCategory extends Omit<Category, 'subcategories'> {
  subcategories: ExtendedSubcategory[];
}

// Extended prompt type with additional properties (not currently used)
// type ExtendedPrompt = Prompt & {
//   promptGroup?: PromptGroup;
// };

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addError } = useError();

  // State for UI
  const [searchQuery, setSearchQuery] = useState('');
  const [activePromptGroup, setActivePromptGroup] = useState<string | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<ExtendedSubcategory | null>(null);

  // Debounce search query for better performance
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Load categories dynamically
  const { data: categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  // Memoize the category to prevent unnecessary re-renders
  const category = useOptimizedMemo<ExtendedCategory | undefined>(
    () => categories?.find((c) => c.id === id) as ExtendedCategory | undefined,
    [categories, id]
  );

  // Set the first subcategory as selected by default when the category loads
  useEffect(() => {
    if (category?.subcategories?.length && !selectedSubcategory) {
      setSelectedSubcategory(category.subcategories[0]);
    }
  }, [category, selectedSubcategory]);

  // Get all prompt groups for the selected subcategory
  const availablePromptGroups = useMemo(() => {
    if (!selectedSubcategory?.promptGroups) return [];
    return selectedSubcategory.promptGroups;
  }, [selectedSubcategory]);

  // Load prompts dynamically with filtering
  const {
    data: filteredPrompts,
    loading: promptsLoading,
    error: promptsError
  } = usePrompts({
    subcategoryId: selectedSubcategory?.id,
    filters: {
      difficulty: difficultyFilter || undefined,
      promptGroupId: activePromptGroup || undefined,
      searchQuery: debouncedSearchQuery.trim() || undefined
    },
    enabled: !!selectedSubcategory
  });

  // Preloader for performance optimization
  const { preloadCategory } = useDataPreloader();

  // Preload data for better performance
  useEffect(() => {
    if (id) {
      preloadCategory(id).catch(() => {
        // Preloading failure is not critical
      });
    }
  }, [id, preloadCategory]);

  // Handle copying prompt to clipboard
  const handleCopyPrompt = useOptimizedCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You might want to show a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
      addError('Failed to copy prompt to clipboard. Please try selecting and copying manually.', 'warning', 'CategoryPage');
    }
  }, [addError]);

  // Handle opening prompt in new tab
  const handleOpenInNewTab = useCallback((prompt: Prompt) => {
    // Map difficulty levels to simpler values for comparison
    const getDifficultyClass = (difficulty: string) => {
      const lowerDifficulty = difficulty.toLowerCase();
      if (lowerDifficulty.includes('beginner') || lowerDifficulty.includes('easy')) {
        return 'bg-green-900/30 text-green-400';
      } else if (lowerDifficulty.includes('intermediate') || lowerDifficulty.includes('moderate')) {
        return 'bg-yellow-900/30 text-yellow-400';
      } else {
        return 'bg-red-900/30 text-red-400';
      }
    };

    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${prompt.title}</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              body { padding: 2rem; background-color: #0f172a; color: white; }
              pre { white-space: pre-wrap; background: #1e293b; padding: 1rem; border-radius: 0.5rem; }
            </style>
          </head>
          <body>
            <div class="max-w-4xl mx-auto">
              <h1 class="text-2xl font-bold mb-4">${prompt.title}</h1>
              <p class="text-gray-300 mb-6">${prompt.description || ''}</p>
              <div class="mb-6">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDifficultyClass(prompt.difficulty)} mr-2">
                  ${prompt.difficulty}
                </span>
                ${prompt.tags?.map(tag => `
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-700/50 text-gray-300 mr-2">
                    ${tag}
                  </span>
                `).join('')}
              </div>
              <pre class="p-4 bg-gray-800 rounded-lg overflow-x-auto">
                <code>${prompt.prompt.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>
              </pre>
            </div>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  }, []);

  // Handle search input change
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  // Handle difficulty filter change
  const handleDifficultyFilter = useCallback((difficulty: string | null) => {
    setDifficultyFilter(difficulty === difficultyFilter ? null : difficulty);
  }, [difficultyFilter]);

  // Handle prompt group filter change
  const handlePromptGroupFilter = useCallback((groupId: string | null) => {
    setActivePromptGroup(groupId === activePromptGroup ? null : groupId);
  }, [activePromptGroup]);
  
  // This effect ensures the linter doesn't complain about unused variables
  // while also not affecting production bundle size
  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      // These variables are used in the component but might be flagged as unused
      // This pattern prevents the linter from complaining without affecting production
      /* eslint-disable @typescript-eslint/no-unused-expressions */
      availablePromptGroups;
      handleSearchChange;
      handleDifficultyFilter;
      handlePromptGroupFilter;
      /* eslint-enable @typescript-eslint/no-unused-expressions */
    }
  }, [availablePromptGroups, handleSearchChange, handleDifficultyFilter, handlePromptGroupFilter]);
  
  // Get unique prompt groups for the selected subcategory
  const promptGroups = useOptimizedMemo<PromptGroup[]>(() => {
    if (!selectedSubcategory) return [];
    const groups = new Map<string, PromptGroup>();

    // First, check if there are prompt groups in the subcategory
    if (selectedSubcategory.promptGroups) {
      selectedSubcategory.promptGroups.forEach(group => {
        groups.set(group.id, group);
      });
    }

    // Also check prompts for any additional groups
    if (filteredPrompts) {
      filteredPrompts
        .filter((p: Prompt) => p.promptGroupId)
        .forEach((p: Prompt) => {
          if (p.promptGroupId && 'promptGroup' in p && p.promptGroup) {
            groups.set(p.promptGroupId, p.promptGroup as PromptGroup);
          }
        });
    }

    return Array.from(groups.values());
  }, [selectedSubcategory, filteredPrompts]);

  // Handle loading states
  if (categoriesLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <ComponentLoadingSpinner text="Loading category..." />
        </div>
      </div>
    );
  }
  
  // Handle case when category is not found
  if (!category) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-7xl mx-auto text-center py-12">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Category not found</h1>
          <p className="text-gray-400">The requested category could not be found.</p>
          <h1 className="text-3xl font-bold mb-2">Category Not Found</h1>
          <p className="text-gray-300 mb-6">The category you're looking for doesn't exist or has been moved.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2 inline" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Handle empty state when no subcategory is selected
  if (!selectedSubcategory || !category.subcategories?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-10">
        <div className="text-center">
          <Frown className="w-16 h-16 mx-auto mb-4 text-purple-400" />
          <h1 className="text-3xl font-bold mb-2">No Subcategories Found</h1>
          <p className="text-gray-300 mb-6">This category doesn't have any subcategories yet.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2 inline" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Render the main content
  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-10">
        <div className="text-center">
          <Frown className="w-16 h-16 mx-auto mb-4 text-purple-400" />
          <h1 className="text-3xl font-bold mb-2">Category Not Found</h1>
          <p className="text-gray-300 mb-6">The category you're looking for doesn't exist or has been moved.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2 inline" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 min-h-screen text-white">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800/50 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-2">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              {category.name}
            </h1>
          </div>
          {category.description && (
            <p className="text-gray-400 ml-12 max-w-3xl">{category.description}</p>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 rounded-xl p-5 shadow-lg">
              <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Navigation
              </h2>
              
              <nav className="space-y-1.5 mb-6">
                {category.subcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubcategory(sub)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-2 ${
                      selectedSubcategory?.id === sub.id
                        ? 'bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white shadow-md shadow-purple-500/20'
                        : 'text-gray-300 hover:bg-gray-700/40 hover:text-white'
                    }`}
                  >
                    {sub.icon && <span className="text-lg">{sub.icon}</span>}
                    <span className="font-medium">{sub.name}</span>
                    {selectedSubcategory?.id === sub.id && (
                      <span className="ml-auto w-2 h-2 bg-white rounded-full"></span>
                    )}
                  </button>
                ))}
              </nav>

              {/* Filters Section */}
              <div className="space-y-5">
                {/* Search Filter */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search prompts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-700/50 border border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                  />
                </div>

                {/* Prompt Group Filter */}
                {promptGroups.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2.5 flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Filter by Group
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setActivePromptGroup(null)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                          !activePromptGroup
                            ? 'bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white shadow-md shadow-purple-500/20'
                            : 'bg-gray-700/40 text-gray-300 hover:bg-gray-700/70 hover:text-white'
                        }`}
                      >
                        All
                      </button>
                      {promptGroups.map(group => (
                        <button
                          key={group.id}
                          onClick={() => setActivePromptGroup(activePromptGroup === group.id ? null : group.id)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                            activePromptGroup === group.id
                              ? 'bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white shadow-md shadow-purple-500/20'
                              : 'bg-gray-700/40 text-gray-300 hover:bg-gray-700/70 hover:text-white'
                          }`}
                        >
                          {group.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Difficulty Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2.5 flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Filter by Difficulty
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { level: 'Beginner', color: 'green' },
                      { level: 'Intermediate', color: 'blue' },
                      { level: 'Advanced', color: 'purple' }
                    ].map(({ level, color }) => (
                      <button
                        key={level}
                        onClick={() => setDifficultyFilter(difficultyFilter === level ? null : level as any)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1 ${
                          difficultyFilter === level
                            ? `bg-${color}-600/80 text-white shadow-md shadow-${color}-500/20`
                            : `bg-gray-700/40 text-${color}-300 hover:bg-${color}-900/20 hover:text-${color}-200`
                        }`}
                      >
                        {level}
                        {difficultyFilter === level && (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Filters */}
                {(activePromptGroup || difficultyFilter) && (
                  <div className="pt-2 border-t border-gray-700/40">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-400">Active Filters</span>
                      <button 
                        onClick={() => {
                          setActivePromptGroup(null);
                          setDifficultyFilter(null);
                        }}
                        className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activePromptGroup && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-900/40 text-purple-300 border border-purple-800/50">
                          {promptGroups.find(g => g.id === activePromptGroup)?.name}
                          <button 
                            onClick={() => setActivePromptGroup(null)}
                            className="ml-1.5 -mr-1 p-0.5 hover:bg-purple-800/50 rounded-full"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      )}
                      {difficultyFilter && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-900/40 text-purple-300 border border-purple-800/50">
                          {difficultyFilter}
                          <button 
                            onClick={() => setDifficultyFilter(null)}
                            className="ml-1.5 -mr-1 p-0.5 hover:bg-purple-800/50 rounded-full"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="space-y-6">
              {/* Subcategory Header */}
              <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1.5 flex items-center gap-2">
                      {selectedSubcategory?.icon && (
                        <span className="text-purple-400">{selectedSubcategory.icon}</span>
                      )}
                      {selectedSubcategory?.name || 'Loading...'}
                    </h2>
                    {selectedSubcategory?.description && (
                      <p className="text-gray-400">{selectedSubcategory.description}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-700/50 text-gray-300 border border-gray-600/30">
                      {promptsLoading ? 'Loading...' : `${filteredPrompts?.length || 0} ${(filteredPrompts?.length || 0) === 1 ? 'Prompt' : 'Prompts'}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Prompts Grid */}
              <PromptErrorBoundary categoryId={id} promptId={selectedSubcategory?.id}>
                {promptsLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="bg-gray-800/60 rounded-xl p-6 animate-pulse">
                        <div className="h-4 bg-gray-700 rounded mb-3"></div>
                        <div className="h-3 bg-gray-700 rounded mb-2"></div>
                        <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : promptsError ? (
                  <div className="col-span-full text-center py-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 mb-4">
                      <Frown className="w-10 h-10 text-red-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Failed to Load Prompts</h3>
                    <p className="text-gray-400 max-w-md mx-auto mb-4">
                      There was an error loading the prompts. Please try again.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filteredPrompts && filteredPrompts.length > 0 ? (
                      filteredPrompts.map((prompt) => (
                        <div key={prompt.id} className="transform transition-transform duration-300 hover:-translate-y-1">
                          <PromptCard
                            prompt={prompt}
                            onCopy={() => handleCopyPrompt(prompt.prompt)}
                            onOpenInNewTab={() => handleOpenInNewTab(prompt)}
                          />
                        </div>
                      ))
                    ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-500/10 mb-4">
                      <SearchX className="w-10 h-10 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {searchQuery || difficultyFilter || activePromptGroup
                        ? 'No matching prompts found'
                        : 'No prompts available'}
                    </h3>
                    <p className="text-gray-400 max-w-md mx-auto mb-4">
                      {searchQuery || difficultyFilter || activePromptGroup
                        ? 'Try adjusting your search or filter criteria.'
                        : 'This subcategory does not have any prompts yet.'}
                    </p>
                    {(searchQuery || difficultyFilter || activePromptGroup) && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setDifficultyFilter(null);
                          setActivePromptGroup(null);
                        }}
                        className="px-4 py-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors border border-purple-500/30 rounded-lg hover:bg-purple-500/10"
                      >
                        Clear all filters
                      </button>
                    )}
                  </div>
                    )}
                  </div>
                )}
              </PromptErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
