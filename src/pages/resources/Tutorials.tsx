import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, Clock, BookOpen, Code, Zap, Lightbulb } from 'lucide-react';
import { Card } from '../../components/ui/Card';

const Tutorials: React.FC = () => {
  const categories = [
    {
      title: 'Beginner Tutorials',
      icon: <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />,
      items: [
        { 
          title: 'Your First Prompt', 
          duration: '5 min',
          path: '/tutorials/first-prompt',
          icon: <Zap className="w-4 h-4 text-yellow-400" />
        },
        { 
          title: 'Understanding Templates', 
          duration: '8 min',
          path: '/tutorials/understanding-templates',
          icon: <BookOpen className="w-4 h-4 text-green-400" />
        },
        { 
          title: 'Basic Prompt Patterns', 
          duration: '10 min',
          path: '/tutorials/basic-patterns',
          icon: <Lightbulb className="w-4 h-4 text-purple-400" />
        },
      ]
    },
    {
      title: 'Intermediate Guides',
      icon: <Code className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />,
      items: [
        { 
          title: 'API Integration', 
          duration: '15 min',
          path: '/tutorials/api-integration',
          icon: <Code className="w-4 h-4 text-blue-400" />
        },
        { 
          title: 'Working with Variables', 
          duration: '12 min',
          path: '/tutorials/working-with-variables',
          icon: <Code className="w-4 h-4 text-purple-400" />
        },
      ]
    },
    {
      title: 'Advanced Techniques',
      icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" />,
      items: [
        { 
          title: 'Advanced Prompt Engineering', 
          duration: '20 min',
          path: '/tutorials/advanced-prompt-engineering',
          icon: <Zap className="w-4 h-4 text-yellow-400" />
        },
        { 
          title: 'Building Complex Workflows', 
          duration: '25 min',
          path: '/tutorials/complex-workflows',
          icon: <Code className="w-4 h-4 text-green-400" />
        },
      ]
    }
  ];

  return (
    <div className="relative min-h-screen pt-20 sm:pt-24 pb-16 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-10 sm:mb-12 relative z-10">
          <div className="flex items-start sm:items-center mb-4">
            <PlayCircle className="w-7 h-7 sm:w-8 sm:h-8 text-purple-400 mr-3 mt-0.5 sm:mt-0 flex-shrink-0" />
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent leading-tight">
                Tutorials & Guides
              </h1>
              <p className="text-base sm:text-lg text-gray-300 mt-2 sm:mt-3 leading-relaxed">
                Step-by-step tutorials to help you master prompt engineering and get the most out of EthosPrompt.
              </p>
            </div>
          </div>
        </div>

        {/* Tutorial Categories */}
        <div className="max-w-6xl mx-auto relative z-10 space-y-8 sm:space-y-10">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4 sm:space-y-5">
              <div className="flex items-center">
                <div className="mr-2 sm:mr-3">
                  {category.icon}
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-100">
                  {category.title}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {category.items.map((item, itemIndex) => (
                  <Card 
                    key={itemIndex} 
                    className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/5"
                  >
                    <Link 
                      to={item.path}
                      className="block h-full p-4 sm:p-5 md:p-6 group"
                      aria-label={`View tutorial: ${item.title}`}
                    >
                      <div className="flex items-start">
                        <div className="mr-3 sm:mr-4 mt-0.5">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base sm:text-lg font-medium text-gray-100 group-hover:text-purple-400 transition-colors mb-1.5 sm:mb-2">
                            {item.title}
                          </h3>
                          <div className="flex items-center text-xs sm:text-sm text-gray-400">
                            <Clock className="w-3.5 h-3.5 mr-1.5" />
                            <span>{item.duration} read</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="max-w-3xl mx-auto mt-16 sm:mt-20 text-center">
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 sm:p-8">
            <div className="bg-purple-500/10 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Looking for something specific?</h3>
            <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 max-w-md mx-auto leading-relaxed">
              Check out our documentation for detailed API references and guides.
            </p>
            <Link 
              to="/resources/documentation"
              className="inline-flex items-center px-5 sm:px-6 py-2 sm:py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm sm:text-base font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label="View documentation"
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              View Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
