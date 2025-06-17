import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categories, Category, Subcategory, PromptGroup } from '../data/categories-data';
import { prompts, Prompt } from '../data/prompts-data';
import PromptCard from '../components/PromptCard';
import PromptCardSkeleton from '../components/PromptCardSkeleton';
import { SearchX, Frown, ArrowLeft } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Memoize the category to prevent unnecessary re-renders
  const category = useMemo<Category | undefined>(
    () => categories.find(c => c.id === id),
    [id]
  );

  // State management
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [activePromptGroup, setActivePromptGroup] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

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
    setSearchQuery('');
    
    // Simulate data fetching
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedSubcategory]);

  // Handle prompt copy
  const handleCopyPrompt = (promptText: string) => {
    navigator.clipboard.writeText(promptText);
    // You can add a toast notification here if needed
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

  // Filter prompts based on selected subcategory, group, and search query
  const filteredPrompts = useMemo<Prompt[]>(() => {
    if (!selectedSubcategory) return [];

    // Filter by subcategory
    let filtered = prompts.filter(p => p.subcategoryId === selectedSubcategory.id);

    // Filter by active prompt group if set
    if (activePromptGroup) {
      filtered = filtered.filter(p => p.promptGroupId === activePromptGroup);
    }

    // Apply search query if provided
    if (searchQuery.trim() !== '') {
      const lowercasedQuery = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(lowercasedQuery) ||
        (p.description?.toLowerCase().includes(lowercasedQuery) ?? false) ||
        p.prompt.toLowerCase().includes(lowercasedQuery)
      );
    }

    return filtered;
  }, [selectedSubcategory, activePromptGroup, searchQuery]);

  // Get unique prompt groups for the selected subcategory
  const promptGroups = useMemo<PromptGroup[]>(() => {
    if (!selectedSubcategory?.promptGroups) return [];
    return selectedSubcategory.promptGroups;
  }, [selectedSubcategory]);

  // Handle loading state
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6">
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
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Subcategories</h2>
              <nav className="space-y-2">
                {category.subcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubcategory(sub)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedSubcategory?.id === sub.id
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    {sub.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          {/* Main Content */}
          <div className="lg:col-span-9">
              <div className="space-y-6">
                {/* Subcategory Header */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5">
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedSubcategory?.name || 'Loading...'}</h2>
                  <p className="text-gray-300">{selectedSubcategory?.description || ''}</p>
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
                {promptGroups.length > 0 && (
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 transition-all duration-300">
                    <h3 className="text-lg font-semibold text-white mb-4">Filter by Prompt Group</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {activePromptGroup 
                        ? `Showing prompts from: ${promptGroups.find(g => g.id === activePromptGroup)?.name || 'selected group'}` 
                        : 'Showing all prompt groups'}
                      {filteredPrompts.length > 0 && (
                        <span className="ml-2 px-2 py-0.5 bg-gray-700/50 text-xs rounded-full">
                          {filteredPrompts.length} {filteredPrompts.length === 1 ? 'prompt' : 'prompts'}
                        </span>
                      )}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      <button
                        key="all"
                        onClick={() => setActivePromptGroup(null)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
                          !activePromptGroup
                            ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md shadow-purple-500/20'
                            : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700/70'
                        }`}
                      >
                        <span>All Groups</span>
                        <span className="text-xs opacity-80">
                          ({prompts.filter(p => p.subcategoryId === selectedSubcategory?.id).length})
                        </span>
                      </button>
                      
                      {promptGroups.map((group) => {
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
