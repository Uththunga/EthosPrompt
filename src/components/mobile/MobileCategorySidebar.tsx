import React, { useState, useEffect } from 'react';
import { X, Menu, Filter, Search } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { UISubcategory } from '../../services/DatabaseService';
import type { SkillLevel } from '../../data/categories-data';
import SkillLevelFilter from '../filters/SkillLevelFilter';
import FilterPresets, { type FilterPreset } from '../filters/FilterPresets';
import FilterPills from '../filters/FilterPills';
import EnhancedSearch from '../filters/EnhancedSearch';

interface MobileCategorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  subcategories: UISubcategory[];
  selectedSubcategory: UISubcategory | null;
  onSubcategorySelect: (subcategory: UISubcategory) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  skillLevelFilter: SkillLevel | null;
  onSkillLevelChange: (level: SkillLevel | null) => void;
  activePreset: string | null;
  onPresetSelect: (preset: FilterPreset) => void;
  activeFilters: Array<{
    id: string;
    type: 'search' | 'skillLevel' | 'promptGroup' | 'preset' | 'tag';
    label: string;
    value: string;
  }>;
  onRemoveFilter: (filterId: string) => void;
  onClearAllFilters: () => void;
}

const MobileCategorySidebar: React.FC<MobileCategorySidebarProps> = ({
  isOpen,
  onClose,
  subcategories,
  selectedSubcategory,
  onSubcategorySelect,
  searchQuery,
  onSearchChange,
  skillLevelFilter,
  onSkillLevelChange,
  activePreset,
  onPresetSelect,
  activeFilters,
  onRemoveFilter,
  onClearAllFilters
}) => {
  const [activeTab, setActiveTab] = useState<'categories' | 'filters'>('categories');

  // Close sidebar when clicking outside
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubcategoryClick = (subcategory: UISubcategory) => {
    onSubcategorySelect(subcategory);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed top-0 left-0 h-full w-80 bg-gray-900/95 backdrop-blur-sm border-r border-gray-700/50 z-50 transform transition-transform duration-300 ease-in-out lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
          <h2 className="text-lg font-semibold text-white">Navigation</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700/50">
          <button
            onClick={() => setActiveTab('categories')}
            className={cn(
              'flex-1 px-4 py-3 text-sm font-medium transition-colors',
              activeTab === 'categories'
                ? 'text-purple-400 border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-white'
            )}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab('filters')}
            className={cn(
              'flex-1 px-4 py-3 text-sm font-medium transition-colors relative',
              activeTab === 'filters'
                ? 'text-purple-400 border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-white'
            )}
          >
            Filters
            {activeFilters.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center">
                {activeFilters.length}
              </span>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'categories' ? (
            /* Categories Tab */
            <div className="space-y-2">
              {subcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => handleSubcategoryClick(sub)}
                  className={cn(
                    'w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 touch-target',
                    selectedSubcategory?.id === sub.id
                      ? 'bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white shadow-md shadow-purple-500/20'
                      : 'text-gray-300 hover:bg-gray-700/40 hover:text-white active:bg-gray-700/60'
                  )}
                >
                  {sub.icon && <span className="text-lg">{sub.icon}</span>}
                  <div className="flex-1 min-w-0">
                    <span className="font-medium block truncate">{sub.name}</span>
                    <span className={cn(
                      'text-xs block truncate mt-0.5',
                      selectedSubcategory?.id === sub.id ? 'text-purple-100' : 'text-gray-500'
                    )}>
                      {sub.skillLevel} Level
                    </span>
                  </div>
                  {selectedSubcategory?.id === sub.id && (
                    <span className="w-2 h-2 bg-white rounded-full flex-shrink-0"></span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            /* Filters Tab */
            <div className="space-y-6">
              {/* Enhanced Search */}
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-3">Search</h3>
                <EnhancedSearch
                  value={searchQuery}
                  onChange={onSearchChange}
                  placeholder="Search prompts..."
                />
              </div>

              {/* Filter Presets */}
              <div>
                <FilterPresets
                  onPresetSelect={onPresetSelect}
                  activePreset={activePreset}
                />
              </div>

              {/* Active Filters */}
              {activeFilters.length > 0 && (
                <div>
                  <FilterPills
                    filters={activeFilters}
                    onRemoveFilter={onRemoveFilter}
                    onClearAll={onClearAllFilters}
                  />
                </div>
              )}

              {/* Skill Level Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-3">Skill Level</h3>
                <SkillLevelFilter
                  selectedLevel={skillLevelFilter}
                  onLevelChange={onSkillLevelChange}
                  variant="buttons"
                  size="sm"
                  showIcons={true}
                  showClearAll={true}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700/50">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors touch-target"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileCategorySidebar;
