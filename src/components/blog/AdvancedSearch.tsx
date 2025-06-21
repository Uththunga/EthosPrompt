import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Filter,
  X,
  Clock,
  TrendingUp,
  Code,
  Download,
  User,
  Tag,
  Calendar,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { CATEGORIES } from '../../data/blog-posts';
import { useSearch, type SearchFilters } from '../../hooks/useSearch';
import MobileSearch from '../mobile/MobileSearch';
import ExpandableSection from '../mobile/ExpandableSection';

interface AdvancedSearchProps {
  onSearchResults?: (results: any[]) => void;
  className?: string;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ onSearchResults, className = '' }) => {
  const { searchState, updateQuery, updateFilters, clearSearch, getPopularSearches } = useSearch();
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Handle search input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    updateQuery(value);
    setShowSuggestions(value.length > 0);
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: string) => {
    setInputValue(suggestion);
    updateQuery(suggestion);
    setShowSuggestions(false);
    searchInputRef.current?.focus();
  };

  // Handle filter changes
  const handleFilterChange = (filterKey: keyof SearchFilters, value: any) => {
    updateFilters({ [filterKey]: value });
  };

  // Clear all filters
  const clearAllFilters = () => {
    updateFilters({
      category: 'all',
      difficulty: 'all',
      hasCodeExamples: null,
      hasDownloads: null,
      author: '',
      tags: [],
      dateRange: 'all'
    });
  };

  // Handle clicks outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !searchInputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Notify parent of search results
  useEffect(() => {
    if (onSearchResults) {
      onSearchResults(searchState.results);
    }
  }, [searchState.results, onSearchResults]);

  const popularSearches = getPopularSearches();
  const hasActiveFilters = searchState.filters.category !== 'all' ||
    searchState.filters.difficulty !== 'all' ||
    searchState.filters.hasCodeExamples !== null ||
    searchState.filters.hasDownloads !== null ||
    searchState.filters.author !== '' ||
    searchState.filters.tags.length > 0 ||
    searchState.filters.dateRange !== 'all';

  return (
    <div className={`relative ${className}`}>
      {/* Main Search Bar */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search articles, authors, topics..."
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(inputValue.length > 0)}
            className="w-full pl-12 pr-20 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {inputValue && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setInputValue('');
                  updateQuery('');
                  setShowSuggestions(false);
                }}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={`border-gray-600 text-gray-400 hover:text-white ${
                hasActiveFilters ? 'bg-purple-500/20 border-purple-500/50 text-purple-300' : ''
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {showFilters ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </div>

        {/* Search Suggestions */}
        {showSuggestions && (searchState.suggestions.length > 0 || popularSearches.length > 0) && (
          <Card 
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 z-50 max-h-80 overflow-y-auto"
          >
            {searchState.suggestions.length > 0 && (
              <div className="p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                  <Search className="w-4 h-4 mr-2" />
                  Suggestions
                </h4>
                <div className="space-y-2">
                  {searchState.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionSelect(suggestion)}
                      className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700/50 rounded-lg transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {inputValue.length === 0 && popularSearches.length > 0 && (
              <div className="p-4 border-t border-gray-700/50">
                <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Popular Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer border-gray-600 text-gray-400 hover:border-purple-500/50 hover:text-purple-300 transition-colors"
                      onClick={() => handleSuggestionSelect(search)}
                    >
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </Card>
        )}
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <Card className="mt-4 bg-gray-800/40 border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Advanced Filters
            </h3>
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="border-gray-600 text-gray-400 hover:text-white"
              >
                Clear All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Category</label>
              <select
                value={searchState.filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.filter(cat => cat.id !== 'all').map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Difficulty</label>
              <select
                value={searchState.filters.difficulty}
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Date Range</label>
              <select
                value={searchState.filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Time</option>
                <option value="last-month">Last Month</option>
                <option value="last-3-months">Last 3 Months</option>
                <option value="last-year">Last Year</option>
              </select>
            </div>
          </div>

          {/* Feature Filters */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">Features</label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={searchState.filters.hasCodeExamples === true}
                  onChange={(e) => handleFilterChange('hasCodeExamples', e.target.checked ? true : null)}
                  className="mr-2 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
                />
                <Code className="w-4 h-4 mr-1 text-green-400" />
                <span className="text-gray-300">Has Code Examples</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={searchState.filters.hasDownloads === true}
                  onChange={(e) => handleFilterChange('hasDownloads', e.target.checked ? true : null)}
                  className="mr-2 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
                />
                <Download className="w-4 h-4 mr-1 text-blue-400" />
                <span className="text-gray-300">Has Downloads</span>
              </label>
            </div>
          </div>

          {/* Author Filter */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">Author</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by author name..."
                value={searchState.filters.author}
                onChange={(e) => handleFilterChange('author', e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Search Results Summary */}
      {(searchState.query || hasActiveFilters) && (
        <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
          <div>
            {searchState.totalResults > 0 ? (
              <span>
                Found <span className="text-white font-medium">{searchState.totalResults}</span> article
                {searchState.totalResults !== 1 ? 's' : ''}
                {searchState.query && (
                  <span> for "<span className="text-purple-300">{searchState.query}</span>"</span>
                )}
              </span>
            ) : searchState.query ? (
              <span>No articles found for "<span className="text-purple-300">{searchState.query}</span>"</span>
            ) : (
              <span>No articles match the selected filters</span>
            )}
          </div>
          {searchState.searchTime > 0 && (
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {searchState.searchTime.toFixed(1)}ms
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
