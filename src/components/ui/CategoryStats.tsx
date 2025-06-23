import React from 'react';
import { BarChart3, Users, Clock, TrendingUp, Star, Zap, Target } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { UICategory } from '../../services/DatabaseService';

interface CategoryStatsProps {
  category: UICategory;
  variant?: 'compact' | 'detailed' | 'dashboard';
  className?: string;
}

interface StatItem {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
}

const CategoryStats: React.FC<CategoryStatsProps> = ({
  category,
  variant = 'compact',
  className = ''
}) => {
  // Calculate statistics
  const totalPrompts = category.promptCount || 0;
  const subcategoryCount = category.subcategories?.length || 0;
  
  // Mock data for demonstration - in real app, this would come from analytics
  const skillDistribution = {
    basic: Math.floor(totalPrompts * 0.4),
    intermediate: Math.floor(totalPrompts * 0.35),
    advanced: Math.floor(totalPrompts * 0.25)
  };

  const stats: StatItem[] = [
    {
      label: 'Total Prompts',
      value: totalPrompts,
      icon: <Target className="w-4 h-4" />,
      color: 'text-purple-400',
      trend: 'up',
      trendValue: '+12%'
    },
    {
      label: 'Subcategories',
      value: subcategoryCount,
      icon: <BarChart3 className="w-4 h-4" />,
      color: 'text-blue-400'
    },
    {
      label: 'Popularity',
      value: category.trending ? 'Trending' : 'Popular',
      icon: <TrendingUp className="w-4 h-4" />,
      color: 'text-orange-400',
      trend: category.trending ? 'up' : 'stable'
    },
    {
      label: 'Difficulty',
      value: 'Mixed',
      icon: <Zap className="w-4 h-4" />,
      color: 'text-green-400'
    }
  ];

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-4 text-sm', className)}>
        <div className="flex items-center gap-1 text-gray-400">
          <Target className="w-4 h-4" />
          <span>{totalPrompts} prompts</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <BarChart3 className="w-4 h-4" />
          <span>{subcategoryCount} categories</span>
        </div>
        {category.trending && (
          <div className="flex items-center gap-1 text-orange-400">
            <TrendingUp className="w-4 h-4" />
            <span>Trending</span>
          </div>
        )}
        {category.featured && (
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="w-4 h-4" />
            <span>Featured</span>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'dashboard') {
    return (
      <div className={cn('grid grid-cols-2 lg:grid-cols-4 gap-4', className)}>
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className={cn('p-2 rounded-lg bg-gray-700/50', stat.color)}>
                {stat.icon}
              </span>
              {stat.trend && (
                <div className={cn(
                  'flex items-center gap-1 text-xs',
                  stat.trend === 'up' ? 'text-green-400' : 
                  stat.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                )}>
                  <TrendingUp className={cn(
                    'w-3 h-3',
                    stat.trend === 'down' && 'rotate-180'
                  )} />
                  {stat.trendValue}
                </div>
              )}
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-gray-400">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={cn('space-y-6', className)}>
        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.slice(0, 4).map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800/40 border border-gray-700/30 rounded-lg p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className={cn('p-1.5 rounded-md bg-gray-700/50', stat.color)}>
                  {stat.icon}
                </span>
                <span className="text-sm font-medium text-white">
                  {stat.label}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-white">
                  {stat.value}
                </span>
                {stat.trend && stat.trendValue && (
                  <div className={cn(
                    'flex items-center gap-1 text-xs px-2 py-1 rounded-full',
                    stat.trend === 'up' ? 'bg-green-900/40 text-green-400' : 
                    stat.trend === 'down' ? 'bg-red-900/40 text-red-400' : 
                    'bg-gray-700/40 text-gray-400'
                  )}>
                    <TrendingUp className={cn(
                      'w-3 h-3',
                      stat.trend === 'down' && 'rotate-180'
                    )} />
                    {stat.trendValue}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Skill Level Distribution */}
        <div className="bg-gray-800/40 border border-gray-700/30 rounded-lg p-4">
          <h4 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-purple-400" />
            Skill Level Distribution
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Basic</span>
              <span className="text-sm font-medium text-green-400">
                {skillDistribution.basic} prompts
              </span>
            </div>
            <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-400"
                style={{ width: `${(skillDistribution.basic / totalPrompts) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Intermediate</span>
              <span className="text-sm font-medium text-yellow-400">
                {skillDistribution.intermediate} prompts
              </span>
            </div>
            <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400"
                style={{ width: `${(skillDistribution.intermediate / totalPrompts) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Advanced</span>
              <span className="text-sm font-medium text-red-400">
                {skillDistribution.advanced} prompts
              </span>
            </div>
            <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-red-400"
                style={{ width: `${(skillDistribution.advanced / totalPrompts) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Category Badges */}
        <div className="flex flex-wrap gap-2">
          {category.featured && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-900/40 text-yellow-300 border border-yellow-800/50">
              <Star className="w-3 h-3" />
              Featured
            </span>
          )}
          {category.trending && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-orange-900/40 text-orange-300 border border-orange-800/50">
              <TrendingUp className="w-3 h-3" />
              Trending
            </span>
          )}
          {category.crossIndustry && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-purple-900/40 text-purple-300 border border-purple-800/50">
              <Users className="w-3 h-3" />
              Cross-Industry
            </span>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default CategoryStats;
