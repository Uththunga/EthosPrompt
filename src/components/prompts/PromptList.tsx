import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import PromptCard from './PromptCard';
import { usePrompts } from '../../services/promptService';
import { PromptFilters, PromptQueryOptions } from '../../services/promptService';

interface PromptListProps {
  initialFilters?: PromptFilters;
  showFilters?: boolean;
  showSearch?: boolean;
  showPagination?: boolean;
  pageSize?: number;
  viewMode?: 'grid' | 'list';
  className?: string;
}

const PromptList: React.FC<PromptListProps> = ({
  initialFilters = {},
  showFilters = true,
  showSearch = true,
  showPagination = true,
  pageSize = 12,
  viewMode: initialViewMode = 'grid',
  className = ''
}) => {
  const [filters, setFilters] = useState<PromptFilters>(initialFilters);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(initialViewMode);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const queryOptions: PromptQueryOptions = {
    page: currentPage,
    limit: pageSize,
    sortBy: 'created_at',
    sortOrder: 'desc'
  };

  const searchFilters = searchTerm ? { ...filters, search: searchTerm } : filters;
  const { prompts, loading, error, count } = usePrompts(searchFilters, queryOptions);

  const totalPages = Math.ceil(count / pageSize);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchTerm]);

  const handleFilterChange = (newFilters: Partial<PromptFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the effect above
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <Card className="bg-gray-800 border-gray-700 p-8 text-center">
        <p className="text-red-400 mb-4">Failed to load prompts</p>
        <p className="text-gray-400 text-sm">{error}</p>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search and Filters */}
      {(showSearch || showFilters) && (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search */}
          {showSearch && (
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search prompts..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>
          )}

          {/* View Controls */}
          <div className="flex items-center gap-2">
            {showFilters && (
              <Button
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            )}
            
            <div className="flex items-center border border-gray-600 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Panel */}
      {showFilterPanel && (
        <Card className="bg-gray-800 border-gray-700 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                value={filters.category || ''}
                onChange={(e) => handleFilterChange({ category: e.target.value || undefined })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                <option value="Education">Education</option>
                <option value="Business Strategy">Business Strategy</option>
                <option value="Marketing">Marketing</option>
                <option value="Content Creation">Content Creation</option>
                <option value="Software Development">Software Development</option>
              </select>
            </div>

            {/* Skill Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Skill Level
              </label>
              <select
                value={filters.skillLevel || ''}
                onChange={(e) => handleFilterChange({ skillLevel: e.target.value as any || undefined })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Access Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Access Type
              </label>
              <select
                value={filters.accessType || ''}
                onChange={(e) => handleFilterChange({ accessType: e.target.value as any || undefined })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                <option value="free">Free</option>
                <option value="paid">Premium</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <Button
                onClick={() => {
                  setFilters({});
                  setSearchTerm('');
                }}
                variant="outline"
                size="sm"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm">
          {loading ? 'Loading...' : `${count} prompts found`}
        </p>
        {showPagination && totalPages > 1 && (
          <p className="text-gray-400 text-sm">
            Page {currentPage} of {totalPages}
          </p>
        )}
      </div>

      {/* Prompts Grid/List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="bg-gray-800 border-gray-700 p-6 animate-pulse">
              <div className="h-4 bg-gray-700 rounded mb-4"></div>
              <div className="h-3 bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-700 rounded mb-4"></div>
              <div className="h-8 bg-gray-700 rounded"></div>
            </Card>
          ))}
        </div>
      ) : prompts.length === 0 ? (
        <Card className="bg-gray-800 border-gray-700 p-8 text-center">
          <p className="text-gray-400 mb-2">No prompts found</p>
          <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
        </Card>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {prompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              showPreview={viewMode === 'list'}
              className={viewMode === 'list' ? 'w-full' : ''}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            const page = i + 1;
            const isActive = page === currentPage;
            
            return (
              <Button
                key={page}
                onClick={() => handlePageChange(page)}
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                className={
                  isActive 
                    ? 'bg-blue-600 text-white'
                    : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                }
              >
                {page}
              </Button>
            );
          })}
          
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PromptList;
