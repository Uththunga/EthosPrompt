import React, { useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { BookOpen, Code, HelpCircle, MessageSquare, Rocket } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface ResourceItem {
  name: string;
  path: string;
  description: string;
  icon: React.ReactNode;
}

const resources: ResourceItem[] = [
  {
    name: 'Getting Started',
    path: '/resources/getting-started',
    description: 'Learn the basics and get started with EthosPrompt',
    icon: <Rocket className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
  },
  {
    name: 'Documentation',
    path: '/resources/documentation',
    description: 'Complete technical documentation and guides',
    icon: <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
  },
  {
    name: 'API Reference',
    path: '/resources/api',
    description: 'Detailed API documentation and examples',
    icon: <Code className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
  },
  {
    name: 'FAQ',
    path: '/resources/faq',
    description: 'Answers to common questions',
    icon: <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
  },
  {
    name: 'Community',
    path: '/resources/community',
    description: 'Connect with other users and developers',
    icon: <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
  }
];

const Resources: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when the component mounts or when the pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 px-2">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Resources</h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Everything you need to get started and succeed with EthosPrompt
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {resources.map((resource, index) => (
            <Link 
              to={resource.path} 
              key={index} 
              className="block group transition-transform hover:-translate-y-0.5 active:translate-y-0"
              aria-label={`Go to ${resource.name}`}
            >
              <Card className="h-full p-5 sm:p-6 hover:bg-gray-800/50 transition-colors border border-gray-800 hover:border-purple-500/30">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-purple-500/10 text-purple-400 mt-0.5">
                    {resource.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold mb-1 text-gray-100 group-hover:text-white truncate">
                      {resource.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">
                      {resource.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;