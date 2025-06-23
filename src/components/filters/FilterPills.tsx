import React from 'react';
import { X, Search, Filter, Zap, Lightbulb, Rocket } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { SkillLevel } from '../../data/categories-data';

interface ActiveFilter {
  id: string;
  type: 'search' | 'skillLevel' | 'promptGroup' | 'preset' | 'tag';
  label: string;
  value: string;
  color?: string;
}

interface FilterPillsProps {
  filters: ActiveFilter[];
  onRemoveFilter: (filterId: string) => void;
  onClearAll: () => void;
  className?: string;
}

const getFilterIcon = (type: string, value?: string) => {
  switch (type) {
    case 'search':
      return <Search className="w-3 h-3" />;
    case 'skillLevel':
      if (value === 'Basic') return <Zap className="w-3 h-3" />;
      if (value === 'Intermediate') return <Lightbulb className="w-3 h-3" />;
      if (value === 'Advanced') return <Rocket className="w-3 h-3" />;
      return <Filter className="w-3 h-3" />;
    case 'promptGroup':
      return <Filter className="w-3 h-3" />;
    case 'preset':
      return <Filter className="w-3 h-3" />;
    case 'tag':
      return <Filter className="w-3 h-3" />;
    default:
      return <Filter className="w-3 h-3" />;
  }
};

const getFilterColor = (type: string, value?: string) => {
  switch (type) {
    case 'search':
      return 'bg-blue-900/40 text-blue-300 border-blue-800/50';
    case 'skillLevel':
      if (value === 'Basic') return 'bg-green-900/40 text-green-300 border-green-800/50';
      if (value === 'Intermediate') return 'bg-yellow-900/40 text-yellow-300 border-yellow-800/50';
      if (value === 'Advanced') return 'bg-red-900/40 text-red-300 border-red-800/50';
      return 'bg-purple-900/40 text-purple-300 border-purple-800/50';
    case 'promptGroup':
      return 'bg-indigo-900/40 text-indigo-300 border-indigo-800/50';
    case 'preset':
      return 'bg-orange-900/40 text-orange-300 border-orange-800/50';
    case 'tag':
      return 'bg-gray-700/50 text-gray-300 border-gray-600/50';
    default:
      return 'bg-purple-900/40 text-purple-300 border-purple-800/50';
  }
};

const FilterPills: React.FC<FilterPillsProps> = ({
  filters,
  onRemoveFilter,
  onClearAll,
  className = ''
}) => {
  if (filters.length === 0) {
    return null;
  }

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-400">Active Filters ({filters.length})</span>
        <button
          onClick={onClearAll}
          className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
        >
          Clear all
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <div
            key={filter.id}
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-200 group',
              filter.color || getFilterColor(filter.type, filter.value)
            )}
          >
            {getFilterIcon(filter.type, filter.value)}
            <span className="truncate max-w-[120px]">{filter.label}</span>
            <button
              onClick={() => onRemoveFilter(filter.id)}
              className="ml-1 -mr-1 p-0.5 hover:bg-black/20 rounded-full transition-colors group-hover:bg-black/30"
              title={`Remove ${filter.label} filter`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      
      {filters.length > 3 && (
        <div className="text-xs text-gray-500 text-center">
          Showing results for {filters.length} active filters
        </div>
      )}
    </div>
  );
};

export default FilterPills;
