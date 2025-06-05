import React from 'react';
import { Book } from 'lucide-react';

// Extended resources list
const allResources = [
  {
    id: '1',
    title: 'Getting Started with AI Prompts',
    category: 'Guide',
    readTime: '5 min read',
    image: '/bg.jpg',
    path: '/prompt-engineering-guide',
    description: 'Learn the fundamentals of working with AI prompts and how to get started.'
  },
  {
    id: '2',
    title: 'Maximizing ROI with Engineered Prompts',
    category: 'Case Study',
    readTime: '8 min read',
    image: '/bg.webp',
    path: '/blog/case-studies',
    description: 'Discover how businesses are achieving better results with engineered prompts.'
  },
  {
    id: '3',
    title: 'AI Prompt Engineering Best Practices',
    category: 'Tutorial',
    readTime: '10 min read',
    image: '/bg.jpg',
    path: '/prompt-engineering-guide#best-practices',
    description: 'Master the art of writing effective prompts with these proven best practices.'
  },
  {
    id: '4',
    title: 'Advanced Prompt Engineering Techniques',
    category: 'Tutorial',
    readTime: '12 min read',
    image: '/bg.webp',
    description: 'Take your prompt engineering skills to the next level with advanced techniques.',
    path: '/prompt-engineering-guide/advanced'
  },
  {
    id: '5',
    title: 'Prompt Engineering for Different Industries',
    category: 'Guide',
    readTime: '15 min read',
    image: '/bg.jpg',
    description: 'Learn how to adapt prompt engineering for different business sectors.',
    path: '/industry-guides'
  },
  {
    id: '6',
    title: 'Monthly Prompt Engineering Roundup',
    category: 'Newsletter',
    readTime: '7 min read',
    image: '/bg.webp',
    description: 'Stay updated with the latest developments in prompt engineering.',
    path: '/newsletter/may-2025'
  }
];

const Resources: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-900/50">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <Book className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Resources</h1>
              <p className="text-gray-400 mt-2">
                Comprehensive guides, tutorials, and case studies to help you master AI prompt engineering
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4">
        {/* Categories Filter */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
          {['All', 'Guide', 'Tutorial', 'Case Study', 'Newsletter'].map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 hover:bg-purple-500/10 hover:text-purple-400 transition-colors whitespace-nowrap"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allResources.map((resource) => (
            <a key={resource.id} href={resource.path} className="block group">
              <div className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-purple-500/90 backdrop-blur-sm rounded-full text-sm text-white">
                      {resource.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">{resource.description}</p>
                  <div className="flex items-center text-gray-500">
                    <span className="text-sm">{resource.readTime}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
