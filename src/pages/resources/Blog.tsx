import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card } from '../../components/ui/Card';

const Blog: React.FC = () => {
  const featuredPost = {
    title: 'The Future of Prompting',
    excerpt: 'Exploring the latest trends and future directions in prompting and AI interaction design.',
    date: 'June 5, 2024',
    readTime: '8 min read',
    category: 'AI',
    path: '/blog/future-of-prompting',
    image: '/images/blog/future-prompting.jpg',
    author: {
      name: 'Alex Johnson',
      avatar: '/images/authors/alex-johnson.jpg'
    }
  };

  const recentPosts = [
    {
      title: '10 Tips for Better AI Prompts',
      excerpt: 'Learn how to craft effective prompts that get better results from AI models.',
      date: 'May 28, 2024',
      readTime: '6 min read',
      category: 'Tips',
      path: '/blog/better-ai-prompts',
      image: '/images/blog/better-prompts.jpg'
    },
    {
      title: 'Understanding Large Language Models',
      excerpt: 'A beginner-friendly guide to how LLMs work and why they matter for prompt engineering.',
      date: 'May 20, 2024',
      readTime: '10 min read',
      category: 'Education',
      path: '/blog/understanding-llms',
      image: '/images/blog/understanding-llms.jpg'
    },
    {
      title: 'The Ethics of AI Content Generation',
      excerpt: 'Exploring the ethical considerations and best practices for responsible AI content creation.',
      date: 'May 12, 2024',
      readTime: '12 min read',
      category: 'Ethics',
      path: '/blog/ai-ethics',
      image: '/images/blog/ai-ethics.jpg'
    },
    {
      title: 'Advanced Prompt Patterns',
      excerpt: 'Discover powerful patterns for creating more sophisticated and effective AI prompts.',
      date: 'May 5, 2024',
      readTime: '9 min read',
      category: 'Advanced',
      path: '/blog/advanced-prompt-patterns',
      image: '/images/blog/advanced-patterns.jpg'
    },
    {
      title: 'The Evolution of AI Writing Assistants',
      excerpt: 'How AI writing tools have evolved and what the future holds for content creation.',
      date: 'April 28, 2024',
      readTime: '7 min read',
      category: 'Trends',
      path: '/blog/ai-writing-evolution',
      image: '/images/blog/ai-writing.jpg'
    }
  ];

  return (
    <div className="relative min-h-screen pt-20 sm:pt-24 pb-16 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12 relative z-10
">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent leading-tight">
            Blog & Insights
          </h1>
          <p className="text-base sm:text-lg text-gray-300 mt-2 sm:mt-3 leading-relaxed">
            Stay updated with the latest articles, tutorials, and insights on prompt engineering and AI.
          </p>
        </div>

        {/* Featured Post */}
        <div className="max-w-6xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-100 mb-4 sm:mb-6">Featured Post</h2>
          <Card className="overflow-hidden bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5">
            <Link to={featuredPost.path} className="block group">
              <div className="aspect-w-16 aspect-h-9 bg-gray-800 overflow-hidden">
                <div className="w-full h-48 sm:h-64 md:h-80 bg-gradient-to-r from-purple-900/30 to-blue-900/30 flex items-center justify-center">
                  <span className="text-gray-500">Featured Image</span>
                </div>
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex items-center space-x-4 mb-3 sm:mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-purple-500/10 text-purple-300">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center text-xs sm:text-sm text-gray-400">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    {featuredPost.date}
                    <span className="mx-2">•</span>
                    <Clock className="w-3.5 h-3.5 mr-1.5" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-2 sm:mb-3 group-hover:text-purple-400 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-5">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center text-purple-400 font-medium text-sm sm:text-base group-hover:text-purple-300 transition-colors">
                  Read article
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </Card>
        </div>

        {/* Recent Posts */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-100 mb-4 sm:mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {recentPosts.map((post, index) => (
              <Card key={index} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/5 h-full flex flex-col">
                <Link to={post.path} className="block group flex-1 flex flex-col">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-800 overflow-hidden">
                    <div className="w-full h-40 sm:h-48 bg-gradient-to-r from-blue-900/30 to-purple-900/30 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Post Image</span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 flex-1 flex flex-col">
                    <div className="flex items-center space-x-3 mb-2 sm:mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                        {post.category}
                      </span>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-100 mb-2 group-hover:text-purple-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto pt-2 text-sm text-purple-400 font-medium flex items-center group-hover:text-purple-300 transition-colors">
                      Read more
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="max-w-3xl mx-auto mt-12 sm:mt-20">
          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/70 border border-gray-700/50 p-5 sm:p-8">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">Stay Updated</h3>
              <p className="text-sm sm:text-base text-gray-300 mb-6 max-w-md mx-auto">
                Subscribe to our newsletter for the latest articles, tutorials, and updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                  aria-label="Email address"
                />
                <button
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm sm:text-base whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Blog;
