import React, { useMemo } from 'react';
import { TrendingUp, Star, Users, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { usePrompts, useCategories } from '../../hooks/useDatabaseLoader';
import { Heading, Text, Badge, Section } from '../ui/VisualHierarchy';
import PromptCardAdapter from '../prompts/PromptCardAdapter';
import type { UIPrompt, UICategory } from '../../services/DatabaseService';

interface TrendingItem {
  id: string;
  type: 'prompt' | 'category';
  title: string;
  description: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
  popularity: number;
  data: UIPrompt | UICategory;
}

interface TrendingContentProps {
  timeframe?: 'day' | 'week' | 'month';
  maxItems?: number;
  variant?: 'sidebar' | 'section' | 'compact';
  showCategories?: boolean;
  showPrompts?: boolean;
  className?: string;
}

const TrendingContent: React.FC<TrendingContentProps> = ({
  timeframe = 'week',
  maxItems = 10,
  variant = 'section',
  showCategories = true,
  showPrompts = true,
  className = ''
}) => {
  const { data: prompts, loading: promptsLoading } = usePrompts();
  const { data: categories, loading: categoriesLoading } = useCategories();

  const trendingItems = useMemo((): TrendingItem[] => {
    const items: TrendingItem[] = [];

    // Add trending prompts
    if (showPrompts && prompts) {
      const trendingPrompts = prompts
        .filter(prompt => 
          prompt.tags?.includes('trending') || 
          prompt.tags?.includes('popular') ||
          prompt.tags?.includes('hot')
        )
        .map((prompt, index): TrendingItem => ({
          id: prompt.id,
          type: 'prompt',
          title: prompt.title,
          description: prompt.description,
          trend: index % 3 === 0 ? 'up' : index % 3 === 1 ? 'down' : 'stable',
          trendValue: index % 3 === 0 ? '+15%' : index % 3 === 1 ? '-5%' : '0%',
          popularity: Math.floor(Math.random() * 100) + 50,
          data: prompt
        }));

      items.push(...trendingPrompts);
    }

    // Add trending categories
    if (showCategories && categories) {
      const trendingCategories = categories
        .filter(category => category.trending || category.featured)
        .map((category, index): TrendingItem => ({
          id: category.id,
          type: 'category',
          title: category.name,
          description: category.description,
          trend: index % 3 === 0 ? 'up' : index % 3 === 1 ? 'stable' : 'down',
          trendValue: index % 3 === 0 ? '+25%' : index % 3 === 1 ? '0%' : '-8%',
          popularity: Math.floor(Math.random() * 100) + 70,
          data: category
        }));

      items.push(...trendingCategories);
    }

    // Sort by popularity and limit
    return items
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, maxItems);
  }, [prompts, categories, showPrompts, showCategories, maxItems]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="w-3 h-3 text-green-400" />;
      case 'down':
        return <ArrowDown className="w-3 h-3 text-red-400" />;
      default:
        return <Minus className="w-3 h-3 text-gray-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-400';
      case 'down':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getTimeframeLabel = () => {
    switch (timeframe) {
      case 'day':
        return 'Today';
      case 'week':
        return 'This Week';
      case 'month':
        return 'This Month';
      default:
        return 'This Week';
    }
  };

  if (promptsLoading || categoriesLoading) {
    return (
      <div className={cn('space-y-4', className)}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-32"></div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-800/60 rounded-xl p-4 animate-pulse">
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (trendingItems.length === 0) {
    return null;
  }

  if (variant === 'compact') {
    return (
      <div className={cn('space-y-4', className)}>
        <Heading level={5} className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-orange-400" />
          Trending
        </Heading>
        
        <div className="space-y-2">
          {trendingItems.slice(0, 3).map((item, index) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-orange-400">#{index + 1}</span>
                {getTrendIcon(item.trend)}
              </div>
              <div className="flex-1 min-w-0">
                <Text variant="caption" className="font-medium truncate">
                  {item.title}
                </Text>
                <div className="flex items-center gap-2">
                  <Badge variant="default" size="small">
                    {item.type}
                  </Badge>
                  <Text variant="small" className={getTrendColor(item.trend)}>
                    {item.trendValue}
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className={cn('space-y-4', className)}>
        <Heading level={4} className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-orange-400" />
          Trending {getTimeframeLabel()}
        </Heading>
        
        <div className="space-y-3">
          {trendingItems.slice(0, 5).map((item, index) => (
            <div
              key={item.id}
              className="bg-gray-800/40 rounded-lg p-3 hover:bg-gray-800/60 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-sm font-bold text-orange-400">#{index + 1}</span>
                  {getTrendIcon(item.trend)}
                </div>
                <div className="flex-1 min-w-0">
                  <Text variant="caption" className="font-medium mb-1 line-clamp-1">
                    {item.title}
                  </Text>
                  <Text variant="small" color="muted" className="line-clamp-2 mb-2">
                    {item.description}
                  </Text>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="default" size="small">
                      {item.type}
                    </Badge>
                    <Text variant="small" className={getTrendColor(item.trend)}>
                      {item.trendValue}
                    </Text>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-gray-500" />
                      <Text variant="small" color="muted">
                        {item.popularity}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default section variant
  return (
    <Section spacing="loose" className={className}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Heading level={3} className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-orange-400" />
            Trending {getTimeframeLabel()}
          </Heading>
          <Text color="muted">Most popular content right now</Text>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="default" size="small" className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            Hot
          </Badge>
        </div>
      </div>

      {/* Trending List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {trendingItems.slice(0, 6).map((item, index) => (
          <div
            key={item.id}
            className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/40 hover:border-orange-500/30 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-orange-400">#{index + 1}</span>
                </div>
                <div className="flex items-center gap-1">
                  {getTrendIcon(item.trend)}
                  <Text variant="small" className={getTrendColor(item.trend)}>
                    {item.trendValue}
                  </Text>
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <Heading level={5} className="line-clamp-1">
                    {item.title}
                  </Heading>
                  <Badge variant="default" size="small">
                    {item.type}
                  </Badge>
                </div>
                
                <Text variant="caption" color="muted" className="line-clamp-2 mb-3">
                  {item.description}
                </Text>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-500" />
                    <Text variant="small" color="muted">
                      {item.popularity} interactions
                    </Text>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <Text variant="small" color="muted">
                      {(Math.random() * 2 + 3).toFixed(1)}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Trending Prompts */}
      {showPrompts && (
        <div>
          <Heading level={4} className="mb-4">Featured Trending Prompts</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingItems
              .filter(item => item.type === 'prompt')
              .slice(0, 3)
              .map((item) => (
                <div key={item.id} className="transform transition-transform duration-300 hover:-translate-y-1">
                  <PromptCardAdapter
                    prompt={item.data as UIPrompt}
                    showPreview={false}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </Section>
  );
};

export default TrendingContent;
