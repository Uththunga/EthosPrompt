import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, Code, Zap, Lightbulb } from 'lucide-react';
import { Card } from '../../components/ui/Card';

const Documentation: React.FC = () => {
  const sections = [
    {
      title: 'Introduction',
      icon: <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0" />,
      items: [
        { title: 'What is EthosPrompt?', path: '/resources/documentation/introduction' },
        { title: 'Core Concepts', path: '/resources/documentation/core-concepts' },
        { title: 'Getting Help', path: '/resources/documentation/getting-help' },
      ]
    },
    {
      title: 'Guides',
      icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />,
      items: [
        { title: 'Creating Your First Prompt', path: '/resources/documentation/first-prompt' },
        { title: 'Prompt Templates', path: '/resources/documentation/prompt-templates' },
        { title: 'Advanced Prompting', path: '/resources/documentation/advanced-prompting' },
      ]
    },
    {
      title: 'API',
      icon: <Code className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />,
      items: [
        { title: 'Authentication', path: '/resources/documentation/api-auth' },
        { title: 'Endpoints', path: '/resources/documentation/api-endpoints' },
        { title: 'Rate Limits', path: '/resources/documentation/rate-limits' },
      ]
    },
    {
      title: 'Integrations',
      icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" />,
      items: [
        { title: 'API Clients', path: '/resources/documentation/api-clients' },
        { title: 'Webhooks', path: '/resources/documentation/webhooks' },
        { title: 'Third-Party Tools', path: '/resources/documentation/third-party' },
      ]
    },
    {
      title: 'Best Practices',
      icon: <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0" />,
      items: [
        { title: 'Prompting', path: '/resources/documentation/prompting' },
        { title: 'Error Handling', path: '/resources/documentation/error-handling' },
        { title: 'Performance Tips', path: '/resources/documentation/performance' },
      ]
    }
  ];

  return (
    <div className="relative min-h-screen pt-20 sm:pt-24 pb-16 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-10 sm:mb-12 relative z-10">
          <div className="flex items-start sm:items-center mb-4">
            <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-purple-400 mr-3 mt-0.5 sm:mt-0 flex-shrink-0" />
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent leading-tight">
                Documentation & Guides
              </h1>
              <p className="text-base sm:text-lg text-gray-300 mt-2 sm:mt-3 leading-relaxed">
                Comprehensive guides and references to help you get the most out of EthosPrompt.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {sections.map((section, sectionIndex) => (
              <Card 
                key={sectionIndex} 
                className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-colors duration-200 hover:shadow-lg hover:shadow-purple-500/5"
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="mr-2 sm:mr-3 flex-shrink-0">
                      {section.icon}
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-100 leading-snug">
                      {section.title}
                    </h2>
                  </div>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link 
                          to={item.path}
                          className="flex items-center text-sm sm:text-base text-gray-300 hover:text-purple-400 transition-colors duration-150 py-1.5 px-1 -mx-1 rounded-md hover:bg-gray-700/30"
                          aria-label={`View ${item.title}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mr-2.5 flex-shrink-0"></span>
                          <span className="truncate">{item.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>

          {/* Popular Articles */}
          <div className="mt-12 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-200 mb-4 sm:mb-6">Popular Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-colors">
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg font-semibold text-gray-100 mb-2">Getting Started with Prompting</h3>
                  <p className="text-gray-400 mb-4">Learn the basics of prompting and how to create effective prompts.</p>
                  <Link 
                    to="/resources/documentation/prompt-engineering-basics"
                    className="inline-flex items-center text-purple-400 hover:text-purple-300 text-sm font-medium"
                  >
                    Read Article
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </Card>
              
              <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-colors">
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg font-semibold text-gray-100 mb-2">API Rate Limits and Best Practices</h3>
                  <p className="text-gray-400 mb-4">Understand our rate limits and how to optimize your API usage.</p>
                  <Link 
                    to="/resources/documentation/api-best-practices"
                    className="inline-flex items-center text-purple-400 hover:text-purple-300 text-sm font-medium"
                  >
                    Read Article
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900 pointer-events-none" />
    </div>
  );
};

export default Documentation;
