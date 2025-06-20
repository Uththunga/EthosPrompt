import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import type { Category, Subcategory } from '../data/categories-data';
import { categories } from '../data/categories-data';
import type { Prompt } from '../data/prompts-data';
import { prompts } from '../data/prompts-data';
import { X, Frown, ArrowLeft, SearchX } from 'lucide-react';

type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'All';

interface PromptCardProps {
  prompt: Prompt;
  onCopy: (text: string) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onCopy }) => (
  <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 mb-4">
    <h3 className="text-lg font-medium text-white">{prompt.title || 'Untitled Prompt'}</h3>
    <p className="text-gray-300 mt-2">{prompt.prompt}</p>
    <div className="mt-3 flex items-center justify-between text-sm text-gray-400">
      <span className="px-2 py-1 bg-gray-700/50 rounded-full">
        {prompt.difficulty || 'Unknown'}
      </span>
      <button 
        onClick={() => onCopy(prompt.prompt)}
        className="text-indigo-400 hover:text-indigo-300"
      >
        Copy
      </button>
    </div>
  </div>
);

const PromptCardSkeleton = () => (
  <div className="animate-pulse space-y-4 p-6 border rounded-lg bg-gray-800/50 border-gray-700">
    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
    <div className="h-4 bg-gray-700 rounded"></div>
    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
  </div>
);

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  
  // State
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [activePromptGroup, setActivePromptGroup] = useState<string>(
    searchParams.get('group') || 'all'
  );
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | null>(
    (searchParams.get('difficulty') as Difficulty) || null
  );
  
  // Get category data
  const category = useMemo<Category | undefined>(
    () => categories.find(c => c.id === id),
    [id]
  );
  
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  
  // Set default subcategory when category loads
  useEffect(() => {
    if (category?.subcategories?.[0]) {
      setSelectedSubcategory(category.subcategories[0]);
      setIsLoading(false);
    }
  }, [category]);

  // Update URL when filters change
  const updateSearchParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    window.history.replaceState(null, '', `?${params.toString()}`);
  };

  // Update URL when filters change
  useEffect(() => {
    updateSearchParams({
      q: searchQuery || null,
      group: activePromptGroup === 'all' ? null : activePromptGroup,
      difficulty: difficultyFilter || null
    });
  }, [searchQuery, activePromptGroup, difficultyFilter]);
  
  // Handle copying prompt text
  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };
  
  // Filter and group prompts
  const { filteredPrompts, promptGroups } = useMemo(() => {
    if (!selectedSubcategory) {
      return { filteredPrompts: [], promptGroups: [] };
    }
    
    // Filter by subcategory
    let filtered = prompts.filter(p => p.subcategoryId === selectedSubcategory.id);
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.prompt.toLowerCase().includes(query) ||
        (p.title && p.title.toLowerCase().includes(query))
      );
    }
    
    // Apply difficulty filter
    if (difficultyFilter && difficultyFilter !== 'All') {
      filtered = filtered.filter(p => p.difficulty === difficultyFilter);
    }
    
    // Group prompts by prompt group
    const groups = new Map<string, { name: string; count: number }>();
    groups.set('all', { name: 'All Prompts', count: filtered.length });
    
    filtered.forEach(prompt => {
      if (prompt.promptGroupId) {
        const group = groups.get(prompt.promptGroupId) || { 
          name: prompt.promptGroupId, 
          count: 0 
        };
        groups.set(prompt.promptGroupId, {
          name: group.name,
          count: group.count + 1
        });
      }
    });
    
    // Apply group filter
    if (activePromptGroup && activePromptGroup !== 'all') {
      filtered = filtered.filter(p => p.promptGroupId === activePromptGroup);
    }
    
    return {
      filteredPrompts: filtered,
      promptGroups: Array.from(groups.entries()).map(([id, { name, count }]) => ({
        id,
        name,
        count
      }))
    };
  }, [selectedSubcategory, searchQuery, difficultyFilter, activePromptGroup]);
  
  // Handle difficulty filter change
  const handleDifficultyChange = (level: string) => {
    setDifficultyFilter(level === 'All' ? null : level as Difficulty);
  };

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (difficultyFilter) params.set('difficulty', difficultyFilter);
    if (activePromptGroup) params.set('group', activePromptGroup);
    setSearchParams(params, { replace: true });
  }, [searchQuery, difficultyFilter, activePromptGroup, setSearchParams]);

  // Update selected subcategory when category changes
  useEffect(() => {
    if (category?.subcategories?.[0]) {
      setSelectedSubcategory(category.subcategories[0]);
    } else {
      setSelectedSubcategory(null);
    }
  }, [category]);

  // Reset filters and handle loading state when subcategory changes
  useEffect(() => {
    setLoading(true);
    setActivePromptGroup(null);
    setDifficultyFilter(null);
    setSearchQuery('');

    // Simulate data fetching
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedSubcategory]);

  // Handle prompt copy
  const handleCopyPrompt = async (promptText: string) => {
    try {
      await navigator.clipboard.writeText(promptText);
      // You can add a toast notification here if needed
    } catch (error) {
      console.error('Failed to copy text:', error);
      // Optionally show error to user
    }
  };

  // Handle open in new tab
  const handleOpenInNewTab = (promptText: string) => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Prompt Details</title>
            <script src="https://cdn.tailwindcss.com"></script>
          </head>
          <body class="bg-gray-900 text-white p-6">
            <pre class="whitespace-pre-wrap font-mono text-sm">${promptText}</pre>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  // Filter and group prompts
  const { filteredPrompts, promptGroups } = useMemo(() => {
    if (!selectedSubcategory) {
      return { filteredPrompts: [], promptGroups: [] };
    }
    
    // Filter prompts by subcategory
    let filtered = prompts.filter(p => p.subcategoryId === selectedSubcategory.id);
    

    // Filter prompts
    let filteredResults = prompts.filter(p => p.subcategoryId === selectedSubcategory.id);

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredResults = filteredResults.filter(p => 
        p.prompt.toLowerCase().includes(query) ||
        (p.title && p.title.toLowerCase().includes(query)) ||
        (p.description && p.description.toLowerCase().includes(query)) ||
        (p.tags && p.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    // Apply difficulty filter
    if (difficultyFilter && difficultyFilter !== 'All') {
      filteredResults = filteredResults.filter(p => p.difficulty === difficultyFilter);
    }

    // Group prompts by their prompt groups
    const groupsMap = new Map<string, GroupedPrompt>();

    // Add 'All' group
    groupsMap.set('all', { 
      group: { 
        id: 'all', 
        name: 'All Prompts', 
        description: 'All prompts in this category',
        count: filteredResults.length
      },
      count: filteredResults.length
    });

        {Array.from({ length: 4 }).map((_, index) => (
          <PromptCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Handle 404 for non-existent category
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

  // Handle difficulty filter change
  const handleDifficultyChange = (level: string) => {
    setDifficultyFilter(level === difficultyFilter ? null : level as Difficulty);
  };

  // Filter prompts based on selected subcategory, group, search query, and difficulty
  const filteredPrompts = useMemo<Prompt[]>(() => {
    if (!selectedSubcategory) return [];
    
    return prompts.filter(prompt => {
      // Filter by subcategory
      if (prompt.subcategoryId !== selectedSubcategory.id) return false;
      
      // Filter by search query
      if (searchQuery && !prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by difficulty
      if (difficultyFilter && difficultyFilter !== 'All' && prompt.difficulty !== difficultyFilter) {
        return false;
      }
      
      // Filter by prompt group
      if (activePromptGroup && activePromptGroup !== 'all' && prompt.promptGroupId !== activePromptGroup) {
        return false;
      }
      
      return true;
    });
  }, [selectedSubcategory, searchQuery, difficultyFilter, activePromptGroup]);
  
  // Group prompts by their prompt groups
  const allPromptGroups = useMemo(() => {
    const groupsMap = new Map<string, GroupedPrompt>();
    
    if (!selectedSubcategory) return [];
    
    // Get all prompts for the current subcategory
    const subcategoryPrompts = prompts.filter(p => p.subcategoryId === selectedSubcategory.id);
    
    // Group by promptGroupId
    subcategoryPrompts.forEach(prompt => {
      if (!prompt.promptGroupId) return;
      
      const existingGroup = groupsMap.get(prompt.promptGroupId);
      if (existingGroup) {
        existingGroup.count++;
      } else {
        // Find the group details from categories data
        const groupDetails = selectedSubcategory.promptGroups?.find(g => g.id === prompt.promptGroupId);
        if (groupDetails) {
          groupsMap.set(prompt.promptGroupId, {
            group: {
              ...groupDetails,
              count: 1,
              id: groupDetails.id,
              name: groupDetails.name
            },
            count: 1
          });
        }
      }
    });
    
    return Array.from(groupsMap.values());
  }, [selectedSubcategory]);

  // Render the main content
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">{category.name}</h1>
          <p className="text-gray-300 mt-2">{category.description}</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Prompt Groups</h2>
              <div className="space-y-1">
                {allPromptGroups.map(({ group }) => (
                  <button
                    key={group.id}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                      activePromptGroup === group.id
                        ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setActivePromptGroup(group.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{group.name}</span>
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200">
                        {group.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile sidebar */}
          <div className="lg:hidden fixed inset-0 z-40">
            <div
              className={`fixed inset-0 bg-black/50 transition-opacity ${
                showFilters ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              onClick={() => setShowFilters(false)}
            />
            <div
              className={`fixed inset-y-0 left-0 w-72 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
                showFilters ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <div className="h-full overflow-y-auto p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Prompt Groups</h3>
                    <div className="space-y-1">
                      {allPromptGroups.map(({ group }) => (
                        <button
                          key={group.id}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                            activePromptGroup === group.id
                              ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200'
                              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                          }`}
                          onClick={() => {
                            setActivePromptGroup(group.id);
                            setShowFilters(false);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span>{group.name}</span>
                            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200">
                              {group.count}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Difficulty
                    </h3>
                    <div className="space-y-2">
                      {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                        <div key={level} className="flex items-center">
                          <input
                            id={`difficulty-${level}`}
                            name="difficulty"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                            checked={difficultyFilter === level}
                            onChange={() => handleDifficultyChange(level as string)}
                          />
                          <label
                            htmlFor={`difficulty-${level}`}
                            className="ml-3 text-sm text-gray-700 dark:text-gray-300"
                          >
                            {level}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="space-y-6">
              {/* Subcategory Header */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedSubcategory?.name || 'Loading...'}
                  {selectedSubcategory?.description && (
                    <p className="text-gray-300 text-sm font-normal mt-1">
                      {selectedSubcategory.description}
                    </p>
                  )}
                </h2>
              </div>

              {/* Search and Filters */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 transition-all duration-300">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Search prompts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Prompt Group Filters */}
              {allPromptGroups.length > 0 && (
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 transition-all duration-300">
                  <h3 className="text-lg font-semibold text-white mb-4">Filter by Prompt Group</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {activePromptGroup 
                      ? `Showing prompts from: ${allPromptGroups.find(g => g.group.id === activePromptGroup)?.group.name || 'selected group'}` 
                      : 'Showing all prompt groups'}
                    {filteredPrompts.length > 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-gray-700/50 text-xs rounded-full">
                        {filteredPrompts.length} {filteredPrompts.length === 1 ? 'prompt' : 'prompts'}
                      </span>
                    )}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setActivePromptGroup('all')}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                        !activePromptGroup || activePromptGroup === 'all'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md shadow-purple-500/20'
                          : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700/70'
                      }`}
                    >
                      <span>All Prompts</span>
                      <span className="text-xs opacity-80 ml-1">
                        ({filteredPrompts.length})
                      </span>
                    </button>
                    
                    {allPromptGroups.map(({ group }) => {
                      const groupPromptCount = prompts.filter(p => 
                        p.subcategoryId === selectedSubcategory?.id && 
                        p.promptGroupId === group.id
                      ).length;
                      
                      if (groupPromptCount === 0) return null;
                      
                      return (
                        <button
                          key={group.id}
                          onClick={() => setActivePromptGroup(group.id)}
                          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
                            activePromptGroup === group.id
                              ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md shadow-purple-500/20'
                              : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700/70'
                          }`}
                        >
                          <span>{group.name}</span>
                          <span className="text-xs opacity-80">
                            ({groupPromptCount})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Prompts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredPrompts.length > 0 ? (
                  filteredPrompts.map((prompt) => (
                    <div key={prompt.id} className="transform transition-transform duration-300 hover:-translate-y-1">
                      <PromptCard
                        prompt={prompt}
                        onCopy={() => handleCopyPrompt(prompt.prompt)}
                        onOpenInNewTab={() => handleOpenInNewTab(prompt.prompt)}
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-500/10 mb-4">
                      <SearchX className="w-10 h-10 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {searchQuery ? 'No matching prompts found' : 'No prompts available'}
                    </h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                      {searchQuery
                        ? 'Try adjusting your search or filter criteria'
                        : 'This subcategory does not have any prompts yet'}
                    </p>
                  </div>
                )}
              </div>
  );
};

export default CategoryPage;
