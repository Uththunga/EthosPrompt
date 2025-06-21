import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Eye, Share2, Clock, Code, Download, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useContentDiscovery } from '../../hooks/useContentDiscovery';
import { CATEGORIES } from '../../data/blog-posts';

interface TrendingArticlesProps {
  limit?: number;
  showViewCounts?: boolean;
  className?: string;
}

const TrendingArticles: React.FC<TrendingArticlesProps> = ({ 
  limit = 6, 
  showViewCounts = true,
  className = '' 
}) => {
  const { getTrendingPosts } = useContentDiscovery();
  const trendingPosts = getTrendingPosts(limit);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Advanced': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getCategoryInfo = (categoryId: string) => {
    return CATEGORIES.find(cat => cat.id === categoryId);
  };

  const formatViewCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  if (trendingPosts.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Trending Articles</h2>
        <Badge variant="outline" className="border-orange-500/30 text-orange-400">
          Hot
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingPosts.map((post, index) => {
          const categoryInfo = getCategoryInfo(post.category);
          const CategoryIcon = categoryInfo?.icon || TrendingUp;
          
          return (
            <Card 
              key={post.id} 
              className="group bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 h-full flex flex-col overflow-hidden relative"
            >
              {/* Trending Rank Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
              </div>

              <Link to={post.path} className="flex flex-col h-full">
                {/* Header Image Area */}
                <div className="h-48 bg-gradient-to-br from-gray-800 via-gray-800/80 to-gray-900 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/20 to-pink-900/20" />
                  <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.3),transparent_70%)]" />
                  
                  {/* Category Icon */}
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <CategoryIcon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Features */}
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {post.hasCodeExamples && (
                      <div className="w-8 h-8 rounded-lg bg-green-500/20 backdrop-blur-sm flex items-center justify-center">
                        <Code className="w-4 h-4 text-green-400" />
                      </div>
                    )}
                    {post.hasDownloads && (
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 backdrop-blur-sm flex items-center justify-center">
                        <Download className="w-4 h-4 text-blue-400" />
                      </div>
                    )}
                  </div>

                  {/* Trending Indicator */}
                  <div className="absolute bottom-4 right-4">
                    <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Meta Information */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="border-orange-500/30 text-orange-300">
                      {categoryInfo?.name}
                    </Badge>
                    <Badge className={`border ${getDifficultyColor(post.difficulty)}`}>
                      {post.difficulty}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-300 transition-colors leading-tight line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Stats */}
                  {showViewCounts && (
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {formatViewCount(post.viewCount)} views
                      </div>
                      <div className="flex items-center">
                        <Share2 className="w-3 h-3 mr-1" />
                        {post.shareCount} shares
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {Math.round(post.engagementRate * 100)}% engagement
                      </div>
                    </div>
                  )}

                  {/* Author and Date */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700/50 mt-auto">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                        <span className="text-white font-medium text-xs">
                          {post.author.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{post.author.name}</p>
                        <p className="text-gray-400 text-xs">{post.author.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>

                  {/* Read More */}
                  <div className="mt-4 pt-4 border-t border-gray-700/50">
                    <div className="flex items-center text-orange-400 font-medium text-sm group-hover:text-orange-300 transition-colors">
                      Read Trending Article
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          );
        })}
      </div>

      {/* View All Trending Button */}
      <div className="text-center mt-8">
        <Button 
          variant="outline" 
          size="lg"
          className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10 hover:border-orange-500/50"
        >
          <TrendingUp className="w-5 h-5 mr-2" />
          View All Trending Articles
        </Button>
      </div>
    </div>
  );
};

export default TrendingArticles;
