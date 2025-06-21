import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Download, Code, BookOpen, TrendingUp, Search, Tag, ExternalLink } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { CATEGORIES, BLOG_POSTS, getFeaturedPost, type CategoryId, type BlogPost } from '../../data/blog-posts';
import AdvancedSearch from '../../components/blog/AdvancedSearch';
import TrendingArticles from '../../components/blog/TrendingArticles';
import BookmarkButton from '../../components/blog/BookmarkButton';
import PullToRefresh from '../../components/mobile/PullToRefresh';
import SwipeNavigation from '../../components/mobile/SwipeNavigation';
import { type SearchResult } from '../../hooks/useSearch';

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredPost = getFeaturedPost();

  const allPosts = BLOG_POSTS;

  // Handle search results
  const handleSearchResults = (results: SearchResult[]) => {
    setSearchResults(results);
    setIsSearchActive(results.length > 0 || results.length === 0); // Active if there are results or if search was performed
  };

  // Handle pull-to-refresh
  const handleRefresh = async () => {
    try {
      // Simulate refresh delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Reset search and filters
      setSearchResults([]);
      setIsSearchActive(false);
      setSelectedCategory('all');

      // In a real app, you would refetch data here
    } catch (error) {
      // Handle refresh error silently in production
    }
  };

  // Filter posts based on category (when not searching)
  const filteredPosts = useMemo(() => {
    if (isSearchActive) {
      return searchResults.map(result => result.post);
    }

    let filtered = allPosts;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    return filtered;
  }, [allPosts, selectedCategory, isSearchActive, searchResults]);

  const getDifficultyColor = (difficulty: BlogPost['difficulty']) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Advanced': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getCategoryIcon = (categoryId: CategoryId) => {
    const category = CATEGORIES.find(cat => cat.id === categoryId);
    return category?.icon || BookOpen;
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <SwipeNavigation className="relative min-h-screen pt-20 sm:pt-24 pb-20 md:pb-16 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
        {/* Enhanced Header */}
        <div className="max-w-6xl mx-auto mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent leading-tight mb-4">
              Knowledge Hub
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Expert insights, technical tutorials, and research updates for prompt engineering professionals
            </p>
          </div>

          {/* Advanced Search */}
          <div className="max-w-4xl mx-auto">
            <AdvancedSearch
              onSearchResults={handleSearchResults}
              className="mb-8"
            />
          </div>

          {/* Category Filter (when not searching) */}
          {!isSearchActive && (
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap gap-3 justify-center mb-6">
                {CATEGORIES.map((category) => {
                  const Icon = category.icon;
                  const isActive = selectedCategory === category.id;
                  return (
                    <Button
                      key={category.id}
                      variant={isActive ? "default" : "outline"}
                      size="default"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`group transition-all duration-200 ${
                        isActive
                          ? 'bg-purple-600 hover:bg-purple-700 text-white'
                          : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border-gray-600'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {category.name}
                    </Button>
                  );
                })}
              </div>

              {/* Results Count */}
              <div className="text-center">
                <p className="text-gray-400">
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                  {selectedCategory !== 'all' && (
                    <span className="ml-2">
                      in <span className="text-purple-400 font-medium">
                        {CATEGORIES.find(cat => cat.id === selectedCategory)?.name}
                      </span>
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Featured Article */}
        {featuredPost && (
          <div className="max-w-6xl mx-auto mb-16 sm:mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Featured Article</h2>
            </div>

            <Card className="overflow-hidden bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
              <Link to={featuredPost.path} className="group">
                <div className="relative">
                  {/* Enhanced Featured Image Area */}
                  <div className="h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-blue-900/40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.2),transparent_50%)]" />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                          <Code className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-white/80 text-lg font-medium">Technical Deep Dive</p>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Content */}
                  <div className="p-6 sm:p-8 lg:p-10">
                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <Badge variant="default" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                        {CATEGORIES.find(cat => cat.id === featuredPost.category)?.name}
                      </Badge>
                      <Badge className={`border ${getDifficultyColor(featuredPost.difficulty)}`}>
                        {featuredPost.difficulty}
                      </Badge>
                      {featuredPost.hasCodeExamples && (
                        <Badge variant="outline" className="border-green-500/30 text-green-400">
                          <Code className="w-3 h-3 mr-1" />
                          Code Examples
                        </Badge>
                      )}
                      {featuredPost.hasDownloads && (
                        <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                          <Download className="w-3 h-3 mr-1" />
                          Resources
                        </Badge>
                      )}
                    </div>

                    {/* Title and Excerpt */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors leading-tight">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      {featuredPost.excerpt}
                    </p>

                    {/* Author and Meta */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {featuredPost.author.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{featuredPost.author.name}</p>
                          <p className="text-gray-400 text-sm">{featuredPost.author.role}</p>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        {featuredPost.date}
                        <span className="mx-3">•</span>
                        <Clock className="w-4 h-4 mr-2" />
                        {featuredPost.readTime}
                      </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-8 pt-6 border-t border-gray-700/50">
                      <Button
                        variant="default"
                        size="lg"
                        className="group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      >
                        Read Full Article
                        <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          </div>
        )}

        {/* Trending Articles Section (only show when not searching and no category filter) */}
        {!isSearchActive && selectedCategory === 'all' && (
          <div className="max-w-6xl mx-auto mb-20">
            <TrendingArticles limit={6} />
          </div>
        )}

        {/* Articles Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {isSearchActive ? 'Search Results' :
               selectedCategory === 'all' ? 'All Articles' :
               CATEGORIES.find(cat => cat.id === selectedCategory)?.name}
            </h2>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-800/50 flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No articles found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => {
                const CategoryIcon = getCategoryIcon(post.category);
                const searchResult = isSearchActive ? searchResults.find(r => r.post.id === post.id) : null;

                return (
                  <Card key={post.id} className="group bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 h-full flex flex-col overflow-hidden">
                    <Link to={post.path} className="flex flex-col h-full">
                      {/* Enhanced Article Image */}
                      <div className="h-48 bg-gradient-to-br from-gray-800 via-gray-800/80 to-gray-900 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-blue-900/20" />
                        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.3),transparent_70%)]" />

                        {/* Category Icon */}
                        <div className="absolute top-4 left-4">
                          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                            <CategoryIcon className="w-5 h-5 text-white" />
                          </div>
                        </div>

                        {/* Difficulty Badge */}
                        <div className="absolute top-4 right-4">
                          <Badge className={`border ${getDifficultyColor(post.difficulty)}`}>
                            {post.difficulty}
                          </Badge>
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
                      </div>

                      {/* Enhanced Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Meta Information */}
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                            {CATEGORIES.find(cat => cat.id === post.category)?.name}
                          </Badge>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            {post.readTime}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors leading-tight line-clamp-2">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <div className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                          {searchResult ? (
                            <div dangerouslySetInnerHTML={{ __html: searchResult.highlightedExcerpt }} />
                          ) : (
                            post.excerpt
                          )}
                        </div>

                        {/* Search Match Indicators */}
                        {searchResult && searchResult.matchedFields.length > 0 && (
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-1">
                              {searchResult.matchedFields.map((field) => (
                                <Badge
                                  key={field}
                                  variant="outline"
                                  className="text-xs border-purple-500/30 text-purple-300 bg-purple-500/10"
                                >
                                  {field}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-700/50 text-gray-400 border border-gray-600/50">
                              <Tag className="w-2.5 h-2.5 mr-1" />
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 2 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-700/50 text-gray-400 border border-gray-600/50">
                              +{post.tags.length - 2} more
                            </span>
                          )}
                        </div>

                        {/* Author and Date */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50 mt-auto">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
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
                            <Calendar className="w-3 h-3 mr-1" />
                            {post.date}
                          </div>
                        </div>

                        {/* Read More and Bookmark */}
                        <div className="mt-4 pt-4 border-t border-gray-700/50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-purple-400 font-medium text-sm group-hover:text-purple-300 transition-colors">
                              Read Article
                              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                            </div>
                            <div onClick={(e) => e.preventDefault()}>
                              <BookmarkButton
                                post={post}
                                variant="icon"
                                size="sm"
                                showText={false}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Professional Newsletter Section */}
        <div className="max-w-4xl mx-auto mt-20 sm:mt-24">
          <Card className="bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-900/60 backdrop-blur-sm border border-purple-500/20 p-8 sm:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.3),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(79,70,229,0.3),transparent_50%)]" />
            </div>

            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Join the Knowledge Community
                </h3>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Get exclusive access to advanced tutorials, research insights, and expert analysis delivered to your inbox.
                  Join 10,000+ prompt engineering professionals.
                </p>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Code className="w-6 h-6 text-purple-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Technical Deep Dives</h4>
                  <p className="text-gray-400 text-sm">Advanced tutorials with code examples and implementation guides</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Industry Insights</h4>
                  <p className="text-gray-400 text-sm">Latest research findings and industry trend analysis</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Download className="w-6 h-6 text-blue-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Exclusive Resources</h4>
                  <p className="text-gray-400 text-sm">Downloadable templates, checklists, and reference materials</p>
                </div>
              </div>

              {/* Subscription Form */}
              <div className="max-w-lg mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your professional email"
                    className="flex-1 px-6 py-4 bg-gray-900/50 border border-gray-600/50 rounded-xl text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                    aria-label="Email address"
                  />
                  <Button
                    variant="default"
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-8 py-4 whitespace-nowrap"
                  >
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-4 text-center">
                  Professional content for AI practitioners. No spam, unsubscribe anytime.
                </p>
              </div>

              {/* Social Proof */}
              <div className="mt-8 pt-8 border-t border-gray-700/50 text-center">
                <p className="text-gray-400 text-sm">
                  Trusted by engineers at <span className="text-white font-medium">Google, Microsoft, OpenAI, Anthropic</span> and more
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Educational Quick Start Section */}
        <div className="max-w-6xl mx-auto mt-20 sm:mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              New to Prompt Engineering?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Start your journey with our curated learning path designed for professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Card className="bg-gray-800/40 border border-gray-700/50 p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Learn Fundamentals</h3>
              <p className="text-gray-300 mb-4">Master the core concepts and principles of effective prompt design</p>
              <Button variant="outline" size="sm" className="border-green-500/30 text-green-400 hover:bg-green-500/10">
                Start Learning
              </Button>
            </Card>

            {/* Step 2 */}
            <Card className="bg-gray-800/40 border border-gray-700/50 p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Practice Techniques</h3>
              <p className="text-gray-300 mb-4">Apply advanced patterns and methodologies in real-world scenarios</p>
              <Button variant="outline" size="sm" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                View Tutorials
              </Button>
            </Card>

            {/* Step 3 */}
            <Card className="bg-gray-800/40 border border-gray-700/50 p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Scale & Optimize</h3>
              <p className="text-gray-300 mb-4">Implement production-ready solutions and optimization strategies</p>
              <Button variant="outline" size="sm" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                Advanced Topics
              </Button>
            </Card>
          </div>
        </div>

        {/* Featured Resources Section */}
        <div className="max-w-6xl mx-auto mt-20 sm:mt-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
              <Download className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Featured Resources</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Resource 1 */}
            <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-500/20 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Code className="w-6 h-6 text-orange-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Prompt Engineering Toolkit</h3>
                  <p className="text-gray-300 mb-4">Complete collection of templates, patterns, and best practices for professional prompt engineering.</p>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" className="border-orange-500/30 text-orange-400">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <span className="text-sm text-gray-400">2.3MB • 45 pages</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Resource 2 */}
            <Card className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-500/20 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Performance Optimization Guide</h3>
                  <p className="text-gray-300 mb-4">Advanced strategies for optimizing prompt performance, reducing costs, and improving response quality.</p>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" className="border-blue-500/30 text-blue-400">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Online
                    </Button>
                    <span className="text-sm text-gray-400">Interactive Guide</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        </div>
      </SwipeNavigation>
    </PullToRefresh>
  );
};

export default Blog;
