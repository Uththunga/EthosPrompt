import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import type { Category, Subcategory, PromptGroup, SkillLevel } from '../data/categories-data';
import type { Prompt } from '../data/prompts-data';
import type { UICategory, UISubcategory, UIPromptGroup, UIPrompt } from '../services/DatabaseService';
import PromptCardAdapter from '../components/prompts/PromptCardAdapter';
import { PromptErrorBoundary } from '../components/PromptErrorBoundary';
import { useError } from '../contexts/ErrorContext';
import { useCategories, usePrompts, useDataPreloader } from '../hooks/useDatabaseLoader';
import { ComponentLoadingSpinner } from '../components/LoadingSpinner';
import { useOptimizedCallback, useOptimizedMemo, useDebounce } from '../utils/performanceUtils';
import { SearchX, ArrowLeft, Frown, Grid3X3, LayoutGrid } from 'lucide-react';
import { getDifficultyLevel } from '../utils/difficultyUtils';
import { cn } from '../lib/utils';
import SkillLevelFilter from '../components/filters/SkillLevelFilter';


import FilterPresets, { type FilterPreset } from '../components/filters/FilterPresets';
import FilterPills from '../components/filters/FilterPills';
import EnhancedSearch from '../components/filters/EnhancedSearch';
import MobileCategorySidebar from '../components/mobile/MobileCategorySidebar';
import SwipeSubcategoryNav from '../components/mobile/SwipeSubcategoryNav';
import MobileFilterFAB from '../components/mobile/MobileFilterFAB';
import SkillProgressIndicator from '../components/ui/SkillProgressIndicator';
import CategoryStats from '../components/ui/CategoryStats';
import { Heading, Text, Section, Card as VisualCard, Badge, Divider } from '../components/ui/VisualHierarchy';
import RecommendedPrompts from '../components/discovery/RecommendedPrompts';
import RecentlyViewed, { addToRecentlyViewed } from '../components/discovery/RecentlyViewed';
import TrendingContent from '../components/discovery/TrendingContent';
import OnboardingTour, { useOnboarding } from '../components/onboarding/OnboardingTour';
import SkillAssessment from '../components/onboarding/SkillAssessment';

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

// Use database types directly
type ExtendedSubcategory = UISubcategory & {
  icon?: string;
};

type ExtendedCategory = (UICategory | Category) & {
  subcategories: ExtendedSubcategory[];
};

// Extended prompt type with additional properties (not currently used)
// type ExtendedPrompt = Prompt & {
//   promptGroup?: PromptGroup;
// };

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addError } = useError();

  // State for UI
  const [searchQuery, setSearchQuery] = useState('');
  const [activePromptGroup, setActivePromptGroup] = useState<string | null>(null);
  const [skillLevelFilter, setSkillLevelFilter] = useState<SkillLevel | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<ExtendedSubcategory | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showSkillAssessment, setShowSkillAssessment] = useState(false);

  // Onboarding state
  const {
    hasSeenOnboarding,
    isOnboardingOpen,
    completeOnboarding,
    startOnboarding,
    closeOnboarding
  } = useOnboarding();

  // Debounce search query for better performance
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Load categories from database
  const { data: dbCategories, loading: dbLoading, error: dbError } = useCategories();

  // Normalize categories to handle both database and static types
  const normalizeCategory = useCallback((cat: UICategory | Category): ExtendedCategory => {
    // Handle icon - if it's a LucideIcon (function), convert to string
    const iconString = typeof cat.icon === 'function' ? cat.icon.name || '📁' : cat.icon;

    return {
      ...cat,
      icon: iconString,
      subcategories: cat.subcategories.map(sub => ({
        ...sub,
        icon: sub.icon || undefined
      }))
    } as ExtendedCategory;
  }, []);

  // Use database categories
  const rawCategories = dbCategories;
  const categories = rawCategories?.map(normalizeCategory);
  const categoriesLoading = dbLoading;
  const categoriesError = dbError;

  // Debug logging (development only)
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development' && process.env.VITE_DEBUG === 'true') {
      console.log('CategoryPage Debug:', {
        id,
        categoriesCount: categories?.length,
        selectedSubcategory: selectedSubcategory?.name,
        usingDatabase: !!dbCategories?.length
      });
    }
  }, [id, categories, selectedSubcategory, dbCategories]);

  // Memoize the category to prevent unnecessary re-renders
  const category = useOptimizedMemo<ExtendedCategory | undefined>(
    () => {
      const found = categories?.find((c) => c.id === id);
      if (process.env.NODE_ENV === 'development') {
        console.log('Category lookup:', {
          id,
          found: found ? {
            id: found.id,
            name: found.name,
            subcategoriesCount: found.subcategories?.length,
            icon: found.icon
          } : null
        });
      }
      return found;
    },
    [categories, id]
  );

  // Handle subcategory selection from URL params or default to first
  useEffect(() => {
    if (category?.subcategories?.length) {
      const subcategoryParam = searchParams.get('subcategory');
      if (subcategoryParam) {
        const foundSubcategory = category.subcategories.find(sub => sub.id === subcategoryParam);
        if (foundSubcategory) {
          setSelectedSubcategory(foundSubcategory);
          return;
        }
      }
      // Default to first subcategory if none selected
      if (!selectedSubcategory) {
        setSelectedSubcategory(category.subcategories[0]);
      }
    }
  }, [category?.subcategories, searchParams]);

  // Track category visit in recently viewed
  useEffect(() => {
    if (category) {
      addToRecentlyViewed({
        id: category.id,
        type: 'category',
        title: category.name,
        description: category.description,
        href: `/categories/${category.id}`
      });
    }
  }, [category]);

  // Track subcategory visit in recently viewed
  useEffect(() => {
    if (selectedSubcategory && category) {
      addToRecentlyViewed({
        id: selectedSubcategory.id,
        type: 'subcategory',
        title: selectedSubcategory.name,
        description: selectedSubcategory.description,
        categoryName: category.name,
        skillLevel: selectedSubcategory.skillLevel,
        href: `/categories/${category.id}?subcategory=${selectedSubcategory.id}`
      });
    }
  }, [selectedSubcategory, category]);



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
      difficulty: skillLevelFilter || undefined,
      promptGroupId: activePromptGroup || undefined,
      searchQuery: debouncedSearchQuery.trim() || undefined
    },
    enabled: !!selectedSubcategory
  });

  // Debug prompts loading (development only)
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development' && process.env.VITE_DEBUG === 'true') {
      console.log('Prompts Debug:', {
        subcategoryId: selectedSubcategory?.id,
        promptsCount: filteredPrompts?.length || 0,
        promptsLoading,
        promptsError: !!promptsError
      });
    }
  }, [selectedSubcategory?.id, filteredPrompts, promptsLoading, promptsError]);

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
  const handleOpenInNewTab = useCallback((prompt: UIPrompt) => {
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
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setActivePreset(null); // Clear preset when manually searching
  }, []);

  // Handle preset selection
  const handlePresetSelect = useCallback((preset: FilterPreset) => {
    if (preset.id === 'clear') {
      setActivePreset(null);
      setSearchQuery('');
      setSkillLevelFilter(null);
      setActivePromptGroup(null);
      setActiveTags([]);
      return;
    }

    setActivePreset(preset.id);

    // Apply preset filters
    if (preset.filters.skillLevel) {
      setSkillLevelFilter(preset.filters.skillLevel);
    }
    if (preset.filters.searchQuery) {
      setSearchQuery(preset.filters.searchQuery);
    }
    if (preset.filters.promptGroup) {
      setActivePromptGroup(preset.filters.promptGroup);
    }
    if (preset.filters.tags) {
      setActiveTags(preset.filters.tags);
    }
  }, []);

  // Get unique prompt groups for the selected subcategory
  const promptGroups = useOptimizedMemo<UIPromptGroup[]>(() => {
    if (!selectedSubcategory) return [];
    const groups = new Map<string, UIPromptGroup>();

    // First, check if there are prompt groups in the subcategory
    if (selectedSubcategory.promptGroups) {
      selectedSubcategory.promptGroups.forEach(group => {
        groups.set(group.id, group);
      });
    }

    // Also check prompts for any additional groups (if needed)
    if (filteredPrompts) {
      filteredPrompts
        .filter((p: UIPrompt) => p.promptGroupId)
        .forEach((p: UIPrompt) => {
          if (p.promptGroupId && !groups.has(p.promptGroupId)) {
            // Create a basic prompt group if not found in subcategory
            groups.set(p.promptGroupId, {
              id: p.promptGroupId,
              name: p.promptGroupId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
            });
          }
        });
    }

    return Array.from(groups.values());
  }, [selectedSubcategory, filteredPrompts]);

  // Get active filters for pills
  const activeFilters = useMemo(() => {
    const filters: Array<{
      id: string;
      type: 'search' | 'skillLevel' | 'promptGroup' | 'preset' | 'tag';
      label: string;
      value: string;
    }> = [];

    if (searchQuery) {
      filters.push({
        id: 'search',
        type: 'search',
        label: `Search: "${searchQuery}"`,
        value: searchQuery
      });
    }

    if (skillLevelFilter) {
      filters.push({
        id: 'skillLevel',
        type: 'skillLevel',
        label: `Level: ${skillLevelFilter}`,
        value: skillLevelFilter
      });
    }

    if (activePromptGroup) {
      const groupName = promptGroups.find(g => g.id === activePromptGroup)?.name || activePromptGroup;
      filters.push({
        id: 'promptGroup',
        type: 'promptGroup',
        label: `Group: ${groupName}`,
        value: activePromptGroup
      });
    }

    activeTags.forEach(tag => {
      filters.push({
        id: `tag-${tag}`,
        type: 'tag',
        label: `Tag: ${tag}`,
        value: tag
      });
    });

    return filters;
  }, [searchQuery, skillLevelFilter, activePromptGroup, activeTags, promptGroups]);

  // Handle filter removal
  const handleRemoveFilter = useCallback((filterId: string) => {
    if (filterId === 'search') {
      setSearchQuery('');
    } else if (filterId === 'skillLevel') {
      setSkillLevelFilter(null);
    } else if (filterId === 'promptGroup') {
      setActivePromptGroup(null);
    } else if (filterId.startsWith('tag-')) {
      const tag = filterId.replace('tag-', '');
      setActiveTags(prev => prev.filter(t => t !== tag));
    }
    setActivePreset(null);
  }, []);

  // Handle clear all filters
  const handleClearAllFilters = useCallback(() => {
    setSearchQuery('');
    setSkillLevelFilter(null);
    setActivePromptGroup(null);
    setActiveTags([]);
    setActivePreset(null);
  }, []);

  // This effect ensures the linter doesn't complain about unused variables
  // while also not affecting production bundle size
  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      // These variables are used in the component but might be flagged as unused
      // This pattern prevents the linter from complaining without affecting production
      /* eslint-disable @typescript-eslint/no-unused-expressions */
      availablePromptGroups;
      handleSearchChange;
      /* eslint-enable @typescript-eslint/no-unused-expressions */
    }
  }, [availablePromptGroups, handleSearchChange]);

  // Handle loading states
  if (categoriesLoading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <ComponentLoadingSpinner text="Loading category..." />
        </div>
      </div>
    );
  }

  // Handle case when category is not found
  if (!category) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto text-center py-12">
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

  // Handle empty state when no subcategories exist
  if (!category.subcategories?.length) {
    return (
      <div className="flex flex-col items-center justify-center p-10">
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

  return (
    <>
      {/* Mobile Sidebar */}
      <MobileCategorySidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        subcategories={category?.subcategories || []}
        selectedSubcategory={selectedSubcategory}
        onSubcategorySelect={setSelectedSubcategory}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        skillLevelFilter={skillLevelFilter}
        onSkillLevelChange={setSkillLevelFilter}
        activePreset={activePreset}
        onPresetSelect={handlePresetSelect}
        activeFilters={activeFilters}
        onRemoveFilter={handleRemoveFilter}
        onClearAllFilters={handleClearAllFilters}
      />

      {/* Mobile Filter FAB */}
      <MobileFilterFAB
        onClick={() => setIsMobileSidebarOpen(true)}
        activeFiltersCount={activeFilters.length}
      />

      {/* Onboarding Components */}
      <OnboardingTour
        isOpen={isOnboardingOpen}
        onClose={closeOnboarding}
        onComplete={() => {
          completeOnboarding();
          setShowSkillAssessment(true);
        }}
        variant="category"
      />

      <SkillAssessment
        isOpen={showSkillAssessment}
        onClose={() => setShowSkillAssessment(false)}
        onComplete={(results) => {
          console.log('Skill assessment results:', results);
          setShowSkillAssessment(false);
          // You could use these results to personalize the experience
        }}
      />

      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800/50 shadow-lg -mx-4 mb-8">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-gray-400" />
              </button>

              <div className="space-y-3">
                <Heading level={1} variant="gradient" className="flex items-center gap-3">
                  <span className="text-purple-400">{category.icon}</span>
                  {category.name}
                </Heading>
                {category.description && (
                  <Text variant="large" color="muted" className="max-w-2xl">
                    {category.description}
                  </Text>
                )}
                <CategoryStats category={category} variant="compact" />
              </div>
            </div>


          </div>
        </div>
      </header>

      {/* Mobile Swipe Navigation */}
      <div className="lg:hidden bg-gray-900/60 backdrop-blur-sm border-b border-gray-800/50">
        <SwipeSubcategoryNav
          subcategories={category?.subcategories || []}
          selectedSubcategory={selectedSubcategory}
          onSubcategorySelect={setSelectedSubcategory}
        />
      </div>

      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-6" data-onboarding="sidebar">
            <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 rounded-xl p-5 shadow-lg">
              <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Navigation
              </h2>
              
              <nav className="space-y-2 mb-6">
                {category.subcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubcategory(sub)}
                    className={cn(
                      'w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center gap-3 group',
                      selectedSubcategory?.id === sub.id
                        ? 'bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white shadow-lg shadow-purple-500/20 border border-purple-400/30'
                        : 'text-gray-300 hover:bg-gray-700/50 hover:text-white border border-transparent hover:border-gray-600/30'
                    )}
                  >
                    {sub.icon && (
                      <span className={cn(
                        'text-xl transition-transform duration-200',
                        selectedSubcategory?.id === sub.id ? '' : 'group-hover:scale-110'
                      )}>
                        {sub.icon}
                      </span>
                    )}
                    <div className="flex-1 min-w-0 space-y-1">
                      <span className="font-semibold block truncate text-sm">
                        {sub.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <SkillProgressIndicator
                          currentLevel={sub.skillLevel}
                          variant="compact"
                          showLabel={false}
                        />
                        <Text
                          variant="caption"
                          color={selectedSubcategory?.id === sub.id ? 'default' : 'muted'}
                          className="truncate"
                        >
                          {sub.skillLevel} Level
                        </Text>
                      </div>
                    </div>
                    {selectedSubcategory?.id === sub.id && (
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </button>
                ))}
              </nav>

              {/* Enhanced Search */}
              <div data-onboarding="filters">
                <EnhancedSearch
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search prompts..."
                  className="mb-5"
                />

                {/* Filter Presets */}
                <FilterPresets
                  onPresetSelect={handlePresetSelect}
                  activePreset={activePreset}
                  className="mb-5"
                />

                {/* Active Filters Pills */}
                <FilterPills
                  filters={activeFilters}
                  onRemoveFilter={handleRemoveFilter}
                  onClearAll={handleClearAllFilters}
                  className="mb-5"
                />
              </div>

              {/* Advanced Filters Section */}
              <div className="space-y-5">

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

                {/* Skill Level Filter */}
                <SkillLevelFilter
                  selectedLevel={skillLevelFilter}
                  onLevelChange={setSkillLevelFilter}
                  variant="buttons"
                  size="sm"
                  showIcons={true}
                  showClearAll={true}
                />


              </div>
            </div>



            {/* Recently Viewed */}
            <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 rounded-xl p-5 shadow-lg">
              <RecentlyViewed variant="sidebar" maxItems={5} />
            </div>

            {/* Trending Content */}
            <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 rounded-xl p-5 shadow-lg">
              <TrendingContent variant="sidebar" maxItems={3} showCategories={false} />
            </div>

            {/* Recommended Prompts */}
            <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 rounded-xl p-5 shadow-lg" data-onboarding="discovery">
              <RecommendedPrompts
                variant="sidebar"
                currentCategoryId={id}
                currentSubcategoryId={selectedSubcategory?.id}
                maxItems={4}
              />
            </div>
          </div>
          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="space-y-6">
              {/* Subcategory Header */}
              <VisualCard variant="glass" padding="large" hover className="transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      {selectedSubcategory?.icon && (
                        <span className="text-2xl">{selectedSubcategory.icon}</span>
                      )}
                      <Heading level={2} className="flex-1">
                        {selectedSubcategory?.name || 'Loading...'}
                      </Heading>
                    </div>

                    {selectedSubcategory?.description && (
                      <Text color="muted" className="max-w-2xl">
                        {selectedSubcategory.description}
                      </Text>
                    )}

                    {selectedSubcategory && (
                      <div className="flex flex-wrap items-center gap-4">
                        <SkillProgressIndicator
                          currentLevel={selectedSubcategory.skillLevel}
                          variant="compact"
                        />
                        {selectedSubcategory.examples && selectedSubcategory.examples.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {selectedSubcategory.examples.slice(0, 3).map((example, index) => (
                              <Badge key={index} variant="default" size="small">
                                {example}
                              </Badge>
                            ))}
                            {selectedSubcategory.examples.length > 3 && (
                              <Badge variant="purple" size="small">
                                +{selectedSubcategory.examples.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-700/50 text-gray-300 border border-gray-600/30">
                      {promptsLoading ? 'Loading...' : `${filteredPrompts?.length || 0} ${(filteredPrompts?.length || 0) === 1 ? 'Prompt' : 'Prompts'}`}
                    </span>

                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-2" data-onboarding="view-toggle">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-colors ${
                          viewMode === 'grid'
                            ? 'bg-purple-600/20 text-purple-400'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }`}
                        title="Grid view"
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-colors ${
                          viewMode === 'list'
                            ? 'bg-purple-600/20 text-purple-400'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }`}
                        title="List view"
                      >
                        <LayoutGrid className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </VisualCard>

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
                  <div className={`${
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'
                      : 'space-y-4'
                  }`}>
                    {filteredPrompts && filteredPrompts.length > 0 ? (
                      filteredPrompts.map((prompt) => (
                        <div key={prompt.id} className={`transform transition-transform duration-300 ${
                          viewMode === 'grid' ? 'hover:-translate-y-1' : 'hover:scale-[1.02]'
                        }`}>
                          <PromptCardAdapter
                            prompt={prompt}
                            showPreview={viewMode === 'list'}
                            className={viewMode === 'list' ? 'w-full' : ''}
                          />
                        </div>
                      ))
                    ) : (
                  <Section spacing="loose" className="col-span-full text-center py-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-500/10 mb-6">
                      <SearchX className="w-10 h-10 text-purple-400" />
                    </div>
                    <Heading level={3} className="mb-4">
                      {activeFilters.length > 0
                        ? 'No matching prompts found'
                        : 'No prompts available'}
                    </Heading>
                    <Text color="muted" className="max-w-md mx-auto mb-6">
                      {activeFilters.length > 0
                        ? 'Try adjusting your search or filter criteria.'
                        : 'This subcategory does not have any prompts yet.'}
                    </Text>
                    {activeFilters.length > 0 && (
                      <button
                        onClick={handleClearAllFilters}
                        className="px-6 py-3 text-sm font-medium text-purple-400 hover:text-purple-300 transition-all duration-200 border border-purple-500/30 rounded-xl hover:bg-purple-500/10 hover:border-purple-400/50"
                      >
                        Clear all filters
                      </button>
                    )}
                  </Section>
                    )}
                  </div>
                )}
              </PromptErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
