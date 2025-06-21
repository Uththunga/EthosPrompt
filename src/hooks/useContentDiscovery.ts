import { useMemo } from 'react';
import { BLOG_POSTS, type BlogPost } from '../data/blog-posts';

interface TrendingPost extends BlogPost {
  trendingScore: number;
  viewCount: number;
  shareCount: number;
  engagementRate: number;
}

interface ContentRecommendation {
  post: BlogPost;
  relevanceScore: number;
  reason: string;
}

interface ContentDiscoveryData {
  trendingPosts: TrendingPost[];
  recentlyUpdated: BlogPost[];
  popularByCategory: Record<string, BlogPost[]>;
  featuredCollections: Array<{
    title: string;
    description: string;
    posts: BlogPost[];
    icon: string;
  }>;
}

// Mock analytics data (in a real app, this would come from your analytics service)
const mockAnalyticsData = {
  'advanced-prompt-engineering-patterns': { views: 15420, shares: 234, engagement: 0.78 },
  'prompt-engineering-fundamentals': { views: 12890, shares: 189, engagement: 0.82 },
  'production-prompt-optimization': { views: 8760, shares: 156, engagement: 0.71 },
  'enterprise-ai-implementation': { views: 6540, shares: 98, engagement: 0.69 },
  'multimodal-prompt-strategies': { views: 5230, shares: 87, engagement: 0.74 },
  'llm-safety-alignment': { views: 4120, shares: 76, engagement: 0.68 }
};

export const useContentDiscovery = () => {
  // Calculate trending score based on multiple factors
  const calculateTrendingScore = (post: BlogPost): number => {
    const analytics = mockAnalyticsData[post.id as keyof typeof mockAnalyticsData] || { views: 0, shares: 0, engagement: 0 };
    
    // Factors for trending calculation
    const viewWeight = 0.4;
    const shareWeight = 0.3;
    const engagementWeight = 0.2;
    const recencyWeight = 0.1;
    
    // Normalize values (simple approach for demo)
    const maxViews = Math.max(...Object.values(mockAnalyticsData).map(d => d.views));
    const maxShares = Math.max(...Object.values(mockAnalyticsData).map(d => d.shares));
    
    const normalizedViews = analytics.views / maxViews;
    const normalizedShares = analytics.shares / maxShares;
    const normalizedEngagement = analytics.engagement;
    
    // Simple recency score (newer posts get slight boost)
    const postDate = new Date(post.date);
    const daysSincePost = (Date.now() - postDate.getTime()) / (1000 * 60 * 60 * 24);
    const recencyScore = Math.max(0, 1 - (daysSincePost / 365)); // Decay over a year
    
    return (
      normalizedViews * viewWeight +
      normalizedShares * shareWeight +
      normalizedEngagement * engagementWeight +
      recencyScore * recencyWeight
    );
  };

  // Get trending posts
  const getTrendingPosts = (limit: number = 6): TrendingPost[] => {
    return BLOG_POSTS
      .map(post => {
        const analytics = mockAnalyticsData[post.id as keyof typeof mockAnalyticsData] || { views: 0, shares: 0, engagement: 0 };
        return {
          ...post,
          trendingScore: calculateTrendingScore(post),
          viewCount: analytics.views,
          shareCount: analytics.shares,
          engagementRate: analytics.engagement
        };
      })
      .sort((a, b) => b.trendingScore - a.trendingScore)
      .slice(0, limit);
  };

  // Get recently updated posts (mock implementation)
  const getRecentlyUpdated = (limit: number = 4): BlogPost[] => {
    // In a real app, you'd track actual update dates
    // For demo, we'll sort by publication date
    return [...BLOG_POSTS]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  };

  // Get popular posts by category
  const getPopularByCategory = (): Record<string, BlogPost[]> => {
    const categories = ['tutorials', 'best-practices', 'case-studies', 'research'];
    const result: Record<string, BlogPost[]> = {};
    
    categories.forEach(category => {
      const categoryPosts = BLOG_POSTS
        .filter(post => post.category === category)
        .map(post => ({
          ...post,
          trendingScore: calculateTrendingScore(post)
        }))
        .sort((a, b) => b.trendingScore - a.trendingScore)
        .slice(0, 3);
      
      result[category] = categoryPosts;
    });
    
    return result;
  };

  // Get improved related posts using multiple similarity factors
  const getImprovedRelatedPosts = (currentPost: BlogPost, limit: number = 3): ContentRecommendation[] => {
    const recommendations: ContentRecommendation[] = [];
    
    BLOG_POSTS.forEach(post => {
      if (post.id === currentPost.id) return;
      
      let relevanceScore = 0;
      const reasons: string[] = [];
      
      // Category similarity (high weight)
      if (post.category === currentPost.category) {
        relevanceScore += 30;
        reasons.push('Same category');
      }
      
      // Difficulty level similarity
      if (post.difficulty === currentPost.difficulty) {
        relevanceScore += 15;
        reasons.push('Similar difficulty');
      }
      
      // Tag overlap
      const commonTags = post.tags.filter(tag => 
        currentPost.tags.some(currentTag => 
          currentTag.toLowerCase().includes(tag.toLowerCase()) ||
          tag.toLowerCase().includes(currentTag.toLowerCase())
        )
      );
      
      if (commonTags.length > 0) {
        relevanceScore += commonTags.length * 10;
        reasons.push(`${commonTags.length} shared topic${commonTags.length > 1 ? 's' : ''}`);
      }
      
      // Author similarity
      if (post.author.name === currentPost.author.name) {
        relevanceScore += 20;
        reasons.push('Same author');
      }
      
      // Feature similarity
      if (post.hasCodeExamples === currentPost.hasCodeExamples && post.hasCodeExamples) {
        relevanceScore += 5;
        reasons.push('Has code examples');
      }
      
      if (post.hasDownloads === currentPost.hasDownloads && post.hasDownloads) {
        relevanceScore += 5;
        reasons.push('Has downloads');
      }
      
      // Content similarity (simplified - in real app would use NLP)
      const titleWords = currentPost.title.toLowerCase().split(' ');
      const postTitleWords = post.title.toLowerCase().split(' ');
      const titleOverlap = titleWords.filter(word => 
        word.length > 3 && postTitleWords.includes(word)
      ).length;
      
      if (titleOverlap > 0) {
        relevanceScore += titleOverlap * 8;
        reasons.push('Similar topics');
      }
      
      // Trending boost
      const trendingScore = calculateTrendingScore(post);
      relevanceScore += trendingScore * 10;
      
      if (relevanceScore > 0) {
        recommendations.push({
          post,
          relevanceScore,
          reason: reasons.slice(0, 2).join(', ') || 'Related content'
        });
      }
    });
    
    return recommendations
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);
  };

  // Get featured collections
  const getFeaturedCollections = () => {
    return [
      {
        title: 'Getting Started with Prompt Engineering',
        description: 'Essential guides for beginners to master the fundamentals',
        icon: '🚀',
        posts: BLOG_POSTS.filter(post => 
          post.difficulty === 'Beginner' || 
          post.tags.some(tag => tag.toLowerCase().includes('fundamental'))
        ).slice(0, 3)
      },
      {
        title: 'Production-Ready AI Solutions',
        description: 'Advanced techniques for deploying AI in enterprise environments',
        icon: '⚡',
        posts: BLOG_POSTS.filter(post => 
          post.tags.some(tag => 
            tag.toLowerCase().includes('production') || 
            tag.toLowerCase().includes('enterprise') ||
            tag.toLowerCase().includes('optimization')
          )
        ).slice(0, 3)
      },
      {
        title: 'AI Safety & Ethics',
        description: 'Responsible AI development and safety considerations',
        icon: '🛡️',
        posts: BLOG_POSTS.filter(post => 
          post.tags.some(tag => 
            tag.toLowerCase().includes('safety') || 
            tag.toLowerCase().includes('ethics') ||
            tag.toLowerCase().includes('alignment')
          )
        ).slice(0, 3)
      },
      {
        title: 'Advanced Techniques',
        description: 'Cutting-edge methods for expert practitioners',
        icon: '🧠',
        posts: BLOG_POSTS.filter(post => 
          post.difficulty === 'Advanced' ||
          post.tags.some(tag => tag.toLowerCase().includes('advanced'))
        ).slice(0, 3)
      }
    ].filter(collection => collection.posts.length > 0);
  };

  // Main content discovery data
  const contentDiscoveryData: ContentDiscoveryData = useMemo(() => ({
    trendingPosts: getTrendingPosts(),
    recentlyUpdated: getRecentlyUpdated(),
    popularByCategory: getPopularByCategory(),
    featuredCollections: getFeaturedCollections()
  }), []);

  return {
    contentDiscoveryData,
    getTrendingPosts,
    getRecentlyUpdated,
    getPopularByCategory,
    getImprovedRelatedPosts,
    getFeaturedCollections
  };
};
