import React, { useMemo } from 'react';
import { Star, TrendingUp, Clock, Users, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { usePrompts } from '../../hooks/useDatabaseLoader';
import PromptCardAdapter from '../prompts/PromptCardAdapter';
import { Heading, Text, Section } from '../ui/VisualHierarchy';
import type { UIPrompt } from '../../services/DatabaseService';

interface RecommendedPromptsProps {
  currentCategoryId?: string;
  currentSubcategoryId?: string;
  userPreferences?: {
    skillLevel?: string;
    industries?: string[];
    recentCategories?: string[];
  };
  maxItems?: number;
  variant?: 'sidebar' | 'section' | 'compact';
  className?: string;
}

interface RecommendationGroup {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  prompts: UIPrompt[];
  color: string;
}

const RecommendedPrompts: React.FC<RecommendedPromptsProps> = ({
  currentCategoryId,
  currentSubcategoryId,
  userPreferences,
  maxItems = 6,
  variant = 'section',
  className = ''
}) => {
  const { data: allPrompts, loading } = usePrompts();

  // Generate recommendations based on various criteria
  const recommendations = useMemo((): RecommendationGroup[] => {
    if (!allPrompts || allPrompts.length === 0) return [];

    // Filter out prompts from current subcategory
    const availablePrompts = allPrompts.filter(prompt => 
      prompt.subcategoryId !== currentSubcategoryId
    );

    const groups: RecommendationGroup[] = [];

    // 1. Trending Prompts
    const trendingPrompts = availablePrompts
      .filter(prompt => prompt.tags?.includes('trending') || prompt.tags?.includes('popular'))
      .slice(0, Math.ceil(maxItems / 3));

    if (trendingPrompts.length > 0) {
      groups.push({
        id: 'trending',
        title: 'Trending Now',
        description: 'Popular prompts this week',
        icon: <TrendingUp className="w-4 h-4" />,
        prompts: trendingPrompts,
        color: 'text-orange-400'
      });
    }

    // 2. Similar Skill Level
    if (userPreferences?.skillLevel) {
      const similarSkillPrompts = availablePrompts
        .filter(prompt => prompt.skillLevel === userPreferences.skillLevel)
        .filter(prompt => !trendingPrompts.includes(prompt))
        .slice(0, Math.ceil(maxItems / 3));

      if (similarSkillPrompts.length > 0) {
        groups.push({
          id: 'similar-skill',
          title: `${userPreferences.skillLevel} Level`,
          description: 'Prompts matching your skill level',
          icon: <Star className="w-4 h-4" />,
          prompts: similarSkillPrompts,
          color: 'text-yellow-400'
        });
      }
    }

    // 3. Recently Added
    const recentPrompts = availablePrompts
      .filter(prompt => prompt.tags?.includes('recent') || prompt.tags?.includes('new'))
      .filter(prompt => !trendingPrompts.includes(prompt))
      .slice(0, Math.ceil(maxItems / 3));

    if (recentPrompts.length > 0) {
      groups.push({
        id: 'recent',
        title: 'Recently Added',
        description: 'Fresh prompts in the collection',
        icon: <Clock className="w-4 h-4" />,
        prompts: recentPrompts,
        color: 'text-blue-400'
      });
    }

    // 4. Community Favorites
    const communityFavorites = availablePrompts
      .filter(prompt => prompt.tags?.includes('community') || prompt.tags?.includes('favorites'))
      .filter(prompt => !trendingPrompts.includes(prompt) && !recentPrompts.includes(prompt))
      .slice(0, Math.ceil(maxItems / 3));

    if (communityFavorites.length > 0) {
      groups.push({
        id: 'community',
        title: 'Community Favorites',
        description: 'Most liked by users',
        icon: <Users className="w-4 h-4" />,
        prompts: communityFavorites,
        color: 'text-purple-400'
      });
    }

    // 5. Cross-Category Suggestions (if we have current category)
    if (currentCategoryId) {
      const crossCategoryPrompts = availablePrompts
        .filter(prompt => prompt.categoryId !== currentCategoryId)
        .filter(prompt => !trendingPrompts.includes(prompt) && !recentPrompts.includes(prompt) && !communityFavorites.includes(prompt))
        .slice(0, Math.ceil(maxItems / 3));

      if (crossCategoryPrompts.length > 0) {
        groups.push({
          id: 'cross-category',
          title: 'Explore Other Categories',
          description: 'Discover prompts from different areas',
          icon: <Sparkles className="w-4 h-4" />,
          prompts: crossCategoryPrompts,
          color: 'text-green-400'
        });
      }
    }

    return groups.slice(0, variant === 'compact' ? 2 : 4);
  }, [allPrompts, currentCategoryId, currentSubcategoryId, userPreferences, maxItems, variant]);

  if (loading) {
    return (
      <div className={cn('space-y-4', className)}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-32"></div>
        </div>
        <div className="grid gap-4">
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

  if (recommendations.length === 0) {
    return null;
  }

  if (variant === 'compact') {
    return (
      <div className={cn('space-y-4', className)}>
        <Heading level={4} className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          Recommended
        </Heading>
        
        <div className="space-y-3">
          {recommendations.slice(0, 1).map((group) => (
            <div key={group.id}>
              <div className="flex items-center gap-2 mb-3">
                <span className={group.color}>{group.icon}</span>
                <Text variant="caption" color="muted">{group.title}</Text>
              </div>
              <div className="space-y-2">
                {group.prompts.slice(0, 3).map((prompt) => (
                  <div key={prompt.id} className="bg-gray-800/40 rounded-lg p-3 hover:bg-gray-800/60 transition-colors cursor-pointer">
                    <Text variant="caption" className="font-medium mb-1 line-clamp-1">
                      {prompt.title}
                    </Text>
                    <Text variant="small" color="muted" className="line-clamp-2">
                      {prompt.description}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className={cn('space-y-6', className)}>
        <Heading level={4} className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          Recommended for You
        </Heading>
        
        {recommendations.map((group) => (
          <div key={group.id} className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={group.color}>{group.icon}</span>
              <div>
                <Text variant="caption" className="font-medium">{group.title}</Text>
                <Text variant="small" color="muted">{group.description}</Text>
              </div>
            </div>
            
            <div className="space-y-2">
              {group.prompts.slice(0, 2).map((prompt) => (
                <div key={prompt.id} className="bg-gray-800/40 rounded-lg p-3 hover:bg-gray-800/60 transition-colors cursor-pointer">
                  <Text variant="caption" className="font-medium mb-1 line-clamp-1">
                    {prompt.title}
                  </Text>
                  <Text variant="small" color="muted" className="line-clamp-2">
                    {prompt.description}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default section variant
  return (
    <Section spacing="loose" className={className}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Heading level={3} className="flex items-center gap-3 mb-2">
            <Sparkles className="w-6 h-6 text-purple-400" />
            Recommended for You
          </Heading>
          <Text color="muted">Discover prompts tailored to your interests</Text>
        </div>
      </div>

      <div className="space-y-8">
        {recommendations.map((group) => (
          <div key={group.id}>
            <div className="flex items-center gap-3 mb-4">
              <span className={cn('p-2 rounded-lg bg-gray-800/50', group.color)}>
                {group.icon}
              </span>
              <div>
                <Heading level={4}>{group.title}</Heading>
                <Text variant="caption" color="muted">{group.description}</Text>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.prompts.slice(0, 3).map((prompt) => (
                <div key={prompt.id} className="transform transition-transform duration-300 hover:-translate-y-1">
                  <PromptCardAdapter
                    prompt={prompt}
                    showPreview={false}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default RecommendedPrompts;
