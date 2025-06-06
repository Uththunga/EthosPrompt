import React from 'react';
import { Card } from '../components/ui/Card';
import { ArrowRight, BookOpen, FileText, Code } from 'lucide-react';

interface ResourceItem {
  name: string;
  path: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

const resources: ResourceItem[] = [
  {
    name: 'Documentation & Guides',
    path: '/resources/documentation',
    description: 'Comprehensive documentation, user guides, and technical references for all features and capabilities.',
    icon: <BookOpen className="w-6 h-6" />,
    category: 'Technical'
  },
  {
    name: 'API Reference',
    path: '/resources/api',
    description: 'Detailed API documentation with examples, endpoints, and integration guides.',
    icon: <Code className="w-6 h-6" />,
    category: 'Technical'
  },
  {
    name: 'Best Practices',
    path: '/resources/best-practices',
    description: 'Learn the best practices for prompt engineering and AI interaction.',
    icon: <FileText className="w-6 h-6" />,
    category: 'Guides'
  }
];

const Resources: React.FC = () => {
  return (
    <div className="relative min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-16 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
            Resources &amp; Documentation
          </h1>
          <p className="text-xl text-gray-300">
            Everything you need to master prompt engineering and AI interaction.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="grid gap-8">
            {resources.map((resource, index) => (
              <Card key={index} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-colors">
                <div className="p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-purple-400">
                      {resource.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
                        {resource.name}
                      </h3>
                      <p className="mt-2 text-gray-300">
                        {resource.description}
                      </p>
                      <div className="mt-4">
                        <a 
                          href={resource.path}
                          className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          Learn more <ArrowRight className="ml-2 w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900 pointer-events-none" />
    </div>
  );
};

export default Resources;