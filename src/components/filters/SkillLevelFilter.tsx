import React from 'react';
import { Zap, Lightbulb, Rocket } from 'lucide-react';
import type { SkillLevel } from '../../data/categories-data';

interface SkillLevelFilterProps {
  selectedLevel: SkillLevel | null;
  onLevelChange: (level: SkillLevel | null) => void;
  variant?: 'tabs' | 'buttons' | 'dropdown';
  size?: 'sm' | 'md' | 'lg';
  showIcons?: boolean;
  showClearAll?: boolean;
  className?: string;
}

const getSkillLevelIcon = (level: SkillLevel) => {
  switch (level) {
    case 'Basic':
      return <Zap className="w-4 h-4" />;
    case 'Intermediate':
      return <Lightbulb className="w-4 h-4" />;
    case 'Advanced':
      return <Rocket className="w-4 h-4" />;
    default:
      return null;
  }
};

const getSkillLevelColor = (level: SkillLevel) => {
  switch (level) {
    case 'Basic':
      return {
        text: 'text-green-400',
        bg: 'bg-green-600/80',
        hover: 'hover:bg-green-900/20 hover:text-green-200',
        border: 'border-green-500/50',
        shadow: 'shadow-green-500/20'
      };
    case 'Intermediate':
      return {
        text: 'text-yellow-400',
        bg: 'bg-yellow-600/80',
        hover: 'hover:bg-yellow-900/20 hover:text-yellow-200',
        border: 'border-yellow-500/50',
        shadow: 'shadow-yellow-500/20'
      };
    case 'Advanced':
      return {
        text: 'text-red-400',
        bg: 'bg-red-600/80',
        hover: 'hover:bg-red-900/20 hover:text-red-200',
        border: 'border-red-500/50',
        shadow: 'shadow-red-500/20'
      };
  }
};

const skillLevels: SkillLevel[] = ['Basic', 'Intermediate', 'Advanced'];

export const SkillLevelFilter: React.FC<SkillLevelFilterProps> = ({
  selectedLevel,
  onLevelChange,
  variant = 'buttons',
  size = 'md',
  showIcons = true,
  showClearAll = true,
  className = ''
}) => {
  const handleLevelClick = (level: SkillLevel) => {
    onLevelChange(selectedLevel === level ? null : level);
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'lg':
        return 'px-4 py-3 text-base';
      default:
        return 'px-3 py-2 text-sm';
    }
  };

  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Skill Level
        </label>
        <select
          value={selectedLevel || ''}
          onChange={(e) => onLevelChange(e.target.value as SkillLevel || null)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">All Levels</option>
          {skillLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (variant === 'tabs') {
    return (
      <div className={`${className}`}>
        <div className="bg-gray-800/50 rounded-lg p-1 border border-gray-700">
          <div className="flex space-x-1">
            {showClearAll && (
              <button
                onClick={() => onLevelChange(null)}
                className={`flex-1 ${getSizeClasses()} font-medium rounded-md transition-colors ${
                  selectedLevel === null
                    ? 'bg-gray-700 text-white shadow'
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                All Levels
              </button>
            )}
            {skillLevels.map((level) => {
              const colors = getSkillLevelColor(level);
              return (
                <button
                  key={level}
                  onClick={() => handleLevelClick(level)}
                  className={`flex-1 ${getSizeClasses()} font-medium rounded-md transition-colors ${
                    selectedLevel === level
                      ? `${colors.bg} text-white shadow`
                      : `text-gray-300 hover:bg-gray-700/50 hover:text-white`
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    {showIcons && getSkillLevelIcon(level)}
                    {level}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Default: buttons variant
  return (
    <div className={`${className}`}>
      <h3 className="text-sm font-medium text-gray-400 mb-2.5 flex items-center gap-1.5">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        Filter by Skill Level
      </h3>
      <div className="flex flex-wrap gap-2">
        {showClearAll && (
          <button
            onClick={() => onLevelChange(null)}
            className={`${getSizeClasses()} font-medium rounded-lg transition-all flex items-center gap-1 ${
              selectedLevel === null
                ? 'bg-purple-600/80 text-white shadow-md shadow-purple-500/20'
                : 'bg-gray-700/40 text-gray-300 hover:bg-purple-900/20 hover:text-purple-200'
            }`}
          >
            All Levels
            {selectedLevel === null && (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        )}
        {skillLevels.map((level) => {
          const colors = getSkillLevelColor(level);
          return (
            <button
              key={level}
              onClick={() => handleLevelClick(level)}
              className={`${getSizeClasses()} font-medium rounded-lg transition-all flex items-center gap-1 ${
                selectedLevel === level
                  ? `${colors.bg} text-white shadow-md ${colors.shadow}`
                  : `bg-gray-700/40 ${colors.text} ${colors.hover}`
              }`}
            >
              {showIcons && getSkillLevelIcon(level)}
              {level}
              {selectedLevel === level && (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SkillLevelFilter;
