import React from 'react';
import { Zap, TrendingUp, Star, Clock, Users, Target } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { SkillLevel } from '../../data/categories-data';

export interface FilterPreset {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  filters: {
    skillLevel?: SkillLevel;
    promptGroup?: string;
    searchQuery?: string;
    tags?: string[];
  };
  color: string;
}

interface FilterPresetsProps {
  onPresetSelect: (preset: FilterPreset) => void;
  activePreset?: string;
  className?: string;
}

const defaultPresets: FilterPreset[] = [
  {
    id: 'beginner-friendly',
    name: 'Beginner Friendly',
    description: 'Easy-to-use prompts for newcomers',
    icon: <Zap className="w-4 h-4" />,
    filters: {
      skillLevel: 'Basic'
    },
    color: 'bg-green-600/20 text-green-400 border-green-500/30'
  },
  {
    id: 'trending',
    name: 'Trending',
    description: 'Popular prompts this week',
    icon: <TrendingUp className="w-4 h-4" />,
    filters: {
      tags: ['trending', 'popular']
    },
    color: 'bg-orange-600/20 text-orange-400 border-orange-500/30'
  },
  {
    id: 'featured',
    name: 'Featured',
    description: 'Hand-picked quality prompts',
    icon: <Star className="w-4 h-4" />,
    filters: {
      tags: ['featured', 'quality']
    },
    color: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30'
  },
  {
    id: 'recent',
    name: 'Recently Added',
    description: 'Latest prompts in the collection',
    icon: <Clock className="w-4 h-4" />,
    filters: {
      tags: ['recent', 'new']
    },
    color: 'bg-blue-600/20 text-blue-400 border-blue-500/30'
  },
  {
    id: 'community-favorites',
    name: 'Community Favorites',
    description: 'Most liked by users',
    icon: <Users className="w-4 h-4" />,
    filters: {
      tags: ['community', 'favorites']
    },
    color: 'bg-purple-600/20 text-purple-400 border-purple-500/30'
  },
  {
    id: 'advanced',
    name: 'Advanced',
    description: 'Complex prompts for experts',
    icon: <Target className="w-4 h-4" />,
    filters: {
      skillLevel: 'Advanced'
    },
    color: 'bg-red-600/20 text-red-400 border-red-500/30'
  }
];

const FilterPresets: React.FC<FilterPresetsProps> = ({
  onPresetSelect,
  activePreset,
  className = ''
}) => {
  return (
    <div className={cn('space-y-3', className)}>
      <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Filters</h3>
      
      <div className="grid grid-cols-2 gap-2">
        {defaultPresets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onPresetSelect(preset)}
            className={cn(
              'p-3 rounded-lg border transition-all duration-200 text-left group hover:scale-[1.02]',
              activePreset === preset.id
                ? preset.color
                : 'bg-gray-800/40 text-gray-300 border-gray-700/50 hover:border-gray-600/50 hover:bg-gray-800/60'
            )}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={cn(
                'transition-colors',
                activePreset === preset.id ? '' : 'text-gray-500 group-hover:text-gray-400'
              )}>
                {preset.icon}
              </span>
              <span className="font-medium text-xs truncate">{preset.name}</span>
            </div>
            <p className={cn(
              'text-xs leading-tight line-clamp-2',
              activePreset === preset.id ? 'opacity-90' : 'text-gray-500 group-hover:text-gray-400'
            )}>
              {preset.description}
            </p>
          </button>
        ))}
      </div>
      
      {activePreset && (
        <button
          onClick={() => onPresetSelect({ id: 'clear', name: 'Clear', description: '', icon: null, filters: {}, color: '' })}
          className="w-full text-center py-2 text-xs text-purple-400 hover:text-purple-300 transition-colors border border-purple-500/30 rounded-lg hover:bg-purple-500/10"
        >
          Clear Preset
        </button>
      )}
    </div>
  );
};

export default FilterPresets;
