import React from 'react';
import { Building2, Factory, Heart, Code, Scale, GraduationCap, TrendingUp, Users } from 'lucide-react';

interface IndustryFilterProps {
  selectedIndustries: string[];
  onIndustryChange: (industries: string[]) => void;
  variant?: 'chips' | 'dropdown' | 'grid';
  size?: 'sm' | 'md' | 'lg';
  showIcons?: boolean;
  showClearAll?: boolean;
  className?: string;
}

const industries = [
  { id: 'technology', name: 'Technology', icon: Code, color: 'emerald' },
  { id: 'healthcare', name: 'Healthcare', icon: Heart, color: 'red' },
  { id: 'finance', name: 'Finance', icon: TrendingUp, color: 'blue' },
  { id: 'education', name: 'Education', icon: GraduationCap, color: 'indigo' },
  { id: 'manufacturing', name: 'Manufacturing', icon: Factory, color: 'orange' },
  { id: 'legal', name: 'Legal', icon: Scale, color: 'slate' },
  { id: 'consulting', name: 'Consulting', icon: Users, color: 'purple' },
  { id: 'real-estate', name: 'Real Estate', icon: Building2, color: 'yellow' },
];

const getIndustryColor = (color: string) => {
  const colorMap: Record<string, any> = {
    emerald: {
      text: 'text-emerald-400',
      bg: 'bg-emerald-600/80',
      hover: 'hover:bg-emerald-900/20 hover:text-emerald-200',
      border: 'border-emerald-500/50',
      shadow: 'shadow-emerald-500/20'
    },
    red: {
      text: 'text-red-400',
      bg: 'bg-red-600/80',
      hover: 'hover:bg-red-900/20 hover:text-red-200',
      border: 'border-red-500/50',
      shadow: 'shadow-red-500/20'
    },
    blue: {
      text: 'text-blue-400',
      bg: 'bg-blue-600/80',
      hover: 'hover:bg-blue-900/20 hover:text-blue-200',
      border: 'border-blue-500/50',
      shadow: 'shadow-blue-500/20'
    },
    indigo: {
      text: 'text-indigo-400',
      bg: 'bg-indigo-600/80',
      hover: 'hover:bg-indigo-900/20 hover:text-indigo-200',
      border: 'border-indigo-500/50',
      shadow: 'shadow-indigo-500/20'
    },
    orange: {
      text: 'text-orange-400',
      bg: 'bg-orange-600/80',
      hover: 'hover:bg-orange-900/20 hover:text-orange-200',
      border: 'border-orange-500/50',
      shadow: 'shadow-orange-500/20'
    },
    slate: {
      text: 'text-slate-400',
      bg: 'bg-slate-600/80',
      hover: 'hover:bg-slate-900/20 hover:text-slate-200',
      border: 'border-slate-500/50',
      shadow: 'shadow-slate-500/20'
    },
    purple: {
      text: 'text-purple-400',
      bg: 'bg-purple-600/80',
      hover: 'hover:bg-purple-900/20 hover:text-purple-200',
      border: 'border-purple-500/50',
      shadow: 'shadow-purple-500/20'
    },
    yellow: {
      text: 'text-yellow-400',
      bg: 'bg-yellow-600/80',
      hover: 'hover:bg-yellow-900/20 hover:text-yellow-200',
      border: 'border-yellow-500/50',
      shadow: 'shadow-yellow-500/20'
    }
  };
  return colorMap[color] || colorMap.purple;
};

export const IndustryFilter: React.FC<IndustryFilterProps> = ({
  selectedIndustries,
  onIndustryChange,
  variant = 'chips',
  size = 'md',
  showIcons = true,
  showClearAll = true,
  className = ''
}) => {
  const handleIndustryToggle = (industryId: string) => {
    if (selectedIndustries.includes(industryId)) {
      onIndustryChange(selectedIndustries.filter(id => id !== industryId));
    } else {
      onIndustryChange([...selectedIndustries, industryId]);
    }
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
          Industry Focus
        </label>
        <select
          multiple
          value={selectedIndustries}
          onChange={(e) => {
            const values = Array.from(e.target.selectedOptions, option => option.value);
            onIndustryChange(values);
          }}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {industries.map((industry) => (
            <option key={industry.id} value={industry.id}>
              {industry.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className={`${className}`}>
        <h3 className="text-sm font-medium text-gray-400 mb-2.5 flex items-center gap-1.5">
          <Building2 className="w-4 h-4" />
          Industry Focus
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {industries.map((industry) => {
            const Icon = industry.icon;
            const colors = getIndustryColor(industry.color);
            const isSelected = selectedIndustries.includes(industry.id);
            
            return (
              <button
                key={industry.id}
                onClick={() => handleIndustryToggle(industry.id)}
                className={`${getSizeClasses()} font-medium rounded-lg transition-all flex items-center gap-2 justify-center ${
                  isSelected
                    ? `${colors.bg} text-white shadow-md ${colors.shadow}`
                    : `bg-gray-700/40 ${colors.text} ${colors.hover}`
                }`}
              >
                {showIcons && <Icon className="w-4 h-4" />}
                <span className="truncate">{industry.name}</span>
              </button>
            );
          })}
        </div>
        {showClearAll && selectedIndustries.length > 0 && (
          <button
            onClick={() => onIndustryChange([])}
            className="mt-2 text-xs text-purple-400 hover:text-purple-300 transition-colors"
          >
            Clear all industries
          </button>
        )}
      </div>
    );
  }

  // Default: chips variant
  return (
    <div className={`${className}`}>
      <h3 className="text-sm font-medium text-gray-400 mb-2.5 flex items-center gap-1.5">
        <Building2 className="w-4 h-4" />
        Industry Focus
      </h3>
      <div className="flex flex-wrap gap-2">
        {showClearAll && selectedIndustries.length > 0 && (
          <button
            onClick={() => onIndustryChange([])}
            className={`${getSizeClasses()} font-medium rounded-lg transition-all flex items-center gap-1 bg-purple-600/80 text-white shadow-md shadow-purple-500/20`}
          >
            Clear All
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        {industries.map((industry) => {
          const Icon = industry.icon;
          const colors = getIndustryColor(industry.color);
          const isSelected = selectedIndustries.includes(industry.id);
          
          return (
            <button
              key={industry.id}
              onClick={() => handleIndustryToggle(industry.id)}
              className={`${getSizeClasses()} font-medium rounded-lg transition-all flex items-center gap-1 ${
                isSelected
                  ? `${colors.bg} text-white shadow-md ${colors.shadow}`
                  : `bg-gray-700/40 ${colors.text} ${colors.hover}`
              }`}
            >
              {showIcons && <Icon className="w-4 h-4" />}
              {industry.name}
              {isSelected && (
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

export default IndustryFilter;
